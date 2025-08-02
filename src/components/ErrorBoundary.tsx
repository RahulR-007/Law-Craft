import { Component, ErrorInfo, ReactNode } from 'react'
import {
    Box,
    Container,
    Heading,
    Text,
    Button,
    VStack,
    Alert,
    AlertIcon,
    Code
} from '@chakra-ui/react'

interface Props {
    children?: ReactNode
}

interface State {
    hasError: boolean
    error?: Error
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    }

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error }
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo)
    }

    public render() {
        if (this.state.hasError) {
            return (
                <Box bg="black" minH="100vh" display="flex" alignItems="center">
                    <Container maxW="container.md">
                        <VStack spacing={6} textAlign="center">
                            <Alert status="error" bg="red.900" color="white">
                                <AlertIcon />
                                <Box>
                                    <Heading size="md" mb={2}>
                                        Oops! Something went wrong
                                    </Heading>
                                    <Text>
                                        We're sorry, but an unexpected error occurred.
                                    </Text>
                                </Box>
                            </Alert>

                            {process.env.NODE_ENV === 'development' && this.state.error && (
                                <Box bg="gray.800" p={4} borderRadius="md" w="full">
                                    <Text color="red.300" fontSize="sm" mb={2}>
                                        Error Details:
                                    </Text>
                                    <Code color="red.200" fontSize="xs" display="block" whiteSpace="pre-wrap">
                                        {this.state.error.toString()}
                                    </Code>
                                </Box>
                            )}

                            <VStack spacing={3}>
                                <Button
                                    colorScheme="purple"
                                    onClick={() => window.location.href = '/'}
                                >
                                    Go to Homepage
                                </Button>
                                <Button
                                    variant="outline"
                                    colorScheme="gray"
                                    onClick={() => window.location.reload()}
                                >
                                    Refresh Page
                                </Button>
                            </VStack>
                        </VStack>
                    </Container>
                </Box>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
