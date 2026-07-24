import type { Metadata } from "next";
import BoardMembers from "@/components/about/BoardMembers";

export const metadata: Metadata = {
  title: "Board Members | Careerkick",
  description:
    "Meet the board members and advisors guiding Careerkick's student-first admission counselling mission.",
  alternates: {
    canonical: "/about/board-members",
  },
};

export default function BoardMembersPage() {
  return <BoardMembers />;
}
