import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "react-oidc-context";
import { toast } from "sonner";
import { z } from "zod";

import { API_URL } from "@/constants/application";

import { technologySchema } from "@/schemas/technology";

import TechnologyForm from "@/pages/technologies/form";
import { GET_TECHNOLOGIES, GET_TECHNOLOGY,UPDATE_TECHNOLOGY } from "@/constants/query-keys";

export default function EditTechnologyPage() {
  const auth = useAuth();
  const queryClient = useQueryClient();
  const url = new URL(window.location.href);
  const id = url.pathname.split("/")[3];

  const {
    data: prevDataTechnologies,
    isFetching: isFetchingTechnologiesData,
    isError: isErrorDataList,
    error: errorDataList,
  } = useQuery({
    queryKey: ["get technology", id],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/technologies/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      return await response.json();
    },
  });

  const { mutate: updateTechnology, isPending: isUpdateTechnology } = useMutation<
    z.infer<typeof technologySchema>,
    Error,
    z.infer<typeof technologySchema>
  >({
    mutationFn: async (values: z.infer<typeof technologySchema>) => {
      const response = await fetch(`${API_URL}/technologies/${id}`, {
        method: "PUT",
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      return await response.json();
    },
    mutationKey: [UPDATE_TECHNOLOGY],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [GET_TECHNOLOGIES] });
      queryClient.invalidateQueries({ queryKey: [GET_TECHNOLOGY, id] });
      toast.success("Technology has been updated successfully");
    },
    onError(error) {
      toast.error("Error updating technology", {
        description: error.message,
      });
    },
  });

  if (isErrorDataList) {
    toast("Load error", {
      description: JSON.stringify(errorDataList.message),
    });
  }

  function onSubmit(values: z.infer<typeof technologySchema>) {
    updateTechnology(values);
  }

  if (isFetchingTechnologiesData) return <h1>Loading...</h1>;

  return (
    <>
      <TechnologyForm defaultDataForm={prevDataTechnologies} onSubmit={onSubmit} disabled={isUpdateTechnology} />
    </>
  );
}
