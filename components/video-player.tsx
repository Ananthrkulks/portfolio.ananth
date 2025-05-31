"use client"

import { useRef } from "react"

interface VideoPlayerProps {
  src: string
  poster?: string
  className?: string
}

export function VideoPlayer({ src, poster, className }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error("Error loading video:", e)
    if (videoRef.current) {
      videoRef.current.style.display = "none"
    }
  }

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      controls
      preload="metadata"
      playsInline
      poster={poster}
      onError={handleError}
    />
  )
} 