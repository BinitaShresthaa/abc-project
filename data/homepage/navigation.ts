export interface NavLink {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Alumni", href: "/almuni/almuni-login" },
  { label: "Campaigns", href: "/campaigns" },
  { label: "Contact", href: "/contact" },
];
