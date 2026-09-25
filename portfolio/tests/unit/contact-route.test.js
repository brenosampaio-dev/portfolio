import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/contact/route";

const requestWith = (payload, headers = {}) => ({
  json: async () => payload,
  headers: new Headers(headers),
});

const validPayload = {
  name: "Alex Morgan",
  email: "alex@example.com",
  reason: "frontend-role",
  message: "I would like to discuss an accessible frontend role.",
  website: "",
};

afterEach(() => {
  vi.unstubAllGlobals();
  delete process.env.FORMSPREE_FORM_ID;
});

describe("contact delivery route", () => {
  it("rejects an empty JSON body as an invalid submission", async () => {
    const response = await POST(requestWith(null));

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ ok: false, error: "invalid" });
  });

  it("rejects malformed submissions before contacting the delivery service", async () => {
    const delivery = vi.fn();
    vi.stubGlobal("fetch", delivery);

    const response = await POST(requestWith({ ...validPayload, email: "not-an-email", message: "short" }));

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ ok: false, error: "invalid" });
    expect(delivery).not.toHaveBeenCalled();
  });

  it("silently accepts honeypot submissions without delivering them", async () => {
    const delivery = vi.fn();
    vi.stubGlobal("fetch", delivery);

    const response = await POST(requestWith({ ...validPayload, website: "https://spam.example" }));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(delivery).not.toHaveBeenCalled();
  });

  it("forwards a valid submission to the configured Formspree form", async () => {
    process.env.FORMSPREE_FORM_ID = "portfolio-form";
    const delivery = vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }));
    vi.stubGlobal("fetch", delivery);

    const response = await POST(requestWith(validPayload, { "x-vercel-forwarded-for": "198.51.100.10" }));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(delivery).toHaveBeenCalledTimes(1);
    const [url, options] = delivery.mock.calls[0];
    expect(url).toBe("https://formspree.io/f/portfolio-form");
    expect(options.method).toBe("POST");
    expect(options.headers).toEqual({ Accept: "application/json" });
    expect(Object.fromEntries(options.body.entries())).toEqual({
      name: "Alex Morgan",
      email: "alex@example.com",
      reason: "Frontend / Design Engineer role",
      message: "I would like to discuss an accessible frontend role.",
      _replyto: "alex@example.com",
      _subject: "Portfolio contact — Frontend / Design Engineer role — Alex Morgan",
    });
  });

  it("limits repeated valid submissions from the same client before delivery", async () => {
    process.env.FORMSPREE_FORM_ID = "portfolio-form";
    const delivery = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubGlobal("fetch", delivery);
    const headers = { "x-vercel-forwarded-for": "203.0.113.25" };

    for (let attempt = 0; attempt < 3; attempt += 1) {
      const response = await POST(requestWith(validPayload, headers));
      expect(response.status).toBe(200);
    }

    const blocked = await POST(requestWith(validPayload, headers));
    expect(blocked.status).toBe(429);
    expect(blocked.headers.get("retry-after")).toBeTruthy();
    expect(await blocked.json()).toEqual({ ok: false, error: "rate_limited" });
    expect(delivery).toHaveBeenCalledTimes(3);
  });
});
