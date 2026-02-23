"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Reply, Archive, Star } from "lucide-react"

interface Message {
  id: string
  from: string
  fromEmail: string
  department: string
  subject: string
  message: string
  timestamp: string
  isRead: boolean
  isStarred: boolean
  priority: "low" | "medium" | "high"
}

interface FacultyMessagesProps {
  department?: string
}

export function FacultyMessages({ department }: FacultyMessagesProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      from: "Dr. Jane Smith",
      fromEmail: "jane.smith@college.edu",
      department: "Computer Science",
      subject: "Request for Additional Lab Equipment",
      message:
        "Dear HOD, I would like to request additional computers for the programming lab. The current setup is insufficient for the increasing number of students. Please consider this request for the next budget allocation.",
      timestamp: "2024-01-15 10:30 AM",
      isRead: false,
      isStarred: true,
      priority: "high",
    },
    {
      id: "2",
      from: "Prof. Mike Johnson",
      fromEmail: "mike.johnson@college.edu",
      department: "Computer Science",
      subject: "Course Schedule Conflict",
      message:
        "Hi, I have a scheduling conflict with my Database Systems course. It overlaps with the faculty meeting on Wednesdays. Could we discuss alternative timings?",
      timestamp: "2024-01-14 02:15 PM",
      isRead: true,
      isStarred: false,
      priority: "medium",
    },
    {
      id: "3",
      from: "Dr. Sarah Wilson",
      fromEmail: "sarah.wilson@college.edu",
      department: "Electronics",
      subject: "Conference Presentation Update",
      message:
        "I wanted to update you on my presentation at the IEEE conference. It was well received and I've been invited to collaborate on a research project. I'll share the details in our next meeting.",
      timestamp: "2024-01-13 09:45 AM",
      isRead: true,
      isStarred: false,
      priority: "low",
    },
  ])

  const [selectedMessage, setSelectedMessage] = useState<string | null>(null)
  const [replyText, setReplyText] = useState("")
  const [showReplyForm, setShowReplyForm] = useState(false)

  // Filter messages by department if HOD
  const filteredMessages = department ? messages.filter((msg) => msg.department === department) : messages

  const unreadCount = filteredMessages.filter((msg) => !msg.isRead).length

  const handleMarkAsRead = (messageId: string) => {
    setMessages(messages.map((msg) => (msg.id === messageId ? { ...msg, isRead: true } : msg)))
  }

  const handleToggleStar = (messageId: string) => {
    setMessages(messages.map((msg) => (msg.id === messageId ? { ...msg, isStarred: !msg.isStarred } : msg)))
  }

  const handleSendReply = (messageId: string) => {
    if (replyText.trim()) {
      // In a real app, this would send the reply
      alert("Reply sent successfully!")
      setReplyText("")
      setShowReplyForm(false)
      setSelectedMessage(null)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-green-100 text-green-800"
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-admin-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-admin-primary" />
                Faculty Messages
                {unreadCount > 0 && <Badge className="bg-blue-100 text-blue-800 ml-2">{unreadCount} unread</Badge>}
              </CardTitle>
              <CardDescription>
                {department ? `Messages from ${department} department faculty` : "Messages from all faculty members"}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredMessages.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No messages found</div>
          ) : (
            filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  !message.isRead ? "bg-blue-50 border-blue-200" : "bg-card/50"
                }`}
                onClick={() => handleMarkAsRead(message.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={`font-medium ${!message.isRead ? "font-semibold" : ""}`}>
                        {message.from} ({message.fromEmail})
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        {message.department}
                      </Badge>
                      <Badge className={getPriorityColor(message.priority)}>{message.priority}</Badge>
                    </div>
                    <p className={`text-sm ${!message.isRead ? "font-medium" : "text-muted-foreground"}`}>
                      {message.subject}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleToggleStar(message.id)
                      }}
                      className={message.isStarred ? "text-yellow-500" : "text-muted-foreground"}
                    >
                      <Star className={`h-4 w-4 ${message.isStarred ? "fill-current" : ""}`} />
                    </Button>
                    <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{message.message}</p>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedMessage(message.id)
                      setShowReplyForm(true)
                    }}
                  >
                    <Reply className="h-4 w-4 mr-1" />
                    Reply
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Archive className="h-4 w-4 mr-1" />
                    Archive
                  </Button>
                </div>

                {/* Reply Form */}
                {showReplyForm && selectedMessage === message.id && (
                  <div className="mt-4 p-4 border rounded-lg bg-muted/50">
                    <div className="space-y-3">
                      <Label htmlFor="reply-message">Reply to {message.from}</Label>
                      <Textarea
                        id="reply-message"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Type your reply here..."
                        rows={4}
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleSendReply(message.id)}
                          className="bg-admin-primary hover:bg-admin-primary/90 text-white"
                          disabled={!replyText.trim()}
                        >
                          Send Reply
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setShowReplyForm(false)
                            setSelectedMessage(null)
                            setReplyText("")
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
