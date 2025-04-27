import { useAuth } from "react-oidc-context";
import { TechnologyTable } from "@/components/technologies/table";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetched } from "@/utils/fetched";
import { API_URL } from "@/constants";
import { technologySchema } from "@/schemas/technology";
import { z } from "zod";

export default function TechnologiesPage() {
  // const [technologies, setTechnologies] = useState<z.infer<typeof technologySchema>[]>([]);
  const auth = useAuth();

  const {
    data: technologiesData,
    isFetching: isFetchingtechnologiesData,
    isError: isErrorDataList,
    error: errorDataList,
  } = useQuery({
    queryKey: ["get list technologies"],
    queryFn: () =>
      fetched<unknown, z.infer<typeof technologySchema>[]>({
        url: `${API_URL}/technologies`,
        token: auth.user?.access_token,
      }),
    staleTime: 60000,
  });
  if (isErrorDataList) {
    toast("Load error", {
      description: JSON.stringify(errorDataList.message),
    });
  }

  if (isFetchingtechnologiesData) return <h1>Loading...</h1>;

  return (
    <>
      <TechnologyTable data={technologiesData ?? []} />
    </>
  );
}
