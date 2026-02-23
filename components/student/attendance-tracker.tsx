"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MapPin, Wifi, Camera, Eye, CheckCircle, Clock } from "lucide-react"

type AttendanceStep = "gps" | "wifi" | "face" | "blink" | "complete"

export function AttendanceTracker() {
  const [currentStep, setCurrentStep] = useState<AttendanceStep>("gps")
  const [isProcessing, setIsProcessing] = useState(false)
  const [attendanceMarked, setAttendanceMarked] = useState(false)

  const steps = [
    { id: "gps", label: "GPS Location", icon: MapPin, description: "Verify campus location" },
    { id: "wifi", label: "Wi-Fi Check", icon: Wifi, description: "Connect to class Wi-Fi" },
    { id: "face", label: "Face Recognition", icon: Camera, description: "Scan your face" },
    { id: "blink", label: "Blink Detection", icon: Eye, description: "Blink to confirm" },
    { id: "complete", label: "Complete", icon: CheckCircle, description: "Attendance marked" },
  ]

  const handleNextStep = async () => {
    setIsProcessing(true)

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const currentIndex = steps.findIndex((step) => step.id === currentStep)
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id as AttendanceStep)
    }

    if (currentStep === "blink") {
      setAttendanceMarked(true)
    }

    setIsProcessing(false)
  }

  const getStepStatus = (stepId: string) => {
    const currentIndex = steps.findIndex((step) => step.id === currentStep)
    const stepIndex = steps.findIndex((step) => step.id === stepId)

    if (stepIndex < currentIndex) return "completed"
    if (stepIndex === currentIndex) return "current"
    return "pending"
  }

  const getCurrentStepData = () => {
    return steps.find((step) => step.id === currentStep)
  }

  const currentStepData = getCurrentStepData()
  const progress = ((steps.findIndex((step) => step.id === currentStep) + 1) / steps.length) * 100

  if (attendanceMarked) {
    return (
      <Card className="border-student-primary/20 bg-student-secondary/50">
        <CardContent className="p-6 text-center">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Attendance Marked Successfully!</h3>
          <p className="text-muted-foreground mb-4">Your attendance has been recorded for today's class.</p>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Present
          </Badge>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-student-primary/20 bg-student-secondary/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-student-primary" />
          Mark Attendance
        </CardTitle>
        <CardDescription>Complete all steps to mark your attendance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="space-y-3">
          {steps.map((step) => {
            const status = getStepStatus(step.id)
            const Icon = step.icon

            return (
              <div
                key={step.id}
                className={`flex items-center gap-3 p-3 rounded-lg border ${
                  status === "completed"
                    ? "bg-green-50 border-green-200"
                    : status === "current"
                      ? "bg-student-secondary border-student-primary/40"
                      : "bg-muted/50 border-border"
                }`}
              >
                <div
                  className={`p-2 rounded-full ${
                    status === "completed"
                      ? "bg-green-100"
                      : status === "current"
                        ? "bg-student-primary/10"
                        : "bg-muted"
                  }`}
                >
                  {status === "completed" ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <Icon
                      className={`h-4 w-4 ${status === "current" ? "text-student-primary" : "text-muted-foreground"}`}
                    />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${status === "current" ? "text-student-primary" : ""}`}>{step.label}</p>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                {status === "completed" && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Done
                  </Badge>
                )}
              </div>
            )
          })}
        </div>

        {currentStep !== "complete" && (
          <div className="space-y-4">
            <Alert>
              <div className="h-4 w-4">{currentStepData && <currentStepData.icon />}</div>
              <AlertDescription>{currentStepData && currentStepData.description}</AlertDescription>
            </Alert>

            <Button
              onClick={handleNextStep}
              disabled={isProcessing}
              className="w-full bg-student-primary hover:bg-student-primary/90 text-white"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Processing...
                </>
              ) : (
                currentStepData && `Complete ${currentStepData.label}`
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
