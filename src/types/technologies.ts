import { technologySchema } from "@/schemas/technology";
import { z } from "zod";

interface IPageable {
  pageNumber: number;
  pageSize: number;
}
export interface IGetTechnologies {
  content: z.infer<typeof technologySchema>[];
  pageable: IPageable;
  totalElements: number;
}
