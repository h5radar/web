import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { z } from "zod";

import { RADAR_API_URL } from "@/constants/application";

import { authorSchema } from "@/schemas/author";

export default function AuthorsPage() {
  const auth = useAuth();
  const [authors, setAuthors] = useState<z.infer<typeof authorSchema>[]>([]);
  useEffect(() => {
    fetch(`${RADAR_API_URL}/authors`, {
      headers: {
        Authorization: `Bearer ${auth.user?.access_token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAuthors(data);
      });
  }, [auth]);

  return (
    <>
      <h1 className="text-3xl font-bold underline">Authors</h1>
      <div>{authors.length}</div>
    </>
  );
}
