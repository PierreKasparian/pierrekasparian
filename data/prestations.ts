import type { LocalizedString } from "./projects";

interface LocalizedList {
  fr: string[];
  en: string[];
}

export interface PrestationFAQItem {
  q: LocalizedString;
  a: LocalizedString;
}

export interface PrestationStep {
  title: LocalizedString;
  body: LocalizedString;
}

export interface Prestation {
  id: string;
  title: LocalizedString;
  tagline: LocalizedString;
  whatIs: LocalizedString;
  bullets: LocalizedList;
  steps: PrestationStep[];
  faq: PrestationFAQItem[];
  tags: string[];
  icon: string;
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
    whatIs: {
      fr: "Un chatbot RAG (Retrieval-Augmented Generation) est un assistant IA qui répond exclusivement à partir de vos documents internes. Contrairement à ChatGPT, il n'invente pas de réponses : chaque réponse est tracée jusqu'à sa source, avec hébergement européen disponible pour rester conforme RGPD.",
      en: "A RAG chatbot (Retrieval-Augmented Generation) is an AI assistant that answers exclusively from your internal documents. Unlike ChatGPT, it does not hallucinate: every answer is traceable to its source, with EU hosting available for full GDPR compliance.",
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
    steps: [
      {
        title: { fr: "Audit documentaire", en: "Document audit" },
        body: {
          fr: "Analyse de vos sources existantes (PDF, bases de connaissances, wikis) et identification du périmètre de l'assistant.",
          en: "Analysis of your existing sources (PDFs, knowledge bases, wikis) and scoping the assistant's coverage.",
        },
      },
      {
        title: { fr: "Indexation et vectorisation", en: "Indexing and vectorisation" },
        body: {
          fr: "Découpage, nettoyage et vectorisation des documents dans une base vectorielle (Qdrant) optimisée pour la recherche sémantique.",
          en: "Chunking, cleaning and vectorising documents into a vector database (Qdrant) optimised for semantic search.",
        },
      },
      {
        title: { fr: "Développement de l'assistant", en: "Assistant development" },
        body: {
          fr: "Développement de la chaîne RAG (LangChain), de l'interface et des intégrations nécessaires (Slack, widget web, API interne).",
          en: "Building the RAG chain (LangChain), the interface and any required integrations (Slack, web widget, internal API).",
        },
      },
      {
        title: { fr: "Déploiement et transfert", en: "Deployment and handover" },
        body: {
          fr: "Mise en production sur votre infrastructure ou cloud européen, documentation technique et transfert de compétences à votre équipe.",
          en: "Production deployment on your infrastructure or EU cloud, technical documentation and knowledge transfer to your team.",
        },
      },
      {
        title: { fr: "Maintenance", en: "Maintenance" },
        body: {
          fr: "Accompagnement à la prise en main, mise à jour des documents sources et ajustements de l'assistant selon les retours d'usage de votre équipe.",
          en: "Onboarding support, source document updates and assistant adjustments based on your team's real usage feedback.",
        },
      },
    ],
    faq: [
      {
        q: {
          fr: "Qu'est-ce qu'un chatbot RAG ?",
          en: "What is a RAG chatbot?",
        },
        a: {
          fr: "RAG signifie Retrieval-Augmented Generation. C'est une architecture qui connecte un LLM à une base de documents. Avant de répondre, le modèle cherche les passages pertinents dans vos documents et construit sa réponse à partir de ces extraits. Résultat : aucune hallucination, chaque réponse est sourcée.",
          en: "RAG stands for Retrieval-Augmented Generation. It connects a language model to a document base. Before answering, the model retrieves relevant passages from your documents and builds its response from those extracts. The result: no hallucinations, every answer is sourced.",
        },
      },
      {
        q: {
          fr: "Quelle différence entre un chatbot RAG et ChatGPT ?",
          en: "What is the difference between a RAG chatbot and ChatGPT?",
        },
        a: {
          fr: "ChatGPT répond à partir de ses données d'entraînement générales. Un chatbot RAG répond uniquement à partir de vos documents. Il ne peut pas répondre hors contexte, chaque réponse cite sa source, et les données restent sous votre contrôle.",
          en: "ChatGPT answers from its general training data. A RAG chatbot answers only from your documents. It cannot respond out of context, every answer cites its source, and the data stays under your control.",
        },
      },
      {
        q: {
          fr: "Mon chatbot RAG peut-il rester conforme RGPD ?",
          en: "Can my RAG chatbot stay GDPR-compliant?",
        },
        a: {
          fr: "Oui. La solution peut être déployée avec un LLM open source (Mistral 7B, Llama 3) hébergé sur votre infrastructure ou sur un VPS européen (OVHcloud, Scaleway). Aucune donnée ne sort de l'UE. Pour les cas d'usage moins sensibles, Mistral AI (Paris) offre une API conforme RGPD avec DPA.",
          en: "Yes. The solution can be deployed with an open-source LLM (Mistral 7B, Llama 3) hosted on your infrastructure or a European VPS (OVHcloud, Scaleway). No data leaves the EU. For less sensitive use cases, Mistral AI (Paris) offers a GDPR-compliant API with a DPA.",
        },
      },
      {
        q: {
          fr: "Sur quels types de documents fonctionne un chatbot RAG ?",
          en: "What document types does a RAG chatbot support?",
        },
        a: {
          fr: "PDF, Word, Excel, emails, wikis Confluence, Notion, bases de données, pages web : pratiquement toute source de texte structuré ou non structuré. La phase d'audit documentaire permet d'évaluer la qualité de vos sources pour optimiser la pertinence des réponses.",
          en: "PDF, Word, Excel, emails, Confluence wikis, Notion, databases, web pages: practically any source of structured or unstructured text. The document audit phase assesses the quality of your sources to optimise answer relevance.",
        },
      },
    ],
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
    whatIs: {
      fr: "L'ingénierie des données consiste à concevoir les pipelines qui collectent, transforment et centralisent vos données brutes. C'est la fondation indispensable avant toute intégration IA : sans données propres et accessibles, les LLM et modèles ML ne peuvent pas délivrer de résultats fiables.",
      en: "Data engineering means designing the pipelines that collect, transform and centralise your raw data. It is the essential foundation before any AI integration: without clean, accessible data, LLMs and ML models cannot deliver reliable results.",
    },
    bullets: {
      fr: [
        "Pipelines de collecte et de transformation fiables, de zéro à la production",
        "Stack moderne : Python, dbt, Airflow",
        "De la connexion de nouvelles sources à la préparation de jeux de données pour l'entraînement de modèles",
      ],
      en: [
        "Reliable data collection and transformation pipelines, from zero to production",
        "Modern tooling: Python, dbt, Airflow",
        "From connecting new sources to preparing datasets for model training",
      ],
    },
    steps: [
      {
        title: { fr: "Audit des sources", en: "Source audit" },
        body: {
          fr: "Cartographie de vos sources de données (bases SQL, APIs, fichiers, SaaS) et identification des problèmes de qualité, doublons et silos.",
          en: "Mapping your data sources (SQL databases, APIs, files, SaaS tools) and identifying quality issues, duplicates and silos.",
        },
      },
      {
        title: { fr: "Architecture des pipelines", en: "Pipeline architecture" },
        body: {
          fr: "Conception de l'architecture cible : choix du stack (dbt, Airflow, Prefect), modèle de données, stratégies d'ingestion et de transformation.",
          en: "Designing the target architecture: stack selection (dbt, Airflow, Prefect), data model, ingestion and transformation strategies.",
        },
      },
      {
        title: { fr: "Développement et tests", en: "Development and testing" },
        body: {
          fr: "Développement des transformations dbt, des DAGs Airflow et des connecteurs. Tests unitaires et de non-régression sur les données.",
          en: "Developing dbt transformations, Airflow DAGs and connectors. Unit tests and regression tests on the data.",
        },
      },
      {
        title: { fr: "Monitoring en production", en: "Production monitoring" },
        body: {
          fr: "Déploiement avec alertes sur les erreurs de pipeline, tests de fraîcheur des données et documentation technique pour votre équipe.",
          en: "Deployment with pipeline error alerts, data freshness tests and technical documentation for your team.",
        },
      },
      {
        title: { fr: "Maintenance", en: "Maintenance" },
        body: {
          fr: "Accompagnement à la prise en main des pipelines, ajustements selon l'évolution des sources et support ponctuel pour les nouvelles intégrations.",
          en: "Pipeline onboarding support, adjustments as data sources evolve and occasional support for new integrations.",
        },
      },
    ],
    faq: [
      {
        q: {
          fr: "Pourquoi structurer mes données avant d'intégrer l'IA ?",
          en: "Why structure my data before integrating AI?",
        },
        a: {
          fr: "Un LLM ou un modèle ML n'améliore pas des données de mauvaise qualité. Si vos données sont fragmentées dans plusieurs outils, non nettoyées ou sans définition commune, le modèle apprendra les incohérences. L'ingénierie des données en amont garantit que l'IA travaille sur une base fiable.",
          en: "An LLM or ML model does not improve bad data quality. If your data is fragmented across tools, uncleaned or lacks a common definition, the model will learn the inconsistencies. Data engineering upstream ensures AI works on a reliable foundation.",
        },
      },
      {
        q: {
          fr: "Quels outils utilisez-vous ?",
          en: "What tools do you use?",
        },
        a: {
          fr: "Python pour la collecte et la transformation, dbt pour les transformations SQL et la documentation du modèle de données, Airflow ou Prefect pour l'orchestration, et PostgreSQL ou BigQuery selon le contexte. La stack est choisie en fonction de votre existant et de vos contraintes.",
          en: "Python for collection and transformation, dbt for SQL transformations and data model documentation, Airflow or Prefect for orchestration, and PostgreSQL or BigQuery depending on context. The stack is chosen based on your existing setup and constraints.",
        },
      },
      {
        q: {
          fr: "Peut-on commencer avec des données très fragmentées ?",
          en: "Can we start with very fragmented data?",
        },
        a: {
          fr: "Oui, c'est précisément le cas le plus courant. La première étape est toujours un audit pour évaluer la qualité et la structure existantes. On commence par les sources les plus critiques pour votre cas d'usage prioritaire, puis on étend progressivement.",
          en: "Yes, that is precisely the most common case. The first step is always an audit to assess existing quality and structure. We start with the most critical sources for your priority use case, then extend gradually.",
        },
      },
      {
        q: {
          fr: "Le pipeline ETL est-il maintenu après la livraison ?",
          en: "Is the ETL pipeline maintained after delivery?",
        },
        a: {
          fr: "La livraison inclut une documentation technique complète et un transfert de compétences pour que votre équipe puisse faire évoluer les pipelines. Des missions de maintenance ponctuelle sont possibles selon les besoins.",
          en: "Delivery includes full technical documentation and a knowledge transfer so your team can evolve the pipelines. Occasional maintenance engagements are available depending on your needs.",
        },
      },
    ],
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
    whatIs: {
      fr: "L'automatisation par l'IA connecte des agents logiciels combinant LLM, APIs et logique métier pour exécuter des tâches répétitives sans intervention humaine. Extraction d'information depuis des emails ou PDF, classification de documents, génération de réponses types : ces processus tournent en continu et s'intègrent à vos outils existants.",
      en: "AI automation connects software agents combining LLMs, APIs and business logic to execute repetitive tasks without human intervention. Extracting information from emails or PDFs, classifying documents, drafting standard replies: these processes run continuously and integrate with your existing tools.",
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
    steps: [
      {
        title: { fr: "Cartographie des processus", en: "Process mapping" },
        body: {
          fr: "Identification des tâches répétitives à fort volume, estimation du gain de temps et priorisation selon l'impact métier.",
          en: "Identifying high-volume repetitive tasks, estimating time savings and prioritising by business impact.",
        },
      },
      {
        title: { fr: "Conception des agents", en: "Agent design" },
        body: {
          fr: "Architecture des agents (n8n, LangChain) : définition des déclencheurs, des LLM utilisés par étape et des intégrations nécessaires.",
          en: "Agent architecture (n8n, LangChain): defining triggers, which LLMs to use per step and required integrations.",
        },
      },
      {
        title: { fr: "Développement et intégrations", en: "Development and integrations" },
        body: {
          fr: "Développement des workflows, connexion aux APIs existantes (CRM, outils internes, emails) et tests sur cas réels.",
          en: "Building the workflows, connecting to existing APIs (CRM, internal tools, email) and testing on real cases.",
        },
      },
      {
        title: { fr: "Tests et mise en production", en: "Testing and deployment" },
        body: {
          fr: "Validation des sorties sur un échantillon représentatif, mise en production avec monitoring des erreurs et points hebdomadaires les premières semaines.",
          en: "Output validation on a representative sample, production deployment with error monitoring and weekly check-ins for the first few weeks.",
        },
      },
      {
        title: { fr: "Maintenance", en: "Maintenance" },
        body: {
          fr: "Accompagnement à la prise en main des workflows automatisés, ajustements selon les cas réels et évolution des agents si les besoins métier changent.",
          en: "Onboarding support for automated workflows, real-world adjustments and agent evolution as business needs change.",
        },
      },
    ],
    faq: [
      {
        q: {
          fr: "Quels processus puis-je automatiser avec l'IA ?",
          en: "Which processes can I automate with AI?",
        },
        a: {
          fr: "Les cas les plus courants : extraction d'information dans des emails ou des PDF, classification de tickets support, génération de réponses types, résumés de réunions, enrichissement de données CRM. Tout processus qui demande à un humain de lire, comprendre et produire une sortie textuelle répétitive est automatisable.",
          en: "The most common cases: extracting information from emails or PDFs, classifying support tickets, drafting standard replies, meeting summaries, CRM data enrichment. Any process requiring a human to read, understand and produce a repetitive text output can be automated.",
        },
      },
      {
        q: {
          fr: "L'automatisation IA est-elle compatible avec le RGPD ?",
          en: "Is AI automation GDPR-compliant?",
        },
        a: {
          fr: "Oui, avec la bonne architecture. Si les données traitées sont personnelles, on configure le pipeline pour utiliser un modèle hébergé en Europe (Mistral AI, OVHcloud) ou on-premise. Pour les données non-sensibles, les fournisseurs US avec DPA signé sont acceptables selon le contexte.",
          en: "Yes, with the right architecture. If the processed data is personal, the pipeline is configured to use a model hosted in Europe (Mistral AI, OVHcloud) or on-premise. For non-sensitive data, US providers with a signed DPA are acceptable depending on context.",
        },
      },
      {
        q: {
          fr: "Mes outils actuels (CRM, email, ERP) sont-ils compatibles ?",
          en: "Are my current tools (CRM, email, ERP) compatible?",
        },
        a: {
          fr: "Dans la quasi-totalité des cas, oui. n8n dispose de connecteurs pour Salesforce, HubSpot, Notion, Google Workspace, Slack et des centaines d'autres outils. Pour les outils sans connecteur natif, une intégration via API REST est généralement possible.",
          en: "In almost all cases, yes. n8n has connectors for Salesforce, HubSpot, Notion, Google Workspace, Slack and hundreds of other tools. For tools without a native connector, integration via REST API is usually possible.",
        },
      },
      {
        q: {
          fr: "Quel est le retour sur investissement typique ?",
          en: "What is the typical return on investment?",
        },
        a: {
          fr: "Pour des processus à fort volume (traitement de centaines d'emails ou documents par jour), les automatisations atteignent l'équilibre en quelques semaines. Pour des volumes plus modestes, le gain est davantage qualitatif : suppression des erreurs et libération de temps pour des tâches à valeur ajoutée.",
          en: "For high-volume processes (handling hundreds of emails or documents per day), automations typically break even within a few weeks. For more modest volumes, the gain is more qualitative: eliminating errors and freeing time for higher-value tasks.",
        },
      },
    ],
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
    whatIs: {
      fr: "Le développement SaaS avec IA intégrée consiste à construire une application web complète — backend, frontend, APIs, base de données — en intégrant des fonctionnalités IA dès la conception. L'objectif est de passer de l'idée à un MVP fonctionnel, déployable et maintenable par votre équipe.",
      en: "SaaS development with integrated AI means building a complete web application — backend, frontend, APIs, database — with AI capabilities built in from the ground up. The goal is to go from idea to a working MVP that your team can deploy and maintain.",
    },
    bullets: {
      fr: [
        "De l'idée au MVP : architecture backend, interfaces web, intégration IA, APIs et déploiement",
        "Approche itérative pour valider le concept avant d'investir davantage",
        "Stack moderne (Next.js, Python, Docker, ...), livraison d'un produit que vous pouvez faire évoluer",
      ],
      en: [
        "From idea to MVP: backend architecture, web interfaces, AI integration, APIs and deployment",
        "Iterative approach to validate your concept before scaling investment",
        "Modern stack (Next.js, Python, Docker, ...), delivered as something you can grow",
      ],
    },
    steps: [
      {
        title: { fr: "Cadrage produit", en: "Product scoping" },
        body: {
          fr: "Définition des fonctionnalités MVP, des personas utilisateurs, du modèle de données et des critères de succès. Livrable : spécification technique validée.",
          en: "Defining MVP features, user personas, data model and success criteria. Output: a validated technical specification.",
        },
      },
      {
        title: { fr: "Architecture technique", en: "Technical architecture" },
        body: {
          fr: "Choix du stack (Next.js, FastAPI, PostgreSQL, Docker), des composants IA et de l'hébergement. Prise en compte de la conformité RGPD dès cette étape.",
          en: "Stack selection (Next.js, FastAPI, PostgreSQL, Docker), AI components and hosting. GDPR compliance is factored in at this stage.",
        },
      },
      {
        title: { fr: "Développement itératif", en: "Iterative development" },
        body: {
          fr: "Développement par sprints avec démos régulières. Chaque fonctionnalité est livrée testée et déployée en staging pour validation.",
          en: "Sprint-based development with regular demos. Each feature is delivered tested and deployed to staging for sign-off.",
        },
      },
      {
        title: { fr: "Déploiement et documentation", en: "Deployment and documentation" },
        body: {
          fr: "Mise en production sur votre hébergeur ou cloud européen, documentation développeur et transfert de compétences pour que votre équipe soit autonome.",
          en: "Production deployment on your host or EU cloud, developer documentation and knowledge transfer for team autonomy.",
        },
      },
      {
        title: { fr: "Maintenance", en: "Maintenance" },
        body: {
          fr: "Accompagnement à la prise en main du produit, corrections des premiers retours en production et évolutions mineures selon les retours utilisateurs.",
          en: "Product onboarding support, early production fixes and minor iterations based on user feedback.",
        },
      },
    ],
    faq: [
      {
        q: {
          fr: "Qu'est-ce qu'un MVP et pourquoi commencer par là ?",
          en: "What is an MVP and why start there?",
        },
        a: {
          fr: "Un MVP (Minimum Viable Product) est la version la plus simple du produit qui délivre de la valeur à vos premiers utilisateurs. On commence par là pour valider les hypothèses métier avant d'investir dans des fonctionnalités avancées. C'est moins risqué et plus rapide à livrer.",
          en: "An MVP (Minimum Viable Product) is the simplest version of the product that delivers value to your first users. We start here to validate business assumptions before investing in advanced features. It is less risky and faster to deliver.",
        },
      },
      {
        q: {
          fr: "Quelle stack technique utilisez-vous ?",
          en: "What tech stack do you use?",
        },
        a: {
          fr: "Pour le frontend : Next.js (React) avec TypeScript et Tailwind CSS. Pour le backend : FastAPI (Python) ou Next.js API Routes selon le cas d'usage. Base de données : PostgreSQL. Déploiement : Docker sur VPS ou Fly.io. Les composants IA utilisent LangChain ou l'API Mistral selon les besoins.",
          en: "Frontend: Next.js (React) with TypeScript and Tailwind CSS. Backend: FastAPI (Python) or Next.js API Routes depending on the use case. Database: PostgreSQL. Deployment: Docker on VPS or Fly.io. AI components use LangChain or the Mistral API as needed.",
        },
      },
      {
        q: {
          fr: "Combien de temps pour un premier MVP ?",
          en: "How long does a first MVP take?",
        },
        a: {
          fr: "Pour un MVP ciblé (3 à 5 fonctionnalités core), comptez 4 à 6 semaines. Ce délai dépend fortement de la clarté du cahier des charges initial et de la disponibilité pour les retours clients hebdomadaires. Un cadrage sérieux en amont réduit significativement les allers-retours.",
          en: "For a focused MVP (3 to 5 core features), expect 4 to 6 weeks. This timeline depends heavily on the clarity of the initial brief and availability for weekly feedback. Thorough upfront scoping significantly reduces back-and-forth.",
        },
      },
      {
        q: {
          fr: "Pourrai-je faire évoluer l'application seul après la livraison ?",
          en: "Will I be able to evolve the application independently after delivery?",
        },
        a: {
          fr: "Oui, c'est un objectif explicite de chaque mission. La livraison comprend une documentation technique complète, un README clair et une session de passation. Le code est écrit pour être lisible et maintenable, sans dépendances propriétaires obscures.",
          en: "Yes, that is an explicit goal of every engagement. Delivery includes full technical documentation, a clear README and a handover session. The code is written to be readable and maintainable, with no obscure proprietary dependencies.",
        },
      },
    ],
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
    whatIs: {
      fr: "Le machine learning sur mesure consiste à entraîner un modèle prédictif ou classificateur spécifiquement sur vos données historiques. Contrairement aux LLM génériques, un modèle ML entraîné sur vos données est optimisé pour vos cas d'usage précis et fonctionne sans connexion à des APIs externes.",
      en: "Custom machine learning means training a predictive or classification model specifically on your historical data. Unlike generic LLMs, an ML model trained on your data is optimised for your exact use cases and runs without any external API dependency.",
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
    steps: [
      {
        title: { fr: "Analyse et préparation des données", en: "Data analysis and preparation" },
        body: {
          fr: "Exploration des données disponibles, évaluation de la qualité, nettoyage et construction des features pertinentes pour le modèle.",
          en: "Exploring available data, assessing quality, cleaning and building relevant features for the model.",
        },
      },
      {
        title: { fr: "Sélection du modèle", en: "Model selection" },
        body: {
          fr: "Comparaison des approches (régression, classification, clustering, NLP) et choix du modèle selon les contraintes : performance, interprétabilité, coût d'inférence.",
          en: "Comparing approaches (regression, classification, clustering, NLP) and choosing the model based on constraints: performance, interpretability, inference cost.",
        },
      },
      {
        title: { fr: "Entraînement et évaluation", en: "Training and evaluation" },
        body: {
          fr: "Entraînement avec validation croisée, optimisation des hyperparamètres et évaluation sur un jeu de test isolé. Métriques fournies selon le cas d'usage.",
          en: "Training with cross-validation, hyperparameter optimisation and evaluation on a held-out test set. Metrics provided according to the use case.",
        },
      },
      {
        title: { fr: "Déploiement et intégration", en: "Deployment and integration" },
        body: {
          fr: "Packaging du modèle (API REST ou batch), intégration dans vos systèmes existants et monitoring des performances en production.",
          en: "Model packaging (REST API or batch), integration into your existing systems and production performance monitoring.",
        },
      },
      {
        title: { fr: "Maintenance", en: "Maintenance" },
        body: {
          fr: "Accompagnement à la prise en main du modèle en production, suivi des métriques et ajustements si les distributions de données évoluent.",
          en: "Model onboarding support in production, metric tracking and adjustments if data distributions drift.",
        },
      },
    ],
    faq: [
      {
        q: {
          fr: "De combien de données ai-je besoin pour entraîner un modèle ?",
          en: "How much data do I need to train a model?",
        },
        a: {
          fr: "Cela dépend fortement du problème. Pour une classification binaire simple, quelques centaines d'exemples labelisés suffisent souvent. Pour de la NLP ou des cas complexes, quelques milliers sont préférables. La phase d'audit évalue ce point avant tout engagement.",
          en: "It depends strongly on the problem. For simple binary classification, a few hundred labelled examples are often enough. For NLP or complex cases, a few thousand are preferable. The audit phase assesses this before any commitment.",
        },
      },
      {
        q: {
          fr: "Quelle différence entre le machine learning et un LLM ?",
          en: "What is the difference between machine learning and an LLM?",
        },
        a: {
          fr: "Un LLM est un modèle de langage généraliste pré-entraîné sur des milliards de textes. Un modèle ML sur mesure est entraîné uniquement sur vos données pour un objectif précis (prédire un churn, classifier un document). Le ML sur mesure est souvent plus rapide, moins cher à l'inférence et plus précis sur des tâches métier spécifiques.",
          en: "An LLM is a general-purpose language model pre-trained on billions of texts. A custom ML model is trained only on your data for a specific objective (predicting churn, classifying a document). Custom ML is often faster, cheaper at inference and more accurate on specific business tasks.",
        },
      },
      {
        q: {
          fr: "Le modèle peut-il être mis à jour quand mes données évoluent ?",
          en: "Can the model be updated as my data evolves?",
        },
        a: {
          fr: "Oui. La livraison inclut les scripts d'entraînement et de validation documentés, pour que votre équipe puisse réentraîner le modèle sur de nouvelles données. Des missions de réentraînement ponctuel sont également disponibles.",
          en: "Yes. Delivery includes documented training and validation scripts so your team can retrain the model on new data. One-off retraining engagements are also available.",
        },
      },
      {
        q: {
          fr: "Le modèle ML est-il compatible avec le RGPD ?",
          en: "Is the ML model GDPR-compliant?",
        },
        a: {
          fr: "Si le modèle est entraîné sur des données personnelles, une Analyse d'Impact (AIPD) peut être nécessaire selon l'Article 35 du RGPD. Le déploiement on-premise ou sur cloud européen garantit que les données d'inférence ne quittent pas l'UE. Ces points sont évalués dès l'audit.",
          en: "If the model is trained on personal data, a Data Protection Impact Assessment (DPIA) may be required under Article 35 of the GDPR. On-premise or EU cloud deployment ensures that inference data does not leave the EU. These points are evaluated during the initial audit.",
        },
      },
    ],
    tags: ["ML", "Classification", "Prédiction", "Data Science"],
    icon: "Brain",
    featured: false,
    relatedProjectSlugs: ["medee-ml"],
  },
];
