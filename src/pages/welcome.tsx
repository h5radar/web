import { useAuth } from "react-oidc-context";

import { Button } from "@/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/card";

export default function WelcomePage() {
  const auth = useAuth();

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Welcome back</CardTitle>
              <CardDescription>Login with your account credentials</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => auth.signinRedirect()}>
                Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
