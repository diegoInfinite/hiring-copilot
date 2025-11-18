using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Api.Middlewares
{
	/// <summary>
	/// Global error handling middleware.
	/// Captures unhandled exceptions and returns standardized error responses.
	/// </summary>
	public class ErrorHandlingMiddleware
	{
		private readonly RequestDelegate _next;

		public ErrorHandlingMiddleware(RequestDelegate next)
		{
			_next = next;
		}

		public async Task InvokeAsync(HttpContext context)
		{
			try
			{
				await _next(context);
			}
			catch (Exception ex)
			{
				await HandleExceptionAsync(context, ex);
			}
		}

		/// <summary>
		/// Handles exceptions and writes a JSON response with error details.
		/// </summary>
		/// <param name="context">Http context</param>
		/// <param name="exception">Exception caught</param>
		public async Task HandleExceptionAsync(HttpContext context, Exception exception)
		{
			context.Response.ContentType = "application/json";
			context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

			var response = new
			{
				message = exception?.Message ?? "An unexpected error occurred.",
				statusCode = context.Response.StatusCode,
				timestamp = DateTime.UtcNow
			};

			var json = JsonSerializer.Serialize(response);
			await context.Response.WriteAsync(json);
		}
	}

	/// <summary>
	/// Extension method to add ErrorHandlingMiddleware to the HTTP pipeline.
	/// </summary>
	public static class ErrorHandlingMiddlewareExtensions
	{
		public static IApplicationBuilder UseErrorHandlingMiddleware(this IApplicationBuilder builder)
		{
			return builder.UseMiddleware<ErrorHandlingMiddleware>();
		}
	}
}