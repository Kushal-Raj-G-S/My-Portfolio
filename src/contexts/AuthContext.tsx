import React from 'react'

interface AuthContextProps {
  user: null
  isAuthLoading: boolean
  isInitLoading: boolean
  error: string
  login: () => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = React.createContext<AuthContextProps>({
  user: null,
  isAuthLoading: false,
  isInitLoading: true,
  error: '',
  login: async () => {},
  logout: async () => {},
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthContext.Provider
      value={{ user: null, isAuthLoading: false, isInitLoading: false, error: '', login: async () => {}, logout: async () => {} }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
