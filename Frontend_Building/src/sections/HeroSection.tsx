'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { statisticsApi } from '@/features/statistics/api/statistics.api';
import { PublicStatisticsDTO } from '@/features/statistics/types/statistics.type';
import CountUp from 'react-countup';
import { Building2, MapPin, TrendingUp, Search } from 'lucide-react';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(value);
};

export function HeroSection() {
  const [stats, setStats] = useState<PublicStatisticsDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    statisticsApi.getPublicStatistics()
      .then(res => setStats(res.data))
      .catch(err => console.error("Lỗi tải thống kê:", err))
      .finally(() => setLoading(false));
  }, []);

  const numberOfProvinces = stats ? Object.keys(stats.buildingsByProvince).length : 0;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/buildings?name=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0A2540] via-[#0F3B6A] to-[#1E4A76] text-white">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
      <div className="relative container mx-auto px-4 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Tìm kiếm <span className="text-accent">văn phòng</span> cho thuê
          </h1>
          <p className="text-xl text-blue-100 mb-8">Hàng ngàn mặt bằng chất lượng cao tại Việt Nam</p>
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
            <div className="flex gap-2 bg-white rounded-full p-1 shadow-lg">
              <input
                type="text"
                placeholder="Nhập tên tòa nhà, quận/huyện..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-6 py-3 rounded-full text-gray-800 placeholder-gray-400 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-accent text-primary px-6 py-3 rounded-full transition hover:bg-accent-dark flex items-center gap-2 font-semibold"
              >
                <Search size={20} />
                Tìm kiếm
              </button>
            </div>
          </form>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition">
            <Building2 className="w-10 h-10 mx-auto mb-3 text-accent" />
            <div className="text-3xl md:text-4xl font-bold">
              {loading ? '...' : <CountUp end={stats?.totalBuildings || 0} duration={2} separator="," />}
            </div>
            <div className="text-sm text-blue-100">Tòa nhà cho thuê</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition">
            <TrendingUp className="w-10 h-10 mx-auto mb-3 text-accent" />
            <div className="text-2xl md:text-3xl font-bold">
              {loading ? '...' : formatCurrency(stats?.avgRentPrice || 0)}
            </div>
            <div className="text-sm text-blue-100">Giá thuê trung bình/tháng</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition">
            <MapPin className="w-10 h-10 mx-auto mb-3 text-accent" />
            <div className="text-3xl md:text-4xl font-bold">
              {loading ? '...' : <CountUp end={numberOfProvinces} duration={2} />}
            </div>
            <div className="text-sm text-blue-100">Tỉnh thành</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}