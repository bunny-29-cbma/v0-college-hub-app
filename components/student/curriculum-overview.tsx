"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BookOpen, TrendingUp, Calendar } from "lucide-react"

export function CurriculumOverview() {
  const attendancePercentage = 87
  const syllabusProgress = 65

  const subjects = [
    { name: "Data Structures", attendance: 92, syllabus: 70, status: "on-track" },
    { name: "Database Systems", attendance: 85, syllabus: 60, status: "on-track" },
    { name: "Web Development", attendance: 90, syllabus: 75, status: "ahead" },
    { name: "Machine Learning", attendance: 80, syllabus: 55, status: "behind" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ahead":
        return "bg-green-100 text-green-800"
      case "behind":
        return "bg-red-100 text-red-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-student-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-student-primary/10">
                <TrendingUp className="h-6 w-6 text-student-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Overall Attendance</p>
                <p className="text-2xl font-bold">{attendancePercentage}%</p>
                <Progress value={attendancePercentage} className="mt-2 h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-student-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-student-primary/10">
                <BookOpen className="h-6 w-6 text-student-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Syllabus Coverage</p>
                <p className="text-2xl font-bold">{syllabusProgress}%</p>
                <Progress value={syllabusProgress} className="mt-2 h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subject-wise Progress */}
      <Card className="border-student-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-student-primary" />
            Subject Progress
          </CardTitle>
          <CardDescription>Track your attendance and syllabus coverage for each subject</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {subjects.map((subject, index) => (
              <div key={index} className="p-4 rounded-lg border bg-card/50">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">{subject.name}</h4>
                  <Badge className={getStatusColor(subject.status)}>{subject.status.replace("-", " ")}</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Attendance</span>
                      <span>{subject.attendance}%</span>
                    </div>
                    <Progress value={subject.attendance} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Syllabus</span>
                      <span>{subject.syllabus}%</span>
                    </div>
                    <Progress value={subject.syllabus} className="h-2" />
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
