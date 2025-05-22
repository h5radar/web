import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { z } from "zod";

import { API_URL } from "@/constants/application";

import { authorSchema } from "@/schemas/author";

import { AuthorTable } from "@/components/authors/table";

export default function AuthorsPage() {
  const auth = useAuth();
  const [authors, setAuthors] = useState<z.infer<typeof authorSchema>[]>([]);
  useEffect(() => {
    fetch(`${API_URL}/authors`, {
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

  if (!authors.length) return <h1>Loading...</h1>;
  return (
    <>
      <AuthorTable data={authors} />
    </>
  );
}
