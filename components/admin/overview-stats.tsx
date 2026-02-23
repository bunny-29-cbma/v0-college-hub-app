"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Users, BookOpen, TrendingUp, Award } from "lucide-react"

interface OverviewStatsProps {
  scope: "department" | "campus"
  department?: string
}

export function OverviewStats({ scope, department }: OverviewStatsProps) {
  // Mock data - in real app, this would come from API based on scope
  const stats = {
    department: {
      totalStudents: 120,
      totalFaculty: 8,
      avgAttendance: 87,
      syllabusProgress: 72,
      departments: [{ name: "Computer Science", students: 120, faculty: 8, attendance: 87, syllabus: 72 }],
    },
    campus: {
      totalStudents: 850,
      totalFaculty: 45,
      avgAttendance: 85,
      syllabusProgress: 68,
      departments: [
        { name: "Computer Science", students: 120, faculty: 8, attendance: 87, syllabus: 72 },
        { name: "Electronics", students: 95, faculty: 6, attendance: 82, syllabus: 65 },
        { name: "Mechanical", students: 110, faculty: 7, attendance: 88, syllabus: 70 },
        { name: "Civil", students: 85, faculty: 5, attendance: 83, syllabus: 68 },
        { name: "Mathematics", students: 75, faculty: 4, attendance: 90, syllabus: 75 },
        { name: "Physics", students: 65, faculty: 3, attendance: 85, syllabus: 70 },
        { name: "Chemistry", students: 70, faculty: 4, attendance: 86, syllabus: 72 },
        { name: "English", students: 130, faculty: 8, attendance: 84, syllabus: 65 },
      ],
    },
  }

  const currentStats = stats[scope]
  const title = scope === "department" ? `${department} Department Overview` : "Campus Overview"

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-admin-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-admin-primary/10">
                <Users className="h-6 w-6 text-admin-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">{currentStats.totalStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-admin-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-admin-primary/10">
                <Award className="h-6 w-6 text-admin-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Faculty</p>
                <p className="text-2xl font-bold">{currentStats.totalFaculty}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-admin-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-100">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Attendance</p>
                <p className="text-2xl font-bold">{currentStats.avgAttendance}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-admin-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-blue-100">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Syllabus Progress</p>
                <p className="text-2xl font-bold">{currentStats.syllabusProgress}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-admin-primary/20">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            {scope === "department"
              ? "Department-specific performance metrics"
              : "Campus-wide performance across all departments"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentStats.departments.map((dept, index) => (
              <div key={index} className="p-4 border rounded-lg bg-card/50">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">{dept.name}</h4>
                  <div className="flex gap-2">
                    <Badge variant="secondary">{dept.students} students</Badge>
                    <Badge variant="outline">{dept.faculty} faculty</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Attendance</span>
                      <span>{dept.attendance}%</span>
                    </div>
                    <Progress value={dept.attendance} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Syllabus Progress</span>
                      <span>{dept.syllabus}%</span>
                    </div>
                    <Progress value={dept.syllabus} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
