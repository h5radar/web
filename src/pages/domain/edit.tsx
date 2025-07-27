import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "react-oidc-context";

import { useGetDomain, useUpdateDomain } from "@/queries/domain";

import DomainForm from "@/pages/domain/form";

export default function EditDomainsPage() {
  const auth = useAuth();
  const queryClient = useQueryClient();
  const url = new URL(window.location.href);
  const id = url.pathname.split("/")[3];

  const { data: domain, isLoading: isLoading, isError: isError, error: error } = useGetDomain(auth, id);
  const { mutate: updateDomain, isPending: isPending } = useUpdateDomain(auth, queryClient, id);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return (
      <>
        <h1>Error getting domain</h1>
        <p>{error.message}</p>
      </>
    );
  }

  return (
    <>
      <DomainForm defaultDataForm={domain} onSubmit={updateDomain} disabled={isPending} />
    </>
  );
}
