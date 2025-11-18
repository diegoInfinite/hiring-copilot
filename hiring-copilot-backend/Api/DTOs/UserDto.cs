using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.Users
{
	/// <summary>
	/// General DTO used for user operations such as creation,
	/// update and API responses. Password is optional and used only for
	/// user creation. This DTO does NOT expose password hashes.
	/// </summary>
	public class UserDto
	{
		public Guid Id { get; set; }

		[Required]
		[EmailAddress]
		public string Email { get; set; } = string.Empty;

		[Required]
		public string Name { get; set; } = string.Empty;

		/// <summary>
		/// Only used in account creation. It is NOT returned to clients.
		/// </summary>
		public string? Password { get; set; }

		/// <summary>
		/// Supported roles: admin, recruiter, interviewer.
		/// </summary>
		public string Role { get; set; } = "interviewer";

		public bool IsActive { get; set; } = true;

		public DateTime CreatedAt { get; set; }
	}
}
