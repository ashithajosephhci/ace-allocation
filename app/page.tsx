"use client"

import { useAuth } from "@/app/frontend/providers/auth-provider"
import { LoginForm } from "@/app/frontend/components/login/login-form"
import { Dashboard } from "@/app/frontend/components/dashboard/dashboard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/frontend/components/ui/card"
import { Alert, AlertDescription } from "@/app/frontend/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function Home() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading AceAllocation...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-4">
         

          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900">AceAllocation</CardTitle>
              <CardDescription>RTO Management System for Australia</CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return <Dashboard />
}
