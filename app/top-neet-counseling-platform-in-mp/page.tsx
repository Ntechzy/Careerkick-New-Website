import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenText,
  CalendarClock,
  CheckCircle2,
  FileText,
  GraduationCap,
  MessageCircle,
  Newspaper,
  Search,
  Share2,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { siteConfig } from "@/lib/site";

const route = "/top-neet-counseling-platform-in-mp";
const pageTitle = "Top neet counseling platform in MP";
const pageDescription =
  "Careerkick helps NEET aspirants in Madhya Pradesh with MP NEET counselling, choice filling, merit list tracking, college prediction, cutoffs, and MBBS/BDS admission guidance.";

const keywords = [
  "Top neet counseling platform in MP",
  "best NEET counselling in MP",
  "MP NEET counselling 2026",
  "Madhya Pradesh NEET counselling",
  "DME MP counselling",
  "MP NEET UG counselling",
  "MP MBBS counselling",
  "MP BDS counselling",
  "NEET choice filling MP",
  "MP NEET merit list",
  "MP NEET seat allotment",
  "MP NEET cutoff",
  "private medical colleges in MP",
  "government medical colleges in MP",
  "MBBS admission in Madhya Pradesh",
];

const blogPosts = [
  {
    title: "MP NEET Counselling 2026: Registration, Merit List and Choice Filling",
    excerpt:
      "A round-wise guide for Madhya Pradesh NEET UG counselling, including DME MP registration, document checks, state merit, choice locking, allotment, and reporting.",
    category: "MP NEET Counselling",
    readTime: "7 min read",
  },
  {
    title: "MP NEET Cutoff: How to Read Government and Private College Chances",
    excerpt:
      "Understand how category, MP state rank, college type, fee budget, and previous closing ranks shape a realistic MBBS/BDS college list.",
    category: "Cutoff Strategy",
    readTime: "6 min read",
  },
  {
    title: "NEET Choice Filling in MP: Mistakes That Cost Good Seats",
    excerpt:
      "Learn how to order choices, protect backup options, compare fees, and avoid risky preference lists during MP NEET UG counselling.",
    category: "Choice Filling",
    readTime: "5 min read",
  },
];

const socialPosts = [
  {
    title: "MP NEET update format",
    text: "New DME MP notice? Post a quick summary with date, affected round, action needed, and official link.",
  },
  {
    title: "Choice filling reminder",
    text: "Before locking choices, compare rank range, fee, bond, location, hostel, and reporting requirements.",
  },
  {
    title: "Parent checklist",
    text: "Keep NEET scorecard, domicile, category certificate, ID proof, photographs, and payment details ready before counselling opens.",
  },
];

const futureResources = [
  {
    Icon: Search,
    title: "College predictor",
    text: "MP rank and cutoff based college shortlist.",
  },
  {
    Icon: FileText,
    title: "PDF resources",
    text: "Checklists, fee sheets, and document guides.",
  },
  {
    Icon: CalendarClock,
    title: "Counselling calendar",
    text: "Round-wise DME MP dates and reminders.",
  },
  {
    Icon: GraduationCap,
    title: "Result stories",
    text: "Student admissions and college journeys.",
  },
];

const supportBlocks = [
  "MP NEET UG counselling registration guidance",
  "DME MP merit list and state rank review",
  "Government and private medical college comparison",
  "MBBS/BDS cutoff and closing-rank strategy",
  "Choice filling, locking, allotment, and reporting support",
  "Document checklist and admission deadline tracking",
];

const faqs = [
  {
    question: "Which is the top NEET counseling platform in MP?",
    answer:
      "Careerkick is built for NEET aspirants who need Madhya Pradesh counselling support, including MP state rank analysis, college prediction, choice filling, cutoff review, and admission guidance.",
  },
  {
    question: "What keywords should this page target for MP NEET counselling?",
    answer:
      "The page targets high-intent searches such as MP NEET counselling 2026, DME MP counselling, Madhya Pradesh NEET counselling, MP NEET merit list, MP NEET seat allotment, MP NEET cutoff, and NEET choice filling MP.",
  },
  {
    question: "Can Careerkick help with MP private medical college choice filling?",
    answer:
      "Yes. The page positions Careerkick for government and private medical college comparison, fee planning, cutoff analysis, and practical choice filling support for MBBS and BDS admission in Madhya Pradesh.",
  },
  {
    question: "Does this page guarantee top Google ranking?",
    answer:
      "No page can guarantee a top Google ranking. This page is structured to improve relevance, crawlability, internal linking, and search intent alignment for MP NEET counselling queries.",
  },
];

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: route,
  },
  keywords,
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${siteConfig.url}${route}`,
    type: "website",
    siteName: siteConfig.name,
    locale: "en_IN",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: pageTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [siteConfig.ogImage],
  },
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: pageTitle,
    description: pageDescription,
    url: `${siteConfig.url}${route}`,
    inLanguage: "en-IN",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}/logo.png`,
    },
    about: [
      "MP NEET counselling 2026",
      "Madhya Pradesh MBBS admission",
      "DME MP counselling",
      "NEET choice filling MP",
    ],
    mainEntity: {
      "@type": "ItemList",
      itemListElement: blogPosts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: post.title,
        description: post.excerpt,
      })),
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: pageTitle,
        item: `${siteConfig.url}${route}`,
      },
    ],
  },
];

export default function TopNeetCounselingPlatformInMpPage() {
  return (
    <main className="bg-[#f7faf4] text-[#182413]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="relative min-h-[88vh] overflow-hidden bg-[#edf7e7] px-4 pb-12 pt-32 md:px-8 md:pb-16 md:pt-40">
        <Image
          src="/services/counselling-roadmap.webp"
          alt="NEET counselling roadmap for Madhya Pradesh students"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-18"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#ffffff_0%,rgba(255,255,255,0.92)_46%,rgba(237,247,231,0.78)_100%)]" />
        <div className="grid-overlay absolute inset-0 opacity-70" />

        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div className="max-w-4xl">
            <SectionLabel className="border-violet/25 bg-white text-violet shadow-sm">
              MP NEET Counselling Hub
            </SectionLabel>
            <h1 className="font-display text-4xl font-bold leading-tight text-[#13220f] md:text-6xl lg:text-7xl">
              Top neet counseling platform in MP
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#4f6447] md:text-lg">
              Careerkick brings MP NEET counselling updates, expert blogs,
              social media explainers, choice filling support, cutoff strategy,
              and MBBS/BDS admission guidance into one searchable place.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center gap-2 rounded-md bg-violet px-5 py-3 text-sm font-bold text-white shadow-card transition-transform hover:scale-[1.02]"
              >
                Get MP Counselling
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/blog"
                className="inline-flex min-h-12 items-center gap-2 rounded-md border border-[#dce9d4] bg-white px-5 py-3 text-sm font-bold text-[#13220f] shadow-sm transition-colors hover:border-[#51A70A]/45 hover:text-violet"
              >
                Read Blogs
                <BookOpenText className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="grid gap-3 rounded-lg border border-[#dce9d4] bg-white/88 p-4 shadow-[0_12px_34px_rgba(31,61,21,0.08)] backdrop-blur-md sm:grid-cols-3 lg:mb-2">
            {[
              ["2026", "MP NEET cycle"],
              ["DME MP", "Official counselling focus"],
              ["MBBS/BDS", "Admission guidance"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-md bg-[#fbfdf9] p-4">
                <p className="font-display text-2xl font-bold text-[#13220f]">{value}</p>
                <p className="mt-2 text-xs font-semibold uppercase text-[#728067]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-xs font-bold uppercase text-violet">Search intent</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-[#13220f] md:text-5xl">
              Built around what MP NEET students actually search for
            </h2>
            <p className="mt-5 text-base leading-7 text-[#52644b]">
              The page targets counselling-stage queries: registration, official
              portal updates, state merit list, choice filling, seat allotment,
              cutoff, private medical college fees, and admission reporting.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {supportBlocks.map((item) => (
              <div key={item} className="flex gap-3 rounded-md border border-[#dce9d4] bg-white p-4 shadow-sm">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#51A70A]" aria-hidden="true" />
                <p className="text-sm font-semibold leading-6 text-[#314329]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase text-violet">Blogs</p>
              <h2 className="mt-3 font-display text-3xl font-bold text-[#13220f] md:text-5xl">
                MP NEET counselling articles
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex w-fit items-center gap-2 rounded-md border border-[#dce9d4] px-4 py-3 text-sm font-bold text-[#13220f] transition-colors hover:border-[#51A70A]/45 hover:text-violet"
            >
              View all blogs
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {blogPosts.map((post) => (
              <article key={post.title} className="rounded-lg border border-[#dce9d4] bg-[#fbfdf9] p-5 shadow-sm">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-md bg-[#edf7e7] text-violet">
                  <Newspaper className="h-5 w-5" aria-hidden="true" />
                </div>
                <p className="text-xs font-bold uppercase text-[#728067]">{post.category}</p>
                <h3 className="mt-3 font-display text-xl font-bold leading-7 text-[#13220f]">
                  {post.title}
                </h3>
                <p className="mt-3 text-sm font-medium leading-6 text-[#52644b]">{post.excerpt}</p>
                <p className="mt-5 text-xs font-bold uppercase text-violet">{post.readTime}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="text-xs font-bold uppercase text-violet">Social media posts</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-[#13220f] md:text-5xl">
              Short updates for Instagram, WhatsApp, and student groups
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-7 text-[#52644b]">
              Use this section for quick MP NEET counselling updates, shareable
              deadline posts, cutoff explainers, choice filling reminders, and
              student FAQs.
            </p>
          </div>

          <div className="grid gap-4">
            {socialPosts.map((post) => (
              <article key={post.title} className="rounded-lg border border-[#dce9d4] bg-white p-5 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-red-50 text-red-600">
                    <Share2 className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#13220f]">{post.title}</h3>
                    <p className="mt-2 text-sm font-medium leading-6 text-[#52644b]">{post.text}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#edf7e7] px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase text-violet">Future content blocks</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-[#13220f] md:text-5xl">
              Ready for more MP admission resources
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {futureResources.map(({ Icon, title, text }) => (
              <div key={title} className="rounded-lg border border-[#d3e4ca] bg-white p-5 shadow-sm">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-md bg-[#fbfdf9] text-violet">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-bold text-[#13220f]">{title}</h3>
                <p className="mt-2 text-sm font-medium leading-6 text-[#52644b]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-bold uppercase text-violet">FAQ</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-[#13220f] md:text-5xl">
              MP NEET counselling questions
            </h2>
          </div>
          <div className="grid gap-4">
            {faqs.map((faq) => (
              <article key={faq.question} className="rounded-lg border border-[#dce9d4] bg-white p-5 shadow-sm">
                <h3 className="font-display text-lg font-bold text-[#13220f]">{faq.question}</h3>
                <p className="mt-3 text-sm font-medium leading-6 text-[#52644b]">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 md:px-8 md:pb-28">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 rounded-lg border border-[#dce9d4] bg-white p-6 shadow-[0_12px_34px_rgba(31,61,21,0.08)] md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <p className="text-xs font-bold uppercase text-violet">Careerkick MP desk</p>
            <h2 className="mt-2 font-display text-2xl font-bold text-[#13220f] md:text-3xl">
              Start your Madhya Pradesh MBBS/BDS counselling plan
            </h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-violet px-5 py-3 text-sm font-bold text-white shadow-card transition-transform hover:scale-[1.02]"
          >
            Talk to a Counsellor
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
