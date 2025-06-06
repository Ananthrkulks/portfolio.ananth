"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Tag, Maximize2, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

// Update custom arrow styles
const splideStyles = `
  .splide__pagination {
    display: none !important;
  }
  .splide__track {
    padding: 0 !important;
  }
  .splide__arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    cursor: pointer;
    opacity: 0.8;
  }
  .splide__arrow:hover {
    background: rgba(255, 255, 255, 0.3);
    opacity: 1;
  }
  .splide__arrow--prev {
    left: 0.25rem;
  }
  .splide__arrow--next {
    right: 0.25rem;
  }
  .splide__arrow svg {
    width: 1rem;
    height: 1rem;
    fill: white;
  }
  .splide__arrow svg path {
    fill: white;
  }

  /* PDF Viewer Styles */
  .pdf-viewer {
    width: 100%;
    height: 100%;
    min-height: 300px;
    background: #f5f5f5;
    border-radius: 0.5rem;
    overflow: hidden;
  }

  .pdf-viewer iframe {
    width: 100%;
    height: 100%;
    border: none;
  }

  @media (max-width: 768px) {
    .pdf-viewer {
      min-height: 400px;
    }
  }
`;

interface Project {
  id: number
  title: string
  category: string
  description: string
  tags: string[]
  images?: string[]
  videos?: string[]
  secondImages?: string[]
  thirdImages?: string[]
  fourthImages?: string[]
  secondVideos?: string[]
  pdfs?: string[]
  link?: string
}

// Raw projects with duplicates
const rawProjects: Project[] = [
  {
    id: 1,
    title: "Low-Poly Character",
    category: "Character",
    description: "A simple low-poly character model created for a game project, with clean topology",
    tags: ["Character Modeling", "Texturing", "Blender"],
    images: ["/images/ichar.png", "/images/ichar3.png", "/images/ichar0.png", "/images/ichar1.png"],
    secondImages: ["/images/ichar0v.png", "/images/icharv.png"],
    thirdImages: ["/images/ichareference.png"],
    videos: ["/videos/vchar0.mp4"],
    pdfs: [],
  },
  {
    id: 2,
    title: "RFID-Enabled Telephone",
    category: "Product Viz",
    description: "Dynamic product animation of a high-end consumer electronics device.",
    tags: ["Product Design", "Blender Modeling", "Texturing", "Lighting", "Realistic Rendering"],
    images: ["/images/itele0.png", "/images/itele10.png"],
    secondImages: ["/images/itele1v.png"],
    videos: ["/videos/tele.v.mp4"],
  },
  {
    id: 3,
    title: "Ultimate Showcase",
    category: "Mixed Media",
    description: "A comprehensive project showing off 3D renders, animations, and product reels.",
    tags: ["3D", "Motion", "Product", "Mixed Media"],
    images: ["/images/ienv0.png", "/images/iheli0.png", "/images/itele0.png"],
    secondImages: ["/images/0.png", "/images/iheli1.png", "/images/itele1.png"],
    thirdImages: ["/images/iheli1.png", "/images/itele1.png", "/images/ienv0.png"],
    fourthImages: ["/images/itele1.png", "/images/iheli1.png", "/images/itele0.png"],
    videos: ["/video.mp4"],
    secondVideos: ["/video.mp4"],
  },
  {
    id: 4,
    title: "Smart Fingerprint Scanner",
    category: "Product Viz",
    description: "A modern biometric security device with realistic materials and lighting.",
    tags: ["Product Design", "Blender Modeling", "Texturing", "Lighting", "Realistic Rendering"],
    images: ["/images/ivmetrix0.png", "/images/ienv0.png", "/images/iheli0.png"],
    secondImages: ["/images/ivmetrix1.png", "/images/itele0.png", "/images/iheli1.png"],
    thirdImages: ["/images/iheli0.png", "/images/itele1.png", "/images/ienv0.png"],
    fourthImages: ["/images/itele0.png", "/images/iheli0.png", "/images/itele1.png"],
    videos: ["/videos/vvmetrix0.mp4"],
    secondVideos: ["/videos/vheli0.mp4"],
  },
  {
    id: 5,
    title: "Premium Bluetooth Speaker",
    category: "Product Viz",
    description: "High-end wireless speaker with detailed material work and dynamic lighting.",
    tags: ["Product Design", "Blender Modeling", "Texturing", "Lighting", "Realistic Rendering"],
    images: ["/images/ienv0.png", "/images/ispeaker1.png", "/images/iheli0.png"],
    secondImages: ["/images/iheli0.png", "/images/ispeaker3.png", "/images/itele0.png"],
    thirdImages: ["/images/iheli1.png", "/images/itele1.png", "/images/ienv0.png"],
    fourthImages: ["/images/itele1.png", "/images/iheli0.png", "/images/itele0.png"],
    videos: ["/videos/vspeaker0.mp4"],
    secondVideos: ["/videos/vheli0.mp4", "/videos/vchar0.mp4"],
  },
  {
    id: 6,
    title: "Luxury Sneaker Design",
    category: "Product Viz",
    description: "Detailed 3D visualization of a premium athletic shoe with realistic materials.",
    tags: ["Product Design", "Blender Modeling", "Texturing", "Lighting", "Realistic Rendering"],
    images: ["/images/2.png", "/images/ienv0.png", "/images/iheli0.png"],
    secondImages: ["/images/shoes1.png", "/images/itele0.png", "/images/iheli1.png"],
    thirdImages: ["/images/iheli0.png", "/images/itele1.png", "/images/ienv0.png"],
    fourthImages: ["/images/itele0.png", "/images/iheli0.png", "/images/itele1.png"],
    videos: ["/videos/shoes.mp4"],
    secondVideos: ["/videos/vheli0.mp4"],
  },
  {
    id: 7,
    title: "Fantasy Game World",
    category: "Environment",
    description: "A vibrant fantasy game environment with stylized architecture and magical elements.",
    tags: ["Environment Design", "Game Art", "Stylized Modeling", "Texturing", "Lighting"],
    images: ["/images/ienv3.png","/images/ienv0.png", "/images/ienv1.png"],
    secondImages: ["/images/ienv1v.png", "/images/ienv2v.png"],
    videos: ["/videos/game_env.mp4"],
    secondVideos: ["/videos/vheli0.mp4"],
  },
  {
    id: 8,
    title: "Cyberpunk Cityscape",
    category: "Environment",
    description: "A detailed cyberpunk city environment with neon lights and futuristic architecture.",
    tags: ["Environment Design", "Game Art", "Stylized Modeling", "Texturing", "Lighting"],
    images: ["/images/cyberpunk0.png", "/images/ienv0.png", "/images/iheli0.png"],
    secondImages: ["/images/cyberpunk1.png", "/images/itele0.png", "/images/iheli1.png"],
    thirdImages: ["/images/iheli0.png", "/images/itele1.png", "/images/ienv0.png"],
    fourthImages: ["/images/itele0.png", "/images/iheli0.png", "/images/itele1.png"],
    videos: ["/videos/cyberpunk.mp4"],
    secondVideos: ["/videos/vheli0.mp4"],
  },
  {
    id: 9,
    title: "Realistic Forest Scene",
    category: "Environment",
    description: "A photorealistic forest environment with detailed vegetation and atmospheric lighting.",
    tags: ["Environment Design", "Realistic Modeling", "Texturing", "Lighting", "Photorealistic"],
    images: ["/images/forest0.png", "/images/ienv0.png", "/images/iheli0.png"],
    secondImages: ["/images/forest1.png", "/images/itele0.png", "/images/iheli1.png"],
    thirdImages: ["/images/iheli0.png", "/images/itele1.png", "/images/ienv0.png"],
    fourthImages: ["/images/itele1.png", "/images/iheli0.png", "/images/itele0.png"],
    videos: ["/videos/forest.mp4"],
    secondVideos: ["/videos/vheli0.mp4"],
  },
  {
    id: 10,
    title: "Modern Urban Landscape",
    category: "Environment",
    description: "A highly detailed urban environment with realistic architecture and materials.",
    tags: ["Environment Design", "Realistic Modeling", "Texturing", "Lighting", "Photorealistic"],
    images: ["/images/urban0.png", "/images/ienv0.png", "/images/iheli0.png"],
    secondImages: ["/images/urban1.png", "/images/itele0.png", "/images/iheli1.png"],
    thirdImages: ["/images/iheli0.png", "/images/itele1.png", "/images/ienv0.png"],
    fourthImages: ["/images/itele0.png", "/images/iheli0.png", "/images/itele1.png"],
    videos: ["/videos/urban.mp4"],
    secondVideos: ["/videos/vheli0.mp4"],
  },
  {
    id: 11,
    title: "Realistic Banner Animation",
    category: "CGI Animation",
    description: "A photorealistic banner animation showcasing dynamic cloth simulation and realistic lighting effects.",
    tags: ["Cloth Simulation", "Animation", "Realistic Rendering", "Motion Graphics", "Lighting"],
    images: ["/images/iheli1.png", "/images/ienv0.png", "/images/iheli0.png"],
    secondImages: ["/images/iheli0.png", "/images/itele0.png", "/images/iheli1.png"],
    thirdImages: ["/images/itele0.png", "/images/itele1.png", "/images/ienv0.png"],
    fourthImages: ["/images/itele1.png", "/images/iheli0.png", "/images/itele0.png"],
    videos: ["/videos/vheli0.mp4"],
    secondVideos: ["/videos/tele.v.mp4"],
  },
  {
    id: 12,
    title: "CGI Shoe Animation",
    category: "CGI Animation",
    description: "A dynamic shoe animation featuring detailed material work, motion graphics, and cinematic camera movements.",
    tags: ["Product Animation", "Motion Graphics", "Cinematic", "Material Design", "Camera Animation"],
    images: ["/images/cgi_shoe0.png", "/images/ienv0.png", "/images/iheli0.png"],
    secondImages: ["/images/cgi_shoe1.png", "/images/itele0.png", "/images/iheli1.png"],
    thirdImages: ["/images/iheli0.png", "/images/itele1.png", "/images/ienv0.png"],
    fourthImages: ["/images/itele0.png", "/images/iheli0.png", "/images/itele1.png"],
    videos: ["/videos/cgi_shoe.mp4"],
    secondVideos: ["/videos/vheli0.mp4"],
  },
]

// Get unique categories and sort them
const categories = ["All", "Character", "Product Viz", "Mixed Media", "Environment", "CGI Animation"]

// Remove duplicates by ID and sort by ID
const projects: Project[] = Array.from(new Map(rawProjects.map((proj) => [proj.id, proj])).values())
  .sort((a, b) => a.id - b.id)

// Add this right after the imports
const imageCache = new Map<string, string>()

// Update the preloadImage function to be more strict
function preloadImage(src: string, projectId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (imageCache.has(`${projectId}-${src}`)) {
      resolve()
      return
    }
    const img = new Image()
    img.src = src
    img.onload = () => {
      imageCache.set(`${projectId}-${src}`, src)
      resolve()
    }
    img.onerror = () => {
      imageCache.set(`${projectId}-${src}`, '/placeholder.svg')
      resolve()
    }
  })
}

// Add these types at the top after imports
type ProjectImage = {
  src: string;
  alt: string;
  projectId: string;
}

type ProjectImages = {
  [key: string]: ProjectImage[];
}

// Add this before the Portfolio component
const projectImages: ProjectImages = {
  "1": [
    { src: "/images/ichar0.png", alt: "Character Design 1", projectId: "1" },
    { src: "/images/ichar1.png", alt: "Character Design 2", projectId: "1" },
    { src: "/images/ichar3.png", alt: "Character Design 3", projectId: "1" },
    { src: "/images/ichar.png", alt: "Character Design 4", projectId: "1" },
    { src: "/images/icharv.png", alt: "Character Design 5", projectId: "1" },
    { src: "/images/ichar0v.png", alt: "Character Design 6", projectId: "1" },
    { src: "/images/ichareference.png", alt: "Character Design 7", projectId: "1" }
  ],
  "2": [
    { src: "/images/ienv0.png", alt: "Environment Design 1", projectId: "2" },
    { src: "/images/ienv1.png", alt: "Environment Design 2", projectId: "2" },
    { src: "/images/ienv3.png", alt: "Environment Design 3", projectId: "2" },
    { src: "/images/ienv1v.png", alt: "Environment Design 4", projectId: "2" },
    { src: "/images/ienv2v.png", alt: "Environment Design 5", projectId: "2" }
  ],
  "3": [
    { src: "/images/ispeaker0.png", alt: "Speaker Design 1", projectId: "3" },
    { src: "/images/ispeaker1.png", alt: "Speaker Design 2", projectId: "3" }
  ],
  "4": [
    { src: "/images/iheli0.png", alt: "Helicopter Design 1", projectId: "4" },
    { src: "/images/iheli1.png", alt: "Helicopter Design 2", projectId: "4" }
  ],
  "5": [
    { src: "/images/ivmetrix0.png", alt: "Vmetrix Design 1", projectId: "5" },
    { src: "/images/ivmetrix1.png", alt: "Vmetrix Design 2", projectId: "5" }
  ],
  "6": [
    { src: "/images/itele0.png", alt: "Telephone Design 1", projectId: "6" },
    { src: "/images/itele1v.png", alt: "Telephone Design 2", projectId: "6" },
    { src: "/images/itele10.png", alt: "Telephone Design 3", projectId: "6" }
  ]
}

export function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null)
  const [fullscreenImages, setFullscreenImages] = useState<string[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showAll, setShowAll] = useState(false)
  const [carouselKey, setCarouselKey] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // Reset states when project changes
  useEffect(() => {
    if (selectedProject) {
      setCarouselKey(prev => prev + 1)
      setCurrentImageIndex(0)
      setIsLoading(true)
    }
  }, [selectedProject])

  // Handle image loading
  const handleImageLoad = () => {
    setIsLoading(false)
  }

  // Function to open fullscreen image with carousel
  const openFullscreen = (imageSrc: string, images: string[], index: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setFullscreenImage(imageSrc)
    setFullscreenImages(images)
    setCurrentImageIndex(index)
  }

  // Function to navigate through fullscreen images with keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!fullscreenImage) return
      
      if (e.key === 'ArrowRight') {
        navigateFullscreen('next')
      } else if (e.key === 'ArrowLeft') {
        navigateFullscreen('prev')
      } else if (e.key === 'Escape') {
        setFullscreenImage(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [fullscreenImage, currentImageIndex, fullscreenImages])

  // Function to navigate through fullscreen images
  const navigateFullscreen = (direction: 'prev' | 'next') => {
    if (fullscreenImages.length === 0) return
    
    let newIndex = currentImageIndex
    if (direction === 'next') {
      newIndex = (currentImageIndex + 1) % fullscreenImages.length
    } else {
      newIndex = (currentImageIndex - 1 + fullscreenImages.length) % fullscreenImages.length
    }
    
    setCurrentImageIndex(newIndex)
    setFullscreenImage(fullscreenImages[newIndex])
  }

  // Update the preload effect
  useEffect(() => {
    const preloadAllImages = async () => {
      const imagePromises = Object.values(projectImages).flatMap(images =>
        images.map(img => {
          return new Promise<void>((resolve) => {
            const image = new Image()
            image.src = img.src
            image.onload = () => {
              imageCache.set(`${img.projectId}-${img.src}`, img.src)
              resolve()
            }
            image.onerror = () => {
              imageCache.set(`${img.projectId}-${img.src}`, '/placeholder.svg')
              resolve()
            }
          })
        })
      )
      await Promise.all(imagePromises)
    }
    preloadAllImages()
  }, [])

  const filteredProjects =
    selectedCategory === "All" ? projects : projects.filter((project) => project.category === selectedCategory)

  // Calculate initial display count (2 rows * 3 columns = 6 items)
  const initialDisplayCount = 6
  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, initialDisplayCount)

  // Helper function to get project images with fallback
  const getProjectImages = (project: Project) => {
    const images = project.images || []
    return images.map((src, index) => ({
      src,
      alt: `${project.title} - Image ${index + 1}`,
      projectId: project.id.toString()
    }))
  }

  return (
    <section className="py-20" id="portfolio">
      <style>{splideStyles}</style>
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-8">Portfolio</h2>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => {
                setSelectedCategory(category)
                setShowAll(false) // Reset show all when changing category
              }}
              className="px-6 py-2 rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project) => {
            const projectImages = getProjectImages(project)
            const mainImage = projectImages[0]?.src || "/placeholder.svg"
            
            return (
              <Card
                key={project.id}
                className="group relative overflow-hidden rounded-lg cursor-pointer border-0 p-0 h-[300px]"
                onClick={() => setSelectedProject(project)}
              >
                <CardContent className="p-0 h-full">
                  <div className="relative h-full">
                    {isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                    <img
                      src={mainImage}
                      alt={project.title}
                      className={`w-full h-full object-cover object-[center_40%] transition duration-300 group-hover:scale-110 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                      onLoad={handleImageLoad}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = '/placeholder.svg'
                        setIsLoading(false)
                      }}
                    />
                    {/* Fullscreen button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
                      onClick={(e) => openFullscreen(mainImage, projectImages.map(img => img.src), 0, e)}
                    >
                      <Maximize2 className="w-5 h-5" />
                    </Button>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-10">
                      <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                      <p className="text-white/70">{project.category}</p>
                      <div className="flex gap-2 mt-2">
                        {project.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-white/20 text-white">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Show More Button */}
        {filteredProjects.length > initialDisplayCount && (
          <div className="flex justify-center mt-12">
            <Button
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-2 rounded-full"
            >
              {showAll ? "Show Less" : "Show More"}
            </Button>
          </div>
        )}

        {/* Project Modal */}
        <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
          <DialogContent className="max-w-4xl bg-card">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">{selectedProject?.title}</DialogTitle>
              <DialogClose className="absolute right-4 top-4" />
            </DialogHeader>

            {selectedProject && (
              <div className="p-0 space-y-6">
                {/* Media Preview */}
                <div className="grid md:grid-cols-4 gap-2">
                  {/* First Image Carousel */}
                  {getProjectImages(selectedProject).map((image, i) => (
                    <div className="w-full relative">
                      <Splide
                        key={`carousel-1-${carouselKey}`}
                        options={{
                          type: getProjectImages(selectedProject).length > 1 ? 'loop' : 'slide',
                          perPage: 1,
                          perMove: 1,
                          gap: '0.5rem',
                          pagination: false,
                          arrows: getProjectImages(selectedProject).length > 1,
                          autoplay: getProjectImages(selectedProject).length > 1,
                          interval: 4000,
                          pauseOnHover: true,
                          pauseOnFocus: true,
                          rewind: true,
                          waitForTransition: true,
                          speed: 400,
                          classes: {
                            arrows: 'splide__arrows',
                            arrow: 'splide__arrow',
                            prev: 'splide__arrow--prev',
                            next: 'splide__arrow--next',
                          },
                          start: 0,
                        }}
                      >
                        <SplideSlide key={`${selectedProject.id}-${i}`}>
                          <div className="relative group aspect-[3/2]">
                            <img
                              src={image.src}
                              alt={image.alt}
                              className="w-full h-full object-cover rounded-lg"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.src = '/placeholder.svg'
                              }}
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => openFullscreen(image.src, getProjectImages(selectedProject).map(img => img.src), i, e)}
                            >
                              <Maximize2 className="w-5 h-5" />
                            </Button>
                          </div>
                        </SplideSlide>
                      </Splide>
                    </div>
                  ))}

                  {/* Video Display */}
                  {selectedProject.videos && selectedProject.videos.length > 0 && (
                    <div className="w-full relative">
                      <div className="relative group aspect-[3/2] bg-black">
                        <video 
                          controls 
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="w-full h-full object-contain rounded-lg"
                          preload="metadata"
                          onPlay={(e) => {
                            const videos = document.querySelectorAll('video');
                            videos.forEach((v) => {
                              if (v !== e.currentTarget) {
                                v.pause();
                                v.currentTime = 0;
                              }
                            });
                          }}
                        >
                          <source src={selectedProject.videos[0]} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      </div>
                    </div>
                  )}

                  {/* PDF Display */}
                  {selectedProject.pdfs && selectedProject.pdfs.length > 0 && (
                    <div className="w-full relative">
                      <div className="relative group aspect-[3/2] bg-black">
                        <div className="pdf-viewer">
                          <iframe
                            src={`${selectedProject.pdfs[0]}#toolbar=0&navpanes=0`}
                            className="w-full h-full object-contain rounded-lg"
                            style={{ border: 'none' }}
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(selectedProject.pdfs?.[0], '_blank');
                          }}
                        >
                          <ExternalLink className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-xl font-semibold mb-2">About the Project</h4>
                  <p className="text-muted-foreground">{selectedProject.description}</p>
                </div>

                {/* Tags */}
                <div>
                  <h4 className="text-xl font-semibold mb-2">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Fullscreen Image Modal */}
        <Dialog open={!!fullscreenImage} onOpenChange={(open) => !open && setFullscreenImage(null)}>
          <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 overflow-hidden bg-black/90">
            <DialogHeader className="sr-only">
              <DialogTitle>Fullscreen Image View</DialogTitle>
            </DialogHeader>
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={fullscreenImage || ""}
                alt="Fullscreen view"
                className="max-w-full max-h-[90vh] object-contain"
              />
              <DialogClose className="absolute right-4 top-4 text-white hover:text-gray-300" />

              {/* Navigation Arrows */}
              {fullscreenImages.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                    onClick={() => navigateFullscreen('prev')}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                    onClick={() => navigateFullscreen('next')}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}

              {/* Optional: Add external link button */}
              {fullscreenImage && (
                <a
                  href={fullscreenImage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                  <ExternalLink className="h-5 w-5 text-white" />
                </a>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
