import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { toast } from "sonner";
import { z } from "zod";

import { API_URL } from "@/constants/application";
import { CREATE_ACCOUNT_USER, CREATE_RADAR_USER, GET_ACCOUNT_USERS, GET_RADAR_USERS } from "@/constants/query-keys";

import { userSchema } from "@/schemas/user";

export default function HomePage() {
  const auth = useAuth();
  const queryClient = useQueryClient();

  const { mutate: createAccountUser, isPending: isPendingAccount } = useMutation<
    z.infer<typeof userSchema>,
    Error,
    z.infer<typeof userSchema>
  >({
    mutationFn: async (values: z.infer<typeof userSchema>) => {
      const response = await fetch(`${API_URL}/account_users`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      return await response.json();
    },
    mutationKey: [CREATE_ACCOUNT_USER],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [GET_ACCOUNT_USERS] });
      toast.success("Account user has been created successfully");
    },
    onError(error) {
      toast.error("Error creating account user", {
        description: error.message,
      });
    },
  });

  const { mutate: createRadarUser, isPending: isPendingRadar } = useMutation<
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
    createAccountUser(
      userSchema.parse({ id: 0, sub: auth.user?.profile.sub, username: auth.user?.profile.preferred_username }),
    );

    createRadarUser(
      userSchema.parse({ id: 0, sub: auth.user?.profile.sub, username: auth.user?.profile.preferred_username }),
    );
  }, [auth, createAccountUser, createRadarUser]);

  if (isPendingAccount || isPendingRadar) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline">Home</h1>
    </>
  );
}
