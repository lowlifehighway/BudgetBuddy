import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function Chart({ payment_data }) {
  if (!payment_data || payment_data.length === 0) return <p>No data</p>;

  // Group data by month/year
  const grouped = Object.values(
    payment_data.reduce((acc, item) => {
      const date = new Date(item.due_date);
      const month = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();
      const key = `${year}-${date.getMonth()}`;

      if (!acc[key]) acc[key] = { monthYear: `${month} ${year}`, amount: 0 };
      acc[key].amount += Number(item.amount);
      return acc;
    }, {})
  ).sort((a, b) => new Date(a.monthYear) - new Date(b.monthYear));

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={grouped} margin={{ right: 30 }}>
          <XAxis dataKey="monthYear" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
