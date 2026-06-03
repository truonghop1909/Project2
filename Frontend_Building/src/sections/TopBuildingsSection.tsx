"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { statisticsApi } from "@/features/statistics/api/statistics.api";
import { BuildingSearchDTO } from "@/features/building/types/building.type";
import { BuildingCard } from "@/features/building/components/public/BuildingCard";

export function TopBuildingsSection() {
  const router = useRouter();
  const [buildings, setBuildings] = useState<BuildingSearchDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    statisticsApi.getTop5HighestRentBuildings()
      .then(res => setBuildings(res.data))
      .catch(err => console.error("Lỗi tải top buildings:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-12 text-gray-500">Đang tải...</div>;
  if (buildings.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">🏆 Top 5 tòa nhà giá thuê cao nhất</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {buildings.map((b) => (
          <BuildingCard
            key={b.id}
            building={b}
            onClick={() => router.push(`/buildings/${b.id}`)}
          />
        ))}
      </div>
    </section>
  );
}