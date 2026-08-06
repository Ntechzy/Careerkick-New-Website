export type CounsellingPackage = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  baseAmount: number;
  taxRate?: number;
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
    id: "mbbs-govt-counselling",
    title: "Government MBBS / BDS / AYUSH / Veterinary / Other Courses Counselling",
    subtitle: "Government Counselling",
    description:
      "Complete counselling support for Government MBBS, BDS, BAMS, BHMS, BUMS, Veterinary and other medical-course admissions.",
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
    title: "Private MBBS Counselling",
    subtitle: "Private MBBS",
    description:
      "End-to-end guidance for private MBBS admissions, from choice filling to final admission.",
    baseAmount: 75000,
    taxRate: 0,
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
    id: "google-meet-nikhil-sir",
    title: "Google Meet with Nikhil Sir",
    subtitle: "One-to-one Counselling",
    description:
      "One-to-one professional counselling discussion and personalised guidance.",
    baseAmount: 5000,
    taxRate: 0,
    defaultCourse: "Other",
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
];

export function getCounsellingPackage(packageId?: string | null) {
  return COUNSELLING_PACKAGES.find((item) => item.id === packageId);
}

export function calculateCounsellingTotal(baseAmount: number, taxRate = GST_RATE) {
  const taxAmount = Math.round(baseAmount * taxRate);

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
