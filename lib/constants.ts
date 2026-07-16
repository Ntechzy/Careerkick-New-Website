export type NavLink = { label: string; href: string };
export type FooterLink = { label: string; href: string };
export type Stat = { value: number; suffix: string; label: string };
export type Feature = {
  id: string;
  title: string;
  description: string;
  icon: string;
  accentColor: string;
  size: "large" | "medium" | "small";
};
export type Testimonial = {
  name: string;
  rank: string;
  college: string;
  quote: string;
  rating: number;
  year: string;
  category: string;
};
export type PricingPlan = {
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  unavailable?: string[];
  isFeatured?: boolean;
};
export type Webinar = {
  title: string;
  speaker: string;
  credential: string;
  date: string;
  time: string;
  isUpcoming: boolean;
};
export type BlogPost = {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
};

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "Blogs", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Careers", href: "/careers" },
  { label: "Policies", href: "/policies" },
];

export const RESOURCE_LINKS: FooterLink[] = [
  { label: "NEET 2026", href: "/services" },
  { label: "MBBS Counselling", href: "/services" },
  { label: "College Predictor", href: "/portfolio" },
  { label: "College Search", href: "/portfolio" },
  { label: "Choice Filling", href: "/services" },
  { label: "Admission Support", href: "/contact" },
];

export const COMPANY_LINKS: FooterLink[] = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
  { label: "Events", href: "/contact" },
  { label: "Webinars", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export const LEGAL_LINKS: FooterLink[] = [
  { label: "Privacy Policy", href: "/policies/privacy" },
  { label: "Terms", href: "/policies/terms" },
  { label: "Disclaimer", href: "/policies/disclaimer" },
  { label: "Developed by Ntechzy", href: "https://ntechzy.in/" },
];

export const STATS: Stat[] = [
  { value: 10, suffix: "L+", label: "Students Guided" },
  { value: 100, suffix: "K+", label: "Admissions" },
  { value: 200, suffix: "+", label: "Partner Colleges" },
  { value: 200, suffix: "+", label: "Expert Counsellors" },
  { value: 100, suffix: "%", label: "Success Rate" },
  { value: 9, suffix: "+", label: "Years of Experience" },
];

export const STATE_AUTHORITIES = [
  "All India Counselling (MCC)",
  "Uttar Pradesh",
  "Maharashtra",
  "Karnataka",
  "Tamil Nadu",
  "Rajasthan",
  "Telangana",
  "West Bengal",
  "Gujarat",
  "Bihar",
  "Punjab",
  "Kerala",
  "Odisha",
  "Assam",
  "Madhya Pradesh",
  "Chhattisgarh",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Jammu & Kashmir",
  "Goa",
  "Chandigarh",
  "Puducherry",
  "Andhra Pradesh",
  "Uttarakhand",
];

export const FEATURES: Feature[] = [
  {
    id: "counselling",
    title: "Personal NEET Counselling",
    description:
      "Work with experienced counsellors who help you read your rank, budget, category, quota, and college preferences with clarity.",
    icon: "01",
    accentColor: "cyan",
    size: "large",
  },
  {
    id: "predictor",
    title: "Accurate College Predictor",
    description:
      "Estimate realistic MBBS admission chances from rank, quota, state, category, round history, fees, and seat trends.",
    icon: "02",
    accentColor: "violet",
    size: "medium",
  },
  {
    id: "choice",
    title: "Smart Choice Filling",
    description:
      "Convert hundreds of college options into a practical list with safe, target, and ambitious preferences.",
    icon: "03",
    accentColor: "magenta",
    size: "medium",
  },
  {
    id: "fees",
    title: "Fees and College Comparison",
    description:
      "Compare tuition, hostel cost, bond rules, location, reputation, and practical admission tradeoffs in one view.",
    icon: "04",
    accentColor: "amber",
    size: "small",
  },
  {
    id: "webinars",
    title: "Expert Sessions and Events",
    description:
      "Join live strategy sessions, Q&A rooms, and counselling events for important NEET admission milestones.",
    icon: "05",
    accentColor: "cyan",
    size: "small",
  },
  {
    id: "support",
    title: "Complete Admission Support",
    description:
      "Stay supported through documentation, counselling rounds, reporting windows, updates, and final admission steps.",
    icon: "06",
    accentColor: "violet",
    size: "large",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Aarav Menon",
    rank: "AIR 18,420",
    college: "Madras Medical College",
    quote:
      "Careerkick helped my family understand which choices were realistic and which ones needed backup planning.",
    rating: 5,
    year: "NEET 2025",
    category: "UG",
  },
  {
    name: "Nisha Reddy",
    rank: "AIR 42,810",
    college: "KIMS Hubballi",
    quote:
      "The counsellor explained fees, quota options, and documents so clearly that the process finally felt manageable.",
    rating: 5,
    year: "NEET 2025",
    category: "UG",
  },
  {
    name: "Pranav Shah",
    rank: "AIR 31,510",
    college: "BJ Medical College",
    quote:
      "The college predictor gave us a practical shortlist before choice filling started.",
    rating: 5,
    year: "NEET 2025",
    category: "UG",
  },
  {
    name: "Meera Iyer",
    rank: "AIR 52,406",
    college: "Stanley Medical College",
    quote: "Careerkick made state quota strategy feel calm instead of chaotic.",
    rating: 5,
    year: "NEET 2025",
    category: "UG",
  },
  {
    name: "Kabir Bansal",
    rank: "AIR 35,922",
    college: "Seth GS Medical College",
    quote:
      "The choice filling support helped me avoid random ordering and focus on my best chances.",
    rating: 5,
    year: "NEET 2025",
    category: "UG",
  },
  {
    name: "Ananya Das",
    rank: "AIR 49,774",
    college: "RG Kar Medical College",
    quote:
      "The webinar team answered questions with actual admission context, not guesswork.",
    rating: 5,
    year: "NEET 2025",
    category: "UG",
  },
  {
    name: "Rohan Thomas",
    rank: "AIR 28,987",
    college: "Govt. Medical College Kozhikode",
    quote: "College comparison changed my final list in the best way.",
    rating: 5,
    year: "NEET 2025",
    category: "UG",
  },
  {
    name: "Sanya Kapoor",
    rank: "AIR 65,130",
    college: "SMS Medical College",
    quote:
      "The reminders and call support kept us from missing important reporting steps.",
    rating: 5,
    year: "NEET 2025",
    category: "UG",
  },
  {
    name: "Aditya Rao",
    rank: "AIR 44,761",
    college: "Bangalore Medical College",
    quote:
      "Round-wise trends were clear enough to discuss with my whole family.",
    rating: 5,
    year: "NEET 2025",
    category: "UG",
  },
  {
    name: "Fatima Khan",
    rank: "AIR 71,504",
    college: "GMC Nagpur",
    quote:
      "The counsellors kept our plan realistic and helped us prepare backups.",
    rating: 5,
    year: "NEET 2025",
    category: "UG",
  },
  {
    name: "Dev Patel",
    rank: "AIR 37,708",
    college: "MAMC Delhi",
    quote: "The AIQ vs state quota comparison was the turning point for me.",
    rating: 5,
    year: "NEET 2025",
    category: "UG",
  },
  {
    name: "Ishita Sen",
    rank: "AIR 57,905",
    college: "SCB Medical College",
    quote: "Clear, verified data helped my parents trust the final decision.",
    rating: 5,
    year: "NEET 2025",
    category: "UG",
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Starter",
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      "Free counselling call",
      "Basic college shortlist",
      "NEET 2026 roadmap",
    ],
    unavailable: ["Dedicated counsellor", "Choice-fill review"],
  },
  {
    name: "Guided",
    monthlyPrice: 799,
    annualPrice: 5999,
    features: [
      "College predictor access",
      "Personal counselling support",
      "Deadline alerts",
      "3 expert sessions/month",
      "Choice-fill assistant",
    ],
    isFeatured: true,
  },
  {
    name: "Complete",
    monthlyPrice: 1499,
    annualPrice: 9999,
    features: [
      "Everything in Guided",
      "1-on-1 expert calls",
      "Unlimited webinars",
      "Priority support",
      "Personalized admission review",
    ],
  },
];

export const WEBINARS: Webinar[] = [
  {
    title: "NEET 2026 MBBS Admission Roadmap",
    speaker: "Careerkick Expert Panel",
    credential: "Senior Counselling Team",
    date: "July 15, 2026",
    time: "7:00 PM IST",
    isUpcoming: true,
  },
  {
    title: "State Quota vs All India: Which to Prefer?",
    speaker: "Careerkick Counsellors",
    credential: "Admission Guidance Desk",
    date: "July 22, 2026",
    time: "8:00 PM IST",
    isUpcoming: true,
  },
  {
    title: "Choice Filling Masterclass for NEET 2026",
    speaker: "Careerkick Team",
    credential: "MBBS Admission Experts",
    date: "August 2026",
    time: "Live Workshop",
    isUpcoming: false,
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    title: "NEET 2026 MBBS Counselling: How to Build a Realistic College List",
    excerpt:
      "A practical guide to reading rank, quota, budget, and state options before the choice filling window gets tight.",
    category: "NEET 2026",
    date: "June 25, 2026",
    readTime: "6 min",
  },
  {
    title:
      "Government vs Private Medical Colleges: What Parents Should Compare",
    excerpt:
      "Look beyond the college name and compare fees, location, bond rules, hostel cost, and long-term fit.",
    category: "College Guide",
    date: "June 18, 2026",
    readTime: "8 min",
  },
  {
    title:
      "NEET 2026 State Counselling Calendar: Every Deadline You Need to Know",
    excerpt:
      "Track registration, document verification, merit lists, choice filling, allotment, and reporting windows across major states.",
    category: "State Counselling",
    date: "June 12, 2026",
    readTime: "5 min",
  },
];

