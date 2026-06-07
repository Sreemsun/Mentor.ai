import { useNavigate } from "react-router-dom";
export default function Hero() {
    const navigate = useNavigate();
  return (
    <section className="relative flex flex-col items-center justify-center text-center min-h-[85vh] overflow-hidden">

      {/* Purple Glow */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600 rounded-full blur-[150px] opacity-30"></div>

      {/* Content */}
      <div className="relative z-10">

        <div className="inline-block px-4 py-1 rounded-full bg-purple-500 text-white mb-6">
          Guiding Your Path to Success
        </div>

        <h1 className="text-white text-7xl font-bold">
          Intelligent Mentors
          <br />
          For Students
        </h1>

        <p className="text-gray-400 mt-5 text-lg">
          AI-powered project guidance and placement support for students.        </p>

        <div className="flex gap-4 justify-center mt-8">

          <button
            onClick={() => navigate("/project")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl"
            >
            Project Mentor →
            </button>

          <button
            onClick={() => navigate("/placement")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl"
            >
            Placement Mentor →
            </button>

        </div>

      </div>

    </section>
  );
}