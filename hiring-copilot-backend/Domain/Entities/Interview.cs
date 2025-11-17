using System;
using System.ComponentModel.DataAnnotations;

namespace Domain.Entities
{
    public class Interview
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        public Guid ApplicationId { get; set; }
        public Application Application { get; set; }

        public Guid InterviewerId { get; set; }
        public User Interviewer { get; set; }

        [MaxLength(100)]
        public string InterviewType { get; set; } = "l1";

        public DateTime ScheduledAt { get; set; }
        public int DurationMinutes { get; set; } = 60;

        [MaxLength(500)]
        public string MeetingLink { get; set; }

        [MaxLength(50)]
        public string Status { get; set; } = "scheduled";

        public string Notes { get; set; }
        public DateTime? CompletedAt { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
