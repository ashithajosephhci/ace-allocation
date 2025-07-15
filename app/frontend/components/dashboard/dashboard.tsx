"use client"

import { useAuth } from "@/app/frontend/providers/auth-provider"
import { Button } from "@/app/frontend/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/frontend/components/ui/card"
import { Badge } from "@/app/frontend/components/ui/badge"
import { LogOut, User, Settings, Calendar, Users, BookOpen, GraduationCap, BarChart3, Clock } from "lucide-react"
import { useState } from "react"
import { TimetablePage } from "../timetabling/timetable-page"
import { RTOInfoCard } from "../dashboard/rto-info-card"
import { RTOStatsCards } from "../dashboard/rto-stats-cards"
import { useEffect } from "react"
import { useRouter } from "next/navigation"


export function Dashboard() {
  const { user, logout } = useAuth()
  const [currentPage, setCurrentPage] = useState<"dashboard" | "timetabling">("dashboard")
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token && !user) {
      router.push("/login");
    }
  }, [router, user]);

  const getUserTypeColor = (userType: string) => {
    switch (userType) {
      case "super_admin":
        return "bg-red-100 text-red-800 border-red-200"
      case "rto_manager":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "trainer":
        return "bg-green-100 text-green-800 border-green-200"
      case "student":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getUserTypeIcon = (userType: string) => {
    switch (userType) {
      case "super_admin":
        return <Settings className="h-4 w-4" />
      case "rto_manager":
        return <Users className="h-4 w-4" />
      case "trainer":
        return <BookOpen className="h-4 w-4" />
      case "student":
        return <GraduationCap className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const getDashboardContent = () => {
    switch (user?.user_type) {
      case "super_admin":
        return (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total RTOs</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">+15% from last month</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">456</div>
                <p className="text-xs text-muted-foreground">+8% from last month</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">System Health</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">98.5%</div>
                <p className="text-xs text-muted-foreground">Uptime this month</p>
              </CardContent>
            </Card>
          </div>
        )
      case "rto_manager":
        return (
          <div className="mt-6 space-y-6">

            {/* RTO Statistics */}
            <RTOStatsCards />
            {/* RTO Information Card */}
            
            {user?.rto && <RTOInfoCard rto={user.rto} />}

            
          </div>
        )
      case "trainer":
        return (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Classes Today</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Next at 10:00 AM</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">My Students</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45</div>
                <p className="text-xs text-muted-foreground">Across all courses</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">This Week</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground">Total classes</p>
              </CardContent>
            </Card>
          </div>
        )
      case "student":
        return (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Classes Today</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">Next at 9:00 AM</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Course Progress</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">75%</div>
                <p className="text-xs text-muted-foreground">Certificate IV Business</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Assignments Due</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">This week</p>
              </CardContent>
            </Card>
          </div>
        )
      default:
        return <div>Welcome to AceAllocation!</div>
    }
  }

  if (currentPage === "timetabling") {
    return <TimetablePage onBack={() => setCurrentPage("dashboard")} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">AceAllocation</h1>
              <Badge className={getUserTypeColor(user?.user_type || "")}>
                {getUserTypeIcon(user?.user_type || "")}
                <span className="ml-1 capitalize">{user?.user_type?.replace("_", " ")}</span>
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user?.first_name} {user?.last_name}
                </p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
              <Button
                variant="outline"
                onClick={logout}
                className="hover:bg-red-50 hover:text-red-700 hover:border-red-200 bg-transparent"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.first_name}!
            {user?.rto && <span className="block text-lg font-normal text-gray-600 mt-1">{user.rto.name}</span>}
          </h2>
          <p className="text-gray-600">
            Here's what's happening with your {user?.user_type?.replace("_", " ")} dashboard today.
          </p>
        </div>

        

        {/* Quick Actions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks for your role</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                {user?.user_type === "super_admin" && (
                  <>
                    <Button variant="outline" className="justify-start h-auto p-4 hover:bg-blue-50 bg-transparent">
                      <div className="flex items-center space-x-3">
                        <Users className="h-5 w-5 text-blue-600" />
                        <div className="text-left">
                          <div className="font-medium">Manage RTOs</div>
                          <div className="text-xs text-gray-500">Add, edit, remove RTOs</div>
                        </div>
                      </div>
                    </Button>
                    <Button variant="outline" className="justify-start h-auto p-4 hover:bg-green-50 bg-transparent">
                      <div className="flex items-center space-x-3">
                        <Settings className="h-5 w-5 text-green-600" />
                        <div className="text-left">
                          <div className="font-medium">System Settings</div>
                          <div className="text-xs text-gray-500">Configure system</div>
                        </div>
                      </div>
                    </Button>
                    <Button variant="outline" className="justify-start h-auto p-4 hover:bg-purple-50 bg-transparent">
                      <div className="flex items-center space-x-3">
                        <User className="h-5 w-5 text-purple-600" />
                        <div className="text-left">
                          <div className="font-medium">User Management</div>
                          <div className="text-xs text-gray-500">Manage all users</div>
                        </div>
                      </div>
                    </Button>
                    <Button variant="outline" className="justify-start h-auto p-4 hover:bg-orange-50 bg-transparent">
                      <div className="flex items-center space-x-3">
                        <BarChart3 className="h-5 w-5 text-orange-600" />
                        <div className="text-left">
                          <div className="font-medium">View Reports</div>
                          <div className="text-xs text-gray-500">Analytics & insights</div>
                        </div>
                      </div>
                    </Button>
                  </>
                )}
                {user?.user_type === "rto_manager" && (
                  <>
                    <Button variant="outline" className="justify-start h-auto p-4 hover:bg-blue-50 bg-transparent">
                      <div className="flex items-center space-x-3">
                        <BookOpen className="h-5 w-5 text-blue-600" />
                        <div className="text-left">
                          <div className="font-medium">Manage Trainers</div>
                          <div className="text-xs text-gray-500">Add, assign trainers</div>
                        </div>
                      </div>
                    </Button>
                    <Button variant="outline" className="justify-start h-auto p-4 hover:bg-green-50 bg-transparent">
                      <div className="flex items-center space-x-3">
                        <GraduationCap className="h-5 w-5 text-green-600" />
                        <div className="text-left">
                          <div className="font-medium">Manage Students</div>
                          <div className="text-xs text-gray-500">Enrollment & progress</div>
                        </div>
                      </div>
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start h-auto p-4 hover:bg-purple-50 bg-transparent"
                      onClick={() => setCurrentPage("timetabling")}
                    >
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-purple-600" />
                        <div className="text-left">
                          <div className="font-medium">Schedule Classes</div>
                          <div className="text-xs text-gray-500">Timetable management</div>
                        </div>
                      </div>
                    </Button>
                    <Button variant="outline" className="justify-start h-auto p-4 hover:bg-orange-50 bg-transparent">
                      <div className="flex items-center space-x-3">
                        <Settings className="h-5 w-5 text-orange-600" />
                        <div className="text-left">
                          <div className="font-medium">RTO Settings</div>
                          <div className="text-xs text-gray-500">Configure RTO</div>
                        </div>
                      </div>
                    </Button>
                  </>
                )}
                {user?.user_type === "trainer" && (
                  <>
                    <Button variant="outline" className="justify-start h-auto p-4 hover:bg-blue-50 bg-transparent">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        <div className="text-left">
                          <div className="font-medium">View Schedule</div>
                          <div className="text-xs text-gray-500">My class timetable</div>
                        </div>
                      </div>
                    </Button>
                    <Button variant="outline" className="justify-start h-auto p-4 hover:bg-green-50 bg-transparent">
                      <div className="flex items-center space-x-3">
                        <GraduationCap className="h-5 w-5 text-green-600" />
                        <div className="text-left">
                          <div className="font-medium">My Students</div>
                          <div className="text-xs text-gray-500">Student progress</div>
                        </div>
                      </div>
                    </Button>
                    <Button variant="outline" className="justify-start h-auto p-4 hover:bg-purple-50 bg-transparent">
                      <div className="flex items-center space-x-3">
                        <BookOpen className="h-5 w-5 text-purple-600" />
                        <div className="text-left">
                          <div className="font-medium">Course Materials</div>
                          <div className="text-xs text-gray-500">Resources & content</div>
                        </div>
                      </div>
                    </Button>
                    <Button variant="outline" className="justify-start h-auto p-4 hover:bg-orange-50 bg-transparent">
                      <div className="flex items-center space-x-3">
                        <User className="h-5 w-5 text-orange-600" />
                        <div className="text-left">
                          <div className="font-medium">Profile Settings</div>
                          <div className="text-xs text-gray-500">Update profile</div>
                        </div>
                      </div>
                    </Button>
                  </>
                )}
                {user?.user_type === "student" && (
                  <>
                    <Button variant="outline" className="justify-start h-auto p-4 hover:bg-blue-50 bg-transparent">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        <div className="text-left">
                          <div className="font-medium">My Timetable</div>
                          <div className="text-xs text-gray-500">Class schedule</div>
                        </div>
                      </div>
                    </Button>
                    <Button variant="outline" className="justify-start h-auto p-4 hover:bg-green-50 bg-transparent">
                      <div className="flex items-center space-x-3">
                        <BarChart3 className="h-5 w-5 text-green-600" />
                        <div className="text-left">
                          <div className="font-medium">Course Progress</div>
                          <div className="text-xs text-gray-500">Track progress</div>
                        </div>
                      </div>
                    </Button>
                    <Button variant="outline" className="justify-start h-auto p-4 hover:bg-purple-50 bg-transparent">
                      <div className="flex items-center space-x-3">
                        <BookOpen className="h-5 w-5 text-purple-600" />
                        <div className="text-left">
                          <div className="font-medium">Assignments</div>
                          <div className="text-xs text-gray-500">View & submit</div>
                        </div>
                      </div>
                    </Button>
                    <Button variant="outline" className="justify-start h-auto p-4 hover:bg-orange-50 bg-transparent">
                      <div className="flex items-center space-x-3">
                        <User className="h-5 w-5 text-orange-600" />
                        <div className="text-left">
                          <div className="font-medium">Profile Settings</div>
                          <div className="text-xs text-gray-500">Update profile</div>
                        </div>
                      </div>
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        {getDashboardContent()}
      </main>
    </div>
  )
}
