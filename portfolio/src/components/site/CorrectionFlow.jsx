/*
 * CorrectionFlow — the state almost no one designs: the AI got it wrong, and a
 * human caught it. The classification is shown being overridden — wrong reading
 * struck through, the human's correction in its place — because the recovery
 * path is what makes the tool trustworthy, not the happy path. Real UI in code.
 */
export function CorrectionFlow() {
  const { t } = useI18n();
  const copy = t.specimens.triage.correction;
  return (
    <div className="correction">
      <div className="correction__case">
        <span className="correction__id">REQ-4471 · FR</span>
        <p className="correction__msg" lang="fr">
          “C’est la troisième fois que je signale ce problème et personne ne répond.”
        </p>
      </div>

      <div className="correction__rows">
        <div className="correction-row">
          <span className="correction-row__key">{copy.aiRead}</span>
          <span className="correction-row__was">{copy.aiValue}</span>
        </div>
        <span className="correction__arrow" aria-hidden="true">↓</span>
        <div className="correction-row">
          <span className="correction-row__key">{copy.humanCorrected}</span>
          <span className="correction-row__now">{copy.humanValue}</span>
        </div>
      </div>

      <p className="correction__note">{copy.note}</p>
    </div>
  );
}
import { useI18n } from "@/lib/useI18n";
