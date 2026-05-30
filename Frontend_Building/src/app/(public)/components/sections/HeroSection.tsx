// app/(public)/_components/sections/HeroSection.tsx
export function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Tìm kiếm văn phòng cho thuê</h1>
        <p className="text-xl text-blue-100 mb-8">Hàng ngàn mặt bằng chất lượng cao tại Việt Nam</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
            <div className="text-2xl font-bold">500+</div>
            <div className="text-sm">Tòa nhà</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
            <div className="text-2xl font-bold">1000+</div>
            <div className="text-sm">Mặt bằng</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
            <div className="text-2xl font-bold">98%</div>
            <div className="text-sm">Hài lòng</div>
          </div>
        </div>
      </div>
    </section>
  );
}