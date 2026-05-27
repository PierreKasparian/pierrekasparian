/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { buildAlternatesFrOnly, SITE_URL } from "@/lib/seo";

import { hasLocale } from "../../dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Politique de confidentialité",
    description:
      "Politique de confidentialité et traitement des données personnelles conforme au RGPD pour pierrekasparian.com.",
    alternates: {
      languages: buildAlternatesFrOnly("/legal/politique-de-confidentialite"),
    },
  };
}

export default async function PrivacyPage({
  params,
}: PageProps<"/[lang]/legal/politique-de-confidentialite">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const lastUpdated = "27 mai 2026";
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
        {lang === "fr"
          ? "Politique de confidentialité"
          : "Privacy Policy (French law)"}
      </h1>
      <p className="mt-2 text-sm text-[var(--muted-foreground)]">
        {lang === "fr"
          ? `Dernière mise à jour : ${lastUpdated}`
          : `Last updated: ${lastUpdated}`}
      </p>

      <div className="prose prose-neutral dark:prose-invert mt-10 max-w-none">
        {lang === "fr" ? (
          <>
            <h2>1. Responsable du traitement</h2>
            <p>
              Le responsable du traitement des données personnelles collectées
              via le site <strong>{siteUrl}</strong> est :
            </p>
            <ul>
              <li>
                <strong>Nom :</strong> Pierre Kasparian
              </li>
              <li>
                <strong>Qualité :</strong> Freelance en intégration IA
              </li>
              <li>
                <strong>Contact :</strong>{" "}
                <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
              </li>
            </ul>

            <h2>2. Données collectées</h2>
            <p>
              Le site collecte des données personnelles uniquement via le
              formulaire de contact. Les données collectées sont :
            </p>
            <ul>
              <li>Nom</li>
              <li>Adresse email</li>
              <li>Sujet du message</li>
              <li>Contenu du message</li>
            </ul>
            <p>
              Aucune donnée sensible au sens de l'article 9 du RGPD n'est
              collectée. Le site n'utilise pas de cookies de traçage ou
              publicitaires.
            </p>

            <h2>3. Finalité et base légale du traitement</h2>
            <p>
              Les données collectées via le formulaire de contact sont traitées
              dans le seul but de répondre à vos demandes et d'établir un
              contact professionnel.
            </p>
            <p>
              La base légale du traitement est le <strong>consentement</strong>{" "}
              (article 6.1.a du RGPD) : en envoyant le formulaire, vous
              consentez explicitement au traitement de vos données pour les
              finalités décrites.
            </p>

            <h2>4. Destinataires des données</h2>
            <p>
              Vos données sont traitées exclusivement par Pierre Kasparian et ne
              sont pas transmises à des tiers, sauf obligation légale.
            </p>
            <p>
              Le formulaire de contact est traité via une API hébergée en
              Europe. Aucune donnée n'est transmise à des serveurs situés hors
              de l'Union européenne.
            </p>

            <h2>5. Durée de conservation</h2>
            <p>
              Les données issues du formulaire de contact sont conservées
              pendant une durée maximale de <strong>3 ans</strong> à compter de
              la dernière interaction, puis supprimées.
            </p>

            <h2>6. Vos droits</h2>
            <p>
              Conformément au RGPD (articles 15 à 22), vous disposez des droits
              suivants sur vos données :
            </p>
            <ul>
              <li>
                <strong>Droit d'accès :</strong> obtenir une copie des données
                vous concernant
              </li>
              <li>
                <strong>Droit de rectification :</strong> corriger des données
                inexactes
              </li>
              <li>
                <strong>Droit à l'effacement :</strong> demander la suppression
                de vos données
              </li>
              <li>
                <strong>Droit à la portabilité :</strong> recevoir vos données
                dans un format structuré
              </li>
              <li>
                <strong>Droit d'opposition :</strong> vous opposer au traitement
                de vos données
              </li>
              <li>
                <strong>Droit de retrait du consentement :</strong> retirer
                votre consentement à tout moment
              </li>
            </ul>
            <p>
              Pour exercer ces droits, contactez-nous à :{" "}
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>. Une réponse
              sera apportée dans un délai d'un mois.
            </p>
            <p>
              Vous avez également le droit d'introduire une réclamation auprès
              de la <strong>CNIL</strong> (Commission Nationale de
              l'Informatique et des Libertés) :{" "}
              <a
                href="https://www.cnil.fr"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.cnil.fr
              </a>
            </p>

            <h2>7. Sécurité des données</h2>
            <p>
              Des mesures techniques et organisationnelles appropriées sont
              mises en oeuvre pour protéger vos données contre tout accès non
              autorisé, perte, destruction ou divulgation. Le site est servi
              exclusivement via HTTPS et les données de formulaire sont
              transmises de manière chiffrée.
            </p>

            <h2>8. Cookies</h2>
            <p>
              Ce site n'utilise pas de cookies de traçage ou publicitaires. Des
              cookies techniques strictement nécessaires au fonctionnement du
              site peuvent être utilisés mais ne collectent aucune donnée
              personnelle.
            </p>

            <h2>9. Modifications</h2>
            <p>
              Cette politique peut être mise à jour en cas d'évolution légale ou
              technique. La date de dernière mise à jour est indiquée en haut de
              cette page.
            </p>
          </>
        ) : (
          <>
            <p>
              This privacy policy is primarily written in French, as required by
              French law (RGPD / GDPR Article 13). Please refer to the French
              version for the full legal text, or{" "}
              <Link href={`/fr/legal/politique-de-confidentialite`}>
                click here to read it in French
              </Link>
              .
            </p>
            <h2>Summary</h2>
            <p>
              Personal data collected via the contact form (name, email,
              subject, message) is processed solely to respond to your inquiry.
              It is stored for a maximum of 3 years, hosted in the EU, and not
              shared with third parties. You can exercise your GDPR rights
              (access, rectification, deletion, portability, opposition) by
              contacting <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
            </p>
          </>
        )}
      </div>
    </article>
  );
}
