"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Mail, Plus, Send } from "lucide-react"

interface LeaveRequest {
  id: string
  type: string
  startDate: string
  endDate: string
  reason: string
  status: "pending" | "approved" | "rejected"
  appliedDate: string
}

export function LeaveManagement() {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    {
      id: "1",
      type: "Sick Leave",
      startDate: "2024-01-15",
      endDate: "2024-01-16",
      reason: "Medical appointment and recovery",
      status: "approved",
      appliedDate: "2024-01-10",
    },
    {
      id: "2",
      type: "Personal Leave",
      startDate: "2024-01-20",
      endDate: "2024-01-22",
      reason: "Family function",
      status: "pending",
      appliedDate: "2024-01-12",
    },
  ])

  const [showForm, setShowForm] = useState(false)
  const [newLeave, setNewLeave] = useState({
    type: "",
    startDate: "",
    endDate: "",
    reason: "",
  })

  const [emailContent, setEmailContent] = useState({
    subject: "",
    message: "",
  })

  const [showEmailForm, setShowEmailForm] = useState(false)

  const handleSubmitLeave = () => {
    if (newLeave.type && newLeave.startDate && newLeave.endDate && newLeave.reason) {
      const leave: LeaveRequest = {
        id: Date.now().toString(),
        ...newLeave,
        status: "pending",
        appliedDate: new Date().toISOString().split("T")[0],
      }
      setLeaveRequests([...leaveRequests, leave])
      setNewLeave({ type: "", startDate: "", endDate: "", reason: "" })
      setShowForm(false)
    }
  }

  const handleSendEmail = () => {
    if (emailContent.subject && emailContent.message) {
      // Simulate sending email
      alert("Email sent to HOD successfully!")
      setEmailContent({ subject: "", message: "" })
      setShowEmailForm(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  const hodEmail = "hod@college.edu"

  return (
    <div className="space-y-6">
      {/* HOD Contact Info */}
      <Card className="border-faculty-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-faculty-primary/10">
                <Mail className="h-6 w-6 text-faculty-primary" />
              </div>
              <div>
                <p className="font-medium">HOD Contact</p>
                <p className="text-sm text-muted-foreground">{hodEmail}</p>
              </div>
            </div>
            <Button
              onClick={() => setShowEmailForm(true)}
              variant="outline"
              className="border-faculty-primary text-faculty-primary hover:bg-faculty-primary hover:text-white"
            >
              <Send className="h-4 w-4 mr-2" />
              Send Email
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Email Form */}
      {showEmailForm && (
        <Card className="border-faculty-primary/20">
          <CardHeader>
            <CardTitle>Send Email to HOD</CardTitle>
            <CardDescription>Compose and send an email directly to your HOD</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email-subject">Subject</Label>
              <Input
                id="email-subject"
                value={emailContent.subject}
                onChange={(e) => setEmailContent({ ...emailContent, subject: e.target.value })}
                placeholder="Enter email subject"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-message">Message</Label>
              <Textarea
                id="email-message"
                value={emailContent.message}
                onChange={(e) => setEmailContent({ ...emailContent, message: e.target.value })}
                placeholder="Enter your message"
                rows={4}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSendEmail} className="bg-faculty-primary hover:bg-faculty-primary/90 text-white">
                <Send className="h-4 w-4 mr-2" />
                Send Email
              </Button>
              <Button onClick={() => setShowEmailForm(false)} variant="outline">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Leave Management */}
      <Card className="border-faculty-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-faculty-primary" />
                Leave Management
              </CardTitle>
              <CardDescription>Apply for leave and track your requests</CardDescription>
            </div>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-faculty-primary hover:bg-faculty-primary/90 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Apply Leave
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Leave Application Form */}
          {showForm && (
            <div className="p-4 border rounded-lg bg-faculty-secondary/50">
              <h4 className="font-medium mb-4">Apply for Leave</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="leave-type">Leave Type</Label>
                  <Select value={newLeave.type} onValueChange={(value) => setNewLeave({ ...newLeave, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select leave type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                      <SelectItem value="Personal Leave">Personal Leave</SelectItem>
                      <SelectItem value="Emergency Leave">Emergency Leave</SelectItem>
                      <SelectItem value="Vacation Leave">Vacation Leave</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={newLeave.startDate}
                    onChange={(e) => setNewLeave({ ...newLeave, startDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="end-date">End Date</Label>
                  <Input
                    id="end-date"
                    type="date"
                    value={newLeave.endDate}
                    onChange={(e) => setNewLeave({ ...newLeave, endDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <Label htmlFor="reason">Reason</Label>
                <Textarea
                  id="reason"
                  value={newLeave.reason}
                  onChange={(e) => setNewLeave({ ...newLeave, reason: e.target.value })}
                  placeholder="Enter reason for leave"
                  rows={3}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleSubmitLeave}
                  className="bg-faculty-primary hover:bg-faculty-primary/90 text-white"
                >
                  Submit Application
                </Button>
                <Button onClick={() => setShowForm(false)} variant="outline">
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Leave Requests List */}
          <div className="space-y-3">
            {leaveRequests.map((leave) => (
              <div key={leave.id} className="p-4 border rounded-lg bg-card/50">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium">{leave.type}</h4>
                    <p className="text-sm text-muted-foreground">
                      {leave.startDate} to {leave.endDate}
                    </p>
                  </div>
                  <Badge className={getStatusColor(leave.status)}>{leave.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{leave.reason}</p>
                <p className="text-xs text-muted-foreground">Applied on: {leave.appliedDate}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
