"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { UserRole } from "@/lib/auth"

interface RoleCardProps {
  role: UserRole
  title: string
  description: string
  icon: React.ReactNode
  isSelected: boolean
  onClick: () => void
}

const roleColors = {
  student: "hover:bg-student-secondary border-student-primary/20 hover:border-student-primary/40",
  faculty: "hover:bg-faculty-secondary border-faculty-primary/20 hover:border-faculty-primary/40",
  hod: "hover:bg-admin-secondary border-admin-primary/20 hover:border-admin-primary/40",
  principal: "hover:bg-admin-secondary border-admin-primary/20 hover:border-admin-primary/40",
}

const selectedColors = {
  student: "bg-student-secondary border-student-primary ring-2 ring-student-primary/20",
  faculty: "bg-faculty-secondary border-faculty-primary ring-2 ring-faculty-primary/20",
  hod: "bg-admin-secondary border-admin-primary ring-2 ring-admin-primary/20",
  principal: "bg-admin-secondary border-admin-primary ring-2 ring-admin-primary/20",
}

export function RoleCard({ role, title, description, icon, isSelected, onClick }: RoleCardProps) {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-200 transform hover:scale-105",
        roleColors[role],
        isSelected && selectedColors[role],
      )}
      onClick={onClick}
    >
      <CardContent className="p-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-full bg-background/50">{icon}</div>
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
