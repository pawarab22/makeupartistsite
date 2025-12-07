import { ReactNode, MouseEventHandler } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
}

export default function Card({ children, className = '', hover = false, onClick, style }: CardProps) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-lg p-4 sm:p-6 ${hover ? 'transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-rose-accent/20 hover:-translate-y-1' : 'transition-shadow duration-300'} ${className}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );
}

