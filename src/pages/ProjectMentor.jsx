import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { generateRoadmap } from "../services/projectService";

import {
  FaArrowLeft,
  FaProjectDiagram,
  FaLayerGroup,
} from "react-icons/fa";

import { MdOutlineWorkOutline } from "react-icons/md";

export default function ProjectMentor() {
  const navigate = useNavigate();
  const chatEndRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [roadmapData, setRoadmapData] = useState(null);
  const [projectIdea, setProjectIdea] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("Beginner");
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [asking, setAsking] = useState(false);
useEffect(() => {
  chatEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages]);
  const handleGenerate = async () => {
  if (!projectIdea.trim()) {
    alert("Please enter a project idea");
    return;
  }

  try {
    setLoading(true);
    setShowResult(false);

    const result = await generateRoadmap(
      projectIdea,
      experienceLevel
    );
    console.log(result);

    setRoadmapData(result);
    setMessages([
  {
    role: "assistant",
    content:
      "Hi! I'm your AI Project Mentor. Ask me anything about this roadmap, technologies, architecture, database design, deployment, or implementation."
  }
]);
    setLoading(false);
    setShowResult(true);
  } catch (error) {
    console.error(error);

    setLoading(false);

    alert("Failed to generate roadmap");
  }
};
const handleAskAI = async () => {
  if (!question.trim()) return;

  try {
    setAsking(true);

    const response = await fetch(
      "http://127.0.0.1:8000/api/project/ask",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectIdea,
          roadmap: roadmapData,
          question,
        }),
      }
    );

    const data = await response.json();

    setMessages((prev) => [
  ...prev,
  {
    role: "user",
    content: question,
  },
  {
    role: "assistant",
    content: data.answer,
  },
]);

setQuestion("");
  } catch (error) {
    console.error(error);
    console.error("Failed to get answer");
  }

  setAsking(false);
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

          <h2 className="text-2xl font-bold text-white font-mono">
            Mentor.ai
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
                rows="6"
                placeholder="Example: AI Hostel Management System"
                onChange={(e) => setProjectIdea(e.target.value)}
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
                  bg-zinc-900
                  text-white
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

                <p className="text-gray-300 whitespace-pre-wrap">
  {roadmapData?.overview}
</p>
              </div>

              {/* Architecture */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
                <h3 className="text-purple-400 text-xl mb-4">
                  Suggested Architecture
                </h3>

                <p className="text-gray-300 whitespace-pre-wrap">
  {roadmapData?.architecture}
</p>
              </div>

              {/* Cards */}
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="flex items-center gap-2 text-purple-400 mb-6">
                    <FaLayerGroup />
                    Recommended Stack
                  </h3>

                  <div className="mt-6 space-y-4 max-h-[500px] overflow-y-auto">
  {roadmapData?.techStack?.map((item, index) => (
    <div
      key={index}
      className="bg-white/5 p-4 rounded-lg border border-white/10"
    >
      <h4 className="text-purple-300 font-semibold text-lg">
        {item.name}
      </h4>

      <p className="text-gray-400 mt-2">
        {item.reason}
      </p>
    </div>
  ))}
</div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 max-h-[600px] overflow-y-auto">
                  <h3 className="text-purple-400 mb-6">
                    Development Roadmap
                  </h3>

                  <ul className="space-y-2">
  {roadmapData?.roadmap?.map((item, index) => (
    <li key={index}>{item}</li>
  ))}
</ul>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 max-h-[600px] overflow-y-auto">
  <h3 className="text-purple-400 mb-6">
    Database Design
  </h3>

  <h4 className="font-semibold mb-3">
    Collections
  </h4>

  <ul className="space-y-2 mb-6">
    {roadmapData?.database?.collections?.map(
      (collection, index) => (
        <li key={index}>
          • {collection}
        </li>
      )
    )}
  </ul>

  <h4 className="font-semibold mb-3">
    Fields
  </h4>

  {Object.entries(
    roadmapData?.database?.fields || {}
  ).map(([table, fields]) => (
    <div key={table} className="mb-4">
      <p className="text-purple-300 font-medium">
        {table}
      </p>

      <ul className="ml-4 mt-2 space-y-1">
        {fields.map((field, idx) => (
          <li key={idx}>• {field}</li>
        ))}
      </ul>
    </div>
  ))}
</div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 max-h-[500px] overflow-y-auto">
                  <h3 className="text-purple-400 mb-6">
                    API Suggestions
                  </h3>

                  <ul className="space-y-2">
  {roadmapData?.apis?.map((api, index) => (
    <li key={index}>{api}</li>
  ))}
</ul>
                </div>
              </div>

              <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-purple-400 text-xl mb-4">
                  Deployment Guide
                </h3>

                <ul className="space-y-2">
  {roadmapData?.deployment?.map((item, index) => (
    <li key={index}>{item}</li>
  ))}
</ul>
              </div>

<div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6">
  <h3 className="text-purple-400 text-xl mb-4">
    Ask AI Mentor
  </h3>

  <textarea
  value={question}
  onChange={(e) => setQuestion(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAskAI();
    }
  }}
  placeholder="Ask anything about this roadmap..."
  rows="4"
    className="
      w-full
      bg-white/5
      border
      border-white/10
      rounded-xl
      p-4
      mb-4
      focus:outline-none
      focus:border-purple-500
    "
  />

  <button
    onClick={handleAskAI}
    className="
      bg-purple-600
      px-6
      py-3
      rounded-xl
      hover:bg-purple-700
      transition
    "
  >
    Ask AI
  </button>

  {asking && (
    <p className="mt-4 text-gray-400">
      Thinking...
    </p>
  )}

  {messages.map((msg, index) => (
  <div
    key={index}
    className={`flex ${
      msg.role === "user"
        ? "justify-end"
        : "justify-start"
    }`}
  >
    <div
      className={
        msg.role === "user"
          ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 p-4 rounded-2xl max-w-[75%]"
          : "bg-white/10 border border-white/10 p-4 rounded-2xl max-w-[75%]"
      }
    >
      <p className="whitespace-pre-wrap">
        {msg.content}
      </p>
    </div>
  </div>
))}
    <div ref={chatEndRef}></div>
  </div>

</div>

          )}
        </div>
      </div>
    </div>
  );
}