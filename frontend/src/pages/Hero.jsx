export default function Hero() {
  return (
    <section
      id="home"
      className="relative w-full h-screen flex flex-col justify-center items-center text-center bg-gradient-to-br from-gray-100 to-gray-200"
    >
      {/* Background overlay for depth */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

      <div className="relative z-10 max-w-3xl px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4">
          Hi, I'm Suraj Kumar
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8">
          A Fullstack Developer specializing in <span className="font-semibold">React</span> and <span className="font-semibold">Node.js</span>. I create modern, responsive, and performant web apps.
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="#projects"
            className="px-6 py-3 bg-black text-white font-medium rounded-lg shadow-md hover:bg-gray-900 transition-colors"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-gray-800 text-gray-800 font-medium rounded-lg hover:bg-gray-100 transition-colors"
          >
            Contact Me
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 animate-bounce">
        <a href="#about" className="text-gray-700">
          &#8595; Scroll Down
        </a>
      </div>
    </section>
  );
}
