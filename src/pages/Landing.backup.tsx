import React, { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Flex,
  Image,
  VStack
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FiArrowRight, FiMail } from 'react-icons/fi'

const MotionBox = motion(Box)

interface SectionProps {
  isActive: boolean
  onNavigate: (section: number) => void
}

const IntroSection: React.FC<SectionProps> = ({ isActive, onNavigate }) => (
  <MotionBox
    position="relative"
    w="full"
    h="100vh"
    display="flex"
    alignItems="center"
    justifyContent="center"
    opacity={isActive ? 1 : 0}
    visibility={isActive ? 'visible' : 'hidden'}
    transition="opacity 0.4s ease-in-out, visibility 0s 0.4s"
    bg="black"
  >
    <Container maxW="900px" textAlign="center">
      <VStack spacing={8}>
        <Heading
          fontSize={{ base: '44px', md: '55px', lg: '68px' }}
          fontWeight="900"
          lineHeight="1"
          color="white"
          className={isActive ? 'fade-in-up' : ''}
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
          bg="#970fff"
          color="white"
          _hover={{ bg: "#7817ff" }}
          onClick={() => onNavigate(3)}
          rightIcon={<FiArrowRight />}
          textTransform="uppercase"
          fontWeight="700"
          className={isActive ? 'fade-in-up' : ''}
          style={{ animationDelay: isActive ? '0.2s' : '0s' }}
        >
          Try Alice
        </Button>
      </VStack>
    </Container>
  </MotionBox>
)

const WorkSection: React.FC<SectionProps> = ({ isActive }) => {
  const [activeSlide, setActiveSlide] = useState(1)

  const documents = [
    {
      title: "Loan Agreement",
      description: "Create a legal loan agreement here",
      image: "/assets/img/loan.svg"
    },
    {
      title: "Contract Agreement",
      description: "Create a legal contract here",
      image: "/assets/img/contract.svg"
    },
    {
      title: "Non-disclosure Agreement",
      description: "Create a Non-Disclosure Agreement(NDA) here",
      image: "/assets/img/nda.svg"
    }
  ]

  return (
    <MotionBox
      position="relative"
      w="full"
      h="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      opacity={isActive ? 1 : 0}
      visibility={isActive ? 'visible' : 'hidden'}
      transition="opacity 0.4s ease-in-out, visibility 0s 0.4s"
      bg="black"
    >
      <Container maxW="960px">
        <VStack spacing={8}>
          <Heading
            fontSize="30px"
            textAlign="center"
            color="white"
            mb={5}
            className={isActive ? 'fade-in-up' : ''}
          >
            Our Work
          </Heading>

          <Flex justifyContent="center" alignItems="center" w="80%" mx="auto" position="relative">
            {documents.map((doc, index) => (
              <Box
                key={index}
                position={index === 1 ? "relative" : "absolute"}
                display={index === activeSlide ? "block" : "none"}
                textAlign="center"
                className={isActive ? 'fade-in-up' : ''}
                style={{ animationDelay: isActive ? `${index * 0.1}s` : '0s' }}
              >
                <Box
                  w="150px"
                  h="150px"
                  mx="auto"
                  borderRadius="50%"
                  overflow="hidden"
                  mb={4}
                >
                  <Image src={doc.image} alt={doc.title} w="100%" h="100%" objectFit="cover" />
                </Box>
                <Text
                  fontSize="16px"
                  fontWeight="700"
                  textTransform="uppercase"
                  color="white"
                  mt={4}
                  mb={2}
                >
                  {doc.title}
                </Text>
                <Text
                  fontSize="14px"
                  color="#858585"
                  maxW="250px"
                  mx="auto"
                >
                  {doc.description}
                </Text>
              </Box>
            ))}

            {/* Navigation buttons */}
            <Button
              position="absolute"
              left="0"
              top="50%"
              transform="translateY(-50%)"
              w="50px"
              h="50px"
              borderRadius="50%"
              bg="#555"
              color="white"
              onClick={() => setActiveSlide(prev => prev > 0 ? prev - 1 : documents.length - 1)}
              _hover={{ bg: "#666" }}
            >
              ‹
            </Button>

            <Button
              position="absolute"
              right="0"
              top="50%"
              transform="translateY(-50%)"
              w="50px"
              h="50px"
              borderRadius="50%"
              bg="#555"
              color="white"
              onClick={() => setActiveSlide(prev => prev < documents.length - 1 ? prev + 1 : 0)}
              _hover={{ bg: "#666" }}
            >
              ›
            </Button>
          </Flex>
        </VStack>
      </Container>
    </MotionBox>
  )
}

const AboutSection: React.FC<SectionProps> = ({ isActive }) => (
  <MotionBox
    position="relative"
    w="full"
    h="100vh"
    display="flex"
    alignItems="center"
    justifyContent="center"
    opacity={isActive ? 1 : 0}
    visibility={isActive ? 'visible' : 'hidden'}
    transition="opacity 0.4s ease-in-out, visibility 0s 0.4s"
    bg="black"
  >
    <Container maxW="900px">
      <VStack spacing={8} textAlign="center">
        <Heading
          fontSize={{ base: '44px', md: '55px', lg: '68px' }}
          fontWeight="900"
          color="white"
          className={isActive ? 'fade-in-up' : ''}
        >
          About <Text as="span" color="#970fff">LawCraft</Text>
        </Heading>

        <Text
          fontSize="lg"
          color="white"
          maxW="600px"
          className={isActive ? 'fade-in-up' : ''}
          style={{ animationDelay: isActive ? '0.2s' : '0s' }}
        >
          At LawCraft, we redefine legal services to empower individuals and businesses,
          ensuring seamless, innovative, and accessible legal solutions tailored to your unique needs.
        </Text>

        <Button
          size="lg"
          bg="transparent"
          color="white"
          border="2px solid #970fff"
          _hover={{ bg: "#970fff", color: "white" }}
          rightIcon={<FiArrowRight />}
          textTransform="uppercase"
          fontWeight="700"
          className={isActive ? 'fade-in-up' : ''}
          style={{ animationDelay: isActive ? '0.4s' : '0s' }}
        >
          Learn More
        </Button>
      </VStack>
    </Container>
  </MotionBox>
)

const ContactSection: React.FC<SectionProps> = ({ isActive }) => (
  <MotionBox
    position="relative"
    w="full"
    h="100vh"
    display="flex"
    alignItems="center"
    justifyContent="center"
    opacity={isActive ? 1 : 0}
    visibility={isActive ? 'visible' : 'hidden'}
    transition="opacity 0.4s ease-in-out, visibility 0s 0.4s"
    bg="black"
  >
    <Container maxW="600px">
      <VStack spacing={8} textAlign="center">
        <Heading
          fontSize="30px"
          color="white"
          className={isActive ? 'fade-in-up' : ''}
        >
          Get in Touch
        </Heading>

        <Text
          fontSize="lg"
          color="white"
          className={isActive ? 'fade-in-up' : ''}
          style={{ animationDelay: isActive ? '0.2s' : '0s' }}
        >
          Ready to transform your legal documentation process?
          Contact us today and discover how LawCraft can help.
        </Text>

        <Button
          size="lg"
          bg="#970fff"
          color="white"
          _hover={{ bg: "#7817ff" }}
          rightIcon={<FiMail />}
          textTransform="uppercase"
          fontWeight="700"
          className={isActive ? 'fade-in-up' : ''}
          style={{ animationDelay: isActive ? '0.4s' : '0s' }}
        >
          Contact Us
        </Button>
      </VStack>
    </Container>
  </MotionBox>
)

// Side Navigation Component
const SideNav: React.FC<{ activeSection: number; onNavigate: (section: number) => void }> = ({
  activeSection,
  onNavigate
}) => (
  <Box
    position="fixed"
    left="0"
    top="50%"
    transform="translateY(-50%)"
    zIndex="10"
    display={{ base: 'none', lg: 'flex' }}
    flexDirection="column"
    alignItems="center"
    h="70%"
    maxH="750px"
    justifyContent="space-around"
    w="100px"
    _before={{
      content: '""',
      position: "absolute",
      top: "50%",
      left: "0",
      transform: "translateY(-50%)",
      width: "2px",
      height: "70%",
      maxHeight: "750px",
      bg: "#555",
      opacity: "0.35",
      zIndex: "10"
    }}
  >
    {[1, 2, 3, 4].map((section) => (
      <Box
        key={section}
        position="relative"
        color="white"
        fontSize="6px"
        cursor="pointer"
        onClick={() => onNavigate(section)}
        _before={{
          content: `"0${section}"`,
          position: "absolute",
          top: "3px",
          left: "10px",
          color: "#555",
          fontSize: "14px",
          fontWeight: "300"
        }}
      >
        <Text
          position="relative"
          top="3px"
          left="10px"
          color={activeSection === section ? "white" : "transparent"}
          fontSize="14px"
          fontWeight="300"
          opacity={activeSection === section ? 1 : 0}
          visibility={activeSection === section ? "visible" : "hidden"}
          transition="opacity 0.2s ease-in-out, visibility 0.2s ease-in-out"
        >
          {section === 1 && "Intro"}
          {section === 2 && "Work"}
          {section === 3 && "About"}
          {section === 4 && "Contact"}
        </Text>
      </Box>
    ))}
  </Box>
)

// Header Component
const Header: React.FC<{ activeSection: number }> = ({ activeSection }) => (
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
  >
    <Flex alignItems="center" color="white">
      <Text fontSize="25px" fontWeight="700">
        <Text as="span" color="#970fff" fontSize="35px">L</Text>aw
        <Text as="span" color="#970fff" fontSize="35px">c</Text>raft
      </Text>
    </Flex>

    {activeSection !== 1 && activeSection !== 4 && (
      <Button
        bg="#970fff"
        color="white"
        _hover={{ bg: "#7817ff" }}
        size="sm"
        textTransform="uppercase"
        fontWeight="700"
        opacity={1}
        visibility="visible"
        transition="opacity 0.4s ease-in-out 0.4s"
      >
        Get Started
      </Button>
    )}
  </Box>
)

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

      if (delta > 50 && canScroll) {
        canScroll = false
        clearTimeout(scrollController)
        scrollController = setTimeout(() => {
          canScroll = true
        }, 800)

        if (activeSection < 4) {
          setActiveSection(prev => prev + 1)
        } else {
          setActiveSection(1)
        }
      } else if (delta < -50 && canScroll) {
        canScroll = false
        clearTimeout(scrollController)
        scrollController = setTimeout(() => {
          canScroll = true
        }, 800)

        if (activeSection > 1) {
          setActiveSection(prev => prev - 1)
        } else {
          setActiveSection(4)
        }
      }
    }

    // Handle keyboard navigation
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
      <Header activeSection={activeSection} />
      <SideNav activeSection={activeSection} onNavigate={handleNavigate} />

      <Box className="main-content">
        <IntroSection isActive={activeSection === 1} onNavigate={handleNavigate} />
        <WorkSection isActive={activeSection === 2} onNavigate={handleNavigate} />
        <AboutSection isActive={activeSection === 3} onNavigate={handleNavigate} />
        <ContactSection isActive={activeSection === 4} onNavigate={handleNavigate} />
      </Box>
    </Box>
  )
}
