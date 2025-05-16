
import { useEffect, useState } from "react";

const Hero = () => {
  const [typingText, setTypingText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [typingIndex, setTypingIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
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

  // Track mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) - 0.5;
      const y = (clientY / window.innerHeight) - 0.5;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const [showEmoji, setShowEmoji] = useState(false);
  const toggleEmoji = () => setShowEmoji(!showEmoji);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 overflow-hidden relative">
      {/* Animated background circles */}
      <div 
        className="absolute w-72 h-72 bg-primary/10 rounded-full -top-10 -left-10 blur-xl"
        style={{
          transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`,
          transition: 'transform 0.2s ease-out'
        }}
      />
      <div 
        className="absolute w-96 h-96 bg-primary/5 rounded-full -bottom-20 -right-20 blur-xl"
        style={{
          transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
          transition: 'transform 0.2s ease-out'
        }}
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

          {/* Scroll indicator */}
          <div className="hidden md:block absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce mt-16">
            <a href="#about" className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors">
              <span className="text-sm mb-2">Scroll Down</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
