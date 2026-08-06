import { site } from "@/lib/content";
import { WhatsAppIcon } from "./icons";

export default function WhatsAppFloat() {
  return (
    <a
      href={site.whatsapp}
      className="wa-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ile iletişime geçin"
    >
      <WhatsAppIcon />
    </a>
  );
}
