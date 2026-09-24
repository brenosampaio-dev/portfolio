const REASON_LABELS = Object.freeze({
  "product-design": "Product design",
  "frontend-role": "Frontend / Design Engineer role",
  collaboration: "Collaboration",
  other: "Something else",
});

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const clean = (value, maximum) => String(value || "").trim().slice(0, maximum);

function validPayload(payload) {
  return payload.name.length >= 2
    && payload.name.length <= 80
    && payload.email.length <= 254
    && EMAIL_PATTERN.test(payload.email)
    && Object.hasOwn(REASON_LABELS, payload.reason)
    && payload.message.length >= 20
    && payload.message.length <= 3000;
}

export async function POST(request) {
  let raw;
  try {
    raw = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const payload = {
    name: clean(raw.name, 81),
    email: clean(raw.email, 255),
    reason: clean(raw.reason, 64),
    message: clean(raw.message, 3001),
    website: clean(raw.website, 200),
  };

  if (payload.website) return Response.json({ ok: true });
  if (!validPayload(payload)) return Response.json({ ok: false, error: "invalid" }, { status: 400 });

  const formId = process.env.FORMSPREE_FORM_ID;
  if (!formId || !/^[a-zA-Z0-9_-]+$/.test(formId)) {
    return Response.json({ ok: false, error: "unavailable" }, { status: 503 });
  }

  const reason = REASON_LABELS[payload.reason];
  const delivery = new FormData();
  delivery.set("name", payload.name);
  delivery.set("email", payload.email);
  delivery.set("reason", reason);
  delivery.set("message", payload.message);
  delivery.set("_replyto", payload.email);
  delivery.set("_subject", `Portfolio contact — ${reason} — ${payload.name}`);

  try {
    const response = await fetch(`https://formspree.io/f/${formId}`, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: delivery,
    });

    if (!response.ok) return Response.json({ ok: false, error: "delivery" }, { status: 502 });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: "delivery" }, { status: 502 });
  }
}
