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
    id: "audit-ia",
    title: {
      fr: "Audit IA & conformité RGPD",
      en: "AI audit & GDPR compliance",
    },
    tagline: {
      fr: "Cartographie de vos flux de données, identification des risques et opportunités IA.",
      en: "Map your data flows, identify AI risks and integration opportunities.",
    },
    descriptionLong: {
      fr: "Avant de choisir un outil IA, il faut comprendre où vont vos données et quelles obligations légales s'appliquent. Cet audit comprend un entretien avec les équipes métier, une analyse des outils existants, une cartographie du flux de données (endpoints, sous-traitants, pays d'hébergement) et un rapport synthétisant les risques RGPD et les opportunités d'automatisation IA. Livrable : rapport PDF + roadmap priorisée.",
      en: "Before choosing an AI tool, you need to understand where your data goes and what legal obligations apply. This audit includes a workshop with business teams, a review of existing tools, a data-flow mapping (endpoints, processors, hosting countries) and a report synthesising GDPR risks and AI automation opportunities. Deliverable: PDF report + prioritised roadmap.",
    },
    tags: ["Audit", "RGPD", "Conseil", "Données"],
    icon: "ShieldCheck",
    featured: true,
  },
  {
    id: "integration-llm",
    title: {
      fr: "Intégration LLM sur mesure",
      en: "Custom LLM integration",
    },
    tagline: {
      fr: "Connectez un LLM à vos outils internes sans exposer vos données sensibles.",
      en: "Connect a LLM to your internal tools without exposing sensitive data.",
    },
    descriptionLong: {
      fr: "J'intègre un LLM (open source ou frontier) dans votre workflow : API interne, Slack, CRM, back-office. Chaque intégration est pensée pour rester dans le périmètre RGPD : modèle hébergé en EU ou on-premise, anonymisation des inputs, journalisation des échanges. Includes : choix du modèle, ingénierie des prompts, API backend, tests de régression et documentation.",
      en: "I integrate a LLM (open-source or frontier) into your workflow: internal API, Slack, CRM, back-office. Every integration is designed to stay within GDPR boundaries: EU-hosted or on-premise model, input anonymisation, exchange logging. Includes: model selection, prompt engineering, backend API, regression testing and documentation.",
    },
    tags: ["LLM", "API", "RGPD", "Automatisation"],
    icon: "Cpu",
    featured: true,
  },
  {
    id: "rag",
    title: {
      fr: "RAG & base documentaire intelligente",
      en: "RAG & intelligent document base",
    },
    tagline: {
      fr: "Permettez à vos équipes d'interroger vos documents internes en langage naturel.",
      en: "Let your teams query internal documents in natural language.",
    },
    descriptionLong: {
      fr: "Un système RAG (Retrieval-Augmented Generation) connecte un LLM à vos documents (PDF, Notion, Confluence, SharePoint…) pour répondre à des questions en s'appuyant sur votre base de connaissances propre. Le modèle ne sort rien de son imagination : chaque réponse cite ses sources. Hébergeable 100 % on-premise ou EU-cloud. Stack : LangChain / LlamaIndex, embeddings open source, vector DB (Chroma, pgvector, Qdrant).",
      en: "A RAG system connects a LLM to your documents (PDF, Notion, Confluence, SharePoint…) to answer questions grounded in your own knowledge base. The model cites its sources, no hallucination. Fully on-premise or EU-cloud deployable. Stack: LangChain / LlamaIndex, open-source embeddings, vector DB (Chroma, pgvector, Qdrant).",
    },
    tags: ["RAG", "LLM", "Documents", "Vector DB"],
    icon: "Database",
    featured: true,
  },
  {
    id: "fine-tuning",
    title: {
      fr: "Fine-tuning & spécialisation de modèle",
      en: "Fine-tuning & model specialisation",
    },
    tagline: {
      fr: "Adaptez un LLM open source à votre domaine métier pour des performances supérieures.",
      en: "Adapt an open-source LLM to your business domain for superior performance.",
    },
    descriptionLong: {
      fr: "Le fine-tuning permet d'obtenir un modèle compact, spécialisé sur votre vocabulaire et vos cas d'usage, plus performant qu'un modèle généraliste sur votre domaine. Techniques : QLoRA (4-bit), instruction tuning, RLHF allégé. Modèles de base : Mistral, Llama, Qwen, Phi. Le modèle final vous appartient et peut être hébergé chez vous. Inclus : préparation du dataset, entraînement, évaluation et déploiement.",
      en: "Fine-tuning gives you a compact model specialised on your vocabulary and use cases, outperforming a general model on your domain. Techniques: QLoRA (4-bit), instruction tuning, lightweight RLHF. Base models: Mistral, Llama, Qwen, Phi. The resulting model belongs to you and can be self-hosted. Includes: dataset preparation, training, evaluation and deployment.",
    },
    tags: ["Fine-tuning", "QLoRA", "Open source", "MLOps"],
    icon: "Brain",
    featured: false,
  },
  {
    id: "formation",
    title: {
      fr: "Formation équipe IA",
      en: "AI team training",
    },
    tagline: {
      fr: "Montez en compétence rapidement sur les LLM, RAG et agents IA.",
      en: "Quickly upskill your team on LLMs, RAG and AI agents.",
    },
    descriptionLong: {
      fr: "Formation sur mesure (demi-journée à 2 jours) pour des équipes techniques ou produit souhaitant comprendre et utiliser l'IA générative en entreprise. Sujets couverts : fondamentaux LLM, prompt engineering, RAG pratique, évaluation des modèles, RGPD & IA. Format : alternance théorie / ateliers pratiques, supports réutilisables. Disponible en présentiel ou visioconférence.",
      en: "Custom training (half-day to 2 days) for technical or product teams wanting to understand and use generative AI in production. Topics: LLM fundamentals, prompt engineering, hands-on RAG, model evaluation, GDPR & AI. Format: theory + practical workshops, reusable slides. Available in-person or online.",
    },
    tags: ["Formation", "LLM", "Prompt engineering", "Équipe"],
    icon: "GraduationCap",
    featured: false,
  },
];
