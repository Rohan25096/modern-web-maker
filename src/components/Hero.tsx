
import { useEffect, useState } from "react";

const Hero = () => {
  const [typingText, setTypingText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [typingIndex, setTypingIndex] = useState(0);
  
  const titles = ["Web Developer", "UI/UX Designer", "Problem Solver"];

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

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16">
      <div className="container mx-auto px-4">
        <div className="text-center md:max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground">
            Hello, I'm <span className="text-primary">Your Name</span>
          </h1>
          
          <div className="h-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 inline-flex">
              <span>{typingText}</span>
              <span className="animate-pulse">|</span>
            </h2>
          </div>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            I create beautiful, responsive websites with clean and efficient code.
            Passionate about delivering exceptional user experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#projects" className="btn btn-primary">
              View My Work
            </a>
            <a href="#contact" className="btn btn-outline">
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
