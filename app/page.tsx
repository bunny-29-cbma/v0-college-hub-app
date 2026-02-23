"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { RoleCard } from "@/components/role-card"
import { LoginForm } from "@/components/login-form"
import type { UserRole } from "@/lib/auth"
import { GraduationCap, Users, Shield, Crown } from "lucide-react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user && !isLoading) {
      // Redirect to appropriate dashboard based on user role
      switch (user.role) {
        case "student":
          router.push("/student")
          break
        case "faculty":
          router.push("/faculty")
          break
        case "hod":
          router.push("/hod")
          break
        case "principal":
          router.push("/principal")
          break
      }
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (user) {
    return null // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        {!selectedRole ? (
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-balance">College Hub</h1>
              <p className="text-xl text-muted-foreground">Smart tools for smarter campus</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <RoleCard
                role="student"
                title="Student"
                description="Access your courses, attendance, and academic progress"
                icon={<GraduationCap className="h-8 w-8 text-student-primary" />}
                isSelected={false}
                onClick={() => setSelectedRole("student")}
              />

              <RoleCard
                role="faculty"
                title="Faculty"
                description="Manage classes, track student progress, and handle administrative tasks"
                icon={<Users className="h-8 w-8 text-faculty-primary" />}
                isSelected={false}
                onClick={() => setSelectedRole("faculty")}
              />

              <RoleCard
                role="hod"
                title="HOD"
                description="Oversee department operations and faculty management"
                icon={<Shield className="h-8 w-8 text-admin-primary" />}
                isSelected={false}
                onClick={() => setSelectedRole("hod")}
              />

              <RoleCard
                role="principal"
                title="Principal"
                description="Complete campus oversight and administrative control"
                icon={<Crown className="h-8 w-8 text-admin-primary" />}
                isSelected={false}
                onClick={() => setSelectedRole("principal")}
              />
            </div>
          </div>
        ) : (
          <LoginForm role={selectedRole} onBack={() => setSelectedRole(null)} />
        )}
      </div>
    </div>
  )
}
