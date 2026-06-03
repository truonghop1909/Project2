'use client';
import { useEffect, useState } from 'react';
import { statisticsApi } from '@/features/statistics/api/statistics.api';
import { PublicStatisticsDTO } from '@/features/statistics/types/statistics.type';
import { Building2, DollarSign, MapPin, TrendingUp } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const formatCurrency = (value: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(value);

export function StatsPreview() {
  const [stats, setStats] = useState<PublicStatisticsDTO | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    statisticsApi.getPublicStatistics().then(res => setStats(res.data)).catch(console.error).finally(() => setLoading(false));
  }, []);
  if (loading) return <div className="py-12 text-center text-gray-500">Đang tải...</div>;
  if (!stats) return null;
  const topProvinces = Object.entries(stats.buildingsByProvince).sort((a,b)=>b[1]-a[1]).slice(0,3).map(([n,c])=>({name:n,count:c}));
  return (
    <AnimatedSection className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Thị trường văn phòng cho thuê</h2>
          <p className="text-gray-600 mt-2">Cập nhật số liệu mới nhất</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center border-t-4 border-accent hover:shadow-xl transition">
            <Building2 className="w-12 h-12 text-primary mx-auto mb-3" />
            <div className="text-3xl font-bold text-primary">{stats.totalBuildings.toLocaleString()}</div>
            <div className="text-sm text-gray-500">Tòa nhà cho thuê</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center border-t-4 border-accent hover:shadow-xl transition">
            <DollarSign className="w-12 h-12 text-primary mx-auto mb-3" />
            <div className="text-2xl font-bold text-primary">{formatCurrency(stats.avgRentPrice)}</div>
            <div className="text-sm text-gray-500">Giá thuê TB/tháng</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center border-t-4 border-accent hover:shadow-xl transition">
            <TrendingUp className="w-12 h-12 text-primary mx-auto mb-3" />
            <div className="text-md font-semibold text-primary"><span className="text-green-600">{formatCurrency(stats.minRentPrice)}</span> - <span className="text-red-600">{formatCurrency(stats.maxRentPrice)}</span></div>
            <div className="text-sm text-gray-500">Khoảng giá thuê</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center border-t-4 border-accent hover:shadow-xl transition">
            <MapPin className="w-12 h-12 text-primary mx-auto mb-3" />
            <div className="text-md font-semibold text-primary">{topProvinces.map(p=>`${p.name} (${p.count})`).join(", ")}</div>
            <div className="text-sm text-gray-500">Địa điểm nhiều văn phòng nhất</div>
          </div>
        </div>
        <div className="text-center mt-8 text-sm text-gray-500">Dữ liệu được tổng hợp từ {stats.totalBuildings} tòa nhà trên toàn quốc</div>
      </div>
    </AnimatedSection>
  );
}