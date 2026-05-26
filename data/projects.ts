export interface LocalizedString {
  fr: string;
  en: string;
}

export interface Project {
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  descriptionLong: LocalizedString;
  imagePrincipale: string;
  images: string[];
  date: string;
  link: string;
  awardLink?: string;
  mrrLink?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: "pretto-ia",
    title: {
      fr: "Ingénieur IA & Data - Pretto",
      en: "AI & Data Engineer - Pretto",
    },
    description: {
      fr: "Pipeline d'évaluation de prompts, inférences par batch et auto-amélioration LLM pour une fintech du crédit immobilier.",
      en: "Prompt evaluation pipeline, batch inference service and LLM auto-improvement for a mortgage fintech.",
    },
    descriptionLong: {
      fr: "Stage puis mission freelance chez Pretto, fintech spécialisée dans le crédit immobilier.\n\nStage (août 2025 - février 2026) : création d'une pipeline d'auto-amélioration de prompt, développement d'une pipeline de suggestion automatique d'ajout d'éléments à un dataset, développement backend orienté architecture IA (Airflow, Google BigQuery).\n\nFreelance (février 2026 - avril 2026) : fiabilisation de la pipeline d'évaluation de prompt et amélioration de l'UX pour les équipes métier, création et mise en production d'un service d'inférences par batch.",
      en: "Internship then freelance at Pretto, a mortgage fintech.\n\nInternship (Aug 2025 - Feb 2026): built a prompt auto-improvement pipeline, a dataset auto-augmentation suggestion pipeline, backend development with an AI-oriented architecture (Airflow, Google BigQuery).\n\nFreelance (Feb 2026 - Apr 2026): hardened the prompt evaluation pipeline and improved UX for business teams, built and deployed a batch inference service.",
    },
    imagePrincipale: "",
    images: [],
    date: "2025-08-01",
    link: "https://www.pretto.fr/",
    featured: true,
  },
  {
    slug: "ailog-rag",
    title: {
      fr: "Chatbot RAG multi-clients - Ailog",
      en: "Multi-tenant RAG chatbot - Ailog",
    },
    description: {
      fr: "Solution RAG multi-clients en production : isolation des données, 95 % de pertinence, réponses en moins de 5 secondes.",
      en: "Multi-tenant RAG solution in production: data isolation, 95% relevance, responses in under 5 seconds.",
    },
    descriptionLong: {
      fr: "Développement et mise en production d'une solution RAG (Retrieval-Augmented Generation) multi-clients pour Ailog.\n\nChaque client peut indexer ses propres documents (PDF, Word, TXT, y compris OCR sur PDF image) et interroger son corpus via un chatbot dédié, créer et gérer plusieurs chatbots par organisation avec héritage des documents existants, et bénéficier d'une isolation stricte des données entre clients et entre sessions.\n\nFonctionnalités clés : API centralisée pour la gestion des utilisateurs, documents et chatbots. Optimisation des requêtes : reformulation automatique et sélection dynamique du modèle LLM (Mistral Small/Medium/Large) selon la complexité et la charge. Gestion fine des ressources : dépassement des rate limits, budgets par utilisateur/avatar, monitoring des coûts et alertes via webhooks. Snapshots journaliers des bases vectorielles, plan de reprise, conformité RGPD. Mise en cache des requêtes, architecture asynchrone.\n\nMise en production avec tests unitaires et stress tests (700 utilisateurs virtuels simultanés), monitoring Grafana, alerting.\n\nRésultats : réponses en moins de 5 secondes en moyenne, 95 % de pertinence sur les recherches internes, 0 fuite de données entre clients en production, solution déployée sur VPS OVH (conformité RGPD).",
      en: "Development and production deployment of a multi-tenant RAG (Retrieval-Augmented Generation) solution for Ailog.\n\nEach client can index their own documents (PDF, Word, TXT, including OCR on image PDFs) and query their corpus via a dedicated chatbot, create and manage multiple chatbots per organisation with document inheritance, and benefit from strict data isolation between clients and sessions.\n\nKey features: centralised API for managing users, documents and chatbots. Query optimisation: automatic reformulation and dynamic LLM model selection (Mistral Small/Medium/Large) based on complexity and load. Fine-grained resource management: rate limit handling, per-user/avatar budgets, cost monitoring and webhook alerts. Daily vector database snapshots, recovery plan, GDPR compliance. Query caching, async architecture.\n\nLaunched with unit tests and stress tests (700 concurrent virtual users), Grafana monitoring, alerting.\n\nResults: responses in under 5 seconds on average, 95% relevance on internal searches, 0 data leaks between clients in production, deployed on OVH VPS (GDPR compliant).",
    },
    imagePrincipale: "",
    images: [],
    date: "2025-07-01",
    link: "https://www.linkedin.com/in/pierre-kasparian-486101259/",
    featured: true,
  },
  {
    slug: "securite-solaire",
    title: {
      fr: "Application web - Sécurité solaire",
      en: "Web app - Solar Safety",
    },
    description: {
      fr: "Application web pour une association de prévention solaire : espace de formation pour les membres licenciés.",
      en: "Web app for a sun safety association: training space for licensed members.",
    },
    descriptionLong: {
      fr: "Conception et développement d'une application web pour une association oeuvrant pour la prévention des risques liés à l'exposition au soleil, dans le cadre d'une mission via Junior Conseil UTT.\n\nAprès plusieurs entretiens de cadrage avec le client, réalisation de maquettes interactives sous Figma, validées avant la phase de développement. L'application permet aux membres licenciés d'accéder, après achat d'une licence, à une bibliothèque de contenus de formation autour des bonnes pratiques de protection solaire. Une interface administrateur permet à l'association de gérer ses contenus (ajout, modification, suppression). L'accès est sécurisé par un code unique envoyé par email.\n\nStack : Next.js, Tailwind CSS (frontend), Supabase (authentification, base de données, stockage).",
      en: "Design and development of a web application for a sun exposure risk prevention association, as part of a Junior Conseil UTT mission.\n\nAfter several client briefing sessions, interactive Figma mockups were validated before development. The app lets licensed members access, after purchasing a licence, a training content library focused on sun protection best practices. An admin interface lets the association manage their content (add, edit, delete). Access is secured by a unique email-sent code.\n\nStack: Next.js, Tailwind CSS (frontend), Supabase (authentication, database, storage).",
    },
    imagePrincipale: "",
    images: [],
    date: "2025-05-01",
    link: "https://www.linkedin.com/in/pierre-kasparian-486101259/",
  },
  {
    slug: "medee-doddee",
    title: {
      fr: "Développement web - Doddee",
      en: "Web development - Doddee",
    },
    description: {
      fr: "Refonte UX, arborescence et contrôle des accès du site Doddee, en équipe chez Médée.",
      en: "UX overhaul, information architecture and access control for Doddee, as part of a team at Médée.",
    },
    descriptionLong: {
      fr: "Participation au développement en équipe du site Doddee pour Médée, avec un focus sur l'amélioration de l'expérience utilisateur et la structure fonctionnelle du site.\n\nObjectifs : optimisation de l'UI/UX pour rendre la navigation plus intuitive et cohérente, refonte partielle de l'arborescence pour mieux organiser les contenus et guider l'utilisateur, renforcement du contrôle des accès utilisateurs.\n\nMéthodologie : entretiens réguliers avec la fondatrice pour comprendre les besoins, collaboration en équipe pour optimiser les délais de livraison.",
      en: "Team development work on the Doddee website for Médée, with a focus on improving user experience and the site's functional structure.\n\nObjectives: UI/UX optimisation for more intuitive, consistent navigation; partial information architecture rework to better organise content and guide users; strengthened user access controls.\n\nMethodology: regular interviews with the founder to understand requirements; team collaboration to meet delivery deadlines.",
    },
    imagePrincipale: "",
    images: [],
    date: "2025-03-01",
    link: "https://www.linkedin.com/in/pierre-kasparian-486101259/",
  },
  {
    slug: "medee-ml",
    title: {
      fr: "Classification ML d'entreprises - Médée",
      en: "ML business classification - Médée",
    },
    description: {
      fr: "Modèle de classification d'entreprises (photographie / cuisine) avec plus de 90 % de précision, pour une multinationale.",
      en: "Business classification model (photography / food) with 90%+ accuracy, for a multinational client.",
    },
    descriptionLong: {
      fr: "Mission de machine learning pour Médée : concevoir un modèle de classification automatique d'entreprises dans deux secteurs (photographie ou cuisine) pour une multinationale. L'objectif était ensuite d'exploiter ce modèle pour identifier des zones géographiques dépourvues de points de vente dans ces catégories, dans le cadre d'études de marché.\n\n1. Collecte des données : enrichissement des données d'entreprises via les métadonnées de leurs sites web (contenu textuel, titres, descriptions), APIs tierces (Google Maps, avis utilisateurs), et analyse d'images via des modèles de langage pour générer des descriptions contextuelles.\n\n2. Préparation des données : nettoyage, suppression des entreprises avec un volume d'information insuffisant, vectorisation des données textuelles via des embeddings Mistral.\n\n3. Modélisation : test de plusieurs classifieurs supervisés (SVM, Random Forest) sur les embeddings, avec des performances dépassant 90 % de précision et un faible taux de faux positifs.",
      en: "Machine learning mission for Médée: design an automatic business classification model for two sectors (photography or food) for a multinational client. The model was then used to identify geographic areas lacking relevant points of sale, supporting market analysis.\n\n1. Data collection: business data enrichment via website metadata (text content, titles, descriptions), third-party APIs (Google Maps, user reviews), and image analysis via LLMs to generate contextual descriptions.\n\n2. Data preparation: cleaning, filtering out entries with insufficient information, vectorisation of text data using Mistral embeddings.\n\n3. Modelling: testing multiple supervised classifiers (SVM, Random Forest) on embeddings, achieving 90%+ accuracy with a low false-positive rate.",
    },
    imagePrincipale: "",
    images: [],
    date: "2024-09-01",
    link: "https://www.linkedin.com/in/pierre-kasparian-486101259/",
  },
  {
    slug: "podcastify",
    title: {
      fr: "Podcastify - Générateur de podcasts IA",
      en: "Podcastify - AI Podcast Generator",
    },
    description: {
      fr: "SaaS qui transforme articles, PDFs et notes en épisodes podcast à deux voix en moins de 2 minutes.",
      en: "SaaS that turns blog posts, PDFs and notes into two-host podcast episodes in under 2 minutes.",
    },
    descriptionLong: {
      fr: "Podcastify génère automatiquement des épisodes de podcast à deux voix à partir de n'importe quel contenu : articles de blog, PDFs, notes. L'utilisateur précise son angle et le ton souhaité, révise la transcription, puis lance la génération audio. Pensé pour les étudiants qui veulent apprendre en déplacement, les créateurs souhaitant recycler du contenu ou toute personne cherchant à gagner du temps sur la lecture.\n\nStack technique : frontend Next.js avec paiement Stripe, analytics PostHog, base de données Supabase. Le backend Python tourne sur un VPS avec une architecture worker/API découplée via Redis. Celery Beat gère les relances email automatisées vers les utilisateurs n'ayant pas encore activé leur essai gratuit.\n\nMarketing : Google Ads, Reddit, et surtout une stratégie SEO/GEO pour capter un trafic organique qualifié. Le projet génère du MRR.",
      en: "Podcastify automatically generates two-host podcast episodes from any content: blog posts, PDFs, notes. Users set their focus and tone, review the transcript, then generate the audio. Built for students who want to learn during their commute, content creators repurposing content, or anyone looking to save time on reading.\n\nTech stack: Next.js frontend with Stripe payments, PostHog analytics, Supabase database. The Python backend runs on a VPS with a decoupled worker/API architecture communicating over Redis. Celery Beat handles automated email retargeting for users who have not triggered their free trial yet.\n\nMarketing: Google Ads, Reddit, and above all an SEO/GEO strategy to capture qualified organic traffic. The project generates MRR.",
    },
    imagePrincipale: "/icon.png",
    images: ["/Capture d’écran du 2026-05-07 09-51-35.png"],
    date: "2025-01-01",
    link: "https://podcastify.io/",
    mrrLink: "https://trustmrr.com/startup/podcastify",
    featured: true,
  },
  {
    slug: "site-de-reportages-photos",
    title: {
      fr: "Site pour photographe professionnel",
      en: "Website for professional photographer",
    },
    description: {
      fr: "Site vitrine pour reportages photographiques.",
      en: "Showcase website for photography reportages.",
    },
    descriptionLong: {
      fr: "Ce site présente une collection de reportages réalisés par le photographe, une galerie de photos à vendre et une newsletter pour notifier les utilisateurs des nouveaux reportages. Une partie réservée au photographe permet de publier et gérer ses reportages.",
      en: "This website features a collection of reportages created by the photographer, a gallery of photos available for purchase, and a newsletter for users to get notified when new reportages are released. Additionally, there's a dedicated section for the photographer, with a login page, where he can easily upload and manage his own reportages.",
    },
    imagePrincipale: "/landing_site_photo.jpg",
    images: ["/reportage.jpg", "/tirages_en_vente.jpg"],
    date: "2024-01-01",
    link: "https://kasparian-reportages-photo.kasparian-reportages-photo.workers.dev/",
  },
  {
    slug: "algorithme-jouant-aux-echecs",
    title: {
      fr: "Algorithme jouant aux échecs",
      en: "Algorithm playing chess",
    },
    description: {
      fr: "Développement collaboratif d'un script Python qui joue aux échecs.",
      en: "Collaborative development of a Python script that plays chess.",
    },
    descriptionLong: {
      fr: "Cet algorithme, appelé minimax, analyse les meilleurs coups possibles et leur attribue un score. Un échec et mat reçoit le score maximal. Il évalue en parallèle les meilleurs coups futurs de l'adversaire et soustrait le score selon ses gains potentiels, sur trois coups d'avance. Il maximise la valeur des pièces gagnées et minimise celles perdues.",
      en: "This algorithm, called minimax, analyzes all the best possible moves and ranks them with a score. A checkmate is assigned the highest possible score. At the same time, it evaluates the opponent's future best possible moves and subtracts the score based on the opponent's potential gains. The algorithm then selects the move that results in the highest score after considering both players' best options, looking ahead three moves in advance.",
    },
    imagePrincipale: "/landing_echec.png",
    images: ["/min_max.png"],
    date: "2024-01-01",
    link: "https://github.com/Pierre918/IAchess",
    featured: true,
  },
  {
    slug: "appli-aide-devoirs",
    title: {
      fr: "Application d'aide aux devoirs en maths",
      en: "Homework Helper for Math",
    },
    description: {
      fr: "Application d'aide aux devoirs pour collégiens utilisant l'IA.",
      en: "Application to help middle school students on their homework using AI.",
    },
    descriptionLong: {
      fr: "J'ai développé une application Flutter qui intègre GPT-4 avec des prompts et paramètres optimisés pour générer des conseils utiles à partir d'une photo d'exercice. Contrairement à beaucoup d'apps du marché, l'objectif n'était pas de donner la réponse mais de guider l'élève vers une résolution autonome. Testée avec des élèves, améliorée grâce à leurs retours, puis présentée à un concours d'entrepreneuriat où elle a été primée.",
      en: "I built a Flutter app integrating GPT-4 with optimised prompts and parameters to generate helpful advice for solving exercises from a picture. Unlike many other apps, my goal was not to provide the answer but to guide students toward solving the problem on their own. I tested with several students, iterated on feedback, and won an entrepreneurship prize for the work.",
    },
    imagePrincipale: "/dee.jpg",
    images: [
      "/land_app_indice - Copie.png",
      "/vlcsnap-2024-10-09-13h41m32s337 - Copie.png",
    ],
    date: "2024-01-01",
    link: "https://www.linkedin.com/posts/pierre-kasparian-486101259_et-si-on-appliquait-lia-%C3%A0-l%C3%A9ducation-activity-7202609841444401152-v__9",
    awardLink:
      "https://www.utt.fr/actualites/defi-etudiants-entrepreneurs-prix-coup-de-coeur-pour-pierre-kasparian",
    featured: true,
  },
  {
    slug: "java-pocket-imperium",
    title: {
      fr: "Projet Java - Pocket Imperium",
      en: "Java project - Pocket Imperium",
    },
    description: {
      fr: "Jeu de plateau stratégique en Java avec modélisation UML.",
      en: "Strategic board game in Java, with UML modelling and OOP design.",
    },
    descriptionLong: {
      fr: "Conception et développement d'une version Java du jeu de plateau Pocket Imperium. Trois joueurs supportés, dont des IA aux stratégies paramétrables. Projet structuré en deux phases : modélisation initiale et développement du jeu (CLI puis interface graphique). Focus sur modularité, extensibilité et patterns de conception.",
      en: "Design and development of a Java version of the board game Pocket Imperium. Supports three players including configurable virtual players. Structured in two phases: initial modelling, then development with CLI or GUI. Focus on modularity, extensibility and design patterns.",
    },
    imagePrincipale: "/java_project.PNG",
    images: ["/fenetre_java.PNG"],
    date: "",
    link: "https://github.com/Pierre918/Pocket_Imperium",
  },
  {
    slug: "stock-price-prediction",
    title: {
      fr: "Prédiction de cours boursiers par régression linéaire",
      en: "Stock Price Prediction with Linear Regression",
    },
    description: {
      fr: "Modèle prédictif basé sur la régression linéaire pour prévoir les cours.",
      en: "Predictive model using Linear Regression to forecast stock prices.",
    },
    descriptionLong: {
      fr: "Modèle de régression linéaire pour prévoir les cours boursiers à partir de données historiques (open, high, low, volume, moyennes mobiles 5/365j). Entraînement jusqu'à 2013, test au-delà. Étapes clés : preprocessing, feature engineering, entraînement, évaluation MAE/MAPE. Interface Gradio interactive. Étude de corrélations et features dérivées (écart-type, moyenne de clôture 5j) pour améliorer la robustesse.",
      en: "Linear Regression model to forecast stock prices from historical data (open, high, low, volume, 5/365-day moving averages). Trained up to 2013, tested beyond. Steps: preprocessing, feature engineering, training, MAE/MAPE evaluation. Interactive Gradio UI. Correlation studies and engineered features (5-day std and mean close) improved accuracy.",
    },
    imagePrincipale: "/stock_prediction_project.jpg",
    images: ["/correlation.png"],
    date: "2023-10-01",
    link: "https://github.com/Pierre918",
  },
];
