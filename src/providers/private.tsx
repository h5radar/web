import { useQuery } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { type FC, useEffect, useState } from "react";
import { hasAuthParams, useAuth } from "react-oidc-context";

import { AUTHORITY } from "@/constants/application";
import { GET_AUTH_HEALTH } from "@/constants/query-keys";

import WelcomePage from "@/pages/welcome";

const getAuthHealth = async () => {
  const response = await fetch(AUTHORITY);
  if (!response.ok) {
    throw new Error("Please confirm your auth server is up");
  }
  return await response.json();
};

interface PrivateProviderProps {
  children: React.ReactNode;
}

export const PrivateProvider: FC<PrivateProviderProps> = (props) => {
  const { children } = props;
  const auth = useAuth();

  const { isPending: getAuthHealthIsPending, error: getAuthHealthError } = useQuery({
    queryKey: [GET_AUTH_HEALTH],
    queryFn: getAuthHealth,
    retry: false,
  });

  const [hasTriedSignin, setHasTriedSignin] = useState(false);
  useEffect(() => {
    if (getAuthHealthIsPending || getAuthHealthError) {
      return;
    }
    if (!(hasAuthParams() || auth.isAuthenticated || auth.activeNavigator || auth.isLoading || hasTriedSignin)) {
      void auth.signinRedirect();
      setHasTriedSignin(true);
    }
  }, [auth, hasTriedSignin, getAuthHealthIsPending, getAuthHealthError]);

  const anyLoading = getAuthHealthIsPending || auth.isLoading;
  const anyErrorMessage = getAuthHealthError?.message || auth.error?.message;

  if (anyLoading) {
    return (
      <>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true} storageKey="dashboard-theme">
          <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
              <div className="flex flex-col gap-6">
                <p>Loading...</p>
              </div>
            </div>
          </div>
        </ThemeProvider>
      </>
    );
  }
  if (anyErrorMessage) {
    return (
      <>
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-sm">
            <p>Login error: {anyErrorMessage}</p>
          </div>
        </div>
      </>
    );
  }
  if (!auth.isAuthenticated) return <WelcomePage />;
  return <>{children}</>;
};

export default PrivateProvider;
