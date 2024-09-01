'use client';
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const allData = {
  year: [
    { name: 'Jan', ServiceA: 4000, ServiceB: 2400, ServiceC: 2400 },
    { name: 'Feb', ServiceA: 3000, ServiceB: 1398, ServiceC: 2210 },
    //...data for other months
  ],
  month: [
    { name: 'Week 1', ServiceA: 3, ServiceB: 5, ServiceC: 11 },
    { name: 'Week 2', ServiceA: 1200, ServiceB: 700, ServiceC: 9 },
    { name: 'Week 3', ServiceA: 4, ServiceB: 1, ServiceC: 3 },
    { name: 'Week 4', ServiceA: 55, ServiceB: 11, ServiceC: 5 },
    //...data for other weeks
  ]
};

export const ServiceLineChart = () => {
  const [timeRange, setTimeRange] = useState('year');

  const handleChange = (e) => {
    setTimeRange(e.target.value);
  };

  return (
    <div>
      <select onChange={handleChange} value={timeRange}>
        <option value="year">Year</option>
        <option value="month">Month</option>
      </select>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={allData[timeRange]} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="ServiceA" stroke="#8884d8" />
          <Line type="monotone" dataKey="ServiceB" stroke="#82ca9d" />
          <Line type="monotone" dataKey="ServiceC" stroke="#ff7300" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

