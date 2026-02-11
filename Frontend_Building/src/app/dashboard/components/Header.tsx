// app/dashboard/components/Header.tsx
export default function Header() {
  return (
    <header className="h-14 bg-white border-b flex items-center px-6 justify-between">
      <h1 className="font-semibold text-lg text-gray-800">
        Admin Dashboard
      </h1>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">
          Xin chào 👋
        </span>
        <div className="w-8 h-8 rounded-full bg-gray-300 ring-2 ring-gray-100" />
      </div>
    </header>
  );
}
