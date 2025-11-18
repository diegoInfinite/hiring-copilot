namespace Infrastructure.Config
{
    /// <summary>
    /// JWT configuration options loaded from appsettings.json
    /// </summary>
    public class JwtSettings
    {
        /// <summary>
        /// Secret key used to sign the JWT token
        /// </summary>
        public string Secret { get; set; }

        /// <summary>
        /// Token expiration in minutes
        /// </summary>
        public int ExpirationMinutes { get; set; }

        /// <summary>
        /// Token issuer
        /// </summary>
        public string Issuer { get; set; }

        /// <summary>
        /// Token audience
        /// </summary>
        public string Audience { get; set; }
    }
}
