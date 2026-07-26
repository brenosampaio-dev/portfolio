/*
 * MobileLog — the guided-logging screen, rendered as real UI in code.
 * Shows the "structured fields, not a free-text box" decision on a phone:
 * fast, constrained, consistent. Goes inside a PhoneFrame.
 */
export function MobileLog() {
  const { t } = useI18n();
  const copy = t.specimens.service.mobile;
  return (
    <div className="mlog">
      <div className="mlog__bar">
        <span className="mlog__back" aria-hidden="true">←</span>
        <span className="mlog__barTitle">{copy.title}</span>
      </div>
      <div className="mlog__body">
        <span className="mlog__eyebrow">{copy.eyebrow}</span>
        <div className="mlog__fields">
          {copy.fields.map((f) => (
            <div className="mlog-field" key={f.key}>
              <span className="mlog-field__key">{f.key}</span>
              <span className={`mlog-field__chip${f.urgent ? " mlog-field__chip--urgent" : ""}`}>
                {f.value}
              </span>
            </div>
          ))}
        </div>
        <div className="mlog__note">
          <span className="mlog-field__key">{copy.description}</span>
          <p className="mlog__noteText">{copy.note}</p>
        </div>
        <span className="mlog__save">{copy.save}</span>
      </div>
    </div>
  );
}
import { useI18n } from "@/lib/useI18n";
