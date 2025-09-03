import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContextProps } from "react-oidc-context";
import { z } from "zod";

import { Button } from "@/ui/button";
import { Checkbox } from "@/ui/checkbox";
import { Combobox } from "@/ui/combobox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";

import { licenseSchema } from "@/schemas/license";

import { useGetCompliances } from "@/queries/compliance";

interface LicenseFormProps {
  defaultDataForm?: z.infer<typeof licenseSchema>;
  onSubmit: (values: z.infer<typeof licenseSchema>) => void;
  disabled: boolean;
  auth: AuthContextProps;
}

/**
 * LicenseForm is ... .
 */
export const LicenseForm: React.FC<LicenseFormProps> = ({
  defaultDataForm,
  onSubmit,
  disabled,
  auth,
}: LicenseFormProps) => {
  const form = useForm<z.infer<typeof licenseSchema>>({
    resolver: zodResolver(licenseSchema),
    defaultValues: defaultDataForm || {
      id: 0,
      title: "",
      description: "",
      active: true,
      compliance: { id: 0, title: "", description: "", active: true },
    },
  });
  const [queryParams, setQueryParams] = useState({
    page: 1,
    size: 30,
    sort: ["title", "asc"],
  });
  /**
   * Function to handle submit. Important to prevent the default action
   * before execute onSubmit handler.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.handleSubmit((data) => {
      onSubmit(data);
    })();
  };

  /**
  //  * Function to load compliance.
   */
  const {
    data: compliance,
    isLoading: isLoading,
    isError: isError,
    error: error,
  } = useGetCompliances(auth, queryParams);

  const handleFiltering = useCallback((value: string) => {
    return setQueryParams((prev) => {
      return { ...prev, title: "%" + value + "%", page: 1 };
    });
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormLabel>id</FormLabel>
              <FormControl>
                <Input id="id" type="hidden" placeholder="id" {...field} />
              </FormControl>
              <FormDescription>This is license id</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input id="title" placeholder="title" {...field} />
              </FormControl>
              <FormDescription>This is license title</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea id="description" placeholder="description" {...field} />
              </FormControl>
              <FormDescription>This is license description</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {compliance?.content && (
          <FormField
            control={form.control}
            name="compliance"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Compliance</FormLabel>
                <FormControl>
                  {!isLoading && (
                    <Combobox
                      options={compliance?.content}
                      searchValueUpdate={handleFiltering}
                      defaultValues={field.value}
                      onChangeValue={(value) => field.onChange(value)}
                      {...field}
                    />
                  )}
                </FormControl>
                <FormDescription>This is license compliance</FormDescription>
                <FormMessage>
                  {isError && error.message} {fieldState.error && fieldState.error.message}
                </FormMessage>
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="active"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox id="active" checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Active</FormLabel>
                <FormDescription>Is license active or not</FormDescription>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" className={disabled ? "cursor-progress" : "cursor-pointer"} disabled={disabled}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default LicenseForm;
