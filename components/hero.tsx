"use client"

import { useEffect, useState, useRef } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  const [currentWorkIndex, setCurrentWorkIndex] = useState(0)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([null, null])

  // Simplified portfolio works with direct paths
  const portfolioWorks = [
    {
      title: "3D Generalist",
      type: "image",
      src: "/images/0.png",
    },
    {
      title: "Product Design",
      type: "image",
      src: "/images/2.png",
    },
    {
      title: "Motion Graphics",
      type: "image",
      src: "/images/3.png",
      // index: 0,
    },
    {
      title: "Visual Effects",
      type: "image",
      src: "/images/4.png",
      // index: 1,
    },
    {
      title: "Visual Effects",
      type: "image",
      src: "/images/5.png",
      // index: 1,
    },
    {
      title: "Visual Effects",
      type: "image",
      src: "/images/6.jpg",
      // index: 1,
    },
    {
      title: "Visual Effects",
      type: "image",
      src: "/images/7.png",
      // index: 1,
    },
    {
      title: "Visual Effects",
      type: "image",
      src: "/images/8.png",
      // index: 1,
    },
    {
      title: "3D Animation",
      type: "video",
      src: "/videos/tele.v.mp4",
      index: 0,
      },
      
      
  ]

  // Handle rotation of background media
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWorkIndex((prev) => (prev + 1) % portfolioWorks.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  // Preload all videos when component mounts
  useEffect(() => {
    // Initialize video elements
    const videoItems = portfolioWorks.filter((item) => item.type === "video")
    videoItems.forEach((item, i) => {
      if (videoRefs.current[i]) {
        videoRefs.current[i]!.src = item.src
        videoRefs.current[i]!.load()
      }
    })
  }, [])

  // Handle video playback when current work changes
  useEffect(() => {
    const currentWork = portfolioWorks[currentWorkIndex]

    // Pause all videos first
    videoRefs.current.forEach((ref) => {
      if (ref) {
        ref.pause()
      }
    })

    // If current item is video, play it
    if (currentWork.type === "video" && typeof currentWork.index === "number") {
      const videoRef = videoRefs.current[currentWork.index]
      if (videoRef) {
        videoRef.currentTime = 0
        const playPromise = videoRef.play()
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error("Video play error:", error)
          })
        }
      }
    }
  }, [currentWorkIndex])

  const currentWork = portfolioWorks[currentWorkIndex]

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Media Container */}
      <div className="absolute inset-0 z-0">
        {/* Images */}
        {portfolioWorks.map(
          (work, index) =>
            work.type === "image" && (
              <div
                key={`image-${index}`}
                className="absolute inset-0 transition-opacity duration-1000"
                style={{
                  opacity: currentWorkIndex === index ? 1 : 0,
                }}
              >
                <img
                  src={work.src || "/placeholder.svg"}
                  alt={work.title}
                  className="w-full h-full object-cover"
                  style={{
                    filter: "blur(1.5px) brightness(0.55) contrast(1.1)",
                  }}
                />
              </div>
            ),
        )}

        {/* Videos - preloaded and always in DOM */}
        {portfolioWorks
          .filter((work) => work.type === "video")
          .map((work, i) => (
            <div
              key={`video-${i}`}
              className="absolute inset-0 transition-opacity duration-1000"
              style={{
                opacity: currentWorkIndex === portfolioWorks.findIndex((w) => w.src === work.src) ? 1 : 0,
              }}
            >
              <video
                ref={(el) => (videoRefs.current[i] = el)}
                className="w-full h-full object-cover"
                style={{
                  filter: "blur(1.5px) brightness(0.55) contrast(1.1)",
                }}
                muted
                loop
                playsInline
                preload="auto"
              />
            </div>
          ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm mix-blend-multiply z-1" />

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 text-center">
        <h1 className="text-7xl font-bold mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-white">
            Ananth R Kulkarni
          </span>
        </h1>
        <div className="text-4xl font-light mb-6 text-gray-300">3D Generalist</div>
        <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
          Transforming Ideas into Stunning 3D Reality | Specializing in Character Design, Environment Art, and Visual
          Effects
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            size="lg"
            className="bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-full transition duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/20"
            onClick={() => {
              const portfolioSection = document.getElementById("portfolio")
              if (portfolioSection) {
                portfolioSection.scrollIntoView({ behavior: "smooth" })
              }
            }}
          >
            View My Work
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border border-white text-white hover:bg-white/10 px-8 py-3 rounded-full transition duration-300"
            onClick={() => {
              const contactSection = document.getElementById("contact")
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" })
              }
            }}
          >
            Get in Touch
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20">
        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-all duration-300 group"
          onClick={() => {
            const servicesSection = document.getElementById("services")
            if (servicesSection) {
              servicesSection.scrollIntoView({ behavior: "smooth" })
            }
          }}
        >
          <ChevronDown className="w-6 h-6 text-white group-hover:animate-pulse" />
          <span className="sr-only">Scroll Down</span>
          <span className="absolute -inset-0.5 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping-slow"></span>
        </Button>
      </div>
    </section>
  )
}
