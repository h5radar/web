import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { z } from "zod";

import { RADAR_API_URL } from "@/constants/application";

import { teamSchema } from "@/schemas/team";

import { TeamTable } from "@/components/teams/table";

export default function TeamsPage() {
  const auth = useAuth();
  const [teams, setTeams] = useState<z.infer<typeof teamSchema>[]>([]);
  useEffect(() => {
    fetch(`${RADAR_API_URL}/teams`, {
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
