import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="#home" className="text-2xl font-bold text-primary">
          Portfolio
        </a>

        <div className="hidden md:flex items-center space-x-8">
          <a
            href="#home"
            onClick={() => scrollToSection("home")}
            className="nav-link"
          >
            Home
          </a>
          <a
            href="#about"
            onClick={() => scrollToSection("about")}
            className="nav-link"
          >
            About
          </a>
          <a
            href="#projects"
            onClick={() => scrollToSection("projects")}
            className="nav-link"
          >
            Projects
          </a>
          <a
            href="#skills"
            onClick={() => scrollToSection("skills")}
            className="nav-link"
          >
            Skills
          </a>
          <a
            href="#contact"
            onClick={() => scrollToSection("contact")}
            className="nav-link"
          >
            Contact
          </a>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />

          <button
            className="md:hidden focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            <a
              href="#home"
              onClick={() => scrollToSection("home")}
              className="nav-link py-2"
            >
              Home
            </a>
            <a
              href="#about"
              onClick={() => scrollToSection("about")}
              className="nav-link py-2"
            >
              About
            </a>
            <a
              href="#projects"
              onClick={() => scrollToSection("projects")}
              className="nav-link py-2"
            >
              Projects
            </a>
            <a
              href="#skills"
              onClick={() => scrollToSection("skills")}
              className="nav-link py-2"
            >
              Skills
            </a>
            <a
              href="#contact"
              onClick={() => scrollToSection("contact")}
              className="nav-link py-2"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
