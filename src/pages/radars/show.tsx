import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { useParams } from "react-router";
import { z } from "zod";

import { RADAR_API_URL } from "@/constants/application";

import { radarSchema } from "@/schemas/radar";

export default function ShowRadarPage() {
  const { id } = useParams();
  const auth = useAuth();
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
      <h1 className="text-3xl font-bold underline">Show radar</h1>
    </>
  );
}
