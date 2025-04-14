import { useState, useEffect } from "react";
import { z } from "zod";
import { API_URL } from "@/constants";
import { teamSchema } from "@/schemas/team";
import { TeamTable } from "@/components/teams/table";

export default function TeamsPage() {
  const [teams, setTeams] = useState<z.infer<typeof teamSchema>[]>([]);
  useEffect(() => {
    fetch(`${API_URL}/teams`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTeams(data);
      });
  }, []);

  if (!teams.length) return <h1>Loading...</h1>;
  return (
    <>
      <TeamTable data={teams} />
    </>
  );
}
