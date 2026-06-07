import { useNavigate } from "react-router-dom";
export default function FloatingButtons() {
  const navigate = useNavigate();
  return (
    <div className="fixed bottom-10 right-10 flex flex-col gap-3">

      <button onClick={() => navigate("/profile")} className="border border-purple-600 hover:bg-purple-600 text-white px-5 py-3 rounded-lg">
        Contact Us
      
      </button>

    </div>
  );
}