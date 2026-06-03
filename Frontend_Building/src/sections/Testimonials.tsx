'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Star } from 'lucide-react';

const testimonials = [
  { name: 'Nguyễn Văn A', role: 'Giám đốc Công ty ABC', content: 'Dịch vụ tuyệt vời, tìm được văn phòng ưng ý chỉ sau 2 ngày.', rating: 5, avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { name: 'Trần Thị B', role: 'CEO StartUp XYZ', content: 'Nhiều lựa chọn, thủ tục nhanh chóng, nhân viên hỗ trợ nhiệt tình.', rating: 5, avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { name: 'Lê Văn C', role: 'Trưởng phòng kinh doanh', content: 'Giá cả cạnh tranh, thông tin chính xác.', rating: 4, avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
];

export function Testimonials() {
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">💬 Khách hàng nói gì về chúng tôi</h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        className="pb-12"
      >
        {testimonials.map((t, i) => (
          <SwiperSlide key={i}>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <img src={t.avatar} alt={t.name} className="w-20 h-20 rounded-full mx-auto mb-4 object-cover" />
              <div className="flex justify-center mb-2">
                {[...Array(t.rating)].map((_, i) => <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-gray-600 italic">"{t.content}"</p>
              <h4 className="font-semibold mt-4">{t.name}</h4>
              <p className="text-sm text-gray-400">{t.role}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}