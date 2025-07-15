"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Badge } from "../ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { DatePickerWithRange } from "../ui/date-range-picker"
import {
  Download,
  FileText,
  BarChart3,
  Calendar,
  Users,
  MapPin,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"

const reportTemplates = [
  {
    id: 1,
    name: "ASQA Compliance Report",
    description: "Complete training delivery report for ASQA audits",
    type: "compliance",
    format: ["PDF", "Excel"],
    frequency: "Monthly",
    lastGenerated: "2024-01-15",
  },
  {
    id: 2,
    name: "Trainer Utilization Report",
    description: "Trainer workload and availability analysis",
    type: "utilization",
    format: ["PDF", "Excel"],
    frequency: "Weekly",
    lastGenerated: "2024-01-20",
  },
  {
    id: 3,
    name: "Room Occupancy Report",
    description: "Room usage and capacity optimization",
    type: "occupancy",
    format: ["PDF", "Excel"],
    frequency: "Monthly",
    lastGenerated: "2024-01-10",
  },
  {
    id: 4,
    name: "Class Schedule Summary",
    description: "Complete timetable overview for stakeholders",
    type: "schedule",
    format: ["PDF"],
    frequency: "Term",
    lastGenerated: "2024-01-01",
  },
]

const complianceMetrics = [
  {
    metric: "Training Hours Delivered",
    value: "2,847",
    target: "2,800",
    status: "compliant",
    change: "+1.7%",
  },
  {
    metric: "Trainer Qualifications",
    value: "24/24",
    target: "100%",
    status: "compliant",
    change: "0%",
  },
  {
    metric: "Class Size Compliance",
    value: "98.5%",
    target: "95%",
    status: "compliant",
    change: "+2.1%",
  },
  {
    metric: "Resource Availability",
    value: "94.2%",
    target: "90%",
    status: "compliant",
    change: "+1.3%",
  },
]

const utilizationData = [
  {
    resource: "John Smith",
    type: "Trainer",
    utilization: 85,
    capacity: 40,
    efficiency: "High",
  },
  {
    resource: "Sarah Johnson",
    type: "Trainer",
    utilization: 72,
    capacity: 35,
    efficiency: "Good",
  },
  {
    resource: "Room A1",
    type: "Room",
    utilization: 78,
    capacity: 8,
    efficiency: "Good",
  },
  {
    resource: "Computer Lab B2",
    type: "Room",
    utilization: 92,
    capacity: 8,
    efficiency: "High",
  },
]

export function ReportsSection() {
  const [selectedReport, setSelectedReport] = useState<string>("")
  const [dateRange, setDateRange] = useState<any>(null)
  const [reportFormat, setReportFormat] = useState<string>("pdf")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant":
        return "bg-green-100 text-green-800 border-green-200"
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "non-compliant":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getEfficiencyColor = (efficiency: string) => {
    switch (efficiency) {
      case "High":
        return "text-green-600"
      case "Good":
        return "text-blue-600"
      case "Low":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const generateReport = () => {
    // Simulate report generation
    console.log("Generating report:", selectedReport, "Format:", reportFormat, "Date Range:", dateRange)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Reports & Analytics</CardTitle>
              <CardDescription>Generate compliance reports and analyze performance metrics</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics Dashboard
              </Button>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Quick Export
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="generate" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="generate">Generate Reports</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="utilization">Utilization</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Report Templates */}
            <Card>
              <CardHeader>
                <CardTitle>Available Reports</CardTitle>
                <CardDescription>Select a report template to generate</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {reportTemplates.map((report) => (
                  <div
                    key={report.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      selectedReport === report.id.toString() ? "border-blue-500 bg-blue-50" : "border-gray-200"
                    }`}
                    onClick={() => setSelectedReport(report.id.toString())}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium">{report.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                      </div>
                      <FileText className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{report.frequency}</Badge>
                        <span className="text-gray-500">
                          Last: {new Date(report.lastGenerated).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex space-x-1">
                        {report.format.map((fmt) => (
                          <Badge key={fmt} variant="secondary" className="text-xs">
                            {fmt}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Report Configuration */}
            <Card>
              <CardHeader>
                <CardTitle>Report Configuration</CardTitle>
                <CardDescription>Configure report parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="report-select">Report Template</Label>
                  <Select value={selectedReport} onValueChange={setSelectedReport}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a report template" />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTemplates.map((report) => (
                        <SelectItem key={report.id} value={report.id.toString()}>
                          {report.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Date Range</Label>
                  <DatePickerWithRange date={dateRange} setDate={setDateRange} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="format-select">Export Format</Label>
                  <Select value={reportFormat} onValueChange={setReportFormat}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF Document</SelectItem>
                      <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                      <SelectItem value="csv">CSV File</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Recipients (Optional)</Label>
                  <Input id="email" placeholder="Enter email addresses separated by commas" />
                </div>

                <Button className="w-full" onClick={generateReport} disabled={!selectedReport}>
                  <Download className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>ASQA Compliance Metrics</CardTitle>
              <CardDescription>Key compliance indicators for regulatory requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {complianceMetrics.map((metric, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{metric.metric}</h4>
                      <Badge className={getStatusColor(metric.status)}>
                        {metric.status === "compliant" ? (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        ) : (
                          <AlertTriangle className="h-3 w-3 mr-1" />
                        )}
                        {metric.status}
                      </Badge>
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="text-2xl font-bold">{metric.value}</div>
                        <div className="text-sm text-gray-500">Target: {metric.target}</div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-sm font-medium ${
                            metric.change.startsWith("+") ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {metric.change}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="utilization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resource Utilization</CardTitle>
              <CardDescription>Trainer and room utilization analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {utilizationData.map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        {item.type === "Trainer" ? (
                          <Users className="h-5 w-5 text-blue-600" />
                        ) : (
                          <MapPin className="h-5 w-5 text-green-600" />
                        )}
                        <div>
                          <h4 className="font-medium">{item.resource}</h4>
                          <p className="text-sm text-gray-500">{item.type}</p>
                        </div>
                      </div>
                      <Badge className={`${getEfficiencyColor(item.efficiency)} bg-transparent border-current`}>
                        {item.efficiency} Efficiency
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Utilization</span>
                        <span className="font-medium">{item.utilization}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            item.utilization >= 80
                              ? "bg-green-500"
                              : item.utilization >= 60
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                          style={{ width: `${item.utilization}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Capacity: {item.capacity} hrs/week</span>
                        <span>Used: {Math.round((item.capacity * item.utilization) / 100)} hrs</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Classes</p>
                    <p className="text-2xl font-bold">89</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +12% from last month
                    </p>
                  </div>
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Class Size</p>
                    <p className="text-2xl font-bold">22.5</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +5% from last month
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
                    <p className="text-sm font-medium text-gray-600">Room Utilization</p>
                    <p className="text-2xl font-bold">78%</p>
                    <p className="text-xs text-yellow-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      -2% from last month
                    </p>
                  </div>
                  <MapPin className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
              <CardDescription>Key performance indicators over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-medium">Class Completion Rate</h4>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "94%" }}></div>
                      </div>
                      <span className="text-sm font-medium">94%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Student Satisfaction</h4>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: "87%" }}></div>
                      </div>
                      <span className="text-sm font-medium">87%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Trainer Efficiency</h4>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: "91%" }}></div>
                      </div>
                      <span className="text-sm font-medium">91%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Resource Optimization</h4>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-orange-500 h-2 rounded-full" style={{ width: "78%" }}></div>
                      </div>
                      <span className="text-sm font-medium">78%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
