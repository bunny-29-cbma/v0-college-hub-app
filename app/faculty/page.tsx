"use client"

import { RouteGuard } from "@/components/route-guard"
import { useAuth } from "@/contexts/auth-context"
import { DashboardHeader } from "@/components/dashboard-header"
import { SyllabusManagement } from "@/components/faculty/syllabus-management"
import { AttendanceManagement } from "@/components/faculty/attendance-management"
import { LeaveManagement } from "@/components/faculty/leave-management"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FacultyDashboard() {
  const { user } = useAuth()

  return (
    <RouteGuard allowedRoles={["faculty"]}>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-faculty-secondary/20">
        <DashboardHeader />

        <main className="container mx-auto px-4 py-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-balance">Welcome back, {user?.name}!</h2>
            <p className="text-muted-foreground">
              {user?.employeeId && `Employee ID: ${user.employeeId}`} • {user?.department} Department
            </p>
          </div>

          <Tabs defaultValue="syllabus" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 max-w-lg">
              <TabsTrigger
                value="syllabus"
                className="data-[state=active]:bg-faculty-primary data-[state=active]:text-white"
              >
                Syllabus
              </TabsTrigger>
              <TabsTrigger
                value="attendance"
                className="data-[state=active]:bg-faculty-primary data-[state=active]:text-white"
              >
                Attendance
              </TabsTrigger>
              <TabsTrigger
                value="leave"
                className="data-[state=active]:bg-faculty-primary data-[state=active]:text-white"
              >
                Leave
              </TabsTrigger>
            </TabsList>

            <TabsContent value="syllabus">
              <SyllabusManagement />
            </TabsContent>

            <TabsContent value="attendance">
              <AttendanceManagement />
            </TabsContent>

            <TabsContent value="leave">
              <LeaveManagement />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </RouteGuard>
  )
}
