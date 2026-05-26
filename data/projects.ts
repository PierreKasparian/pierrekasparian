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
  link?: string;
  awardLink?: string;
  mrrLink?: string;
  relatedProjectSlug?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: "pretto-langfuse",
    title: {
      fr: "Plateforme d'évaluation de prompts - Pretto",
      en: "Prompt Evaluation Platform - Pretto",
    },
    description: {
      fr: "Plateforme d'évaluation de prompts via Langfuse permettant de comparer des versions de prompts sur des datasets métiers annotés.",
      en: "Langfuse-based prompt evaluation platform to benchmark prompt versions against annotated business datasets.",
    },
    descriptionLong: {
      fr: "Développement d'une plateforme d'évaluation des prompts pour les équipes IA de Pretto, en utilisant Langfuse comme moteur d'observabilité.\n\nÀ partir de datasets annotés (inputs et sorties attendues), la plateforme permettait de lancer des évaluations automatisées sur plusieurs versions d'un même prompt et de visualiser les résultats comparatifs.\n\nExemple d'application concret : un chatbot client capable d'appeler des outils métiers (réservation de créneaux, requêtes de données). Les datasets contenaient des cas d'usage réels et les comportements attendus pour chaque situation, permettant d'évaluer objectivement la qualité et la robustesse de chaque version du prompt.\n\nRésultat : une boucle d'itération rapide sur les prompts, fiabilisée et partageable entre les équipes techniques et métier.",
      en: "Development of a prompt evaluation platform for Pretto's AI teams, using Langfuse as the observability engine.\n\nFrom annotated datasets (inputs and expected outputs), the platform ran automated evaluations across multiple versions of the same prompt and displayed comparative results.\n\nPractical example: a customer chatbot capable of calling business tools (slot booking, data queries). Datasets contained real use cases and expected behaviours for each scenario, enabling objective quality and robustness scoring for each prompt version.\n\nResult: a fast, reliable, team-shareable prompt iteration loop.",
    },
    imagePrincipale: "",
    images: [],
    date: "2025-08-01",
    featured: false,
  },
  {
    slug: "pretto-prompt-pipeline",
    title: {
      fr: "Pipeline d'auto-amélioration de prompt - Pretto",
      en: "Prompt Auto-improvement Pipeline - Pretto",
    },
    description: {
      fr: "Pipeline IA qui synthétise automatiquement les faiblesses d'un prompt à partir des mauvais résultats, puis le réécrit.",
      en: "AI pipeline that automatically identifies prompt weaknesses from bad outputs, then rewrites the prompt.",
    },
    descriptionLong: {
      fr: "En s'appuyant sur la plateforme d'évaluation de prompts développée en parallèle, ce pipeline automatise le cycle d'amélioration des prompts.\n\nFonctionnement en deux étapes :\n1. Un premier LLM analyse les sorties incorrectes ou sous-optimales détectées lors des évaluations et synthétise les points faibles structurels du prompt.\n2. Un second LLM prend en entrée le prompt original et le rapport de faiblesses pour générer une version améliorée.\n\nCe pipeline a été conçu pour s'intégrer directement dans le workflow d'évaluation Langfuse, permettant aux équipes de déclencher une amélioration automatique en un clic.",
      en: "Building on the prompt evaluation platform developed in parallel, this pipeline automates the prompt improvement cycle.\n\nTwo-step process:\n1. A first LLM analyses incorrect or suboptimal outputs flagged during evaluations and synthesises the structural weaknesses of the current prompt.\n2. A second LLM takes the original prompt and the weakness report as input to generate an improved version.\n\nThe pipeline was designed to integrate directly into the Langfuse evaluation workflow, letting teams trigger an automatic improvement with one click.",
    },
    imagePrincipale: "",
    images: [],
    date: "2025-09-01",
    featured: false,
    relatedProjectSlug: "pretto-langfuse",
  },
  {
    slug: "pretto-batch-inference",
    title: {
      fr: "Service d'inférence batch - Pretto",
      en: "Batch Inference Service - Pretto",
    },
    description: {
      fr: "Service d'inférence batch unifié supportant +3 000 inputs lourds vers tous les fournisseurs LLM.",
      en: "Unified batch inference service handling 3,000+ heavy inputs across all major LLM providers.",
    },
    descriptionLong: {
      fr: "Conception et développement d'un service d'inférence batch centralisé pour unifier les appels vers tous les fournisseurs de LLM (OpenAI, Anthropic, Mistral, Google...).\n\nContraintes techniques majeures : gestion de volumes élevés (plus de 3 000 inputs par batch), traitement de documents lourds, et implémentations de tests unitaires.\n\nFonctionnalités clés : abstraction unifiée des APIs fournisseurs et monitoring des coûts.\n\nCe service a ensuite été utilisé comme infrastructure de base pour d'autres projets IA au sein de Pretto.",
      en: "Design and development of a centralised batch inference service to unify LLM provider calls (OpenAI, Anthropic, Mistral, Google...).\n\nKey technical constraints: handling high volumes (3,000+ inputs per batch), processing heavy documents, unitaries tests.\n\nKey features: unified provider API abstraction and cost monitoring.\n\nThis service was subsequently used as the base infrastructure for other AI projects within Pretto.",
    },
    imagePrincipale: "",
    images: [],
    date: "2025-12-01",
    featured: false,
  },
  {
    slug: "pretto-email-pipeline",
    title: {
      fr: "Pipeline de traitement d'emails - Pretto",
      en: "Email Processing Pipeline - Pretto",
    },
    description: {
      fr: "Pipeline ETL de traitement automatisé des emails courtiers-banquiers pour extraire les évolutions de taux immobiliers via LLM.",
      en: "ETL pipeline for automated broker-banker email processing to extract mortgage rate changes via LLM.",
    },
    descriptionLong: {
      fr: "Développement d'un pipeline de traitement automatique des emails échangés entre les courtiers immobiliers et les banquiers.\n\nObjectif final : extraire automatiquement des informations métiers clés (notamment les évolutions de taux) à partir de ces emails, en utilisant un LLM comme moteur d'analyse.\n\nLe pipeline se décompose en plusieurs étapes :\n1. Formatage de l'entrée LLM : nettoyage et structuration du contenu brut des emails.\n2. Filtrage des images : détection et exclusion automatique des logos envoyés en pièce jointe, inutiles pour l'analyse.\n3. Enrichissement : agrégation avec des données internes existantes dans l'entreprise avant l'envoi au LLM.\n4. Inférence : utilisation du service de batch développé précédemment pour traiter les volumes en production.",
      en: "Development of an automated pipeline to process emails exchanged between mortgage brokers and bank representatives.\n\nEnd goal: automatically extract key business information (particularly rate changes) from these emails using an LLM as the analysis engine.\n\nThe pipeline consists of several steps:\n1. LLM input formatting: cleaning and structuring raw email content.\n2. Image filtering: automatic detection and exclusion of logo attachments, irrelevant to the analysis.\n3. Enrichment: aggregation with existing internal company data before sending to the LLM.\n4. Inference: use of the previously built batch service to handle production volumes.",
    },
    imagePrincipale: "",
    images: [],
    date: "2026-01-01",
    relatedProjectSlug: "pretto-batch-inference",
    featured: true,
  },
  {
    slug: "pretto-llm-platform",
    title: {
      fr: "Fiabilisation de la plateforme LLM - Pretto",
      en: "LLM Platform Reliability - Pretto",
    },
    description: {
      fr: "Refactorisation et fiabilisation de la plateforme LLM existante de Pretto, résolvant les problèmes de surcharge des workers.",
      en: "Refactoring and hardening of Pretto's existing LLM platform, resolving worker overload issues.",
    },
    descriptionLong: {
      fr: "Diagnostic et refactorisation de la plateforme LLM interne de Pretto, existante avant mon arrivée et présentant des problèmes récurrents de stabilité.\n\nConstat initial : des workers surchargés provoquaient des dégradations de service régulières. L'analyse du code a révélé des traitements inutiles et des inefficacités architecturales qui consommaient les ressources sans valeur ajoutée.\n\nTravail réalisé :\n- Audit complet du code existant et identification des causes racines.\n- Refactorisation ciblée pour éliminer les traitements superflus.\n- Amélioration de l'uptime et de la résilience globale de la plateforme.",
      en: "Diagnosis and refactoring of Pretto's internal LLM platform, which predated my arrival and was experiencing recurring stability issues.\n\nInitial finding: overloaded workers were causing regular service degradation. Code analysis revealed unnecessary processing and architectural inefficiencies consuming resources without added value.\n\nWork done:\n- Full audit of the existing codebase and root cause identification.\n- Targeted refactoring to eliminate redundant processing.\n- Improved uptime and overall platform resilience.",
    },
    imagePrincipale: "",
    images: [],
    date: "2026-02-01",
  },
  {
    slug: "ailog-rag",
    title: {
      fr: "Chatbot RAG multi-clients - LiveSession",
      en: "Multi-tenant RAG chatbot - LiveSession",
    },
    description: {
      fr: "Solution RAG multi-clients en production : isolation des données, 95 % de pertinence, réponses en moins de 5 secondes.",
      en: "Multi-tenant RAG solution in production: data isolation, 95% relevance, responses in under 5 seconds.",
    },
    descriptionLong: {
      fr: "Développement et mise en production d'une solution RAG (Retrieval-Augmented Generation) multi-clients pour LiveSession via Ailog.\n\nChaque client peut indexer ses propres documents (PDF, Word, TXT, y compris OCR sur PDF image) et interroger son corpus via un chatbot dédié, créer et gérer plusieurs chatbots par organisation avec héritage des documents existants, et bénéficier d'une isolation stricte des données entre clients et entre sessions.\n\nFonctionnalités clés : API centralisée pour la gestion des utilisateurs, documents et chatbots. Optimisation des requêtes : reformulation automatique et sélection dynamique du modèle LLM (Mistral Small/Medium/Large) selon la complexité et la charge. Gestion fine des ressources : dépassement des rate limits, budgets par utilisateur/avatar, monitoring des coûts et alertes via webhooks. Snapshots journaliers des bases vectorielles, plan de reprise, conformité RGPD. Mise en cache des requêtes, architecture asynchrone.\n\nMise en production avec tests unitaires et stress tests (700 utilisateurs virtuels simultanés), monitoring Grafana, alerting.\n\nRésultats : réponses en moins de 5 secondes en moyenne, 95 % de pertinence sur les recherches internes, 0 fuite de données entre clients en production, solution déployée sur VPS OVH (conformité RGPD).",
      en: "Development and production deployment of a multi-tenant RAG (Retrieval-Augmented Generation) solution for Ailog.\n\nEach client can index their own documents (PDF, Word, TXT, including OCR on image PDFs) and query their corpus via a dedicated chatbot, create and manage multiple chatbots per organisation with document inheritance, and benefit from strict data isolation between clients and sessions.\n\nKey features: centralised API for managing users, documents and chatbots. Query optimisation: automatic reformulation and dynamic LLM model selection (Mistral Small/Medium/Large) based on complexity and load. Fine-grained resource management: rate limit handling, per-user/avatar budgets, cost monitoring and webhook alerts. Daily vector database snapshots, recovery plan, GDPR compliance. Query caching, async architecture.\n\nLaunched with unit tests and stress tests (700 concurrent virtual users), Grafana monitoring, alerting.\n\nResults: responses in under 5 seconds on average, 95% relevance on internal searches, 0 data leaks between clients in production, deployed on OVH VPS (GDPR compliant).",
    },
    imagePrincipale: "",
    images: [],
    date: "2025-07-01",
    featured: true,
  },
  {
    slug: "livesession-formation",
    title: {
      fr: "Formation RAG - LiveSession",
      en: "RAG Training - LiveSession",
    },
    description: {
      fr: "Formation en 4 parties de l'équipe LiveSession sur leur RAG custom : fondamentaux, implémentation, limites et autonomie opérationnelle.",
      en: "4-part RAG training programme for the LiveSession team: fundamentals, custom implementation, limitations and full operational autonomy.",
    },
    descriptionLong: {
      fr: "Suite au développement du chatbot RAG multi-clients pour LiveSession, j'ai conçu et animé une formation complète en 4 parties pour permettre à l'équipe de maîtriser et maintenir le produit en toute autonomie.\n\nPartie 1 - Les fondamentaux du RAG\n\nComment fonctionnent les embeddings, le processus d'indexation et de retrieval, les différents types de RAG existants. Objectif : que l'équipe comprenne la technologie.\n\nPartie 2 - L'implémentation custom\n\nLa reformulation intelligente des questions utilisateurs, l'OCRisation automatique des PDFs, la gestion avancée des tableaux. Objectif : que l'équipe maîtrise parfaitement son propre produit.\n\nPartie 3 - Les limites du système\n\nPour quels types de questions le RAG ne fonctionne pas, sur quels documents il trouve ses limites, et les premiers soins en cas de défaillance. Objectif : que l'équipe sache réagir.\n\nPartie 4 - Atelier pratique\n\nRestauration de la base de données vectorielle, dashboard Grafana, scaling prévisionnel, veille technologique. Objectif : l'autonomie maximale.\n\nAujourd'hui, LiveSession maîtrise son produit et n'a plus besoin d'intervention externe pour la plupart des opérations.",
      en: "Following the development of the multi-tenant RAG chatbot for LiveSession, I designed and delivered a comprehensive 4-part training programme to enable the team to fully master and maintain the product independently.\n\nPart 1 - RAG Fundamentals\n\nHow embeddings work, the indexation and retrieval process, the different types of RAG systems. Goal: team understands the technology.\n\nPart 2 - The Custom Implementation\n\nIntelligent user question reformulation, automatic PDF OCR, advanced table handling. Goal: team has complete command of their own product.\n\nPart 3 - System Limitations\nWhich question types the RAG handles poorly, which document types reach its limits, and first-aid steps when things break. Goal: team knows how to react.\n\nPart 4 - Hands-on Workshop\n\nVector database restoration, Grafana dashboard, predictive scaling, technology watch. Goal: maximum operational autonomy.\n\nToday, LiveSession has full command of its product and no longer needs external intervention for most operations.",
    },
    imagePrincipale: "/1770760454711.jpeg",
    images: ["/Capture d'écran du 2026-05-26 16-40-46.png"],
    date: "2025-08-01",
    relatedProjectSlug: "ailog-rag",
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
    link: "https://securite-solaire.vercel.app/",
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
      fr: "Participation au développement en équipe du site Doddee via l'intermédiaire Médée, avec un focus sur l'amélioration de l'expérience utilisateur et la structure fonctionnelle du site.\n\nObjectifs : optimisation de l'UI/UX pour rendre la navigation plus intuitive et cohérente, refonte partielle de l'arborescence pour mieux organiser les contenus et guider l'utilisateur, renforcement du contrôle des accès utilisateurs.\n\nMéthodologie : entretiens réguliers avec la fondatrice pour comprendre les besoins, collaboration en équipe pour optimiser les délais de livraison.",
      en: "Team development work on the Doddee website for Médée, with a focus on improving user experience and the site's functional structure.\n\nObjectives: UI/UX optimisation for more intuitive, consistent navigation; partial information architecture rework to better organise content and guide users; strengthened user access controls.\n\nMethodology: regular interviews with the founder to understand requirements; team collaboration to meet delivery deadlines.",
    },
    imagePrincipale: "",
    images: [],
    date: "2025-03-01",
    link: "https://doddee.fr/",
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
    featured: true,
    date: "2024-09-01",
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
    images: ["/Capture d'écran du 2026-05-07 09-51-35.png"],
    date: "2026-01-01",
    link: "https://podcastify.io/",
    mrrLink: "https://trustmrr.com/startup/podcastify",
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
    date: "2023-01-01",
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
    date: "2023-02-01",
    link: "https://github.com/Pierre918/IAchess",
    featured: false,
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
    featured: false,
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
    date: "2024-01-01",
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
    date: "2025-01-01",
  },
];
