import {
  ContactField,
  ContactFormContent,
  ContactInfo,
  ContactInfoLabels,
} from "../lib/types";

export const contactInfo: ContactInfo = {
  phone: "+966 500 000 000",
  email: "info@antigravity.sa",
  address: "الرياض، حي العليا، شارع الملك فهد",
};

export const contactInfoLabels: ContactInfoLabels = {
  phone: "الهاتف",
  email: "البريد الإلكتروني",
  address: "العنوان",
};

export const contactFields: ContactField[] = [
  {
    name: "name",
    label: "الاسم الكامل",
    placeholder: "أدخل اسمك الكامل",
    type: "text",
    required: true,
  },
  {
    name: "email",
    label: "البريد الإلكتروني",
    placeholder: "example@email.com",
    type: "email",
    required: true,
  },
  {
    name: "phone",
    label: "رقم الجوال",
    placeholder: "05xxxxxxxx",
    type: "tel",
    required: false,
  },
  {
    name: "message",
    label: "رسالتك",
    placeholder: "شاركنا تفاصيل مشروعك",
    type: "text",
    required: true,
    as: "textarea",
  },
];

export const contactFormContent: ContactFormContent = {
  submitLabel: "أرسل الطلب",
  helperText: "سيتم التواصل معك خلال يوم عمل واحد.",
};
