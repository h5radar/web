import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

import { technologyFormSchema } from "@/schemas/technology";

import TechnologyForm from "@/components/technologies/form";

import { API_URL } from "@/constants";

export default function NewTechnologyPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: addTechnology, isPending: isAddTechnology } = useMutation<
    z.infer<typeof technologyFormSchema>,
    Error,
    z.infer<typeof technologyFormSchema>
  >({
    mutationFn: async (values: z.infer<typeof technologyFormSchema>) => {
      const response = await fetch(`${API_URL}/technologies`, {
        method: "POST",
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
      toast.success("Technology created successfully!");
      navigate("/technologies");
    },
    onError(error) {
      toast.error(`Error: ${error.message}`);
    },
  });

  const onSubmit = (values: z.infer<typeof technologyFormSchema>) => {
    addTechnology(values);
  };

  return (
    <>
      <TechnologyForm onSubmit={onSubmit} disabled={isAddTechnology} />
    </>
  );
}
