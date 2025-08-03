import React from 'react'
import {
    HStack,
    useToast,
    useColorMode,
    IconButton,
    Text,
    Box
} from '@chakra-ui/react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import {
    FiHome,
    FiUser,
    FiHelpCircle,
    FiFileText,
    FiLogOut
} from 'react-icons/fi'

interface NavigationProps {
    currentPage?: string
}

const Navigation: React.FC<NavigationProps> = ({ currentPage }) => {
    const { signOut } = useAuth()
    const navigate = useNavigate()
    const toast = useToast()
    const { colorMode } = useColorMode()

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
        <Box
            position="fixed"
            top="0"
            left="0"
            right="0"
            h="70px"
            bg={colorMode === 'dark' ? "rgba(0, 0, 0, 0.9)" : "rgba(255, 255, 255, 0.9)"}
            backdropFilter="blur(20px)"
            border={`1px solid ${colorMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            px={8}
            zIndex="1000"
            boxShadow={colorMode === 'dark' ? "0 8px 20px rgba(0, 0, 0, 0.3)" : "0 8px 20px rgba(0, 0, 0, 0.1)"}
            transition="all 0.3s ease"
        >
            {/* Logo */}
            <Text
                fontSize="2xl"
                fontWeight="bold"
                color={colorMode === 'dark' ? 'white' : 'gray.800'}
                cursor="pointer"
                onClick={() => navigate('/dashboard')}
            >
                Law<Text as="span" color="brand.500">Craft</Text> AI
            </Text>

            {/* Navigation Links */}
            <HStack spacing={4}>
                <IconButton
                    aria-label="Dashboard"
                    icon={<FiHome />}
                    variant="ghost"
                    color={currentPage === 'dashboard' ? 'brand.500' : (colorMode === 'dark' ? 'white' : 'gray.600')}
                    onClick={() => navigate('/dashboard')}
                    _hover={{
                        bg: colorMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                        color: 'brand.500'
                    }}
                />

                <IconButton
                    aria-label="Generate Document"
                    icon={<FiFileText />}
                    variant="ghost"
                    color={currentPage === 'generate' ? 'brand.500' : (colorMode === 'dark' ? 'white' : 'gray.600')}
                    onClick={() => navigate('/generate')}
                    _hover={{
                        bg: colorMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                        color: 'brand.500'
                    }}
                />

                <IconButton
                    aria-label="Profile"
                    icon={<FiUser />}
                    variant="ghost"
                    color={currentPage === 'profile' ? 'brand.500' : (colorMode === 'dark' ? 'white' : 'gray.600')}
                    onClick={() => navigate('/profile')}
                    _hover={{
                        bg: colorMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                        color: 'brand.500'
                    }}
                />

                <IconButton
                    aria-label="Help"
                    icon={<FiHelpCircle />}
                    variant="ghost"
                    color={currentPage === 'help' ? 'brand.500' : (colorMode === 'dark' ? 'white' : 'gray.600')}
                    onClick={() => navigate('/help')}
                    _hover={{
                        bg: colorMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                        color: 'brand.500'
                    }}
                />

                <IconButton
                    aria-label="Logout"
                    icon={<FiLogOut />}
                    variant="ghost"
                    color={colorMode === 'dark' ? 'red.400' : 'red.500'}
                    onClick={handleLogout}
                    _hover={{
                        bg: colorMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                        color: 'red.400'
                    }}
                />
            </HStack>
        </Box>
    )
}

export default Navigation
