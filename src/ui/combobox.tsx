import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";

import { cn } from "@/lib/utils";

interface ComboboxOptions {
  title: string;
}
export function Combobox<T extends ComboboxOptions>({
  options,
  defaultValues,
  searchValueUpdate,
  onChangeValue,
}: {
  options: T[];
  defaultValues: T;
  searchValueUpdate: (value: string) => void;
  onChangeValue: (value: T | null) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<T | null>(defaultValues ?? null);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
          {value && value.title.length > 0 ? value.title : "Select options..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search framework..."
            className="h-9"
            onValueChange={(value) => searchValueUpdate(value)}
          />
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.title}
                  value={option.title}
                  onSelect={() => {
                    setValue(value?.title === option.title ? null : option);
                    onChangeValue(value?.title === option.title ? null : option);
                    setOpen(false);
                  }}
                >
                  {option.title}
                  <Check className={cn("ml-auto", value?.title === option.title ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
