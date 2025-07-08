import { useCallback, useEffect, useRef } from "react";

import { Input } from "@/ui/input";

import { DEBOUNCE_TIME } from "@/constants/application";

interface FilterInputProps {
  handleFilter: (value: string) => void;
  placeholder?: string;
}

export const FilterInput = ({ handleFilter, placeholder = "Filter, for example: Text%..." }: FilterInputProps) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedHandleFilter = useCallback(
    (value: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => handleFilter(value), DEBOUNCE_TIME);
    },
    [handleFilter],
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <Input
      placeholder={placeholder}
      onChange={(event) => debouncedHandleFilter(event.target.value)}
      className="max-w-72 w-72"
    />
  );
};
