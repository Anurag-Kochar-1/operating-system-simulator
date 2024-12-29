import { LucideProps } from "lucide-react";

export function Icon({ icon: Icon }: { icon: React.FC<LucideProps> }) {
  return <Icon size={50} />;
}
