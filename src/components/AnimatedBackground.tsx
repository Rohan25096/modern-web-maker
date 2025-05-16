
import React, { useEffect, useRef } from 'react';

interface AnimatedBackgroundProps {
  className?: string;
  variant?: 'default' | 'primary' | 'secondary';
  density?: number; // Number of particles
  speed?: number; // Animation speed
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  className = '',
  variant = 'default',
  density = 50,
  speed = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match container size
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle configuration based on variant
    let particleColor = 'rgba(66, 135, 245, 0.5)'; // Default blue
    let lineColor = 'rgba(66, 135, 245, 0.2)';
    const actualDensity = Math.min(density, 100); // Cap density

    switch (variant) {
      case 'primary':
        particleColor = 'rgba(66, 135, 245, 0.5)'; // Blue
        lineColor = 'rgba(66, 135, 245, 0.2)';
        break;
      case 'secondary':
        particleColor = 'rgba(200, 200, 220, 0.5)'; // Light gray
        lineColor = 'rgba(200, 200, 220, 0.2)';
        break;
      default:
        particleColor = 'rgba(150, 150, 180, 0.4)'; // Medium gray
        lineColor = 'rgba(150, 150, 180, 0.15)';
    }

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
        this.speedX = (Math.random() - 0.5) * 0.5 * speed;
        this.speedY = (Math.random() - 0.5) * 0.5 * speed;
        this.color = particleColor;
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

    // Create particle array based on container size and density
    const particlesArray: Particle[] = [];
    const particleCount = Math.max(20, Math.min(actualDensity, (canvas.width * canvas.height) / 9000));
    
    for (let i = 0; i < particleCount; i++) {
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
            ctx.strokeStyle = lineColor;
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
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [variant, density, speed]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute top-0 left-0 w-full h-full -z-10 ${className}`}
    />
  );
};

export default AnimatedBackground;
