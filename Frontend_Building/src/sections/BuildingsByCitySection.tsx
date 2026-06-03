'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { statisticsApi } from '@/features/statistics/api/statistics.api';
import { BuildingSearchDTO } from '@/features/building/types/building.type';
import { BuildingCard } from '@/features/building/components/public/BuildingCard';
import { motion } from 'framer-motion';

const CITIES = [
  { key: 'Thành phố Hà Nội', label: 'Hà Nội', icon: '🌆' },
  { key: 'Thành phố Hồ Chí Minh', label: 'TP. Hồ Chí Minh', icon: '🏙️' },
  { key: 'Hải Phòng', label: 'Hải Phòng', icon: '⛴️' },
];

export function BuildingsByCitySection() {
  const router = useRouter();
  const [activeCity, setActiveCity] = useState(CITIES[0].key);
  const [data, setData] = useState<Record<string, BuildingSearchDTO[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    statisticsApi.getTopBuildingsByProvinces(CITIES.map(c => c.key), 5)
      .then(res => setData(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const currentBuildings = data[activeCity] || [];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          📍 Tòa nhà nổi bật theo thành phố
        </h2>
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          {CITIES.map(city => (
            <button
              key={city.key}
              onClick={() => setActiveCity(city.key)}
              className={`px-6 py-2 rounded-full transition flex items-center gap-2 ${
                activeCity === city.key
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-blue-50'
              }`}
            >
              <span>{city.icon}</span>
              {city.label}
            </button>
          ))}
        </div>
        {loading ? (
          <div className="text-center py-12">Đang tải...</div>
        ) : currentBuildings.length === 0 ? (
          <div className="text-center py-12">Chưa có dữ liệu</div>
        ) : (
          <motion.div
            key={activeCity}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
          >
            {currentBuildings.map(b => (
              <BuildingCard key={b.id} building={b} onClick={() => router.push(`/buildings/${b.id}`)} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}