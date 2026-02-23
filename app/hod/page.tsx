"use client"

import { RouteGuard } from "@/components/route-guard"
import { useAuth } from "@/contexts/auth-context"
import { DashboardHeader } from "@/components/dashboard-header"
import { OverviewStats } from "@/components/admin/overview-stats"
import { LeaveRequests } from "@/components/admin/leave-requests"
import { FacultyMessages } from "@/components/admin/faculty-messages"
import { LeaveManagement } from "@/components/faculty/leave-management"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function HODDashboard() {
  const { user } = useAuth()

  return (
    <RouteGuard allowedRoles={["hod"]}>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-admin-secondary/20">
        <DashboardHeader />

        <main className="container mx-auto px-4 py-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-balance">Welcome back, {user?.name}!</h2>
            <p className="text-muted-foreground">
              {user?.employeeId && `Employee ID: ${user.employeeId}`} • HOD, {user?.department} Department
            </p>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 max-w-2xl">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-admin-primary data-[state=active]:text-white"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="leave-requests"
                className="data-[state=active]:bg-admin-primary data-[state=active]:text-white"
              >
                Leave Requests
              </TabsTrigger>
              <TabsTrigger
                value="messages"
                className="data-[state=active]:bg-admin-primary data-[state=active]:text-white"
              >
                Messages
              </TabsTrigger>
              <TabsTrigger
                value="my-leave"
                className="data-[state=active]:bg-admin-primary data-[state=active]:text-white"
              >
                My Leave
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <OverviewStats scope="department" department={user?.department} />
            </TabsContent>

            <TabsContent value="leave-requests">
              <LeaveRequests userRole="hod" department={user?.department} />
            </TabsContent>

            <TabsContent value="messages">
              <FacultyMessages department={user?.department} />
            </TabsContent>

            <TabsContent value="my-leave">
              <LeaveManagement />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </RouteGuard>
  )
}
