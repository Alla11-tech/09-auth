import { api } from "./api";
import type { Note, CreateNotePayload, NoteTag } from "@/types/note";
import type { User } from "@/types/user";

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
  const response = await api.get("/notes", {
    params: {
      page: params.page,
      perPage: params.perPage,
      search: params.search?.trim() || undefined,
      tag: params.tag || undefined,
    },
  });
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await api.get(`/notes/${id}`);
  return response.data;
}

export async function createNote(payload: CreateNotePayload): Promise<Note> {
  const response = await api.post("/notes", payload);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await api.delete(`/notes/${id}`);
  return response.data;
}

// ===== AUTH =====

export interface RegisterPayload {
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export async function register(payload: RegisterPayload): Promise<User> {
  const response = await api.post("/auth/register", payload);
  return response.data;
}

export async function login(payload: LoginPayload): Promise<User> {
  const response = await api.post("/auth/login", payload);
  return response.data;
}

export async function logout(): Promise<void> {
  await api.post("/auth/logout");
}

export async function checkSession(): Promise<User | null> {
  try {
    const response = await api.get("/auth/session");
    return response.data || null;
  } catch {
    return null;
  }
}

// ===== USER =====

export async function getMe(): Promise<User> {
  const response = await api.get("/users/me");
  return response.data;
}

export interface UpdateMePayload {
  username?: string;
}

export async function updateMe(payload: UpdateMePayload): Promise<User> {
  const response = await api.patch("/users/me", payload);
  return response.data;
}