"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

type Step = {
  id: number;
  tag: string;
  title: string;
  highlight: string;
  description: string;
  points: string[];
  image: string;
};

const steps: Step[] = [
  {
    id: 1,
    tag: "STEP 1",
    title: "Inquiry &",
    highlight: "Registration",
    description:
      "Start your journey by creating your profile and submitting basic details.",
    points: [
      "Student visits Careerkick portal/website or contacts office",
      "Submits basic details: Name, Contact, Email, City, Exam Type (JEE/NEET/CUET/State)",
      "Provides entrance exam rank/percentile or expected score",
      "Creates account on student portal with login credentials",
      "Receives welcome email with next steps and timeline",
    ],

    image:
      "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1775547056/inquiry_and_registration_v7k1i4.webp",
  },
  {
    id: 2,
    tag: "STEP 2",
    title: "Profile Data",
    highlight: "Collection",
    description:
      "Student completes comprehensive profile form (online/offline)",
    points: [
      "Academic Records: 10th marks, 12th marks, UG marks (if applicable)",
      "Entrance Exam Scores: JEE Main/Advanced, NEET, CUET, AYUSH, State exams",
      "Extracurricular Activities: Sports, cultural, leadership roles",
      "Personal Preferences: Location, budget, course interests, career goals",
      "Category: General/OBC/SC/ST/EWS, Domicile, Gender",
      "Optional: Psychometric assessment to identify aptitude and interests",
      "Upload documents: Marksheets, scorecards, certificates (PDF format)",
    ],
    image:
      "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1775547055/profile_data_collection_cxdtlb.webp",
  },
  {
    id: 3,
    tag: "STEP 3",
    title: "Profile Review &",
    highlight: "Scoring",
    description:
      "Get on a call with experts to map your journey and expectations.",
    points: [
      "Counselor reviews submitted profile within 5-10 business days",
      "Profile Scoring Formula (Total 100 points)",
      "Academic Performance: 40 points (10th/12th aggregate)",
      "Entrance Exam Score: 30 points (percentile/rank conversion)",
      "Profile Strength: 30 points (extracurriculars, category, preferences)",
      "Generate preliminary assessment report with strengths and improvement areas",
      "Student receives email notification when review is complete",
    ],
    image:
      "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1775547057/profile_review_scoring_fq33md.webp",
  },
  {
    id: 4,
    tag: "STEP 4",
    title: "Paid Counselling",
    highlight: "Payment",
    description: "Fee Structure as product service catalogue pricing",
    points: [],
    image:
      "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1775547057/paid_counselling_payment_eh1wf7.webp",
  },
  {
    id: 5,
    tag: "STEP 5",
    title: "Profile",
    highlight: "Shortlisting",
    description:
      "Start developing core skills required for success in your journey.",
    points: [
      "Counselor analyzes profile score against historical admission data",
      "Rank student profile against similar candidates from previous years",
      "Identify realistic, moderate, and ambitious college targets",
      "Generate personalized shortlist report showing: Admission probability (High/Medium/Low) for each institution",
      "Previous year cutoffs and trends",
      "Seat availability by category and quota",
      "Share report via portal dashboard and email",
    ],
    image:
      "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1775547056/profile_shortlisting_ohgbuw.webp",
  },
  {
    id: 6,
    tag: "STEP 6",
    title: "College/Portal/University",
    highlight: "Shortlisting",
    description: "Based on profile score, recommend 10-20 suitable options:",
    points: [
      "NITs, IIITs, State Engineering Colleges (for JEE)",
      "AIIMS, Government Medical Colleges, Private Medical (for NEET/AYUSH)",
      "Central Universities, State Universities (for CUET)",
      "Filter by: Student location preference, budget constraints, course availability",
      "JoSAA (Joint Seat Allocation Authority) for IITs/NITs/IIITs",
      "MCC (Medical Counselling Committee) for NEET",
      "CSAB (Central Seat Allocation Board)",
      "AYUSH (For Ayush colleges)",
      "State counselling portals (UP, Maharashtra, etc.)",
      "Share college comparison matrix with fees, placements, facilities",
    ],
    image:
      "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1775547055/college_admission_sah0q2.webp",
  },
  {
    id: 7,
    tag: "STEP 7",
    title: "Form",
    highlight: "Filling",
    description:
      "Assist student in registering on official counselling portals:",
    points: [
      "Create login credentials on MCC/JoSAA/State portals",
      "Fill registration form with accurate personal and academic details",
      "Upload documents as per portal requirements (size/format)",
      "Pay registration fees and security fees on official portals.",
      "Verify all entered information before final submission",
      "Download registration confirmation and save credentials securely",
      "Track important dates: Choice filling start, choice locking deadline, rounds",
    ],
    image:
      "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1775547056/form_filling_whyuz2.webp",
  },
  {
    id: 8,
    tag: "STEP 8",
    title: "Choice",
    highlight: "Filling",
    description:
      "Guide student in filling choices (college + course combinations):",
    points: [
      "Enter choices in order of preference (most preferred first)",
      "Typical 50-100+ choices allowed depending on portal",
      "Strategy: Mix dream colleges, realistic options, and safe choices",
      "Review choice order with counselor before locking",
      "Lock choices before deadline (changes not allowed after locking)",
      "Save choice list PDF from portal for records",
      "Monitor seat allocation rounds (usually 3-6 rounds)",
    ],
    image:
      "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1775547054/choice_filling_rrvhbe.webp",
  },
  {
    id: 9,
    tag: "STEP 9",
    title: "College",
    highlight: "Admission",
    description: "Seat Allotment Results",
    points: [
      "Check allotment results on portal (Round 1, 2, 3...)",
      "Download provisional allotment letter immediately",
      "If seat allotted:",
      "Accept/Freeze/Float decision within 24-48 hours",
      "Pay acceptance fee online.",
      "Download fee receipt and seat confirmation letter",
      "Document Verification:",
      "Attend verification at allocated college (online/offline)",
      "Submit: 10th/12th certificates, scorecard, category certificate, ID proof",
      "Final Admission:",
      "Report to college for final admission formalities",
    ],
    image:
      "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1775547055/college_admission_sah0q2.webp",
  },
  {
    id: 10,
    tag: "STEP 10",
    title: "Post-Admission Support by",
    highlight: "Careerkick",
    description: "",
    points: [
      "Track student admission status on portal dashboard",
      "Service completion confirmation email sent",
    ],
    image:
      "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1775547056/future_ismamp.webp",
  },
];

export default function AdmissionTimeline() {
  const [active, setActive] = useState(0);
  const [imageVisible, setImageVisible] = useState(true);
  const [imageTop, setImageTop] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let observers: IntersectionObserver[] = [];

    const setupObservers = (isMobile: boolean) => {
      observers.forEach((obs) => obs.disconnect());
      observers = [];

      refs.current.forEach((ref, index) => {
        if (!ref) return;

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActive(index);
            }
          },
          {
            // Improved margins to trigger active state more accurately based on scrolling
            rootMargin: isMobile ? "-20% 0px -40% 0px" : "-25% 0px -45% 0px",
            threshold: isMobile ? 0.1 : 0.15,
          },
        );

        observer.observe(ref);
        observers.push(observer);
      });
    };

    const mql = window.matchMedia("(max-width: 1023px)");
    setupObservers(mql.matches);

    const handleChange = () => setupObservers(mql.matches);
    if (mql.addEventListener) {
      mql.addEventListener("change", handleChange);
    } else {
      mql.addListener(handleChange);
    }

    return () => {
      observers.forEach((obs) => obs.disconnect());
      if (mql.removeEventListener) {
        mql.removeEventListener("change", handleChange);
      } else {
        mql.removeListener(handleChange);
      }
    };
  }, []);

  useEffect(() => {
    setImageVisible(false);
    const frame = requestAnimationFrame(() => setImageVisible(true));
    
    // Logic to perfectly track the card's vertical position
    const updatePosition = () => {
      if (refs.current[active]) {
        setImageTop(refs.current[active].offsetTop);
      }
    };
    
    updatePosition();
    window.addEventListener("resize", updatePosition);
    // Add scroll event listener briefly to ensure it catches layout shifts on heavy pages
    window.addEventListener("scroll", updatePosition, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, [active]);

  return (
    <section className="relative overflow-hidden bg-[#fafaf6] py-16 text-slate-900 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[78%] -translate-x-1/2 rounded-full bg-[#56b016]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#56b016]/6 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 text-center sm:mb-16">
          <p className="text-xs font-medium uppercase tracking-[0.4em] text-[#56b016] sm:text-sm">
            Admission Timeline
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-950 sm:mt-4 sm:text-5xl">
            Your Admission Journey, Step by Step
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Track every stage from inquiry and profile review to final admission
            and post-admission support.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.85fr)] lg:gap-20">
          {/* LEFT CONTENT */}
          <div className="relative">
            {/* Vertical Line - dynamically sizes with the content */}
            <div className="absolute bottom-0 left-4 top-0 w-0.5 bg-[#56b016]/20 sm:left-5" />

            {/* Added dynamic bottom padding so the final image doesn't overflow the section */}
            <div className="space-y-16 pb-12 sm:space-y-20 lg:space-y-28 lg:pb-[400px]">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  ref={(el) => {
                    refs.current[index] = el;
                  }}
                  className="relative pl-12 sm:pl-16 lg:pl-20"
                >
                  {/* Circle */}
                  <div
                    className={clsx(
                      "absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 sm:h-10 sm:w-10",
                      active === index
                        ? "border-[#56b016] bg-[#56b016] text-white shadow-[0_0_0_6px_rgba(86,176,22,0.14)] scale-110"
                        : "border-[#56b016]/30 bg-white text-[#56b016]",
                    )}
                  >
                    <span className="font-mono text-xs font-bold sm:text-sm">{step.id}</span>
                  </div>

                  {/* Content */}
                  <div
                    className={clsx(
                      "max-w-none text-left transition-all duration-500",
                      active === index
                        ? "opacity-100 translate-y-0"
                        : "opacity-40 translate-y-4",
                    )}
                  >
                    {/* Mobile image */}
                    <div className="mb-6 overflow-hidden rounded-[1.25rem] border border-[#56b016]/15 shadow-[0_14px_40px_rgba(86,176,22,0.12)] sm:mb-8 lg:hidden">
                      <img
                        src={step.image}
                        alt={`${step.title} ${step.highlight}`}
                        className="aspect-video w-full object-cover sm:aspect-[4/3]"
                      />
                    </div>

                    {/* Tag */}
                    <span className="inline-flex rounded-full border border-[#56b016]/15 bg-[#56b016]/8 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#56b016]">
                      {step.tag}
                    </span>

                    {/* Title */}
                    <h3 className="mt-4 font-display text-2xl font-bold leading-tight text-slate-950 sm:text-3xl lg:text-4xl">
                      {step.title}{" "}
                      <span className="text-[#56b016]">{step.highlight}</span>
                    </h3>

                    {/* Description */}
                    {step.description && (
                      <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                        {step.description}
                      </p>
                    )}

                    {/* Points */}
                    {step.points.length > 0 && (
                      <ul className="mt-6 space-y-4">
                        {step.points.map((point, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3.5 text-left text-sm leading-relaxed text-slate-700 sm:text-base"
                          >
                            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#56b016]/30 bg-[#56b016]/10 text-xs font-semibold text-[#56b016]">
                              {i + 1}
                            </span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT MOVING VIDEO/IMAGE */}
          <div className="relative hidden lg:block">
            {/* The absolute container that tracks the active step */}
            <div 
              className="absolute w-full transition-all duration-700 ease-out"
              style={{ top: `${imageTop}px` }}
            >
              <div className="relative overflow-hidden rounded-3xl border border-[#56b016]/15 bg-white shadow-[0_24px_80px_rgba(86,176,22,0.15)]">
                <img
                  src={steps[active].image}
                  alt={`${steps[active].title} visual`}
                  className={clsx(
                    "w-full object-cover transition-opacity duration-500 ease-in-out lg:aspect-[4/3] xl:aspect-square lg:max-h-[480px]",
                    imageVisible ? "opacity-100" : "opacity-0",
                  )}
                />
              </div>

              {/* Dynamic caption centered under the image */}
              <div className="mt-6 flex items-center justify-between text-sm font-medium text-slate-500">
                <span>{steps[active].tag}</span>
                <span>
                  Step {active + 1} of {steps.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}