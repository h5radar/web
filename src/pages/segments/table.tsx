import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { z } from "zod";

import { RADAR_API_URL } from "@/constants/application";

import { segmentSchema } from "@/schemas/segment";

export default function SegmentsPage() {
  const auth = useAuth();
  const [segments, setSegments] = useState<z.infer<typeof segmentSchema>[]>([]);
  useEffect(() => {
    fetch(`${RADAR_API_URL}/segments`, {
      headers: {
        Authorization: `Bearer ${auth.user?.access_token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setSegments(data);
      });
  }, [auth]);

  return (
    <>
      <h1 className="text-3xl font-bold underline">Segments</h1>
      <div>{segments.length}</div>
    </>
  );
}
