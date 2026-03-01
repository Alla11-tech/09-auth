import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/serverApi";
import NotesClient from "./Notes.client";
import type { NoteTag } from "@/types/note";
import type { Metadata } from "next";

const PER_PAGE = 12;

const VALID_TAGS = ["Todo", "Work", "Personal", "Meeting", "Shopping", "all"];

const TAG_LABELS: Record<NoteTag | "all", string> = {
  all: "All Notes",
  Todo: "Todo Notes",
  Work: "Work Notes",
  Personal: "Personal Notes",
  Meeting: "Meeting Notes",
  Shopping: "Shopping Notes",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] as NoteTag | "all";

  const tagLabel = TAG_LABELS[tag] || "Notes";

  return {
    title: `${tagLabel} | NoteHub`,
    description: `Browse and manage your ${tagLabel.toLowerCase()} in NoteHub. Stay organized and productive.`,
    openGraph: {
      title: `${tagLabel} | NoteHub`,
      description: `Browse and manage your ${tagLabel.toLowerCase()} in NoteHub. Stay organized and productive.`,
      url: `https://notehub.example.com/notes/filter/${tag}`,
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
}

export default async function NotesFilterPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const tag = slug[0] as NoteTag | "all";

  if (!VALID_TAGS.includes(tag)) {
    return (
      <div>
        <p>Invalid tag: {tag}</p>
      </div>
    );
  }

  const queryClient = new QueryClient();

  const filterTag = tag === "all" ? undefined : (tag as NoteTag);

  await queryClient.prefetchQuery({
    queryKey: [
      "notes",
      { page: 1, perPage: PER_PAGE, search: "", tag: filterTag },
    ],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: PER_PAGE,
        search: "",
        tag: filterTag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}