import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";

import { productSchema } from "@/schemas/product";

interface ProductFormProps {
  defaultDataForm?: z.infer<typeof productSchema>;
  onSubmit: (values: z.infer<typeof productSchema>) => void;
  disabled: boolean;
}

/**
 * ProductForm is ... .
 */
export const ProductForm: React.FC<ProductFormProps> = ({ defaultDataForm, onSubmit, disabled }: ProductFormProps) => {
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: defaultDataForm || {
      id: 0,
      title: "",
      description: "",
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
              <FormDescription>This is product id</FormDescription>
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
              <FormDescription>This is product title</FormDescription>
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
              <FormDescription>This is product descripton</FormDescription>
              <FormMessage />
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

export default ProductForm;
