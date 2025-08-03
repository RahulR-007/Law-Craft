import React from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Flex,
  useColorMode,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FiFileText } from 'react-icons/fi'
import Chatbot from '../components/Chatbot'
import Navigation from '../components/Navigation'

const MotionBox = motion(Box)

const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const { colorMode } = useColorMode()

  const handleStartDocument = () => {
    navigate('/generate')
  }

  return (
    <Box
      minH="100vh"
      bg={colorMode === 'dark' ? 
        "linear-gradient(135deg, rgba(12, 12, 12, 0.95) 0%, rgba(26, 10, 46, 0.9) 50%, rgba(22, 33, 62, 0.85) 100%)" :
        "linear-gradient(135deg, rgba(248, 248, 248, 0.95) 0%, rgba(230, 220, 255, 0.9) 50%, rgba(220, 235, 255, 0.85) 100%)"
      }
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: colorMode === 'dark' ? 
          'radial-gradient(circle at 20% 30%, rgba(151, 15, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(151, 15, 255, 0.08) 0%, transparent 50%)' :
          'radial-gradient(circle at 20% 30%, rgba(151, 15, 255, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(151, 15, 255, 0.03) 0%, transparent 50%)',
        pointerEvents: 'none',
      }}
    >
      <Navigation currentPage="dashboard" />

      {/* Enhanced liquid glass background effects */}
      <Box
        position="absolute"
        top="10%"
        left="5%"
        w="300px"
        h="300px"
        borderRadius="50%"
        bg={colorMode === 'dark' ? "rgba(151, 15, 255, 0.15)" : "rgba(151, 15, 255, 0.08)"}
        opacity="0.6"
        filter="blur(60px)"
        backdropFilter="blur(20px)"
      />
      <Box
        position="absolute"
        bottom="15%"
        right="8%"
        w="250px"
        h="250px"
        borderRadius="50%"
        bg={colorMode === 'dark' ? "rgba(151, 15, 255, 0.12)" : "rgba(151, 15, 255, 0.06)"}
        opacity="0.5"
        filter="blur(80px)"
        backdropFilter="blur(20px)"
      />
      <Box
        position="absolute"
        top="40%"
        right="15%"
        w="180px"
        h="180px"
        borderRadius="50%"
        bg={colorMode === 'dark' ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.3)"}
        opacity="0.4"
        filter="blur(50px)"
        backdropFilter="blur(15px)"
      />

      <Container maxW="6xl" pt={20}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <VStack spacing={12} textAlign="center">
            {/* Welcome Section */}
            <VStack spacing={6}>
              <Heading
                fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                color={colorMode === 'dark' ? 'white' : 'gray.800'}
                fontWeight="900"
              >
                Welcome to{' '}
                <Text as="span" color="brand.500">
                  LawCraft AI
                </Text>
              </Heading>
              <Text
                fontSize="xl"
                color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}
                maxW="2xl"
                lineHeight="tall"
              >
                Powered by Alice - Your AI legal assistant ready to help you create
                professional legal documents with ease.
              </Text>
            </VStack>

            {/* Action Buttons */}
            <HStack spacing={6} flexWrap="wrap" justify="center">
              <Button
                size="lg"
                bg="brand.500"
                color="white"
                _hover={{ bg: 'brand.600' }}
                onClick={handleStartDocument}
                rightIcon={<FiFileText />}
                fontWeight="700"
                textTransform="uppercase"
                px={8}
              >
                Try AI Document Generation
              </Button>
              <Button
                size="lg"
                variant="outline"
                borderColor="brand.500"
                color="brand.500"
                _hover={{ bg: 'brand.500', color: 'white' }}
                onClick={() => navigate('/pricing')}
                fontWeight="700"
                textTransform="uppercase"
                px={8}
              >
                View Pricing
              </Button>
            </HStack>

            {/* Feature highlights */}
            <Box w="full" maxW="4xl" mt={12}>
              <Heading fontSize="2xl" color={colorMode === 'dark' ? 'white' : 'gray.800'} mb={8} textAlign="center">
                What You Can Create
              </Heading>
              <Flex
                direction={{ base: 'column', md: 'row' }}
                justify="space-between"
                gap={8}
              >
                {[
                  {
                    title: 'Contract Agreements',
                    description: 'Professional business contracts tailored to your needs',
                  },
                  {
                    title: 'Non-Disclosure Agreements',
                    description: 'Protect your confidential information with custom NDAs',
                  },
                  {
                    title: 'Loan Agreements',
                    description: 'Secure loan documents with proper legal structure',
                  },
                ].map((feature, index) => (
                  <MotionBox
                    key={index}
                    bg={colorMode === 'dark' ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.7)"}
                    backdropFilter="blur(20px)"
                    borderRadius="xl"
                    p={6}
                    border={`1px solid ${colorMode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(151, 15, 255, 0.2)'}`}
                    textAlign="center"
                    flex="1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    boxShadow={colorMode === 'dark' ? 
                      "0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)" :
                      "0 20px 40px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5)"
                    }
                    position="relative"
                    _hover={{
                      borderColor: 'rgba(151, 15, 255, 0.6)',
                      boxShadow: colorMode === 'dark' ?
                        '0 25px 50px rgba(151, 15, 255, 0.2), 0 0 30px rgba(151, 15, 255, 0.3)' :
                        '0 25px 50px rgba(151, 15, 255, 0.1), 0 0 20px rgba(151, 15, 255, 0.2)',
                      transform: 'translateY(-5px)',
                      bg: colorMode === 'dark' ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0.9)",
                    }}
                    _before={{
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      bg: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent)',
                      borderRadius: 'xl',
                      pointerEvents: 'none',
                    }}
                  >
                    <Heading fontSize="lg" color="brand.500" mb={3}>
                      {feature.title}
                    </Heading>
                    <Text color={colorMode === 'dark' ? 'gray.400' : 'gray.600'} fontSize="sm">
                      {feature.description}
                    </Text>
                  </MotionBox>
                ))}
              </Flex>
            </Box>
          </VStack>
        </MotionBox>
      </Container>
      {/* Floating AI Legal Assistant Chatbot */}
      <Chatbot />
    </Box>
  )
}

export default Dashboard
