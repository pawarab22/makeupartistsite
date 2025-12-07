import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = 'font-semibold rounded-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100';
  
  const variants = {
    primary: 'bg-gradient-to-r from-rose-accent via-rose-pink to-muted-rose text-white font-bold hover:from-rose-pink hover:via-rose-accent hover:to-rose-accent focus:ring-rose-accent shadow-lg hover:shadow-xl hover:shadow-rose-accent/40 border-0 drop-shadow-md',
    secondary: 'bg-gradient-to-r from-soft-blush to-pink-50 text-deep-plum font-semibold hover:from-pink-100 hover:to-rose-50 focus:ring-rose-accent shadow-md hover:shadow-lg border border-rose-200/50',
    outline: 'border-2 border-rose-accent text-rose-accent font-semibold bg-white hover:bg-gradient-to-r hover:from-rose-accent hover:to-rose-pink hover:text-white hover:border-rose-accent focus:ring-rose-accent shadow-md hover:shadow-lg',
  };
  
  const sizes = {
    sm: 'px-4 py-2.5 text-sm',
    md: 'px-6 py-3.5 text-base',
    lg: 'px-8 py-4 text-lg sm:px-10 sm:py-5',
  };
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

