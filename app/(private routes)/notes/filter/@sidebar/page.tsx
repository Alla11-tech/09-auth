import css from "./SidebarNotes.module.css";

const TAGS = ["Todo", "Work", "Personal", "Meeting", "Shopping"] as const;

export default function SidebarPage() {
  return (
    <aside>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <a href="/notes/filter/all" className={css.menuLink}>
            All notes
          </a>
        </li>
        {TAGS.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <a href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}