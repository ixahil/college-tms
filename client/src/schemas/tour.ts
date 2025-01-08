import { z } from "zod";

export const TourSchema = z.object({
  title: z.string().min(3, "Title must be greater than 3 char"),
  description: z.string(),
  price: z.number(),
  comparePrice: z.number(),
  images: z.array(z.instanceof(File)),
  city: z.string().min(3, "location must be greater than 3 char"),
  state: z.string().min(3, "location must be greater than 3 char"),
  country: z.string().min(3, "location must be greater than 3 char"),
  status: z.enum(["ACTIVE", "DRAFT"]),
});
