import { InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  rightContent?: ReactNode;
}

export default function Input({ label, error, rightContent, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-deep-plum mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          className={`w-full px-4 py-3 rounded-xl border-2 ${error ? 'border-red-300' : 'border-soft-blush'
            } focus:border-rose-accent focus:outline-none transition-colors ${className} ${rightContent ? 'pr-12' : ''
            }`}
          {...props}
        />
        {rightContent && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
            {rightContent}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

