// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import {z} from 'zod';
// import {API_URL} from '@/constants';
// import {radarSchema} from '@/schemas/radar';
// import ProductCobwebDiffView from '@/components/products/cobweb-diff-view';

import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis } from "recharts";

const data = [
  {
    subject: "Unit tests",
    A: 120,
    B: 110,
    fullMark: 150,
  },
  {
    subject: "Functional tests",
    A: 98,
    B: 130,
    fullMark: 150,
  },
  {
    subject: "E2e tests",
    A: 86,
    B: 130,
    fullMark: 150,
  },
  {
    subject: "Performance tests",
    A: 99,
    B: 100,
    fullMark: 150,
  },
  {
    subject: "Coverage",
    A: 85,
    B: 90,
    fullMark: 150,
  },
  {
    subject: "History",
    A: 65,
    B: 85,
    fullMark: 150,
  },
];

export default function ShowProductPracticesPage() {
  return (
    <RadarChart cx={300} cy={250} outerRadius={150} width={500} height={500} data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis angle={30} domain={[0, 150]} />
      <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      <Radar name="Lily" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
      <Legend />
    </RadarChart>
  );

  /*
  const { id } = useParams();

  const [radar, setRadar] = useState<z.infer<typeof radarSchema>>();
  useEffect(() => {
    fetch(`${API_URL}/radars/${id}`).then((res) => {
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
