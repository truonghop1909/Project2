
import { InfoRow } from "@/components/common";
import { Section } from "@/components/ui";
import React from "react";

interface FieldConfig {
  label: string;
  value: React.ReactNode;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  fullWidth?: boolean;
}

interface BuildingInfoSectionProps {
  title: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  fields: FieldConfig[];
  columns?: 1 | 2 | 3;
}

export const BuildingInfoSection: React.FC<BuildingInfoSectionProps> = ({
  title,
  icon,
  fields,
  columns = 2,
}) => {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  };

  const normalFields = fields.filter(f => !f.fullWidth);
  const fullWidthFields = fields.filter(f => f.fullWidth);

  return (
    <Section title={title} icon={icon}>
      {normalFields.length > 0 && (
        <div className={`grid ${gridCols[columns]} gap-4 mb-4`}>
          {normalFields.map((field, index) => (
            <InfoRow
              key={index}
              label={field.label}
              value={field.value}
              icon={field.icon}
            />
          ))}
        </div>
      )}
      {fullWidthFields.map((field, index) => (
        <div key={index} className="mt-2">
          <InfoRow
            label={field.label}
            value={field.value}
            icon={field.icon}
            className="col-span-full"
          />
        </div>
      ))}
    </Section>
  );
};