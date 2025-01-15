"use client";

import CommonForm from "@/components/forms/form-component";
import { Form } from "@/components/ui/form";
import { TourFormControls } from "@/configs/agents";
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
      state: data.state,
      country: data.country,
      status: data.status,
      images: data.images,
      itinerary: data.itinerary ? JSON.parse(data.itinerary) : [],
      duration: data.duration || "",
      departureDate: data.departureDate || "",
      groupSize: data.groupSize || "",
    },
  });

  const onSubmit = async () => {
    const formData = new FormData();

    Object.entries(form.getValues()).forEach(([key, value]) => {
      if (key == "itinerary") {
        formData.append(key, JSON.stringify(value));
      } else if (Array.isArray(value)) {
        value.forEach((val) => formData.append(key, val));
      } else {
        formData.append(key, value as string | Blob);
      }
    });
    const { error } = await updateTour(data.id, formData);
    if (!error) {
      toast.success("Tour Updated Successfully");
      router.back();
    } else toast.error("Error in Updating Tour");
  };

  return (
    <Form {...form}>
      <CommonForm onSubmit={onSubmit} formControls={TourFormControls} />
    </Form>
  );
};
