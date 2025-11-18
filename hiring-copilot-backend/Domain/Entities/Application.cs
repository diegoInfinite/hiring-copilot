using Domain.Entities;
using System;
using System.ComponentModel.DataAnnotations;

namespace Domain.Entities
{
    /// <summary>
    /// Represents the application linking Candidates and Job Descriptions.
    /// </summary>
    public class Application
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        public Guid CandidateId { get; set; }
        public Candidate Candidate { get; set; }

        public Guid JobDescriptionId { get; set; }
        public JobDescription JobDescription { get; set; }

        [MaxLength(50)]
        public string CurrentStage { get; set; } = "applied";

        public DateTime AppliedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public AiAnalysis AiAnalysis { get; set; }
        public ICollection<InterviewQuestion> InterviewQuestions { get; set; }
        public ICollection<Assignment> Assignments { get; set; }
        public ICollection<Interview> Interviews { get; set; }
        public ICollection<CandidateNote> CandidateNotes { get; set; }
        public ICollection<ApplicationAudit> Audits { get; set; }
    }
}
