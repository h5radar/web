// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import {z} from 'zod';
// import {RADAR_API_URL} from '@/constants';
// import {radarSchema} from '@/schemas/radar';
// import ProductHeatmapView from '@/components/products/heatmap-view';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function ShowProductContributionsPage() {
  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="pv" stackId="a" fill="#8884d8" />
      <Bar dataKey="amt" stackId="a" fill="#82ca9d" />
      <Bar dataKey="uv" fill="#ffc658" />
    </BarChart>
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
      <ProductHeatmapView data={radar}/>
    </>
  )
  */
}
