import React from 'react'
import { Box, Text, Button } from '@chakra-ui/react'

export const SimpleLanding: React.FC = () => {
    return (
        <Box
            w="100vw"
            h="100vh"
            bg="black"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            gap={4}
        >
            <Text color="white" fontSize="4xl" fontWeight="bold">
                <Text as="span" color="#970fff">Law</Text>Craft
            </Text>
            <Text color="white" fontSize="xl">
                Empower Your Legal Journey
            </Text>
            <Button
                bg="#970fff"
                color="white"
                _hover={{ bg: "#7817ff" }}
                size="lg"
            >
                Get Started
            </Button>
        </Box>
    )
}
