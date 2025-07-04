import type { QueryClient } from "@tanstack/query-core";
import { useMutation } from "@tanstack/react-query";
import { AuthContextProps } from "react-oidc-context";
import { toast } from "sonner";

import { RADAR_API_URL } from "@/constants/application";
import { GET_PRACTICES, SEED_PRACTICES } from "@/constants/query-keys";

export const useSeedPractices = (auth: AuthContextProps, queryClient: QueryClient) => {
  return useMutation({
    mutationFn: async () => {
      await fetch(`${RADAR_API_URL}/practices/seed`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
    },
    mutationKey: [SEED_PRACTICES],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [GET_PRACTICES] });
      toast.success("Practices has been seeded successfully");
    },
    onError(error) {
      toast.error("Error seeding practices", {
        description: error.message,
      });
    },
  });
};
