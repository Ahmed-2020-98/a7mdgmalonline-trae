import type { StaticImageData } from "next/image";

export type NavItem = {
  label: string;
  href: string;
};

export type HeaderCta = {
  label: string;
  href: string;
};

export type HeaderLabels = {
  menu: string;
};

export type HeroContent = {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  imageSrc: StaticImageData | string;
  imageAlt: string;
};

export type AboutContent = {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  imageSrc: StaticImageData;
  imageAlt: string;
};

export type Service = {
  id?: string;
  title: string;
  description: string;
  icon: ServiceIconName;
};

export type ServiceIconName =
  | "info-site"
  | "cart-basket"
  | "wordpress"
  | "next-laravel";

export type Project = {
  id?: string;
  name: string;
  description: string;
  images: Array<StaticImageData | string>;
  url: string;
  ctaLabel: string;
  category: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Testimonial = {
  name: string;
  comment: string;
  avatarSrc: StaticImageData;
};

export type Client = {
  id?: string;
  name: string;
  logoSrc: StaticImageData | string;
};

export type ContactInfo = {
  phone: string;
  email: string;
  address: string;
};

export type ContactInfoLabels = {
  phone: string;
  email: string;
  address: string;
};

export type ContactField = {
  name: string;
  label: string;
  placeholder: string;
  type: "text" | "email" | "tel";
  required: boolean;
  as?: "textarea";
};

export type ContactFormContent = {
  submitLabel: string;
  helperText: string;
};

export type SectionIntro = {
  title: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  locale: string;
  footerNote: string;
};
