import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "react-oidc-context";

import { useGetPractice, useUpdatePractice } from "@/queries/practice";

import PracticeForm from "@/pages/practices/form";

export default function EditPracticePage() {
  const auth = useAuth();
  const queryClient = useQueryClient();
  const url = new URL(window.location.href);
  const id = url.pathname.split("/")[3];

  const { data: practice, isLoading: isLoading, isError: isError, error: error } = useGetPractice(auth, id);
  const { mutate: updatePractice, isPending: isPending } = useUpdatePractice(auth, queryClient, id);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return (
      <>
        <h1>Error getting Practice</h1>
        <p>{error.message}</p>
      </>
    );
  }

  return (
    <>
      <PracticeForm defaultDataForm={practice} onSubmit={updatePractice} disabled={isPending} />
    </>
  );
}
