import { useState, useEffect } from "react";
import { z } from "zod";
import { useAuth } from "react-oidc-context";
import { API_URL } from "@/constants";
import { technologySchema } from "@/schemas/technology";
import { TechnologyTable } from "@/components/technologies/table";

export default function TechnologiesPage() {
  const auth = useAuth();
  const [technologies, setTechnologies] = useState<z.infer<typeof technologySchema>[]>([]);
  useEffect(() => {
    fetch(`${API_URL}/technologies`, {
      headers: {
        "Authorization": `Bearer ${auth.user?.access_token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTechnologies(data);
      });

  }, [auth]);

  if (!technologies.length) return <h1>Loading...</h1>;
  return (
    <>
      <TechnologyTable data={technologies} />
    </>
  );
}
