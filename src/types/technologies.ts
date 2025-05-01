import { technologySchema } from "@/schemas/technology";
import { z } from "zod";

export interface IFilter {
  title?: string;
  website?: string;
}

interface IPageable {
  pageNumber: number;
  pageSize: number;
}
export interface IGetTechnologies {
  content: z.infer<typeof technologySchema>[];
  pageable: IPageable;
  totalElements: number;
}
