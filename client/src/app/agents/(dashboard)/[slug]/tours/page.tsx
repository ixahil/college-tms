import { Button } from "@/components/ui/button";
import { headers } from "next/headers";
import { columns } from "./columns";
import Link from "next/link";
import { ContentLayout } from "@/app/agents/_components/layouts/content-layout";
import { DataTable } from "@/app/agents/_components/data-table";
import TablePagination from "@/app/agents/_components/data-table/table-pagination";
import { getAgentTours } from "@/lib/api/queries/tour";
import Filters from "@/app/agents/_components/filters";

const Tours = async () => {
  const headersList = await headers();

  const xUrl = headersList.get("x-url") || "";

  // const slug = headersList.get("x-pathname")?.split("/")[2];

  const url = new URL(xUrl);
  const limit = parseInt(url.searchParams.get("limit") || "10", 10);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const order = url.searchParams.get("order") || "asc";
  const search = url.searchParams.get("search") || "";

  const { data, error } = await getAgentTours(
    `limit=${limit}&page=${page}&order=${order}&search=${search}`
  );

  const totalCount = data?.pagination.totalCount;

  const totalPages = data?.pagination.totalPages;

  return (
    <ContentLayout title={`Tours (${totalCount})`} className="space-y-8">
      <div className="flex justify-between">
        <div className="">
          <Filters />
        </div>
        <div className="flex gap-2">
          <Button size={"sm"}>Export</Button>
          <Button size={"sm"}>Import</Button>
          <Button size={"sm"} asChild>
            <Link href={"tours/new"}>Add Tour</Link>
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        {error ? (
          <div>
            <p className="text-destructive">{error}</p>
          </div>
        ) : (
          <DataTable data={data?.tours} columns={columns} />
        )}
        <TablePagination page={page} totalPages={totalPages} />
      </div>
    </ContentLayout>
  );
};

export default Tours;
