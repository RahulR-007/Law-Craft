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
  useBreakpointValue
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FiArrowRight, FiMail } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const MotionBox = motion(Box)

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
      <Container maxW="900px" textAlign="center">
        <VStack spacing={8}>
          <Heading
            fontSize={{ base: '44px', md: '55px', lg: '68px' }}
            fontWeight="900"
            lineHeight="1"
            color="white"
            opacity={isActive ? 1 : 0}
            transform={isActive ? 'translateY(0)' : 'translateY(30px)'}
            transition="all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
            transitionDelay={isActive ? '0.2s' : '0s'}
          >
            Empower Your
            <br />
            Legal
            <br />
            Journey with
            <br />
            <Text as="span" color="#970fff">LawCraft</Text>
          </Heading>

          <Button
            size="lg"
            bg="rgba(151, 15, 255, 0.8)"
            color="white"
            backdropFilter="blur(10px)"
            border="1px solid rgba(151, 15, 255, 0.3)"
            boxShadow="0 8px 20px rgba(151, 15, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
            borderRadius="xl"
            opacity={isActive ? 1 : 0}
            transform={isActive ? 'translateY(0)' : 'translateY(30px)'}
            transition="all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
            transitionDelay={isActive ? '0.4s' : '0s'}
            _active={{
              transform: "translateY(0)"
            }}
            onClick={() => navigate('/auth')}
            rightIcon={<FiArrowRight />}
            textTransform="uppercase"
            fontWeight="700"
            position="relative"
            overflow="hidden"
            _before={{
              content: '""',
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              bottom: '0',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent)',
              borderRadius: 'xl',
              opacity: 0,
              transition: 'opacity 0.3s ease',
              pointerEvents: 'none',
            }}
            _hover={{
              bg: "rgba(151, 15, 255, 0.9)",
              transform: isActive ? "translateY(-2px)" : "translateY(28px)",
              boxShadow: "0 12px 30px rgba(151, 15, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
              _before: {
                opacity: 1,
              }
            }}
          >
            Get Started
          </Button>
        </VStack>
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
const AboutSection: React.FC<SectionProps> = ({ isActive }) => (
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
    <Container maxW="900px">
      <VStack spacing={8} textAlign="center">
        <Heading
          fontSize={{ base: '44px', md: '55px', lg: '68px' }}
          fontWeight="900"
          color="white"
          opacity={isActive ? 1 : 0}
          transform={isActive ? 'translateY(0)' : 'translateY(30px)'}
          transition="all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
          transitionDelay={isActive ? '0.1s' : '0s'}
        >
          About <Text as="span" color="#970fff">LawCraft</Text>
        </Heading>

        <Text
          fontSize="lg"
          color="white"
          maxW="600px"
          opacity={isActive ? 1 : 0}
          transform={isActive ? 'translateY(0)' : 'translateY(30px)'}
          transition="all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
          transitionDelay={isActive ? '0.3s' : '0s'}
        >
          At LawCraft, we redefine legal services to empower individuals and businesses,
          ensuring seamless, innovative, and accessible legal solutions tailored to your unique needs.
        </Text>

        <Button
          size="lg"
          bg="transparent"
          color="white"
          border="2px solid #970fff"
          opacity={isActive ? 1 : 0}
          transform={isActive ? 'translateY(0)' : 'translateY(30px)'}
          transition="all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
          transitionDelay={isActive ? '0.5s' : '0s'}
          _hover={{
            bg: "#970fff",
            color: "white",
            transform: isActive ? "translateY(-2px)" : "translateY(28px)",
            boxShadow: "0 8px 20px rgba(151, 15, 255, 0.4)"
          }}
          _active={{
            transform: "translateY(0)"
          }}
          rightIcon={<FiArrowRight />}
          textTransform="uppercase"
          fontWeight="700"
        >
          Learn More
        </Button>
      </VStack>
    </Container>
  </MotionBox>
)

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
      <Container maxW="600px">
        <VStack spacing={8} textAlign="center">
          <Heading
            fontSize="30px"
            color="white"
            opacity={isActive ? 1 : 0}
            transform={isActive ? 'translateY(0)' : 'translateY(30px)'}
            transition="all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
            transitionDelay={isActive ? '0.1s' : '0s'}
          >
            Get in Touch
          </Heading>

          <Text
            fontSize="lg"
            color="white"
            opacity={isActive ? 1 : 0}
            transform={isActive ? 'translateY(0)' : 'translateY(30px)'}
            transition="all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
            transitionDelay={isActive ? '0.3s' : '0s'}
          >
            Ready to transform your legal documentation process?
            Contact us today and discover how LawCraft can help.
          </Text>

          <VStack
            spacing={4}
            opacity={isActive ? 1 : 0}
            transform={isActive ? 'translateY(0)' : 'translateY(30px)'}
            transition="all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
            transitionDelay={isActive ? '0.5s' : '0s'}
          >
            <Button
              size="lg"
              bg="#970fff"
              color="white"
              _hover={{
                bg: "#7817ff",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 20px rgba(151, 15, 255, 0.4)"
              }}
              _active={{
                transform: "translateY(0)"
              }}
              rightIcon={<FiMail />}
              textTransform="uppercase"
              fontWeight="700"
              onClick={() => navigate('/auth')}
              transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            >
              Get Started
            </Button>

            <Button
              size="md"
              variant="outline"
              borderColor="#970fff"
              color="#970fff"
              _hover={{
                bg: "#970fff",
                color: "white",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 20px rgba(151, 15, 255, 0.4)"
              }}
              _active={{
                transform: "translateY(0)"
              }}
              transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            >
              Contact Us
            </Button>
          </VStack>
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
    >
      <Text fontSize="25px" fontWeight="700" color="white" cursor="pointer" onClick={() => navigate('/')}>
        <Text as="span" color="#970fff" fontSize="35px">L</Text>aw
        <Text as="span" color="#970fff" fontSize="35px">c</Text>raft
      </Text>

      <Button
        bg="#970fff"
        color="white"
        _hover={{ bg: "#7817ff" }}
        size="sm"
        textTransform="uppercase"
        fontWeight="700"
        onClick={() => navigate('/auth')}
      >
        Get Started
      </Button>
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
