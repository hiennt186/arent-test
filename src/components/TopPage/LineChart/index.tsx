import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface CustomLineChartProps {
  data: {
    month: string;
    value1: number;
    value2: number;
  }[];
}

const CustomLineChart: React.FC<CustomLineChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={312}>
      <LineChart
        data={data}
        margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
      >
        <CartesianGrid horizontal={false} vertical={true} stroke="#777777" />
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          interval={0}
          tick={({ x, y, payload }) => (
            <g transform={`translate(${x},${y})`}>
              <text x={0} y={0} dy={4} textAnchor="middle" fill="#FFFFFF">
                <tspan className="font-['Inter'] text-[12px] leading-[15px] font-normal">
                  {payload.value.replace("月", "")}
                </tspan>
                <tspan
                  className="font-['Hiragino_Kaku_Gothic_Pro'] text-[8px] leading-[12px] font-light"
                  dx="1"
                >
                  月
                </tspan>
              </text>
            </g>
          )}
        />
        <YAxis hide={true} />
        <Line
          type="linear"
          dataKey="value1"
          stroke="#FFCC21"
          strokeWidth={3}
          dot={{ r: 4, fill: "#FFCC21", strokeWidth: 0 }}
          activeDot={{ r: 4, fill: "#FFCC21", strokeWidth: 0 }}
          animationDuration={300}
        />
        <Line
          type="linear"
          dataKey="value2"
          stroke="#8FE9D0"
          strokeWidth={3}
          dot={{ r: 4, fill: "#8FE9D0", strokeWidth: 0 }}
          activeDot={{ r: 4, fill: "#8FE9D0", strokeWidth: 0 }}
          animationDuration={300}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomLineChart;
