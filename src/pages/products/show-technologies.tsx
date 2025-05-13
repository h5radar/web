import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useAuth } from "react-oidc-context";
import { z } from "zod";
import { API_URL } from "@/constants";
import { radarSchema } from "@/schemas/radar";
import ProductRadarDiffView from "@/components/products/technologies-view";

export default function ShowProductTechnologiesPage() {
  const auth = useAuth();
  const { id } = useParams();
  const [radar, setRadar] = useState<z.infer<typeof radarSchema>>();
  useEffect(() => {
    fetch(`${API_URL}/radars/${id}`, {
      headers: {
        Authorization: `Bearer ${auth.user?.access_token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setRadar(data);
      });
  }, [auth, id]);

  if (!radar) return <h1>Loading...</h1>;
  return (
    <>
      <ProductRadarDiffView data={radar} />
    </>
  );
}
