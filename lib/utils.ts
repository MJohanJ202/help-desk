import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(url: string | undefined | null) {
  if (!url) return "";
  return `${url}?t=${new Date().getTime()}`;
}

export function cleanImageUrl(url?: string): string | null {
  if (!url || url.trim() === "") return null;
  const match = url.match(/https?:\/\/[^\s\)]+/);
  return match ? match[0] : url;
}

export function getImagePath(imageUrl: string) {
  const url = new URL(imageUrl);

  const path = decodeURIComponent(
    url.pathname.split("/storage/v1/object/public/tickets-images/")[1],
  );
  return path;
}

export function normalizeKeyFileName({
  filename,
  title,
  userId,
}: {
  filename: string;
  title: string;
  userId: string;
}) {
  const extensionFile = filename.split(".").pop()?.toLowerCase();
  const safeTitle = title
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .toLowerCase();
  const filePath = `${userId}/${crypto.randomUUID()}_${safeTitle}.${extensionFile}`;

  return filePath;
}
