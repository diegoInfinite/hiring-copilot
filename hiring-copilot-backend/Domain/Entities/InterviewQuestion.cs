using System;
using System.ComponentModel.DataAnnotations;

namespace Domain.Entities
{
    public class InterviewQuestion
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        public Guid ApplicationId { get; set; }
        public Application Application { get; set; }

        public string Questions { get; set; } // JSONB

        public Guid? GeneratedBy { get; set; }
        public User GeneratedByUser { get; set; }

        public DateTime GeneratedAt { get; set; } = DateTime.UtcNow;

        public bool IsUsed { get; set; } = false;
    }
}
