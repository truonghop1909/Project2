// app/(public)/buildings/[id]/page.tsx
import { buildingApi } from '@/features/building/api/building.api';
import { notFound } from 'next/navigation';
import { BuildingDetailClient } from './BuildingDetailClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BuildingDetailPage({ params }: PageProps) {
  const { id } = await params;          // ✅ Unwrap Promise
  const buildingId = Number(id);

  if (isNaN(buildingId)) {
    notFound();
  }

  try {
    const response = await buildingApi.getPublicBuildingById(buildingId);
    const building = response.data;
    return <BuildingDetailClient building={building} />;
  } catch (error) {
    console.error('Error fetching building:', error);
    notFound();
  }
}