import { Confidence } from "./Confidence";
import { useI18n } from "@/lib/useI18n";

/*
 * TriageInbox — the concept's core screen, rendered as real UI in code (not a
 * screenshot). Multilingual requests arrive unranked; the inbox structures them
 * and pulls anything the AI is unsure about to the top, flagged for a human.
 * The confidence signal is in plain view on every row — the opposite of a
 * confident black box. Built from the same tokens as the rest of the site.
 */
export function TriageInbox() {
  const { t } = useI18n();
  const copy = t.specimens.triage.inbox;
  return (
    <div className="triage">
      <div className="triage__head">
        <div>
          <span className="triage__eyebrow">{copy.eyebrow}</span>
          <span className="triage__title">{copy.title}</span>
        </div>
        <span className="triage__flagcount">{copy.flagCount}</span>
      </div>

      <ul className="triage__list">
        {copy.queue.map((q, i) => (
          <li
            className={`triage-row${q.conf === "low" ? " triage-row--low" : ""}${
              q.conf === "review" ? " triage-row--review" : ""
            }`}
            key={i}
          >
            <span className="triage-row__rail" aria-hidden="true" />
            <div className="triage-row__main">
              <span className="triage-row__msg" lang={q.locale}>{q.msg}</span>
              <span className="triage-row__meta">
                <span className="triage-row__lang">{q.lang}</span>
                <span className="triage-row__sep" aria-hidden="true">·</span>
                {q.channel}
                <span className="triage-row__sep" aria-hidden="true">·</span>
                {q.intent}
              </span>
            </div>
            <Confidence level={q.conf} />
          </li>
        ))}
      </ul>
    </div>
  );
}
