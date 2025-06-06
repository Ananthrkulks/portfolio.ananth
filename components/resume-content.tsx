'use client'

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DownloadButton } from "@/components/download-button"
import { useState } from "react"

interface ResumeContentProps {
  onClose: () => void
}

export function ResumeContent({ onClose }: ResumeContentProps) {
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
  };

  return (
    <div className="relative w-full h-full flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Resume</h2>
        <div className="flex items-center gap-2">
          <DownloadButton />
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 relative">
        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Unable to load PDF. Please try opening it in a new tab.
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open('/resume1.pdf', '_blank')}
              >
                Open in New Tab
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setError(false)}
              >
                Retry
              </Button>
            </div>
          </div>
        ) : (
          <object
            data="/resume1.pdf"
            type="application/pdf"
            className="w-full h-full"
            onError={handleError}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-sm text-muted-foreground">
                Unable to display PDF. Please download to view.
              </p>
            </div>
          </object>
        )}
      </div>
    </div>
  )
}
