/*
 * Confidence — the signal at the heart of TriageAI: the AI never pretends to be
 * certain. Three calm levels, built only from the existing palette so it stays
 * on-brand: High reads settled (neutral + slate dot), Needs review asks for a
 * human (slate accent), Low is the one genuine caution (alert vermilion) — the
 * state the whole tool exists to catch.
 */
import { useI18n } from "@/lib/useI18n";

export function Confidence({ level = "high", className = "" }) {
  const { t } = useI18n();
  const labels = t.specimens.triage.confidence;
  return (
    <span className={`conf conf--${level}${className ? ` ${className}` : ""}`}>
      <span className="conf__dot" aria-hidden="true" />
      {labels[level] || labels.high}
    </span>
  );
}
