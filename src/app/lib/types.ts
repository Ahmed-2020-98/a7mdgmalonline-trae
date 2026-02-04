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
  imageSrc: string;
  imageAlt: string;
};

export type AboutContent = {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
};

export type Service = {
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
  name: string;
  description: string;
  images: string[];
  url: string;
  ctaLabel: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Testimonial = {
  name: string;
  comment: string;
  avatarSrc: string;
};

export type Client = {
  name: string;
  logoSrc: string;
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
