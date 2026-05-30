import { BuildingDetail } from "../../types/building.type";
import { BuildingHeader } from "./BuildingHeader";
import { BuildingThumbnail } from "./BuildingThumbnail";
import { BuildingImageGallery } from "./BuildingImageGallery";
import { BuildingInfoSection } from "./BuildingInfoSection";
import { BuildingDetailSkeleton } from "./BuildingDetailSkeleton";
import { BuildingDetailError } from "./BuildingDetailError";
import { getBuildingSections } from "./BuildingDetailSections";

interface BuildingDetailContentProps {
  building?: BuildingDetail | null;
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}

export function BuildingDetailContent({ building, loading, error, onRetry }: BuildingDetailContentProps) {
  if (loading) return <BuildingDetailSkeleton />;
  if (error) return <BuildingDetailError error={error} onRetry={onRetry} />;
  if (!building) return null;

  const sections = getBuildingSections(building);

  return (
    <>
      <BuildingHeader building={building} />
      <BuildingThumbnail thumbnail={building.thumbnail} name={building.name} />
      {building.images && building.images.length > 0 && <BuildingImageGallery images={building.images} />}
      {sections.map((section, idx) => (
        <BuildingInfoSection key={idx} title={section.title} icon={section.icon} fields={section.fields} columns={2} />
      ))}
      {building.note && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Ghi chú</h3>
          <p className="text-gray-700 whitespace-pre-wrap">{building.note}</p>
        </div>
      )}
    </>
  );
}