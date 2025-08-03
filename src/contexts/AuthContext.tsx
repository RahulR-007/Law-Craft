import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { supabase } from '../lib/supabase'

interface User {
  id: string
  email: string
  user_metadata: {
    fullname?: string
    plan_name?: string
    tokens?: number
    phone?: string
    company?: string
    position?: string
    location?: string
    bio?: string
    settings?: any
  }
}

interface AuthContextType {
  user: User | null
  signIn: (email: string, password: string) => Promise<{ error?: any }>
  signUp: (email: string, password: string, fullname: string) => Promise<{ error?: any }>
  signOut: () => Promise<{ error?: any }>
  updateUser: (userData: any) => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user as User || null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user as User || null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      return { error }
    } catch (error) {
      return { error }
    }
  }

  const signUp = async (email: string, password: string, fullname: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            fullname,
            plan_name: 'Free',
            tokens: 2
          }
        }
      })
      return { error }
    } catch (error) {
      return { error }
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      return { error }
    } catch (error) {
      return { error }
    }
  }

  const updateUser = async (userData: any) => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: userData
      })
      if (error) throw error
      
      // Refresh the session to get updated user data
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        setUser(session.user as User)
      }
    } catch (error) {
      console.error('Error updating user:', error)
      throw error
    }
  }

  const value = {
    user,
    signIn,
    signUp,
    signOut,
    updateUser,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
