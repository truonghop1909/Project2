import Link from 'next/link';

export function PublicFooter() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-3">BuildingHub</h3>
          <p className="text-gray-400 text-sm">Nền tảng cho thuê văn phòng hàng đầu Việt Nam.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Liên kết</h4>
          <ul className="text-sm text-gray-400 space-y-1">
            <li><Link href="/buildings" className="hover:text-white transition">Tìm văn phòng</Link></li>
            <li><Link href="/about" className="hover:text-white transition">Về chúng tôi</Link></li>
            <li><Link href="/contact" className="hover:text-white transition">Liên hệ</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Hỗ trợ</h4>
          <ul className="text-sm text-gray-400 space-y-1">
            <li><a href="#" className="hover:text-white transition">FAQ</a></li>
            <li><a href="#" className="hover:text-white transition">Chính sách bảo mật</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Kết nối</h4>
          <div className="flex space-x-3 text-gray-400">{/* Thêm icon nếu cần */}</div>
        </div>
      </div>
      <div className="text-center text-gray-500 text-sm mt-8 pt-4 border-t border-gray-700">
        © 2025 BuildingHub. All rights reserved.
      </div>
    </footer>
  );
}