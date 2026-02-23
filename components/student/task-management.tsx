"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Target, Trophy, Flame, Upload, Plus, CheckCircle, Clock, AlertCircle } from "lucide-react"

interface Task {
  id: string
  title: string
  description: string
  category: string
  status: "pending" | "in-progress" | "completed"
  dueDate: string
  assignedBy?: string
}

export function TaskManagement() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Complete React Project",
      description: "Build a full-stack web application using React and Node.js",
      category: "Web Development",
      status: "in-progress",
      dueDate: "2024-01-15",
      assignedBy: "Dr. Smith",
    },
    {
      id: "2",
      title: "Machine Learning Assignment",
      description: "Implement a classification algorithm using Python",
      category: "AI/ML",
      status: "pending",
      dueDate: "2024-01-20",
      assignedBy: "Prof. Johnson",
    },
    {
      id: "3",
      title: "Database Design Project",
      description: "Design and implement a database for library management",
      category: "Database",
      status: "completed",
      dueDate: "2024-01-10",
      assignedBy: "Dr. Wilson",
    },
  ])

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "",
    dueDate: "",
  })

  const streakCount = 7
  const completedTasks = tasks.filter((task) => task.status === "completed").length
  const totalTasks = tasks.length
  const completionRate = (completedTasks / totalTasks) * 100

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-orange-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-orange-100 text-orange-800"
    }
  }

  const handleAddTask = () => {
    if (newTask.title && newTask.description) {
      const task: Task = {
        id: Date.now().toString(),
        ...newTask,
        status: "pending",
      }
      setTasks([...tasks, task])
      setNewTask({ title: "", description: "", category: "", dueDate: "" })
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-student-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-student-primary/10">
                <Target className="h-6 w-6 text-student-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Task Completion</p>
                <p className="text-2xl font-bold">{Math.round(completionRate)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-student-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-orange-100">
                <Flame className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Streak</p>
                <p className="text-2xl font-bold">{streakCount} days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-student-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-yellow-100">
                <Trophy className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Badges Earned</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Task Management */}
      <Card className="border-student-primary/20">
        <CardHeader>
          <CardTitle>Task Management</CardTitle>
          <CardDescription>Manage your assignments and personal learning goals</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="tasks" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="tasks">My Tasks</TabsTrigger>
              <TabsTrigger value="add">Add Task</TabsTrigger>
            </TabsList>

            <TabsContent value="tasks" className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="p-4 rounded-lg border bg-card/50">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(task.status)}
                      <h4 className="font-medium">{task.title}</h4>
                    </div>
                    <Badge className={getStatusColor(task.status)}>{task.status.replace("-", " ")}</Badge>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">{task.description}</p>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <span className="text-muted-foreground">Category: {task.category}</span>
                      <span className="text-muted-foreground">Due: {task.dueDate}</span>
                    </div>
                    {task.assignedBy && <span className="text-muted-foreground">By: {task.assignedBy}</span>}
                  </div>

                  {task.status !== "completed" && (
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" variant="outline">
                        <Upload className="h-4 w-4 mr-1" />
                        Submit
                      </Button>
                      {task.status === "pending" && (
                        <Button
                          size="sm"
                          className="bg-student-primary hover:bg-student-primary/90 text-white"
                          onClick={() => {
                            setTasks(tasks.map((t) => (t.id === task.id ? { ...t, status: "in-progress" } : t)))
                          }}
                        >
                          Start Task
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </TabsContent>

            <TabsContent value="add" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Task Title</Label>
                  <Input
                    id="title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="Enter task title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={newTask.category}
                    onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                    placeholder="e.g., AI/ML, Web Development"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="Describe your task or learning goal"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                />
              </div>

              <Button onClick={handleAddTask} className="bg-student-primary hover:bg-student-primary/90 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
