import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuth } from "react-oidc-context";

import { useSeedCompliances } from "@/queries/compliance";
import { useSeedDomains } from "@/queries/domain";
import { useSeedLicenses } from "@/queries/license";
import { useSeedPractices } from "@/queries/practice";
import { useSeedTechnologies } from "@/queries/technology";

export default function HomePage() {
  const auth = useAuth();
  const queryClient = useQueryClient();

  const { mutate: seedCompliances, isPending: isPending1 } = useSeedCompliances(auth, queryClient);
  const { mutate: seedLicenses, isPending: isPending2 } = useSeedLicenses(auth, queryClient);
  const { mutate: seedPractices, isPending: isPending3 } = useSeedPractices(auth, queryClient);
  const { mutate: seedTechnologies, isPending: isPending4 } = useSeedTechnologies(auth, queryClient);
  const { mutate: seedDomains, isPending: isPending6 } = useSeedDomains(auth, queryClient);

  useEffect(() => {
    seedCompliances();
    seedLicenses();
    seedPractices();
    seedTechnologies();
    seedDomains();
  }, [auth, seedCompliances, seedLicenses, seedPractices, seedTechnologies, seedDomains]);

  if (isPending1 || isPending2 || isPending3 || isPending4 || isPending6) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline">Home</h1>
    </>
  );
}
