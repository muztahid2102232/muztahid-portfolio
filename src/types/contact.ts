export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactInfoItem {
  icon: "mail" | "map-pin" | "clock" | "sparkles";
  label: string;
  value: string;
  href?: string;
  actionText?: string;
}

