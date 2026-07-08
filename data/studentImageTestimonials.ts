import { admittedStudents } from "@/data/admittedStudents";

export type StudentImageTestimonial = {
  id: number;
  image: string;
  name: string;
  testimonial: string;
};

const testimonialCopy = [
  {
    name: "Aarav Sharma",
    testimonial:
      "The counselling plan made the whole process feel clear and manageable.",
  },
  {
    name: "Ananya Verma",
    testimonial:
      "We finally understood which quota and round decisions actually mattered.",
  },
  {
    name: "Kabir Singh",
    testimonial:
      "The guidance was practical, calm, and exactly what we needed before choice filling.",
  },
  {
    name: "Ishita Gupta",
    testimonial:
      "The college comparison support saved us from making a rushed decision.",
  },
  {
    name: "Rohan Mehta",
    testimonial:
      "Every step was explained simply, which made counselling much less stressful.",
  },
  {
    name: "Priya Nair",
    testimonial:
      "The support helped us move with confidence instead of confusion.",
  },
];

export const studentImageTestimonials: StudentImageTestimonial[] = testimonialCopy.map(
  (item, index) => ({
    id: index + 1,
    image: admittedStudents[index % admittedStudents.length]?.image ?? "",
    ...item,
  })
);
