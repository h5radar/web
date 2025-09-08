import { useAuth } from "react-oidc-context";

import { Button } from "@/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/card";

import { toBoolean } from "@/lib/converters";

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
          {toBoolean(import.meta.env.VITE_ENABLED_DEMO_BANNER) && (
            <Card className="bg-neutral-800 text-center">
              <CardContent>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Welcome to H5Radar Demo</CardTitle>
                </CardHeader>
                <p>Available demo scenarios</p>
                <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                  <li>License overview by compliance – see how licenses are grouped and analyzed.</li>
                  <li>Technologies view – explore technologies in both table format and radar visualization.</li>
                </ul>
                <CardDescription>
                  You can explore the application with the demo account alice@example / secret.
                </CardDescription>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
