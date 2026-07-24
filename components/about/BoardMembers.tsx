"use client";

/* eslint-disable @next/next/no-img-element */
import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, Building2, UserRound, X } from "lucide-react";
import { useEffect, useState } from "react";
import { boardMembers, type BoardMember } from "@/data/boardMembers";

export default function BoardMembers() {
  const [selectedMember, setSelectedMember] = useState<BoardMember | null>(null);

  useEffect(() => {
    document.body.style.overflow = selectedMember ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedMember]);

  return (
    <main className="section-shell min-h-screen px-4 pt-28 sm:px-6 md:pt-36">
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-[0.14]" />
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="section-heading">
          <span className="section-kicker">Board members</span>
          <h1 className="section-title">
            Strategic Minds Guiding Careerkick Forward
          </h1>
          <p className="section-copy">
            Meet the advisors and institutional leaders helping us build clearer,
            more trustworthy admission guidance for students and families.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {boardMembers.map((member, index) => (
            <motion.article
              key={member.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="glass glass-hover flex min-h-full flex-col overflow-hidden rounded-2xl"
            >
              <div className="relative aspect-[16/11] overflow-hidden bg-gradient-card">
                {member.imageUrl ? (
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_50%_30%,rgba(109,204,18,0.22),transparent_34%),linear-gradient(135deg,rgba(81,167,10,0.16),rgba(255,255,255,0.04))]">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[#51A70A]/35 bg-[#51A70A]/10 text-[#8cef32]">
                      <UserRound className="h-11 w-11" aria-hidden="true" />
                    </div>
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#050704]/90 to-transparent" />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h2 className="font-display text-2xl font-bold leading-tight text-white">
                  {member.name}
                </h2>
                <div className="mt-4 space-y-3 text-sm text-white/72">
                  <p className="flex items-start gap-3">
                    <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-[#8cef32]" aria-hidden="true" />
                    <span>{member.organization}</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#8cef32]" aria-hidden="true" />
                    <span>{member.designation}</span>
                  </p>
                </div>
                <p className="mt-5 flex-1 text-sm leading-relaxed text-white/66">
                  {member.summary}
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedMember(member)}
                  className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-gradient-brand px-5 py-3 text-sm font-semibold text-white shadow-card transition-shadow hover:shadow-glow-violet"
                >
                  View Complete Profile
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedMember && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/72 px-4 py-6 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="board-member-modal-title"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              className="glass relative max-h-[88dvh] w-full max-w-3xl overflow-y-auto rounded-2xl"
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedMember(null)}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/35 text-white transition-colors hover:border-[#51A70A]/45 hover:text-[#8cef32]"
                aria-label="Close profile details"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>

              <div className="grid gap-0 md:grid-cols-[0.9fr_1.1fr]">
                <div className="relative min-h-72 overflow-hidden bg-gradient-card md:min-h-full">
                  {selectedMember.imageUrl ? (
                    <img
                      src={selectedMember.imageUrl}
                      alt={selectedMember.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full min-h-72 items-center justify-center bg-[radial-gradient(circle_at_50%_34%,rgba(109,204,18,0.24),transparent_34%),linear-gradient(135deg,rgba(81,167,10,0.18),rgba(255,255,255,0.04))]">
                      <UserRound className="h-24 w-24 text-[#8cef32]" aria-hidden="true" />
                    </div>
                  )}
                </div>

                <div className="p-6 sm:p-8">
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[#8cef32]">
                    Complete profile
                  </p>
                  <h2
                    id="board-member-modal-title"
                    className="mt-3 font-display text-3xl font-bold leading-tight text-white"
                  >
                    {selectedMember.name}
                  </h2>
                  <p className="mt-4 text-sm font-semibold text-white/82">
                    {selectedMember.designation}
                  </p>
                  <p className="mt-1 text-sm text-white/58">
                    {selectedMember.organization}
                  </p>
                  <div className="mt-6 space-y-4 text-sm leading-relaxed text-white/70">
                    {selectedMember.details.map((detail) => (
                      <p key={detail}>{detail}</p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
