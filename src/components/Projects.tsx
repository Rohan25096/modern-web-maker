
import { useEffect, useRef, useState } from "react";

interface ProjectProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoUrl: string;
  githubUrl: string;
}

const ProjectCard = ({ project }: { project: ProjectProps }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="project-card group transform transition-all duration-300 hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden h-64">
        <img 
          src={project.image} 
          alt={project.title}
          className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        <div className={`absolute inset-0 bg-primary/20 backdrop-blur-sm opacity-0 transition-opacity duration-300 flex items-center justify-center ${isHovered ? 'opacity-100' : ''}`}>
          <div className="text-center text-white p-4">
            <p className="font-semibold">Click to view details</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-muted-foreground mb-4">{project.description}</p>
        
        <div className="mb-6 flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-secondary text-xs font-medium rounded"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between">
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-medium flex items-center group-hover:translate-x-1 transition-transform"
          >
            Live Demo
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const projects: ProjectProps[] = [
    {
      title: "Diabetes Prediction using MLP",
      description: "A machine learning model using Multilayer Perceptron to predict diabetes risk based on patient health data.",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      technologies: ["Python", "TensorFlow", "Scikit-learn", "Pandas"],
      demoUrl: "https://example.com",
      githubUrl: "https://github.com"
    },
    {
      title: "House Price Prediction",
      description: "Linear Regression model to predict house prices based on various features like location, size, and amenities.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      technologies: ["Python", "NumPy", "Pandas", "Scikit-learn"],
      demoUrl: "https://example.com",
      githubUrl: "https://github.com"
    },
    {
      title: "Employee Records Management System",
      description: "A full-stack web application for managing employee records, attendance, and performance reviews.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      demoUrl: "https://example.com",
      githubUrl: "https://github.com"
    }
  ];

  const filters = [
    { name: "All", value: "all" },
    { name: "ML", value: "ml" },
    { name: "Web", value: "web" }
  ];

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : activeFilter === "ml" 
      ? projects.filter(p => p.title.includes("Prediction") || p.technologies.includes("TensorFlow") || p.technologies.includes("Scikit-learn")) 
      : projects.filter(p => p.technologies.includes("React") || p.technologies.includes("Node.js"));

  return (
    <section id="projects" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          My <span className="text-primary">Projects</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Explore my portfolio of machine learning models and web applications. Each project demonstrates my technical skills and problem-solving abilities.
        </p>

        {/* Project Filters */}
        <div className="flex justify-center mb-12 gap-4">
          {filters.map((filter) => (
            <button
              key={filter.value}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                activeFilter === filter.value
                  ? "bg-primary text-white"
                  : "bg-secondary hover:bg-secondary/80"
              }`}
              onClick={() => setActiveFilter(filter.value)}
            >
              {filter.name}
            </button>
          ))}
        </div>

        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {filteredProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
