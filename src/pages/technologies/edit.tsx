import { z } from "zod";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { technologyFormSchema } from "@/schemas/technology";
import TechnologyForm from "@/components/technologies/form";

export default function EditTechnologyPage() {
  const form = useForm<z.infer<typeof technologyFormSchema>>({
    resolver: zodResolver(technologyFormSchema),
    defaultValues: {
      title: "here is title",
      description: "here is decribe",
      website: "www.exampel.com",
      moved: -1,
      active: false,
    },
  });

  function onSubmit(values: z.infer<typeof technologyFormSchema>) {
    // TODO: save data
    toast("Technology has been updated", {
      description: JSON.stringify(values),
    });
  }

  return (
    <>
      <TechnologyForm form={form} onSubmit={onSubmit} />
    </>
  );
}
