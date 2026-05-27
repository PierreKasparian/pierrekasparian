import type { LocalizedString } from "./projects";

interface LocalizedList {
  fr: string[];
  en: string[];
}

export interface Prestation {
  id: string;
  title: LocalizedString;
  tagline: LocalizedString;
  bullets: LocalizedList;
  tags: string[];
  icon: string; // lucide-react icon name
  featured?: boolean;
  relatedProjectSlugs?: string[];
}

export const prestations: Prestation[] = [
  {
    id: "agents-ia",
    title: {
      fr: "Chatbots RAG intelligents",
      en: "RAG intelligent chatbots",
    },
    tagline: {
      fr: "Un assistant capable de répondre en s'appuyant sur vos propres documents.",
      en: "An assistant that answers grounded in your own documents.",
    },
    bullets: {
      fr: [
        "Assistants sur mesure qui comprennent vos documents internes (PDF, mails, bases de connaissances)",
        "Mémoire du contexte de chaque échange, réponses basées exclusivement sur vos données",
        "Chaque réponse est traçable jusqu'à sa source",
        "Idéal pour le support client, l'assistance interne ou la gestion documentaire",
        "Hébergement en Europe ou sur site disponible",
      ],
      en: [
        "Custom assistants that understand your internal documents (PDFs, emails, knowledge bases)",
        "Context memory across conversations, answers based exclusively on your data",
        "Every response is traceable to its source",
        "Ideal for customer support, internal assistance or document management",
        "EU hosting available",
      ],
    },
    tags: ["LangChain", "Python", "Web fullstack", "Infrastructure", "Qdrant"],
    icon: "Bot",
    featured: true,
    relatedProjectSlugs: ["ailog-rag", "livesession-formation"],
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
    bullets: {
      fr: [
        "Pipelines de collecte et de transformation fiables, de zéro à la production",
        "Stack moderne : Python, dbt, Airflow - automatisés pour une base toujours propre",
        "De la connexion de nouvelles sources à la préparation de jeux de données pour l'entraînement de modèles",
      ],
      en: [
        "Reliable data collection and transformation pipelines, from zero to production",
        "Modern tooling: Python, dbt, Airflow - automated for a consistently clean foundation",
        "From connecting new sources to preparing datasets for model training",
      ],
    },
    tags: ["Python", "DBT", "SQL", "Airflow"],
    icon: "Database",
    featured: true,
    relatedProjectSlugs: ["pretto-email-pipeline"],
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
    bullets: {
      fr: [
        "Classification de documents, rédaction de réponses types, extraction d'informations, résumés automatiques",
        "Agents qui orchestrent plusieurs modèles IA et s'intègrent à vos outils (CRM, APIs, bases de données)",
        "Maîtrise des coûts : Utilisation du modèle adapté selon les tâches",
      ],
      en: [
        "Document classification, drafting standard replies, information extraction, automatic summaries",
        "Agents that orchestrate multiple AI models and connect to your existing tools (CRM, APIs, databases)",
        "Cost control: not all AI providers are equal depending on the task",
      ],
    },
    tags: ["n8n", "APIs", "Qdrant"],
    icon: "Zap",
    featured: true,
    relatedProjectSlugs: [
      "pretto-batch-inference",
      "pretto-llm-platform",
      "pretto-prompt-pipeline",
    ],
  },
  {
    id: "saas-ai",
    title: {
      fr: "Développement SaaS",
      en: "SaaS development",
    },
    tagline: {
      fr: "De l'idée au produit fonctionnel : je développe des applications web intégrant l'IA dès la conception.",
      en: "From idea to working product: I build web applications with AI built in from day one.",
    },
    bullets: {
      fr: [
        "De l'idée au MVP : architecture backend, interfaces web, intégration IA, APIs et déploiement",
        "Approche itérative pour valider le concept avant d'investir davantage",
        "Stack moderne (Next.js, Python, Docker), livraison d'un produit que vous pouvez faire évoluer",
      ],
      en: [
        "From idea to MVP: backend architecture, web interfaces, AI integration, APIs and deployment",
        "Iterative approach to validate your concept before scaling investment",
        "Modern stack (Next.js, Python, Docker), delivered as something you can grow",
      ],
    },
    tags: ["Web", "MVP", "Docker"],
    icon: "Rocket",
    featured: false,
    relatedProjectSlugs: ["appli-aide-devoirs", "podcastify"],
  },
  {
    id: "machine-learning",
    title: {
      fr: "Machine learning",
      en: "Machine learning",
    },
    tagline: {
      fr: "Des modèles entraînés sur vos données pour classifier, prédire ou enrichir vos informations métier.",
      en: "Models trained on your data to classify, predict or enrich your business information.",
    },
    bullets: {
      fr: [
        "Modèle entraîné spécifiquement sur vos données pour dépasser les solutions génériques",
        "Préparation des données, entraînement, évaluation et déploiement pris en charge",
        "Cas d'usage : classification, extraction, enrichissement, recherche sémantique",
        "Idéal pour les entreprises disposant déjà de données historiques à valoriser",
      ],
      en: [
        "Model trained specifically on your data to outperform generic solutions",
        "Data preparation, training, evaluation and deployment handled end-to-end",
        "Use cases: classification, extraction, enrichment, semantic search",
        "Ideal for companies that already have historical data to leverage",
      ],
    },
    tags: ["ML", "Classification", "Prédiction", "Data Science"],
    icon: "Brain",
    featured: false,
    relatedProjectSlugs: ["medee-ml"],
  },
];
