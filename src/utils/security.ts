
// Security utilities for input validation and sanitization

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254; // RFC 5321 limit
};

export const validatePassword = (password: string): { isValid: boolean; message: string } => {
  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters long' };
  }
  if (password.length > 128) {
    return { isValid: false, message: 'Password is too long' };
  }
  if (!/(?=.*[a-z])/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one lowercase letter' };
  }
  if (!/(?=.*[A-Z])/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one uppercase letter' };
  }
  if (!/(?=.*\d)/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one number' };
  }
  // Check for special characters (optional but recommended)
  if (!/(?=.*[!@#$%^&*(),.?":{}|<>])/.test(password)) {
    return { isValid: false, message: 'Password should contain at least one special character' };
  }
  return { isValid: true, message: '' };
};

export const sanitizeInput = (input: string): string => {
  // Remove potentially dangerous characters
  return input
    .replace(/[<>'"]/g, '') // Remove HTML/script injection chars
    .replace(/[{}[\]]/g, '') // Remove object notation chars
    .trim();
};

export const sanitizeHtml = (input: string): string => {
  // More aggressive HTML sanitization
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

export const validateUserInput = (input: string, maxLength: number = 255): { isValid: boolean; message: string } => {
  if (typeof input !== 'string') {
    return { isValid: false, message: 'Input must be a string' };
  }
  
  if (input.length > maxLength) {
    return { isValid: false, message: `Input exceeds maximum length of ${maxLength} characters` };
  }
  
  // Check for SQL injection patterns
  const sqlInjectionPatterns = [
    /(\bunion\b.*\bselect\b)/i,
    /(\bselect\b.*\bfrom\b)/i,
    /(\binsert\b.*\binto\b)/i,
    /(\bdelete\b.*\bfrom\b)/i,
    /(\bdrop\b.*\btable\b)/i,
    /(\bexec\b|\bexecute\b)/i,
    /(script.*>)/i
  ];
  
  for (const pattern of sqlInjectionPatterns) {
    if (pattern.test(input)) {
      return { isValid: false, message: 'Input contains potentially dangerous content' };
    }
  }
  
  return { isValid: true, message: '' };
};

export const generateSecureToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Rate limiting helper
export class RateLimiter {
  private attempts: Map<string, { count: number; resetTime: number }> = new Map();
  
  constructor(
    private maxAttempts: number = 5,
    private windowMs: number = 15 * 60 * 1000 // 15 minutes
  ) {}
  
  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const record = this.attempts.get(identifier);
    
    if (!record || now > record.resetTime) {
      this.attempts.set(identifier, { count: 1, resetTime: now + this.windowMs });
      return true;
    }
    
    if (record.count >= this.maxAttempts) {
      return false;
    }
    
    record.count++;
    return true;
  }
  
  getRemainingTime(identifier: string): number {
    const record = this.attempts.get(identifier);
    if (!record) return 0;
    
    const remaining = record.resetTime - Date.now();
    return Math.max(0, remaining);
  }
  
  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }
}
