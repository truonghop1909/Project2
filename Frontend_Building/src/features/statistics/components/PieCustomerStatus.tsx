// src/features/statistics/components/PieCustomerStatus.tsx
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Props {
  pending: number;
  approved: number;
  rejected: number;
}

const COLORS = ['#FFBB28', '#00C49F', '#FF8042'];

export const PieCustomerStatus: React.FC<Props> = ({ pending, approved, rejected }) => {
  const data = [
    { name: 'Chờ duyệt', value: pending },
    { name: 'Đã duyệt', value: approved },
    { name: 'Từ chối', value: rejected },
  ].filter(item => item.value > 0);
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};