import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "react-oidc-context";
import { toast } from "sonner";
import { z } from "zod";

import { API_URL } from "@/constants/application";
import { CREATE_RADAR_USER, GET_RADAR_USERS } from "@/constants/query-keys";

import { userSchema } from "@/schemas/user";

export default function HomePage() {
  const auth = useAuth();
  const queryClient = useQueryClient();

  const { mutate: createRadarUser} = useMutation<
    z.infer<typeof userSchema>,
    Error,
    z.infer<typeof userSchema>
  >({
    mutationFn: async (values: z.infer<typeof userSchema>) => {
      const response = await fetch(`${API_URL}/radar_users`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      return await response.json();
    },
    mutationKey: [CREATE_RADAR_USER],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [GET_RADAR_USERS] });
      toast.success("Radar user has been created successfully");
    },
    onError(error) {
      toast.error("Error creating radar user", {
        description: error.message,
      });
    },
  });

  useEffect(() => {
    createRadarUser(userSchema.parse({id: 0, sub: auth.user?.profile.sub, username: auth.user?.profile.preferred_username}));
  }, [createRadarUser, auth])

  return (
    <>
      <h1 className="text-3xl font-bold underline">Home</h1>
    </>
  );
}
