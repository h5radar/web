import { Info } from "lucide-react";
import { useAuth } from "react-oidc-context";

import { Button } from "@/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/card";

import { toBoolean } from "@/lib/converters";

export default function WelcomePage() {
  const auth = useAuth();

  return (
    <div className="min-h-svh w-full p-6 md:p-10 flex flex-col">
      <div className="w-full flex flex-col flex-1">
        <div className="flex flex-col gap-6 flex-1">
          {toBoolean(import.meta.env.VITE_DEMO_BANNER_ENABLED) && (
            <Card className="mx-auto max-w-5xl bg-neutral-900 border-neutral-800 text-left shadow-lg shadow-black/30 ring-1 ring-white/5">
              <CardHeader className="pb-2">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 mt-1 opacity-80" />
                  <div>
                    <CardTitle className="text-2xl">Welcome to H5Radar Demo</CardTitle>
                    <CardDescription className="mt-1 leading-relaxed">
                      You can explore the application with the demo account
                      <b> alice@example.com</b> / <b>secret</b>.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Available demo scenarios:</p>
                <ul className="mt-3 list-disc pl-6 space-y-2 text-sm text-muted-foreground">
                  <li>License overview by compliance – see how licenses are grouped and analyzed.</li>
                  <li>Technologies view – explore technologies in both table format and radar visualization.</li>
                </ul>
              </CardContent>
            </Card>
          )}
          <div className="flex-1 flex items-center justify-center">
            <div className="mx-auto w-full max-w-sm ">
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
      </div>
    </div>
  );
}
