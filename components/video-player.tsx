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
    <div className="relative w-full aspect-video bg-black/90">
      <video
        ref={videoRef}
        src={src}
        className={`w-full h-full object-contain ${className}`}
        controls
        preload="metadata"
        playsInline
        poster={poster}
        onError={handleError}
        onPlay={(e) => {
          const videos = document.querySelectorAll('video');
          videos.forEach((v) => {
            if (v !== e.currentTarget) {
              v.pause();
              v.currentTime = 0;
            }
          });
        }}
        onPause={(e) => {
          e.currentTarget.currentTime = 0;
        }}
      />
    </div>
  )
} 