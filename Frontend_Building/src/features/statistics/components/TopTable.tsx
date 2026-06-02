// src/features/statistics/components/TopTable.tsx
interface Props {
  title: string;
  data: Array<Record<string, any>>;
  columns: { header: string; accessor: string }[];
}

export const TopTable: React.FC<Props> = ({ title, data, columns }) => (
  <div className="bg-white rounded-lg shadow p-4">
    <h3 className="text-lg font-semibold mb-3">{title}</h3>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th key={col.accessor} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row, idx) => (
            <tr key={idx}>
              {columns.map((col) => (
                <td key={col.accessor} className="px-4 py-2 text-sm text-gray-900">
                  {row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);