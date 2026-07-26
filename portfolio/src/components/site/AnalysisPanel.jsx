import { Confidence } from "./Confidence";
import { useI18n } from "@/lib/useI18n";

/*
 * AnalysisPanel — the signature screen, built as real UI in code. A case opened
 * for review: the incoming message on the left, the AI's reading of it on the
 * right (language, intent, what triggered the urgency, what's still missing),
 * with confidence in plain view. Because the reviewer may not read the
 * customer's language, the drafted reply is shown in that language alongside a
 * back-translation — so the human verifies meaning and tone, not blind-trusts.
 * The primary action is Review, not Send: nothing leaves without a human.
 */
export function AnalysisPanel() {
  const { t } = useI18n();
  const copy = t.specimens.triage.analysis;
  return (
    <div className="apanel">
      {/* Incoming message */}
      <div className="apanel__msg">
        <div className="apanel__msghead">
          <span className="apanel__from">{copy.from}</span>
          <span className="apanel__time">{copy.time}</span>
        </div>
        <p className="apanel__text" lang="es">
          “No recibí el reembolso de mi reserva cancelada. ¿Pueden revisarlo hoy, por favor?”
        </p>
        <span className="apanel__lang">{copy.detectedLanguage}</span>
      </div>

      {/* AI reading */}
      <div className="apanel__read">
        <div className="apanel__readhead">
          <span className="apanel__eyebrow">{copy.analysis}</span>
          <Confidence level="low" />
        </div>

        <dl className="apanel__facts">
          <div className="apanel-fact">
            <dt>{copy.intentLabel}</dt>
            <dd>{copy.intent}</dd>
          </div>
          <div className="apanel-fact">
            <dt>{copy.urgencyLabel}</dt>
            <dd>
              {copy.urgency} <span className="apanel-fact__why">{copy.urgencyWhy}</span>
            </dd>
          </div>
          <div className="apanel-fact">
            <dt>{copy.missingLabel}</dt>
            <dd className="apanel-fact__missing">{copy.missing}</dd>
          </div>
        </dl>

        {/* Drafted reply + back-translation — verify across the language */}
        <div className="apanel__reply">
          <span className="apanel__replylabel">{copy.proposedReply}</span>
          <p className="apanel__replytext" lang="es">
            “Lamento lo ocurrido. Para localizar tu reembolso, ¿puedes compartir el número de reserva?”
          </p>
          <span className="apanel__replylabel apanel__replylabel--back">{copy.backTranslation}</span>
          <p className="apanel__replytext apanel__replytext--back" lang={t.locale}>
            {copy.backTranslationText}
          </p>
        </div>

        {/* Action — review is primary, send is gated behind it */}
        <div className="apanel__actions">
          <span className="apanel__btn apanel__btn--primary">{copy.review}</span>
          <span className="apanel__btn apanel__btn--ghost">{copy.correct}</span>
          <span className="apanel__gate">{copy.gate}</span>
        </div>
      </div>
    </div>
  );
}
