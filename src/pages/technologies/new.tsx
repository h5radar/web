import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { userSchema } from "@/schemas/user";

import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";

import { useCreateTechnology } from "@/queries/technology";

import { fetchRadarUser } from "@/slices/radar-user";

import TechnologyForm from "@/pages/technologies/form";

export default function NewTechnologyPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
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
  const { mutate: createTechnology, isPending: isPending } = useCreateTechnology(
    auth,
    queryClient,
    navigate,
    radarUser,
  );

  return (
    <>
      <TechnologyForm onSubmit={createTechnology} disabled={isPending || loadingRadar} />
    </>
  );
}
