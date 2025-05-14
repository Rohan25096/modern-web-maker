
import { useEffect, useRef, useState } from "react";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary">Me</span>
        </h2>

        <div className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-semibold mb-4">Who am I?</h3>
            <p className="text-muted-foreground mb-4">
              I am a passionate web developer with a strong foundation in HTML, CSS, and JavaScript.
              With several years of experience in building responsive and user-friendly websites,
              I strive to create digital experiences that are both beautiful and functional.
            </p>
            <p className="text-muted-foreground mb-6">
              My journey in web development started in 2018, and since then,
              I've worked on various projects ranging from small business websites to complex web applications.
              I'm continuously learning and adapting to new technologies and methodologies to stay
              at the forefront of web development.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Location:</h4>
                <p className="text-muted-foreground">San Francisco, CA</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Email:</h4>
                <p className="text-muted-foreground">your.email@example.com</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Education:</h4>
                <p className="text-muted-foreground">B.S. Computer Science</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Experience:</h4>
                <p className="text-muted-foreground">5+ Years</p>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
