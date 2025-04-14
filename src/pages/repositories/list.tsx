import { useState, useEffect } from "react";
import { z } from "zod";
import { API_URL } from "@/constants";
import { repositorySchema } from "@/schemas/repository";
import { RepositoryTable } from "@/components/repositories/table";

export default function RepositoriesPage() {
  const [repositories, setRepositories] = useState<z.infer<typeof repositorySchema>[]>([]);
  useEffect(() => {
    fetch(`${API_URL}/repositories`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setRepositories(data);
      });
  }, []);

  if (!repositories.length) return <h1>Loading...</h1>;
  return (
    <>
      <RepositoryTable data={repositories} />
    </>
  );
}
