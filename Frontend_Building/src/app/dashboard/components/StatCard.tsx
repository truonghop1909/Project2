interface Props {
  title: string;
  value: string | number;
  note?: string;
}

export default function StatCard({ title, value, note }: Props) {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-5 hover:shadow transition">
      <p className="text-sm text-gray-500 tracking-wide">
        {title}
      </p>

      <p className="text-3xl font-semibold mt-1 text-gray-800">
        {value}
      </p>

      {note && (
        <p className="text-xs text-green-600 mt-2">
          {note}
        </p>
      )}
    </div>
  );
}
