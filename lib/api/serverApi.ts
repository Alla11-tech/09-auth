import { cookies } from "next/headers";
import { AxiosResponse } from "axios";
import { api } from "./api";
import type { Note, NoteTag } from "@/types/note";
import type { User } from "@/types/user";

async function getHeaders() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  
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
  const response = await api.get("/notes", {
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
  const response = await api.get(`/notes/${id}`, { headers });
  return response.data;
}

// ===== USER =====

export async function getMe(): Promise<User | null> {
  try {
    const headers = await getHeaders();
    const response = await api.get("/users/me", { headers });
    return response.data;
  } catch {
    return null;
  }
}

export async function getUser(): Promise<User | null> {
  try {
    const headers = await getHeaders();
    const response = await api.get("/users/me", { headers });
    return response.data;
  } catch {
    return null;
  }
}

// ✅ Повертає повний response Axios
export async function checkSession(): Promise<AxiosResponse | null> {
  try {
    const headers = await getHeaders();
    const response = await api.get("/auth/session", { headers });
    return response;
  } catch {
    return null;
  }
}