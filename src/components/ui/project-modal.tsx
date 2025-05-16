
import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    image: string;
    technologies: string[];
    demoUrl: string;
    githubUrl: string;
    details?: string;
  };
}

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{project.title}</DialogTitle>
          <DialogDescription className="text-muted-foreground mt-2">
            {project.description}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-60 object-cover rounded-md"
          />
        </div>

        {project.details && (
          <div className="mt-4">
            <h3 className="font-semibold text-lg mb-2">Project Details</h3>
            <p className="text-muted-foreground">{project.details}</p>
          </div>
        )}

        <div className="mt-4">
          <h3 className="font-semibold text-lg mb-2">Technologies</h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <Badge key={index} variant="secondary">{tech}</Badge>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
          <Button variant="outline" asChild>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <Github className="size-4" /> View Code
            </a>
          </Button>
          <Button asChild>
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <ExternalLink className="size-4" /> Live Demo
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
