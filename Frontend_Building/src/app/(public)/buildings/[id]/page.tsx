import { buildingApi } from '@/features/building/api/building.api';
import { notFound } from 'next/navigation';
import { BuildingDetailClient } from './BuildingDetailClient';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const buildingId = Number(id);
  if (isNaN(buildingId)) return { title: 'Không tìm thấy' };
  try {
    const response = await buildingApi.getPublicBuildingById(buildingId);
    return {
      title: `${response.data.name} | BuildingHub`,
      description: `Cho thuê văn phòng tại ${response.data.address}`,
    };
  } catch {
    return { title: 'Không tìm thấy' };
  }
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