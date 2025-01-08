"use client";

import CommonForm from "@/components/forms/form-component";
import { Form } from "@/components/ui/form";
import { agentFormControls } from "@/configs/agents";
import { updateTour } from "@/lib/api/mutations/tour";
import { TourSchema } from "@/schemas/tour";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
type Props = {
  data: TourFields;
};

export const TourPage = ({ data }: Props) => {
  const router = useRouter();
  const form = useForm<TourFields>({
    resolver: zodResolver(TourSchema),
    defaultValues: {
      id: data.id,
      title: data.title,
      description: data.description,
      price: data.price,
      comparePrice: data.comparePrice,
      city: data.city,
      state: data.state,
      country: data.country,
      status: data.status,
      images: data.images.flatMap((image) => image.url),
    },
  });

  const onSubmit = async () => {
    const { error } = await updateTour(data.id, form.getValues());
    if (!error) {
      toast.success("Tour Updated Successfully");
      router.back();
    } else toast.error("Error in Updating Tour");
  };

  return (
    <Form {...form}>
      <CommonForm onSubmit={onSubmit} formControls={agentFormControls} />
    </Form>
  );
};
