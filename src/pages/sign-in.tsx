import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { useAuth } from "react-oidc-context";

export default function SignInPage() {
  const auth = useAuth();

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>Enter your login below to login to your account</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => auth.signinRedirect()}>Login</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
