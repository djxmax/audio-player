import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(seconds?: number): string {
  if (seconds === undefined || seconds === null || isNaN(seconds)) {
    return "00:00";
  }

  const totalSeconds = Math.floor(seconds);
  const minutes = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export interface ApiHeaders {
  "Content-Type": string;
  "x-api-key": string;
}

export function getApiHeaders(): Record<string, string> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY ?? "";

  if (!apiUrl || !apiKey) {
    throw new Error("Configuration manquante !");
  }

  return {
    "Content-Type": "application/json",
    "x-api-key": apiKey,
  };
}

export function getApiUrl() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error("API URL manquante !");
  }
  return apiUrl;
}
