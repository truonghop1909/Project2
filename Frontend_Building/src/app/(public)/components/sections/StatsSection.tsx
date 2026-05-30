// app/(public)/_components/sections/StatsSection.tsx
export function StatsSection() {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-4xl font-bold text-blue-600">500+</div>
            <p className="text-gray-600">Khách hàng tin tưởng</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600">200+</div>
            <p className="text-gray-600">Đối tác chiến lược</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600">50+</div>
            <p className="text-gray-600">Nhân viên hỗ trợ</p>
          </div>
        </div>
      </div>
    </section>
  );
}