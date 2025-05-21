import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/ui/button";
import { Checkbox } from "@/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";

import { technologyFormSchema } from "@/schemas/technology";

interface TechnologyFormProps {
  defaultDataForm?: z.infer<typeof technologyFormSchema>;
  onSubmit: (values: z.infer<typeof technologyFormSchema>) => void;
  disabled: boolean;
}

/**
 * TechnologyForm is ... .
 */
export const TechnologyForm: React.FC<TechnologyFormProps> = ({ defaultDataForm, onSubmit, disabled }) => {
  const form = useForm<z.infer<typeof technologyFormSchema>>({
    resolver: zodResolver(technologyFormSchema),
    defaultValues: defaultDataForm || {
      title: "",
      description: "",
      website: "",
      moved: 0,
      active: true,
    },
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

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input id="title" placeholder="title" {...field} />
              </FormControl>
              <FormDescription>This is technology title</FormDescription>
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
                <Textarea id="description" placeholder="descripton" {...field} />
              </FormControl>
              <FormDescription>This is technology descripton</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input id="website" placeholder="website" {...field} />
              </FormControl>
              <FormDescription>This is technology website</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="moved"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Moved</FormLabel>
              <FormControl>
                <Input id="moved" type="number" min={-1} max={1} placeholder="0" {...field} value={field.value ?? 0} />
              </FormControl>
              <FormDescription>This is technology moved</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
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
                <FormDescription>Is technology active or not</FormDescription>
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

export default TechnologyForm;
