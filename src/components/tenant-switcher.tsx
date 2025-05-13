import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function TenantSwitcher() {
  const tenants: string[] = ["My tenant", "Another tenant"];
  const defaultTenant = tenants[0];

  const [selectedTenant, setSelectedTenant] = React.useState(defaultTenant);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="lg">
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-semibold">Tenants</span>
          </div>
          <ChevronsUpDown className="ml-auto" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]" align="start">
        {tenants.map((tenant) => (
          <DropdownMenuItem key={tenant} onSelect={() => setSelectedTenant(tenant)}>
            {tenant} {tenant === selectedTenant && <Check className="ml-auto" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
