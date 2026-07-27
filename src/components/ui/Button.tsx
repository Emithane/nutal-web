import Link from "next/link";
import styles from "./Button.module.css";

/**
 * §4.4 — primarno: tamnozelena podloga/bijeli tekst; sekundarno: outline.
 * Uvijek <Link> jer su sva dugmad na sajtu navigacija (nema formi do sedmice 4).
 */
export default function Button({
  href,
  variant = "primary",
  children,
}: {
  href: string;
  variant?: "primary" | "secondary" | "light";
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={`${styles.btn} ${styles[variant]}`}>
      {children}
    </Link>
  );
}
