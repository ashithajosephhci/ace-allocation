"use client"

import { useState } from "react"
import { Card, CardContent } from "../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { ArrowLeft, Calendar, Users, MapPin, FileText, Plus } from "lucide-react"
import { TimetableEditor } from "./timetable-editor"
import { ClassAllocation } from "./class-allocation"
import { AvailabilityCalendar } from "./availability-calendar"
import { ReportsSection } from "./reports-section"

interface TimetablePageProps {
  onBack: () => void
}

export function TimetablePage({ onBack }: TimetablePageProps) {
  const [activeTab, setActiveTab] = useState("timetable")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack} className="hover:bg-gray-100">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Timetabling & Class Allocation</h1>
                <p className="text-sm text-gray-600">Manage schedules, allocate classes, and track availability</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Calendar className="h-3 w-3 mr-1" />
                Current Term: Term 1 2024
              </Badge>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Quick Schedule
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Classes</p>
                  <p className="text-2xl font-bold text-gray-900">89</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Trainers</p>
                  <p className="text-2xl font-bold text-gray-900">24</p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Available Rooms</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
                <MapPin className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Utilization</p>
                  <p className="text-2xl font-bold text-gray-900">78%</p>
                </div>
                <FileText className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="timetable" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Timetable Editor</span>
            </TabsTrigger>
            <TabsTrigger value="allocation" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Class Allocation</span>
            </TabsTrigger>
            <TabsTrigger value="availability" className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Availability</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Reports</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="timetable" className="space-y-4">
            <TimetableEditor />
          </TabsContent>

          <TabsContent value="allocation" className="space-y-4">
            <ClassAllocation />
          </TabsContent>

          <TabsContent value="availability" className="space-y-4">
            <AvailabilityCalendar />
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <ReportsSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
