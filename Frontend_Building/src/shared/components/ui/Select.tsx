// shared/components/ui/Select.tsx
import { forwardRef, SelectHTMLAttributes } from 'react'

export interface SelectOption {
  value: string | number
  label: string
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  required?: boolean
  options?: SelectOption[]
  icon?: React.ElementType  // ← Sửa kiểu
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ 
    label, 
    error, 
    required, 
    options = [], 
    className = '', 
    children, 
    id,
    icon: Icon,  // ← Đặt tên viết hoa
    ...props 
  }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-')
    
    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={selectId}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon className="h-5 w-5 text-gray-400" />  {/* ← Render như component */}
            </div>
          )}
          <select
            ref={ref}
            id={selectId}
            className={`
              w-full border rounded-md shadow-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500
              ${error ? 'border-red-500' : 'border-gray-300'}
              ${Icon ? 'pl-10' : 'pl-3'}
              pr-8
              py-2
              appearance-none
              bg-white
              ${className}
            `}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
            {children}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'