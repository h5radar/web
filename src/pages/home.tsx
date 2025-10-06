import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuth } from "react-oidc-context";

import { useSeedRadarUser } from "@/queries/radar-user";

export default function HomePage() {
  const auth = useAuth();
  const queryClient = useQueryClient();

  const { mutate: seedCompliances, isPending: isPending1 } = useSeedRadarUser(auth, queryClient);
  useEffect(() => {
    seedCompliances();
  }, [auth, seedCompliances]);

  if (isPending1) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline">Home</h1>
    </>
  );
}
