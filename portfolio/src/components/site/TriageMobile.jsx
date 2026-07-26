import { Confidence } from "./Confidence";

/*
 * TriageMobile — reviewing on the go, as real UI in code. The same control
 * principle on a phone: confidence in plain view, the case readable at a
 * glance, and the two actions that matter — approve or correct. Goes inside a
 * PhoneFrame. Quick to act on, impossible to send by accident.
 */
export function TriageMobile() {
  return (
    <div className="treview">
      <div className="treview__bar">
        <span className="treview__back" aria-hidden="true">←</span>
        <span className="treview__barTitle">Review</span>
        <Confidence level="review" />
      </div>
      <div className="treview__body">
        <span className="treview__tags">
          <span className="treview-tag">FR</span>
          <span className="treview-tag">Maintenance</span>
          <span className="treview-tag treview-tag--med">Priority: Medium</span>
        </span>
        <p className="treview__msg" lang="fr">
          “Le radiateur ne chauffe pas dans la chambre 214.”
        </p>

        <div className="treview__draft">
          <span className="treview__draftlabel">Proposed reply · FR</span>
          <p className="treview__drafttext" lang="fr">
            “Merci de nous l’avoir signalé. Je vérifie la disponibilité de la maintenance et je reviens vers vous avec un délai confirmé.”
          </p>
          <span className="treview__back-en">EN · “Thanks for flagging it. I’m checking maintenance availability and will confirm a timeframe.”</span>
        </div>

        <div className="treview__actions">
          <span className="treview__approve">Approve</span>
          <span className="treview__correct">Correct</span>
        </div>
      </div>
    </div>
  );
}
