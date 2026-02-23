"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle, Clock } from "lucide-react"

interface LeaveRequest {
  id: string
  facultyName: string
  employeeId: string
  department: string
  type: string
  startDate: string
  endDate: string
  reason: string
  status: "pending" | "approved" | "rejected"
  appliedDate: string
  rejectionReason?: string
}

interface LeaveRequestsProps {
  userRole: "hod" | "principal"
  department?: string
}

export function LeaveRequests({ userRole, department }: LeaveRequestsProps) {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    {
      id: "1",
      facultyName: "Dr. Jane Smith",
      employeeId: "FAC001",
      department: "Computer Science",
      type: "Personal Leave",
      startDate: "2024-01-20",
      endDate: "2024-01-22",
      reason: "Family function",
      status: "pending",
      appliedDate: "2024-01-12",
    },
    {
      id: "2",
      facultyName: "Prof. Mike Johnson",
      employeeId: "FAC002",
      department: "Computer Science",
      type: "Sick Leave",
      startDate: "2024-01-25",
      endDate: "2024-01-26",
      reason: "Medical treatment",
      status: "pending",
      appliedDate: "2024-01-14",
    },
    {
      id: "3",
      facultyName: "Dr. Sarah Wilson",
      employeeId: "FAC003",
      department: "Electronics",
      type: "Conference Leave",
      startDate: "2024-02-01",
      endDate: "2024-02-03",
      reason: "Attending IEEE conference",
      status: "approved",
      appliedDate: "2024-01-10",
    },
  ])

  const [selectedRequest, setSelectedRequest] = useState<string | null>(null)
  const [rejectionReason, setRejectionReason] = useState("")
  const [showRejectionForm, setShowRejectionForm] = useState(false)

  // Filter requests based on user role
  const filteredRequests = leaveRequests.filter((request) => {
    if (userRole === "hod") {
      return request.department === department
    }
    return true // Principal sees all requests
  })

  const handleApprove = (requestId: string) => {
    setLeaveRequests(
      leaveRequests.map((request) => (request.id === requestId ? { ...request, status: "approved" } : request)),
    )
  }

  const handleReject = (requestId: string) => {
    if (rejectionReason.trim()) {
      setLeaveRequests(
        leaveRequests.map((request) =>
          request.id === requestId ? { ...request, status: "rejected", rejectionReason: rejectionReason } : request,
        ),
      )
      setRejectionReason("")
      setShowRejectionForm(false)
      setSelectedRequest(null)
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

  const pendingCount = filteredRequests.filter((req) => req.status === "pending").length

  return (
    <div className="space-y-6">
      <Card className="border-admin-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-admin-primary" />
                Leave Requests
                {pendingCount > 0 && (
                  <Badge className="bg-yellow-100 text-yellow-800 ml-2">{pendingCount} pending</Badge>
                )}
              </CardTitle>
              <CardDescription>
                {userRole === "hod"
                  ? `Manage leave requests for ${department} department`
                  : "Manage leave requests from all HODs"}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredRequests.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No leave requests found</div>
          ) : (
            filteredRequests.map((request) => (
              <div key={request.id} className="p-4 border rounded-lg bg-card/50">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium">
                      {request.facultyName} ({request.employeeId})
                    </h4>
                    <p className="text-sm text-muted-foreground">{request.department} Department</p>
                  </div>
                  <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-sm font-medium">Leave Type</p>
                    <p className="text-sm text-muted-foreground">{request.type}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Duration</p>
                    <p className="text-sm text-muted-foreground">
                      {request.startDate} to {request.endDate}
                    </p>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-sm font-medium">Reason</p>
                  <p className="text-sm text-muted-foreground">{request.reason}</p>
                </div>

                {request.rejectionReason && (
                  <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm font-medium text-red-800">Rejection Reason</p>
                    <p className="text-sm text-red-700">{request.rejectionReason}</p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">Applied on: {request.appliedDate}</p>

                  {request.status === "pending" && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleApprove(request.id)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          setSelectedRequest(request.id)
                          setShowRejectionForm(true)
                        }}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  )}
                </div>

                {/* Rejection Form */}
                {showRejectionForm && selectedRequest === request.id && (
                  <div className="mt-4 p-4 border rounded-lg bg-muted/50">
                    <div className="space-y-3">
                      <Label htmlFor="rejection-reason">Reason for Rejection</Label>
                      <Textarea
                        id="rejection-reason"
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        placeholder="Please provide a reason for rejecting this leave request"
                        rows={3}
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleReject(request.id)}
                          disabled={!rejectionReason.trim()}
                        >
                          Confirm Rejection
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setShowRejectionForm(false)
                            setSelectedRequest(null)
                            setRejectionReason("")
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}
