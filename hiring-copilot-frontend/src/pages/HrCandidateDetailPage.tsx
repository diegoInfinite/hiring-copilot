import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Temporary mock data (will come from backend)
const mockCandidates: Record<
  string,
  {
    name: string;
    email: string;
    phone: string;
    job: string;
    score: number;
    stage: string;
    cv: string;
    aiAnalysis: string;
  }
> = {
  "1": {
    name: "Carlos Rodriguez",
    email: "carlos@example.com",
    phone: "1234-5678",
    job: "Full Stack Developer",
    score: 82,
    stage: "Applied",
    cv: "cv_carlos.pdf",
    aiAnalysis: "Carlos has strong skills in React and Node.js...",
  },
  "2": {
    name: "Maria Ramirez",
    email: "maria@example.com",
    phone: "2222-9876",
    job: "Data Analyst",
    score: 90,
    stage: "AI Screening",
    cv: "cv_maria.pdf",
    aiAnalysis: "Highly experienced with Python and SQL...",
  },
};

export default function HrCandidateDetailPage() {
  const { id } = useParams();
  const candidate = id ? mockCandidates[id] : null;

  if (!candidate) {
    return (
      <div className="bg-slate-950 text-white min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <p className="text-red-400 text-lg">Candidate not found.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-slate-950 text-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto px-6 py-10 max-w-3xl">
        {/* Back link */}
        <Link
          to="/hr"
          className="text-blue-400 hover:text-blue-300 underline mb-6 inline-block"
        >
          ← Back to HR dashboard
        </Link>

        {/* Candidate Header */}
        <h1 className="text-3xl font-bold mb-1">{candidate.name}</h1>
        <p className="text-slate-400">{candidate.email}</p>
        <p className="text-slate-400">Phone: {candidate.phone}</p>
        <p className="text-slate-400 mb-6">Position applied: {candidate.job}</p>

        {/* Candidate Information */}
        <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 mb-6">
          <h2 className="text-xl font-semibold mb-3">Candidate Information</h2>
          <p>
            <strong>Stage:</strong> {candidate.stage}
          </p>
          <p>
            <strong>AI Score:</strong> {candidate.score}
          </p>
          <p>
            <strong>Resume:</strong> {candidate.cv}
          </p>
        </div>

        {/* AI Analysis */}
        <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 mb-6">
          <h2 className="text-xl font-semibold mb-3">AI Summary</h2>
          <p className="text-slate-300 leading-relaxed">{candidate.aiAnalysis}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
            Generate L1 Questions (AI)
          </button>

          <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded">
            Generate Assignment (AI)
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}