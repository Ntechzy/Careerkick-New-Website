export type CounsellingAccent = "blue" | "green" | "orange" | "purple" | "cyan" | "yellow" | "red" | "emerald";

export type CounsellingIcon =
  | "user-search"
  | "graduation-cap"
  | "wallet"
  | "file-check"
  | "map"
  | "mouse-pointer-click"
  | "bell-ring"
  | "badge-check";

export type CounsellingProcessStep = {
  step: number;
  title: string;
  description: string;
  icon: CounsellingIcon;
  status: string;
  accent: CounsellingAccent;
  highlights: [string, string, string];
  orbitIcons: FloatingIconName[];
};

export type FloatingIconName = "bell" | "shield" | "graduation-cap" | "check" | "location" | "calendar" | "file" | "wallet" | "map" | "mouse-pointer-click" | "badge-check";

export type ServiceCard = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imagePrompt: string;
  accent: "violet" | "cyan" | "emerald" | "amber" | "blue" | "rose";
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type EventCard = {
  id: string;
  title: string;
  year: string;
  location: string;
  description: string;
  imagePrompt: string;
  accent: "violet" | "cyan" | "emerald" | "amber" | "blue" | "rose";
  kind: "samagam" | "webinar" | "expo" | "award";
};

export type UpcomingEventCard = {
  id: string;
  title: string;
  date: string;
  endDate?: string;
  location: string;
  highlight?: boolean;
  accent: "violet" | "cyan" | "emerald" | "amber" | "blue";
  imageSrc: string;
  imagePrompt: string;
  videoUrl?: string;
};

export type VideoTestimonial = {
  id: string;
  title: string;
  tag: string;
  youtubeUrl: string;
  accent: "violet" | "cyan" | "emerald" | "amber";
};

export type AdmittedStudent = {
  id: number;
  image: string;
};

export type OfficeBranch = {
  id: string;
  branch: string;
  image: string;
  address: string;
  contacts: string[];
  mapUrl: string;
  status?: "open" | "coming-soon";
};

export type ImportantEvent = {
  id: string;
  title: string;
  year: string;
  label: string;
  description: string;
  accent: "violet" | "cyan" | "emerald" | "amber" | "blue";
  imageSrc: string;
};
