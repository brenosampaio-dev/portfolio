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

const contractRows = [
  ["channel", "Channel integration", "Yes", "Recoverable intake queue"],
  ["message", "Inbound channel", "Yes", "Reject payload with a field error"],
  ["customer_reference", "Customer", "No", "Create an information task"],
  ["detected_language", "Classification", "Yes", "Route to human review"],
  ["confidence", "Classification", "Yes", "Apply the review threshold"],
];

export function ServiceSqlSpecimen() {
  return (
    <figure className="technical-artifact">
      <figcaption>
        <span className="technical-artifact__eyebrow">Data retrieval specimen</span>
        <strong>Proposed SQL for the “Open now” handover view</strong>
        <span>
          A reduced query makes filtering and priority order explicit. The schema is conceptual,
          and this is not a production database query.
        </span>
      </figcaption>
      <pre className="technical-artifact__code">
        <code>{OPEN_INCIDENTS_QUERY}</code>
      </pre>
    </figure>
  );
}

export function TriagePayloadSpecimen() {
  return (
    <figure className="technical-artifact">
      <figcaption>
        <span className="technical-artifact__eyebrow">Input contract specimen</span>
        <strong>Reduced request payload and failure rules</strong>
        <span>
          The payload is illustrative. It defines the boundary between a channel integration and
          the triage workflow; no live API is connected.
        </span>
      </figcaption>
      <pre className="technical-artifact__code">
        <code>{INTAKE_PAYLOAD}</code>
      </pre>
      <div className="technical-artifact__tableWrap">
        <table className="technical-artifact__table">
          <caption className="sr-only">Triage intake field contract</caption>
          <thead>
            <tr>
              <th scope="col">Field</th>
              <th scope="col">Origin</th>
              <th scope="col">Required</th>
              <th scope="col">Failure path</th>
            </tr>
          </thead>
          <tbody>
            {contractRows.map(([field, origin, required, failure]) => (
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
