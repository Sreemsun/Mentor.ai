import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function PlacementMentor() {
  const navigate = useNavigate();

  const [degree, setDegree] = useState("");
  const [year, setYear] = useState("");
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [asking, setAsking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [careerData, setCareerData] = useState(null);

  const handleGenerate = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://127.0.0.1:8000/api/placement/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            degree,
            year,
            skills,
            interests,
            targetRole,
          }),
        }
      );

      const data = await response.json();

      setCareerData(data);
      setMessages([
  {
    role: "assistant",
    content:
      "Hi! I'm your Placement Mentor. Ask me anything about placements, internships, skills, interviews, resumes, or career planning."
  }
]);
      setShowResult(true);
    } catch (error) {
      console.error(error);
      alert("Failed to generate placement roadmap");
    }

    setLoading(false);
  };
  const handleAskAI = async () => {
  if (!question.trim()) return;

  try {
    setAsking(true);

    const response = await fetch(
      "http://127.0.0.1:8000/api/placement/ask",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          careerData,
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
  }

  setAsking(false);
};
  return (
    <div className="min-h-screen bg-black text-white">

      {/* Navbar */}
      <div className="flex justify-between items-center px-10 py-6 border-b border-white/10">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 border border-purple-500/30 px-5 py-3 rounded-xl"
        >
          <FaArrowLeft />
          Back
        </button>

        <h2 className="text-2xl font-bold text-purple-300">
          Mentor.ai
        </h2>

        <div className="w-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-16">

        <h1 className="text-6xl font-bold text-center mb-6">
          Placement Mentor
        </h1>

        <p className="text-center text-gray-400 text-xl mb-12">
          Get personalized placement preparation guidance.
        </p>

        {/* FORM */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-10">

          <div className="space-y-6">

            <input
              type="text"
              placeholder="Degree (B.Tech CSE)"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              className="w-full p-4 rounded-xl bg-white/5 border border-white/10"
            />

            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full p-4 rounded-xl bg-zinc-900 text-white border border-white/10"
            >
              <option value="">Select Year</option>
              <option>1st Year</option>
              <option>2nd Year</option>
              <option>3rd Year</option>
              <option>Final Year</option>
            </select>

            <textarea
              rows="3"
              placeholder="Skills (React, Node.js, MongoDB)"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full p-4 rounded-xl bg-white/5 border border-white/10"
            />

            <input
              type="text"
              placeholder="Interest (Web Development)"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              className="w-full p-4 rounded-xl bg-white/5 border border-white/10"
            />

            <input
              type="text"
              placeholder="Target Role (Full Stack Developer)"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full p-4 rounded-xl bg-white/5 border border-white/10"
            />
          </div>

          <div className="flex justify-center mt-8">
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
              "
            >
              Generate Placement Plan
            </button>
          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="mt-10 text-center">
            <p>Generating career roadmap...</p>
          </div>
        )}

        {/* RESULTS */}
{showResult && careerData && (
  <>
    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-6 text-center">
      <h3 className="text-purple-400 text-xl mb-4">
        Career Readiness Score
      </h3>

      <div
        className={`text-6xl font-bold ${
          careerData?.careerScore >= 80
            ? "text-green-400"
            : careerData?.careerScore >= 60
            ? "text-yellow-400"
            : "text-red-400"
        }`}
      >
        {careerData?.careerScore}/100
      </div>

      <p className="text-gray-400 mt-3">
        Based on your current profile and target role.
      </p>
    </div>

    {/* CARDS */}
    <div className="mt-10 grid md:grid-cols-2 gap-6">

            <div className="bg-white/5 p-6 rounded-2xl">
              <h3 className="text-purple-400 mb-4">
                Recommended Roles
              </h3>

              {careerData.recommendedRoles?.map((role, index) => (
                <p key={index}>• {role}</p>
              ))}
            </div>

            <div className="bg-white/5 p-6 rounded-2xl">
              <h3 className="text-purple-400 mb-4">
                Skill Gap Analysis
              </h3>

              {careerData.skillGap?.map((skill, index) => (
                <p key={index}>• {skill}</p>
              ))}
            </div>

            <div className="bg-white/5 p-6 rounded-2xl">
              <h3 className="text-purple-400 mb-4">
                Learning Roadmap
              </h3>

              {careerData.roadmap?.map((item, index) => (
                <p key={index}>• {item}</p>
              ))}
            </div>

            <div className="bg-white/5 p-6 rounded-2xl">
              <h3 className="text-purple-400 mb-4">
                Recommended Projects
              </h3>

              {careerData.projects?.map((project, index) => (
                <p key={index}>• {project}</p>
              ))}
            </div>

            <div className="bg-white/5 p-6 rounded-2xl">
              <h3 className="text-purple-400 mb-4">
                Interview Topics
              </h3>

              {careerData.interviewTopics?.map((topic, index) => (
                <p key={index}>• {topic}</p>
              ))}
            </div>

            <div className="bg-white/5 p-6 rounded-2xl">
  <h3 className="text-purple-400 mb-4">
    Internship Strategy
  </h3>

  {careerData.internshipStrategy?.map((item, index) => (
    <p key={index}>• {item}</p>
  ))}
</div>

<div className="bg-white/5 p-6 rounded-2xl">
  <h3 className="text-purple-400 mb-4">
    Learning Resources
  </h3>

  {careerData.learningResources?.map((resource, index) => (
    <p key={index}>• {resource}</p>
  ))}
</div>
</div>
</>
)}
<div className="mt-10 bg-white/5 p-6 rounded-2xl">
  <h3 className="text-purple-400 text-xl mb-4">
    Ask Placement Mentor
  </h3>

  <textarea
    value={question}
    onChange={(e) => setQuestion(e.target.value)}
    placeholder="Ask about interviews, resumes, internships..."
    rows="4"
    className="w-full p-4 rounded-xl bg-white/5 border border-white/10"
  />

  <button
    onClick={handleAskAI}
    className="mt-4 bg-purple-600 px-6 py-3 rounded-xl"
  >
    Ask AI
  </button>

  {asking && (
    <p className="mt-4 text-gray-400">
      Thinking...
    </p>
  )}

  <div className="mt-6 space-y-4">
    {messages.map((msg, index) => (
      <div
        key={index}
        className={
          msg.role === "user"
            ? "bg-purple-600 p-4 rounded-xl ml-auto max-w-[80%]"
            : "bg-white/10 p-4 rounded-xl max-w-[80%]"
        }
      >
        <div className="whitespace-pre-wrap leading-5">
  {msg.content}
</div>
      </div>
    ))}
  </div>
</div>
            </div> 
      </div>
  );
}