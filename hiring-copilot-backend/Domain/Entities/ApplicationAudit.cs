using System;
using System.ComponentModel.DataAnnotations;

namespace Domain.Entities
{
    public class ApplicationAudit
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        public Guid ApplicationId { get; set; }
        public Application Application { get; set; }

        [MaxLength(50)]
        public string OldStage { get; set; }

        [MaxLength(50)]
        public string NewStage { get; set; }

        public Guid? ChangedBy { get; set; }
        public User ChangedByUser { get; set; }

        public string ChangeReason { get; set; }

        public DateTime ChangedAt { get; set; } = DateTime.UtcNow;
    }
}
