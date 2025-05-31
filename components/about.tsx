import { Github, Linkedin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FileText } from "lucide-react"
import { ResumeContent } from "./resume-content"
import Link from "next/link"

export function About() {
  return (
    <section className="py-20" id="about">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <img src="/images/ananth.jpg" alt="Ananth R Kulkarni" className="rounded-lg w-full" />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold mb-6">About Me</h2>
            <p className="text-muted-foreground mb-6">
              I am a passionate 3D generalist. I have freelancing experience over 1 year handling startups to design and
              visualize their product and their marketing and working and personal projects and video games. My passion
              lies in creating compelling visuals and experiences that push the boundaries of digital artistry.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <Card>
                <CardContent className="p-4">
                  <div className="text-3xl font-bold mb-2">1+</div>
                  <div className="text-sm text-muted-foreground">Years of Experience</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-3xl font-bold mb-2">15+</div>
                  <div className="text-sm text-muted-foreground">Projects Completed</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-3xl font-bold mb-2">10+</div>
                  <div className="text-sm text-muted-foreground">Clients</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-3xl font-bold mb-2">Freelancer</div>
                  <div className="text-sm text-muted-foreground">on Upwork</div>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <p className="text-muted-foreground">
                  Student in Asian Academy of Films and Television (enrolled for diploma course)
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <p className="text-muted-foreground">Computer Science and Design Engineer in VTU</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <p className="text-muted-foreground">Freelancer specializing in 3D visualization and animation</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" size="icon" asChild>
                <a href="https://github.com/Ananthrkulks" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="https://www.linkedin.com/in/ananthrkulkarni/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="w-5 h-5" />
                </a>
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <FileText className="w-4 h-4" />
                    Resume
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Ananth R Kulkarni - Resume</DialogTitle>
                  </DialogHeader>
                  <ResumeContent />
                </DialogContent>
              </Dialog>

              <Button asChild>
                <Link href="/know-more" className="gap-2">
                  Know More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
