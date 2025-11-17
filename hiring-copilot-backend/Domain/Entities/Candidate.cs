using Domain.Entities.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Domain.Entities
{
    /// <summary>
    /// Represents a job candidate.
    /// </summary>
    public class Candidate
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required, MaxLength(255)]
        public string Name { get; set; }

        [Required, MaxLength(255)]
        public string Email { get; set; }

        [MaxLength(100)]
        public string Phone { get; set; }

        [MaxLength(500)]
        public string CvFilePath { get; set; }

        public string CvTextContent { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<Application> Applications { get; set; }
    }
}
