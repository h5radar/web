import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { z } from "zod";

import { RADAR_API_URL } from "@/constants/application";

import { repositorySchema } from "@/schemas/repository";

export default function RepositoriesPage() {
  const auth = useAuth();
  const [repositories, setRepositories] = useState<z.infer<typeof repositorySchema>[]>([]);
  useEffect(() => {
    fetch(`${RADAR_API_URL}/repositories`, {
      headers: {
        Authorization: `Bearer ${auth.user?.access_token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setRepositories(data);
      });
  }, [auth]);

  if (!repositories.length) return <h1>Loading...</h1>;
  return (
    <>
      <h1 className="text-3xl font-bold underline">Repositories</h1>
    </>
  );
}
