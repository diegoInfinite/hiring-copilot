using Microsoft.EntityFrameworkCore;
using Domain.Entities;
using Infrastructure.Persistence;

namespace Infrastructure.Context
{
    /// <summary>
    /// Application-wide EF Core database context.
    /// This class manages DbSet collections and configures entity mappings,
    /// relationships, constraints, and database-level behaviors.
    /// </summary>
    public class AppDbContext : DbContext
    {
        /// <summary>
        /// Main constructor for dependency injection.
        /// </summary>
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        // -----------------------------
        // DbSet COLLECTIONS
        // -----------------------------

        public DbSet<User> Users { get; set; }
        public DbSet<JobDescription> JobDescriptions { get; set; }
        public DbSet<Candidate> Candidates { get; set; }
        public DbSet<Application> Applications { get; set; }
        public DbSet<AiAnalysis> AiAnalysis { get; set; }
        public DbSet<InterviewQuestion> InterviewQuestions { get; set; }
        public DbSet<Assignment> Assignments { get; set; }
        public DbSet<Interview> Interviews { get; set; }
        public DbSet<CandidateNote> CandidateNotes { get; set; }
        public DbSet<ApplicationAudit> ApplicationAudits { get; set; }

        /// <summary>
        /// Configures the EF Core model using centralized entity mappings.
        /// </summary>
        /// <param name="modelBuilder">ModelBuilder instance from EF Core.</param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Apply all modularized configurations
            EntityConfiguration.Apply(modelBuilder);
        }
    }
}
