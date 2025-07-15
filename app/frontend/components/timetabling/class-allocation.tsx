"use client"

import { useState, useMemo } from "react"
import {
  useClasses,
  useClassAllocations,
} from "@/app/frontend/hooks/useClass"
import { useRooms } from "@/app/frontend/hooks/useRoom"
import { useTrainers } from "@/app/frontend/hooks/useTrainers"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Badge } from "../ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Search, Filter, Users, Clock, BookOpen, Wand2 } from "lucide-react"

export function ClassAllocation() {
  const [selectedClass, setSelectedClass] = useState<number | null>(null)
  const [allocationMode, setAllocationMode] = useState<"manual" | "wizard">("manual")

  const { classes = [], isLoading: loadingClasses } = useClasses()
  const { trainers = [], isLoading: loadingTrainers } = useTrainers()
  const { rooms = [], isLoading: loadingRooms } = useRooms()
  const {
    allocations = [],
    isLoading: loadingAllocations,
    refreshAllocations,
    createAllocation,
  } = useClassAllocations()

  const unallocatedClasses = useMemo(() => {
    return classes.filter((c) => !c.trainer_id || !c.room_id)
  }, [classes])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getLoadColor = (load: number) => {
    if (load >= 80) return "bg-red-500"
    if (load >= 60) return "bg-yellow-500"
    return "bg-green-500"
  }

  const selectedClassObj = useMemo(
    () => unallocatedClasses.find((cls) => cls.id === selectedClass),
    [selectedClass, unallocatedClasses]
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Class Allocation</CardTitle>
              <CardDescription>
                Assign trainers and rooms to unallocated classes
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
              <Button
                variant={allocationMode === "wizard" ? "default" : "outline"}
                onClick={() => setAllocationMode("wizard")}
                className="flex items-center space-x-2"
              >
                <Wand2 className="h-4 w-4" />
                <span>Auto Allocate</span>
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <span>Unallocated Classes</span>
              <Badge variant="secondary">{unallocatedClasses.length}</Badge>
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search classes..." className="pl-10" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {unallocatedClasses.map((cls) => (
              <div
                key={cls.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                  selectedClass === cls.id ? "border-blue-500 bg-blue-50" : "border-gray-200"
                }`}
                onClick={() => setSelectedClass(cls.id ?? null)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{cls.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{cls.unit?.title || "Unknown Unit"}</p>
                  </div>
                  <Badge className={getPriorityColor("high")}>high</Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    {cls.enrolled_students} students
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {cls.duration_minutes} mins
                  </span>
                </div>
                <div className="mt-2">
                  <div className="flex flex-wrap gap-1">
                    {cls.resources_required?.map((req) => (
                      <Badge key={req} variant="outline" className="text-xs">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Allocation Interface</CardTitle>
            <CardDescription>
              {selectedClass
                ? `Allocating: ${selectedClassObj?.unit?.title || "Untitled Unit"}`
                : "Select a class to start allocation"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedClass ? (
              <Tabs defaultValue="trainers" className="space-y-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="trainers">Available Trainers</TabsTrigger>
                  <TabsTrigger value="rooms">Available Rooms</TabsTrigger>
                </TabsList>

                <TabsContent value="trainers" className="space-y-4">
                  <div className="space-y-3">
                    {trainers.map((trainer) => (
                      <div key={trainer.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-medium">{trainer.first_name}</h4>
                            <p className="text-sm text-gray-600">Mon-Fri 9AM-5PM</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-sm text-gray-600">Workload:</span>
                              <div className="w-16 h-2 bg-gray-200 rounded-full">
                                <div
                                  className={`h-full rounded-full ${getLoadColor(trainer.current_load || 50)}`}
                                  style={{ width: `${trainer.current_load || 50}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium">{trainer.current_load || 50}%</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="w-full"
                          onClick={() =>
                            createAllocation({ class_id: selectedClass, trainer_id: trainer.id })
                          }
                        >
                          Assign Trainer
                        </Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="rooms" className="space-y-4">
                  <div className="space-y-3">
                    {rooms.map((room) => (
                      <div key={room.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-medium">{room.name}</h4>
                            <p className="text-sm text-gray-600">Capacity: {room.capacity}</p>
                          </div>
                          <Badge
                            className={
                              room.is_bookable
                                ? "bg-green-100 text-green-800 border-green-200"
                                : "bg-red-100 text-red-800 border-red-200"
                            }
                          >
                            {room.is_bookable ? "Available" : "Unavailable"}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {room.equipment?.map((equip) => (
                            <Badge key={equip} variant="outline" className="text-xs">
                              {equip}
                            </Badge>
                          ))}
                        </div>
                        <Button
                          size="sm"
                          className="w-full"
                          disabled={!room.is_bookable}
                          onClick={() =>
                            createAllocation({ class_id: selectedClass, room_id: room.id })
                          }
                        >
                          {room.is_bookable ? "Assign Room" : "Unavailable"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select a class from the left panel to start allocation</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
