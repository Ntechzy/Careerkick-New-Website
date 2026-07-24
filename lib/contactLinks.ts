export const CONTACT_NUMBERS = {
  primaryDisplay: "+91 91983 50985",
  primaryDigits: "9198350985",
  secondaryDisplay: "+91 9198350980",
  secondaryDigits: "9198350980",
} as const;

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/careerkickservices/?hl=en",
  youtube: "https://www.youtube.com/@careerkickneet",
  facebook: "https://www.facebook.com/CAREERKICKSERVICES/",
} as const;

export const SOCIAL_ICON_URLS = {
  youtube: "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1783319541/youtube_1_zggtor.png",
  instagram: "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1783319239/instagram_c0kdq3.png",
  facebook: "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1783319278/facebook_uwlmq4.png",
  whatsapp: "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1783077224/vecteezy_whatsapp-logo-social-icon-3d-web-button_52112852_io1hcv.png",
} as const;

export function getWhatsAppLink(message = "Hello, I want to start my counselling journey.") {
  return `https://wa.me/91${CONTACT_NUMBERS.primaryDigits.slice(2)}?text=${encodeURIComponent(message)}`;
}

export function getTelLink(digits: string) {
  return `tel:+${digits}`;
}
