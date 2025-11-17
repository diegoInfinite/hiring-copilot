import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Recruitment process stages
const stages = [
  "Applied",
  "AI Screening",
  "L1 Interview",
  "Assignment",
  "Hired",
];

// Temporary mock data
type Candidate = {
  id: number;
  name: string;
  email: string;
  job: string;
  score: number;
  stage: string;
};

const initialCandidates: Candidate[] = [
  {
    id: 1,
    name: "Carlos Rodriguez",
    email: "carlos@example.com",
    job: "Full Stack Developer",
    score: 82,
    stage: "Applied",
  },
  {
    id: 2,
    name: "Maria Ramirez",
    email: "maria@example.com",
    job: "Data Analyst",
    score: 90,
    stage: "AI Screening",
  },
  {
    id: 3,
    name: "Pedro Jimenez",
    email: "pedro@example.com",
    job: "DevOps Engineer",
    score: 76,
    stage: "L1 Interview",
  },
];

export default function HrPage() {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);

  // Fired when dragging begins
  function handleDragStart(e: React.DragEvent, candidateId: number) {
    e.dataTransfer.setData("candidateId", candidateId.toString());
  }

  // Allow dropping
  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  // Handle dropping candidate into a new stage
  function handleDrop(e: React.DragEvent, newStage: string) {
    const candidateId = Number(e.dataTransfer.getData("candidateId"));

    setCandidates((prev) =>
      prev.map((c) =>
        c.id === candidateId ? { ...c, stage: newStage } : c
      )
    );
  }

  return (
    <div className="bg-slate-950 min-h-screen flex flex-col text-white">
      <Navbar />

      <main className="flex-grow container mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-6">Recruitment Dashboard (HR)</h1>

        {/* Kanban board */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {stages.map((stage) => (
            <div
              key={stage}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stage)}
              className="bg-slate-900 p-4 rounded-lg border border-slate-800 min-h-[400px]"
            >
              <h2 className="text-xl font-semibold mb-3">{stage}</h2>

              {candidates
                .filter((c) => c.stage === stage)
                .map((candidate) => (
                  <div
                    key={candidate.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, candidate.id)}
                    className="bg-slate-800 p-3 rounded-lg mb-3 shadow-md cursor-move border border-slate-700"
                  >
                    <p className="font-bold">{candidate.name}</p>
                    <p className="text-sm text-slate-400">{candidate.email}</p>
                    <p className="text-sm text-blue-300 mt-1">
                      AI Score: {candidate.score}
                    </p>

                    <button
                      onClick={() => navigate(`/hr/candidate/${candidate.id}`)}
                      className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-1 rounded"
                    >
                      View details
                    </button>
                  </div>
                ))}

              {candidates.filter((c) => c.stage === stage).length === 0 && (
                <p className="text-slate-500 text-sm">No candidates</p>
              )}
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}