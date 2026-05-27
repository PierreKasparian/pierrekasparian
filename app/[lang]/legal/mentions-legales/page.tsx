import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { buildAlternatesFrOnly, SITE_URL } from "@/lib/seo";

import { hasLocale } from "../../dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Mentions légales",
    description: "Mentions légales du site pierrekasparian.com.",
    alternates: {
      languages: buildAlternatesFrOnly("/legal/mentions-legales"),
    },
  };
}

export default async function LegalNoticePage({
  params,
}: PageProps<"/[lang]/legal/mentions-legales">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const contactEmail = "pierre.kasparian@pretto.fr";
  const siteUrl = SITE_URL;

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href={`/${lang}`}
        className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
      >
        {lang === "fr" ? "← Accueil" : "← Home"}
      </Link>

      <h1 className="mt-8 text-3xl font-semibold tracking-tight">
        {lang === "fr" ? "Mentions légales" : "Legal Notice"}
      </h1>

      <div className="prose prose-neutral dark:prose-invert mt-10 max-w-none">
        <h2>{lang === "fr" ? "1. Éditeur du site" : "1. Site publisher"}</h2>
        <ul>
          <li>
            <strong>{lang === "fr" ? "Nom :" : "Name:"}</strong> Pierre
            Kasparian
          </li>
          <li>
            <strong>
              {lang === "fr" ? "Qualité :" : "Capacity:"}
            </strong>{" "}
            {lang === "fr"
              ? "Particulier - Étudiant ingénieur et freelance en intégration IA"
              : "Individual - Engineering student and AI integration freelancer"}
          </li>
          <li>
            <strong>{lang === "fr" ? "Contact :" : "Contact:"}</strong>{" "}
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </li>
          <li>
            <strong>{lang === "fr" ? "Site web :" : "Website:"}</strong>{" "}
            <a href={siteUrl}>{siteUrl}</a>
          </li>
        </ul>

        <h2>
          {lang === "fr" ? "2. Hébergement" : "2. Hosting"}
        </h2>
        <p>
          {lang === "fr"
            ? "Le site est hébergé par un prestataire d'hébergement européen. Pour connaître les coordonnées précises de l'hébergeur, veuillez nous contacter à l'adresse indiquée ci-dessus."
            : "The site is hosted by a European hosting provider. For the hosting provider's exact details, please contact us at the address above."}
        </p>

        <h2>
          {lang === "fr"
            ? "3. Propriété intellectuelle"
            : "3. Intellectual property"}
        </h2>
        <p>
          {lang === "fr"
            ? `L'ensemble du contenu publié sur ${siteUrl} (textes, code, images) est la propriété exclusive de Pierre Kasparian, sauf mention contraire. Toute reproduction, représentation, modification ou exploitation non autorisée de tout ou partie de ce contenu est interdite.`
            : `All content published on ${siteUrl} (text, code, images) is the exclusive property of Pierre Kasparian, unless otherwise stated. Any unauthorised reproduction, representation, modification or exploitation of all or part of this content is prohibited.`}
        </p>

        <h2>
          {lang === "fr"
            ? "4. Données personnelles"
            : "4. Personal data"}
        </h2>
        <p>
          {lang === "fr" ? (
            <>
              Le traitement des données personnelles collectées via ce site est
              décrit dans la{" "}
              <Link href={`/fr/legal/politique-de-confidentialite`}>
                politique de confidentialité
              </Link>
              .
            </>
          ) : (
            <>
              The processing of personal data collected via this site is
              described in the{" "}
              <Link href={`/fr/legal/politique-de-confidentialite`}>
                privacy policy (in French)
              </Link>
              .
            </>
          )}
        </p>

        <h2>
          {lang === "fr"
            ? "5. Responsabilité"
            : "5. Liability"}
        </h2>
        <p>
          {lang === "fr"
            ? "Pierre Kasparian s'efforce de maintenir les informations publiées sur ce site à jour et exactes, mais ne garantit pas l'exhaustivité ou l'exactitude de ces informations. Pierre Kasparian ne saurait être tenu responsable des dommages directs ou indirects résultant de l'utilisation de ce site."
            : "Pierre Kasparian endeavours to keep the information published on this site up to date and accurate, but does not guarantee the completeness or accuracy of this information. Pierre Kasparian cannot be held liable for direct or indirect damages resulting from the use of this site."}
        </p>

        <h2>
          {lang === "fr" ? "6. Droit applicable" : "6. Applicable law"}
        </h2>
        <p>
          {lang === "fr"
            ? "Le présent site et ses mentions légales sont soumis au droit français. En cas de litige, les tribunaux français sont seuls compétents."
            : "This site and its legal notices are governed by French law. In the event of a dispute, French courts shall have sole jurisdiction."}
        </p>
      </div>
    </article>
  );
}
