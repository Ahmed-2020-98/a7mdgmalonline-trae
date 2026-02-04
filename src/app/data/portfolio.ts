import { Project } from "../lib/types";
import projectPlaceholder from "@/assets/images/project-placeholder.svg";

export const projects: Project[] = [
  {
    name: "منصة رِواء العقارية",
    description:
      "تجربة بحث متقدمة تعرض العقارات بأسلوب بصري جذاب مع خرائط تفاعلية.",
    images: [projectPlaceholder],
    url: "https://example.com",
    ctaLabel: "زيارة الموقع",
  },
  {
    name: "متجر نُدى للعناية",
    description:
      "هوية متجر إلكتروني أنيقة مع مسار شراء سريع وواجهة متجاوبة بالكامل.",
    images: [projectPlaceholder],
    url: "https://example.com",
    ctaLabel: "زيارة الموقع",
  },
  {
    name: "بوابة شركاء أفق",
    description:
      "لوحة شركاء تربط الخدمات مع العملاء عبر واجهة حديثة قابلة للتطوير.",
    images: [projectPlaceholder],
    url: "https://example.com",
    ctaLabel: "زيارة الموقع",
  },
];
