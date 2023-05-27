import { useState, useCallback } from "react";
import { API_URL } from "../lib/constants";

interface ResponseType<T> {
  success: boolean;
  message?: string;
  data: T;
}

export const useApi = <T>(
  method: "GET" | "POST" | "PUT",
  path: string,
  options?: RequestInit
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const run = useCallback(
    async ({ parameter = "", data = "", body = "" } = {}) => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(API_URL + path + parameter, {
          credentials: "include",
          method,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          ...options,
          body,
          //@ts-ignore
          data,
        });

        let output;

        if (res.headers.get("Content-Type")?.includes("application/json"))
          output = (await res.json()) as ResponseType<T>;
        else throw new Error(await res.text());

        if (res.ok) {
          setLoading(false);
          return output;
        }

        throw new Error(output.message || "Some error occured.");
      } catch (e) {
        console.warn((e as Error).message);
        setError((e as Error).message);
      }

      setLoading(false);

      return undefined;
    },
    [path]
  );

  return { loading, error, run };
};
