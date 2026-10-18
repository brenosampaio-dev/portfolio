import { afterEach, describe, expect, it, vi } from "vitest";
import { DELETE, GET, PATCH, POST, PUT } from "@/app/api/contact/route";

const requestWith = (payload, headers = {}) => ({
  json: async () => payload,
  headers: new Headers(headers),
});

const validPayload = {
  name: "Alex Morgan",
  email: "alex@example.com",
  reason: "product-design-role",
  message: "I would like to discuss a product design role.",
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
      reason: "Product Design role",
      message: "I would like to discuss a product design role.",
      _replyto: "alex@example.com",
      _subject: "Portfolio contact — Product Design role — Alex Morgan",
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

  it("blocks requests originating from unauthorized external origins", async () => {
    const response = await POST(requestWith(validPayload, { origin: "https://malicious-site.example" }));

    expect(response.status).toBe(403);
    expect(await response.json()).toEqual({ ok: false, error: "forbidden" });
  });

  it("permits submissions from authorized production and preview domains", async () => {
    process.env.FORMSPREE_FORM_ID = "portfolio-form";
    const delivery = vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }));
    vi.stubGlobal("fetch", delivery);

    const response = await POST(requestWith(validPayload, {
      origin: "https://brenosampaio.vercel.app",
      "x-vercel-forwarded-for": "198.51.100.42",
    }));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
  });

  it("sanitizes newline characters from header fields to prevent email header injection", async () => {
    process.env.FORMSPREE_FORM_ID = "portfolio-form";
    const delivery = vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }));
    vi.stubGlobal("fetch", delivery);

    const injectedPayload = {
      ...validPayload,
      name: "Attacker\r\nBcc: evil@example.com",
      email: "clean@example.com\r\n",
    };

    const response = await POST(requestWith(injectedPayload, { "x-vercel-forwarded-for": "198.51.100.99" }));
    expect(response.status).toBe(200);

    const [, options] = delivery.mock.calls[0];
    const body = Object.fromEntries(options.body.entries());
    expect(body.name).toBe("Attacker  Bcc: evil@example.com");
    expect(body.email).toBe("clean@example.com");
    expect(body._replyto).toBe("clean@example.com");
    expect(body._subject).toContain("Attacker  Bcc: evil@example.com");
    expect(body._subject).not.toMatch(/[\r\n]/);
  });

  it("returns 405 Method Not Allowed with Allow header on unsupported methods", async () => {
    const methods = [GET, PUT, DELETE, PATCH];

    for (const method of methods) {
      const response = await method();
      expect(response.status).toBe(405);
      expect(response.headers.get("Allow")).toBe("POST");
      expect(await response.json()).toEqual({ ok: false, error: "method_not_allowed" });
    }
  });
});
