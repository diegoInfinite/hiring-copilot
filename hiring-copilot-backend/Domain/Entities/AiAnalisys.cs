using System;
using System.ComponentModel.DataAnnotations;

namespace Domain.Entities
{
    /// <summary>
    /// Represents the complete AI analysis for an application.
    /// </summary>
    public class AiAnalysis
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        public Guid ApplicationId { get; set; }
        public Application Application { get; set; }

        public string JdAnalysis { get; set; } // JSONB
        public string CvAnalysis { get; set; } // JSONB

        public int? MatchScore { get; set; }
        public string MatchRationale { get; set; }
        public string GapAnalysis { get; set; } // JSONB

        [MaxLength(50)]
        public string AnalysisStatus { get; set; } = "pending";

        public DateTime? AnalyzedAt { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
