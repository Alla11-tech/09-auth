"use client";

import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import css from "./NotesPage.module.css";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import { fetchNotes } from "@/lib/api/clientApi";
import type { NoteTag } from "@/types/note";

const PER_PAGE = 12;

interface NotesClientProps {
  tag?: NoteTag | "all";
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch] = useDebounce(search, 500);

  const filterTag = tag === "all" ? undefined : tag;

  const queryKey = useMemo(
    () => [
      "notes",
      { page, perPage: PER_PAGE, search: debouncedSearch, tag: filterTag },
    ],
    [page, debouncedSearch, filterTag]
  );

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey,
    queryFn: () =>
      fetchNotes({
        page,
        perPage: PER_PAGE,
        search: debouncedSearch,
        tag: filterTag,
      }),
    placeholderData: (prev) => prev,
  });

  if (isError) {
    throw error;
  }

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />
        {totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      {(isLoading || isFetching) && <p>Loading, please wait...</p>}

      {!isLoading && !isFetching && notes.length === 0 && (
        <p>No notes found. Try a different search or filter.</p>
      )}

      {!isLoading && notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
}