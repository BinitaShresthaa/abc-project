import type { Metadata } from "next";
import ContactPage from "@/components/contact/ContactPage";

export const metadata: Metadata = {
  title: "Contact Person — Aadikavi Bhanubhakta Campus",
  description:
    "Reach the Faculty Focal persons and Heads of Department at Aadikavi Bhanubhakta Campus.",
};

// This route renders ONLY the page content below.
// Drop it inside your existing layout.tsx (which already has your navbar/footer)
// and it will inherit them automatically — no need to duplicate anything here.
export default function Page() {
  return <ContactPage />;
}
