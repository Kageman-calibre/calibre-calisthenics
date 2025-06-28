
import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SecureErrorBoundaryState {
  hasError: boolean;
  errorId?: string;
}

interface SecureErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

class SecureErrorBoundary extends React.Component<SecureErrorBoundaryProps, SecureErrorBoundaryState> {
  constructor(props: SecureErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): SecureErrorBoundaryState {
    // Generate a random error ID for tracking without exposing sensitive info
    const errorId = Math.random().toString(36).substring(2, 15);
    
    // Log error securely (in production, send to secure logging service)
    console.error('Error caught by secure boundary:', {
      errorId,
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
    
    return { hasError: true, errorId };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log additional error info securely
    console.error('Error info:', {
      errorId: this.state.errorId,
      componentStack: errorInfo.componentStack,
      errorBoundary: this.constructor.name
    });
  }

  handleRetry = () => {
    this.setState({ hasError: false, errorId: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[200px] flex items-center justify-center p-8 bg-black/20 backdrop-blur-lg rounded-xl border border-white/10">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-4">
              <AlertTriangle className="h-8 w-8 text-red-400" />
            </div>
            <h3 className="text-white text-lg font-medium">Something went wrong</h3>
            <p className="text-gray-400 max-w-md">
              We encountered an unexpected error. Our team has been notified.
            </p>
            {this.state.errorId && (
              <p className="text-gray-500 text-sm font-mono">
                Error ID: {this.state.errorId}
              </p>
            )}
            <Button
              onClick={this.handleRetry}
              variant="outline"
              className="border-red-400/30 text-red-400 hover:bg-red-400/10 backdrop-blur-sm"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default SecureErrorBoundary;
