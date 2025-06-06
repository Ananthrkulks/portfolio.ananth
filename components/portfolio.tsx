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
    title: "Character Design",
    category: "Character",
    description: "A collection of character designs showcasing different styles and personalities.",
    tags: ["Character Design", "Digital Art", "Illustration"],
    link: "https://www.behance.net/gallery/123456789/Character-Design-Collection",
    pdfs: [],
  },
  {
    id: 3,
    title: "RFID-Enabled Telephone ",
    category: "Product Viz",
    description: "Dynamic product animation of a high-end consumer electronics device.",
    tags: ["Product Design", "Blender Modeling", "Texturing", "Lighting" , "Realistic Rendering"],
    images: ["/images/itele0.png", "/images/8.png", "/images/ienv0.png"],
    secondImages: ["/images/itele1.png", "/images/ienv0.png", "/images/iheli0.png"],
    thirdImages: ["/images/iheli0.png", "/images/iheli1.png", "/images/itele0.png"],
    fourthImages: ["/images/iheli0.png", "/images/itele1.png", "/images/ienv0.png"],
    videos: ["/videos/tele.v.mp4"],
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

// Remove duplicates by ID
const projects: Project[] = Array.from(new Map(rawProjects.map((proj) => [proj.id, proj])).values())

const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))]

export function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null)
  const [fullscreenImages, setFullscreenImages] = useState<string[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showAll, setShowAll] = useState(false)
  const [carouselKey, setCarouselKey] = useState(0)

  // Reset carousel when project changes
  useEffect(() => {
    if (selectedProject) {
      setCarouselKey(prev => prev + 1)
    }
  }, [selectedProject])

  const filteredProjects =
    selectedCategory === "All" ? projects : projects.filter((project) => project.category === selectedCategory)

  // Calculate initial display count (2 rows * 3 columns = 6 items)
  const initialDisplayCount = 6
  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, initialDisplayCount)

  // Function to open fullscreen image with carousel
  const openFullscreen = (imageSrc: string, images: string[], index: number, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering the project dialog
    setFullscreenImage(imageSrc)
    setFullscreenImages(images)
    setCurrentImageIndex(index)
  }

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
          {displayedProjects.map((project) => (
            <Card
              key={project.id}
              className="group relative overflow-hidden rounded-lg cursor-pointer border-0 p-0 h-[300px]"
              onClick={() => setSelectedProject(project)}
            >
              <CardContent className="p-0 h-full">
                <div className="relative h-full">
                  <img
                    src={project.images?.[0] || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover object-[center_40%] transition duration-300 group-hover:scale-110"
                  />
                  {/* Fullscreen button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    onClick={(e) => openFullscreen(project.images?.[0] || "", project.images || [], 0, e)}
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
          ))}
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
                  {selectedProject.images && selectedProject.images.length > 0 && (
                    <div className="w-full relative">
                      <Splide
                        key={`carousel-1-${carouselKey}`}
                        options={{
                          type: selectedProject.images.length > 1 ? 'loop' : 'slide',
                          perPage: 1,
                          perMove: 1,
                          gap: '0.5rem',
                          pagination: false,
                          arrows: selectedProject.images.length > 1,
                          autoplay: selectedProject.images.length > 1,
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
                        {selectedProject.images.map((image, i) => (
                          <SplideSlide key={`img-${i}`}>
                            <div className="relative group aspect-[3/2]">
                              <img
                                src={image}
                                alt={`Image ${i + 1}`}
                                className="w-full h-full object-cover rounded-lg"
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => openFullscreen(image, selectedProject.images || [], i, e)}
                              >
                                <Maximize2 className="w-5 h-5" />
                              </Button>
                            </div>
                          </SplideSlide>
                        ))}
                      </Splide>
                    </div>
                  )}

                  {/* Second Image Carousel */}
                  {selectedProject.secondImages && selectedProject.secondImages.length > 0 && (
                    <div className="w-full relative">
                      <Splide
                        key={`carousel-2-${carouselKey}`}
                        options={{
                          type: selectedProject.secondImages.length > 1 ? 'loop' : 'slide',
                          perPage: 1,
                          perMove: 1,
                          gap: '0.5rem',
                          pagination: false,
                          arrows: selectedProject.secondImages.length > 1,
                          autoplay: selectedProject.secondImages.length > 1,
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
                        {selectedProject.secondImages.map((image, i) => (
                          <SplideSlide key={`img2-${i}`}>
                            <div className="relative group aspect-[3/2]">
                              <img
                                src={image}
                                alt={`Image ${i + 1}`}
                                className="w-full h-full object-cover rounded-lg"
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => openFullscreen(image, selectedProject.secondImages || [], i, e)}
                              >
                                <Maximize2 className="w-5 h-5" />
                              </Button>
                            </div>
                          </SplideSlide>
                        ))}
                      </Splide>
                    </div>
                  )}

                  {/* Third Image Carousel */}
                  {selectedProject.thirdImages && selectedProject.thirdImages.length > 0 && (
                    <div className="w-full relative">
                      <Splide
                        key={`carousel-3-${carouselKey}`}
                        options={{
                          type: selectedProject.thirdImages.length > 1 ? 'loop' : 'slide',
                          perPage: 1,
                          perMove: 1,
                          gap: '0.5rem',
                          pagination: false,
                          arrows: selectedProject.thirdImages.length > 1,
                          autoplay: selectedProject.thirdImages.length > 1,
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
                        {selectedProject.thirdImages.map((image, i) => (
                          <SplideSlide key={`img3-${i}`}>
                            <div className="relative group aspect-[3/2]">
                              <img
                                src={image}
                                alt={`Image ${i + 1}`}
                                className="w-full h-full object-cover rounded-lg"
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => openFullscreen(image, selectedProject.thirdImages || [], i, e)}
                              >
                                <Maximize2 className="w-5 h-5" />
                              </Button>
                            </div>
                          </SplideSlide>
                        ))}
                      </Splide>
                    </div>
                  )}

                  {/* Fourth Image Carousel */}
                  {selectedProject.fourthImages && selectedProject.fourthImages.length > 0 && (
                    <div className="w-full relative">
                      <Splide
                        key={`carousel-4-${carouselKey}`}
                        options={{
                          type: selectedProject.fourthImages.length > 1 ? 'loop' : 'slide',
                          perPage: 1,
                          perMove: 1,
                          gap: '0.5rem',
                          pagination: false,
                          arrows: selectedProject.fourthImages.length > 1,
                          autoplay: selectedProject.fourthImages.length > 1,
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
                        {selectedProject.fourthImages.map((image, i) => (
                          <SplideSlide key={`img4-${i}`}>
                            <div className="relative group aspect-[3/2]">
                              <img
                                src={image}
                                alt={`Image ${i + 1}`}
                                className="w-full h-full object-cover rounded-lg"
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => openFullscreen(image, selectedProject.fourthImages || [], i, e)}
                              >
                                <Maximize2 className="w-5 h-5" />
                              </Button>
                            </div>
                          </SplideSlide>
                        ))}
                      </Splide>
                    </div>
                  )}

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
