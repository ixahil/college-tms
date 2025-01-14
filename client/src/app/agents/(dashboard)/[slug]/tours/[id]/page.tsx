import { getAgentTour } from "@/lib/api/queries/tour";
import { TourPage } from "./tour-page";
import { ContentLayout } from "@/app/agents/_components/layouts/content-layout";

type Props = {
  params: Promise<{ id: string }>;
};

const EditTour = async ({ params }: Props) => {
  const id = (await params).id;

  const { data, error } = await getAgentTour(id);

  return (
    <ContentLayout title={`Edit Tour (${data?.title})`} className="container">
      {error ? (
        <div>
          <p className="text-destructive">Something Went wrong!</p>
        </div>
      ) : (
        <TourPage data={data} />
      )}
    </ContentLayout>
  );
};

export default EditTour;
