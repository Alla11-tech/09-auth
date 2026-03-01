import { ReactNode } from "react";
import css from "./LayoutNotes.module.css";

interface LayoutNotesProps {
  children: ReactNode;
  sidebar: ReactNode;
}

export default function LayoutNotes({ children, sidebar }: LayoutNotesProps) {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>{children}</div>
    </div>
  );
}