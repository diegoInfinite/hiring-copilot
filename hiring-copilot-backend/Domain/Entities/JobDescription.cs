using Domain.Entities.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    /// <summary>
    /// Represents a job opening.
    /// </summary>
    public class JobDescription
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required, MaxLength(255)]
        public string Title { get; set; }

        [Required, MaxLength(255)]
        public string Location { get; set; }

        [Required]
        public string ShortSummary { get; set; }

        [Required]
        public string FullDescription { get; set; }

        [MaxLength(255)]
        public string Department { get; set; }

        [MaxLength(100)]
        public string EmploymentType { get; set; }

        public bool IsActive { get; set; } = true;

        public string Requirements { get; set; } // JSONB stored as string

        public Guid CreatedBy { get; set; }
        public User Creator { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<Application> Applications { get; set; }
    }
}
