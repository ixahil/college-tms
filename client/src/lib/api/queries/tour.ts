import { cookies } from "next/headers";
import { baseUrl } from "..";

export const getAgentTours = async (
  queryParams: string
): Promise<{
  data: TourFields | null;
  error: string | null;
}> => {
  const cookieStore = await cookies();
  const token = cookieStore?.get("access_token")?.value;

  if (!token) {
    console.error(`Error in Fetching Agents Tours`);
    return { error: `Error in Fetching Agents Tours`, data: null };
  }

  const url = new URL(`${baseUrl}/agents/tours`);
  url.search = new URLSearchParams(queryParams).toString();

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ["tours"],
    },
  });

  if (!res.ok) {
    console.error(`Error in Fetching Agents Tours`);
    return { error: `Error in Fetching Agents Tours`, data: null };
  }
  const responseData = await res.json();
  if (responseData.status === "Success" && responseData.data) {
    const agent: TourFields = responseData.data;
    return { data: agent, error: null };
  }
  return { data: null, error: "Unexpected response format" };
};

export const getAgentTour = async (
  id: string
): Promise<{
  data: TourFields | null;
  error: string | null;
}> => {
  const cookieStore = await cookies();
  const token = cookieStore?.get("access_token")?.value;

  if (!token) {
    console.error(`Error in Fetching Agents Tours`);
    return { error: `Error in Fetching Agents Tours`, data: null };
  }

  const url = new URL(`${baseUrl}/agents/tours/${id}`);

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ["tours"],
    },
  });

  if (!res.ok) {
    console.error(`Error in Fetching Agents Tours`);
    return { error: `Error in Fetching Agents Tours`, data: null };
  }
  const responseData = await res.json();
  if (responseData.status === "Success" && responseData.data) {
    const agent: TourFields = responseData.data;
    return { data: agent, error: null };
  }
  return { data: null, error: "Unexpected response format" };
};

export const getTours = async (
  queryParams: string
): Promise<{
  data: TourFields[] | null;
  error: string | null;
}> => {
  const url = new URL(`${baseUrl}/public/tours`);
  url.search = new URLSearchParams(queryParams).toString();

  const res = await fetch(url);

  if (!res.ok) {
    console.error(`Error in Tours`);
    return { error: `Error in Tours`, data: null };
  }
  const responseData = await res.json();
  if (responseData.status === "Success" && responseData.data) {
    const tours: TourFields[] = responseData.data;
    return { data: tours, error: null };
  }
  return { data: null, error: "Unexpected response format" };
};

export const getFeaturedTours = async (
  queryParams: string
): Promise<{
  data: TourFields[] | null;
  error: string | null;
}> => {
  const url = new URL(`${baseUrl}/public/tours/featured`);
  url.search = new URLSearchParams(queryParams).toString();

  const res = await fetch(url);

  if (!res.ok) {
    console.error(`Error in Tours`);
    return { error: `Error in Tours`, data: null };
  }
  const responseData = await res.json();
  if (responseData.status === "Success" && responseData.data) {
    const tours: TourFields[] = responseData.data;
    return { data: tours, error: null };
  }
  return { data: null, error: "Unexpected response format" };
};

export const getInternationalTours = async (
  queryParams: string
): Promise<{
  data: TourFields[] | null;
  error: string | null;
}> => {
  const url = new URL(`${baseUrl}/public/tours/international`);
  url.search = new URLSearchParams(queryParams).toString();

  const res = await fetch(url);

  if (!res.ok) {
    console.error(`Error in Tours`);
    return { error: `Error in Tours`, data: null };
  }
  const responseData = await res.json();
  if (responseData.status === "Success" && responseData.data) {
    const tours: TourFields[] = responseData.data;
    return { data: tours, error: null };
  }
  return { data: null, error: "Unexpected response format" };
};

export const getCitiesNStates = async (): Promise<{
  data: TourFields[] | null;
  error: string | null;
}> => {
  const url = new URL(`${baseUrl}/public/tours/cities-states`);

  const res = await fetch(url);

  if (!res.ok) {
    console.error(`Error in Tours`);
    return { error: `Error in Tours`, data: null };
  }
  const responseData = await res.json();
  if (responseData.status === "Success" && responseData.data) {
    const tours: TourFields[] = responseData.data;
    return { data: tours, error: null };
  }
  return { data: null, error: "Unexpected response format" };
};

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
