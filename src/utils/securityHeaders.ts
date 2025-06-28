
// Security headers configuration for the application
// Note: These should ideally be configured at the server/CDN level

export const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), location=(), payment=()',
};

// Content Security Policy configuration
export const contentSecurityPolicy = {
  'default-src': "'self'",
  'script-src': "'self' 'unsafe-inline' 'unsafe-eval' https://api.supabase.co",
  'style-src': "'self' 'unsafe-inline' https://fonts.googleapis.com",
  'font-src': "'self' https://fonts.gstatic.com",
  'img-src': "'self' data: https: blob:",
  'connect-src': "'self' https://api.supabase.co wss://api.supabase.co https://ajwkfctcaaxxktyjispy.supabase.co",
  'frame-src': "'none'",
  'object-src': "'none'",
  'base-uri': "'self'",
  'form-action': "'self'",
  'upgrade-insecure-requests': '',
};

// Function to set security headers (useful for development)
export const setSecurityHeaders = () => {
  // This would typically be handled by the server/CDN
  // For client-side applications, we can only set limited headers
  
  // Set CSP via meta tag if not already set
  if (!document.querySelector('meta[http-equiv="Content-Security-Policy"]')) {
    const cspMeta = document.createElement('meta');
    cspMeta.httpEquiv = 'Content-Security-Policy';
    cspMeta.content = Object.entries(contentSecurityPolicy)
      .map(([key, value]) => `${key} ${value}`)
      .join('; ');
    document.head.appendChild(cspMeta);
  }
};

// CSRF protection utility
export const generateCSRFToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Store CSRF token in session storage
export const setCSRFToken = (): string => {
  const token = generateCSRFToken();
  sessionStorage.setItem('csrf_token', token);
  return token;
};

// Validate CSRF token
export const validateCSRFToken = (token: string): boolean => {
  const storedToken = sessionStorage.getItem('csrf_token');
  return storedToken === token;
};
