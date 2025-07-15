"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/app/frontend/components/ui/card"
import { Users, GraduationCap, Calendar, BookOpen } from "lucide-react"
import api from "@/app/frontend/lib/axios"
import { useAuth } from "../../providers/auth-provider"

interface RTOStats {
  total_trainers: number
  total_students: number
  total_classes: number
  active_courses: number
}

export function RTOStatsCards() {
  const [stats, setStats] = useState<RTOStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    if (user?.rto?.id || user?.rto_id) {
      fetchRTOStats(user.rto?.id || user.rto_id)
    } else {
      setLoading(false)
      setError("User is not linked to an RTO")
    }
  }, [user])

  const fetchRTOStats = async (rtoId: number) => {
    try {
      const rtoRes = await api.get(`/rtos/${rtoId}`)
      const rto = rtoRes.data

      setStats({
        total_trainers: 5,
        total_students: 20,
        total_classes: 8,
        active_courses: 10,
      })
      setError(null)
    } catch (err: any) {
      console.error("❌ Failed to fetch RTO stats:", err)
      setError(err?.response?.data?.detail || "Could not get RTO info")
    } finally {
      setLoading(false)
    }
  }


  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                  <div className="h-8 bg-gray-200 rounded w-12"></div>
                </div>
                <div className="h-8 w-8 bg-gray-200 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="md:col-span-2 lg:col-span-4">
          <CardContent className="p-4">
            <div className="text-center text-red-600">
              <p className="font-medium">Error loading RTO statistics</p>
              <p className="text-sm">{error}</p>
              <button
                onClick={() =>fetchRTOStats}
                className="mt-2 text-blue-600 hover:text-blue-800 text-sm underline"
              >
                Try again
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!stats) return null

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Trainers</p>
              <p className="text-2xl font-bold">{stats.total_trainers}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Enrolled Students</p>
              <p className="text-2xl font-bold">{stats.total_students}</p>
            </div>
            <GraduationCap className="h-8 w-8 text-green-600" />
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Scheduled Classes</p>
              <p className="text-2xl font-bold">{stats.total_classes}</p>
            </div>
            <Calendar className="h-8 w-8 text-purple-600" />
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Courses</p>
              <p className="text-2xl font-bold">{stats.active_courses}</p>
            </div>
            <BookOpen className="h-8 w-8 text-orange-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
