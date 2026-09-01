import Link from "next/link";

/** 404 u stilu sajta. Statički export je izbaci kao out/404.html, a
 *  wrangler (not_found_handling: 404-page) je servira za nepostojeće rute. */
export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        maxWidth: 720,
        margin: "0 auto",
        padding: "64px 24px",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "1.2px",
          color: "var(--nutal-zelena)",
        }}
      >
        Greška 404
      </span>
      <h1
        style={{
          fontFamily: "var(--font-serif)",
          fontWeight: 400,
          fontSize: "clamp(36px, 5vw, 56px)",
          letterSpacing: "0.2px",
          margin: "8px 0 16px",
        }}
      >
        Ova stranica se ne drži podloge.
      </h1>
      <p style={{ fontSize: 17, lineHeight: 1.6, color: "rgba(20, 26, 16, 0.75)", marginBottom: 32 }}>
        Link je zastario ili je adresa pogrešno upisana. Ono što tražite je
        vjerovatno na jednom od ovih mjesta:
      </p>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", fontWeight: 600, fontSize: 14 }}>
        <Link href="/bs">Početna</Link>
        <Link href="/bs/diy">Proizvodi</Link>
        <Link href="/bs/tutorijali">Tutorijali</Link>
        <Link href="/bs/kontakt">Kontakt</Link>
      </div>
    </main>
  );
}
