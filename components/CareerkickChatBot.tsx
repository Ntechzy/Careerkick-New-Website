"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, MessageCircle, Phone, RotateCcw, Send, Sparkles, X } from "lucide-react";
import { CONTACT_NUMBERS, getTelLink } from "@/lib/contactLinks";
import { cn } from "@/lib/utils";

type Message = {
  type: "bot" | "user";
  text: string;
};

type Option = {
  label: string;
  reply: string;
  action?: "contact" | "services" | "blogs" | "whatsapp" | "call";
};

type Step = {
  question: string;
  options: Option[];
};

const steps: Step[] = [
  {
    question: "Hi, I am Careerkick assistant. What do you need help with?",
    options: [
      {
        label: "NEET UG counselling",
        reply:
          "Perfect. We can help you understand counselling rounds, registration, choice filling, allotment, and reporting.",
      },
      {
        label: "MBBS/BDS admission",
        reply:
          "Great. We will help you compare colleges, fees, cutoff trends, quotas, and realistic admission chances.",
      },
      {
        label: "College predictor",
        reply:
          "Nice. A predictor works best when your rank, category, quota, budget, and preferred states are reviewed together.",
      },
      {
        label: "E-books and updates",
        reply:
          "Good choice. Our resources cover admission timelines, college planning, and counselling strategy.",
      },
    ],
  },
  {
    question: "Which counselling route are you planning for?",
    options: [
      {
        label: "All India MCC",
        reply:
          "MCC counselling needs careful tracking of AIQ rounds, deemed universities, reporting dates, and upgrade choices.",
      },
      {
        label: "MP counselling",
        reply:
          "For MP, we can help with DME MP registration, state merit list, choice filling, seat allotment, and college comparison.",
      },
      {
        label: "UP counselling",
        reply:
          "For UP, we can help with state quota strategy, document readiness, private college fees, and round-wise choices.",
      },
      {
        label: "Other state",
        reply:
          "Every state has different rules, documents, quotas, and deadlines. We can help you plan the right route.",
      },
    ],
  },
  {
    question: "What would you like to do next?",
    options: [
      {
        label: "Talk to Counsellor",
        reply: "Sure. You can call or continue on WhatsApp with this chat summary.",
        action: "whatsapp",
      },
      {
        label: "Book Free Call",
        reply: "Great. I will take you to the contact form so the team can call you back.",
        action: "contact",
      },
      {
        label: "View Services",
        reply: "Opening the services page so you can explore Careerkick counselling support.",
        action: "services",
      },
      {
        label: "Read Blogs",
        reply: "Opening the blog page for counselling guides, cutoffs, and admission updates.",
        action: "blogs",
      },
    ],
  },
];

const firstMessage: Message = {
  type: "bot",
  text: steps[0].question,
};

function goToContactForm() {
  const form = document.getElementById("formsID7375");

  if (form) {
    form.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  window.location.href = "/contact";
}

function navigateTo(action?: Option["action"]) {
  if (action === "contact") {
    goToContactForm();
  }

  if (action === "services") {
    window.location.href = "/services";
  }

  if (action === "blogs") {
    window.location.href = "/blog";
  }
}

function buildWhatsAppLink(chat: Message[]) {
  const transcript = chat
    .map((message) => `${message.type === "user" ? "Student" : "Careerkick"}: ${message.text}`)
    .join("\n");
  const text = `Hi Careerkick, I need counselling help.\n\nChat summary:\n${transcript}`;
  const digits = CONTACT_NUMBERS.primaryDigits.replace(/\D/g, "");
  const number = digits.startsWith("91") && digits.length === 12 ? digits : `91${digits}`;

  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function CareerkickChatBot() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [chat, setChat] = useState<Message[]>([firstMessage]);
  const [typing, setTyping] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [slideOut, setSlideOut] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const whatsappLink = useMemo(() => buildWhatsAppLink(chat), [chat]);
  const complete = step >= steps.length;

  useEffect(() => {
    let showTimer: number;
    let hideTimer: number;

    const loop = () => {
      showTimer = window.setTimeout(() => {
        setShowPrompt(true);

        hideTimer = window.setTimeout(() => {
          setShowPrompt(false);
          loop();
        }, 2600);
      }, 4200);
    };

    loop();

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth >= 640) return;

    const interval = window.setInterval(() => {
      setSlideOut(true);
      window.setTimeout(() => setSlideOut(false), 1700);
    }, 6500);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, typing]);

  const handleOption = (option: Option) => {
    const userMessage: Message = { type: "user", text: option.label };
    const updatedChat = [...chat, userMessage];

    setChat(updatedChat);
    setTyping(true);

    window.setTimeout(() => {
      const botMessages: Message[] = [{ type: "bot", text: option.reply }];
      const nextStep = step + 1;

      if (nextStep < steps.length) {
        botMessages.push({ type: "bot", text: steps[nextStep].question });
      } else {
        botMessages.push({
          type: "bot",
          text: "You are all set. Choose call or WhatsApp and our counselling team will continue from here.",
        });
      }

      setTyping(false);
      setChat((messages) => [...messages, ...botMessages]);
      setStep(nextStep);
      navigateTo(option.action);
    }, 750);
  };

  const resetChat = () => {
    setStep(0);
    setTyping(false);
    setChat([firstMessage]);
  };

  return (
    <>
      <div
        className={cn(
          "fixed bottom-4 right-2 z-[96] flex flex-col items-end gap-2 transition-transform duration-700 sm:bottom-6 sm:right-6",
          slideOut && !open ? "translate-x-[calc(100%+0.5rem)] sm:translate-x-0" : "translate-x-0",
        )}
      >
        <AnimatePresence>
          {showPrompt && !open && !slideOut ? (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.94 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.94 }}
              transition={{ duration: 0.24 }}
              className="mr-2 rounded-md border border-[#51A70A]/20 bg-white px-3 py-2 text-xs font-semibold text-[#13220f] shadow-[0_12px_34px_rgba(31,61,21,0.14)] sm:mr-0"
            >
              Need counselling help?
            </motion.div>
          ) : null}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => {
            setOpen((value) => !value);
            setShowPrompt(false);
          }}
          aria-label={open ? "Close Careerkick assistant" : "Open Careerkick assistant"}
          aria-expanded={open}
          className={cn(
            "flex h-24 w-24 items-center justify-center rounded-l-md bg-transparent text-[#51A70A] transition-transform duration-300 hover:scale-[1.05] focus-visible:shadow-[0_0_0_2px_#51A70A,0_0_0_5px_#050704] sm:rounded-full sm:h-28 sm:w-28 lg:h-32 lg:w-32",
            open && "scale-[1.04]",
          )}
        >
          {open ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Image
              src="/robot3.gif"
              alt=""
              width={128}
              height={128}
              className="h-24 w-24 object-contain sm:h-28 sm:w-28 lg:h-32 lg:w-32"
              unoptimized
            />
          )}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 34, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 34, scale: 0.96 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="fixed right-3 top-[49%] z-[96] flex h-[500px] w-[360px] max-w-[calc(100vw-1.5rem)] -translate-y-1/2 flex-col overflow-hidden rounded-lg border border-[#51A70A]/22 bg-[#071008]/94 shadow-elevated backdrop-blur-2xl sm:bottom-24 sm:right-6 sm:top-auto sm:translate-y-0"
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-gradient-brand px-4 py-3 text-white">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-white/16">
                  <Sparkles className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-display text-sm font-bold">Careerkick Assistant</p>
                  <p className="text-[11px] font-medium text-white/78">NEET counselling help</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-md border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/16"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto bg-[radial-gradient(circle_at_18%_0%,rgba(81,167,10,0.14),transparent_34%),linear-gradient(180deg,#0b1009_0%,#050704_100%)] p-4">
              {chat.map((message, index) => (
                <motion.div
                  key={`${message.type}-${index}-${message.text}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "max-w-[84%] rounded-lg px-3.5 py-2.5 text-sm font-medium leading-6 shadow-card",
                    message.type === "bot"
                      ? "border border-white/10 bg-white/[0.06] text-white"
                      : "ml-auto bg-gradient-brand text-white",
                  )}
                >
                  {message.text}
                </motion.div>
              ))}

              {typing ? (
                <div className="flex w-fit items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-xs font-semibold text-text-muted">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#8cef32]" />
                  Typing
                </div>
              ) : null}

              <div ref={chatEndRef} />
            </div>

            {!complete && !typing ? (
              <div className="border-t border-white/10 bg-[#0b1009]/96 p-3">
                <div className="flex flex-wrap gap-2">
                  {steps[step].options.map((option) => (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() => handleOption(option)}
                      className="rounded-md border border-[#51A70A]/25 bg-[#51A70A]/10 px-3 py-2 text-xs font-bold text-[#8cef32] transition-colors hover:border-[#51A70A]/50 hover:bg-[#51A70A] hover:text-white"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {complete ? (
              <div className="grid gap-2 border-t border-white/10 bg-[#0b1009]/96 p-3 sm:grid-cols-[1fr_1fr_auto]">
                <a
                  href={getTelLink(CONTACT_NUMBERS.primaryDigits)}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-bold text-[#13220f] transition-transform hover:scale-[1.02]"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Call
                </a>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#25D366] px-3 py-2 text-sm font-bold text-white transition-transform hover:scale-[1.02]"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp
                </a>
                <button
                  type="button"
                  onClick={resetChat}
                  className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-white transition-colors hover:border-[#51A70A]/40"
                  aria-label="Restart chat"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            ) : null}

            {!complete ? (
              <div className="border-t border-white/10 bg-[#071008] px-4 py-2">
                <p className="flex items-center gap-2 text-[11px] font-medium text-white/56">
                  <Send className="h-3.5 w-3.5 text-[#8cef32]" aria-hidden="true" />
                  Quick guidance only. A counsellor will confirm final details.
                </p>
              </div>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
