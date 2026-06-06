import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaProjectDiagram,
  FaLayerGroup,
} from "react-icons/fa";

import { MdOutlineWorkOutline } from "react-icons/md";

export default function ProjectMentor() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const [projectIdea, setProjectIdea] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("Beginner");

  const handleGenerate = () => {
    if (!projectIdea.trim()) {
      alert("Please enter a project idea");
      return;
    }

    setLoading(true);
    setShowResult(false);

    setTimeout(() => {
      setLoading(false);
      setShowResult(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Glow */}
      <div
        className="
          absolute
          top-20
          left-1/2
          -translate-x-1/2
          w-[700px]
          h-[700px]
          bg-purple-700
          rounded-full
          blur-[200px]
          opacity-10
        "
      />

      {/* Arc */}
      <div
        className="
          absolute
          top-32
          left-1/2
          -translate-x-1/2
          w-[1000px]
          h-[500px]
          border-t
          border-purple-500/20
          rounded-t-full
        "
      />

      {/* Stars */}
      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle,_rgba(255,255,255,0.3)_1px,_transparent_1px)]
          bg-[length:60px_60px]
          opacity-10
        "
      />

      <div className="relative z-10">
        {/* Navbar */}
        <div
          className="
            flex
            justify-between
            items-center
            px-10
            py-6
            border-b
            border-white/10
          "
        >
          <button
            onClick={() => navigate("/")}
            className="
              flex
              items-center
              gap-2
              border
              border-purple-500/30
              px-5
              py-3
              rounded-xl
              hover:bg-purple-500/10
            "
          >
            <FaArrowLeft />
            Back
          </button>

          <h2 className="text-2xl font-bold text-purple-300">
            LaunchPad AI
          </h2>

          <div className="w-[100px]" />
        </div>

        <div className="max-w-6xl mx-auto px-6 pt-20">
          <h1 className="text-7xl font-bold text-center mb-6">
            Project Mentor
          </h1>

          <p className="text-gray-400 text-center text-xl mb-12">
            Transform your project idea into a complete development roadmap.
          </p>

          {/* Form */}
          <div
            className="
              bg-white/5
              backdrop-blur-xl
              border
              border-white/10
              rounded-3xl
              p-10
            "
          >
            <div className="mb-8">
              <label className="flex items-center gap-3 text-lg mb-4">
                <FaProjectDiagram className="text-purple-400" />
                Describe your project idea
              </label>

              <textarea
                value={projectIdea}
                onChange={(e) => setProjectIdea(e.target.value)}
                rows="6"
                placeholder="Example: AI Hostel Management System"
                className="
                  w-full
                  bg-white/5
                  backdrop-blur-md
                  border
                  border-white/10
                  rounded-xl
                  p-4
                  focus:outline-none
                  focus:border-purple-500
                "
              />
            </div>

            <div>
              <label className="flex items-center gap-3 text-lg mb-4">
                <MdOutlineWorkOutline className="text-purple-400" />
                Experience Level
              </label>

              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="
                  w-full
                  bg-white/5
                  backdrop-blur-md
                  border
                  border-white/10
                  rounded-xl
                  p-4
                  mb-10
                "
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleGenerate}
                className="
                  bg-gradient-to-r
                  from-purple-600
                  to-purple-500
                  px-8
                  py-4
                  rounded-xl
                  font-semibold
                  shadow-[0_0_30px_rgba(168,85,247,0.35)]
                  hover:scale-105
                  transition
                "
              >
                Generate Roadmap →
              </button>
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div
              className="
                mt-10
                bg-white/5
                backdrop-blur-xl
                border
                border-white/10
                rounded-3xl
                p-10
                text-center
              "
            >
              <div
                className="
                  w-16
                  h-16
                  border-4
                  border-purple-500
                  border-t-transparent
                  rounded-full
                  animate-spin
                  mx-auto
                  mb-6
                "
              />

              <h2 className="text-2xl font-bold">
                Generating Roadmap...
              </h2>

              <p className="text-gray-400 mt-3">
                Analyzing project requirements...
              </p>
            </div>
          )}

          {/* Results */}
          {showResult && (
            <div
              className="
                mt-10
                bg-white/5
                backdrop-blur-xl
                border
                border-white/10
                rounded-3xl
                p-8
              "
            >
              <h2 className="text-3xl font-bold mb-2">
                Generated Roadmap
              </h2>

              <p className="text-gray-400 mb-8">
                Personalized project recommendations.
              </p>

              {/* Overview */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
                <h3 className="text-purple-400 text-xl mb-4">
                  Project Overview
                </h3>

                <p>
                  <strong>Project:</strong> {projectIdea}
                </p>

                <p className="mt-3">
                  <strong>Experience:</strong> {experienceLevel}
                </p>
              </div>

              {/* Architecture */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
                <h3 className="text-purple-400 text-xl mb-4">
                  Suggested Architecture
                </h3>

                <pre className="text-gray-300 overflow-auto whitespace-pre-wrap">
{`Frontend
├── React
├── Tailwind CSS
└── Axios

Backend
├── Node.js
├── Express
└── REST API

Database
└── MySQL

Deployment
├── Vercel
└── Render`}
                </pre>
              </div>

              {/* Cards */}
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="flex items-center gap-2 text-purple-400 mb-6">
                    <FaLayerGroup />
                    Recommended Stack
                  </h3>

                  <ul className="space-y-2">
                    <li>React</li>
                    <li>Node.js</li>
                    <li>MySQL</li>
                    <li>Tailwind CSS</li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-purple-400 mb-6">
                    Development Roadmap
                  </h3>

                  <ul className="space-y-2">
                    <li>Phase 1: Planning</li>
                    <li>Phase 2: Database Design</li>
                    <li>Phase 3: Backend Development</li>
                    <li>Phase 4: Frontend Development</li>
                    <li>Phase 5: Deployment</li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-purple-400 mb-6">
                    Database Design
                  </h3>

                  <ul className="space-y-2">
                    <li>Users</li>
                    <li>Projects</li>
                    <li>Roadmaps</li>
                    <li>History</li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-purple-400 mb-6">
                    API Suggestions
                  </h3>

                  <ul className="space-y-2">
                    <li>POST /generate-roadmap</li>
                    <li>POST /save-project</li>
                    <li>GET /projects</li>
                    <li>GET /project/:id</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-purple-400 text-xl mb-4">
                  Deployment Guide
                </h3>

                <ul className="space-y-2">
                  <li>Frontend → Vercel</li>
                  <li>Backend → Render</li>
                  <li>Database → Railway / MySQL</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}