import { defaultOptions } from "./options";

export interface IValidationError {
  msg?: string;
  reason?: string;
  [key: string]: string;
}

export interface IResponseError {
  status: number;
  title: string;
  errors: IValidationError[];
}

export const apiCall = async <T>(url: string | URL, options?: RequestInit): Promise<T> => {
  const timeKey = `[${Date.now()}] method: ${options?.method || "GET"} apiCall: ${url}`;
  console.time(timeKey);

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });
    const dataset = await response.json();

    if (!response.ok) throw dataset as IResponseError;

    return dataset;
  } finally {
    console.timeEnd(timeKey);
  }
};
