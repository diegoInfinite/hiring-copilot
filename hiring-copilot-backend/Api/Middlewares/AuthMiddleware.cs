using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Infrastructure.Security;
using System.Linq;
using System;

namespace Api.Middlewares
{
    /// <summary>
    /// Middleware to validate JWT tokens on incoming requests.
    /// If token is valid, attaches the user claims to HttpContext.
    /// Also integrates global error handling middleware.
    /// </summary>
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly JwtProvider _jwtProvider;

        public JwtMiddleware(RequestDelegate next, JwtProvider jwtProvider)
        {
            _next = next;
            _jwtProvider = jwtProvider;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

                if (!string.IsNullOrEmpty(token))
                {
                    var principal = _jwtProvider.ValidateToken(token);
                    if (principal != null)
                    {
                        // Attach user claims to context
                        context.User = principal;
                    }
                    else
                    {
                        // Invalid token
                        context.Response.StatusCode = 401;
                        await context.Response.WriteAsync("Invalid or expired token.");
                        return;
                    }
                }

                await _next(context);
            }
            catch (Exception ex)
            {
                // Handle exceptions using ErrorHandlingMiddleware logic
                var errorHandler = new ErrorHandlingMiddleware(_next);
                await errorHandler.HandleExceptionAsync(context, ex);
            }
        }
    }

    /// <summary>
    /// Extension method to add JwtMiddleware to the HTTP pipeline.
    /// </summary>
    public static class JwtMiddlewareExtensions
    {
        public static IApplicationBuilder UseJwtMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<JwtMiddleware>();
        }
    }
}
