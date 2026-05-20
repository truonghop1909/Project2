// shared/components/ui/Section.tsx
import { ReactNode } from 'react'

export interface SectionProps {
  title?: string
  children: ReactNode
  className?: string
  required?: boolean
  icon?: React.ElementType  // ← Thêm icon nếu muốn
}

export const Section = ({ 
  title, 
  children, 
  className = '', 
  required,
  icon: Icon  // ← Nếu có icon
}: SectionProps) => {
  return (
    <div className={`mb-6 ${className}`}>
      {title && (
        <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center gap-2">
          {Icon && <Icon className="h-5 w-5 text-gray-600" />}
          {title}
          {required && <span className="text-red-500 ml-1">*</span>}
        </h3>
      )}
      <div className="space-y-4">
        {children}
      </div>
    </div>
  )
}