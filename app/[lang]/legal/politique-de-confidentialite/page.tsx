import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { hasLocale } from "../../dictionaries";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  robots: "noindex",
};

export default async function PolitiqueConfidentialitePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const isFr = lang === "fr";

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {isFr ? "Politique de confidentialité" : "Privacy Policy"}
      </h1>
      <p className="mt-2 text-sm text-[var(--muted-foreground)]">
        {isFr ? "Dernière mise à jour : mai 2026" : "Last updated: May 2026"}
      </p>

      {isFr ? (
        <div className="mt-8 space-y-8 text-sm leading-relaxed text-[var(--muted-foreground)]">
          <section>
            <h2 className="mb-3 text-base font-semibold text-[var(--foreground)]">
              1. Responsable du traitement
            </h2>
            <p>
              Pierre Kasparian, auto-entrepreneur
              <br />
              Contact :{" "}
              <Link
                href={`/${lang}/contact`}
                className="text-[var(--foreground)] hover:underline"
              >
                formulaire de contact
              </Link>
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[var(--foreground)]">
              2. Données collectées
            </h2>
            <p>
              Ce site collecte uniquement les données que vous fournissez
              volontairement via le formulaire de contact :
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Nom et prénom</li>
              <li>Adresse email</li>
              <li>Sujet du message</li>
              <li>Contenu du message</li>
            </ul>
            <p className="mt-2">
              Aucune donnée n&apos;est collectée automatiquement (pas de cookies
              analytiques, pas de trackers tiers).
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[var(--foreground)]">
              3. Finalité et base légale
            </h2>
            <p>
              Les données du formulaire de contact sont traitées sur la base de
              l&apos;intérêt légitime (article 6(1)(f) du RGPD) afin de répondre
              à vos demandes de renseignement et de collaborer sur des projets
              professionnels.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[var(--foreground)]">
              4. Durée de conservation
            </h2>
            <p>
              Les données de contact sont conservées le temps nécessaire pour
              répondre à votre demande, et au maximum 3 ans à compter du dernier
              échange, conformément aux préconisations de la CNIL.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[var(--foreground)]">
              5. Destinataires
            </h2>
            <p>
              Les données ne sont ni vendues, ni louées, ni transmises à des
              tiers. Elles sont traitées uniquement par Pierre Kasparian dans le
              cadre de ses activités professionnelles.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[var(--foreground)]">
              6. Vos droits
            </h2>
            <p>
              Conformément au RGPD (articles 15 à 22), vous disposez des droits
              suivants :
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Droit d&apos;accès à vos données</li>
              <li>Droit de rectification</li>
              <li>Droit à l&apos;effacement</li>
              <li>Droit à la limitation du traitement</li>
              <li>Droit d&apos;opposition</li>
              <li>Droit à la portabilité</li>
            </ul>
            <p className="mt-2">
              Pour exercer ces droits,{" "}
              <Link
                href={`/${lang}/contact`}
                className="text-[var(--foreground)] hover:underline"
              >
                contactez-moi via le formulaire de contact
              </Link>
              . En cas de litige, vous pouvez saisir la{" "}
              <a
                href="https://www.cnil.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--foreground)] hover:underline"
              >
                CNIL
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[var(--foreground)]">
              7. Cookies
            </h2>
            <p>
              Ce site n&apos;utilise aucun cookie de mesure d&apos;audience, de
              reciblage publicitaire ou de partage sur les réseaux sociaux.
              Seuls des cookies strictement nécessaires au fonctionnement
              technique du site peuvent être déposés.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[var(--foreground)]">
              8. Modifications
            </h2>
            <p>
              Cette politique peut être mise à jour. La date de dernière
              modification est indiquée en haut de cette page.
            </p>
          </section>

          <p className="pt-4">
            <Link
              href={`/${lang}/legal/mentions-legales`}
              className="text-[var(--foreground)] hover:underline"
            >
              Voir les mentions légales
            </Link>
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-8 text-sm leading-relaxed text-[var(--muted-foreground)]">
          <section>
            <h2 className="mb-3 text-base font-semibold text-[var(--foreground)]">
              1. Data controller
            </h2>
            <p>
              Pierre Kasparian, sole trader (auto-entrepreneur)
              <br />
              Contact:{" "}
              <Link
                href={`/${lang}/contact`}
                className="text-[var(--foreground)] hover:underline"
              >
                contact form
              </Link>
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[var(--foreground)]">
              2. Data collected
            </h2>
            <p>
              This site only collects data you voluntarily provide via the
              contact form:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>First and last name</li>
              <li>Email address</li>
              <li>Message subject</li>
              <li>Message content</li>
            </ul>
            <p className="mt-2">
              No data is collected automatically (no analytics cookies, no
              third-party trackers).
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[var(--foreground)]">
              3. Purpose and legal basis
            </h2>
            <p>
              Contact form data is processed on the basis of legitimate interest
              (Article 6(1)(f) GDPR) to respond to your enquiries and discuss
              potential professional collaborations.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[var(--foreground)]">
              4. Retention period
            </h2>
            <p>
              Contact data is retained for as long as necessary to respond to
              your request, and for a maximum of 3 years from the last exchange.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[var(--foreground)]">
              5. Recipients
            </h2>
            <p>
              Your data is never sold, rented or shared with third parties. It
              is processed solely by Pierre Kasparian for professional purposes.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[var(--foreground)]">
              6. Your rights
            </h2>
            <p>
              Under the GDPR (Articles 15 to 22), you have the following rights:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Right of access</li>
              <li>Right to rectification</li>
              <li>Right to erasure</li>
              <li>Right to restriction of processing</li>
              <li>Right to object</li>
              <li>Right to data portability</li>
            </ul>
            <p className="mt-2">
              To exercise these rights,{" "}
              <Link
                href={`/${lang}/contact`}
                className="text-[var(--foreground)] hover:underline"
              >
                use the contact form
              </Link>
              . You may also lodge a complaint with your national supervisory
              authority (in France:{" "}
              <a
                href="https://www.cnil.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--foreground)] hover:underline"
              >
                CNIL
              </a>
              ).
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[var(--foreground)]">
              7. Cookies
            </h2>
            <p>
              This site uses no analytics, retargeting or social sharing
              cookies. Only technically necessary cookies may be set for the
              site&apos;s basic operation.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[var(--foreground)]">
              8. Changes
            </h2>
            <p>
              This policy may be updated. The date of last modification is shown
              at the top of this page.
            </p>
          </section>

          <p className="pt-4">
            <Link
              href={`/${lang}/legal/mentions-legales`}
              className="text-[var(--foreground)] hover:underline"
            >
              View legal notice
            </Link>
          </p>
        </div>
      )}
    </article>
  );
}
