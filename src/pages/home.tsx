import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "react-oidc-context";
import { toast } from "sonner";
import { z } from "zod";

import { API_URL } from "@/constants/application";
import { CREATE_USER, GET_USERS } from "@/constants/query-keys";

import { userSchema } from "@/schemas/user";

export default function HomePage() {
  const auth = useAuth();
  const queryClient = useQueryClient();

  console.log(auth.user?.profile);

  const { mutate: createUser, isPending: isPending } = useMutation<
    z.infer<typeof userSchema>,
    Error,
    z.infer<typeof userSchema>
  >({
    mutationFn: async (values: z.infer<typeof userSchema>) => {
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      return await response.json();
    },
    mutationKey: [CREATE_USER],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [GET_USERS] });
      toast.success("User has been created successfully");
    },
    onError(error) {
      toast.error("Error creating user", {
        description: error.message,
      });
    },
  });

  console.log(createUser, isPending);

  return (
    <>
      <h1 className="text-3xl font-bold underline">Home</h1>
    </>
  );
}
