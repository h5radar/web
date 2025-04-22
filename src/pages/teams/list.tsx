import { useState, useEffect } from "react";
import { z } from "zod";
import { useAuth } from "react-oidc-context";
import { API_URL } from "@/constants";
import { teamSchema } from "@/schemas/team";
import { TeamTable } from "@/components/teams/table";

export default function TeamsPage() {
  const auth = useAuth();
  const [teams, setTeams] = useState<z.infer<typeof teamSchema>[]>([]);
  useEffect(() => {
    fetch(`${API_URL}/teams`, {
      headers: {
        Authorization: `Bearer ${auth.user?.access_token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTeams(data);
      });
  }, [auth]);

  if (!teams.length) return <h1>Loading...</h1>;
  return (
    <>
      <TeamTable data={teams} />
    </>
  );
}
