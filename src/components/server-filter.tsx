import { Column } from "@tanstack/react-table";
import { useEffect, useRef, useState } from "react";

import { Input } from "@/ui/input";

import { DEBOUNCE_TIME } from "@/constants/application";

interface TextFilterProps<TData, TValue> {
  column: Column<TData, TValue>;
  debounceTime?: number;
  onFilterChange?: (columnId: string, value: string) => Promise<void> | void;
}

export function ServerTextFilter<TData, TValue>({
  column,
  debounceTime = DEBOUNCE_TIME,
  onFilterChange,
}: TextFilterProps<TData, TValue>) {
  const [inputValue, setInputValue] = useState(() => (column.getFilterValue() as string) ?? "");

  const initialValueRef = useRef(inputValue);
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    if (onFilterChange) {
      onFilterChange(column.id, inputValue);
    }
    const currentFilterValue = column.getFilterValue() as string;
    if (currentFilterValue !== inputValue) {
      setInputValue(currentFilterValue ?? "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [column.getFilterValue(), onFilterChange]);

  useEffect(() => {
    if (inputValue === initialValueRef.current) return;

    const timer = setTimeout(() => {
      column.setFilterValue(inputValue);
      initialValueRef.current = inputValue;
    }, debounceTime);

    return () => clearTimeout(timer);
  }, [inputValue, debounceTime, column]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="relative ml-4">
      <Input type="text" value={inputValue} onChange={handleChange} className="w-full border px-2 py-1 rounded" />
      <button
        onClick={() => setInputValue("")}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
      >
        ×
      </button>
    </div>
  );
}
