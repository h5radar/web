// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import {z} from 'zod';
// import {RADAR_API_URL} from '@/constants';
// import {radarSchema} from '@/schemas/radar';
// import ProductLicenseDiffView from '@/components/products/license-diff-view';
// import './styles.css';
// import React /*, { useCallback, useState }*/ from 'react';
import { Cell, Pie, PieChart } from "recharts";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent}: any) => {
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function ShowProductLicensesPage() {
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((_entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );

  /*
  const { id } = useParams();

  const [radar, setRadar] = useState<z.infer<typeof radarSchema>>();
  useEffect(() => {
    fetch(`${RADAR_API_URL}/radars/${id}`).then((res) => {
      return res.json();
    }).then((data) => {
      setRadar(data);
    });
  }, [ id ]);

  if (!radar) return <h1>Loading...</h1>;
  return (
    <>
      <ProductLicenseDiffView data={radar}/>
    </>
  )
   */
}
