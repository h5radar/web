import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "react-oidc-context";
import { toast } from "sonner";
import { z } from "zod";

import { technologySchema } from "@/schemas/technology";

import TechnologyForm from "@/pages/technologies/form";
import { useGetTechnology, useUpdateTechnology } from "@/queries/technology.ts";

export default function EditTechnologyPage() {
  const auth = useAuth();
  const queryClient = useQueryClient();
  const url = new URL(window.location.href);
  const id = url.pathname.split("/")[3];

  const { data: technology, isFetching: isFetching, isError: isError, error: error} = useGetTechnology(auth, id);
  const { mutate: updateTechnology, isPending: isPending } = useUpdateTechnology(auth, queryClient, id);


  if (isError) {
    toast("Load error", {
      description: JSON.stringify(error.message),
    });
  }

  function onSubmit(values: z.infer<typeof technologySchema>) {
    updateTechnology(values);
  }

  if (isFetching) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <TechnologyForm defaultDataForm={technology} onSubmit={onSubmit} disabled={isPending} />
    </>
  );
}
