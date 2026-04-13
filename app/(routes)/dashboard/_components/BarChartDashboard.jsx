import React from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";

const CustomBarShape = (props) => {
  const { fill, x, y, width, height } = props;
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fill}
      rx={6}
      ry={6}
    />
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-lg">
        <p className="font-semibold text-slate-900">{label}</p>
        <div className="mt-1 flex items-center">
          <div className="mr-2 h-3 w-3 rounded-full bg-slate-800"></div>
          <span className="text-sm text-slate-600">Spent: </span>
          <span className="ml-1 text-sm font-medium">₹{payload[0].value}</span>
        </div>
        <div className="mt-1 flex items-center">
          <div className="mr-2 h-3 w-3 rounded-full bg-slate-300"></div>
          <span className="text-sm text-slate-600">Budget: </span>
          <span className="ml-1 text-sm font-medium">₹{payload[1].value}</span>
        </div>
      </div>
    );
  }
  return null;
};

function BarChartDashboard({ budgetList }) {
  const totalSpend = budgetList.reduce(
    (acc, item) => acc + Number(item.totalSpend ?? 0),
    0
  );
  const totalBudget = budgetList.reduce((acc, item) => acc + Number(item.amount ?? 0), 0);
  const utilization =
    totalBudget > 0 ? Math.round((totalSpend / totalBudget) * 100) : 0;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md sm:p-6">
      <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Budget Activity</h2>
          <p className="text-sm text-slate-500">Monthly spending vs budget</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-right">
          <p className="text-xs text-slate-500">Utilization</p>
          <p className="text-sm font-semibold text-slate-800">{utilization}%</p>
        </div>
      </div>

      <div className="h-64 sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={budgetList}
            margin={{
              top: 0,
              right: 8,
              left: 0,
              bottom: 14,
            }}
            barSize={22}
          >
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748B', fontSize: 12 }}
              minTickGap={24}
              tickMargin={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748B', fontSize: 12 }}
            />
            <Tooltip 
              content={<CustomTooltip />} 
              cursor={{ fill: '#F8FAFC' }}
            />
            <Legend 
              iconType="circle"
              iconSize={10}
              formatter={(value) => (
                <span className="text-xs text-slate-500">{value}</span>
              )}
              wrapperStyle={{
                paddingTop: '20px'
              }}
            />
            <Bar 
              dataKey="totalSpend" 
              name="Spent"
              shape={<CustomBarShape />}
            >
              {budgetList.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="#0f172a" />
              ))}
            </Bar>
            <Bar 
              dataKey="amount" 
              name="Budget"
              shape={<CustomBarShape />}
            >
              {budgetList.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="#94a3b8" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex flex-col gap-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <span>Total Spent: ₹{totalSpend.toLocaleString("en-IN")}</span>
        <span>Total Budget: ₹{totalBudget.toLocaleString("en-IN")}</span>
      </div>
    </div>
  );
}

export default BarChartDashboard;