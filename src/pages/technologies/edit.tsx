import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { toast } from "sonner";

import { userSchema } from "@/schemas/user";

import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";

import { useGetTechnology, useUpdateTechnology } from "@/queries/technology.ts";

import { fetchRadarUser } from "@/slices/radar-user";

import TechnologyForm from "@/pages/technologies/form";

export default function EditTechnologyPage() {
  const auth = useAuth();
  const queryClient = useQueryClient();
  const url = new URL(window.location.href);
  const id = url.pathname.split("/")[3];
  const dispatch = useAppDispatch();

  const radarUser = useAppSelector((state) => state.radarUser.user);
  const loadingRadar = useAppSelector((state) => state.radarUser.loading);
  const errorRadar = useAppSelector((state) => state.radarUser.error);

  useEffect(() => {
    if (!auth.user) return;
    const user = userSchema.parse({
      id: 0,
      sub: auth.user?.profile.sub,
      username: auth.user?.profile.preferred_username,
    });
    dispatch(fetchRadarUser({ user, auth }));
  }, [dispatch, auth]);

  useEffect(() => {
    if (errorRadar) {
      toast.error("Error get radar user", {
        description: errorRadar,
      });
    }
  }, [errorRadar]);

  const { data: technology, isLoading: isLoading, isError: isError, error: error } = useGetTechnology(auth, id);
  const { mutate: updateTechnology, isPending: isPending } = useUpdateTechnology(auth, queryClient, id, radarUser);

  if (isLoading || loadingRadar) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return (
      <>
        <h1>Error getting technology</h1>
        <p>{error.message}</p>
      </>
    );
  }

  return (
    <>
      <TechnologyForm defaultDataForm={technology} onSubmit={updateTechnology} disabled={isPending} />
    </>
  );
}
