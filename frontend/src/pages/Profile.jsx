import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Github, Linkedin, Twitter, Globe, Link } from "lucide-react";

export default function Profile() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please login.");
      setLoading(false);
      return;
    }

    async function fetchData() {
      try {
        // localStorage.setItem("token", "YOUR_TOKEN_HERE");
        localStorage.setItem( "token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YjA1OGEyOTQ0MGRlZGQxZjlhMjM5ZCIsImlhdCI6MTc1NjQwNDE0OSwiZXhwIjoxNzU3MDA4OTQ5fQ.MPgo32h2lOxl484LqGvzeL7ZCreTrBfyrxsFZKVtx9U" );
        const res = await fetch(
          "http://localhost:8000/api/users/68b058a29440dedd1f9a239d/profile",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) throw new Error("Failed to fetch data.");
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p className="text-center py-20 text-xl">Loading...</p>;
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;
  if (!data?.user) return <p className="text-center py-20 text-red-500">Failed to load data</p>;

  const { user, skills = [], projects = [], experiences = [], educations = [], achievements = [], blogs = [] } = data;
 const sectionStyle = "flex flex-col justify-center items-center px-6 py-16";
;

  return (
    <div className="w-full font-sans">

      {/* User Info */}
      <section className={`${sectionStyle} min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white`}>
       
        <motion.img 
          src={user.profileImage} 
          alt={user.name} 
          className="w-40 h-40 rounded-full shadow-2xl border-4 border-white mb-6"
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
        />
        <h1 className="text-5xl font-extrabold mb-2">{user.name}</h1>
        <p className="text-lg opacity-90">{user.bio}</p>
        <p className="text-sm mt-2">📧 {user.email}</p>

        <div className="flex gap-6 mt-6">
          {user.socialLinks && Object.entries(user.socialLinks).map(([key, link]) => (
            <a key={key} href={link} target="_blank" rel="noopener noreferrer"
              className="p-3 bg-white/20 rounded-full hover:scale-110 transition">
              {key === "github" && <Github />}
              {key === "linkedin" && <Linkedin />}
              {key === "twitter" && <Twitter />}
              {key === "website" && <Globe />}
            </a>
          ))}
        </div>
        
      </section>

      {/* Skills */}
      <section className={`${sectionStyle} bg-gray-100`}>
        <h2 className="text-4xl font-bold mb-10">Skills</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {skills.map(skill => (
            <motion.div key={skill._id}
              className="bg-white rounded-2xl p-6 shadow-lg flex flex-col items-center gap-2 hover:shadow-2xl transition"
              whileHover={{ scale: 1.05 }}>
              <img src={skill.icon} alt={skill.name} className="w-14 h-14" />
              <p className="font-semibold">{skill.name}</p>
              <p className="text-sm text-gray-500">{skill.category} · {skill.level}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className={`${sectionStyle} bg-white`}>
        <h2 className="text-4xl font-bold mb-10">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(project => (
            <motion.div key={project._id}
              className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 shadow-lg flex flex-col gap-4"
              whileHover={{ y: -6 }}>
              <h3 className="font-bold text-xl">{project.title}</h3>
              <p>{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="px-3 py-1 bg-indigo-200 rounded-full text-sm">{tech}</span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-4 mt-2">
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-indigo-600 flex items-center gap-1">
                  <Github size={16}/> Code
                </a>
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-green-600 flex items-center gap-1">
                  <Link size={16}/> Live
                </a>
              </div>

              {/* Images */}
              {project.images?.length > 0 && (
                <div className="flex gap-2 mt-2 overflow-x-auto">
                  {project.images.map((img, i) => (
                    <img key={i} src={img} alt="project" className="w-32 h-20 rounded object-cover"/>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className={`${sectionStyle} bg-green-50`}>
        <h2 className="text-4xl font-bold mb-10">Experience</h2>
        {experiences.map(exp => (
          <motion.div key={exp._id} className="bg-white p-6 rounded-2xl shadow-lg mb-6 max-w-2xl"
            whileHover={{ scale: 1.02 }}>
            <h3 className="text-lg font-semibold">{exp.title} – <span className="text-indigo-600">{exp.company}</span></h3>
            <p className="text-sm text-gray-500">{exp.location}</p>
            <p className="text-sm text-gray-500">
              {new Date(exp.startDate).toLocaleDateString()} - {exp.currentlyWorking ? "Present" : new Date(exp.endDate).toLocaleDateString()}
            </p>
            <p className="mt-2 text-gray-700">{exp.description}</p>
          </motion.div>
        ))}
      </section>

      {/* Education */}
      <section className={`${sectionStyle} bg-yellow-50`}>
        <h2 className="text-4xl font-bold mb-10">Education</h2>
        {educations.map(edu => (
          <motion.div key={edu._id} className="bg-white p-6 rounded-2xl shadow-lg mb-6 max-w-2xl"
            whileHover={{ scale: 1.02 }}>
            <h3 className="text-lg font-semibold">{edu.degree} – <span className="text-indigo-600">{edu.institution}</span></h3>
            <p className="text-sm text-gray-500">
              {new Date(edu.startDate).toLocaleDateString()} - {new Date(edu.endDate).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600">Grade: {edu.grade}</p>
            <p className="mt-2 text-gray-700">{edu.description}</p>
          </motion.div>
        ))}
      </section>

      {/* Achievements */}
      <section className={`${sectionStyle} bg-indigo-50`}>
        <h2 className="text-4xl font-bold mb-10">Achievements</h2>
        {achievements.map(a => (
          <motion.div key={a._id} className="bg-white p-6 rounded-2xl shadow-lg mb-6 max-w-2xl"
            whileHover={{ scale: 1.03 }}>
            <h3 className="text-lg font-semibold">{a.title}</h3>
            <p className="text-gray-600">{a.description}</p>
            <p className="text-sm text-gray-500">📅 {new Date(a.date).toLocaleDateString()}</p>
          </motion.div>
        ))}
      </section>

      {/* Blogs */}
      <section className={`${sectionStyle} bg-pink-50`}>
        <h2 className="text-4xl font-bold mb-10">Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.map(blog => (
            <motion.div key={blog._id} className="bg-white rounded-2xl p-6 shadow-lg flex flex-col gap-3 hover:shadow-xl"
              whileHover={{ y: -6 }}>
              {blog.featuredImage && (
                <img src={blog.featuredImage} alt={blog.title} className="rounded-lg h-40 object-cover"/>
              )}
              <h3 className="text-xl font-bold">{blog.title}</h3>
              <p className="text-gray-600 text-sm">{blog.content}</p>
              <div className="flex gap-2 flex-wrap mt-2">
                {blog.tags?.map((tag, i) => (
                  <span key={i} className="px-2 py-1 bg-pink-200 rounded-full text-xs">{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
