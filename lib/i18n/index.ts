import en from "@/lib/i18n/en.json";
import fr from "@/lib/i18n/fr.json";
import type { PaymentStatus } from "@/lib/supabase/ecosystem";

export type Locale = "en" | "fr";

export const dictionaries = { en, fr } satisfies Record<Locale, typeof en>;

export type Dictionary = typeof en;

export function getDictionary(locale: string | undefined): Dictionary {
  return locale === "fr" ? dictionaries.fr : dictionaries.en;
}

export function translatePaymentStatus(status: PaymentStatus, dict: Dictionary): string {
  return dict.status.paymentStatus[status];
}

export function translateAction(action: string, dict: Dictionary): string {
  return dict.status.actions[action as keyof Dictionary["status"]["actions"]] ?? action;
}
