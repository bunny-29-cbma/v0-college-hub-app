"use client"

import type React from "react"

import { useAuth } from "@/contexts/auth-context"
import type { UserRole } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface RouteGuardProps {
  children: React.ReactNode
  allowedRoles: UserRole[]
  redirectTo?: string
}

export function RouteGuard({ children, allowedRoles, redirectTo = "/" }: RouteGuardProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        // User not authenticated, redirect to login
        router.push("/")
        return
      }

      if (!allowedRoles.includes(user.role)) {
        // User doesn't have permission, redirect to their appropriate dashboard
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
          default:
            router.push(redirectTo)
        }
        return
      }
    }
  }, [user, isLoading, allowedRoles, router, redirectTo])

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

  if (!user || !allowedRoles.includes(user.role)) {
    return null // Will redirect via useEffect
  }

  return <>{children}</>
}
