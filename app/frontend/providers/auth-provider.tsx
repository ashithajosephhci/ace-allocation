// app/frontend/providers/auth-provider.tsx
"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import api from "@/app/frontend/lib/axios"

type User = {
  id: number
  email: string
  first_name: string
  last_name: string
  user_type: string
  rto?: any
  rto_id?: number | null
}

type AuthContextType = {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (data: {
    email: string
    password: string
    first_name: string
    last_name: string
    user_type: string
  }) => Promise<void>
  logout: () => Promise<void>
  refresh: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)


useEffect(() => {
  const token = localStorage.getItem("access_token")
  if (token) {
     fetchUser().finally(() => setLoading(false))
  } else {
    setLoading(false)
  }
}, [])


  const login = async (email: string, password: string) => {
    const form = new URLSearchParams()
    form.append("username", email)
    form.append("password", password)

    const res = await api.post("/auth/login", form, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      withCredentials: true,
    })

    localStorage.setItem("access_token", res.data.access_token)
    await fetchUser()
  }

  const register = async (data: {
    email: string
    password: string
    first_name: string
    last_name: string
    user_type: string
  }) => {
    await api.post("/users/", data)
  }

  const logout = async () => {
    await api.post("/auth/logout", {}, { withCredentials: true })
    localStorage.removeItem("access_token")
    setUser(null)
  }

  const refresh = async () => {
    const res = await api.post("/auth/refresh", {}, { withCredentials: true })
    localStorage.setItem("access_token", res.data.access_token)
    await fetchUser()
  }

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("access_token")
      if(token){
        const res = await api.get("/users/me")
        setUser(res.data)
      }
      
    } catch {
      setUser(null)
    }finally {
    setLoading(false) // ✅ Always stop loading
  }
  }



  return (
    <AuthContext.Provider value={{ user, login, register, logout, refresh, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook to use in components
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within an AuthProvider")
  return context
}
