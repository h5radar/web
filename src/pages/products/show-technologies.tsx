import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { useParams } from "react-router";
import { z } from "zod";

import { RADAR_API_URL } from "@/constants/application";

import { radarSchema } from "@/schemas/radar";

import ProductRadarDiffView from "@/components/products/technologies-view";

export default function ShowProductTechnologiesPage() {
  const auth = useAuth();
  const { id } = useParams();
  const [radar, setRadar] = useState<z.infer<typeof radarSchema>>();
  useEffect(() => {
    fetch(`${RADAR_API_URL}/radars/${id}`, {
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
