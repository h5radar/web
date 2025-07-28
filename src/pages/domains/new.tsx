import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router";

import { useCreateDomain } from "@/queries/domain";

import DomainForm from "@/pages/domains/form";

export default function NewDomainsPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: createDomain, isPending: isPending } = useCreateDomain(auth, queryClient, navigate);

  return (
    <>
      <DomainForm onSubmit={createDomain} disabled={isPending} />
    </>
  );
}
