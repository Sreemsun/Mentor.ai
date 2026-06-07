import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { generateRoadmap } from "../services/projectService";

import {
  FaArrowLeft,
  FaProjectDiagram,
  FaLayerGroup,
} from "react-icons/fa";

import { MdOutlineWorkOutline } from "react-icons/md";

export default function Profile() {
    const navigate = useNavigate();
  return (
    <section className="relative flex flex-col items-center justify-center text-center min-h-[85vh] overflow-hidden">

      {/* Purple Glow */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600 rounded-full blur-[150px] opacity-30"></div>

      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-white text-7xl font-bold font-mono">
          Developed By
          <h2 className="text-white text-5xl mt-4">
          Sreemsun Anand</h2>
        </h1>

        <div className="flex gap-4 justify-center mt-8 font-mono">

           <p className="text-white mt-5 text-lg">
             <a href="https://github.com/Sreemsun" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">
               GitHub Profile : Sreemsun
             </a>
             <br />
             <a href="https://www.linkedin.com/in/sreemsun-anand-a4655b291/" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">
               LinkedIn Profile : Sreemsun Anand
             </a>
           </p>


        </div>

      </div>

    </section>
  );
}