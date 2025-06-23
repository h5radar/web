import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useAuth } from "react-oidc-context";
import { toast } from "sonner";

import { userSchema } from "@/schemas/user";

import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";

import { useSeedLicenses } from "@/queries/license";
import { useSeedPractices } from "@/queries/practice";
import { useSeedTechnologies } from "@/queries/technology";

import { fetchAccountUser } from "@/slices/account-user";
import { fetchRadarUser } from "@/slices/radar-user";

export default function HomePage() {
  const auth = useAuth();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const refRadar = useRef(false);

  const loadingAccount = useAppSelector((state) => state.accountUser.loading);
  const errorAccount = useAppSelector((state) => state.accountUser.error);

  const radarUser = useAppSelector((state) => state.radarUser.user);
  const loadingRadar = useAppSelector((state) => state.radarUser.loading);
  const errorRadar = useAppSelector((state) => state.radarUser.error);

  const { mutate: seedLicenses, isPending: isPending1 } = useSeedLicenses(auth, queryClient, radarUser);
  const { mutate: seedPractices, isPending: isPending2 } = useSeedPractices(auth, queryClient, radarUser);
  const { mutate: seedTechnologies, isPending: isPending3 } = useSeedTechnologies(auth, queryClient, radarUser);

  useEffect(() => {
    const user = userSchema.parse({
      id: 0,
      sub: auth.user?.profile.sub,
      username: auth.user?.profile.preferred_username,
    });
    dispatch(fetchRadarUser({ user, auth }));
    dispatch(fetchAccountUser({ user, auth }));
  }, [dispatch, auth]);

  useEffect(() => {
    if (radarUser && !refRadar.current) {
      refRadar.current = true;
      seedLicenses();
      seedPractices();
      seedTechnologies();
    }
  }, [auth, seedLicenses, seedPractices, seedTechnologies, radarUser]);

  if (loadingRadar || loadingAccount || isPending1 || isPending2 || isPending3) {
    return <h1>Loading...</h1>;
  }

  if (errorRadar) {
    toast.error("Error redux radar", {
      description: errorRadar,
    });
  }

  if (errorAccount) {
    toast.error("Error redux radar", {
      description: errorAccount,
    });
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline">Home</h1>
    </>
  );
}
