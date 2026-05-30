"use client";
import { useState } from "react";
import ContactModal from "@/features/customer/components/modal/ContactModal";

export function CTASection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Bạn muốn tìm văn phòng phù hợp?</h2>
          <p className="text-xl text-blue-100 mb-6">Liên hệ ngay để được tư vấn miễn phí</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-md"
          >
            Liên hệ ngay
          </button>
        </div>
      </section>
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}