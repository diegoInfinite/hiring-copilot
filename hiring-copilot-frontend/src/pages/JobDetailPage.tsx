import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();

  // Temporary mock job (will be loaded from backend)
  const job = {
    id,
    title: "Full Stack Developer",
    location: "Remote",
    company: "Infinite",
    description:
      "We are looking for a Full Stack Developer with experience in React, Node.js, and SQL/NoSQL databases.",
    requirements: [
      "3+ years of experience in web development",
      "Strong experience with React",
      "Knowledge of REST APIs",
    ],
  };

  return (
    <div className="bg-slate-950 min-h-screen flex flex-col text-white">
      <Navbar />

      <main className="flex-grow container mx-auto px-6 py-10 max-w-3xl">
        {/* Job Header */}
        <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
        <p className="text-slate-300">{job.company}</p>
        <p className="text-slate-400 mb-6">{job.location}</p>

        {/* Description */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Job Description</h2>
          <p className="leading-relaxed text-slate-300">{job.description}</p>
        </section>

        {/* Requirements */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Requirements</h2>
          <ul className="list-disc list-inside space-y-1 text-slate-300">
            {job.requirements.map((req, idx) => (
              <li key={idx}>{req}</li>
            ))}
          </ul>
        </section>

        {/* Actions */}
        <div className="flex gap-3">
          <Link
            to={`/apply/${job.id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md"
          >
            Apply Now
          </Link>

          <Link
            to="/"
            className="text-slate-300 hover:text-white underline underline-offset-4"
          >
            Back to offers
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}