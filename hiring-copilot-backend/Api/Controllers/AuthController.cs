using Application.DTOs.Users;
using Domain.Entities;
using Infrastructure.Context;
using Infrastructure.Config;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    /// <summary>
    /// Handles authentication, login, and user account creation.
    /// Uses JWT authentication and maps User entity to UserDto.
    /// </summary>
    [ApiController]
    [Route("[controller]/create")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        
        private readonly JwtProvider _jwtProvider;

        public AuthController(AppDbContext context, JwtProvider jwtProvider)
        {
            _context = context;
            _jwtProvider = jwtProvider;
        }

        // ============================================================
        // POST: /api/auth/login
        // ============================================================

        /// <summary>
        /// Authenticates a user with email and password and returns a JWT token.
        /// </summary>
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == dto.Email);

            if (user == null)
                return Unauthorized(new { message = "Invalid email or password." });

            // TODO: Replace with secure password hashing (BCrypt or Identity)
            bool passwordMatches = user.PasswordHash == dto.Password;
            if (!passwordMatches)
                return Unauthorized(new { message = "Invalid email or password." });

            // Generate token
            var token = _jwtProvider.GenerateToken(user.Id, user.Email, user.Role);

            // Build response using UserDto
            var response = new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                Name = user.Name,
                Role = user.Role,
                IsActive = user.IsActive,
                CreatedAt = user.CreatedAt
            };

            return Ok(new
            {
                user = response,
                token = token
            });
        }

        // ============================================================
        // POST: /api/auth/create
        // ============================================================

        /// <summary>
        /// Creates a new system user (admin, recruiter, interviewer).
        /// </summary>
        [HttpPost("create")]
        public async Task<IActionResult> CreateUser([FromBody] UserDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Validate password since UserDto makes it optional
            if (string.IsNullOrWhiteSpace(dto.Password))
                return BadRequest(new { message = "Password is required to create a user." });

            var emailExists = await _context.Users.AnyAsync(u => u.Email == dto.Email);

            if (emailExists)
                return Conflict(new { message = "A user with this email already exists." });

            var newUser = new User
            {
                Email = dto.Email,
                Name = dto.Name,
                Role = dto.Role,
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,

                // TODO: Replace with a real hashing method
                PasswordHash = dto.Password
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            dto.Id = newUser.Id;
            dto.CreatedAt = newUser.CreatedAt;
            dto.Password = null; // Never return password

            return Ok(dto);
        }
    }
}
