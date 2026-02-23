export type UserRole = "student" | "faculty" | "hod" | "principal"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  department?: string
  studentId?: string
  employeeId?: string
}

export interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role: UserRole) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

// Mock user data for demonstration
export const mockUsers: Record<string, User & { password: string }> = {
  "student@college.edu": {
    id: "1",
    name: "John Doe",
    email: "student@college.edu",
    password: "student123",
    role: "student",
    department: "Computer Science",
    studentId: "CS2024001",
  },
  "faculty@college.edu": {
    id: "2",
    name: "Dr. Jane Smith",
    email: "faculty@college.edu",
    password: "faculty123",
    role: "faculty",
    department: "Computer Science",
    employeeId: "FAC001",
  },
  "hod@college.edu": {
    id: "3",
    name: "Prof. Robert Johnson",
    email: "hod@college.edu",
    password: "hod123",
    role: "hod",
    department: "Computer Science",
    employeeId: "HOD001",
  },
  "principal@college.edu": {
    id: "4",
    name: "Dr. Mary Wilson",
    email: "principal@college.edu",
    password: "principal123",
    role: "principal",
    employeeId: "PRIN001",
  },
}

export const authenticateUser = async (email: string, password: string, role: UserRole): Promise<User | null> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const user = mockUsers[email]
  if (user && user.password === password && user.role === role) {
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  return null
}
