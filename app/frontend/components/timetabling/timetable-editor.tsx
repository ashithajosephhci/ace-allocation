"use client";

import type React from "react";
import { useState } from "react";
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  BookOpen,
  User,
  Upload,
  Plus,
  Filter,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2,
  FileText,
  GraduationCap,
  School,
  Home,
} from "lucide-react";
import { Button } from "@/app/frontend/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/frontend/components/ui/card";
import { Badge } from "@/app/frontend/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/frontend/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/frontend/components/ui/select";
import { Input } from "@/app/frontend/components/ui/input";
import { Label } from "@/app/frontend/components/ui/label";
import { Textarea } from "@/app/frontend/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/app/frontend/components/ui/tabs";
import { cn } from "@/app/frontend/lib/utils";
import { useQualifications } from "../../hooks/useQualifications";
import { useUnits } from "../../hooks/useUnits";
import { useCampuses } from "../../hooks/useCampuses";
import { useCohorts } from "../../hooks/useCohorts";

interface ClassData {
  id: string;
  title: string;
  qualification: string;
  cohort: string;
  campus: string;
  unit: string;
  trainer: string;
  room: string;
  type: "lecture" | "practical" | "assessment" | "workshop";
  startTime: string;
  endTime: string;
  duration: number;
  students: number;
  description?: string;
  date: string;
}

interface NewClassForm {
  title: string;
  qualification: string;
  cohort: string;
  campus: string;
  unit: string;
  trainer: string;
  room: string;
  type: "lecture" | "practical" | "assessment" | "workshop";
  startTime: string;
  duration: number;
  students: number;
  description: string;
  deliveryType : string;
}

const initialFormData: NewClassForm = {
  title: "",
  qualification: "",
  cohort: "",
  campus: "",
  unit: "",
  trainer: "",
  room: "",
  type: "lecture",
  startTime: "",
  duration: 60,
  students: 0,
  description: "",
  deliveryType :"Online"
};

const sampleClasses: ClassData[] = [
  {
    id: "1",
    title: "Anatomy & Physiology",
    qualification: "Diploma of Nursing",
    cohort: "25ADON01",
    campus: "Sydney Campus",
    unit: "HLTAAP001",
    trainer: "Dr. Sarah Wilson",
    room: "Room 101",
    type: "lecture",
    startTime: "09:00",
    endTime: "11:00",
    duration: 120,
    students: 25,
    description: "Introduction to human anatomy and physiology systems",
    date: "2024-01-15",
  },
  {
    id: "2",
    title: "Clinical Skills Practice",
    qualification: "Diploma of Nursing",
    cohort: "25ADON01",
    campus: "Sydney Campus",
    unit: "HLTENN002",
    trainer: "Nurse Emma Davis",
    room: "Skills Lab A",
    type: "practical",
    startTime: "13:00",
    endTime: "16:00",
    duration: 180,
    students: 15,
    description: "Hands-on clinical skills training",
    date: "2024-01-15",
  },
  {
    id: "3",
    title: "Medication Administration",
    qualification: "Diploma of Nursing",
    cohort: "25BDON02",
    campus: "Melbourne Campus",
    unit: "HLTENN003",
    trainer: "Dr. Michael Brown",
    room: "Room 205",
    type: "lecture",
    startTime: "10:00",
    endTime: "12:00",
    duration: 120,
    students: 20,
    description: "Safe medication administration practices",
    date: "2024-01-16",
  },
  {
    id: "4",
    title: "Patient Assessment",
    qualification: "Certificate IV in Health Care",
    cohort: "25ACHC01",
    campus: "Brisbane Campus",
    unit: "HLTHSS005",
    trainer: "Sarah Johnson",
    room: "Room 301",
    type: "workshop",
    startTime: "14:00",
    endTime: "17:00",
    duration: 180,
    students: 18,
    description: "Comprehensive patient assessment techniques",
    date: "2024-01-17",
  },
];

const trainers = [
  "Dr. Sarah Wilson",
  "Nurse Emma Davis",
  "Dr. Michael Brown",
  "Sarah Johnson",
  "David Miller",
  "Lisa Garcia",
];

const rooms = [
  "Room 101",
  "Room 102",
  "Room 201",
  "Room 205",
  "Room 301",
  "Skills Lab A",
  "Skills Lab B",
  "Computer Lab",
];

export function TimetableEditor() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"weekly" | "monthly" | "cohort">("monthly");
  const { qualifications, loading: qualLoading } = useQualifications();
  const [selectedCohort, setSelectedCohort] = useState("All Cohorts");
  const [selectedCampus, setSelectedCampus] = useState("All Campuses");
  const [classes, setClasses] = useState<ClassData[]>(sampleClasses);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showAddClassDialog, setShowAddClassDialog] = useState(false);
  const [newClassForm, setNewClassForm] =
    useState<NewClassForm>(initialFormData);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedQualification, setSelectedQualification] =
    useState("All Qualifications");
  const [selectedQualificationId, setSelectedQualificationId] = useState<
    number | null
  >(null);
  const { units, loading: unitsLoading } = useUnits(selectedQualificationId);
  const { campuses, loading: campusesLoading } = useCampuses();
  const { cohorts, loading: cohortsLoading } = useCohorts(
    selectedQualificationId ?? undefined
  );
  const [deliveryType, setDeliveryType] = useState("On Campus");
  console.log("hi", cohorts)

  const filteredClasses = classes.filter((cls) => {
    const qualificationMatch =
      selectedQualification === "All Qualifications" ||
      cls.qualification === selectedQualification;
    const cohortMatch =
      selectedCohort === "All Cohorts" || cls.cohort === selectedCohort;
    const campusMatch =
      selectedCampus === "All Campuses" || cls.campus === selectedCampus;
    return qualificationMatch && cohortMatch && campusMatch;
  });
  const getClassesForDate = (date: string) => {
    return filteredClasses.filter((cls) => cls.date === date);
  };

  const getClassCountForDate = (date: string) => {
    return getClassesForDate(date).length;
  };

  const getCountColor = (count: number) => {
    if (count === 0) return "bg-gray-100 text-gray-400";
    if (count <= 2) return "bg-green-100 text-green-800";
    if (count <= 4) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const getWeekDays = (date: Date) => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);

    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const navigateWeek = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setDate(prev.getDate() - 7);
      } else {
        newDate.setDate(prev.getDate() + 7);
      }
      return newDate;
    });
  };

  const handleDayClick = (date: Date) => {
    const dateString = formatDate(date);
    setSelectedDay(dateString);
  };

  const handleUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulate file processing and extraction
      setTimeout(() => {
        const extractedClasses: ClassData[] = [
          {
            id: Date.now().toString(),
            title: "Extracted: Patient Care Fundamentals",
            qualification: "Diploma of Nursing",
            cohort: "25ADON01",
            campus: "Sydney Campus",
            unit: "HLTENN001",
            trainer: "Dr. Sarah Wilson",
            room: "Room 102",
            type: "lecture",
            startTime: "09:00",
            endTime: "11:00",
            duration: 120,
            students: 25,
            description:
              "Extracted from session plan: Fundamentals of patient care",
            date: formatDate(new Date()),
          },
        ];
        setClasses((prev) => [...prev, ...extractedClasses]);
        setShowUploadDialog(false);
      }, 2000);
    }
  };

  const handleAddClass = () => {
    if (
      !newClassForm.title ||
      !newClassForm.qualification ||
      !newClassForm.cohort ||
      !newClassForm.campus
    ) {
      return;
    }

    const newClass: ClassData = {
      id: Date.now().toString(),
      ...newClassForm,
      endTime: calculateEndTime(newClassForm.startTime, newClassForm.duration),
      date: selectedDate || formatDate(new Date()),
    };

    setClasses((prev) => [...prev, newClass]);
    setNewClassForm(initialFormData);
    setShowAddClassDialog(false);
    setSelectedDate("");
  };

  const calculateEndTime = (startTime: string, duration: number) => {
    const [hours, minutes] = startTime.split(":").map(Number);
    const startMinutes = hours * 60 + minutes;
    const endMinutes = startMinutes + duration;
    const endHours = Math.floor(endMinutes / 60);
    const endMins = endMinutes % 60;
    return `${endHours.toString().padStart(2, "0")}:${endMins
      .toString()
      .padStart(2, "0")}`;
  };

  const handleDeleteClass = (classId: string) => {
    setClasses((prev) => prev.filter((cls) => cls.id !== classId));
  };

  const renderCalendarGrid = () => {
    const days =
      view === "weekly"
        ? getWeekDays(currentDate)
        : getDaysInMonth(currentDate);
    const today = formatDate(new Date());

    if (view === "weekly") {
      return (
        <div className="grid grid-cols-7 gap-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="p-2 text-center font-semibold text-gray-600 bg-gray-50 rounded"
            >
              {day}
            </div>
          ))}
          {days.map((day, index) => {
            if (!day) return null;
            const dateString = formatDate(day);
            const classCount = getClassCountForDate(dateString);
            const isToday = dateString === today;

            return (
              <Card
                key={index}
                className={cn(
                  "cursor-pointer hover:shadow-md transition-shadow min-h-[100px]",
                  isToday && "ring-2 ring-blue-500"
                )}
                onClick={() => handleDayClick(day)}
              >
                <CardContent className="p-3">
                  <div className="text-lg font-semibold mb-2">
                    {day.getDate()}
                  </div>
                  {classCount > 0 && (
                    <Badge className={cn("text-xs", getCountColor(classCount))}>
                      {classCount} {classCount === 1 ? "class" : "classes"}
                    </Badge>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="p-2 text-center font-semibold text-gray-600 bg-gray-50 rounded"
          >
            {day}
          </div>
        ))}
        {days.map((day, index) => {
          if (!day) {
            return <div key={index} className="min-h-[80px]" />;
          }

          const dateString = formatDate(day);
          const classCount = getClassCountForDate(dateString);
          const isToday = dateString === today;

          return (
            <Card
              key={index}
              className={cn(
                "cursor-pointer hover:shadow-md transition-shadow min-h-[80px]",
                isToday && "ring-2 ring-blue-500"
              )}
              onClick={() => handleDayClick(day)}
            >
              <CardContent className="p-2">
                <div className="text-sm font-semibold mb-1">
                  {day.getDate()}
                </div>
                {classCount > 0 && (
                  <Badge className={cn("text-xs", getCountColor(classCount))}>
                    {classCount}
                  </Badge>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  const selectedDayClasses = selectedDay ? getClassesForDate(selectedDay) : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Timetable Editor</h2>
          <p className="text-gray-600">
            Manage class schedules and allocations
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Upload Session Plan
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Session Plan</DialogTitle>
                <DialogDescription>
                  Upload a session plan document to automatically extract class
                  details
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-sm text-gray-600 mb-2">
                    Drag and drop your session plan here, or click to browse
                  </p>
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleUploadFile}
                    className="hidden"
                    id="file-upload"
                  />
                  <Label htmlFor="file-upload" className="cursor-pointer">
                    <Button variant="outline" asChild>
                      <span>Choose File</span>
                    </Button>
                  </Label>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog
            open={showAddClassDialog}
            onOpenChange={setShowAddClassDialog}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Class
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Class</DialogTitle>
                <DialogDescription>
                  Fill in the details to add a new class to the timetable
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Class Title *</Label>
                  <Input
                    id="title"
                    value={newClassForm.title}
                    onChange={(e) =>
                      setNewClassForm((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    placeholder="Enter class title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qualification">Qualification *</Label>
                  <Select
                    value={newClassForm.qualification}
                    onValueChange={(value) => {
                      setNewClassForm((prev) => ({
                        ...prev,
                        qualification: value,
                      }));
                      const selected = qualifications.find(
                        (q) => q.title === value
                      );
                      setSelectedQualificationId(selected?.id ?? null);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select qualification" />
                    </SelectTrigger>
                    <SelectContent>
                      {qualifications.map((qual) => (
                        <SelectItem key={qual.id} value={qual.title}>
                          {qual.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Cohort/Intake</Label>
                  <Select
                    value={selectedCohort}
                    onValueChange={setSelectedCohort}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select cohort" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Cohorts">All Cohorts</SelectItem>
                      {cohorts.map((cohort) => (
                        <SelectItem key={cohort.id} value={cohort.code}>
                          {cohort.code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="campus">Campus *</Label>
                  <Select
                    value={newClassForm.campus}
                    onValueChange={(value) =>
                      setNewClassForm((prev) => ({ ...prev, campus: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select campus" />
                    </SelectTrigger>
                    <SelectContent>
                      {campuses.map((campus) => (
                        <SelectItem key={campus.id} value={campus.name}>
                          {campus.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit Code</Label>
                  <Select
                    value={newClassForm.unit}
                    onValueChange={(value) =>
                      setNewClassForm((prev) => ({ ...prev, unit: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          unitsLoading ? "Loading units..." : "Select unit"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {units.map((unit) => (
                        <SelectItem key={unit.id} value={unit.code}>
                          {unit.code} - {unit.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="trainer">Trainer</Label>
                  <Select
                    value={newClassForm.trainer}
                    onValueChange={(value) =>
                      setNewClassForm((prev) => ({ ...prev, trainer: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select trainer" />
                    </SelectTrigger>
                    <SelectContent>
                      {trainers.map((trainer) => (
                        <SelectItem key={trainer} value={trainer}>
                          {trainer}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="room">Room</Label>
                  <Select
                    value={newClassForm.room}
                    onValueChange={(value) =>
                      setNewClassForm((prev) => ({ ...prev, room: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select room" />
                    </SelectTrigger>
                    <SelectContent>
                      {rooms.map((room) => (
                        <SelectItem key={room} value={room}>
                          {room}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Class Type</Label>
                  <Select
                    value={newClassForm.type}
                    onValueChange={(
                      value: "lecture" | "practical" | "assessment" | "workshop"
                    ) => setNewClassForm((prev) => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lecture">Lecture</SelectItem>
                      <SelectItem value="practical">Practical</SelectItem>
                      <SelectItem value="assessment">Assessment</SelectItem>
                      <SelectItem value="workshop">Workshop</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={newClassForm.startTime}
                    onChange={(e) =>
                      setNewClassForm((prev) => ({
                        ...prev,
                        startTime: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={newClassForm.duration}
                    onChange={(e) =>
                      setNewClassForm((prev) => ({
                        ...prev,
                        duration: Number.parseInt(e.target.value) || 60,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="students">Number of Students</Label>
                  <Input
                    id="students"
                    type="number"
                    value={newClassForm.students}
                    onChange={(e) =>
                      setNewClassForm((prev) => ({
                        ...prev,
                        students: Number.parseInt(e.target.value) || 0,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newClassForm.description}
                    onChange={(e) =>
                      setNewClassForm((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Enter class description"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowAddClassDialog(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddClass}>Add Class</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Classes</p>
                <p className="text-2xl font-bold">{filteredClasses.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Qualification</p>
                <p className="text-lg font-semibold">{selectedQualification}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <School className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Cohort</p>
                <p className="text-lg font-semibold">{selectedCohort}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Home className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Campus</p>
                <p className="text-lg font-semibold">{selectedCampus}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Qualification */}
            <div className="space-y-2">
              <Label>Qualification</Label>
              <Select
                value={selectedQualification}
                onValueChange={(value) => {
                  setSelectedQualification(value);
                  const selected = qualifications.find(
                    (q) => q.title === value
                  );
                  setSelectedQualificationId(selected?.id ?? null);
                  setSelectedCohort("All Cohorts"); // reset cohort
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select qualification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Qualifications">
                    All Qualifications
                  </SelectItem>
                  {qualifications.map((qual) => (
                    <SelectItem key={qual.id} value={qual.title}>
                      {qual.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Cohort - visible only if a qualification is selected */}
            {selectedQualification !== "All Qualifications" && (
              <div className="space-y-2">
                <Label>Cohort/Intake</Label>
                <Select
                  value={selectedCohort}
                  onValueChange={setSelectedCohort}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select cohort" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Cohorts">All Cohorts</SelectItem>
                    {cohorts.map((cohort) => (
                      <SelectItem key={cohort.id} value={cohort.code}>
                        {cohort.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Delivery Type */}
            <div className="space-y-2">
              <Label>Delivery Type</Label>
              <Select
                defaultValue="On Campus"
                value={deliveryType}
                onValueChange={(value) => {
                  setDeliveryType(value);
                  if (value === "Online") {
                    setSelectedCampus("All Campuses");
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="On Campus">On Campus</SelectItem>
                  <SelectItem value="Online">Online</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Campus - only if delivery type is On Campus */}
            {deliveryType !== "Online" && (
              <div className="space-y-2">
                <Label>Campus</Label>
                <Select
                  value={selectedCampus}
                  onValueChange={setSelectedCampus}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Campuses">All Campuses</SelectItem>
                    {campuses.map((campus) => (
                      <SelectItem key={campus.id} value={campus.name}>
                        {campus.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Calendar */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    view === "weekly"
                      ? navigateWeek("prev")
                      : navigateMonth("prev")
                  }
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <h3 className="text-lg font-semibold">
                  {currentDate.toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                    ...(view === "weekly" && { day: "numeric" }),
                  })}
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    view === "weekly"
                      ? navigateWeek("next")
                      : navigateMonth("next")
                  }
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <Tabs
              value={view}
              onValueChange={(value: string) =>
                setView(value as "weekly" | "monthly" | "cohort")
              }
            >
              <TabsList>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                {/* <TabsTrigger value="cohort">Cohort</TabsTrigger> */}
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>{renderCalendarGrid()}</CardContent>
      </Card>

      {/* Day Details Dialog */}
      <Dialog open={!!selectedDay} onOpenChange={() => setSelectedDay(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Classes for{" "}
              {selectedDay &&
                new Date(selectedDay + "T00:00:00").toLocaleDateString(
                  "en-US",
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
            </DialogTitle>
            <DialogDescription>
              {selectedDayClasses.length}{" "}
              {selectedDayClasses.length === 1 ? "class" : "classes"} scheduled
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedDayClasses.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No classes scheduled for this day</p>
                <Button
                  className="mt-4"
                  onClick={() => {
                    setSelectedDate(selectedDay || "");
                    setSelectedDay(null);
                    setShowAddClassDialog(true);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Class
                </Button>
              </div>
            ) : (
              selectedDayClasses.map((cls) => (
                <Card key={cls.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-lg">{cls.title}</h4>
                        <Badge variant="outline" className="mt-1">
                          {cls.type}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteClass(cls.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-blue-600" />
                        <span>{cls.qualification}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <School className="w-4 h-4 text-purple-600" />
                        <span>{cls.cohort}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Home className="w-4 h-4 text-orange-600" />
                        <span>{cls.campus}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-green-600" />
                        <span>{cls.unit}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-indigo-600" />
                        <span>{cls.trainer}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-red-600" />
                        <span>{cls.room}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-600" />
                        <span>
                          {cls.startTime} - {cls.endTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-teal-600" />
                        <span>{cls.students} students</span>
                      </div>
                    </div>
                    {cls.description && (
                      <div className="mt-3 p-3 bg-gray-50 rounded">
                        <p className="text-sm text-gray-700">
                          {cls.description}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
