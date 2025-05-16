
import { useEffect, useState, useRef } from "react";

const Hero = () => {
  const [typingText, setTypingText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [typingIndex, setTypingIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const titles = ["Data Scientist", "ML Engineer", "Web Developer", "Problem Solver"];

  useEffect(() => {
    let typingTimer: number;
    let eraseTimer: number;
    let pauseTimer: number;
    
    if (isTyping && typingIndex < titles[0].length) {
      typingTimer = window.setTimeout(() => {
        setTypingText(prevText => prevText + titles[0][typingIndex]);
        setTypingIndex(prevIndex => prevIndex + 1);
      }, 150);
      
      return () => clearTimeout(typingTimer);
    } 
    
    if (isTyping && typingIndex === titles[0].length) {
      pauseTimer = window.setTimeout(() => {
        setIsTyping(false);
        setTypingIndex(titles[0].length - 1);
      }, 1500);
      
      return () => clearTimeout(pauseTimer);
    }
    
    if (!isTyping && typingIndex >= 0) {
      eraseTimer = window.setTimeout(() => {
        setTypingText(prevText => prevText.slice(0, -1));
        setTypingIndex(prevIndex => prevIndex - 1);
      }, 100);
      
      return () => clearTimeout(eraseTimer);
    }
    
    if (!isTyping && typingIndex < 0) {
      pauseTimer = window.setTimeout(() => {
        const currentTitleIndex = titles.findIndex(title => title === titles[0]);
        const nextTitle = titles[(currentTitleIndex + 1) % titles.length];
        titles[0] = nextTitle;
        setIsTyping(true);
        setTypingIndex(0);
      }, 500);
      
      return () => clearTimeout(pauseTimer);
    }
  }, [isTyping, typingIndex, titles]);

  // Animation for tech background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match window size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Particles for tech background
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = `rgba(66, 135, 245, ${Math.random() * 0.5 + 0.2})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create particle array
    const particlesArray: Particle[] = [];
    const numberOfParticles = Math.min(100, (canvas.width * canvas.height) / 9000);
    
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }

    // Connection lines between particles
    const connectParticles = () => {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 100;
          
          if (distance < maxDistance) {
            if (!ctx) return;
            ctx.strokeStyle = `rgba(66, 135, 245, ${1 - distance/maxDistance})`;
            ctx.lineWidth = 0.2;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    let animationFrameId: number;
    
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  const [showEmoji, setShowEmoji] = useState(false);
  const toggleEmoji = () => setShowEmoji(!showEmoji);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 overflow-hidden relative">
      {/* Tech animated background */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center md:max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground transition-all duration-300 hover:text-primary">
            Hello, I'm <span className="text-primary cursor-pointer" onClick={toggleEmoji}>
              Your Name {showEmoji && "👋"}
            </span>
          </h1>
          
          <div className="h-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 inline-flex">
              <span>{typingText}</span>
              <span className="animate-pulse">|</span>
            </h2>
          </div>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 hover:text-foreground transition-colors duration-300">
            I create innovative machine learning solutions and responsive web applications.
            Passionate about data science and delivering exceptional user experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#projects" 
              className="btn btn-primary transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              View My Work
            </a>
            <a 
              href="#contact" 
              className="btn btn-outline transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
