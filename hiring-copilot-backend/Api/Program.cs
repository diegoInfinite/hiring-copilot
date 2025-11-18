using Infrastructure.Context;
using Infrastructure.Config;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Api.Middlewares;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using System.Text.Json;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Infrastructure.HealthChecks;

var builder = WebApplication.CreateBuilder(args);

// -----------------------------
// Configure Services
// -----------------------------

// Configure DbContext with Neon/PostgreSQL connection
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configure JwtSettings
builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("JwtSettings"));

// Register JwtProvider as singleton
builder.Services.AddSingleton<JwtProvider>();

// ✅ Add Health Checks (sin AddDbContextCheck)
builder.Services.AddHealthChecks()
    // Database health check personalizado
    .AddCheck<DatabaseHealthCheck>("database", tags: new[] { "ready" })
    // Basic liveness check
    .AddCheck("basic", () => HealthCheckResult.Healthy("API is running"), tags: new[] { "live" });

// Add Authentication with JWT Bearer
var jwtSettings = builder.Configuration.GetSection("JwtSettings").Get<JwtSettings>()
    ?? throw new Exception("❌ JwtSettings section missing in appsettings.json");

var key = Encoding.UTF8.GetBytes(jwtSettings.Secret
    ?? throw new Exception("❌ JwtSettings:Secret missing"));

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = true,
        ValidIssuer = jwtSettings.Issuer,
        ValidateAudience = true,
        ValidAudience = jwtSettings.Audience,
        ClockSkew = TimeSpan.Zero
    };
});

// Add controllers
builder.Services.AddControllers();

// Add Swagger/OpenAPI for testing
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// -----------------------------
// Configure Middleware
// -----------------------------

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseErrorHandlingMiddleware();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// ✅ Map Health Check Endpoints
app.MapHealthChecks("/health", new HealthCheckOptions
{
    ResponseWriter = WriteHealthCheckResponse,
    Predicate = check => check.Tags.Contains("live") || check.Tags.Count == 0
});

app.MapHealthChecks("/health/ready", new HealthCheckOptions
{
    ResponseWriter = WriteHealthCheckResponse,
    Predicate = check => check.Tags.Contains("ready")
});

app.MapHealthChecks("/health/live", new HealthCheckOptions
{
    ResponseWriter = WriteHealthCheckResponse,
    Predicate = check => check.Tags.Contains("live")
});

// ✅ Simple health endpoint
app.MapGet("/api/health", () =>
{
    var healthInfo = new
    {
        status = "Healthy",
        service = "Hiring Copilot API",
        timestamp = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ss.fffZ"),
        version = "1.0.0",
        environment = app.Environment.EnvironmentName
    };

    return Results.Ok(healthInfo);
});

app.Run();

// ✅ Health Check Response Writer
static Task WriteHealthCheckResponse(HttpContext context, HealthReport result)
{
    context.Response.ContentType = "application/json; charset=utf-8";

    var response = new
    {
        status = result.Status.ToString(),
        service = "Hiring Copilot API",
        checks = result.Entries.Select(entry => new
        {
            name = entry.Key,
            status = entry.Value.Status.ToString(),
            description = entry.Value.Description,
            duration = $"{entry.Value.Duration.TotalMilliseconds}ms",
            exception = entry.Value.Exception?.Message
        }),
        totalDuration = $"{result.TotalDuration.TotalMilliseconds}ms",
        timestamp = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ss.fffZ"),
        environment = context.RequestServices.GetRequiredService<IWebHostEnvironment>().EnvironmentName
    };

    var options = new JsonSerializerOptions
    {
        WriteIndented = true,
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
    };

    return context.Response.WriteAsync(JsonSerializer.Serialize(response, options));
}