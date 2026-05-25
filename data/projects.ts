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
  featured?: boolean;
}

export const projects: Project[] = [
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
    featured: true,
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
    images: ["/land_app_indice - Copie.png","/vlcsnap-2024-10-09-13h41m32s337 - Copie.png" ],
    date: "2024-01-01",
    link: "https://www.linkedin.com/posts/pierre-kasparian-486101259_et-si-on-appliquait-lia-%C3%A0-l%C3%A9ducation-activity-7202609841444401152-v__9",
    featured: true,
  },
  {
    slug: "LLM-course",
    title: {
      fr: "Formation LLM engineering",
      en: "LLM engineering course",
    },
    description: {
      fr: "Programme intensif de 8 semaines pour maîtriser l'ingénierie LLM.",
      en: "An 8-week hands-on journey to master LLM engineering.",
    },
    descriptionLong: {
      fr: "Programme intensif de 8 semaines mené par Ed Donner pour maîtriser l'IA générative et les LLM. J'ai construit des produits IA avancés avec plus de 20 modèles (frontier et open source), pris en main HuggingFace, LangChain, Gradio, implémenté du RAG, du fine-tuning QLoRA et des agents. Projets : assistant client multimodal, knowledge worker, optimiseur Python→C++ avec gains x60 000, prédiction de prix produits, etc.",
      en: "An intensive 8-week program with Ed Donner to master Generative AI and LLMs. I built advanced AI products with 20+ frontier and open-source models, used HuggingFace, LangChain and Gradio, and implemented RAG, QLoRA fine-tuning and agents. Projects included a multimodal customer support assistant, a knowledge worker, a Python-to-C++ optimiser (60,000× speedups), and product price prediction.",
    },
    imagePrincipale: "/UC-caea9e61-4e16-4d7c-bdee-6b2dcb7d4182.jpg",
    images: [],
    date: "",
    link: "https://www.udemy.com/course/llm-engineering-master-ai-and-large-language-models/",
  },
  {
    slug: "java-pocket-imperium",
    title: {
      fr: "Projet Java — Pocket Imperium",
      en: "Java project — Pocket Imperium",
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
    slug: "machine-learning-course",
    title: {
      fr: "Formation Machine Learning & Data Science",
      en: "Machine Learning and Data Science course",
    },
    description: {
      fr: "Maîtrise des bases du ML et construction de modèles prédictifs en Python.",
      en: "Master ML fundamentals and build predictive models in Python.",
    },
    descriptionLong: {
      fr: "Fondations solides en machine learning : création, optimisation et déploiement de modèles prédictifs avec Python et scikit-learn. Algorithmes couverts : k-NN, régression linéaire, régression logistique, K-means. Évaluation par métriques d'erreur, validation croisée, optimisation des hyperparamètres.",
      en: "Solid ML foundations: building, optimising and deploying predictive models with Python and scikit-learn. Algorithms covered: k-NN, linear regression, logistic regression, K-means. Error metrics, cross-validation, hyperparameter tuning.",
    },
    imagePrincipale: "/UC-179b934b-2733-42c0-8acd-c8a53e03bf76.jpg",
    images: [],
    date: "",
    link: "https://www.udemy.com/course/formation-machine-learning-python/",
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
