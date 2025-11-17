import JobCard from "./JobCard";

const jobs = [
  { id: "1", title: "Full Stack Developer", company: "Infinite", location: "Remote" },
  { id: "2", title: "Data Analyst", company: "Infinite", location: "San Jose, Costa Rica" },
  { id: "3", title: "DevOps Engineer", company: "Infinite", location: "Hybrid" },
];

export default function CareersSection() {
  return (
    <section id="jobs" className="container mx-auto px-6 py-16 text-white">
      <h2 className="text-4xl font-bold text-center mb-10">
        Job Openings
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {jobs.map((job) => (
          <JobCard key={job.id} {...job} />
        ))}
      </div>
    </section>
  );
}