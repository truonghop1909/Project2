interface Activity {
  content: string;
  time: string;
}

interface Props {
  activities: Activity[];
  title?: string;
}

export default function RecentActivity({ activities, title }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-5">
      <h3 className="font-semibold mb-4 text-gray-800">
        {title || "Hoạt động gần đây"}
      </h3>

      <ul className="space-y-3 text-sm">
        {activities.map((item, index) => (
          <li key={index} className="flex justify-between text-gray-700">
            <span>{item.content}</span>
            <span className="text-gray-400">{item.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
