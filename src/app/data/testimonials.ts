import { Testimonial } from "../lib/types";
import avatarFemale from "@/assets/images/avatar-female.svg";
import avatarMale from "@/assets/images/avatar-male.svg";

export const testimonials: Testimonial[] = [
  {
    name: "سارة المنصور",
    comment:
      "التجربة كانت احترافية من البداية، والنتيجة تجاوزت توقعاتنا بالكامل.",
    avatarSrc: avatarFemale,
  },
  {
    name: "أحمد القحطاني",
    comment:
      "فريق سريع الاستجابة، التصميم أنيق والموقع أصبح أكثر إقناعاً للعملاء.",
    avatarSrc: avatarMale,
  },
  {
    name: "ريم الحارثي",
    comment:
      "تنظيم ممتاز في العمل، والواجهات متجاوبة بشكل رائع على الجوال.",
    avatarSrc: avatarFemale,
  },
  {
    name: "خالد العتيبي",
    comment:
      "خدمة متكاملة من الاستشارة حتى الإطلاق، مع عناية واضحة بالتفاصيل.",
    avatarSrc: avatarMale,
  },
];
