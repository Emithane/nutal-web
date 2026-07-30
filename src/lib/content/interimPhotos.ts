/**
 * PRIVREMENE fotografije (odluka klijenta, sedmica 2).
 * Izvor: Unsplash — licenca dozvoljava komercijalnu upotrebu bez atribucije;
 * autori zabilježeni radi urednosti. Hotlink preko images.unsplash.com CDN-a
 * je svjesni kompromis za prelazni period — kad stignu NUTAL fotografije
 * (tvornica, packshotovi, primjene), mijenjaju se OVDJE i nigdje više.
 */
const u = (id: string, w: number) =>
  `https://images.unsplash.com/${id}?q=75&w=${w}&auto=format&fit=crop`;

export const PHOTOS = {
  /** Enterijer, duboki zid + lampa — David van Dijk */
  heroDiy: u("photo-1494438639946-1ebd1d20bf85", 1200),
  /** Ruka s valjkom, zid u dvije boje — Andrew Itaga (zid kategorija) */
  diyRoller: u("photo-1693985120993-e9b203ce7631", 1200),
  /** Zeleno OBOJENA drvena vrata — Pawel Czerwinski (DIY hero) */
  diyWood: u("photo-1532550256335-c281a64ac9f6", 1200),
  /** Plavo obojene drvene daske — engin akyurt (kategorija Drvo) */
  drvoObojeno: u("photo-1755786655269-86f442eeddea", 600),
  /** Čelik mosta pod crvenim zaštitnim premazom — Matt Clark (Industry hero) */
  industryBridge: u("photo-1745670177418-278313dda6f3", 1200),
  /** Čelična konstrukcija i kran — Jacek Dylag (kategorija Metal) */
  industrySteel: u("photo-1527335988388-b40ee248d80c", 600),
  /** Nanošenje epoksidnog poda u ind. objektu — Craftsman Concrete Floors */
  flooringEpoxy: u("photo-1772306814076-ff65f53ac438", 1200),
  /** Molovanje zida — Joseph Pérez */
  tutorialInterior: u("photo-1529722155810-17303d209942", 900),
  /** Svježe bijele oznake na asfaltu — Marija Zarić */
  katCeste: u("photo-1759917061237-8040bdfa6933", 600),
  /** Klasična metalna limenka boje na stolu — Sven Brandsma */
  katPomocni: u("photo-1585676737728-432f58d5fdba", 600),
  /** Valjci s bojom u više tonova — David Pisnoy */
  kalkulatorBand: u("photo-1525909002-1b05e0c869d8", 1800),
} as const;
