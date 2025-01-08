"use server";
import { revalidateTag } from "next/cache";
import { baseUrl } from "..";
import { cookies } from "next/headers";

export const createTour = async (
  data: FormData
): Promise<{ data: TourFields | null; error: string | null }> => {
  const cookieStore = await cookies();
  const token = cookieStore?.get("access_token")?.value;

  if (!token) {
    console.error(`Error in Creating Tour`);
    return { error: `Error in Creating Tour`, data: null };
  }

  const res = await fetch(`${baseUrl}/agents/tours`, {
    method: "POST",
    credentials: "include",
    body: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status == 401) {
    const error = await res.json();
    return { data: null, error: error?.message || "Something Wrong!" };
  }

  const responseData = await res.json();
  if (responseData.status === "Success" && responseData.data) {
    const tour: TourFields = responseData.data;
    revalidateTag("tours");
    return { data: tour, error: null };
  }

  return { data: null, error: "Unexpected response format" };
};

export const updateTour = async (
  id: number,
  data: TourFields
): Promise<{ data: TourFields | null; error: string | null }> => {
  const cookieStore = await cookies();
  const token = cookieStore?.get("access_token")?.value;

  if (!token) {
    console.error(`Error in Creating Tour`);
    return { error: `Error in Creating Tour`, data: null };
  }

  const res = await fetch(`${baseUrl}/agents/tours/${id}`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status == 401) {
    const error = await res.json();
    return { data: null, error: error?.message || "Something Wrong!" };
  }

  const responseData = await res.json();
  if (responseData.status === "Success" && responseData.data) {
    const tour: TourFields = responseData.data;
    revalidateTag("tours");
    return { data: tour, error: null };
  }

  return { data: null, error: "Unexpected response format" };
};

export const deleteTour = async (
  id: number
): Promise<{ data: TourFields | null; error: string | null }> => {
  const cookieStore = await cookies();
  const token = cookieStore?.get("access_token")?.value;

  if (!token) {
    console.error(`Error in Creating Tour`);
    return { error: `Error in Creating Tour`, data: null };
  }

  const res = await fetch(`${baseUrl}/agents/tours/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status == 401) {
    const error = await res.json();
    return { data: null, error: error?.message || "Something Wrong!" };
  }

  const responseData = await res.json();
  if (responseData.status === "Success") {
    const tour: TourFields = responseData.data;
    revalidateTag("tours");
    return { data: tour, error: null };
  }

  return { data: null, error: "Unexpected response format" };
};
