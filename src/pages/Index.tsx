
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";

const Index = () => {
  useEffect(() => {
    // Set page title
    document.title = "Portfolio | Data Scientist & ML Engineer";
  }, []);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Global animated background with lower density */}
      <div className="fixed inset-0 z-[-20] opacity-30">
        <AnimatedBackground variant="default" density={30} speed={0.5} />
      </div>
      
      <Navbar />
      <Hero />
      
      <div className="relative animated-bg secondary">
        <About />
        <AnimatedBackground variant="secondary" density={40} />
      </div>
      
      <div className="relative">
        <Projects />
        <AnimatedBackground variant="default" density={40} />
      </div>
      
      <div className="relative animated-bg secondary">
        <Skills />
        <AnimatedBackground variant="secondary" density={50} />
      </div>
      
      <div className="relative">
        <Contact />
        <AnimatedBackground variant="primary" density={40} />
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
