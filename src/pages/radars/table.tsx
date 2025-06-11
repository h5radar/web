import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { z } from "zod";

import { RADAR_API_URL } from "@/constants/application";

import { radarSchema } from "@/schemas/radar";

export default function RadarsPage() {
  const auth = useAuth();
  const [radars, setRadars] = useState<z.infer<typeof radarSchema>[]>([]);
  useEffect(() => {
    fetch(`${RADAR_API_URL}/radars`, {
      headers: {
        authorization: `Bearer ${auth.user?.access_token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setRadars(data);
      });
  }, [auth]);

  return (
    <>
      <h1 className="text-3xl font-bold underline">Radars</h1>
      <div>{radars.length}</div>
    </>
  );
}
