// shared/components/ui/NumberField.tsx
import { forwardRef, InputHTMLAttributes } from 'react'

export interface NumberFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  required?: boolean
  min?: number
  max?: number
  step?: number
  icon?: React.ElementType  // ← Sửa kiểu
  unit?: string
}

export const NumberField = forwardRef<HTMLInputElement, NumberFieldProps>(
  ({ 
    label, 
    error, 
    required, 
    min, 
    max, 
    step = 1, 
    className = '',
    icon: Icon,  // ← Đặt tên viết hoa
    unit,
    ...props 
  }, ref) => {
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
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon className="h-5 w-5 text-gray-400" />  {/* ← Render như component */}
            </div>
          )}
          <input
            ref={ref}
            type="number"
            min={min}
            max={max}
            step={step}
            className={`
              w-full border rounded-md shadow-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500
              ${error ? 'border-red-500' : 'border-gray-300'}
              ${Icon ? 'pl-10' : 'pl-3'}
              ${unit ? 'pr-16' : 'pr-3'}
              py-2
              [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
              [&::-webkit-inner-spin-button]:appearance-none
              ${className}
            `}
            {...props}
          />
          {unit && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 text-sm">{unit}</span>
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    )
  }
)

NumberField.displayName = 'NumberField'