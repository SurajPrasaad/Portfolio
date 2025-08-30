// src/components/Skills.jsx
import { motion } from "motion/react";

const skillsData = [
  { name: "JavaScript", level: 90 },
  { name: "React", level: 85 },
  { name: "Node.js", level: 80 },
  { name: "MongoDB", level: 75 },
  { name: "Tailwind CSS", level: 90 },
  { name: "Git & GitHub", level: 85 },
];

export default function Skills() {
  return (
    <section id="skills" className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
          My Skills
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {skillsData.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="bg-gray-50 p-6 rounded-xl shadow-lg flex flex-col items-center hover:shadow-2xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold mb-4">{skill.name}</h3>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: index * 0.15 }}
                  className="h-4 bg-indigo-600 rounded-full"
                ></motion.div>
              </div>
              <span className="mt-2 text-sm text-gray-600">{skill.level}%</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
