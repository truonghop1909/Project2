'use client';
import { forwardRef, TextareaHTMLAttributes } from 'react';

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  required?: boolean;
  rows?: number;
  icon?: React.ElementType;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, required, rows = 3, className = '', icon: Icon, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
              <Icon className="h-5 w-5 text-gray-400" />
            </div>
          )}
          <textarea
            ref={ref}
            rows={rows}
            className={`
              w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
              ${error ? 'border-red-500' : 'border-gray-300'}
              ${Icon ? 'pl-10' : 'pl-3'} pr-3 py-2 ${className}
            `}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);
TextArea.displayName = 'TextArea';