import { cn } from '@/lib/utils';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageWrapper({ children, className }: PageWrapperProps) {
  return <section className={cn('min-h-screen w-full snap-start snap-always', className)}>{children}</section>;
}
