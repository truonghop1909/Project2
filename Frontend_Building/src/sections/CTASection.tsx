'use client';
import { useState } from 'react';
import ContactModal from '@/features/customer/components/modal/ContactModal';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

export function CTASection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <AnimatedSection direction="up">
        <section className="bg-gradient-to-r from-primary to-[#1E4A76] text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Bạn muốn tìm văn phòng phù hợp?</h2>
            <p className="text-xl text-blue-100 mb-8">Liên hệ ngay để được tư vấn miễn phí</p>
            <button onClick={() => setIsModalOpen(true)} className="inline-block bg-accent text-primary px-8 py-3 rounded-full font-semibold hover:bg-accent-dark transition shadow-lg hover:shadow-xl">📞 Liên hệ ngay</button>
          </div>
        </section>
      </AnimatedSection>
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}