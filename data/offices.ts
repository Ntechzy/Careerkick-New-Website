import type { OfficeBranch } from "@/types";

export const offices: OfficeBranch[] = [
  {
    id: "kanpur",
    branch: "Kanpur",
    image: "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1783162422/kanpur_fzmknv.png",
    address:
      "117 N 65, Rani Ganj, Ambedkar Nagar, Navin Nagar Kakadeo, Kanpur, Uttar Pradesh 208025",
    contacts: ["+91 8127942568", "+91 8423689480"],
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=117%20N%2065%20Rani%20Ganj%20Ambedkar%20Nagar%20Navin%20Nagar%20Kakadeo%20Kanpur%20Uttar%20Pradesh%20208025",
    status: "open",
  },
  {
    id: "greater-noida",
    branch: "Greater Noida",
    image: "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1783162431/greater-noida_igf980.png",
    address:
      "2nd floor, AA-007, Block A, Ansal Golf Link-1, Greater Noida, Uttar Pradesh 201315",
    contacts: ["+91 91983 50985", "+91 9198350980"],
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=2nd%20floor%20AA-007%20Block%20A%20Ansal%20Golf%20Link-1%20Greater%20Noida%20Uttar%20Pradesh%20201315",
    status: "open",
  },
  {
    id: "gorakhpur",
    branch: "Gorakhpur",
    image: "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1783162422/gorakhpur_nwyilm.png",
    address: "Coming soon",
    contacts: [],
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Gorakhpur",
    status: "open",
  },
  {
    id: "indore",
    branch: "Indore",
    image: "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1783162423/indore_ebiutj.png",
    address: "402 Apollo Trade Center, Geeta Bhawan Square, Indore",
    contacts: ["+91 9198350983", "+91 9198350987"],
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=402%20Apollo%20Trade%20Center%20Geeta%20Bhawan%20Square%20Indore",
    status: "open",
  },
];
