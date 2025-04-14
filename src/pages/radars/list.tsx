import { useState, useEffect } from "react";
import { z } from "zod";
import { API_URL } from "@/constants";
import { radarSchema } from "@/schemas/radar";
import { RadarTable } from "@/components/radars/table";
import { useAuth } from "react-oidc-context";

export default function RadarsPage() {
  const [radars, setRadars] = useState<z.infer<typeof radarSchema>[]>([]);
  const auth = useAuth();
  useEffect(() => {
    fetch(`${API_URL}/radars`, {
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

  if (!radars.length) return <h1>Loading...</h1>;
  return (
    <>
      <RadarTable data={radars} />
    </>
  );
}
