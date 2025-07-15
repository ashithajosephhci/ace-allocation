"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { ChevronLeft, ChevronRight, Users, MapPin, AlertCircle } from "lucide-react"

const trainerAvailability = [
  {
    id: 1,
    name: "John Smith",
    availability: {
      Monday: ["9:00-12:00", "13:00-17:00"],
      Tuesday: ["9:00-12:00", "13:00-17:00"],
      Wednesday: ["9:00-12:00"],
      Thursday: ["9:00-12:00", "13:00-17:00"],
      Friday: ["9:00-12:00", "13:00-17:00"],
    },
    conflicts: ["Tuesday 14:00-16:00"],
  },
  {
    id: 2,
    name: "Sarah Johnson",
    availability: {
      Monday: ["10:00-18:00"],
      Tuesday: [],
      Wednesday: ["10:00-18:00"],
      Thursday: [],
      Friday: ["10:00-18:00"],
    },
    conflicts: [],
  },
  {
    id: 3,
    name: "Mike Wilson",
    availability: {
      Monday: [],
      Tuesday: ["8:00-16:00"],
      Wednesday: [],
      Thursday: ["8:00-16:00"],
      Friday: [],
    },
    conflicts: ["Thursday 10:00-12:00"],
  },
]

const roomAvailability = [
  {
    id: 1,
    name: "Room A1",
    capacity: 30,
    availability: {
      Monday: ["8:00-18:00"],
      Tuesday: ["8:00-18:00"],
      Wednesday: ["8:00-18:00"],
      Thursday: ["8:00-18:00"],
      Friday: ["8:00-18:00"],
    },
    maintenance: ["Wednesday 12:00-13:00"],
  },
  {
    id: 2,
    name: "Computer Lab B2",
    capacity: 25,
    availability: {
      Monday: ["9:00-17:00"],
      Tuesday: ["9:00-17:00"],
      Wednesday: ["9:00-17:00"],
      Thursday: ["9:00-17:00"],
      Friday: ["9:00-17:00"],
    },
    maintenance: [],
  },
  {
    id: 3,
    name: "Workshop C1",
    capacity: 20,
    availability: {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
    },
    maintenance: ["All week - Equipment upgrade"],
  },
]

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
const timeSlots = ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]

export function AvailabilityCalendar() {
  const [currentWeek, setCurrentWeek] = useState(new Date())
  const [selectedResource, setSelectedResource] = useState<string>("all")
  const [viewType, setViewType] = useState<"trainers" | "rooms">("trainers")

  const navigateWeek = (direction: "prev" | "next") => {
    const newWeek = new Date(currentWeek)
    newWeek.setDate(currentWeek.getDate() + (direction === "next" ? 7 : -7))
    setCurrentWeek(newWeek)
  }

  const getWeekDates = () => {
    const startOfWeek = new Date(currentWeek)
    startOfWeek.setDate(currentWeek.getDate() - currentWeek.getDay() + 1)

    return weekDays.map((day, index) => {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + index)
      return {
        day,
        date: date.getDate(),
        fullDate: date,
      }
    })
  }

  const isTimeSlotAvailable = (resource: any, day: string, timeSlot: string) => {
    const dayAvailability = resource.availability[day] || []
    return dayAvailability.some((slot: string) => {
      const [start, end] = slot.split("-")
      const slotTime = Number.parseInt(timeSlot.replace(":", ""))
      const startTime = Number.parseInt(start.replace(":", ""))
      const endTime = Number.parseInt(end.replace(":", ""))
      return slotTime >= startTime && slotTime < endTime
    })
  }

  const hasConflict = (resource: any, day: string, timeSlot: string) => {
    const conflicts = viewType === "trainers" ? resource.conflicts : resource.maintenance
    return conflicts.some((conflict: string) => {
      if (conflict.includes(day)) {
        const timeRange = conflict.split(" ")[1]
        if (timeRange) {
          const [start, end] = timeRange.split("-")
          const slotTime = Number.parseInt(timeSlot.replace(":", ""))
          const startTime = Number.parseInt(start.replace(":", ""))
          const endTime = Number.parseInt(end.replace(":", ""))
          return slotTime >= startTime && slotTime < endTime
        }
      }
      return false
    })
  }

  const weekDates = getWeekDates()
  const resources = viewType === "trainers" ? trainerAvailability : roomAvailability

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Trainer & Room Availability</CardTitle>
              <CardDescription>View and manage resource availability and conflicts</CardDescription>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={selectedResource} onValueChange={setSelectedResource}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Resources</SelectItem>
                  {resources.map((resource) => (
                    <SelectItem key={resource.id} value={resource.id.toString()}>
                      {resource.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => navigateWeek("prev")}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium min-w-[120px] text-center">
                  {currentWeek.toLocaleDateString("en-AU", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <Button variant="outline" size="sm" onClick={() => navigateWeek("next")}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Tabs */}
      <Tabs value={viewType} onValueChange={(value) => setViewType(value as "trainers" | "rooms")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="trainers" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Trainer Availability</span>
          </TabsTrigger>
          <TabsTrigger value="rooms" className="flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span>Room Availability</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trainers" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <div className="min-w-[800px]">
                  {/* Header */}
                  <div className="grid grid-cols-6 border-b bg-gray-50">
                    <div className="p-4 font-medium text-gray-600 border-r">Trainer</div>
                    {weekDates.map(({ day, date }) => (
                      <div key={day} className="p-4 text-center border-r last:border-r-0">
                        <div className="font-medium text-gray-900">{day}</div>
                        <div className="text-sm text-gray-500">{date}</div>
                      </div>
                    ))}
                  </div>

                  {/* Trainer Rows */}
                  {trainerAvailability.map((trainer) => (
                    <div key={trainer.id} className="border-b">
                      <div className="grid grid-cols-6">
                        <div className="p-4 font-medium text-gray-900 border-r bg-gray-50">
                          <div>{trainer.name}</div>
                          {trainer.conflicts.length > 0 && (
                            <Badge variant="destructive" className="mt-1 text-xs">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Conflicts
                            </Badge>
                          )}
                        </div>
                        {weekDays.map((day) => (
                          <div key={`${trainer.id}-${day}`} className="p-2 border-r last:border-r-0">
                            <div className="space-y-1">
                              {trainer.availability[day as keyof typeof trainer.availability]?.map((slot, index) => (
                                <div key={index} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                  {slot}
                                </div>
                              )) || <div className="text-xs text-gray-400 px-2 py-1">Not Available</div>}
                              {trainer.conflicts
                                .filter((conflict) => conflict.includes(day))
                                .map((conflict, index) => (
                                  <div key={index} className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                                    <AlertCircle className="h-3 w-3 inline mr-1" />
                                    {conflict.split(" ")[1]}
                                  </div>
                                ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rooms" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <div className="min-w-[800px]">
                  {/* Header */}
                  <div className="grid grid-cols-6 border-b bg-gray-50">
                    <div className="p-4 font-medium text-gray-600 border-r">Room</div>
                    {weekDates.map(({ day, date }) => (
                      <div key={day} className="p-4 text-center border-r last:border-r-0">
                        <div className="font-medium text-gray-900">{day}</div>
                        <div className="text-sm text-gray-500">{date}</div>
                      </div>
                    ))}
                  </div>

                  {/* Room Rows */}
                  {roomAvailability.map((room) => (
                    <div key={room.id} className="border-b">
                      <div className="grid grid-cols-6">
                        <div className="p-4 font-medium text-gray-900 border-r bg-gray-50">
                          <div>{room.name}</div>
                          <div className="text-sm text-gray-500">Capacity: {room.capacity}</div>
                          {room.maintenance.length > 0 && (
                            <Badge variant="destructive" className="mt-1 text-xs">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Maintenance
                            </Badge>
                          )}
                        </div>
                        {weekDays.map((day) => (
                          <div key={`${room.id}-${day}`} className="p-2 border-r last:border-r-0">
                            <div className="space-y-1">
                              {room.availability[day as keyof typeof room.availability]?.map((slot, index) => (
                                <div key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                  {slot}
                                </div>
                              )) || <div className="text-xs text-gray-400 px-2 py-1">Not Available</div>}
                              {room.maintenance
                                .filter((maintenance) => maintenance.includes(day) || maintenance.includes("All week"))
                                .map((maintenance, index) => (
                                  <div key={index} className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                                    <AlertCircle className="h-3 w-3 inline mr-1" />
                                    Maintenance
                                  </div>
                                ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available Trainers</p>
                <p className="text-2xl font-bold text-green-600">
                  {
                    trainerAvailability.filter((t) => Object.values(t.availability).some((slots) => slots.length > 0))
                      .length
                  }
                </p>
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
                <p className="text-2xl font-bold text-blue-600">
                  {
                    roomAvailability.filter((r) => Object.values(r.availability).some((slots) => slots.length > 0))
                      .length
                  }
                </p>
              </div>
              <MapPin className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conflicts</p>
                <p className="text-2xl font-bold text-red-600">
                  {trainerAvailability.reduce((acc, t) => acc + t.conflicts.length, 0) +
                    roomAvailability.reduce((acc, r) => acc + r.maintenance.length, 0)}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
