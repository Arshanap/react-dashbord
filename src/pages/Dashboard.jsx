import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

const data = [
  { month: "Jan", sales: 400, visits: 2400 },
  { month: "Feb", sales: 300, visits: 2210 },
  { month: "Mar", sales: 500, visits: 2290 },
  { month: "Apr", sales: 278, visits: 2000 },
];

const Dashboard = ()=> {
  return (
    <div className="row g-4">
      <div className="col-12 col-md-6">
        <div className="bg-primary text-white p-4 rounded shadow-sm h-100">
          <h2 className="mb-3 fw-bold">Sales</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <XAxis dataKey="month" stroke="#dee2e6" />
              <YAxis stroke="#dee2e6" />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#0d6efd" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="col-12 col-md-6">
        <div className="bg-primary text-white p-4 rounded shadow-sm h-100">
          <h2 className="mb-3 fw-bold">Visits</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <XAxis dataKey="month" stroke="#dee2e6" />
              <YAxis stroke="#dee2e6" />
              <Tooltip />
              <Bar dataKey="visits" fill="#198754" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard