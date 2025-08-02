import React from 'react'
import { Box, Text } from '@chakra-ui/react'

export const TestPage: React.FC = () => {
    return (
        <Box
            w="100vw"
            h="100vh"
            bg="red"
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <Text color="white" fontSize="2xl">
                TEST PAGE - THIS SHOULD BE VISIBLE
            </Text>
        </Box>
    )
}
