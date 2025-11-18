using Microsoft.EntityFrameworkCore;
using Infrastructure.Config;
using Domain.Entities;

namespace Infrastructure.Config
{
    public static class EntityConfiguration
    {
        public static void Apply(ModelBuilder modelBuilder)
        {
            // Solo configuraciones que NO se pueden hacer con Data Annotations

            // Users - Solo índice único en email
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(u => u.Email).IsUnique();
                entity.Property(u => u.IsActive).HasDefaultValue(true);
                entity.Property(u => u.CreatedAt).HasDefaultValueSql("NOW()");
                entity.Property(u => u.UpdatedAt).HasDefaultValueSql("NOW()");

                // Relación con delete behavior restrict
                entity.HasOne(u => u.InvitedByUser)
                    .WithMany()
                    .HasForeignKey(u => u.InvitedBy)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // Applications - Índice único compuesto
            modelBuilder.Entity<Application>(entity =>
            {
                entity.HasIndex(a => new { a.CandidateId, a.JobDescriptionId })
                    .IsUnique();
                entity.Property(a => a.CurrentStage).HasDefaultValue("applied");
                entity.Property(a => a.AppliedAt).HasDefaultValueSql("NOW()");
                entity.Property(a => a.UpdatedAt).HasDefaultValueSql("NOW()");
            });

            // AI Analysis - Configuración JSON para PostgreSQL
            modelBuilder.Entity<AiAnalysis>(entity =>
            {
                entity.HasIndex(a => a.ApplicationId).IsUnique();
                entity.Property(a => a.AnalysisStatus).HasDefaultValue("pending");
                entity.Property(a => a.JdAnalysis).HasColumnType("jsonb");
                entity.Property(a => a.CvAnalysis).HasColumnType("jsonb");
                entity.Property(a => a.GapAnalysis).HasColumnType("jsonb");
                entity.Property(a => a.CreatedAt).HasDefaultValueSql("NOW()");
            });

            // JobDescriptions - Valores por defecto
            modelBuilder.Entity<JobDescription>(entity =>
            {
                entity.Property(j => j.IsActive).HasDefaultValue(true);
                entity.Property(j => j.CreatedAt).HasDefaultValueSql("NOW()");
                entity.Property(j => j.UpdatedAt).HasDefaultValueSql("NOW()");
            });

            // Candidate - Valor por defecto
            modelBuilder.Entity<Candidate>(entity =>
            {
                entity.Property(c => c.CreatedAt).HasDefaultValueSql("NOW()");
            });

            // Interview - Valores por defecto
            modelBuilder.Entity<Interview>(entity =>
            {
                entity.Property(i => i.InterviewType).HasDefaultValue("l1");
                entity.Property(i => i.DurationMinutes).HasDefaultValue(60);
                entity.Property(i => i.Status).HasDefaultValue("scheduled");
                entity.Property(i => i.CreatedAt).HasDefaultValueSql("NOW()");
            });

            // Assignment - Valores por defecto y JSON
            modelBuilder.Entity<Assignment>(entity =>
            {
                entity.Property(a => a.Status).HasDefaultValue("pending");
                entity.Property(a => a.GeneratedAt).HasDefaultValueSql("NOW()");
                entity.Property(a => a.ContextMaterials).HasColumnType("jsonb");
            });

            // CandidateNote - Valores por defecto
            modelBuilder.Entity<CandidateNote>(entity =>
            {
                entity.Property(cn => cn.IsInternal).HasDefaultValue(true);
                entity.Property(cn => cn.CreatedAt).HasDefaultValueSql("NOW()");
            });

            // ApplicationAudit - Valor por defecto
            modelBuilder.Entity<ApplicationAudit>(entity =>
            {
                entity.Property(aa => aa.ChangedAt).HasDefaultValueSql("NOW()");
            });

            // InterviewQuestion - Valores por defecto y JSON
            modelBuilder.Entity<InterviewQuestion>(entity =>
            {
                entity.Property(iq => iq.GeneratedAt).HasDefaultValueSql("NOW()");
                entity.Property(iq => iq.IsUsed).HasDefaultValue(false);
                entity.Property(iq => iq.Questions).HasColumnType("jsonb");
            });
        }
    }
}