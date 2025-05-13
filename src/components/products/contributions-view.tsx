import { useEffect, useRef } from "react";
import { z } from "zod";

import { drawRadar } from "@/lib/radar";
import { radarSchema } from "@/schemas/radar";

const ShowProductContributionsView = ({ data }: { data: z.infer<typeof radarSchema> }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    drawRadar(data);
  }, [data]);

  return <svg ref={svgRef} id="radar"></svg>;
};

export default ShowProductContributionsView;
