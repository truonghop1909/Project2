"use client";
import { useState } from "react";
import ContactModal from "@/features/customer/components/modal/ContactModal";

export default function ContactPage() {
  const [isModalOpen, setIsModalOpen] = useState(true); // mở ngay khi vào trang
  return <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />;
}