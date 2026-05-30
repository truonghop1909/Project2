"use client";
import { useState, useEffect } from "react";
import ContactModal from "@/features/customer/components/modal/ContactModal";

export default function ContactPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsModalOpen(true);
  }, []);

  if (!mounted) return null; // hoặc loading skeleton

  return <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />;
}