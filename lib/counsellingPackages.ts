export type CounsellingPackage = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  baseAmount: number;
  highlight?: boolean;
  image?: string;
  defaultCourse: string;
  inclusions: string[];
  validity: string;
};

export const GST_RATE = 0.18;

export const COURSE_OPTIONS = [
  "MBBS",
  "BDS",
  "BAMS",
  "BHMS",
  "BUMS",
  "BSc Nursing",
  "Veterinary",
  "BPT",
  "JEE / Engineering",
  "Other",
] as const;

export const COUNSELLING_PACKAGES: CounsellingPackage[] = [
  {
    id: "ayush-counselling",
    title: "Ayush Counselling",
    subtitle: "Govt + Private Colleges",
    description: "Counselling support for AYUSH admission pathways.",
    baseAmount: 25000,
    defaultCourse: "BAMS",
    image:
      "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1775547635/ayush_lqnzhn.webp",
    inclusions: [
      "Counselling guidance",
      "Counselling registration guidance",
      "College selection assistance",
      "Choice filling support",
      "Round-wise counselling support",
      "Documentation guidance",
      "Seat allotment guidance",
      "Admission process assistance",
    ],
    validity:
      "Valid for the applicable counselling session/cycle and counselling rounds covered under the selected package.",
  },
  {
    id: "mbbs-govt-counselling",
    title: "MBBS Counselling",
    subtitle: "Government College",
    description: "Complete admission support",
    baseAmount: 30000,
    highlight: true,
    defaultCourse: "MBBS",
    image:
      "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1775547636/mbbs_govt_jfwmon.webp",
    inclusions: [
      "Counselling guidance",
      "Counselling registration guidance",
      "College selection assistance",
      "Choice filling support",
      "Round-wise counselling support",
      "Documentation guidance",
      "Seat allotment guidance",
      "Admission process assistance",
    ],
    validity:
      "Valid for the applicable counselling session/cycle and counselling rounds covered under the selected package.",
  },
  {
    id: "mbbs-private-counselling",
    title: "MBBS Counselling",
    subtitle: "Private College",
    description: "Complete admission support",
    baseAmount: 50000,
    defaultCourse: "MBBS",
    image:
      "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1775547637/mbbs_private_xlx12n.webp",
    inclusions: [
      "Counselling guidance",
      "Counselling registration guidance",
      "College selection assistance",
      "Choice filling support",
      "Round-wise counselling support",
      "Documentation guidance",
      "Seat allotment guidance",
      "Admission process assistance",
    ],
    validity:
      "Valid for the applicable counselling session/cycle and counselling rounds covered under the selected package.",
  },
  {
    id: "allied-medical-counselling",
    title: "BDS / BSc Nursing / Veterinary / BPT",
    subtitle: "Allied Medical Courses",
    description: "All-inclusive counselling support",
    baseAmount: 20000,
    defaultCourse: "BDS",
    image:
      "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1775547636/bds_sldzxw.webp",
    inclusions: [
      "Counselling guidance",
      "Counselling registration guidance",
      "College selection assistance",
      "Choice filling support",
      "Round-wise counselling support",
      "Documentation guidance",
      "Seat allotment guidance",
      "Admission process assistance",
    ],
    validity:
      "Valid for the applicable counselling session/cycle and counselling rounds covered under the selected package.",
  },
];

export function getCounsellingPackage(packageId?: string | null) {
  return COUNSELLING_PACKAGES.find((item) => item.id === packageId);
}

export function calculateCounsellingTotal(baseAmount: number) {
  const taxAmount = Math.round(baseAmount * GST_RATE);

  return {
    baseAmount,
    taxRate: GST_RATE,
    taxAmount,
    totalAmount: baseAmount + taxAmount,
  };
}

export function formatIndianCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

