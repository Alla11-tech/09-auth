import { cookies } from "next/headers";
import axios from "axios";
import type { Note, NoteTag } from "@/types/note";
import type { User } from "@/types/user";

const baseURL = "https://notehub-api.goit.study";

async function getHeaders() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  return {
    Cookie: cookieHeader,
  };
}

// ===== NOTES =====

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: NoteTag;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  params: FetchNotesParams
): Promise<FetchNotesResponse> {
  const headers = await getHeaders();
  const response = await axios.get(`${baseURL}/notes`, {
    params: {
      page: params.page,
      perPage: params.perPage,
      search: params.search?.trim() || undefined,
      tag: params.tag || undefined,
    },
    headers,
  });
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const headers = await getHeaders();
  const response = await axios.get(`${baseURL}/notes/${id}`, { headers });
  return response.data;
}

// ===== USER =====

export async function getMe(): Promise<User | null> {
  try {
    const headers = await getHeaders();
    const response = await axios.get(`${baseURL}/users/me`, { headers });
    return response.data;
  } catch {
    return null;
  }
}

export async function checkSession(): Promise<User | null> {
  try {
    const headers = await getHeaders();
    const response = await axios.get(`${baseURL}/auth/session`, { headers });
    return response.data || null;
  } catch {
    return null;
  }
}