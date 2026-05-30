export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">403</h1>
        <p className="text-gray-600 mt-2">Bạn không có quyền truy cập trang này.</p>
      </div>
    </div>
  );
}