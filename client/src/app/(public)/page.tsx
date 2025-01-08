import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import SearchComponent from "./_components/shared/search";
import SectionLayout from "./_components/layouts/section-layout";
import { data } from "@/configs/data";

const HomePage = () => {
  return (
    <>
      <div className="relative w-full min-h-screen bg-gray-100">
        <div className="relative min-h-screen">
          <Image
            src="/Darjeeling-Himalayan-Railway-Toy-Train.jpg"
            alt="Darjeeling"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
        <SearchComponent className="absolute inset-0" />
      </div>
      <DestinationTabs
        topDestinations={data.topDestinations}
        title={"Explore Top Destinations by Region"}
      />
      <SectionLayout title="Popular Destinations">
        <HorizontalSlider items={data.popularDestinations} />
      </SectionLayout>
      <section>
        <div className="relative h-[75vh] w-full">
          <div className="">
            <Image
              src="/luxury-train-sec.webp"
              alt="Luxury Train"
              objectFit="cover"
              objectPosition="center"
              layout="fill"
            />
          </div>
          <div className="w-full h-full relative max-w-7xl mx-auto">
            <div className="absolute top-36 left-10">
              <div className="luxury-left-sec p-8">
                <div className="py-4">
                  <h4 className="text-black z-40 text-4xl mb-2">
                    Luxury Trains
                  </h4>
                  <strong className="z-40">Luxurious Rail Escapade</strong>
                </div>
                <hr className="border-4 border-primary w-12 mx-auto" />
                <div className="lux-p z-40 py-4">
                  <p>
                    Experience the epitome of luxury while traversing India’s
                    stunning landscapes.
                  </p>
                </div>
                <Button className="w-full">Learn More</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SectionLayout
        title="Holidays by Interest"
        view={{ url: "/holidays", label: "View All" }}
      >
        <HorizontalSlider items={data.holidaysByInterest} />
      </SectionLayout>
      <SectionLayout
        title="Top Weekend Destinations"
        view={{ url: "/holidays", label: "View All" }}
      >
        <HorizontalSlider items={data.topWeekendDestinations} />
      </SectionLayout>
      <SectionLayout
        title="International Holiday Packages"
        view={{ url: "/holidays", label: "View All" }}
      >
        <GridContainer items={data.internationalHolidayPackages} />
      </SectionLayout>
      <SectionLayout
        title="Top India Tourism Experiences"
        view={{ url: "/holidays", label: "View All" }}
      >
        <HorizontalSlider items={data.topIndiaDestinations} />
      </SectionLayout>
      <SectionLayout title="Guest Satisfaction is Our Goal">
        <Tabs defaultValue={"Do Dham Yatra"} className="w-full">
          <TabsList className="gap-16 border-b-2 pb-4 border-primary-slate-100 rounded-none w-full justify-start">
            <TabsTrigger
              value={"Do Dham Yatra"}
              className="text-xl font-medium pb-4 
                data-[state=active]:border-b-4 border-primary rounded-none 
                data-[state=active]:shadow-none data-[state=active]:bg-none"
            >
              {"Do Dham Yatra"}
            </TabsTrigger>
            <TabsTrigger
              value={"Kashmir Ladakh Trip"}
              className="text-xl font-medium pb-4 
                data-[state=active]:border-b-4 border-primary rounded-none 
                data-[state=active]:shadow-none data-[state=active]:bg-none"
            >
              {"Kashmir Ladakh Trip"}
            </TabsTrigger>
            <TabsTrigger
              value={"Ranthambore Visit"}
              className="text-xl font-medium pb-4 
                data-[state=active]:border-b-4 border-primary rounded-none 
                data-[state=active]:shadow-none data-[state=active]:bg-none"
            >
              {"Ranthambore Visit"}
            </TabsTrigger>
            <TabsTrigger
              value={"View All"}
              className="text-xl font-medium pb-4 
                data-[state=active]:border-b-4 border-primary rounded-none 
                data-[state=active]:shadow-none data-[state=active]:bg-none"
            >
              {"View All"}
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value={"Do Dham Yatra"}
            className="pt-8"
            style={{ minHeight: "400px" }}
          >
            <div className="grid grid-cols-[2fr_1fr] items-center justify-center gap-8">
              <div className="w-full flex gap-8">
                <div className="relative h-0 pb-[40%] flex-1 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                  <Image
                    src={"/ladakh-customer.webp"}
                    alt={"ladakh-customer"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-0 pb-[40%] flex-1 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                  <Image
                    src={"/ladakh-customer.webp"}
                    alt={"ladakh-customer"}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div>
                <h4 className="text-2xl font-bold">
                  Jammu and Kashmir along with Leh Ladakh
                </h4>
                <p>
                  We are Tour My Indias repeat customers. We just love to deal
                  with Manvendra and we find him and his suggestions really
                  genuine and trust worthy. We recently toured the entire of J
                  and K along with Leh Ladakh. It is tailor made for our
                  requirements. Manvendra ensured that the vacation stayed with
                  in our budget. There were absolutely no hiccups and we
                  thoroughly enjoyed the trip all along. I will definitely start
                  planning my next trip with Tour My India guided by Manvendra.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </SectionLayout>
      <SectionLayout title="Why Choose Us ?">
        <div className="flex gap-4">
          <Card className="bg-[#eff4ef]">
            <CardContent className="h-[500px] rounded-lg items-center justify-center shadow-lg">
              <div className="text-black h-full p-2 flex flex-col items-center justify-center">
                <h3 className="font-bold text-lg">{"20+ Year Experience"}</h3>
                <p className="text-sm">
                  Boasting over two decades in the tourism and hospitality
                  industry, Tour My India has amassed invaluable experience that
                  sets us apart.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#eff4ef]">
            <CardContent className="h-[500px] rounded-lg items-center justify-center shadow-lg">
              <div className="text-black h-full p-2 flex flex-col items-center justify-center">
                <h3 className="font-bold text-lg">{"20+ Year Experience"}</h3>
                <p className="text-sm">
                  Boasting over two decades in the tourism and hospitality
                  industry, Tour My India has amassed invaluable experience that
                  sets us apart.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#eff4ef]">
            <CardContent className="h-[500px] rounded-lg items-center justify-center shadow-lg">
              <div className="text-black h-full p-2 flex flex-col items-center justify-center">
                <h3 className="font-bold text-lg">{"20+ Year Experience"}</h3>
                <p className="text-sm">
                  Boasting over two decades in the tourism and hospitality
                  industry, Tour My India has amassed invaluable experience that
                  sets us apart.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#eff4ef]">
            <CardContent className="h-[500px] rounded-lg items-center justify-center shadow-lg">
              <div className="text-black h-full p-2 flex flex-col items-center justify-center">
                <h3 className="font-bold text-lg">{"20+ Year Experience"}</h3>
                <p className="text-sm">
                  Boasting over two decades in the tourism and hospitality
                  industry, Tour My India has amassed invaluable experience that
                  sets us apart.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </SectionLayout>
    </>
  );
};

const DestinationTabs = ({ topDestinations, title }) => {
  return (
    <SectionLayout title={title}>
      <Tabs defaultValue={topDestinations[0].region} className="w-full">
        <TabsList className="gap-16 border-b-2 pb-4 border-primary-slate-100 rounded-none w-full justify-start">
          {topDestinations.map((dest) => (
            <TabsTrigger
              key={dest.region}
              value={dest.region}
              className="text-xl font-medium pb-4 
                data-[state=active]:border-b-4 border-primary rounded-none 
                data-[state=active]:shadow-none data-[state=active]:bg-none"
            >
              {dest.region}
            </TabsTrigger>
          ))}
        </TabsList>
        {topDestinations.map((dest) => (
          <TabsContent
            key={dest.region}
            value={dest.region}
            className="pt-8"
            style={{ minHeight: "400px" }} // Set a minimum height
          >
            <div className="w-full h-full flex gap-4">
              {/* First Image taking a larger space */}
              {dest.destinations.length > 0 && (
                <div className="relative h-0 pb-[40%] flex-1 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                  <Image
                    src={dest.destinations[0].image}
                    alt={dest.destinations[0].title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute text-white font-bold text-xl bottom-5 left-5 flex flex-col">
                    <span>{dest.destinations[0].title}</span>
                    <span>{dest.destinations[0].packages}</span>
                  </div>
                </div>
              )}
              {/* Remaining Images in a grid */}
              <div className="grid grid-cols-2 gap-4 flex-1">
                {dest.destinations.slice(1).map((value, index) => (
                  <div
                    key={value.title + index}
                    className="relative h-0 pb-[75%] rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105"
                  >
                    <Image
                      src={value.image}
                      alt={value.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute text-white font-bold text-lg bottom-5 left-5 flex flex-col">
                      <span>{value.title}</span>
                      <span>{value.packages}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </SectionLayout>
  );
};

const HorizontalSlider = ({ items }) => {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
            <div className="p-1">
              <Card>
                <CardContent className="relative rounded-lg overflow-hidden flex aspect-square items-center justify-center shadow-lg transition-transform transform hover:scale-105">
                  <Image
                    src={item.image}
                    alt={item.title}
                    layout="fill"
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 bg-black bg-opacity-50 text-white p-2 w-full">
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <span className="text-sm">{item.package}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

const GridContainer = ({ items }) => {
  return (
    <div className="grid grid-cols-6 gap-4">
      {items.map((item) => (
        <div
          key={item.title}
          className="relative rounded-lg overflow-hidden flex aspect-square items-center justify-center shadow-lg transition-transform transform hover:scale-105"
        >
          <Image
            src={item.image}
            alt={item.title}
            layout="fill"
            className="object-cover"
          />
          <div className="absolute bottom-0 bg-black bg-opacity-50 text-white p-2 w-full">
            <h3 className="font-bold text-lg">{item.title}</h3>
            <span className="text-sm">{item.package}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
