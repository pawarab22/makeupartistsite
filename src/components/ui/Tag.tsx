import { ReactNode } from 'react';

interface TagProps {
  children: ReactNode;
  className?: string;
}

export default function Tag({ children, className = '' }: TagProps) {
  return (
    <span
      className={`inline-block px-3 py-1 rounded-lg bg-gradient-to-r from-pink-100 to-rose-100 text-rose-accent text-xs font-semibold shadow-sm ${className}`}
    >
      {children}
    </span>
  );
}

