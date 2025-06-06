'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export function ResumeContent() {
  const [error, setError] = useState(false)

  const handleError = () => {
    setError(true)
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(85vh-8rem)] md:h-[calc(90vh-8rem)] bg-white rounded-lg shadow-lg p-6">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Failed to load PDF</h3>
        <p className="text-muted-foreground mb-4">There was an error loading the resume PDF.</p>
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            onClick={() => window.open('/resume1.pdf', '_blank')}
          >
            Open in New Tab
          </Button>
          <Button 
            onClick={() => setError(false)}
          >
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full bg-white rounded-lg shadow-lg">
      <object
        data="/resume1.pdf#toolbar=0&navpanes=0"
        type="application/pdf"
        className="w-full h-[calc(85vh-8rem)] md:h-[calc(90vh-8rem)]"
        style={{ 
          border: 'none',
          backgroundColor: '#ffffff',
          borderRadius: '0.5rem',
        }}
      >
        <div className="flex flex-col items-center justify-center h-full p-6">
          <p className="text-muted-foreground mb-4">Unable to display PDF directly.</p>
          <Button 
            variant="outline" 
            onClick={() => window.open('/resume1.pdf', '_blank')}
          >
            Open PDF in New Tab
          </Button>
        </div>
      </object>
    </div>
  )
}
