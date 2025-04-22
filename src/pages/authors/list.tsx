import { useState, useEffect } from "react";
import { z } from "zod";
import { useAuth } from "react-oidc-context";
import { API_URL } from "@/constants";
import { authorSchema } from "@/schemas/author";
import { AuthorTable } from "@/components/authors/table";

export default function AuthorsPage() {
  const auth = useAuth();
  const [authors, setAuthors] = useState<z.infer<typeof authorSchema>[]>([]);
  useEffect(() => {
    fetch(`${API_URL}/authors`, {
      headers: {
        "Authorization": `Bearer ${auth.user?.access_token}`,
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
