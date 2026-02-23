export interface DatabaseUser {
  id: number
  email: string
  password_hash: string
  name: string
  role: "student" | "faculty" | "hod" | "principal"
  department?: string
  student_id?: string
  employee_id?: string
  created_at: string
  updated_at: string
}

export interface AttendanceRecord {
  id: number
  student_id: number
  subject_id: number
  date: string
  status: "present" | "absent" | "late"
  marked_by: number
  created_at: string
}

export interface SyllabusProgress {
  id: number
  subject_id: number
  topic: string
  description?: string
  progress_percentage: number
  status: "not-started" | "in-progress" | "completed"
  updated_by: number
  updated_at: string
}

export interface Task {
  id: number
  title: string
  description?: string
  category?: string
  student_id: number
  assigned_by?: number
  status: "pending" | "in-progress" | "completed"
  due_date?: string
  created_at: string
  updated_at: string
}

export interface LeaveRequest {
  id: number
  user_id: number
  type: string
  start_date: string
  end_date: string
  reason: string
  status: "pending" | "approved" | "rejected"
  rejection_reason?: string
  approved_by?: number
  created_at: string
  updated_at: string
}

export interface Message {
  id: number
  from_user_id: number
  to_user_id: number
  subject: string
  message: string
  is_read: boolean
  is_starred: boolean
  priority: "low" | "medium" | "high"
  created_at: string
}

// Mock database functions for demonstration
// In a real application, these would connect to an actual database

export const db = {
  // User operations
  async getUserByEmail(email: string): Promise<DatabaseUser | null> {
    // Mock implementation - would query actual database
    const mockUsers: Record<string, DatabaseUser> = {
      "student@college.edu": {
        id: 1,
        email: "student@college.edu",
        password_hash: "$2b$10$demo_hash_student123",
        name: "John Doe",
        role: "student",
        department: "Computer Science",
        student_id: "CS2024001",
        employee_id: undefined,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      "faculty@college.edu": {
        id: 2,
        email: "faculty@college.edu",
        password_hash: "$2b$10$demo_hash_faculty123",
        name: "Dr. Jane Smith",
        role: "faculty",
        department: "Computer Science",
        student_id: undefined,
        employee_id: "FAC001",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      "hod@college.edu": {
        id: 3,
        email: "hod@college.edu",
        password_hash: "$2b$10$demo_hash_hod123",
        name: "Prof. Robert Johnson",
        role: "hod",
        department: "Computer Science",
        student_id: undefined,
        employee_id: "HOD001",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      "principal@college.edu": {
        id: 4,
        email: "principal@college.edu",
        password_hash: "$2b$10$demo_hash_principal123",
        name: "Dr. Mary Wilson",
        role: "principal",
        department: undefined,
        student_id: undefined,
        employee_id: "PRIN001",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    }

    return mockUsers[email] || null
  },

  // Attendance operations
  async getAttendanceByStudent(studentId: number): Promise<AttendanceRecord[]> {
    // Mock implementation
    return []
  },

  async markAttendance(
    studentId: number,
    subjectId: number,
    status: "present" | "absent" | "late",
    markedBy: number,
  ): Promise<void> {
    // Mock implementation
    console.log(`Marking attendance: Student ${studentId}, Subject ${subjectId}, Status ${status}`)
  },

  // Syllabus operations
  async getSyllabusProgress(subjectId: number): Promise<SyllabusProgress[]> {
    // Mock implementation
    return []
  },

  async updateSyllabusProgress(id: number, progressPercentage: number, updatedBy: number): Promise<void> {
    // Mock implementation
    console.log(`Updating syllabus progress: ${id} to ${progressPercentage}%`)
  },

  // Task operations
  async getTasksByStudent(studentId: number): Promise<Task[]> {
    // Mock implementation
    return []
  },

  async createTask(task: Omit<Task, "id" | "created_at" | "updated_at">): Promise<Task> {
    // Mock implementation
    const newTask: Task = {
      ...task,
      id: Date.now(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    return newTask
  },

  // Leave request operations
  async getLeaveRequests(userId?: number, department?: string): Promise<LeaveRequest[]> {
    // Mock implementation
    return []
  },

  async createLeaveRequest(request: Omit<LeaveRequest, "id" | "created_at" | "updated_at">): Promise<LeaveRequest> {
    // Mock implementation
    const newRequest: LeaveRequest = {
      ...request,
      id: Date.now(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    return newRequest
  },

  async updateLeaveRequestStatus(
    id: number,
    status: "approved" | "rejected",
    approvedBy: number,
    rejectionReason?: string,
  ): Promise<void> {
    // Mock implementation
    console.log(`Updating leave request ${id} to ${status}`)
  },

  // Message operations
  async getMessages(userId: number): Promise<Message[]> {
    // Mock implementation
    return []
  },

  async createMessage(message: Omit<Message, "id" | "created_at">): Promise<Message> {
    // Mock implementation
    const newMessage: Message = {
      ...message,
      id: Date.now(),
      created_at: new Date().toISOString(),
    }
    return newMessage
  },

  async markMessageAsRead(messageId: number): Promise<void> {
    // Mock implementation
    console.log(`Marking message ${messageId} as read`)
  },
}
