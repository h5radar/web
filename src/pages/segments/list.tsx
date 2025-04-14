import { useState, useEffect } from "react";
import { z } from "zod";
import { API_URL } from "@/constants";
import { segmentSchema } from "@/schemas/segment";
import { SegmentTable } from "@/components/segments/table";

export default function SegmentsPage() {
  const [segments, setSegments] = useState<z.infer<typeof segmentSchema>[]>([]);
  useEffect(() => {
    fetch(`${API_URL}/segments`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setSegments(data);
      });
  }, []);

  if (!segments.length) return <h1>Loading...</h1>;
  return (
    <>
      <SegmentTable data={segments} />
    </>
  );
}
