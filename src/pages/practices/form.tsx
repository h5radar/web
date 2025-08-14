import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/ui/button";
import { Checkbox } from "@/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";

import { practiceSchema } from "@/schemas/practice";

interface PracticeFormProps {
  defaultDataForm?: z.infer<typeof practiceSchema>;
  onSubmit: (values: z.infer<typeof practiceSchema>) => void;
  disabled: boolean;
}

/**
 * PracticeForm is ... .
 */
export const PracticeForm: React.FC<PracticeFormProps> = ({
  defaultDataForm,
  onSubmit,
  disabled,
}: PracticeFormProps) => {
  const form = useForm<z.infer<typeof practiceSchema>>({
    resolver: zodResolver(practiceSchema),
    defaultValues: defaultDataForm || {
      id: 0,
      title: "",
      description: "",
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
          name="id"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormLabel>id</FormLabel>
              <FormControl>
                <Input id="id" type="hidden" placeholder="id" {...field} />
              </FormControl>
              <FormDescription>This is practice id</FormDescription>
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
              <FormDescription>This is practice title</FormDescription>
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
              <FormDescription>This is practice description</FormDescription>
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
                <FormDescription>Is practice active or not</FormDescription>
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

export default PracticeForm;
