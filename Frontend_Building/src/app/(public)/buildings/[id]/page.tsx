import { buildingApi } from '@/features/building/api/building.api';
import { notFound } from 'next/navigation';
import { BuildingDetailClient } from './BuildingDetailClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BuildingDetailPage({ params }: PageProps) {
  const { id } = await params;
  const buildingId = Number(id);
  if (isNaN(buildingId)) notFound();

  try {
    const response = await buildingApi.getPublicBuildingById(buildingId);
    return <BuildingDetailClient building={response.data} />;
  } catch {
    notFound();
  }
}