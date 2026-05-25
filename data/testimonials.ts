import type { LocalizedString } from "./projects";

export interface Testimonial {
  name: string;
  role: LocalizedString;
  text: LocalizedString;
  date: LocalizedString;
}

export const testimonials: Testimonial[] = [
  {
    name: "Charles Reizine",
    role: {
      fr: "Head of Data Analytics & AI, Pretto",
      en: "Head of Data Analytics & AI, Pretto",
    },
    text: {
      fr: "A la suite de son stage nous avons continué à travailler avec Pierre en freelance alors qu'il continuait ses études en parallèle. Il est travailleur, efficace, précis et fiable. Merci encore Pierre pour tout le super boulot et à très vite :)",
      en: "Following his internship, we continued working with Pierre as a freelancer while he pursued his studies in parallel. He is hardworking, efficient, precise and reliable. Thank you again Pierre for all the great work, see you very soon :)",
    },
    date: {
      fr: "Février 2026",
      en: "February 2026",
    },
  },
  {
    name: "Laurent Janolin",
    role: {
      fr: "Fondateur, Live Session & Ningia",
      en: "Founder, Live Session & Ningia",
    },
    text: {
      fr: "Pierre a su développer une solution conforme à notre cahier des charges, en répondant concrètement et efficacement à nos besoins. Toujours à l'écoute, fiable et impliqué, il a travaillé en bonne collaboration avec notre équipe tout au long du projet. Son professionnalisme, ainsi que l'appui de l'équipe Ailog, ont clairement contribué à la réussite de cette mission.",
      en: "Pierre developed a solution that met our specifications, responding concretely and effectively to our needs. Always attentive, reliable and committed, he worked in close collaboration with our team throughout the project. His professionalism, as well as the support of the Ailog team, clearly contributed to the success of this mission.",
    },
    date: {
      fr: "Février 2026",
      en: "February 2026",
    },
  },
  {
    name: "Baptiste Morel",
    role: {
      fr: "Consultant sénior, mc2i",
      en: "Senior Consultant, mc2i",
    },
    text: {
      fr: "Pierre a réalisé une mission de développement d'une application web. Il a su avancer régulièrement, faire des présentations claires. Pierre a su se mettre à la place du client pour comprendre son besoin. Les relations de travail avec Pierre sont très agréables !",
      en: "Pierre completed a web application development assignment. He made steady progress and delivered clear presentations. He put himself in the client's shoes to understand their needs. Working with Pierre is very pleasant!",
    },
    date: {
      fr: "Août 2025",
      en: "August 2025",
    },
  },
];
