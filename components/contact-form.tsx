"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";

type FormStatus = "idle" | "error" | "success";

/**
 * Minimal contact form with visible focus and empty/error/success states.
 * Validation only — wire `onSubmit` to a real handler (Formspree, API route, …).
 */
export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<FormStatus>("idle");

  const setField = (key: keyof typeof form, value: string) => {
    setForm((s) => ({ ...s, [key]: value }));
    if (status !== "idle") setStatus("idle");
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const { name, email, message } = form;
    const validEmail = /.+@.+\..+/.test(email.trim());
    if (!name.trim() || !email.trim() || !message.trim() || !validEmail) {
      setStatus("error");
      return;
    }
    setStatus("success");
  };

  return (
    <form onSubmit={submit} noValidate style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "420px" }}>
      <TextField label="Name" name="name" value={form.name} onChange={(e) => setField("name", e.target.value)} containerStyle={{ maxWidth: "100%" }} />
      <TextField label="Email" type="email" name="email" value={form.email} onChange={(e) => setField("email", e.target.value)} containerStyle={{ maxWidth: "100%" }} />
      <div>
        <label htmlFor="cf-message" style={{ display: "block", marginBottom: "8px", fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 500, color: "var(--ink)" }}>
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={4}
          value={form.message}
          onChange={(e) => setField("message", e.target.value)}
          style={{
            width: "100%",
            fontFamily: "var(--font-sans)",
            fontSize: "16px",
            color: "var(--ink)",
            background: "var(--ivory)",
            border: "1px solid var(--stone)",
            borderRadius: "var(--radius-sm)",
            padding: "12px 14px",
            outline: "none",
            resize: "vertical",
            transition: "border-color var(--duration-base) var(--ease-smooth), box-shadow var(--duration-base) var(--ease-smooth)",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "var(--moss)";
            e.currentTarget.style.boxShadow = "0 0 0 3px var(--ring-moss)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "var(--stone)";
            e.currentTarget.style.boxShadow = "none";
          }}
        />
      </div>
      {status === "error" && (
        <p role="alert" style={{ margin: 0, display: "flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-sans)", fontSize: "14px", color: "var(--vermilion)" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "999px", background: "var(--vermilion)" }} />
          Please complete every field with a valid email.
        </p>
      )}
      {status === "success" && (
        <p role="status" style={{ margin: 0, display: "flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-sans)", fontSize: "14px", color: "var(--moss)" }}>
          <span style={{ color: "var(--moss)" }}>✓</span>
          Thanks — your message is ready to send. [Wire this to a real handler.]
        </p>
      )}
      <div>
        <Button variant="primary" type="submit">
          Send message
        </Button>
      </div>
    </form>
  );
}
