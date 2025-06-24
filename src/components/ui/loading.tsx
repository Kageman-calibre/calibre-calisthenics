
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingProps {
  variant?: 'default' | 'card' | 'section';
  className?: string;
}

export const Loading = ({ variant = 'default', className = '' }: LoadingProps) => {
  if (variant === 'card') {
    return (
      <div className={`space-y-4 ${className}`}>
        <Skeleton className="h-48 w-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    );
  }

  if (variant === 'section') {
    return (
      <div className={`py-20 px-4 sm:px-6 lg:px-8 ${className}`}>
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <Skeleton className="h-12 w-64 mx-auto" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Loading key={i} variant="card" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen gradient-black-burgundy flex items-center justify-center ${className}`}>
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
        <div className="text-white text-xl">Loading...</div>
      </div>
    </div>
  );
};
