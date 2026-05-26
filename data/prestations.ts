import type { LocalizedString } from "./projects";

export interface Prestation {
  id: string;
  title: LocalizedString;
  tagline: LocalizedString;
  descriptionLong: LocalizedString;
  tags: string[];
  icon: string; // lucide-react icon name
  featured?: boolean;
}

export const prestations: Prestation[] = [
  {
    id: "agents-ia",
    title: {
      fr: "Agents IA & chatbots intelligents",
      en: "AI agents & intelligent chatbots",
    },
    tagline: {
      fr: "Un assistant capable de répondre à vos clients ou collaborateurs en s'appuyant sur vos propres documents.",
      en: "An assistant that answers your customers or staff, grounded in your own documents.",
    },
    descriptionLong: {
      fr: "Conçu sur mesure à partir de vos besoins, cet assistant comprend vos documents internes (PDF, mails, bases de connaissances), mémorise le contexte de chaque échange et peut se connecter à vos outils métiers. Il répond en s'appuyant exclusivement sur vos données : pas d'invention, chaque réponse est tracée jusqu'à sa source. Idéal pour le support client, l'assistance interne ou la gestion documentaire. Hébergement en Europe disponible. Inclus : conception, développement, intégration et documentation.",
      en: "Built to your specifications, this assistant understands your internal documents (PDFs, emails, knowledge bases), remembers each conversation's context and can connect to your business tools. It responds using only your data - no hallucinations, every answer is traceable to its source. Ideal for customer support, internal assistance or document management. EU hosting available. Includes: design, development, integration and documentation.",
    },
    tags: ["Chatbot", "IA générative", "Documents", "Support client"],
    icon: "Bot",
    featured: true,
  },
  {
    id: "data-engineering",
    title: {
      fr: "Ingénierie des données",
      en: "Data engineering",
    },
    tagline: {
      fr: "Centralisez, nettoyez et transformez vos données pour qu'elles soient enfin exploitables.",
      en: "Centralise, clean and transform your data so it's finally usable.",
    },
    descriptionLong: {
      fr: "Avant d'introduire l'IA dans vos processus, vos données doivent être fiables et bien organisées. Je mets en place des pipelines de collecte et de transformation de données, structure vos flux avec des outils modernes et les automatise pour que vous ayez toujours une base propre à disposition. Que ce soit pour connecter de nouvelles sources, centraliser des données éparpillées ou préparer un jeu de données pour un modèle, je prends en charge l'ensemble du cycle. Stack : Python, Airflow, dbt, SQL.",
      en: "Before bringing AI into your processes, your data needs to be reliable and well-organised. I build data collection and transformation pipelines, structure your flows with modern tooling and automate them so you always have a clean foundation. Whether connecting new data sources, consolidating scattered data or preparing a dataset for a model, I handle the full cycle. Stack: Python, Airflow, dbt, SQL.",
    },
    tags: ["Données", "Pipelines", "SQL", "Automatisation"],
    icon: "Database",
    featured: true,
  },
  {
    id: "automatisation-ia",
    title: {
      fr: "Automatisation par l'IA",
      en: "AI automation",
    },
    tagline: {
      fr: "Réduisez les tâches répétitives en connectant l'IA à vos outils et processus existants.",
      en: "Cut repetitive tasks by connecting AI to your existing tools and processes.",
    },
    descriptionLong: {
      fr: "Certaines tâches mobilisent du temps sans réelle valeur ajoutée : classification de documents, rédaction de réponses types, extraction d'informations, résumés automatiques... Je conçois des solutions qui orchestrent plusieurs modèles IA et les connectent à vos systèmes (CRM, APIs, bases de données) pour automatiser ces processus. Le tout en maîtrisant les coûts, car tous les fournisseurs IA ne se valent pas selon les tâches. Inclus : conception du pipeline, développement, tests et mise en production.",
      en: "Some tasks consume time without adding real value: document classification, drafting standard replies, information extraction, automatic summaries... I design solutions that orchestrate multiple AI models and connect them to your systems (CRM, APIs, databases) to automate these processes. All while keeping costs under control, because not all AI providers are equal depending on the task. Includes: pipeline design, development, testing and deployment.",
    },
    tags: ["Automatisation", "Workflows", "APIs", "IA"],
    icon: "Zap",
    featured: true,
  },
  {
    id: "saas-ai",
    title: {
      fr: "Développement SaaS & applications IA",
      en: "SaaS & AI-first app development",
    },
    tagline: {
      fr: "De l'idée au produit fonctionnel : je développe des applications web intégrant l'IA dès la conception.",
      en: "From idea to working product: I build web applications with AI built in from day one.",
    },
    descriptionLong: {
      fr: "Vous avez une idée de produit qui intègre l'IA et avez besoin de passer à l'action rapidement ? Je prends en charge le développement complet : architecture backend, interfaces web, intégration des modèles IA, APIs, déploiement. Approche MVP pour valider votre concept avant d'investir massivement. Je travaille vite, avec des outils modernes (Next.js, Python, PostgreSQL, Redis, Docker) et une priorité : vous livrer quelque chose qui fonctionne et que vous pouvez faire évoluer. Inclus : conception, développement, mise en production et documentation technique.",
      en: "You have a product idea that integrates AI and need to move fast? I handle the full build: backend architecture, web interfaces, AI model integration, APIs, deployment. MVP approach to validate your concept before heavy investment. I work quickly with modern tools (Next.js, Python, PostgreSQL, Redis, Docker) with one priority: delivering something that works and that you can grow. Includes: design, development, deployment and technical documentation.",
    },
    tags: ["SaaS", "Web", "MVP", "Déploiement"],
    icon: "Rocket",
    featured: false,
  },
  {
    id: "machine-learning",
    title: {
      fr: "Machine learning sur mesure",
      en: "Custom machine learning",
    },
    tagline: {
      fr: "Des modèles entraînés sur vos données pour classifier, prédire ou enrichir vos informations métier.",
      en: "Models trained on your data to classify, predict or enrich your business information.",
    },
    descriptionLong: {
      fr: "Pour certains problèmes, un modèle entraîné spécifiquement sur vos données surpasse largement une solution générique. Je développe des modèles adaptés à vos cas d'usage : classification de documents ou d'entreprises, extraction et enrichissement de données, recherche de similarité (trouver des éléments proches en sens, pas seulement par mots-clés). Chaque modèle est évalué rigoureusement avant livraison. Je prends en charge la préparation des données, l'entraînement, l'évaluation et le déploiement. Idéal pour les entreprises disposant déjà de données historiques à valoriser.",
      en: "For some problems, a model trained specifically on your data far outperforms a generic solution. I develop models tailored to your use cases: document or company classification, data extraction and enrichment, similarity search (finding related items by meaning, not just keywords). Each model is rigorously evaluated before delivery. I handle data preparation, training, evaluation and deployment. Ideal for companies that already have historical data to leverage.",
    },
    tags: ["ML", "Classification", "Données", "Prédiction"],
    icon: "Brain",
    featured: false,
  },
];
