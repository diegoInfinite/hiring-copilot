import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

type JobCardProps = {
  id: string | number;
  title: string;
  company: string;
  location: string;
};

export default function JobCard({ id, title, company, location }: JobCardProps) {
  const navigate = useNavigate();
  const { user } = useAuth();

  function handleApply() {
    if (!user) {
      // Not logged in → go to login
      navigate("/login");
    } else {
      // Logged in → go to job detail
      navigate(`/job/${id}`);
    }
  }

  return (
    <div className="p-5 bg-slate-900 rounded-xl text-white shadow-md border border-slate-800 hover:bg-slate-800 transition">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-slate-300">{company}</p>
      <p className="text-slate-400 text-sm">{location}</p>

      <button
        onClick={handleApply}
        className="
          mt-4 inline-block bg-blue-600 
          px-4 py-2 rounded-md 
          hover:bg-blue-700 transition
        "
      >
        Apply
      </button>
    </div>
  );
}