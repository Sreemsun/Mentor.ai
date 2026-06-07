import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/project";

export const generateRoadmap = async (projectIdea, experienceLevel) => {
  const response = await axios.post(
    `${API_URL}/generate-roadmap`,
    {
      projectIdea,
      experienceLevel,
    }
  );

  return response.data;
};