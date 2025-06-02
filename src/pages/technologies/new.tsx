import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router";
import { z } from "zod";

import { technologySchema } from "@/schemas/technology";

import { useCreateTechnology } from "@/queries/technology";

import TechnologyForm from "@/pages/technologies/form";

export default function NewTechnologyPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: createTechnology, isPending: isPending } = useCreateTechnology(auth, queryClient, navigate);

  const onSubmit = (values: z.infer<typeof technologySchema>) => {
    createTechnology(values);
  };

  return (
    <>
      <TechnologyForm onSubmit={onSubmit} disabled={isPending} />
    </>
  );
}
