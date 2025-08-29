// src/components/Projects.jsx
import { motion } from "motion/react";

const projectsData = [
  {
    _id: "1",
    title: "E-commerce Store",
    description: "A full-stack MERN e-commerce platform with Stripe payments",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
    githubLink: "https://github.com/yourusername/ecommerce-store",
    liveLink: "https://ecommerce-store.vercel.app",
    images: ["https://example.com/image1.png", "https://example.com/image2.png"],
  },
  {
    _id: "2",
    title: "Portfolio Website",
    description: "Personal portfolio website built with React and Tailwind CSS",
    technologies: ["React", "Tailwind CSS"],
    githubLink: "https://github.com/yourusername/portfolio",
    liveLink: "https://yourportfolio.com",
    images: ["https://example.com/portfolio.png"],
  },
  {
    _id: "3",
    title: "Chat App",
    description: "Real-time chat application using Socket.io",
    technologies: ["Node.js", "Express", "Socket.io", "React"],
    githubLink: "https://github.com/yourusername/chat-app",
    liveLink: "https://chat-app.vercel.app",
    images: ["https://example.com/chat.png"],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="w-full min-h-screen py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
          My Projects
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projectsData.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="relative group bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
            >
              {project.images && project.images[0] && (
                <div className="relative">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              )}

              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-700 mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies?.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-200 text-gray-800 text-sm rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-4">
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors"
                    >
                      GitHub
                    </a>
                  )}
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-gray-800 text-gray-800 rounded-md hover:bg-gray-100 transition-colors"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
