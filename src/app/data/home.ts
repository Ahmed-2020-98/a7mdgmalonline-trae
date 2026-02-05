import { AboutContent, HeroContent } from "../lib/types";
import heroImage from "@/assets/images/hero.webp";
import aboutImage from "@/assets/images/about.svg";

export const heroContent: HeroContent = {
  title: "نبني حضورك الرقمي بثقة وأناقة",
  description:
    "منصات تعريفية وتجارية مصممة لتجذب العملاء وتحوّل الزيارات إلى فرص حقيقية.",
  ctaLabel: "ابدأ مشروعك الآن",
  ctaHref: "#contact",
  secondaryCtaLabel: "شاهد أعمالنا",
  secondaryCtaHref: "#portfolio",
  imageSrc: heroImage,
  imageAlt: "تصميم مواقع وتطبيقات موبايل بواجهة حديثة",
};

export const aboutContent: AboutContent = {
  title: "من نحن",
  description:
    "فريق تصميم وتطوير متخصص في بناء واجهات عالية الأداء وتجربة مستخدم احترافية تدعم نمو علامتك التجارية.",
  ctaLabel: "تعرف أكثر",
  ctaHref: "#services",
  imageSrc: aboutImage,
  imageAlt: "فريق يعمل على التخطيط والتصميم",
};
