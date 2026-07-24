export type BoardMember = {
  id: string;
  name: string;
  organization: string;
  designation: string;
  imageUrl: string;
  summary: string;
  details: string[];
};

export const boardMembers: BoardMember[] = [
  {
    id: "board-member-1",
    name: "Dr. Sharad Kumar Sachan",
    organization: "IIT Kanpur",
    designation: "Marie Sklodowska-Curie Postdoctoral Fellow",
    imageUrl: "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1784914047/DSC_0548_pamb1u.jpg",
    summary:
      "A Ph.D. graduate in Chemistry from IIT Kanpur with deep research expertise in multifunctional metal-organic frameworks, catalysis, sensing, and environmental applications.",
    details: [
      "Dr. Sharad Kumar Sachan is a Marie Sklodowska-Curie Postdoctoral Fellow and a Ph.D. graduate in Chemistry from IIT Kanpur. His doctoral research focused on the synthesis of multifunctional metal-organic frameworks (MOFs) with applications in gas adsorption, catalysis, sensing, and water harvesting.",
      "He has extensive research experience in MOFs, palladium complexes, and environmental remediation, with 10+ international publications in reputed journals including Inorganic Chemistry and European Journal of Inorganic Chemistry.",
      "He has presented his research at leading global conferences including IUCr and AsCA across South Korea, New Zealand, and India.",
      "His recognitions include multiple awards and fellowships such as the IUCr Young Scientist Award and CSIR fellowships.",
      "He is skilled in advanced scientific techniques including XRD, SEM, TEM, NMR, GC-MS, Raman spectroscopy, and electrochemistry, and is proficient with scientific software including APEX-4, Olex2, MATLAB, and Gaussian 09W.",
    ],
  },
  {
    id: "board-member-2",
    name: "Mr. Ateequr Rahman",
    organization: "Educational Institutions and Non-Profit Organizations",
    designation: "Financial Consultant",
    imageUrl: "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1784914047/arahman_lotb3w.jpg",
    summary:
      "An accomplished financial consultant with 20+ years of experience in finance management, budgeting, strategic planning, and operational growth.",
    details: [
      "Mr. Ateequr Rahman is an accomplished financial consultant with expertise in educational institutions and non-profit organizations. With over 20 years of experience in finance management, he provides valuable insights into budgeting, strategic planning, and operational growth.",
      "He has served as Finance Director at multiple reputed educational institutions and brings strong experience in financial governance for education-focused organizations.",
      "He specializes in fund utilization, compliance, and reporting frameworks, helping organizations build transparent and accountable financial systems.",
      "He advises on streamlining financial systems, improving cost-efficiency, and strengthening long-term operational planning.",
      "He regularly mentors young finance professionals, contributes to financial literacy drives, and supports transparent, sustainable financial governance models.",
    ],
  },
  {
    id: "board-member-3",
    name: "Adv. Kapil Deep Sachan",
    organization: "Ex. GENERAL SECRETARY, Kanpur Bar Association",
    designation: "Legal Advisor",
    imageUrl: "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1784914047/131363308_1038256193247142_3524938107427119216_n_ic7raq.jpg",
    summary:
      "A respected legal advisor with 20+ years of experience across civil, criminal, and constitutional law, known for leadership in the Kanpur legal fraternity.",
    details: [
      "Adv. Kapil Deep Sachan has served as the General Secretary of the Kanpur Bar Association, bringing remarkable contributions to the legal fraternity through his leadership and advocacy.",
      "He is known for his deep understanding of legal frameworks and his commitment to upholding justice.",
      "He has over 20 years of experience in civil, criminal, and constitutional law.",
      "As the former General Secretary of the Kanpur Bar Association, he is known for implementing reform-oriented initiatives.",
      "He is actively involved in legal awareness campaigns and pro bono work for underprivileged communities.",
    ],
  },
];
