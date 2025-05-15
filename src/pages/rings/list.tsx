import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { z } from "zod";

import { ringSchema } from "@/schemas/ring";

import { RingTable } from "@/components/rings/table";

import { API_URL } from "@/constants";

export default function RingsPage() {
  const auth = useAuth();
  const [rings, setRings] = useState<z.infer<typeof ringSchema>[]>([]);
  useEffect(() => {
    fetch(`${API_URL}/rings`, {
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

  if (!rings.length) return <h1>Loading...</h1>;
  return (
    <>
      <RingTable data={rings} />
    </>
  );
}
