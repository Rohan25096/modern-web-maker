
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
              I'm a passionate Machine Learning enthusiast with a deep curiosity for how intelligent systems can learn from data and improve over time.
              My journey began with a fascination for algorithms and quickly evolved into hands-on projects involving data analysis, predictive modeling, and neural networks. 
              I enjoy working with Python and am comfortable using tools like scikit-learn, TensorFlow, and PyTorch to build and evaluate models. 
              Beyond coding, I invest time in understanding the mathematical and statistical principles that power machine learning, as I believe strong fundamentals are key to creating impactful solutions.
            </p>
            <p className="text-muted-foreground mb-6">
              What excites me most about ML is its ability to solve real-world problems across industries like healthcare, finance, and automation. 
              I'm particularly drawn to projects that involve clean data pipelines, well-tuned models, and interpretable results. 
              I constantly seek to improve my skills by reading research papers, following thought leaders, and experimenting with new techniques.
              For me, Machine Learning is not just a technical field—it's a dynamic way of thinking that encourages continuous learning, creative problem-solving, and meaningful innovation.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Location:</h4>
                <p className="text-muted-foreground">Kolkata</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Email:</h4>
                <p className="text-muted-foreground">rohansahoo2509@gmail.com</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Education:</h4>
                <p className="text-muted-foreground">B-Tech CSE</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Experience:</h4>
                <p className="text-muted-foreground">1-2 Years</p>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary shadow-lg">
              <img
                src="./rohan_main.jpg"
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
