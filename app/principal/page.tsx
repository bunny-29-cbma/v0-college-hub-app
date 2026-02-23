"use client"

import { RouteGuard } from "@/components/route-guard"
import { useAuth } from "@/contexts/auth-context"
import { DashboardHeader } from "@/components/dashboard-header"
import { OverviewStats } from "@/components/admin/overview-stats"
import { LeaveRequests } from "@/components/admin/leave-requests"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Users, Award } from "lucide-react"

export default function PrincipalDashboard() {
  const { user } = useAuth()

  // Mock HOD performance data
  const hodPerformance = [
    { name: "Prof. Robert Johnson", department: "Computer Science", attendance: 87, syllabus: 72, rating: "Excellent" },
    { name: "Dr. Michael Brown", department: "Electronics", attendance: 82, syllabus: 65, rating: "Good" },
    { name: "Prof. Lisa Davis", department: "Mechanical", attendance: 88, syllabus: 70, rating: "Excellent" },
    { name: "Dr. James Wilson", department: "Civil", attendance: 83, syllabus: 68, rating: "Good" },
  ]

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case "Excellent":
        return "bg-green-100 text-green-800"
      case "Good":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  return (
    <RouteGuard allowedRoles={["principal"]}>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-admin-secondary/20">
        <DashboardHeader />

        <main className="container mx-auto px-4 py-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-balance">Welcome back, {user?.name}!</h2>
            <p className="text-muted-foreground">
              {user?.employeeId && `Employee ID: ${user.employeeId}`} • Principal, College Administration
            </p>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 max-w-2xl">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-admin-primary data-[state=active]:text-white"
              >
                Campus Overview
              </TabsTrigger>
              <TabsTrigger
                value="hod-performance"
                className="data-[state=active]:bg-admin-primary data-[state=active]:text-white"
              >
                HOD Performance
              </TabsTrigger>
              <TabsTrigger
                value="leave-requests"
                className="data-[state=active]:bg-admin-primary data-[state=active]:text-white"
              >
                HOD Leave Requests
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="data-[state=active]:bg-admin-primary data-[state=active]:text-white"
              >
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <OverviewStats scope="campus" />
            </TabsContent>

            <TabsContent value="hod-performance">
              <Card className="border-admin-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-admin-primary" />
                    HOD Performance Overview
                  </CardTitle>
                  <CardDescription>Track performance of all department heads</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {hodPerformance.map((hod, index) => (
                      <div key={index} className="p-4 border rounded-lg bg-card/50">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-medium">{hod.name}</h4>
                            <p className="text-sm text-muted-foreground">{hod.department} Department</p>
                          </div>
                          <Badge className={getRatingColor(hod.rating)}>{hod.rating}</Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Dept. Attendance</span>
                              <span>{hod.attendance}%</span>
                            </div>
                            <Progress value={hod.attendance} className="h-2" />
                          </div>

                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Syllabus Progress</span>
                              <span>{hod.syllabus}%</span>
                            </div>
                            <Progress value={hod.syllabus} className="h-2" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="leave-requests">
              <LeaveRequests userRole="principal" />
            </TabsContent>

            <TabsContent value="analytics">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-admin-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-admin-primary" />
                      Campus Performance Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-admin-primary">85%</p>
                        <p className="text-sm text-muted-foreground">Overall Campus Performance</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <p className="text-xl font-semibold">92%</p>
                          <p className="text-xs text-muted-foreground">Best Department</p>
                        </div>
                        <div>
                          <p className="text-xl font-semibold">78%</p>
                          <p className="text-xs text-muted-foreground">Needs Improvement</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-admin-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-admin-primary" />
                      Resource Utilization
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Faculty Utilization</span>
                          <span>89%</span>
                        </div>
                        <Progress value={89} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Infrastructure Usage</span>
                          <span>76%</span>
                        </div>
                        <Progress value={76} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Budget Utilization</span>
                          <span>82%</span>
                        </div>
                        <Progress value={82} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </RouteGuard>
  )
}
