import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuth } from "react-oidc-context";

import { userSchema } from "@/schemas/user";

import { useCreateAccountUser } from "@/queries/account-user";
import { useSeedLicenses } from "@/queries/license";
import { useSeedPractices } from "@/queries/practice";
import { useCreateRadarUser } from "@/queries/radar-user";
import { useSeedTechnologies } from "@/queries/technology";

export default function HomePage() {
  const auth = useAuth();
  const queryClient = useQueryClient();
  const { mutate: createAccountUser, isPending: isPending1 } = useCreateAccountUser(auth, queryClient);
  const { mutate: createRadarUser, isPending: isPending2 } = useCreateRadarUser(auth, queryClient);
  const { mutate: seedLicenses, isPending: isPending3 } = useSeedLicenses(auth, queryClient);
  const { mutate: seedPractices, isPending: isPending4 } = useSeedPractices(auth, queryClient);
  const { mutate: seedTechnologies, isPending: isPending5 } = useSeedTechnologies(auth, queryClient);

  useEffect(() => {
    const user = userSchema.parse({
      id: 0,
      sub: auth.user?.profile.sub,
      username: auth.user?.profile.preferred_username,
    });

    createAccountUser(user);
    createRadarUser(user);

    seedLicenses();
    seedPractices();
    seedTechnologies();
  }, [auth, createAccountUser, createRadarUser, seedLicenses, seedPractices, seedTechnologies]);

  if (isPending1 || isPending2 || isPending3 || isPending4 || isPending5) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline">Home</h1>
    </>
  );
}
