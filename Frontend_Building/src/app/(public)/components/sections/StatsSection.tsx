export function StatsSection() {
  const stats = [
    { value: '500+', label: 'Khách hàng tin tưởng' },
    { value: '200+', label: 'Đối tác chiến lược' },
    { value: '50+', label: 'Nhân viên hỗ trợ' },
  ];
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-4xl font-bold text-blue-600">{stat.value}</div>
              <p className="text-gray-600 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}