using System;
using System.ComponentModel.DataAnnotations;

namespace Domain.Entities
{
    public class Assignment
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        public Guid ApplicationId { get; set; }
        public Application Application { get; set; }

        [Required, MaxLength(100)]
        public string AssignmentType { get; set; }

        [Required, MaxLength(255)]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        public string ContextMaterials { get; set; } // JSONB

        public Guid? GeneratedBy { get; set; }
        public User GeneratedByUser { get; set; }

        public DateTime GeneratedAt { get; set; } = DateTime.UtcNow;
        public DateTime? DueDate { get; set; }

        public string CandidateResponse { get; set; }
        public DateTime? SubmittedAt { get; set; }

        public string EvaluatorFeedback { get; set; }
        public DateTime? EvaluatedAt { get; set; }

        [MaxLength(50)]
        public string Status { get; set; } = "pending";
    }
}
