import { z } from "zod";

export const TourSchema = z.object({
  title: z.string().min(3, "Title must be greater than 3 char"),
  description: z.string(),
  price: z.number(),
  comparePrice: z.number(),
  images: z.array(z.any()),
  state: z.string().min(3, "State must be selected"),
  country: z.string().min(3, "Country must be selected"),
  status: z.enum(["ACTIVE", "DRAFT"]),

  // Define the itinerary array schema
  itinerary: z
    .array(
      z.object({
        label: z.string().min(3, "Itinerary label must be greater than 3 char"),
        description: z
          .string()
          .min(10, "Description must be greater than 10 char"),
      })
    )
    .nonempty("At least one itinerary is required"),
});
