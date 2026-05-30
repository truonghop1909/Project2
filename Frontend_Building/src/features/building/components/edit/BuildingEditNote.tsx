import { ClipboardList } from "lucide-react";
import { TextArea, Section } from "@/components/ui";
import { BuildingDetail } from "../../types/building.type";

interface BuildingEditNoteProps {
  form: BuildingDetail;
  onFieldChange: (field: string, value: any) => void;
}

export function BuildingEditNote({ form, onFieldChange }: BuildingEditNoteProps) {
  return (
    <Section title="Ghi chú" icon={ClipboardList}>
      <TextArea
        value={form.note || ""}
        onChange={(e) => onFieldChange("note", e.target.value)}
        rows={4}
        placeholder="Nhập ghi chú..."
      />
    </Section>
  );
}