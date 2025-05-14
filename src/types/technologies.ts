import { z } from "zod";

import { technologySchema } from "@/schemas/technology";

interface IPageable {
  pageNumber: number;
  pageSize: number;
}
export interface IGetTechnologies {
  content: z.infer<typeof technologySchema>[];
  pageable: IPageable;
  totalElements: number;
}
