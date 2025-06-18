import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuth } from "react-oidc-context";

import { userSchema } from "@/schemas/user";

import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";

import { useSeedLicenses } from "@/queries/license";
import { useSeedPractices } from "@/queries/practice";
import { useSeedTechnologies } from "@/queries/technology";

import { fetchAccountUser } from "@/features/account-slice";
import { fetchRadarUser } from "@/features/user-slice";

export default function HomePage() {
  const auth = useAuth();
  const queryClient = useQueryClient();
  const { mutate: seedLicenses, isPending: isPending3 } = useSeedLicenses(auth, queryClient);
  const { mutate: seedPractices, isPending: isPending4 } = useSeedPractices(auth, queryClient);
  const { mutate: seedTechnologies, isPending: isPending5 } = useSeedTechnologies(auth, queryClient);

  const dispatch = useAppDispatch();
  const userRadar = useAppSelector((state) => state.radarUser.user);
  const loadingRadar = useAppSelector((state) => state.radarUser.loading);
  const errorRadar = useAppSelector((state) => state.radarUser.error);

  const userAccount = useAppSelector((state) => state.accountUser.user);
  const loadingAccount = useAppSelector((state) => state.accountUser.loading);
  const errorAccount = useAppSelector((state) => state.accountUser.error);

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
    seedLicenses();
    seedPractices();
    seedTechnologies();
  }, [auth, seedLicenses, seedPractices, seedTechnologies]);

  if (isPending3 || isPending4 || isPending5) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline">Home</h1>
      <div>
        <h1>Radar User</h1>
        {loadingRadar && <p>Загрузка...</p>}
        {errorRadar && <p>Ошибка: {errorRadar}</p>}
        {userRadar && (
          <p>
            {userRadar.id} {userRadar.username} {userRadar.sub}
          </p>
        )}
        <h1>Account User</h1>
        {loadingAccount && <p>Загрузка...</p>}
        {errorAccount && <p>Ошибка: {errorAccount}</p>}
        {userAccount && (
          <p>
            {userAccount.id} {userAccount.username} {userAccount.sub}
          </p>
        )}
      </div>
    </>
  );
}
