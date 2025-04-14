import { useState, useEffect } from "react";
import { z } from "zod";
import { API_URL } from "@/constants";
import { technologySchema } from "@/schemas/technology";
import { TechnologyTable } from "@/components/technologies/table";

export default function TechnologiesPage() {
  const [technologies, setTechnologies] = useState<z.infer<typeof technologySchema>[]>([]);
  useEffect(() => {
    fetch(`${API_URL}/technologies`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTechnologies(data);
      });
  }, []);

  if (!technologies.length) return <h1>Loading...</h1>;
  return (
    <>
      <TechnologyTable data={technologies} />
    </>
  );
}
