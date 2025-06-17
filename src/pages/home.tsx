import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuth } from "react-oidc-context";

import { userSchema } from "@/schemas/user";

import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";

import { useCreateAccountUser } from "@/queries/account-user";
import { useSeedLicenses } from "@/queries/license";
import { useSeedPractices } from "@/queries/practice";
import { useCreateRadarUser } from "@/queries/radar-user";
import { useSeedTechnologies } from "@/queries/technology";

import { fetchRadarUser } from "@/features/user-slice";

export default function HomePage() {
  const auth = useAuth();
  const queryClient = useQueryClient();
  const { mutate: createAccountUser, isPending: isPending1 } = useCreateAccountUser(auth, queryClient);
  const { mutate: createRadarUser, isPending: isPending2 } = useCreateRadarUser(auth, queryClient);
  const { mutate: seedLicenses, isPending: isPending3 } = useSeedLicenses(auth, queryClient);
  const { mutate: seedPractices, isPending: isPending4 } = useSeedPractices(auth, queryClient);
  const { mutate: seedTechnologies, isPending: isPending5 } = useSeedTechnologies(auth, queryClient);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.radarUser.user);
  const loading = useAppSelector((state) => state.radarUser.loading);
  const error = useAppSelector((state) => state.radarUser.error);

  useEffect(() => {
    const user = userSchema.parse({
      id: 0,
      sub: auth.user?.profile.sub + "asdasd",
      username: auth.user?.profile.preferred_username + "asdasd",
    });
    dispatch(fetchRadarUser({ user, auth }));
  }, [dispatch, auth]);

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
      <div>
        <h1>Radar User</h1>
        {loading && <p>Загрузка...</p>}
        {error && <p>Ошибка: {error}</p>}
        {user && <pre>{JSON.stringify(user, null, 2)}</pre>}
      </div>
    </>
  );
}
