import { useState, useEffect } from "react";
import { z } from "zod";
import { API_URL } from "@/constants";
import { ringSchema } from "@/schemas/ring";
import { RingTable } from "@/components/rings/table";

export default function RingsPage() {
  const [rings, setRings] = useState<z.infer<typeof ringSchema>[]>([]);
  useEffect(() => {
    fetch(`${API_URL}/rings`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setRings(data);
      });
  }, []);

  if (!rings.length) return <h1>Loading...</h1>;
  return (
    <>
      <RingTable data={rings} />
    </>
  );
}
