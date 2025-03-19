import { AlertCircle, ExternalLink } from "lucide-react";

export const Icons = {
  externalLink: ExternalLink,
  error: AlertCircle,
};

export type Icon = keyof typeof Icons;
