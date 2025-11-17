import { useParams, Link } from "react-router-dom";
import { type FormEvent, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ApplyPage() {
  const { id } = useParams<{ id: string }>(); // comes from /apply/:id

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  // If no ID exists (invalid URL)
  if (!id) {
    return (
      <div className="bg-slate-950 min-h-screen text-white flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <p className="text-red-400">
            The vacancy could not be identified. Please return to the job offers.
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  // Temporary mock job title mapping (later replaced with API data)
  const jobData: Record<string, any> = {
    "1": { title: "Full Stack Developer" },
    "2": { title: "Data Analyst" },
    "3": { title: "DevOps Engineer" },
  };

  const jobTitle = jobData[id]?.title || "Vacancy";

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!fullName || !email || !phone || !cvFile) {
      setMessage("Please complete all fields and attach your resume.");
      return;
    }

    // TODO: Replace with API call to .NET backend
    // await api.applyToJob({ id, fullName, email, phone, cvFile })

    setMessage(`Application successfully submitted for: ${jobTitle}.`);

    // Optional reset
    // setFullName("");
    // setEmail("");
    // setPhone("");
    // setCvFile(null);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    setCvFile(file);
  }

  return (
    <div className="bg-slate-950 min-h-screen flex flex-col text-white">
      <Navbar />

      <main className="flex-grow container mx-auto px-6 py-10 max-w-3xl">
        <h1 className="text-3xl font-bold mb-2">Apply to Job</h1>
        <p className="text-slate-400 mb-6">
          Position:{" "}
          <span className="font-semibold text-white">{jobTitle}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block mb-1 text-sm text-slate-300">
              Full Name
            </label>
            <input
              type="text"
              className="w-full p-3 rounded-md bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm text-slate-300">
              Email Address
            </label>
            <input
              type="email"
              className="w-full p-3 rounded-md bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1 text-sm text-slate-300">
              Phone Number
            </label>
            <input
              type="tel"
              className="w-full p-3 rounded-md bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block mb-1 text-sm text-slate-300">
              Resume (PDF or Word)
            </label>

            {/* Styled button */}
            <label
              htmlFor="cvFile"
              className="inline-block cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Upload File
            </label>

            {/* Hidden input */}
            <input
              id="cvFile"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* File name preview */}
            {cvFile && (
              <p className="text-xs text-slate-400 mt-2">
                Selected file: {cvFile.name}
              </p>
            )}
          </div>

          {/* Feedback message */}
          {message && (
            <p className="text-sm mt-2 text-blue-300 bg-slate-800/60 px-3 py-2 rounded">
              {message}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
          >
            Submit Application
          </button>
        </form>

        {/* Back link */}
        <div className="mt-6">
          <Link
            to="/"
            className="text-slate-300 hover:text-white underline underline-offset-4"
          >
            Back to Job Listings
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}