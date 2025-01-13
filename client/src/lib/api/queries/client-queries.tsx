import { baseUrl } from "..";

export const getTourById = async (
  id: string
): Promise<{
  data: TourFields | null;
  error: string | null;
}> => {
  const url = new URL(`${baseUrl}/public/tours/${id}`);

  const res = await fetch(url);

  if (!res.ok) {
    console.error(`Error in Tours`);
    return { error: `Error in Tours`, data: null };
  }
  const responseData = await res.json();
  if (responseData.status === "Success" && responseData.data) {
    const tour: TourFields = responseData.data;
    return { data: tour, error: null };
  }
  return { data: null, error: "Unexpected response format" };
};
