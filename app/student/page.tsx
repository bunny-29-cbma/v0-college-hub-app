"use client"

import { RouteGuard } from "@/components/route-guard"
import { useAuth } from "@/contexts/auth-context"
import { DashboardHeader } from "@/components/dashboard-header"
import { AttendanceTracker } from "@/components/student/attendance-tracker"
import { CurriculumOverview } from "@/components/student/curriculum-overview"
import { TaskManagement } from "@/components/student/task-management"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function StudentDashboard() {
  const { user } = useAuth()

  return (
    <RouteGuard allowedRoles={["student"]}>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-student-secondary/20">
        <DashboardHeader />

        <main className="container mx-auto px-4 py-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-balance">Welcome back, {user?.name}!</h2>
            <p className="text-muted-foreground">
              {user?.studentId && `Student ID: ${user.studentId}`} • {user?.department}
            </p>
          </div>

          <Tabs defaultValue="attendance" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger
                value="attendance"
                className="data-[state=active]:bg-student-primary data-[state=active]:text-white"
              >
                Attendance
              </TabsTrigger>
              <TabsTrigger
                value="curriculum"
                className="data-[state=active]:bg-student-primary data-[state=active]:text-white"
              >
                Curriculum
              </TabsTrigger>
            </TabsList>

            <TabsContent value="attendance" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <AttendanceTracker />
                </div>
                <div className="lg:col-span-2">
                  <CurriculumOverview />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="curriculum" className="space-y-6">
              <TaskManagement />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </RouteGuard>
  )
}
