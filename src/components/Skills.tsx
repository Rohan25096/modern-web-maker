
import { useEffect, useRef, useState } from "react";

interface Skill {
  name: string;
  level: number;
  icon?: string;
}

const SkillBar = ({ skill }: { skill: Skill }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium">{skill.name}</h3>
        <span className="text-sm text-muted-foreground">{skill.level}%</span>
      </div>
      <div className="skill-bar">
        <div 
          className="skill-progress"
          style={{ "--progress-width": `${skill.level}%` } as React.CSSProperties}
        ></div>
      </div>
    </div>
  );
};

const Skills = () => {
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

  const frontendSkills: Skill[] = [
    { name: "HTML", level: 90 },
    { name: "CSS", level: 85 },
    { name: "JavScript", level: 80 },
    { name: "TypeScript", level: 75 }
  ];

  const backendSkills: Skill[] = [
    { name: "Node.js", level: 75 },
    { name: "Express", level: 70 },
    { name: "Python", level: 65 },
    { name: "SQL", level: 60 },
  ];

  const otherSkills: Skill[] = [
    { name: "Git", level: 85 },
    { name: "Figma", level: 60 },
    { name: "Lovable", level: 70 },
    { name: "Scikit-Learn", level: 85},
    { name: "Neural Networks", level: 85},
  ];

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary">Skills</span>
        </h2>

        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div>
            <h3 className="text-xl font-semibold mb-6 pb-2 border-b">Frontend</h3>
            {frontendSkills.map((skill, index) => (
              <SkillBar key={index} skill={skill} />
            ))}
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-6 pb-2 border-b">Backend</h3>
            {backendSkills.map((skill, index) => (
              <SkillBar key={index} skill={skill} />
            ))}
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-6 pb-2 border-b">Other Skills</h3>
            {otherSkills.map((skill, index) => (
              <SkillBar key={index} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
