import React, { useState } from 'react'
import {
    Box,
    Container,
    Heading,
    Text,
    Button,
    Textarea,
    Input,
    VStack,
    FormControl,
    FormLabel,
    Select,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Spinner,
    Alert,
    AlertIcon,
    useColorMode,
    useBreakpointValue,
    Flex,
    Progress,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { FiDownload, FiSend } from 'react-icons/fi'
import FloatingNavigation from '../components/FloatingNavigation'
import { backendExportDocx, backendGenerateDocument, backendHealth } from '../lib/backendClient'
import { formatLegalDocument, validateLegalContent } from '../lib/legalSafetyPolicy'

const MotionBox = motion(Box)

const DocumentGenerator: React.FC = () => {
    const { user } = useAuth()
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { colorMode } = useColorMode()

    // Responsive values
    const containerPadding = useBreakpointValue({ base: '60px', md: '80px' })
    const headingSize = useBreakpointValue({ base: '2xl', md: '3xl', lg: '4xl' })
    const buttonSize = useBreakpointValue({ base: 'md', md: 'lg' })
    const textareaRows = useBreakpointValue({ base: 4, md: 6 })

    const [formData, setFormData] = useState({
        documentType: '',
        prompt: '',
        partyName1: '',
        partyName2: '',
        amount: '',
        date: '',
    })
    const [isGenerating, setIsGenerating] = useState(false)
    const [generatedDocument, setGeneratedDocument] = useState('')
    const [generationProgress, setGenerationProgress] = useState(0)
    const [serverHealth, setServerHealth] = useState<boolean | null>(null)

    // Check server health on mount
    React.useEffect(() => {
        backendHealth().then((r) => setServerHealth(r.ok)).catch(() => setServerHealth(false))
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const buildGenerationPrompt = (): string => {
        const documentType = formData.documentType
        const userPrompt = formData.prompt

        const basePrompt = `You are a professional legal document generator. Create a COMPREHENSIVE and DETAILED ${documentType}.

CRITICAL: Generate minimum 4 pages of content (2000+ words). Include all possible details even if user didn't specify them.

USER REQUIREMENTS:
${userPrompt}

${formData.partyName1 || formData.partyName2 || formData.amount || formData.date
                ? `
DETAILS PROVIDED:
${formData.partyName1 ? `- Party 1: ${formData.partyName1}` : ''}
${formData.partyName2 ? `- Party 2: ${formData.partyName2}` : ''}
${formData.amount ? `- Amount/Value: ${formData.amount}` : ''}
${formData.date ? `- Date: ${formData.date}` : ''}
`
                : ''
            }

EXPAND WITH:
- Background information for each party
- Detailed terms and conditions
- Payment/compensation schedules (if applicable)
- Timeline and milestones
- Performance standards and expectations
- Liability and indemnification clauses
- Insurance requirements (if applicable)
- Dispute resolution procedures
- Amendment and modification processes
- Confidentiality obligations
- Non-compete and non-solicitation (if applicable)
- Warranties and representations
- Default and remedies
- Termination procedures and notice periods
- Post-termination obligations
- Governing law and jurisdiction
- Severability and entire agreement clauses
- Signature pages for all parties

DOCUMENT STRUCTURE (MINIMUM 4 PAGES):
PAGE 1: Title, Parties, Recitals, Purpose
PAGE 2: Main Terms and Conditions (Sections 1-5)
PAGE 3: Legal Obligations, Liability, Insurance (Sections 6-10)
PAGE 4: Dispute Resolution, Termination, Signatures (Sections 11+)

FORMATTING:
- Use proper legal numbering (1., 1.1, 1.1.1)
- Bold key terms on first use
- Use WHEREAS clauses in preamble
- Add line breaks between sections
- Include detailed headers for each section
- Make content readable but formal

LANGUAGE STANDARDS:
- Professional legal tone throughout
- Clear, precise language without ambiguity
- Defined terms in quotation marks
- Consistent terminology
- Active voice preferred
- No slang or informal language

MANDATORY ELEMENTS FOR ${documentType.toUpperCase()}:
- Full legal names and addresses of all parties
- Effective date and term length
- Complete description of obligations
- Payment terms and schedules (if applicable)
- Performance standards and deliverables
- Warranties and representations
- Limitation of liability clauses
- Indemnification provisions
- Dispute resolution and arbitration clauses
- Governing law and jurisdiction
- Termination conditions and procedures
- Amendment and modification procedures
- Confidentiality obligations
- Non-disclosure requirements
- Severability clause (if one provision is invalid, others remain valid)
- Entire agreement statement
- Signature blocks with dates
- Proper notarization where required

TONE AND STYLE:
- Formal and professional
- Use legal terminology appropriately
- Be thorough and detailed
- Anticipate potential disputes
- Address edge cases and exceptions
- Provide clear guidance to signers
- Make the document enforceable

START THE DOCUMENT IMMEDIATELY. No introduction. Generate ONLY the legal document.
Target length: 2000+ words (approximately 4 pages)`;

        return basePrompt
    }

    const handleGenerate = async () => {
        if (!formData.documentType || !formData.prompt) {
            toast({
                title: 'Missing Information',
                description: 'Please select a document type and provide a description.',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            })
            return
        }

        if (serverHealth === false) {
            toast({
                title: 'Server Unavailable',
                description: 'Backend AI server is not responding. Please start the local API server.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
            return
        }

        setIsGenerating(true)
        setGenerationProgress(0)

        try {
            // Simulate progress for UX
            const progressInterval = setInterval(() => {
                setGenerationProgress(prev => Math.min(prev + 10, 90))
            }, 500)

            // Generate document using backend (which talks to local Ollama)
            const prompt = buildGenerationPrompt()
            const { text: rawDocument } = await backendGenerateDocument(prompt, 5)

            clearInterval(progressInterval)
            setGenerationProgress(95)

            if (!rawDocument.trim()) {
                throw new Error('Generated document is empty')
            }

            // Validate the content
            const validation = validateLegalContent(rawDocument, formData.documentType)

            if (validation.violations.length > 0) {
                console.warn('Content validation warnings:', validation.violations)
                // Continue anyway, these are mostly warnings
            }

            // Format document with disclaimer
            const formattedDocument = formatLegalDocument(
                rawDocument,
                formData.documentType,
                new Date()
            )

            setGeneratedDocument(formattedDocument)
            setGenerationProgress(100)

            // Show success message
            toast({
                title: 'Document Generated Successfully',
                description: 'Your legal document has been created. Please review carefully before using.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })

            // Open modal with delay to ensure content is set
            setTimeout(() => onOpen(), 300)
        } catch (error) {
            console.error('Generation error:', error)

            // Check if backend died
            const stillHealthy = await backendHealth().then((r) => r.ok).catch(() => false)
            setServerHealth(stillHealthy)

            toast({
                title: 'Generation Failed',
                description: `There was an error generating your document: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        } finally {
            setIsGenerating(false)
            setGenerationProgress(0)
        }
    }

    const handleDownload = async () => {
        try {
            const title = formData.documentType || 'Generated Document'
            const blob = await backendExportDocx(title, generatedDocument)

            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `${title}-${Date.now()}.docx`
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(url)

            toast({
                title: 'Downloaded',
                description: 'DOCX downloaded successfully.',
                status: 'success',
                duration: 2000,
                isClosable: true,
            })
        } catch (e: any) {
            toast({
                title: 'Download failed',
                description: e?.message ?? 'Failed to export DOCX',
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
        }
    }

    return (
        <Box
            minH="100vh"
            bg={colorMode === 'dark' ?
                "linear-gradient(135deg, rgba(12, 12, 12, 0.95) 0%, rgba(26, 10, 46, 0.9) 50%, rgba(22, 33, 62, 0.85) 100%)" :
                "linear-gradient(135deg, rgba(248, 248, 248, 0.95) 0%, rgba(230, 220, 255, 0.9) 50%, rgba(220, 235, 255, 0.85) 100%)"
            }
            position="relative"
        >
            <FloatingNavigation />

            <Container maxW="4xl" pt={containerPadding} pb="20px" px={{ base: 4, md: 8 }}>
                <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <VStack spacing={{ base: 6, md: 8 }} textAlign="center" mb={{ base: 8, md: 12 }}>
                        <Heading
                            fontSize={headingSize}
                            color={colorMode === 'dark' ? 'white' : 'gray.800'}
                            fontWeight="900"
                            lineHeight="shorter"
                        >
                            AI Document <Text as="span" color="brand.500">Generator</Text>
                        </Heading>
                        <Text
                            fontSize={{ base: 'md', md: 'xl' }}
                            color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}
                            maxW="2xl"
                            px={{ base: 4, md: 0 }}
                        >
                            Create professional legal documents powered by AI. Simply describe what you need, and Alice will generate it for you.
                        </Text>
                    </VStack>

                    {/* Server Health Alert */}
                    {serverHealth === false && (
                        <Alert status="error" borderRadius="lg" mb={6}>
                            <AlertIcon />
                            <Box>
                                <Text fontWeight="bold">AI Backend Unavailable</Text>
                                <Text fontSize="sm">
                                    Please start the local API server (it talks to your local Ollama).
                                </Text>
                            </Box>
                        </Alert>
                    )}

                    <Box
                        bg={colorMode === 'dark' ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.7)"}
                        backdropFilter="blur(20px)"
                        border={`1px solid ${colorMode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(151, 15, 255, 0.2)'}`}
                        borderRadius="2xl"
                        p={{ base: 6, md: 8 }}
                        boxShadow={colorMode === 'dark' ? 'none' : 'lg'}
                    >
                        <VStack spacing={6}>
                            <FormControl>
                                <FormLabel
                                    color={colorMode === 'dark' ? 'white' : 'gray.700'}
                                    fontSize={{ base: 'md', md: 'lg' }}
                                    fontWeight="bold"
                                >
                                    Document Type
                                </FormLabel>
                                <Select
                                    name="documentType"
                                    value={formData.documentType}
                                    onChange={handleInputChange}
                                    placeholder="Select document type"
                                    size={{ base: 'md', md: 'lg' }}
                                    bg={colorMode === 'dark' ? "rgba(255, 255, 255, 0.1)" : "white"}
                                    border={`1px solid ${colorMode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'}`}
                                    color={colorMode === 'dark' ? 'white' : 'gray.800'}
                                    _focus={{
                                        borderColor: 'brand.500',
                                        boxShadow: '0 0 0 1px #970fff'
                                    }}
                                >
                                    <option value="Contract Agreement" style={{ background: colorMode === 'dark' ? '#1a1a1a' : 'white', color: colorMode === 'dark' ? 'white' : 'black' }}>Contract Agreement</option>
                                    <option value="Non-Disclosure Agreement" style={{ background: colorMode === 'dark' ? '#1a1a1a' : 'white', color: colorMode === 'dark' ? 'white' : 'black' }}>Non-Disclosure Agreement</option>
                                    <option value="Loan Agreement" style={{ background: colorMode === 'dark' ? '#1a1a1a' : 'white', color: colorMode === 'dark' ? 'white' : 'black' }}>Loan Agreement</option>
                                    <option value="Employment Contract" style={{ background: colorMode === 'dark' ? '#1a1a1a' : 'white', color: colorMode === 'dark' ? 'white' : 'black' }}>Employment Contract</option>
                                    <option value="Lease Agreement" style={{ background: colorMode === 'dark' ? '#1a1a1a' : 'white', color: colorMode === 'dark' ? 'white' : 'black' }}>Lease Agreement</option>
                                </Select>
                            </FormControl>

                            <Flex direction={{ base: 'column', md: 'row' }} gap={{ base: 4, md: 4 }} w="full">
                                <FormControl>
                                    <FormLabel
                                        color={colorMode === 'dark' ? 'white' : 'gray.700'}
                                        fontSize={{ base: 'sm', md: 'md' }}
                                    >
                                        Party 1 Name
                                    </FormLabel>
                                    <Input
                                        name="partyName1"
                                        value={formData.partyName1}
                                        onChange={handleInputChange}
                                        placeholder="Enter first party name"
                                        size={{ base: 'md', md: 'lg' }}
                                        bg={colorMode === 'dark' ? "rgba(255, 255, 255, 0.1)" : "white"}
                                        border={`1px solid ${colorMode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'}`}
                                        color={colorMode === 'dark' ? 'white' : 'gray.800'}
                                        _focus={{
                                            borderColor: 'brand.500',
                                            boxShadow: '0 0 0 1px #970fff'
                                        }}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel
                                        color={colorMode === 'dark' ? 'white' : 'gray.700'}
                                        fontSize={{ base: 'sm', md: 'md' }}
                                    >
                                        Party 2 Name
                                    </FormLabel>
                                    <Input
                                        name="partyName2"
                                        value={formData.partyName2}
                                        onChange={handleInputChange}
                                        placeholder="Enter second party name"
                                        size={{ base: 'md', md: 'lg' }}
                                        bg={colorMode === 'dark' ? "rgba(255, 255, 255, 0.1)" : "white"}
                                        border={`1px solid ${colorMode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'}`}
                                        color={colorMode === 'dark' ? 'white' : 'gray.800'}
                                        _focus={{
                                            borderColor: 'brand.500',
                                            boxShadow: '0 0 0 1px #970fff'
                                        }}
                                    />
                                </FormControl>
                            </Flex>

                            <Flex direction={{ base: 'column', md: 'row' }} gap={{ base: 4, md: 4 }} w="full">
                                <FormControl>
                                    <FormLabel
                                        color={colorMode === 'dark' ? 'white' : 'gray.700'}
                                        fontSize={{ base: 'sm', md: 'md' }}
                                    >
                                        Amount (if applicable)
                                    </FormLabel>
                                    <Input
                                        name="amount"
                                        value={formData.amount}
                                        onChange={handleInputChange}
                                        placeholder="Enter amount"
                                        type="text"
                                        size={{ base: 'md', md: 'lg' }}
                                        bg={colorMode === 'dark' ? "rgba(255, 255, 255, 0.1)" : "white"}
                                        border={`1px solid ${colorMode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'}`}
                                        color={colorMode === 'dark' ? 'white' : 'gray.800'}
                                        _focus={{
                                            borderColor: 'brand.500',
                                            boxShadow: '0 0 0 1px #970fff'
                                        }}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel
                                        color={colorMode === 'dark' ? 'white' : 'gray.700'}
                                        fontSize={{ base: 'sm', md: 'md' }}
                                    >
                                        Date (if applicable)
                                    </FormLabel>
                                    <Input
                                        name="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        type="date"
                                        size={{ base: 'md', md: 'lg' }}
                                        bg={colorMode === 'dark' ? "rgba(255, 255, 255, 0.1)" : "white"}
                                        border={`1px solid ${colorMode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'}`}
                                        color={colorMode === 'dark' ? 'white' : 'gray.800'}
                                        _focus={{
                                            borderColor: 'brand.500',
                                            boxShadow: '0 0 0 1px #970fff'
                                        }}
                                    />
                                </FormControl>
                            </Flex>

                            <FormControl>
                                <FormLabel
                                    color={colorMode === 'dark' ? 'white' : 'gray.700'}
                                    fontSize={{ base: 'md', md: 'lg' }}
                                    fontWeight="bold"
                                >
                                    Document Description
                                </FormLabel>
                                <Textarea
                                    name="prompt"
                                    value={formData.prompt}
                                    onChange={handleInputChange}
                                    placeholder="Describe the specific terms, conditions, and requirements for your legal document. Be as detailed as possible for the best results. Include any special clauses, modifications, or specific needs."
                                    rows={textareaRows}
                                    resize="vertical"
                                    size={{ base: 'md', md: 'lg' }}
                                    bg={colorMode === 'dark' ? "rgba(255, 255, 255, 0.1)" : "white"}
                                    border={`1px solid ${colorMode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'}`}
                                    color={colorMode === 'dark' ? 'white' : 'gray.800'}
                                    _focus={{
                                        borderColor: 'brand.500',
                                        boxShadow: '0 0 0 1px #970fff'
                                    }}
                                />
                            </FormControl>

                            {/* Legal Disclaimer */}
                            <Alert status="info" borderRadius="lg" bg={colorMode === 'dark' ? 'rgba(66, 153, 225, 0.1)' : 'rgba(66, 153, 225, 0.1)'}>
                                <AlertIcon />
                                <Box>
                                    <Text fontWeight="bold" fontSize="sm">AI-Generated Documents Require Professional Review</Text>
                                    <Text fontSize="xs" mt={1}>
                                        The generated documents are templates and must be reviewed by a qualified attorney before use. Laws vary by jurisdiction and your specific situation may require customized provisions.
                                    </Text>
                                </Box>
                            </Alert>

                            {user?.user_metadata?.tokens === 0 && (
                                <Alert status="warning" borderRadius="lg">
                                    <AlertIcon />
                                    You have no tokens remaining. Please upgrade your plan to generate documents.
                                </Alert>
                            )}

                            {/* Progress bar */}
                            {isGenerating && generationProgress > 0 && (
                                <Box w="full">
                                    <Progress value={generationProgress} size="sm" colorScheme="purple" hasStripe isAnimated />
                                    <Text fontSize="xs" color="gray.500" mt={2} textAlign="center">
                                        Generating document... {generationProgress}%
                                    </Text>
                                </Box>
                            )}

                            <Button
                                size={buttonSize}
                                bg="linear-gradient(135deg, #970fff, #7817ff)"
                                color="white"
                                onClick={handleGenerate}
                                isLoading={isGenerating}
                                loadingText="Generating..."
                                rightIcon={isGenerating ? <Spinner size="sm" /> : <FiSend />}
                                isDisabled={user?.user_metadata?.tokens === 0 || !formData.documentType || !formData.prompt}
                                w="full"
                                py={{ base: 4, md: 6 }}
                                fontSize={{ base: 'md', md: 'lg' }}
                                _hover={{
                                    bg: 'linear-gradient(135deg, #7817ff, #5a0bd9)'
                                }}
                            >
                                Generate Document with AI
                            </Button>
                        </VStack>
                    </Box>
                </MotionBox>
            </Container>

            {/* Document Preview Modal */}
            <Modal isOpen={isOpen} onClose={onClose} size={{ base: 'full', md: '6xl' }}>
                <ModalOverlay backdropFilter="blur(5px)" />
                <ModalContent
                    bg={colorMode === 'dark' ? "gray.800" : "white"}
                    border={`1px solid ${colorMode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'}`}
                    maxH={{ base: '100vh', md: '80vh' }}
                    m={{ base: 0, md: 4 }}
                >
                    <ModalHeader
                        color={colorMode === 'dark' ? 'white' : 'gray.800'}
                        fontSize={{ base: 'lg', md: 'xl' }}
                    >
                        Generated Document Preview
                    </ModalHeader>
                    <ModalCloseButton color={colorMode === 'dark' ? 'white' : 'gray.800'} />
                    <ModalBody pb={6}>
                        <VStack spacing={{ base: 3, md: 4 }}>
                            {/* Warning Alert */}
                            <Alert status="warning" borderRadius="lg">
                                <AlertIcon />
                                <Box>
                                    <Text fontWeight="bold">⚠️ Important Legal Notice</Text>
                                    <Text fontSize="sm">
                                        This document has been AI-generated and is provided as a template only. It MUST be reviewed by a qualified attorney before use. The generator is not a substitute for professional legal advice.
                                    </Text>
                                </Box>
                            </Alert>

                            <Box
                                w="full"
                                h={{ base: '300px', md: '400px' }}
                                overflowY="auto"
                                p={{ base: 3, md: 4 }}
                                bg={colorMode === 'dark' ? "gray.700" : "gray.50"}
                                borderRadius="lg"
                                border={`1px solid ${colorMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`}
                            >
                                <Text
                                    color={colorMode === 'dark' ? 'white' : 'gray.800'}
                                    fontSize="sm"
                                    fontFamily="monospace"
                                    whiteSpace="pre-wrap"
                                    lineHeight="tall"
                                >
                                    {generatedDocument}
                                </Text>
                            </Box>
                            <Flex direction={{ base: 'column', md: 'row' }} gap={{ base: 3, md: 4 }} w="full">
                                <Button
                                    size={{ base: 'md', md: 'lg' }}
                                    bg="linear-gradient(135deg, #970fff, #7817ff)"
                                    color="white"
                                    onClick={handleDownload}
                                    rightIcon={<FiDownload />}
                                    flex={1}
                                    _hover={{
                                        bg: 'linear-gradient(135deg, #7817ff, #5a0bd9)'
                                    }}
                                >
                                    Download Document
                                </Button>
                                <Button
                                    size={{ base: 'md', md: 'lg' }}
                                    variant="outline"
                                    borderColor="brand.500"
                                    color="brand.500"
                                    onClick={onClose}
                                    flex={1}
                                    _hover={{
                                        bg: 'brand.500',
                                        color: 'white'
                                    }}
                                >
                                    Close Preview
                                </Button>
                            </Flex>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default DocumentGenerator
