/* eslint-disable */
// @ts-nocheck
// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import {z} from 'zod';
// import {RADAR_API_URL} from '@/constants';
// import {radarSchema} from '@/schemas/radar';
// import ProductCobwebDiffView from '@/components/products/cobweb-diff-view';
import { Legend, RadialBar, RadialBarChart } from "recharts";

const data = [
  {
    name: "18-24",
    uv: 18,
    pv: 2400,
    fill: "#8884d8",
  },
  {
    name: "25-29",
    uv: 26,
    pv: 4567,
    fill: "#83a6ed",
  },
  {
    name: "30-34",
    uv: 31,
    pv: 1398,
    fill: "#8dd1e1",
  },
  {
    name: "35-39",
    uv: 35.22,
    pv: 9800,
    fill: "#82ca9d",
  },
  {
    name: "40-49",
    uv: 45.63,
    pv: 3908,
    fill: "#a4de6c",
  },
  {
    name: "50+",
    uv: 51.63,
    pv: 4800,
    fill: "#d0ed57",
  },
  {
    name: "unknown",
    uv: 99.67,
    pv: 4800,
    fill: "#ffc658",
  },
];

const style = {
  top: 0,
  left: 350,
  lineHeight: "24px",
};

export default function ShowProductFinancesPage() {
  return (
    <RadialBarChart
      width={900}
      height={300}
      cx="50%"
      cy="50%"
      innerRadius="10%"
      outerRadius="80%"
      barSize={10}
      data={data}
    >
      <RadialBar minAngle={15} label={{ position: "insideStart", fill: "#fff" }} background clockWise dataKey="uv" />
      <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
    </RadialBarChart>
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
      <ProductCobwebDiffView data={radar}/>
    </>
  )
  */
}
