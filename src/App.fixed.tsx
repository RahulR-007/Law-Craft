import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import { Landing } from './pages/Landing'
import { SimpleLanding } from './pages/SimpleLanding'
import { AuthPage } from './pages/Auth'
import { Dashboard } from './pages/Dashboard'
import { TestPage } from './pages/TestPage'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import theme from './theme.new'
import './App.css'

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, loading } = useAuth()

    if (loading) {
        return <div>Loading...</div>
    }

    return user ? <>{children}</> : <Navigate to="/auth" />
}

function App() {
    return (
        <ChakraProvider theme={theme}>
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/simple" element={<SimpleLanding />} />
                        <Route path="/test" element={<TestPage />} />
                        <Route path="/auth" element={<AuthPage />} />
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </Router>
            </AuthProvider>
        </ChakraProvider>
    )
}

export default App
