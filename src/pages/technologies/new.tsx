import { z } from "zod";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { technologyFormSchema } from "@/schemas/technology";
import TechnologyForm from "@/components/technologies/form";

export default function NewTechnologyPage() {
  const form = useForm<z.infer<typeof technologyFormSchema>>({
    resolver: zodResolver(technologyFormSchema),
    defaultValues: {
      title: "",
      description: "",
      website: "",
      moved: 0,
      active: true,
    },
  });

  function onSubmit(values: z.infer<typeof technologyFormSchema>) {
    // TODO: save data
    toast("Technology has been created", {
      description: JSON.stringify(values),
    });
  }

  return (
    <>
      <TechnologyForm form={form} onSubmit={onSubmit} />
    </>
  );
}
