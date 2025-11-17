using System;
using System.ComponentModel.DataAnnotations;

namespace Domain.Entities
{
    public class CandidateNote
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        public Guid ApplicationId { get; set; }
        public Application Application { get; set; }

        public Guid AuthorId { get; set; }
        public User Author { get; set; }

        public string NoteContent { get; set; }

        public bool IsInternal { get; set; } = true;

        public DateTime CreatedAt
        {
            get: set; } = DateTime.UtcNow;
        }
    }
