interface IFetched<T = unknown> {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  token: string | undefined;
  body?: T;
}
export const fetched = async <T = unknown, R = unknown>({
  url,
  method = "GET",
  token,
  body,
}: IFetched<T>): Promise<R> => {
  try {
    const response = await fetch(url, {
      method: method,
      ...(body && method !== "GET" && method !== "DELETE" ? { body: JSON.stringify(body) } : {}),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `HTTP Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
