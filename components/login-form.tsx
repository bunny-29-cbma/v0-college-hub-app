"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, ArrowLeft } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import type { UserRole } from "@/lib/auth"
import { cn } from "@/lib/utils"

interface LoginFormProps {
  role: UserRole
  onBack: () => void
}

const roleStyles = {
  student: "border-student-primary/20 bg-student-secondary/50",
  faculty: "border-faculty-primary/20 bg-faculty-secondary/50",
  hod: "border-admin-primary/20 bg-admin-secondary/50",
  principal: "border-admin-primary/20 bg-admin-secondary/50",
}

const buttonStyles = {
  student: "bg-student-primary hover:bg-student-primary/90",
  faculty: "bg-faculty-primary hover:bg-faculty-primary/90",
  hod: "bg-admin-primary hover:bg-admin-primary/90",
  principal: "bg-admin-primary hover:bg-admin-primary/90",
}

export function LoginForm({ role, onBack }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login, isLoading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const success = await login(email, password, role)
    if (!success) {
      setError("Invalid credentials. Please check your email, password, and selected role.")
    }
  }

  const getRoleTitle = (role: UserRole) => {
    switch (role) {
      case "student":
        return "Student Login"
      case "faculty":
        return "Faculty Login"
      case "hod":
        return "HOD Login"
      case "principal":
        return "Principal Login"
    }
  }

  const getPlaceholderCredentials = (role: UserRole) => {
    switch (role) {
      case "student":
        return { email: "student@college.edu", password: "student123" }
      case "faculty":
        return { email: "faculty@college.edu", password: "faculty123" }
      case "hod":
        return { email: "hod@college.edu", password: "hod123" }
      case "principal":
        return { email: "principal@college.edu", password: "principal123" }
    }
  }

  const placeholders = getPlaceholderCredentials(role)

  return (
    <Card className={cn("w-full max-w-md mx-auto", roleStyles[role])}>
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onBack} className="p-1 h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <CardTitle className="text-2xl font-bold">{getRoleTitle(role)}</CardTitle>
        </div>
        <CardDescription>Enter your credentials to access your dashboard</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder={placeholders.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder={placeholders.password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className={cn("w-full text-white", buttonStyles[role])} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>

          <div className="text-xs text-muted-foreground text-center">
            Demo credentials: {placeholders.email} / {placeholders.password}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
