"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, UserCheck, UserX, BarChart3, Calendar } from "lucide-react"

interface Student {
  id: string
  name: string
  studentId: string
  status: "present" | "absent" | "late"
  attendancePercentage: number
}

export function AttendanceManagement() {
  const [selectedClass, setSelectedClass] = useState("CS301")
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])

  const [students, setStudents] = useState<Student[]>([
    { id: "1", name: "John Doe", studentId: "CS2024001", status: "present", attendancePercentage: 92 },
    { id: "2", name: "Jane Smith", studentId: "CS2024002", status: "present", attendancePercentage: 88 },
    { id: "3", name: "Mike Johnson", studentId: "CS2024003", status: "absent", attendancePercentage: 75 },
    { id: "4", name: "Sarah Wilson", studentId: "CS2024004", status: "late", attendancePercentage: 85 },
    { id: "5", name: "David Brown", studentId: "CS2024005", status: "present", attendancePercentage: 95 },
  ])

  const presentCount = students.filter((s) => s.status === "present").length
  const absentCount = students.filter((s) => s.status === "absent").length
  const lateCount = students.filter((s) => s.status === "late").length
  const totalStudents = students.length
  const attendanceRate = ((presentCount + lateCount) / totalStudents) * 100

  const handleStatusChange = (studentId: string, newStatus: "present" | "absent" | "late") => {
    setStudents(students.map((student) => (student.id === studentId ? { ...student, status: newStatus } : student)))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800"
      case "late":
        return "bg-yellow-100 text-yellow-800"
      case "absent":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const weeklyData = [
    { day: "Mon", attendance: 92 },
    { day: "Tue", attendance: 88 },
    { day: "Wed", attendance: 95 },
    { day: "Thu", attendance: 85 },
    { day: "Fri", attendance: 90 },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-faculty-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-100">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Present</p>
                <p className="text-2xl font-bold">{presentCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-faculty-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-red-100">
                <UserX className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Absent</p>
                <p className="text-2xl font-bold">{absentCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-faculty-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-yellow-100">
                <Users className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Late</p>
                <p className="text-2xl font-bold">{lateCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-faculty-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-faculty-primary/10">
                <BarChart3 className="h-6 w-6 text-faculty-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Attendance Rate</p>
                <p className="text-2xl font-bold">{Math.round(attendanceRate)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Management */}
      <Card className="border-faculty-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-faculty-primary" />
            Attendance Management
          </CardTitle>
          <CardDescription>View and manage student attendance</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="today" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger
                value="today"
                className="data-[state=active]:bg-faculty-primary data-[state=active]:text-white"
              >
                Today's Attendance
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="data-[state=active]:bg-faculty-primary data-[state=active]:text-white"
              >
                Weekly Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="today" className="space-y-4">
              <div className="flex gap-4 mb-4">
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CS301">CS301 - Data Structures</SelectItem>
                    <SelectItem value="CS302">CS302 - Database Systems</SelectItem>
                    <SelectItem value="CS303">CS303 - Web Development</SelectItem>
                  </SelectContent>
                </Select>

                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                />
              </div>

              <div className="space-y-3">
                {students.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg bg-card/50">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.studentId}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">Overall: {student.attendancePercentage}%</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(student.status)}>{student.status}</Badge>
                      <Select
                        value={student.status}
                        onValueChange={(value: "present" | "absent" | "late") => handleStatusChange(student.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="present">Present</SelectItem>
                          <SelectItem value="absent">Absent</SelectItem>
                          <SelectItem value="late">Late</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}
              </div>

              <Button className="w-full bg-faculty-primary hover:bg-faculty-primary/90 text-white">
                Save Attendance
              </Button>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Weekly Attendance Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {weeklyData.map((day) => (
                        <div key={day.day} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{day.day}</span>
                          <div className="flex items-center gap-2 flex-1 mx-4">
                            <div className="flex-1 bg-muted rounded-full h-2">
                              <div
                                className="bg-faculty-primary h-2 rounded-full"
                                style={{ width: `${day.attendance}%` }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground w-12 text-right">{day.attendance}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Class Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-faculty-primary">89%</p>
                        <p className="text-sm text-muted-foreground">Average Attendance</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <p className="text-xl font-semibold">95%</p>
                          <p className="text-xs text-muted-foreground">Best Day</p>
                        </div>
                        <div>
                          <p className="text-xl font-semibold">75%</p>
                          <p className="text-xs text-muted-foreground">Lowest Day</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
