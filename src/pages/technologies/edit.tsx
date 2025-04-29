import { z } from "zod";
import { toast } from "sonner";
import { technologyFormSchema } from "@/schemas/technology";
import TechnologyForm from "@/components/technologies/form";
import { useAuth } from "react-oidc-context";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetched } from "@/utils/fetched";
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
    queryFn: () =>
      fetched<unknown, z.infer<typeof technologyFormSchema>>({
        url: `${API_URL}/technologies/${editId}`,
        token: auth.user?.access_token,
      }),
  });

  const { mutate: updateTechnology, isPending: isUpdateTechnology } = useMutation<
    z.infer<typeof technologyFormSchema>,
    Error,
    z.infer<typeof technologyFormSchema>
  >({
    mutationFn: (values: z.infer<typeof technologyFormSchema>) =>
      fetched<z.infer<typeof technologyFormSchema>, z.infer<typeof technologyFormSchema>>({
        url: `${API_URL}/technologies/${editId}`,
        method: "PUT",
        token: auth.user?.access_token,
        body: values,
      }),
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
