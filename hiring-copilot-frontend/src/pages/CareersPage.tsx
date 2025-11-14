import Navbar from "../components/Navbar";
import JobCard from "../components/JobCard";
import Footer from "../components/Footer";

const jobs = [
  { id: "1", title: "Full Stack Developer", company: "Infinite", location: "Remote" },
  { id: "2", title: "Data Analyst", company: "Infinite", location: "San José, CR" },
  { id: "3", title: "DevOps Engineer", company: "Infinite", location: "Hybrid" },
];

export default function CareersPage() {
  return (
    <div className="bg-slate-950 min-h-screen flex flex-col text-white">
      <Navbar />

      {/* Job Listings Section */}
      <main id="jobs" className="flex-grow container mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold text-center mb-10">
          Job Offers
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}