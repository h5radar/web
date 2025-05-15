import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { z } from "zod";

import { SegmentTable } from "@/components/segments/table";
import { API_URL } from "@/constants/application.ts";
import { segmentSchema } from "@/schemas/segment";

export default function SegmentsPage() {
  const auth = useAuth();
  const [segments, setSegments] = useState<z.infer<typeof segmentSchema>[]>([]);
  useEffect(() => {
    fetch(`${API_URL}/segments`, {
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

  if (!segments.length) return <h1>Loading...</h1>;
  return (
    <>
      <SegmentTable data={segments} />
    </>
  );
}
