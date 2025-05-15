import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "react-oidc-context";
import { toast } from "sonner";
import { z } from "zod";

import { technologyFormSchema } from "@/schemas/technology";

import TechnologyForm from "@/components/technologies/form";

import { API_URL } from "@/constants";

export default function EditTechnologyPage() {
  const auth = useAuth();
  const queryClient = useQueryClient();
  const url = new URL(window.location.href);
  const editId = url.pathname.split("/")[3];

  const {
    data: prevDataTechnologies,
    isFetching: isFetchingtechnologiesData,
    isError: isErrorDataList,
    error: errorDataList,
  } = useQuery({
    queryKey: ["get technologies by id", editId],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/technologies/${editId}`, {
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
    z.infer<typeof technologyFormSchema>,
    Error,
    z.infer<typeof technologyFormSchema>
  >({
    mutationFn: async (values: z.infer<typeof technologyFormSchema>) => {
      const response = await fetch(`${API_URL}/technologies`, {
        method: "PUT",
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      return await response.json();
    },
    mutationKey: ["create new technology"],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["get list technologies"] });
      queryClient.invalidateQueries({ queryKey: ["get technologies by id", editId] });
      toast.success("Technology updated successfully!");
    },
    onError(error) {
      toast.error(`Error: ${error.message}`);
    },
  });

  if (isErrorDataList) {
    toast("Load error", {
      description: JSON.stringify(errorDataList.message),
    });
  }

  function onSubmit(values: z.infer<typeof technologyFormSchema>) {
    updateTechnology(values);
  }

  if (isFetchingtechnologiesData) return <h1>Loading...</h1>;

  return (
    <>
      <TechnologyForm defaultDataForm={prevDataTechnologies} onSubmit={onSubmit} disabled={isUpdateTechnology} />
    </>
  );
}
