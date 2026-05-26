import { type LocalizedString } from "./projects";

export interface Education {
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  descriptionLong: LocalizedString;
  imagePrincipale: string;
  images: string[];
  date: string;
  link: string;
}

export const educations: Education[] = [
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
      fr: "Programme intensif de 8 semaines mené par Ed Donner pour maîtriser l'IA générative et les LLM. J'ai construit des produits IA avancés avec plus de 20 modèles (frontier et open source), pris en main HuggingFace, LangChain, Gradio, implémenté du RAG, du fine-tuning QLoRA et des agents. Projets : assistant client multimodal, knowledge worker, optimiseur Python vers C++ avec gains x60 000, prédiction de prix produits, etc.",
      en: "An intensive 8-week program with Ed Donner to master Generative AI and LLMs. I built advanced AI products with 20+ frontier and open-source models, used HuggingFace, LangChain and Gradio, and implemented RAG, QLoRA fine-tuning and agents. Projects included a multimodal customer support assistant, a knowledge worker, a Python-to-C++ optimiser (60,000x speedups), and product price prediction.",
    },
    imagePrincipale: "/UC-caea9e61-4e16-4d7c-bdee-6b2dcb7d4182.jpg",
    images: [],
    date: "2025-01-01",
    link: "https://www.udemy.com/course/llm-engineering-master-ai-and-large-language-models/",
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
    date: "2025-03-01",
    link: "https://www.udemy.com/course/formation-machine-learning-python/",
  },
];
