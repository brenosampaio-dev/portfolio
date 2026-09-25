import { createHmac, randomBytes } from "node:crypto";

const REASON_LABELS = Object.freeze({
  "product-design": "Product design",
  "frontend-role": "Frontend / Design Engineer role",
  collaboration: "Collaboration",
  other: "Something else",
});

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_SUBMISSIONS = 3;
const RATE_LIMIT_MAX_CLIENTS = 5000;
const RATE_LIMIT_SALT = randomBytes(32);
const rateLimitBuckets = new Map();

const clean = (value, maximum) => String(value || "").trim().slice(0, maximum);

function clientFingerprint(request) {
  const address = request.headers.get("x-vercel-forwarded-for")
    || request.headers.get("x-forwarded-for")
    || request.headers.get("x-real-ip")
    || "unknown";
  return createHmac("sha256", RATE_LIMIT_SALT).update(address).digest("hex");
}

function pruneRateLimitBuckets(now) {
  for (const [key, bucket] of rateLimitBuckets) {
    if (bucket.resetAt <= now) rateLimitBuckets.delete(key);
  }

  while (rateLimitBuckets.size > RATE_LIMIT_MAX_CLIENTS) {
    rateLimitBuckets.delete(rateLimitBuckets.keys().next().value);
  }
}

function consumeSubmissionAllowance(request) {
  const now = Date.now();
  pruneRateLimitBuckets(now);
  const key = clientFingerprint(request);
  const current = rateLimitBuckets.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitBuckets.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }

  if (current.count >= RATE_LIMIT_MAX_SUBMISSIONS) {
    return {
      allowed: false,
      retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  return { allowed: true };
}

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

  const allowance = consumeSubmissionAllowance(request);
  if (!allowance.allowed) {
    return Response.json(
      { ok: false, error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(allowance.retryAfter) } },
    );
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
