const OPEN_INCIDENTS_QUERY = `SELECT
  i.id,
  i.priority,
  i.status,
  u.display_name AS owner,
  i.next_action,
  i.updated_at
FROM incidents AS i
LEFT JOIN users AS u ON u.id = i.owner_id
WHERE i.status IN ('open', 'assigned', 'in_progress', 'escalated')
ORDER BY
  CASE i.priority
    WHEN 'urgent' THEN 1
    WHEN 'high' THEN 2
    ELSE 3
  END,
  i.updated_at ASC;`;

const INTAKE_PAYLOAD = `{
  "channel": "web_form",
  "received_at": "2026-07-18T08:42:00Z",
  "customer_reference": null,
  "message": "Le radiateur ne chauffe pas dans la chambre 214.",
  "attachments": []
}`;

export function ServiceSqlSpecimen() {
  const { t } = useI18n();
  const copy = t.specimens.technical.service;
  return (
    <figure className="technical-artifact">
      <figcaption>
        <span className="technical-artifact__eyebrow">{copy.eyebrow}</span>
        <strong>{copy.title}</strong>
        <span>{copy.note}</span>
      </figcaption>
      <pre className="technical-artifact__code">
        <code>{OPEN_INCIDENTS_QUERY}</code>
      </pre>
    </figure>
  );
}

export function TriagePayloadSpecimen() {
  const { t } = useI18n();
  const copy = t.specimens.technical.triage;
  return (
    <figure className="technical-artifact">
      <figcaption>
        <span className="technical-artifact__eyebrow">{copy.eyebrow}</span>
        <strong>{copy.title}</strong>
        <span>{copy.note}</span>
      </figcaption>
      <pre className="technical-artifact__code">
        <code>{INTAKE_PAYLOAD}</code>
      </pre>
      <div className="technical-artifact__tableWrap">
        <table className="technical-artifact__table">
          <caption className="sr-only">{copy.caption}</caption>
          <thead>
            <tr>
              {copy.headers.map((header) => <th scope="col" key={header}>{header}</th>)}
            </tr>
          </thead>
          <tbody>
            {copy.rows.map(([field, origin, required, failure]) => (
              <tr key={field}>
                <th scope="row"><code>{field}</code></th>
                <td>{origin}</td>
                <td>{required}</td>
                <td>{failure}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}
import { useI18n } from "@/lib/useI18n";
