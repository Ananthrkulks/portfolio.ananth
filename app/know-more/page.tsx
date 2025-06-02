import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Mail, MapPin, Calendar, GraduationCap, Code, Palette, Music } from "lucide-react"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { VideoPlayer } from "@/components/video-player"

export default function KnowMore() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="container mx-auto px-6 py-20">
          {/* Back to Home Button */}
          <div className="mb-8">
            <Button 
              variant="outline" 
              asChild 
              className="group relative overflow-hidden bg-black/40 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Link href="/" className="flex items-center gap-2 px-6 py-3">
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                <span className="text-lg font-semibold text-white/90">Back to Home</span>
                <span className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </Button>
          </div>

          {/* About Me Blog Section */}
          <section className="max-w-3xl mx-auto mb-20">
            <div className="bg-card/50 backdrop-blur-sm p-8 rounded-lg border border-white/10 shadow-xl">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">
                About Me
              </h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-lg leading-relaxed mb-6">
                  Hi there! I'm a passionate 3D artist and designer with a keen eye for detail and a love for creating immersive visual experiences. My journey in the world of digital art began when I first discovered the magic of 3D modeling and animation.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  When I'm not crafting digital masterpieces, you can find me exploring new design trends, experimenting with different art styles, or diving into the latest technology that pushes the boundaries of what's possible in digital art.
                </p>
                <p className="text-lg leading-relaxed">
                  I believe that every project is an opportunity to learn and grow. Whether it's creating detailed 3D models, designing immersive environments, or bringing ideas to life through animation, I'm always excited to take on new challenges and push my creative boundaries.
                </p>
              </div>
            </div>
          </section>

          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">
            My Creative Journey
          </h1>
          
          {/* Featured Projects Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-6">Featured Projects</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Speaker Project */}
              <article className="bg-card rounded-lg overflow-hidden shadow-lg">
                <div className="aspect-video">
                <VideoPlayer 
                  src="/videos/vspeaker0.mp4" 
                    className="w-full h-full"
                  poster="/images/ispeaker0.png"
                />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Speaker Design Project</h3>
                  <p className="text-muted-foreground mb-4">
                    A detailed exploration of speaker design and audio engineering...
                  </p>
                  <div className="flex gap-4">
                    <img src="/images/ispeaker0.png" alt="Speaker design" className="w-24 h-24 object-cover rounded-lg" />
                    <img src="/images/ispeaker1.png" alt="Speaker details" className="w-24 h-24 object-cover rounded-lg" />
                  </div>
                </div>
              </article>

              {/* Helicopter Project */}
              <article className="bg-card rounded-lg overflow-hidden shadow-lg">
                <div className="aspect-video">
                <VideoPlayer 
                  src="/videos/vheli0.mp4" 
                    className="w-full h-full"
                  poster="/images/iheli0.png"
                />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Helicopter Animation</h3>
                  <p className="text-muted-foreground mb-4">
                    Showcasing 3D modeling and animation skills through a helicopter project...
                  </p>
                  <div className="flex gap-4">
                    <img src="/images/iheli0.png" alt="Helicopter view 1" className="w-24 h-24 object-cover rounded-lg" />
                    <img src="/images/iheli1.png" alt="Helicopter view 2" className="w-24 h-24 object-cover rounded-lg" />
                  </div>
                </div>
              </article>
            </div>
          </section>

          {/* Personal Work Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-6">Personal Work</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* VMetrix Project */}
              <div className="bg-card rounded-lg overflow-hidden shadow-lg">
                <div className="aspect-video">
                <VideoPlayer 
                  src="/videos/vvmetrix0.mp4" 
                    className="w-full h-full"
                  poster="/images/ivmetrix0.png"
                />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">VMetrix Project</h3>
                  <p className="text-muted-foreground">
                    A comprehensive visualization project showcasing data analytics...
                  </p>
                </div>
              </div>

              {/* Tele Project */}
              <div className="bg-card rounded-lg overflow-hidden shadow-lg">
                <div className="aspect-video">
                <VideoPlayer 
                  src="/videos/tele.v.mp4" 
                    className="w-full h-full"
                  poster="/images/itele0.png"
                />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Tele Project</h3>
                  <p className="text-muted-foreground">
                    An innovative approach to telecommunications visualization...
                  </p>
                </div>
              </div>

              {/* Environment Project */}
              <div className="bg-card rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="/images/ienv0.png" 
                  alt="Environment project" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Environment Design</h3>
                  <p className="text-muted-foreground">
                    Creating immersive environmental designs and landscapes...
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Gallery Section */}
          <section>
            <h2 className="text-3xl font-semibold mb-6">Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  image: "/images/0.png",
                  title: "Speaker Design Project",
                  description: "A detailed 3D model of a high-end speaker system, showcasing advanced modeling techniques and material work."
                },
                {
                  image: "/images/1.png",
                  title: "Helicopter Animation",
                  description: "A complex helicopter model with detailed mechanical parts and realistic materials, created for an aviation project."
                },
                {
                  image: "/images/2.png",
                  title: "Environment Design",
                  description: "An immersive environment design featuring detailed architecture and atmospheric lighting for a game project."
                },
                {
                  image: "/images/3.png",
                  title: "Product Visualization",
                  description: "High-end product visualization showcasing advanced material work and lighting techniques."
                },
                {
                  image: "/images/4.png",
                  title: "Character Design",
                  description: "A detailed character model with intricate armor and accessories, created for a game project."
                },
                {
                  image: "/images/5.png",
                  title: "Architectural Visualization",
                  description: "Photorealistic architectural visualization with detailed interior design and lighting."
                },
                {
                  image: "/images/6.png",
                  title: "Medical Device Model",
                  description: "A precise 3D model of a medical device, created for educational and marketing purposes."
                },
                {
                  image: "/images/7.png",
                  title: "Vehicle Design",
                  description: "A futuristic vehicle design showcasing advanced modeling and material techniques."
                },
                {
                  image: "/images/8.png",
                  title: "Environment Concept",
                  description: "A concept art piece for an immersive game environment with unique architectural elements."
                },
                {
                  image: "/images/9.png",
                  title: "Product Animation",
                  description: "A dynamic product animation showcasing the features and design of a consumer product."
                }
              ].map((item, index) => (
                <Dialog key={index}>
                  <DialogTrigger asChild>
                    <div className="group relative aspect-square overflow-hidden rounded-lg shadow-lg cursor-pointer">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                        <p className="text-white/80 text-sm line-clamp-2">{item.description}</p>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>{item.title}</DialogTitle>
                    </DialogHeader>
                    <div className="relative aspect-video w-full">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-muted-foreground">{item.description}</p>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
} 