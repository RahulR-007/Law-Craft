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
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Avatar,
  Badge,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { FiHome, FiUser, FiHelpCircle, FiFileText, FiLogOut } from 'react-icons/fi'
import Chatbot from '../components/Chatbot'

const MotionBox = motion(Box)

const Navigation: React.FC = () => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const { isOpen, onClose } = useDisclosure()
  const toast = useToast()

  const handleLogout = async () => {
    const { error } = await signOut()
    if (error) {
      toast({
        title: 'Error signing out',
        description: error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } else {
      navigate('/')
    }
  }

  return (
    <>
      <HStack
        position="fixed"
        top="20px"
        left="10px"
        spacing={4}
        bg="rgba(0, 0, 0, 0.8)"
        backdropFilter="blur(10px)"
        borderRadius="lg"
        p={3}
        border="1px solid"
        borderColor="rgba(151, 15, 255, 0.3)"
        boxShadow="0 0 10px rgba(151, 15, 255, 0.5)"
        zIndex={1000}
      >
        <Button
          size="sm"
          variant="ghost"
          color="white"
          _hover={{ color: 'brand.500' }}
          onClick={() => navigate('/')}
        >
          <FiHome />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          color="white"
          _hover={{ color: 'brand.500' }}
          onClick={() => navigate('/profile')}
        >
          <FiUser />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          color="white"
          _hover={{ color: 'brand.500' }}
          onClick={() => navigate('/help')}
        >
          <FiHelpCircle />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          color="white"
          _hover={{ color: 'brand.500' }}
          onClick={() => navigate('/generate')}
        >
          <FiFileText />
        </Button>
      </HStack>

      {/* User Profile Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay backdropFilter="blur(5px)" />
        <ModalContent bg="black.900" border="1px solid" borderColor="brand.500">
          <ModalHeader color="white">Profile</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody pb={6}>
            <VStack spacing={4} align="center">
              <Avatar name={user?.user_metadata?.fullname || user?.email} size="lg" />
              <Text color="white" fontSize="xl" fontWeight="bold">
                Welcome, {user?.user_metadata?.fullname || user?.email}
              </Text>
              <HStack>
                <Text color="gray.400">Plan:</Text>
                <Badge colorScheme="purple">
                  {user?.user_metadata?.plan_name || 'Free'}
                </Badge>
              </HStack>
              <HStack>
                <Text color="gray.400">Tokens:</Text>
                <Text color="white">{user?.user_metadata?.tokens || 2}</Text>
              </HStack>
              <Button
                leftIcon={<FiLogOut />}
                colorScheme="red"
                variant="outline"
                onClick={handleLogout}
                w="full"
              >
                Logout
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export const Dashboard: React.FC = () => {
  const navigate = useNavigate()

  const handleStartDocument = () => {
    navigate('/generate')
  }

  return (
    <Box
      minH="100vh"
      bg="linear-gradient(135deg, rgba(12, 12, 12, 0.95) 0%, rgba(26, 10, 46, 0.9) 50%, rgba(22, 33, 62, 0.85) 100%)"
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 30%, rgba(151, 15, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(151, 15, 255, 0.08) 0%, transparent 50%)',
        pointerEvents: 'none',
      }}
    >
      <Navigation />

      {/* Enhanced liquid glass background effects */}
      <Box
        position="absolute"
        top="10%"
        left="5%"
        w="300px"
        h="300px"
        borderRadius="50%"
        bg="rgba(151, 15, 255, 0.15)"
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
        bg="rgba(151, 15, 255, 0.12)"
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
        bg="rgba(255, 255, 255, 0.05)"
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
                color="white"
                fontWeight="900"
              >
                Welcome to{' '}
                <Text as="span" color="brand.500">
                  LawCraft AI
                </Text>
              </Heading>
              <Text
                fontSize="xl"
                color="gray.400"
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
              <Heading fontSize="2xl" color="white" mb={8} textAlign="center">
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
                    bg="rgba(255, 255, 255, 0.08)"
                    backdropFilter="blur(20px)"
                    borderRadius="xl"
                    p={6}
                    border="1px solid rgba(255, 255, 255, 0.2)"
                    textAlign="center"
                    flex="1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    boxShadow="0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                    position="relative"
                    _hover={{
                      borderColor: 'rgba(151, 15, 255, 0.6)',
                      boxShadow: '0 25px 50px rgba(151, 15, 255, 0.2), 0 0 30px rgba(151, 15, 255, 0.3)',
                      transform: 'translateY(-5px)',
                      bg: 'rgba(255, 255, 255, 0.12)',
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
                    <Text color="gray.400" fontSize="sm">
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
