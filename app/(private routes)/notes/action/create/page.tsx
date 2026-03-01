import type { Metadata } from "next";
import CreateNoteClient from "./CreateNote.client";

export const metadata: Metadata = {
  title: "Create Note | NoteHub",
  description:
    "Create a new note in NoteHub. Organize your thoughts and stay productive.",
  openGraph: {
    title: "Create Note | NoteHub",
    description:
      "Create a new note in NoteHub. Organize your thoughts and stay productive.",
    url: "https://notehub.example.com/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ],
  },
};

export default function CreateNotePage() {
  return <CreateNoteClient />;
}