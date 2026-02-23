"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Plus, Edit, Save, X } from "lucide-react"

interface SyllabusItem {
  id: string
  subject: string
  topic: string
  description: string
  progress: number
  lastUpdated: string
  status: "not-started" | "in-progress" | "completed"
}

export function SyllabusManagement() {
  const [syllabusItems, setSyllabusItems] = useState<SyllabusItem[]>([
    {
      id: "1",
      subject: "Data Structures",
      topic: "Arrays and Linked Lists",
      description: "Introduction to basic data structures",
      progress: 100,
      lastUpdated: "2024-01-10",
      status: "completed",
    },
    {
      id: "2",
      subject: "Data Structures",
      topic: "Trees and Graphs",
      description: "Advanced data structures and algorithms",
      progress: 75,
      lastUpdated: "2024-01-12",
      status: "in-progress",
    },
    {
      id: "3",
      subject: "Database Systems",
      topic: "SQL Fundamentals",
      description: "Basic SQL queries and database design",
      progress: 60,
      lastUpdated: "2024-01-08",
      status: "in-progress",
    },
  ])

  const [editingId, setEditingId] = useState<string | null>(null)
  const [newItem, setNewItem] = useState({
    subject: "",
    topic: "",
    description: "",
    progress: 0,
  })

  const [showAddForm, setShowAddForm] = useState(false)

  const handleUpdateProgress = (id: string, newProgress: number) => {
    setSyllabusItems((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              progress: newProgress,
              status: newProgress === 100 ? "completed" : newProgress > 0 ? "in-progress" : "not-started",
              lastUpdated: new Date().toISOString().split("T")[0],
            }
          : item,
      ),
    )
  }

  const handleAddItem = () => {
    if (newItem.subject && newItem.topic) {
      const item: SyllabusItem = {
        id: Date.now().toString(),
        ...newItem,
        lastUpdated: new Date().toISOString().split("T")[0],
        status: newItem.progress === 100 ? "completed" : newItem.progress > 0 ? "in-progress" : "not-started",
      }
      setSyllabusItems([...syllabusItems, item])
      setNewItem({ subject: "", topic: "", description: "", progress: 0 })
      setShowAddForm(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const overallProgress = syllabusItems.reduce((acc, item) => acc + item.progress, 0) / syllabusItems.length

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card className="border-faculty-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-faculty-primary/10">
              <BookOpen className="h-6 w-6 text-faculty-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Overall Syllabus Progress</p>
              <p className="text-2xl font-bold">{Math.round(overallProgress)}%</p>
              <Progress value={overallProgress} className="mt-2 h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Syllabus Items */}
      <Card className="border-faculty-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Syllabus Management</CardTitle>
              <CardDescription>Track and update your course syllabus progress</CardDescription>
            </div>
            <Button
              onClick={() => setShowAddForm(true)}
              className="bg-faculty-primary hover:bg-faculty-primary/90 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Topic
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add New Item Form */}
          {showAddForm && (
            <div className="p-4 border rounded-lg bg-faculty-secondary/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={newItem.subject}
                    onChange={(e) => setNewItem({ ...newItem, subject: e.target.value })}
                    placeholder="Enter subject name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="topic">Topic</Label>
                  <Input
                    id="topic"
                    value={newItem.topic}
                    onChange={(e) => setNewItem({ ...newItem, topic: e.target.value })}
                    placeholder="Enter topic name"
                  />
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  placeholder="Enter topic description"
                  rows={2}
                />
              </div>
              <div className="space-y-2 mb-4">
                <Label htmlFor="progress">Progress (%)</Label>
                <Input
                  id="progress"
                  type="number"
                  min="0"
                  max="100"
                  value={newItem.progress}
                  onChange={(e) => setNewItem({ ...newItem, progress: Number.parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleAddItem}
                  size="sm"
                  className="bg-faculty-primary hover:bg-faculty-primary/90 text-white"
                >
                  <Save className="h-4 w-4 mr-1" />
                  Save
                </Button>
                <Button onClick={() => setShowAddForm(false)} variant="outline" size="sm">
                  <X className="h-4 w-4 mr-1" />
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Syllabus Items List */}
          {syllabusItems.map((item) => (
            <div key={item.id} className="p-4 border rounded-lg bg-card/50">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium">
                    {item.subject} - {item.topic}
                  </h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(item.status)}>{item.status.replace("-", " ")}</Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingId(editingId === item.id ? null : item.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{item.progress}%</span>
                </div>
                <Progress value={item.progress} className="h-2" />
              </div>

              {editingId === item.id && (
                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <Label htmlFor={`progress-${item.id}`} className="text-sm">
                    Update Progress
                  </Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id={`progress-${item.id}`}
                      type="number"
                      min="0"
                      max="100"
                      defaultValue={item.progress}
                      className="w-20"
                      onBlur={(e) => {
                        const newProgress = Number.parseInt(e.target.value) || 0
                        handleUpdateProgress(item.id, Math.min(100, Math.max(0, newProgress)))
                        setEditingId(null)
                      }}
                    />
                    <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>
                      Done
                    </Button>
                  </div>
                </div>
              )}

              <div className="mt-2 text-xs text-muted-foreground">Last updated: {item.lastUpdated}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
