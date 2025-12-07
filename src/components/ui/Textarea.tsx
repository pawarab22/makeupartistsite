import { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export default function Textarea({ label, error, className = '', ...props }: TextareaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-deep-plum mb-2">
          {label}
        </label>
      )}
      <textarea
        className={`w-full px-4 py-3 rounded-xl border-2 ${
          error ? 'border-red-300' : 'border-soft-blush'
        } focus:border-rose-accent focus:outline-none transition-colors resize-none ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

