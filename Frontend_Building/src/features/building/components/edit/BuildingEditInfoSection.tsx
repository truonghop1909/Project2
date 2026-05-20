// src/features/building/components/edit/BuildingEditInfoSection.tsx

import React, { useState } from "react";
import { Section } from "@/shared/components/ui";
import { Edit3 } from "lucide-react";

interface FieldConfig {
  label: string;
  value: React.ReactNode;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  fullWidth?: boolean;
  editable?: boolean;
  fieldName?: string;
  onChange?: (value: string) => void;  // ← THÊM DÒNG NÀY
}

interface BuildingEditInfoSectionProps {
  title: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  fields?: FieldConfig[];
  columns?: 1 | 2 | 3;
  children?: React.ReactNode;
}

export const BuildingEditInfoSection: React.FC<BuildingEditInfoSectionProps> = ({
  title,
  icon,
  fields = [],
  columns = 2,
  children,
}) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  };

  const normalFields = fields.filter(f => !f.fullWidth);
  const fullWidthFields = fields.filter(f => f.fullWidth);

  const handleStartEdit = (fieldName: string, currentValue: string) => {
    setEditingField(fieldName);
    setEditValue(currentValue);
  };

  const handleSaveEdit = (fieldName: string, onChange?: (value: string) => void) => {
    if (onChange) {
      onChange(editValue);
    }
    setEditingField(null);
    setEditValue("");
  };

  const renderEditableValue = (field: FieldConfig, fieldKey: string) => {
    const isEditing = editingField === fieldKey;
    const currentValue = typeof field.value === 'string' ? field.value : "";

    if (isEditing && field.onChange) {
      return (
        <div className="space-y-2">
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSaveEdit(fieldKey, field.onChange);
              }
              if (e.key === 'Escape') {
                setEditingField(null);
              }
            }}
          />
          <div className="flex gap-2">
            <button
              onClick={() => setEditingField(null)}
              className="px-3 py-1 text-sm bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Hủy
            </button>
            <button
              onClick={() => handleSaveEdit(fieldKey, field.onChange)}
              className="px-3 py-1 text-sm bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              Lưu
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="group flex items-center justify-between">
        <div className="text-gray-900">{field.value}</div>
        {field.onChange && (
          <button
            onClick={() => handleStartEdit(fieldKey, currentValue)}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded"
          >
            <Edit3 size={14} className="text-gray-400" />
          </button>
        )}
      </div>
    );
  };

  return (
    <Section title={title} icon={icon}>
      {children && <div className="space-y-4">{children}</div>}
      
      {!children && (
        <>
          {normalFields.length > 0 && (
            <div className={`grid ${gridCols[columns]} gap-4 mb-4`}>
              {normalFields.map((field, index) => {
                const fieldKey = `${field.label}-${index}`;
                return (
                  <div key={index} className="flex items-start gap-3 group">
                    {field.icon && <field.icon size={18} className="text-gray-400 mt-0.5 flex-shrink-0" />}
                    <div className="flex-1">
                      <div className="text-sm text-gray-500 mb-1">{field.label}</div>
                      {renderEditableValue(field, fieldKey)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          
          {fullWidthFields.map((field, index) => {
            const fieldKey = `${field.label}-full-${index}`;
            return (
              <div key={index} className="mt-2">
                <div className="flex items-start gap-3 group">
                  {field.icon && <field.icon size={18} className="text-gray-400 mt-0.5 flex-shrink-0" />}
                  <div className="flex-1">
                    <div className="text-sm text-gray-500 mb-1">{field.label}</div>
                    {renderEditableValue(field, fieldKey)}
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </Section>
  );
};