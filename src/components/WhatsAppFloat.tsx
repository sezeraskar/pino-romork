import { WhatsAppIcon } from "./icons";

export default function WhatsAppFloat({ whatsapp }: { whatsapp: string }) {
  return (
    <a
      href={whatsapp}
      className="wa-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ile iletişime geçin"
    >
      <WhatsAppIcon />
    </a>
  );
}
