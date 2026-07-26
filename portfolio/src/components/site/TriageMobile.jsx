import { Confidence } from "./Confidence";
import { useI18n } from "@/lib/useI18n";

/*
 * TriageMobile — reviewing on the go, as real UI in code. The same control
 * principle on a phone: confidence in plain view, the case readable at a
 * glance, and the two actions that matter — approve or correct. Goes inside a
 * PhoneFrame. Quick to act on, impossible to send by accident.
 */
export function TriageMobile() {
  const { t } = useI18n();
  const copy = t.specimens.triage.mobile;
  return (
    <div className="treview">
      <div className="treview__bar">
        <span className="treview__back" aria-hidden="true">←</span>
        <span className="treview__barTitle">{copy.title}</span>
        <Confidence level="review" />
      </div>
      <div className="treview__body">
        <span className="treview__tags">
          <span className="treview-tag">FR</span>
          <span className="treview-tag">{copy.maintenance}</span>
          <span className="treview-tag treview-tag--med">{copy.priority}</span>
        </span>
        <p className="treview__msg" lang="fr">{copy.message}</p>

        <div className="treview__draft">
          <span className="treview__draftlabel">{copy.replyLabel}</span>
          <p className="treview__drafttext" lang="fr">{copy.reply}</p>
          <span className="treview__back-en">{copy.backTranslation}</span>
        </div>

        <div className="treview__actions">
          <span className="treview__approve">{copy.approve}</span>
          <span className="treview__correct">{copy.correct}</span>
        </div>
      </div>
    </div>
  );
}
