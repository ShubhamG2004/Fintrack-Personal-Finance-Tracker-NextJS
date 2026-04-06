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
import { ArrowUpRight, TrendingUp } from "lucide-react";

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
      <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-lg">
        <p className="font-semibold text-gray-800">{label}</p>
        <div className="mt-1 flex items-center">
          <div className="mr-2 h-3 w-3 rounded-full bg-purple-600"></div>
          <span className="text-sm text-gray-600">Spent: </span>
          <span className="ml-1 text-sm font-medium">₹{payload[0].value}</span>
        </div>
        <div className="mt-1 flex items-center">
          <div className="mr-2 h-3 w-3 rounded-full bg-purple-300"></div>
          <span className="text-sm text-gray-600">Budget: </span>
          <span className="ml-1 text-sm font-medium">₹{payload[1].value}</span>
        </div>
      </div>
    );
  }
  return null;
};

function BarChartDashboard({ budgetList }) {

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="font-bold text-xl text-gray-800">Budget Activity</h2>
          <p className="text-sm text-gray-500">Monthly spending vs budget</p>
        </div>
        
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={budgetList}
            margin={{
              top: 0,
              right: 20,
              left: 0,
              bottom: 10,
            }}
            barSize={32}
          >
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <Tooltip 
              content={<CustomTooltip />} 
              cursor={{ fill: '#F3F4F6' }}
            />
            <Legend 
              iconType="circle"
              iconSize={10}
              formatter={(value) => (
                <span className="text-xs text-gray-500">{value}</span>
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
                <Cell key={`cell-${index}`} fill="#6C5CE7" />
              ))}
            </Bar>
            <Bar 
              dataKey="amount" 
              name="Budget"
              shape={<CustomBarShape />}
            >
              {budgetList.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="#A29BFE" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      
    </div>
  );
}

export default BarChartDashboard;