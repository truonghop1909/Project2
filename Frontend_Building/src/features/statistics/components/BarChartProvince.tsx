// src/features/statistics/components/BarChartProvince.tsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface Props {
  data: Record<string, number>;
}

export const BarChartProvince: React.FC<Props> = ({ data }) => {
  const chartData = Object.entries(data).map(([province, count]) => ({ province, count }));
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="province" angle={-45} textAnchor="end" height={80} interval={0} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};