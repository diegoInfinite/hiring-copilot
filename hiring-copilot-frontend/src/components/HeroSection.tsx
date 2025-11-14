export default function HeroSection() {
  return (
    <section
      id="hero"
      className="flex flex-col items-center justify-center text-center py-32 px-6 bg-slate-950 text-white"
    >
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
        Welcome to the AI Hiring Portal
      </h1>

      <p className="text-lg md:text-xl text-slate-300 max-w-2xl">
        Discover job opportunities designed to help you grow your career with the power of AI.
      </p>

      <a
        href="#jobs"
        className="
          mt-10 bg-blue-600 hover:bg-blue-700 
          text-white px-8 py-3 rounded-md 
          text-lg font-semibold transition
        "
      >
        Explore job openings
      </a>
    </section>
  );
}