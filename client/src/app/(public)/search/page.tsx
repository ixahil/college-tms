import { Card, CardContent } from "@/components/ui/card";
import { getTours } from "@/lib/api/queries/tour";
import { headers } from "next/headers";
import Image from "next/image";
import SectionLayout from "../_components/layouts/section-layout";
import TablePagination from "../_components/table-pagination";

const SearchPage = async () => {
  const headersList = await headers();

  const xUrl = headersList.get("x-url") || "";

  // const slug = headersList.get("x-pathname")?.split("/")[2];

  const url = new URL(xUrl);

  const limit = parseInt(url.searchParams.get("limit") || "10", 10);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const order = url.searchParams.get("order") || "asc";
  const search = url.searchParams.get("search") || "";

  const { data, error } = await getTours(
    `limit=${limit}&page=${page}&order=${order}&search=${search}`
  );

  const totalCount = 10;

  const totalPages = Math.ceil(totalCount / limit);

  if (!data) {
    <SectionLayout title={`Search Results for ${search}`}>
      <p>No Result Found</p>
    </SectionLayout>;
  }

  return (
    <SectionLayout title={`Search Results for ${search}`}>
      <div className="grid grid-cols-5 gap-4">
        {data?.map((item, idx) => (
          <Card key={item.title + idx}>
            <CardContent className="relative rounded-lg overflow-hidden flex aspect-square items-center justify-center shadow-lg transition-transform transform hover:scale-105">
              <Image
                src={item.image}
                alt={item.title}
                layout="fill"
                className="object-cover"
              />
              <div className="absolute bottom-0 bg-black bg-opacity-50 text-white p-2 w-full">
                <h3 className="font-bold text-lg">{item.title}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <TablePagination page={page} totalPages={totalPages} />
    </SectionLayout>
  );
};

export default SearchPage;
