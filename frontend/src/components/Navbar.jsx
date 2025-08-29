// src/components/CreativeNavbar.jsx
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function CreativeNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Blogs", href: "#blogs" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300  ${
        scrolled ? "backdrop-blur-md bg-white/30 shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-2xl font-bold text-gray-900">Portfolio</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setActive(link.href)}
                className={`relative font-medium text-gray-700 hover:text-black transition-colors ${
                  active === link.href ? "text-black after:w-full" : ""
                } after:content-[''] after:block after:h-0.5 after:w-0 after:bg-black after:transition-all`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Overlay Menu */}
      {/* Mobile Overlay Menu */}
      <div
        className={`fixed inset-0 bg-white/90 backdrop-blur-md z-40 flex flex-col justify-center items-center space-y-6
    transform transition-all duration-500 ease-in-out
    ${
      isOpen
        ? "opacity-100 translate-y-0"
        : "opacity-0 -translate-y-10 pointer-events-none"
    }
  `}
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="text-2xl font-semibold text-gray-800 hover:text-black transition-colors"
          >
            {link.label.toUpperCase()}
          </a>
        ))}
      </div>
    </nav>
  );
}
