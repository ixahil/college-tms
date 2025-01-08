import { baseUrl } from "..";
import { cookies } from "next/headers";

export const getAgent = async (
  id: string
): Promise<{ data: AgentFields | null; error: string | null }> => {
  const cookieStore = await cookies();
  const token = cookieStore?.get("access_token")?.value;

  if (!token) {
    console.error(`Error fetching agent with ID: ${id}`);
    return { error: `Error fetching agent with ID: ${id}`, data: null };
  }

  const res = await fetch(`${baseUrl}/agents/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Check if the response is successful (status code 2xx)
  if (!res.ok) {
    console.error(`Error fetching agent with ID: ${id}`);
    return { error: `Error fetching agent with ID: ${id}`, data: null };
  }
  const responseData = await res.json();
  if (responseData.status === "Success" && responseData.data) {
    const agent: AgentFields = responseData.data;
    return { data: agent, error: null };
  }
  return { data: null, error: "Unexpected response format" };
};
