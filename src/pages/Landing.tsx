import React, { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Flex,
  Image,
  VStack,
  HStack,
  Grid,
  GridItem,
  Icon,
  useBreakpointValue
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { 
  FiArrowRight, 
  FiMail, 
  FiShield, 
  FiFileText, 
  FiUsers, 
  FiZap,
  FiStar,
  FiTrendingUp,
  FiGlobe,
  FiClock,
  FiAward
} from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const MotionBox = motion(Box)
const MotionText = motion(Text)

// Floating law elements animation
const FloatingElements: React.FC = () => {
  return (
    <Box position="absolute" top="0" left="0" w="full" h="full" pointerEvents="none" overflow="hidden">
      {/* Justice Scale */}
      <motion.div
        style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          fontSize: '60px',
          color: 'rgba(151, 15, 255, 0.1)',
        }}
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        ⚖️
      </motion.div>

      {/* Gavel */}
      <motion.div
        style={{
          position: 'absolute',
          top: '60%',
          left: '5%',
          fontSize: '50px',
          color: 'rgba(151, 15, 255, 0.15)',
        }}
        animate={{
          y: [0, 15, 0],
          rotate: [0, -10, 0, 10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        🔨
      </motion.div>

      {/* Law Book */}
      <motion.div
        style={{
          position: 'absolute',
          top: '30%',
          left: '15%',
          fontSize: '40px',
          color: 'rgba(151, 15, 255, 0.1)',
        }}
        animate={{
          y: [0, -10, 0],
          x: [0, 5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      >
        📚
      </motion.div>

      {/* Building/Court */}
      <motion.div
        style={{
          position: 'absolute',
          top: '70%',
          right: '20%',
          fontSize: '45px',
          color: 'rgba(151, 15, 255, 0.12)',
        }}
        animate={{
          y: [0, -8, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      >
        🏛️
      </motion.div>

      {/* Contract/Document */}
      <motion.div
        style={{
          position: 'absolute',
          top: '15%',
          left: '80%',
          fontSize: '35px',
          color: 'rgba(151, 15, 255, 0.08)',
        }}
        animate={{
          y: [0, 12, 0],
          rotate: [0, 3, 0],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5
        }}
      >
        📄
      </motion.div>

      {/* Briefcase */}
      <motion.div
        style={{
          position: 'absolute',
          top: '80%',
          left: '70%',
          fontSize: '38px',
          color: 'rgba(151, 15, 255, 0.1)',
        }}
        animate={{
          y: [0, -12, 0],
          x: [0, -3, 0],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
      >
        💼
      </motion.div>
    </Box>
  )
}

interface SectionProps {
  isActive: boolean
  onNavigate: (section: number) => void
}

// Intro Section Component
const IntroSection: React.FC<SectionProps> = ({ isActive }) => {
  const navigate = useNavigate()

  return (
    <MotionBox
      position="absolute"
      top="0"
      left="0"
      w="full"
      h="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      opacity={isActive ? 1 : 0}
      visibility={isActive ? 'visible' : 'hidden'}
      transition="opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
      bg="linear-gradient(135deg, rgba(12, 12, 12, 0.95) 0%, rgba(26, 10, 46, 0.9) 50%, rgba(22, 33, 62, 0.85) 100%)"
      backdropFilter="blur(20px)"
      zIndex={isActive ? 2 : 1}
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 50%, rgba(151, 15, 255, 0.08) 0%, transparent 60%)',
        pointerEvents: 'none',
        opacity: isActive ? 1 : 0,
        transition: 'opacity 0.6s ease',
      }}
    >
      <FloatingElements />
      
      <Container maxW="1200px" textAlign="center">
        <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={12} alignItems="center">
          {/* Left side - Text content */}
          <GridItem>
            <VStack spacing={8} align={{ base: 'center', lg: 'start' }} textAlign={{ base: 'center', lg: 'left' }}>
              <MotionText
                fontSize={{ base: '48px', md: '64px', lg: '72px' }}
                fontWeight="900"
                lineHeight="0.9"
                color="white"
                initial={{ opacity: 0, y: 50 }}
                animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Revolutionize
                <br />
                Legal
                <br />
                <Text as="span" color="#970fff" position="relative">
                  Documentation
                  <motion.div
                    style={{
                      position: 'absolute',
                      bottom: '-10px',
                      left: '0',
                      right: '0',
                      height: '4px',
                      background: 'linear-gradient(90deg, #970fff, #7817ff)',
                      borderRadius: '2px',
                    }}
                    initial={{ scaleX: 0 }}
                    animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                  />
                </Text>
              </MotionText>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Text fontSize="xl" color="gray.300" maxW="500px" mb={8}>
                  Harness the power of AI to create professional legal documents in minutes. 
                  From contracts to NDAs, we make legal documentation accessible to everyone.
                </Text>

                <HStack spacing={4} justify={{ base: 'center', lg: 'start' }} flexWrap="wrap">
                  <Button
                    size="lg"
                    bg="linear-gradient(135deg, #970fff, #7817ff)"
                    color="white"
                    boxShadow="0 8px 20px rgba(151, 15, 255, 0.3)"
                    borderRadius="xl"
                    onClick={() => navigate('/auth')}
                    rightIcon={<FiArrowRight />}
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "0 12px 30px rgba(151, 15, 255, 0.4)",
                    }}
                    _active={{ transform: "translateY(0)" }}
                    px={8}
                    py={6}
                  >
                    Start Creating
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    borderColor="rgba(151, 15, 255, 0.4)"
                    color="white"
                    borderRadius="xl"
                    onClick={() => navigate('/dashboard')}
                    _hover={{
                      bg: 'rgba(151, 15, 255, 0.1)',
                      borderColor: '#970fff',
                      transform: "translateY(-2px)",
                    }}
                    px={8}
                    py={6}
                  >
                    View Demo
                  </Button>
                </HStack>
              </motion.div>
            </VStack>
          </GridItem>

          {/* Right side - Visual elements */}
          <GridItem display={{ base: 'none', lg: 'block' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <Box position="relative">
                {/* Main visual element */}
                <Box
                  w="400px"
                  h="400px"
                  borderRadius="50%"
                  bg="linear-gradient(135deg, rgba(151, 15, 255, 0.1), rgba(151, 15, 255, 0.05))"
                  border="2px solid rgba(151, 15, 255, 0.3)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  position="relative"
                  mx="auto"
                  backdropFilter="blur(20px)"
                >
                  {/* Rotating elements around the circle */}
                  {[
                    { icon: FiFileText, angle: 0, delay: 0 },
                    { icon: FiShield, angle: 72, delay: 0.2 },
                    { icon: FiUsers, angle: 144, delay: 0.4 },
                    { icon: FiZap, angle: 216, delay: 0.6 },
                    { icon: FiStar, angle: 288, delay: 0.8 }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      style={{
                        position: 'absolute',
                        transform: `rotate(${item.angle}deg) translateY(-150px)`,
                      }}
                      animate={{
                        rotate: [item.angle, item.angle + 360],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                        delay: item.delay
                      }}
                    >
                      <Box
                        w="60px"
                        h="60px"
                        borderRadius="50%"
                        bg="linear-gradient(135deg, #970fff, #7817ff)"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        boxShadow="0 8px 20px rgba(151, 15, 255, 0.4)"
                      >
                        <Icon as={item.icon} color="white" w={6} h={6} />
                      </Box>
                    </motion.div>
                  ))}

                  {/* Center icon */}
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Box
                      fontSize="80px"
                      color="#970fff"
                      filter="drop-shadow(0 0 20px rgba(151, 15, 255, 0.5))"
                    >
                      ⚖️
                    </Box>
                  </motion.div>
                </Box>
              </Box>
            </motion.div>
          </GridItem>
        </Grid>

        {/* Statistics or features bar */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          style={{ marginTop: '80px' }}
        >
          <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }} gap={8}>
            {[
              { label: 'Documents Created', value: '10K+', icon: FiFileText },
              { label: 'Happy Clients', value: '5K+', icon: FiUsers },
              { label: 'Success Rate', value: '99%', icon: FiTrendingUp },
              { label: 'Time Saved', value: '80%', icon: FiClock }
            ].map((stat, index) => (
              <VStack key={index} spacing={2}>
                <Icon as={stat.icon} color="#970fff" w={8} h={8} />
                <Text fontSize="2xl" fontWeight="bold" color="white">{stat.value}</Text>
                <Text fontSize="sm" color="gray.400" textAlign="center">{stat.label}</Text>
              </VStack>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </MotionBox>
  )
}

// Work Section Component
const WorkSection: React.FC<SectionProps> = ({ isActive }) => {
  const [activeSlide, setActiveSlide] = useState(1)

  const documents = [
    {
      title: "Loan Agreement",
      description: "Create comprehensive loan agreements with AI assistance",
      image: "/assets/img/loan.svg"
    },
    {
      title: "Contract Agreement",
      description: "Generate professional contracts tailored to your needs",
      image: "/assets/img/contract.svg"
    },
    {
      title: "Non-disclosure Agreement",
      description: "Protect your confidential information with NDAs",
      image: "/assets/img/nda.svg"
    }
  ]

  const nextSlide = () => {
    setActiveSlide(prev => prev < documents.length - 1 ? prev + 1 : 0)
  }

  const prevSlide = () => {
    setActiveSlide(prev => prev > 0 ? prev - 1 : documents.length - 1)
  }

  return (
    <MotionBox
      position="absolute"
      top="0"
      left="0"
      w="full"
      h="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      opacity={isActive ? 1 : 0}
      visibility={isActive ? 'visible' : 'hidden'}
      transition="opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
      bg="linear-gradient(135deg, rgba(12, 12, 12, 0.95) 0%, rgba(26, 10, 46, 0.9) 50%, rgba(22, 33, 62, 0.85) 100%)"
      backdropFilter="blur(20px)"
      zIndex={isActive ? 2 : 1}
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 70% 30%, rgba(151, 15, 255, 0.08) 0%, transparent 60%)',
        pointerEvents: 'none',
        opacity: isActive ? 1 : 0,
        transition: 'opacity 0.6s ease',
      }}
    >
      <Container maxW="960px">
        <VStack spacing={12}>
          <Heading
            fontSize="30px"
            textAlign="center"
            color="white"
            opacity={isActive ? 1 : 0}
            transform={isActive ? 'translateY(0)' : 'translateY(30px)'}
            transition="all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
            transitionDelay={isActive ? '0.1s' : '0s'}
          >
            Our Work
          </Heading>

          <Box position="relative" w="full" h="300px">
            <Flex
              justifyContent="center"
              alignItems="center"
              h="full"
              position="relative"
            >
              {documents.map((doc, index) => (
                <Box
                  key={index}
                  position="absolute"
                  display={index === activeSlide ? "block" : "none"}
                  textAlign="center"
                  opacity={isActive && index === activeSlide ? 1 : 0}
                  transform={isActive && index === activeSlide ? 'translateY(0)' : 'translateY(30px)'}
                  transition="all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
                  transitionDelay={isActive ? '0.3s' : '0s'}
                >
                  <VStack spacing={6}>
                    <Box
                      w="150px"
                      h="150px"
                      borderRadius="50%"
                      overflow="hidden"
                      border="2px solid rgba(151, 15, 255, 0.4)"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      bg="rgba(151, 15, 255, 0.15)"
                      backdropFilter="blur(20px)"
                      boxShadow="0 20px 40px rgba(151, 15, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                      position="relative"
                      _before={{
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        bg: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent)',
                        borderRadius: '50%',
                        pointerEvents: 'none',
                      }}
                    >
                      <Image
                        src={doc.image}
                        alt={doc.title}
                        w="80px"
                        h="80px"
                        filter="brightness(0) invert(1)"
                      />
                    </Box>
                    <VStack spacing={2}>
                      <Text
                        fontSize="16px"
                        fontWeight="700"
                        textTransform="uppercase"
                        color="white"
                      >
                        {doc.title}
                      </Text>
                      <Text
                        fontSize="14px"
                        color="#858585"
                        maxW="300px"
                        textAlign="center"
                      >
                        {doc.description}
                      </Text>
                    </VStack>
                  </VStack>
                </Box>
              ))}

              {/* Navigation buttons */}
              <Button
                position="absolute"
                left="20px"
                top="50%"
                transform="translateY(-50%)"
                w="50px"
                h="50px"
                borderRadius="50%"
                bg="rgba(85, 85, 85, 0.8)"
                backdropFilter="blur(10px)"
                border="1px solid rgba(255, 255, 255, 0.1)"
                color="white"
                onClick={prevSlide}
                _hover={{
                  bg: "rgba(102, 102, 102, 0.9)",
                  transform: "translateY(-50%) scale(1.05)",
                  borderColor: "rgba(151, 15, 255, 0.3)"
                }}
                _active={{
                  transform: "translateY(-50%) scale(0.95)"
                }}
                fontSize="24px"
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                boxShadow="0 4px 12px rgba(0, 0, 0, 0.3)"
              >
                ‹
              </Button>

              <Button
                position="absolute"
                right="20px"
                top="50%"
                transform="translateY(-50%)"
                w="50px"
                h="50px"
                borderRadius="50%"
                bg="rgba(85, 85, 85, 0.8)"
                backdropFilter="blur(10px)"
                border="1px solid rgba(255, 255, 255, 0.1)"
                color="white"
                onClick={nextSlide}
                _hover={{
                  bg: "rgba(102, 102, 102, 0.9)",
                  transform: "translateY(-50%) scale(1.05)",
                  borderColor: "rgba(151, 15, 255, 0.3)"
                }}
                _active={{
                  transform: "translateY(-50%) scale(0.95)"
                }}
                fontSize="24px"
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                boxShadow="0 4px 12px rgba(0, 0, 0, 0.3)"
              >
                ›
              </Button>
            </Flex>

            {/* Slide indicators */}
            <Flex justifyContent="center" mt={8} gap={2}>
              {documents.map((_, index) => (
                <Box
                  key={index}
                  w="10px"
                  h="10px"
                  borderRadius="50%"
                  bg={index === activeSlide ? "#970fff" : "rgba(85, 85, 85, 0.6)"}
                  cursor="pointer"
                  onClick={() => setActiveSlide(index)}
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  border="1px solid rgba(255, 255, 255, 0.1)"
                  _hover={{
                    bg: index === activeSlide ? "#7817ff" : "rgba(151, 15, 255, 0.4)",
                    transform: "scale(1.2)",
                    boxShadow: "0 0 10px rgba(151, 15, 255, 0.4)"
                  }}
                  boxShadow={index === activeSlide ? "0 0 10px rgba(151, 15, 255, 0.6)" : "none"}
                />
              ))}
            </Flex>
          </Box>
        </VStack>
      </Container>
    </MotionBox>
  )
}

// About Section Component
const AboutSection: React.FC<SectionProps> = ({ isActive }) => {
  const navigate = useNavigate()

  return (
    <MotionBox
      position="absolute"
      top="0"
      left="0"
      w="full"
      h="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      opacity={isActive ? 1 : 0}
      visibility={isActive ? 'visible' : 'hidden'}
      transition="opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
      bg="linear-gradient(135deg, rgba(12, 12, 12, 0.95) 0%, rgba(26, 10, 46, 0.9) 50%, rgba(22, 33, 62, 0.85) 100%)"
      backdropFilter="blur(20px)"
      zIndex={isActive ? 2 : 1}
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 40% 40%, rgba(151, 15, 255, 0.08) 0%, transparent 60%)',
        pointerEvents: 'none',
        opacity: isActive ? 1 : 0,
        transition: 'opacity 0.6s ease',
      }}
    >
      <Container maxW="1200px">
        <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={16} alignItems="center">
          {/* Left side - Features */}
          <GridItem>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <VStack spacing={8} align="start">
                <Heading
                  fontSize={{ base: '36px', md: '48px' }}
                  fontWeight="900"
                  color="white"
                >
                  Why Choose <Text as="span" color="#970fff">LawCraft</Text>?
                </Heading>

                <VStack spacing={6} align="start">
                  {[
                    {
                      icon: FiZap,
                      title: 'Lightning Fast',
                      description: 'Generate professional legal documents in minutes, not hours'
                    },
                    {
                      icon: FiShield,
                      title: 'Bank-Grade Security',
                      description: 'Your sensitive legal data is protected with enterprise-level encryption'
                    },
                    {
                      icon: FiAward,
                      title: 'Expert Quality',
                      description: 'AI trained on thousands of legal documents by expert lawyers'
                    },
                    {
                      icon: FiGlobe,
                      title: 'Multiple Jurisdictions',
                      description: 'Support for various legal frameworks and international standards'
                    }
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    >
                      <HStack spacing={4} align="start">
                        <Box
                          p={3}
                          borderRadius="lg"
                          bg="linear-gradient(135deg, rgba(151, 15, 255, 0.2), rgba(151, 15, 255, 0.1))"
                          border="1px solid rgba(151, 15, 255, 0.3)"
                        >
                          <Icon as={feature.icon} color="#970fff" w={6} h={6} />
                        </Box>
                        <VStack align="start" spacing={1}>
                          <Text fontSize="lg" fontWeight="bold" color="white">
                            {feature.title}
                          </Text>
                          <Text color="gray.400" fontSize="sm" maxW="300px">
                            {feature.description}
                          </Text>
                        </VStack>
                      </HStack>
                    </motion.div>
                  ))}
                </VStack>
              </VStack>
            </motion.div>
          </GridItem>

          {/* Right side - Content */}
          <GridItem>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <VStack spacing={8} textAlign="center">
                <Box
                  p={8}
                  borderRadius="2xl"
                  bg="rgba(255, 255, 255, 0.05)"
                  backdropFilter="blur(20px)"
                  border="1px solid rgba(255, 255, 255, 0.1)"
                  position="relative"
                  overflow="hidden"
                >
                  <Text
                    fontSize="lg"
                    color="white"
                    lineHeight="1.8"
                    fontStyle="italic"
                  >
                    "LawCraft has revolutionized how we handle legal documentation. 
                    What used to take days now takes minutes, and the quality is exceptional. 
                    It's like having a legal expert at your fingertips 24/7."
                  </Text>
                  
                  <HStack spacing={4} mt={6} justify="center">
                    <Box
                      w="50px"
                      h="50px"
                      borderRadius="50%"
                      bg="linear-gradient(135deg, #970fff, #7817ff)"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      color="white"
                      fontWeight="bold"
                      fontSize="lg"
                    >
                      JS
                    </Box>
                    <VStack align="start" spacing={0}>
                      <Text color="white" fontWeight="bold">John Smith</Text>
                      <Text color="gray.400" fontSize="sm">Corporate Lawyer</Text>
                    </VStack>
                  </HStack>
                </Box>

                <HStack spacing={4}>
                  <Button
                    size="lg"
                    bg="linear-gradient(135deg, #970fff, #7817ff)"
                    color="white"
                    onClick={() => navigate('/pricing')}
                    rightIcon={<FiArrowRight />}
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 20px rgba(151, 15, 255, 0.4)"
                    }}
                  >
                    View Pricing
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    borderColor="rgba(151, 15, 255, 0.4)"
                    color="white"
                    onClick={() => navigate('/help')}
                    _hover={{
                      bg: 'rgba(151, 15, 255, 0.1)',
                      borderColor: '#970fff'
                    }}
                  >
                    Learn More
                  </Button>
                </HStack>
              </VStack>
            </motion.div>
          </GridItem>
        </Grid>
      </Container>
    </MotionBox>
  )
}

// Contact Section Component
const ContactSection: React.FC<SectionProps> = ({ isActive }) => {
  const navigate = useNavigate()

  return (
    <MotionBox
      position="absolute"
      top="0"
      left="0"
      w="full"
      h="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      opacity={isActive ? 1 : 0}
      visibility={isActive ? 'visible' : 'hidden'}
      transition="opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
      bg="linear-gradient(135deg, rgba(12, 12, 12, 0.95) 0%, rgba(26, 10, 46, 0.9) 50%, rgba(22, 33, 62, 0.85) 100%)"
      backdropFilter="blur(20px)"
      zIndex={isActive ? 2 : 1}
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 60% 70%, rgba(151, 15, 255, 0.08) 0%, transparent 60%)',
        pointerEvents: 'none',
        opacity: isActive ? 1 : 0,
        transition: 'opacity 0.6s ease',
      }}
    >
      <Container maxW="800px">
        <VStack spacing={12} textAlign="center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <Heading
              fontSize={{ base: '36px', md: '48px', lg: '56px' }}
              fontWeight="900"
              color="white"
              mb={4}
            >
              Ready to Transform Your 
              <br />
              <Text as="span" color="#970fff">Legal Workflow</Text>?
            </Heading>

            <Text
              fontSize="xl"
              color="gray.300"
              maxW="600px"
              mx="auto"
            >
              Join thousands of legal professionals who trust LawCraft for their document creation needs. 
              Start your journey towards more efficient legal documentation today.
            </Text>
          </motion.div>

          {/* Contact methods */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={8} mb={12}>
              {[
                {
                  icon: FiMail,
                  title: 'Email Support',
                  description: 'Get expert help via email',
                  action: () => window.open('mailto:support@lawcraft.com')
                },
                {
                  icon: FiFileText,
                  title: 'Documentation',
                  description: 'Comprehensive user guides',
                  action: () => navigate('/help')
                },
                {
                  icon: FiUsers,
                  title: 'Community',
                  description: 'Join our user community',
                  action: () => window.open('https://community.lawcraft.com', '_blank')
                }
              ].map((contact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                >
                  <Box
                    p={6}
                    borderRadius="xl"
                    bg="rgba(255, 255, 255, 0.05)"
                    backdropFilter="blur(20px)"
                    border="1px solid rgba(255, 255, 255, 0.1)"
                    cursor="pointer"
                    onClick={contact.action}
                    transition="all 0.3s ease"
                    _hover={{
                      transform: 'translateY(-5px)',
                      bg: 'rgba(151, 15, 255, 0.1)',
                      borderColor: 'rgba(151, 15, 255, 0.3)',
                      boxShadow: '0 8px 20px rgba(151, 15, 255, 0.2)'
                    }}
                  >
                    <VStack spacing={4}>
                      <Box
                        p={3}
                        borderRadius="lg"
                        bg="linear-gradient(135deg, #970fff, #7817ff)"
                      >
                        <Icon as={contact.icon} color="white" w={6} h={6} />
                      </Box>
                      <VStack spacing={1}>
                        <Text color="white" fontWeight="bold" fontSize="lg">
                          {contact.title}
                        </Text>
                        <Text color="gray.400" fontSize="sm" textAlign="center">
                          {contact.description}
                        </Text>
                      </VStack>
                    </VStack>
                  </Box>
                </motion.div>
              ))}
            </Grid>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <VStack spacing={4}>
              <HStack spacing={6} flexWrap="wrap" justify="center">
                <Button
                  size="lg"
                  bg="linear-gradient(135deg, #970fff, #7817ff)"
                  color="white"
                  onClick={() => navigate('/auth')}
                  rightIcon={<FiArrowRight />}
                  px={8}
                  py={6}
                  fontSize="lg"
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "0 12px 30px rgba(151, 15, 255, 0.4)"
                  }}
                  _active={{ transform: "translateY(0)" }}
                >
                  Start Free Trial
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  borderColor="rgba(151, 15, 255, 0.4)"
                  color="white"
                  onClick={() => navigate('/pricing')}
                  px={8}
                  py={6}
                  fontSize="lg"
                  _hover={{
                    bg: 'rgba(151, 15, 255, 0.1)',
                    borderColor: '#970fff',
                    transform: "translateY(-2px)"
                  }}
                >
                  View Pricing
                </Button>
              </HStack>

              <Text fontSize="sm" color="gray.500" textAlign="center">
                No credit card required • 7-day free trial • Cancel anytime
              </Text>
            </VStack>
          </motion.div>
        </VStack>
      </Container>
    </MotionBox>
  )
}

// Side Navigation Component
const SideNav: React.FC<{
  activeSection: number
  onNavigate: (section: number) => void
}> = ({ activeSection, onNavigate }) => {
  const display = useBreakpointValue({ base: 'none', lg: 'block' })

  return (
    <Box
      position="fixed"
      left="40px"
      top="50%"
      transform="translateY(-50%)"
      zIndex="10"
      display={display}
    >
      <VStack spacing={8}>
        {[
          { id: 1, label: 'Intro' },
          { id: 2, label: 'Work' },
          { id: 3, label: 'About' },
          { id: 4, label: 'Contact' }
        ].map((item) => (
          <Flex
            key={item.id}
            alignItems="center"
            cursor="pointer"
            onClick={() => onNavigate(item.id)}
            transition="all 0.3s ease"
            _hover={{ transform: 'translateX(10px)' }}
          >
            <Text
              fontSize="14px"
              fontWeight="300"
              color={activeSection === item.id ? '#970fff' : '#555'}
              mr={4}
              fontFamily="monospace"
            >
              {String(item.id).padStart(2, '0')}
            </Text>
            <Text
              fontSize="14px"
              fontWeight="300"
              color={activeSection === item.id ? 'white' : 'transparent'}
              opacity={activeSection === item.id ? 1 : 0}
              transition="all 0.3s ease"
            >
              {item.label}
            </Text>
          </Flex>
        ))}
      </VStack>
    </Box>
  )
}

// Header Component
const Header: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      w="full"
      h="70px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      px={8}
      zIndex="10"
      bg="rgba(0,0,0,0.8)"
      backdropFilter="blur(10px)"
      borderBottom="1px solid rgba(255, 255, 255, 0.1)"
    >
      <Text fontSize="25px" fontWeight="700" color="white" cursor="pointer" onClick={() => navigate('/')}>
        <Text as="span" color="#970fff" fontSize="35px">L</Text>aw
        <Text as="span" color="#970fff" fontSize="35px">C</Text>raft
      </Text>

      <HStack spacing={4}>
        <Button
          variant="ghost"
          color="white"
          size="sm"
          onClick={() => navigate('/dashboard')}
          _hover={{ bg: 'rgba(151, 15, 255, 0.1)' }}
        >
          Demo
        </Button>
        <Button
          variant="ghost"
          color="white"
          size="sm"
          onClick={() => navigate('/pricing')}
          _hover={{ bg: 'rgba(151, 15, 255, 0.1)' }}
        >
          Pricing
        </Button>
        <Button
          bg="linear-gradient(135deg, #970fff, #7817ff)"
          color="white"
          _hover={{ 
            bg: "linear-gradient(135deg, #7817ff, #5a0bd9)",
            transform: "translateY(-1px)"
          }}
          size="sm"
          fontWeight="700"
          onClick={() => navigate('/auth')}
          px={6}
        >
          Sign In
        </Button>
      </HStack>
    </Box>
  )
}

// Main Landing Component
export const Landing: React.FC = () => {
  const [activeSection, setActiveSection] = useState(1)

  const handleNavigate = (section: number) => {
    setActiveSection(section)
  }

  // Handle scroll events
  useEffect(() => {
    let canScroll = true
    let scrollController: NodeJS.Timeout

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      const delta = e.deltaY

      if (delta > 30 && canScroll) { // Reduced from 50 to 30
        canScroll = false
        clearTimeout(scrollController)
        scrollController = setTimeout(() => {
          canScroll = true
        }, 1200) // Increased from 800 to 1200ms

        if (activeSection < 4) {
          setActiveSection(prev => prev + 1)
        } else {
          setActiveSection(1)
        }
      } else if (delta < -30 && canScroll) { // Reduced from -50 to -30
        canScroll = false
        clearTimeout(scrollController)
        scrollController = setTimeout(() => {
          canScroll = true
        }, 1200) // Increased from 800 to 1200ms

        if (activeSection > 1) {
          setActiveSection(prev => prev - 1)
        } else {
          setActiveSection(4)
        }
      }
    }    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' && activeSection < 4) {
        setActiveSection(prev => prev + 1)
      } else if (e.key === 'ArrowUp' && activeSection > 1) {
        setActiveSection(prev => prev - 1)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
      clearTimeout(scrollController)
    }
  }, [activeSection])

  return (
    <Box
      position="relative"
      w="100%"
      h="100vh"
      overflow="hidden"
      bg="black"
      color="white"
    >
      <Header />
      <SideNav activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main Content Container */}
      <Box position="relative" w="full" h="full">
        <IntroSection isActive={activeSection === 1} onNavigate={handleNavigate} />
        <WorkSection isActive={activeSection === 2} onNavigate={handleNavigate} />
        <AboutSection isActive={activeSection === 3} onNavigate={handleNavigate} />
        <ContactSection isActive={activeSection === 4} onNavigate={handleNavigate} />
      </Box>

      {/* Bottom Navigation for Mobile */}
      <Flex
        position="fixed"
        bottom="20px"
        left="50%"
        transform="translateX(-50%)"
        gap={2}
        display={{ base: 'flex', lg: 'none' }}
        bg="rgba(0,0,0,0.8)"
        p={3}
        borderRadius="lg"
        backdropFilter="blur(10px)"
      >
        {[1, 2, 3, 4].map((section) => (
          <Box
            key={section}
            w="10px"
            h="10px"
            borderRadius="50%"
            bg={activeSection === section ? "#970fff" : "#555"}
            cursor="pointer"
            onClick={() => handleNavigate(section)}
            transition="all 0.3s ease"
          />
        ))}
      </Flex>
    </Box>
  )
}
