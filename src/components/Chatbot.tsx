import React, { useState, useRef, useEffect } from 'react'
import {
    Box,
    VStack,
    HStack,
    Text,
    Input,
    useToast,
    IconButton,
    Spinner,
    Avatar,
    Flex,
} from '@chakra-ui/react'
import { FiSend, FiMessageCircle, FiX, FiMinimize2 } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

const MotionBox = motion(Box)

interface Message {
    id: string
    text: string
    sender: 'user' | 'bot'
    timestamp: Date
}

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isMinimized, setIsMinimized] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: 'Hello! I\'m Alice, your AI legal assistant. I can help you with legal document questions, contract advice, and general legal guidance. How can I assist you today?',
            sender: 'bot',
            timestamp: new Date()
        }
    ])
    const [inputValue, setInputValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const toast = useToast()

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

    // Free AI API using Hugging Face Inference API (no key required)
    const sendMessage = async (message: string) => {
        setIsLoading(true)

        try {
            // Add user message
            const userMessage: Message = {
                id: Date.now().toString(),
                text: message,
                sender: 'user',
                timestamp: new Date()
            }
            setMessages(prev => [...prev, userMessage])

            // Use free Hugging Face API
            try {
                const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        inputs: `Legal Assistant: I am Alice, a legal AI assistant. User asks: "${message}". I respond with helpful legal guidance:`,
                        parameters: {
                            max_length: 150,
                            temperature: 0.7,
                            do_sample: true,
                            top_p: 0.9
                        }
                    })
                })

                let botText = "I'm here to help with legal questions. However, please note that I provide general information only and this doesn't constitute legal advice."

                if (response.ok) {
                    const data = await response.json()
                    if (data && data[0] && data[0].generated_text) {
                        // Extract the response part after our prompt
                        const fullText = data[0].generated_text
                        const responseStart = fullText.indexOf('I respond with helpful legal guidance:') + 'I respond with helpful legal guidance:'.length
                        const extractedResponse = fullText.substring(responseStart).trim()

                        if (extractedResponse && extractedResponse.length > 10) {
                            botText = extractedResponse.substring(0, 300) + (extractedResponse.length > 300 ? '...' : '')
                        }
                    }
                }

                // Add context-aware legal responses
                if (message.toLowerCase().includes('contract')) {
                    botText = "Regarding contracts: A contract is a legally binding agreement between parties. Key elements include offer, acceptance, consideration, and mutual consent. For specific contract review or drafting, I recommend consulting with a qualified attorney. " + botText
                } else if (message.toLowerCase().includes('nda') || message.toLowerCase().includes('non-disclosure')) {
                    botText = "NDAs (Non-Disclosure Agreements) protect confidential information. They typically include definitions of confidential information, obligations of receiving party, and duration of confidentiality. " + botText
                } else if (message.toLowerCase().includes('loan')) {
                    botText = "Loan agreements should specify loan amount, interest rate, repayment terms, and consequences of default. Both parties should understand all terms before signing. " + botText
                }

                const botResponse: Message = {
                    id: (Date.now() + 1).toString(),
                    text: botText,
                    sender: 'bot',
                    timestamp: new Date()
                }

                setMessages(prev => [...prev, botResponse])
            } catch (apiError) {
                console.log('API call failed, using fallback response')

                // Fallback intelligent responses based on keywords
                let fallbackResponse = "I understand you're asking about legal matters. "

                const lowerMessage = message.toLowerCase()
                if (lowerMessage.includes('contract')) {
                    fallbackResponse += "For contracts, ensure all parties understand the terms, obligations, and consequences. Key elements include clear offer, acceptance, consideration, and legal capacity of parties. Always have important contracts reviewed by a legal professional."
                } else if (lowerMessage.includes('nda') || lowerMessage.includes('non-disclosure')) {
                    fallbackResponse += "NDAs are crucial for protecting confidential information. They should clearly define what constitutes confidential information, duration of confidentiality, and permitted uses. Consider having an attorney draft or review your NDA."
                } else if (lowerMessage.includes('loan')) {
                    fallbackResponse += "Loan agreements should specify the principal amount, interest rate, payment schedule, and default consequences. Ensure compliance with applicable lending laws and consider legal review for significant amounts."
                } else if (lowerMessage.includes('law') || lowerMessage.includes('legal')) {
                    fallbackResponse += "Legal matters can be complex and vary by jurisdiction. While I can provide general information, specific legal advice should come from a qualified attorney familiar with your local laws and circumstances."
                } else {
                    fallbackResponse += "I can help with general legal information about contracts, NDAs, loan agreements, and other legal documents. However, for specific legal advice tailored to your situation, please consult with a qualified attorney."
                }

                fallbackResponse += " Is there a specific aspect of this topic you'd like me to explain further?"

                const botResponse: Message = {
                    id: (Date.now() + 1).toString(),
                    text: fallbackResponse,
                    sender: 'bot',
                    timestamp: new Date()
                }

                setMessages(prev => [...prev, botResponse])
            }
        } catch (error) {
            console.error('Error sending message:', error)
            toast({
                title: 'Error',
                description: 'Failed to send message. Please try again.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        } finally {
            setIsLoading(false)
        }
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
