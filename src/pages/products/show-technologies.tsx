import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { z } from "zod";
import { API_URL } from "@/constants";
import { radarSchema } from "@/schemas/radar";
import ProductRadarDiffView from "@/components/products/technologies-view";

export default function ShowProductTechnologiesPage() {
  const { id } = useParams();

  const [radar, setRadar] = useState<z.infer<typeof radarSchema>>();
  useEffect(() => {
    fetch(`${API_URL}/radars/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setRadar(data);
      });
  }, [id]);

  if (!radar) return <h1>Loading...</h1>;
  return (
    <>
      <ProductRadarDiffView data={radar} />
    </>
  );
}
