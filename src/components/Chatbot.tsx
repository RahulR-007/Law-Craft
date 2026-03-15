import React, { useState, useRef, useEffect } from 'react'
import {
    Box,
    VStack,
    HStack,
    Text,
    Input,
    IconButton,
    Spinner,
    Avatar,
    Flex,
} from '@chakra-ui/react'
import { FiSend, FiMessageCircle, FiX, FiMinimize2 } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { generateTextStream, checkServerHealth } from '../lib/ollamaIntegration'

const MotionBox = motion(Box)

interface Message {
    id: string
    text: string
    sender: 'user' | 'bot'
    timestamp: Date
}

// Chatbot Rules
const CHATBOT_RULES = {
    MAX_RESPONSE_LENGTH: 150, // Max characters per response
    MAX_TOKENS: 128, // Max tokens for generation
    RESPONSE_TIMEOUT: 30000, // 30 seconds timeout
    ALLOWED_TOPICS: [
        'contract',
        'nda',
        'employment',
        'loan',
        'lease',
        'agreement',
        'legal',
        'document'
    ],
    RESTRICTED_TOPICS: [
        'illegal',
        'hack',
        'bypass',
        'fraud',
        'crime',
        'terrorism'
    ]
}

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isMinimized, setIsMinimized] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: 'Hi! I\'m Alice. Ask me about contracts, NDAs, loans, or employment agreements.',
            sender: 'bot',
            timestamp: new Date()
        }
    ])
    const [inputValue, setInputValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const onClose = () => setIsOpen(false)
    const onToggle = () => setIsMinimized(!isMinimized)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    // Auto-focus input when chat opens and is not minimized
    useEffect(() => {
        if (isOpen && !isMinimized && inputRef.current) {
            const timer = setTimeout(() => {
                inputRef.current?.focus()
            }, 300) // Small delay to ensure the animation completes
            return () => clearTimeout(timer)
        }
    }, [isOpen, isMinimized])

    // Ollama-powered AI response with legal focus
    const sendMessage = async (message: string) => {
        setIsLoading(true)

        try {
            // Check message for restricted topics
            const lowerMessage = message.toLowerCase()
            const hasRestricted = CHATBOT_RULES.RESTRICTED_TOPICS.some(topic =>
                lowerMessage.includes(topic)
            )

            if (hasRestricted) {
                const userMessage: Message = {
                    id: Date.now().toString(),
                    text: message,
                    sender: 'user',
                    timestamp: new Date()
                }
                setMessages(prev => [...prev, userMessage])

                const botMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    text: "I can't assist with that topic. I'm here to help with legal documents and contracts only.",
                    sender: 'bot',
                    timestamp: new Date()
                }
                setMessages(prev => [...prev, botMessage])
                setIsLoading(false)
                return
            }

            // Add user message
            const userMessage: Message = {
                id: Date.now().toString(),
                text: message,
                sender: 'user',
                timestamp: new Date()
            }
            setMessages(prev => [...prev, userMessage])

            // Check if Ollama server is available
            const serverHealthy = await checkServerHealth()

            if (!serverHealthy) {
                const warningMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    text: "Server unavailable. Using offline response.",
                    sender: 'bot',
                    timestamp: new Date()
                }
                setMessages(prev => [...prev, warningMessage])

                setTimeout(() => useFallbackResponse(message), 500)
                return
            }

            // Build the prompt with rules
            const systemPrompt = `You are Alice. Answer in 1-2 sentences only. Focus: legal documents.

${message}`

            let fullResponse = ''
            const botResponseId = (Date.now() + 1).toString()

            let botResponse: Message = {
                id: botResponseId,
                text: '',
                sender: 'bot',
                timestamp: new Date()
            }
            setMessages(prev => [...prev, botResponse])

            try {
                for await (const chunk of generateTextStream(systemPrompt, {
                    temperature: 0.6,
                    topP: 0.8,
                    numPredict: CHATBOT_RULES.MAX_TOKENS,
                })) {
                    fullResponse += chunk

                    // Enforce max length
                    if (fullResponse.length > CHATBOT_RULES.MAX_RESPONSE_LENGTH) {
                        fullResponse = fullResponse.substring(0, CHATBOT_RULES.MAX_RESPONSE_LENGTH) + '...'
                        break
                    }

                    setMessages(prev => {
                        const newMessages = [...prev]
                        const msgIndex = newMessages.findIndex(m => m.id === botResponseId)
                        if (msgIndex !== -1) {
                            newMessages[msgIndex] = {
                                ...newMessages[msgIndex],
                                text: fullResponse
                            }
                        }
                        return newMessages
                    })
                }

                // Add disclaimer
                if (fullResponse.trim()) {
                    const finalText = fullResponse + '\n\n⚠️ Not legal advice. Consult an attorney.'

                    setMessages(prev => {
                        const newMessages = [...prev]
                        const msgIndex = newMessages.findIndex(m => m.id === botResponseId)
                        if (msgIndex !== -1) {
                            newMessages[msgIndex] = {
                                ...newMessages[msgIndex],
                                text: finalText
                            }
                        }
                        return newMessages
                    })
                }
            } catch (ollamaError) {
                setMessages(prev => prev.filter(m => m.id !== botResponseId))
                useFallbackResponse(message)
            }
        } catch (error) {
            console.error('Error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    // Fallback responses
    const useFallbackResponse = (message: string) => {
        const lowerMsg = message.toLowerCase()
        let response = ''

        if (lowerMsg.includes('contract')) {
            response = "A contract is a legal agreement. Key elements: offer, acceptance, consideration, consent."
        } else if (lowerMsg.includes('nda')) {
            response = "NDAs protect confidential information. Define what's confidential, obligations, duration."
        } else if (lowerMsg.includes('loan')) {
            response = "Loan agreements specify: amount, interest rate, repayment schedule, default terms."
        } else if (lowerMsg.includes('employment')) {
            response = "Employment contracts address: job title, compensation, hours, benefits, confidentiality."
        } else if (lowerMsg.includes('lease')) {
            response = "Leases set terms for property rental: duration, rent, maintenance, termination."
        } else {
            response = "I help with legal documents. Ask about contracts, NDAs, loans, employment, or leases."
        }

        response += "\n\n⚠️ Not legal advice. Consult attorney."

        const botResponse: Message = {
            id: (Date.now() + 1).toString(),
            text: response,
            sender: 'bot',
            timestamp: new Date()
        }

        setMessages(prev => [...prev, botResponse])
    }

    const handleSendMessage = () => {
        if (inputValue.trim()) {
            sendMessage(inputValue.trim())
            setInputValue('')
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    return (
        <>
            {/* Floating Chat Button - shows when chat is closed */}
            {!isOpen && (
                <MotionBox
                    position="fixed"
                    bottom="20px"
                    right="20px"
                    zIndex="999"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <IconButton
                        aria-label="Open chat"
                        icon={<FiMessageCircle />}
                        size="lg"
                        borderRadius="full"
                        width="60px"
                        height="60px"
                        fontSize="24px"
                        onClick={() => setIsOpen(true)}
                        bg="rgba(151, 15, 255, 0.15)"
                        backdropFilter="blur(20px)"
                        border="1px solid rgba(151, 15, 255, 0.3)"
                        color="rgba(151, 15, 255, 0.9)"
                        boxShadow="0 8px 32px rgba(151, 15, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                        _hover={{
                            transform: "translateY(-2px)",
                            bg: "rgba(151, 15, 255, 0.25)",
                            boxShadow: "0 12px 40px rgba(151, 15, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                            border: "1px solid rgba(151, 15, 255, 0.5)"
                        }}
                        _active={{
                            transform: "translateY(0px)",
                            bg: "rgba(151, 15, 255, 0.3)"
                        }}
                    />
                </MotionBox>
            )}

            {/* Chat Interface - shows when chat is open */}
            <AnimatePresence>
                {isOpen && (
                    <MotionBox
                        position="fixed"
                        bottom="20px"
                        right="20px"
                        width={isMinimized ? "80px" : "400px"}
                        height={isMinimized ? "80px" : "600px"}
                        bg="rgba(0, 0, 0, 0.85)"
                        backdropFilter="blur(20px)"
                        borderRadius="xl"
                        boxShadow="0 25px 50px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                        border="1px solid rgba(255, 255, 255, 0.1)"
                        zIndex="1000"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        display="flex"
                        flexDirection="column"
                        overflow="hidden"
                    >
                        {/* Header */}
                        <Flex
                            p={4}
                            borderBottom="1px solid rgba(151, 15, 255, 0.2)"
                            align="center"
                            justify="space-between"
                            bg="rgba(151, 15, 255, 0.15)"
                            backdropFilter="blur(10px)"
                            color="white"
                            borderTopRadius="xl"
                            cursor={isMinimized ? "pointer" : "default"}
                            onClick={isMinimized ? onToggle : undefined}
                            position="relative"
                            _before={{
                                content: '""',
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                height: "1px",
                                bg: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)"
                            }}
                        >
                            <HStack spacing={3}>
                                {!isMinimized && (
                                    <>
                                        <Avatar
                                            size="sm"
                                            name="Alice"
                                            bg="rgba(151, 15, 255, 0.3)"
                                            color="white"
                                            border="1px solid rgba(255, 255, 255, 0.2)"
                                        />
                                        <VStack align="start" spacing={0}>
                                            <Text fontWeight="bold" fontSize="sm" color="white">Alice - Legal AI</Text>
                                            <Text fontSize="xs" color="rgba(255, 255, 255, 0.7)">Online</Text>
                                        </VStack>
                                    </>
                                )}
                            </HStack>
                            {!isMinimized && (
                                <HStack spacing={1}>
                                    <IconButton
                                        aria-label="Minimize chat"
                                        icon={<FiMinimize2 />}
                                        size="sm"
                                        variant="ghost"
                                        color="white"
                                        bg="rgba(255, 255, 255, 0.1)"
                                        _hover={{
                                            bg: "rgba(255, 255, 255, 0.2)",
                                            backdropFilter: "blur(10px)"
                                        }}
                                        onClick={onToggle}
                                        borderRadius="lg"
                                    />
                                    <IconButton
                                        aria-label="Close chat"
                                        icon={<FiX />}
                                        size="sm"
                                        variant="ghost"
                                        color="white"
                                        bg="rgba(255, 255, 255, 0.1)"
                                        _hover={{
                                            bg: "rgba(255, 255, 255, 0.2)",
                                            backdropFilter: "blur(10px)"
                                        }}
                                        onClick={onClose}
                                        borderRadius="lg"
                                    />
                                </HStack>
                            )}
                        </Flex>

                        {!isMinimized && (
                            <>
                                {/* Messages */}
                                <VStack
                                    flex="1"
                                    spacing={3}
                                    p={4}
                                    align="stretch"
                                    overflowY="auto"
                                    maxH="400px"
                                    bg="rgba(0, 0, 0, 0.2)"
                                    css={{
                                        '&::-webkit-scrollbar': {
                                            width: '6px',
                                        },
                                        '&::-webkit-scrollbar-track': {
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            borderRadius: '3px',
                                        },
                                        '&::-webkit-scrollbar-thumb': {
                                            background: 'rgba(151, 15, 255, 0.5)',
                                            borderRadius: '3px',
                                        },
                                        '&::-webkit-scrollbar-thumb:hover': {
                                            background: 'rgba(151, 15, 255, 0.7)',
                                        },
                                    }}
                                >
                                    {messages.map((message) => (
                                        <Flex
                                            key={message.id}
                                            justify={message.sender === 'user' ? 'flex-end' : 'flex-start'}
                                        >
                                            <Box
                                                maxW="80%"
                                                p={3}
                                                borderRadius="xl"
                                                bg={message.sender === 'user'
                                                    ? 'rgba(151, 15, 255, 0.8)'
                                                    : 'rgba(255, 255, 255, 0.1)'
                                                }
                                                backdropFilter="blur(10px)"
                                                border="1px solid"
                                                borderColor={message.sender === 'user'
                                                    ? 'rgba(151, 15, 255, 0.3)'
                                                    : 'rgba(255, 255, 255, 0.2)'
                                                }
                                                color="white"
                                                boxShadow={message.sender === 'user'
                                                    ? '0 8px 20px rgba(151, 15, 255, 0.3)'
                                                    : '0 8px 20px rgba(0, 0, 0, 0.3)'
                                                }
                                                position="relative"
                                                _before={message.sender === 'user' ? {
                                                    content: '""',
                                                    position: "absolute",
                                                    top: 0,
                                                    left: 0,
                                                    right: 0,
                                                    bottom: 0,
                                                    bg: "linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent)",
                                                    borderRadius: "xl",
                                                    pointerEvents: "none"
                                                } : {}}
                                            >
                                                <Text fontSize="sm">{message.text}</Text>
                                                <Text
                                                    fontSize="xs"
                                                    opacity={0.7}
                                                    mt={1}
                                                >
                                                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </Text>
                                            </Box>
                                        </Flex>
                                    ))}
                                    {isLoading && (
                                        <Flex justify="flex-start">
                                            <Box
                                                p={3}
                                                borderRadius="xl"
                                                bg="rgba(255, 255, 255, 0.1)"
                                                backdropFilter="blur(10px)"
                                                border="1px solid rgba(255, 255, 255, 0.2)"
                                                boxShadow="0 8px 20px rgba(0, 0, 0, 0.3)"
                                            >
                                                <HStack spacing={2}>
                                                    <Spinner size="sm" color="rgba(151, 15, 255, 0.8)" />
                                                    <Text fontSize="sm" color="white">Alice is thinking...</Text>
                                                </HStack>
                                            </Box>
                                        </Flex>
                                    )}
                                    <div ref={messagesEndRef} />
                                </VStack>

                                {/* Input */}
                                <Box
                                    p={4}
                                    borderTop="1px solid rgba(151, 15, 255, 0.2)"
                                    bg="rgba(255, 255, 255, 0.05)"
                                    backdropFilter="blur(10px)"
                                    borderBottomRadius="xl"
                                >
                                    <HStack spacing={2}>
                                        <Input
                                            ref={inputRef}
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            placeholder="Ask a legal question..."
                                            size="sm"
                                            onKeyPress={handleKeyPress}
                                            disabled={isLoading}
                                            color="white"
                                            bg="rgba(255, 255, 255, 0.1)"
                                            backdropFilter="blur(10px)"
                                            border="1px solid rgba(255, 255, 255, 0.2)"
                                            borderRadius="lg"
                                            _placeholder={{ color: "rgba(255, 255, 255, 0.6)" }}
                                            _focus={{
                                                borderColor: "rgba(151, 15, 255, 0.8)",
                                                boxShadow: "0 0 0 2px rgba(151, 15, 255, 0.3)",
                                                bg: "rgba(255, 255, 255, 0.15)"
                                            }}
                                            _hover={{
                                                bg: "rgba(255, 255, 255, 0.15)"
                                            }}
                                        />
                                        <IconButton
                                            aria-label="Send message"
                                            icon={<FiSend />}
                                            size="sm"
                                            bg="rgba(151, 15, 255, 0.8)"
                                            color="white"
                                            backdropFilter="blur(10px)"
                                            border="1px solid rgba(151, 15, 255, 0.3)"
                                            borderRadius="lg"
                                            _hover={{
                                                bg: "rgba(151, 15, 255, 0.9)",
                                                transform: "translateY(-1px)",
                                                boxShadow: "0 4px 12px rgba(151, 15, 255, 0.4)"
                                            }}
                                            _active={{
                                                transform: "translateY(0)"
                                            }}
                                            onClick={handleSendMessage}
                                            disabled={!inputValue.trim() || isLoading}
                                        />
                                    </HStack>
                                </Box>
                            </>
                        )}
                    </MotionBox>
                )}
            </AnimatePresence>
        </>
    )
}

export default Chatbot
