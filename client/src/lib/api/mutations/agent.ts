import { baseUrl } from "..";

export const loginAgent = async (data: {
  email: string;
  password: string;
}): Promise<{ data: AgentFields | null; error: string | null }> => {
  const res = await fetch(`${baseUrl}/agents/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (res.status == 401) {
    const error = await res.json();
    return { data: null, error: error?.message || "Login failed" };
  }

  const responseData = await res.json();
  if (responseData.status === "Success" && responseData.data) {
    const agent: AgentFields = responseData.data;
    return { data: agent, error: null };
  }

  return { data: null, error: "Unexpected response format" };
};

export const registerAgent = async (data: {
  email: string;
  password: string;
  name: string;
}): Promise<{ data: AgentFields | null; error: string | null }> => {
  const res = await fetch(`${baseUrl}/agents/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (res.status == 401) {
    const error = await res.json();
    return { data: null, error: error?.message || "Register failed" };
  }

  const responseData = await res.json();
  if (responseData.status === "Success" && responseData.data) {
    const agent: AgentFields = responseData.data;
    return { data: agent, error: null };
  }

  return { data: null, error: "Unexpected response format" };
};

export const logoutAgent = async (): Promise<{
  data: { success: true } | null;
  error: { success: false } | null;
}> => {
  const res = await fetch(`${baseUrl}/agents/auth/logout`, {
    credentials: "include",
  });

  if (res.status == 401) {
    const error = await res.json();
    return { data: null, error: error?.message || "Logout failed" };
  }

  const responseData = await res.json();
  if (responseData.status === "Success") {
    return { data: { success: true }, error: null };
  }

  return { data: null, error: { success: false } };
};
