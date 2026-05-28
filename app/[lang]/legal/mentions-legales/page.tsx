import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { hasLocale } from "../../dictionaries";

export const metadata: Metadata = {
  title: "Mentions légales",
  robots: "noindex",
};

export default async function MentionsLegalesPage({
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
        {isFr ? "Mentions légales" : "Legal Notice"}
      </h1>

      {isFr ? (
        <div className="mt-8 space-y-8 text-sm leading-relaxed text-[var(--muted-foreground)]">
          <section>
            <h2 className="mb-3 text-base font-semibold text-[var(--foreground)]">
              1. Éditeur du site
            </h2>
            <p>
              <strong>Pierre Kasparian</strong>
              <br />
              Auto-entrepreneur
              <br />
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[var(--foreground)]">
              2. Hébergement
            </h2>
            <p>
              <em>OVH</em>
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[var(--foreground)]">
              3. Propriété intellectuelle
            </h2>
            <p>
              L&apos;ensemble des contenus présents sur ce site (textes, images,
              code, logos) est la propriété exclusive de Pierre Kasparian, sauf
              mention contraire. Toute reproduction, distribution ou utilisation
              sans autorisation préalable écrite est interdite.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[var(--foreground)]">
              4. Données personnelles
            </h2>
            <p>
              Les informations collectées via le formulaire de contact (nom,
              adresse email, message) sont utilisées exclusivement pour répondre
              à vos demandes. Elles ne sont ni vendues ni cédées à des tiers.
              Pour exercer vos droits (accès, rectification, suppression),
              <Link
                href={`/${lang}/contact`}
                className="text-[var(--foreground)] hover:underline"
              >
                utilisez le formulaire de contact
              </Link>
              . Consultez la{" "}
              <Link
                href={`/${lang}/legal/politique-de-confidentialite`}
                className="text-[var(--foreground)] hover:underline"
              >
                politique de confidentialité
              </Link>{" "}
              pour plus d&apos;informations.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[var(--foreground)]">
              5. Cookies
            </h2>
            <p>
              Ce site n&apos;utilise pas de cookies de tracking ou de mesure
              d&apos;audience. Aucune donnée de navigation n&apos;est collectée
              à des fins commerciales ou analytiques.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[var(--foreground)]">
              6. Loi applicable
            </h2>
            <p>
              Les présentes mentions légales sont soumises au droit français.
              Tout litige relatif à l&apos;utilisation de ce site sera soumis
              aux tribunaux compétents français.
            </p>
          </section>
        </div>
      ) : (
        <div className="mt-8 space-y-8 text-sm leading-relaxed text-[var(--muted-foreground)]">
          <section>
            <h2 className="mb-3 text-base font-semibold text-[var(--foreground)]">
              1. Site publisher
            </h2>
            <p>
              <strong>Pierre Kasparian</strong>
              <br />
              Sole trader (auto-entrepreneur)
              <br />
              Address: <em>[ADDRESS — to be completed]</em>
              <br />
              SIRET: <em>[SIRET — to be completed]</em>
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
              2. Hosting
            </h2>
            <p>
              <em>[Hosting provider name — to be completed]</em>
              <br />
              <em>[Hosting provider address — to be completed]</em>
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[var(--foreground)]">
              3. Intellectual property
            </h2>
            <p>
              All content on this site (texts, images, code, logos) is the
              exclusive property of Pierre Kasparian unless otherwise stated.
              Any reproduction, distribution or use without prior written
              permission is prohibited.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[var(--foreground)]">
              4. Personal data
            </h2>
            <p>
              Information collected via the contact form (name, email, message)
              is used solely to respond to your enquiries. It is never sold or
              shared with third parties. To exercise your rights (access,
              rectification, deletion),{" "}
              <Link
                href={`/${lang}/contact`}
                className="text-[var(--foreground)] hover:underline"
              >
                use the contact form
              </Link>
              . See the{" "}
              <Link
                href={`/${lang}/legal/politique-de-confidentialite`}
                className="text-[var(--foreground)] hover:underline"
              >
                privacy policy
              </Link>{" "}
              for more information.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[var(--foreground)]">
              5. Cookies
            </h2>
            <p>
              This site does not use tracking or analytics cookies. No browsing
              data is collected for commercial or analytical purposes.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-[var(--foreground)]">
              6. Governing law
            </h2>
            <p>
              This legal notice is governed by French law. Any dispute relating
              to the use of this site shall be submitted to the competent French
              courts.
            </p>
          </section>
        </div>
      )}
    </article>
  );
}
