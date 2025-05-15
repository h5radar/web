import { useEffect, useRef } from "react";
import { z } from "zod";

import { radarSchema } from "@/schemas/radar";

import { drawRadar } from "@/lib/radar";

const RadarView = ({ data }: { data: z.infer<typeof radarSchema> }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    drawRadar(data);
  }, [data]);

  return <svg ref={svgRef} id="radar"></svg>;
};

export default RadarView;
