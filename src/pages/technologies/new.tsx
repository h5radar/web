import { z } from "zod";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { technologyFormSchema } from "@/schemas/technology";
import TechnologyForm from "@/components/technologies/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetched } from "@/utils/fetched";
import { useAuth } from "react-oidc-context";
import { API_URL } from "@/constants";
import { useNavigate } from "react-router";

export default function NewTechnologyPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof technologyFormSchema>>({
    resolver: zodResolver(technologyFormSchema),
    defaultValues: {
      title: "",
      description: "",
      website: "",
      moved: 0,
      active: true,
    },
  });

  const { mutate: addTechnology, isPending: isAddTechnology } = useMutation<
    z.infer<typeof technologyFormSchema>,
    Error,
    z.infer<typeof technologyFormSchema>
  >({
    mutationFn: (values: z.infer<typeof technologyFormSchema>) =>
      fetched<z.infer<typeof technologyFormSchema>, z.infer<typeof technologyFormSchema>>({
        url: `${API_URL}/technologies`,
        method: "POST",
        token: auth.user?.access_token,
        body: values,
      }),
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
      <TechnologyForm form={form} onSubmit={onSubmit} disabled={isAddTechnology} />
    </>
  );
}
