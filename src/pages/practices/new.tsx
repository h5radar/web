import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router";

import { useCreatePractice } from "@/queries/practice";

import PracticeForm from "@/pages/practices/form";

export default function NewPracticesPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: createPractice, isPending: isPending } = useCreatePractice(auth, queryClient, navigate);

  return (
    <>
      <PracticeForm onSubmit={createPractice} disabled={isPending} />
    </>
  );
}
