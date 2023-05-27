import { API_URL } from "../lib";
import { ResponseType } from "../types";

export const Cfetch = async <T>(
  input: string,
  init?: RequestInit | undefined
) => {
  const res = await fetch(API_URL + input, {
    ...init,
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  let output: ResponseType<T>;

  if (res.headers.get("Content-Type")?.includes("application/json"))
    output = await res.json();
  else throw new Error(await res.text());

  if (res.ok) {
    return output;
  }

  throw new Error(output.message || "Some error occured.");
};
