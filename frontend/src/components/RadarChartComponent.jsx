import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg p-2.5 shadow-md border" style={{ background: '#FCFAF5', borderColor: 'rgba(0,0,0,0.08)' }}>
        <p className="text-xs font-semibold" style={{ color: '#1E1E1E' }}>{payload[0].payload.subject}</p>
        <p className="text-sm font-bold mt-0.5" style={{ color: '#FF7900' }}>{payload[0].value}/100</p>
      </div>
    );
  }
  return null;
};

const RadarChartComponent = ({ scores, height = 320 }) => {
  const data = [
    { subject: 'Investor', score: scores.investor || 0, fullMark: 100 },
    { subject: 'Competitor', score: scores.competitor || 0, fullMark: 100 },
    { subject: 'Finance', score: scores.finance || 0, fullMark: 100 },
    { subject: 'Customer', score: scores.customer || 0, fullMark: 100 },
    { subject: 'Risk', score: scores.risk || 0, fullMark: 100 },
    { subject: 'Product', score: scores.productStrategy || 0, fullMark: 100 },
  ];

  return (
    <div className="w-full flex items-center justify-center bg-transparent">
      <ResponsiveContainer width="100%" height={height}>
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="rgba(0,0,0,0.08)" strokeDasharray="3 3" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: '#1E1E1E', fontSize: 10, fontWeight: 600 }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: '#5C5C5C', fontSize: 9 }}
            stroke="rgba(0,0,0,0.08)"
            tickCount={5}
          />
          <Tooltip content={<CustomTooltip />} />
          <Radar
            name="Startup Profile"
            dataKey="score"
            stroke="#FFBF00"
            strokeWidth={2}
            fill="#FFBF00"
            fillOpacity={0.15}
            animationBegin={200}
            animationDuration={1200}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarChartComponent;
