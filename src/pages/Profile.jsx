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
    <>
      <Navbar />
      <Hero />
      <FloatingButtons />
    </>
  );
}