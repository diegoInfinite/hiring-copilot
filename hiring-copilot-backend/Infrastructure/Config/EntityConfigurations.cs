using Microsoft.EntityFrameworkCore;
using Infrastructure.Configurations;

namespace Infrastructure.Persistence
{
	/// <summary>
	/// Centralized configuration registration for all entity mappings.
	/// This class ensures that every EntityTypeConfiguration is applied
	/// when the DbContext model is built.
	/// </summary>
	public static class EntityConfiguration
	{
		/// <summary>
		/// Applies all entity configuration mappings to the EF Core model builder.
		/// </summary>
		/// <param name="modelBuilder">The ModelBuilder instance from DbContext.</param>
		public static void Apply(ModelBuilder modelBuilder)
		{
			// Users
			modelBuilder.ApplyConfiguration(new UserConfiguration());

			// Job Descriptions
			modelBuilder.ApplyConfiguration(new JobDescriptionConfiguration());

			// Candidates
			modelBuilder.ApplyConfiguration(new CandidateConfiguration());

			// Applications
			modelBuilder.ApplyConfiguration(new ApplicationConfiguration());

			// AI Analysis
			modelBuilder.ApplyConfiguration(new AiAnalysisConfiguration());

			// Interview Questions
			modelBuilder.ApplyConfiguration(new InterviewQuestionConfiguration());

			// Assignments
			modelBuilder.ApplyConfiguration(new AssignmentConfiguration());

			// Interviews
			modelBuilder.ApplyConfiguration(new InterviewConfiguration());

			// Candidate Notes
			modelBuilder.ApplyConfiguration(new CandidateNoteConfiguration());

			// Application Audit
			modelBuilder.ApplyConfiguration(new ApplicationAuditConfiguration());
		}
	}
}
