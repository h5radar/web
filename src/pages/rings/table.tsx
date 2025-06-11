import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { z } from "zod";

import { RADAR_API_URL } from "@/constants/application";

import { ringSchema } from "@/schemas/ring";

export default function RingsPage() {
  const auth = useAuth();
  const [rings, setRings] = useState<z.infer<typeof ringSchema>[]>([]);
  useEffect(() => {
    fetch(`${RADAR_API_URL}/rings`, {
      headers: {
        Authorization: `Bearer ${auth.user?.access_token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setRings(data);
      });
  }, [auth]);

  return (
    <>
      <h1 className="text-3xl font-bold underline">Rings</h1>
      <div>{rings.length}</div>
    </>
  );
}
