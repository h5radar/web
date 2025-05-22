import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { useParams } from "react-router";
import { z } from "zod";

import { API_URL } from "@/constants/application";

import { radarSchema } from "@/schemas/radar";

import RadarView from "@/components/radars/view";

export default function ShowRadarPage() {
  const { id } = useParams();
  const auth = useAuth();
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
      <RadarView data={radar} />
    </>
  );
}
