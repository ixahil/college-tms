"use client";

import { ContentLayout } from "@/app/agents/_components/layouts/content-layout";
import CommonForm from "@/components/forms/form-component";
import { Form } from "@/components/ui/form";
import { TourFormControls } from "@/configs/agents";
import { createTour } from "@/lib/api/mutations/tour";
import { TourSchema } from "@/schemas/tour";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const AddTour = () => {
  const router = useRouter();
  const form = useForm<TourFields>({
    resolver: zodResolver(TourSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      comparePrice: 0,
      city: "",
      state: "",
      country: "",
      status: "DRAFT",
      images: [],
      itinerary: [],
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

    const { error } = await createTour(formData);
    if (error) toast.error(error);
    else router.back();
  };

  return (
    <ContentLayout title="Add Tour" className="container">
      <pre>{JSON.stringify(form.getValues(), null, 2)}</pre>

      <Form {...form}>
        <CommonForm onSubmit={onSubmit} formControls={TourFormControls} />
      </Form>
    </ContentLayout>
  );
};

export default AddTour;
