import React from "react";
import SectionLayout from "../../_components/layouts/section-layout";
import { getTourById } from "@/lib/api/queries/tour";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

type Props = {
  params: Promise<{ id: string }>;
};

const itinerary = [
  {
    day: 1,
    title: "Arrival",
    details: "Arrive in the city, check-in, and relax at the hotel.",
  },
  {
    day: 2,
    title: "City Tour",
    details: "Explore the main attractions of the city.",
  },
  {
    day: 3,
    title: "Adventure Activities",
    details: "Engage in exciting outdoor activities.",
  },
  {
    day: 4,
    title: "Leisure Day",
    details: "Enjoy a day at your own pace with optional excursions.",
  },
  {
    day: 5,
    title: "Departure",
    details: "Check out and transfer to the airport for departure.",
  },
];

const TourLandingPage = async ({ params }: Props) => {
  const id = (await params).id;

  // Fetch tour details by ID
  const { data } = await getTourById(id);

  const itinerary = data?.itinerary ? JSON.parse(data?.itinerary) : [];

  return (
    <SectionLayout title={data?.title}>
      <Separator />

      {/* Carousel for tour images */}
      <div className="my-8">
        <Carousel>
          <CarouselContent>
            {data.images.map((image) => (
              <CarouselItem key={image}>
                <div className="h-96 relative rounded-lg">
                  <Image
                    src={image}
                    alt={image}
                    layout="fill" // This will make the image fill the container
                    objectFit="cover" // Ensures the image maintains aspect ratio and covers the container
                    className="rounded-lg"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {/* Tour Details */}
      <div className="my-8">
        <div className="flex items-center justify-between">
          <div className="">
            <h2 className="text-2xl font-semibold">{data?.title}</h2>
            <div className="my-4 flex gap-4">
              <Badge>{data?.country}</Badge>
              <Badge>{data?.state}</Badge>
            </div>
          </div>
          <Button asChild>
            <Link href={`/book?tour=${data?.id}`}>Book Now</Link>
          </Button>
        </div>
        <p className="text-lg text-gray-700">{data?.description}</p>
        <div className="flex items-center gap-4">
          <p className="text-lg font-semibold mt-4">Price: ₹{data?.price}</p>
          <p className="text-lg font-semibold mt-4 line-through">
            ₹{data?.price}
          </p>
        </div>
      </div>
      {/* Static Itinerary Section */}
      <div className="my-8">
        <h3 className="text-2xl font-semibold mb-4">Tour Itinerary</h3>
        <ul className="space-y-4">
          {itinerary.map((item, idx) => {
            return (
              <li
                key={item.label + idx}
                className="p-4 border rounded-lg shadow-md"
              >
                <h4 className="text-xl font-medium mb-2">{item.label}</h4>
                {/* Ensure you're passing an object with the __html property */}
                <p
                  className="text-gray-700"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                ></p>
              </li>
            );
          })}
        </ul>
      </div>
    </SectionLayout>
  );
};

export default TourLandingPage;
