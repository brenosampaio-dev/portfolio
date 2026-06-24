import Link from "next/link";
import { Text, Tag, Status, Button, Divider, QuoteBlock } from "@/components/ds";
import { Reveal } from "@/components/site/Reveal";
import { Scramble } from "@/components/site/Scramble";
import { Collapsible } from "@/components/site/Collapsible";
import { Icon } from "@/components/site/Icon";
import { DecisionsLedger } from "@/components/site/DecisionsLedger";
import { BrowserFrame } from "@/components/site/BrowserFrame";
import { PhoneFrame } from "@/components/site/PhoneFrame";
import { Confidence } from "@/components/site/Confidence";
import { TriageInbox } from "@/components/site/TriageInbox";
import { ChannelScatter } from "@/components/site/ChannelScatter";
import { SystemFlow } from "@/components/site/SystemFlow";
import { TriageFlow } from "@/components/site/TriageFlow";
import { AnalysisPanel } from "@/components/site/AnalysisPanel";
import { CorrectionFlow } from "@/components/site/CorrectionFlow";
import { TriageStates } from "@/components/site/TriageStates";
import { TriageMobile } from "@/components/site/TriageMobile";
import { CountUp } from "@/components/site/CountUp";

export const metadata = {
  title: "TriageAI",
  description:
    "Concept case — human-controlled AI intake for multilingual service requests. AI structures and ranks; a human approves every reply that goes out.",
};

const decisions = [
  {
    name: "The AI shows how sure it is — it never pretends to be certain.",
    problem:
      "Most AI tools present output as fact. People rubber-stamp it, and wrong classifications slip straight to the customer.",
    decision:
      "Every classification carries a confidence signal. Low-confidence items are flagged “needs review” and pulled to the top of attention, not blended in.",
    tradeoff:
      "Gave up the clean “it just works” magic. Admitting uncertainty is less impressive in a demo — but it's what catches errors before they reach a customer.",
  },
  {
    name: "Nothing leaves without a human. The default action is review, not send.",
    problem:
      "Full automation is faster, but a wrong auto-reply — wrong language, tone, or answer — is expensive and hard to walk back.",
    decision:
      "The AI drafts and proposes; it never sends. A human approves every outgoing reply. The primary action is review, not send.",
    tradeoff:
      "Gave up end-to-end automation speed for control and reversibility. One wrong send to a customer outweighs the seconds saved by automating it away.",
  },
  {
    name: "The AI explains itself in a glance, so the human verifies instead of re-reading.",
    problem:
      "A human can't approve what they can't understand. A black box forces blind trust or a full re-read — which kills the time the tool was meant to save.",
    decision:
      "Each case shows why: detected language, intent, what triggered the urgency, and what's still missing. Verification becomes a glance.",
    tradeoff:
      "Gave up screen simplicity for an explanation layer. More on screen — but it's what makes fast, confident approval possible.",
  },
  {
    name: "Language is detected and made explicit, and the reviewer can verify across it.",
    problem:
      "A reviewer may not read the customer's language well. Approving a reply you can't fully read is blind trust wearing a different hat.",
    decision:
      "Detect and label the language. Show the drafted reply in the customer's language alongside a back-translation in the reviewer's, so meaning and tone are verified before approval.",
    tradeoff:
      "More interface, more processing per case. But approving a message you can't read defeats the whole human-control principle — so the cost is worth it.",
  },
];

const constraints = [
  { icon: "alert", term: "The AI will be wrong sometimes", desc: "A triage tool that hides that is dangerous. Wrong classifications have to be visible and easy to catch, not buried under a confident UI." },
  { icon: "globe", term: "Multilingual by default", desc: "ES, PT, FR and EN arrive mixed. The system detects language so a reviewer is never asked to approve a reply they can't read." },
  { icon: "bolt", term: "Speed vs. control", desc: "The point is saving time — but a human who has to re-read everything saves none. Verification has to be fast, not optional." },
  { icon: "check-circle", term: "Accountability", desc: "In service, someone answers for what was sent. Who approved what stays traceable." },
  { icon: "sitemap", term: "Volume", desc: "Triage only matters when there's too much to read. The interface has to scale attention, not just list items." },
];

const measure = [
  { metric: "Time to first response on urgent cases", reveals: "Is triage moving urgent work up, or just relabeling it?" },
  { metric: "How often the human overrides the AI — and on what", reveals: "Shows exactly where the AI is still weak." },
  { metric: "How many low-confidence flags were genuinely wrong", reveals: "Is the confidence signal calibrated, or just noise?" },
  { metric: "Replies handled per shift vs. the manual baseline", reveals: "Does the approval gate cost more than it saves?" },
  { metric: "How many cases stalled waiting on missing information", reveals: "Is the system surfacing the gaps, or hiding them?" },
  { metric: "Consistency of replies to the same question across languages", reveals: "Does the back-translation actually hold meaning?" },
];

const evidence = [
  { num: 65, prefix: "~", suffix: "%", desc: "of customers now expect faster responses than they did five years ago." },
  { num: 60, prefix: "~", suffix: "%", desc: "rarely or never buy from sources that aren't in their own language." },
  { num: 14, prefix: "~", suffix: "%", desc: "of self-service interactions actually resolve — deflection without resolution fails the customer." },
];

export default function TriageAICase() {
  return (
    <article>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <header className="container case-hero">
        <Reveal>
          <Link href="/#work" className="case-back">
            <span aria-hidden="true">←</span> Selected work
          </Link>
        </Reveal>

        <div className="stack" style={{ gap: "var(--space-6)" }}>
          <Reveal>
            <div className="case-hero__meta">
              <Tag>Concept case</Tag>
              <Tag>AI-native intake</Tag>
              <Tag>2026</Tag>
            </div>
          </Reveal>
          <Reveal mask delay={60}>
            <Text variant="display" className="case-hero__title">
              Triage<span className="accent">AI</span>
            </Text>
          </Reveal>
          <Reveal delay={160}>
            <Text variant="body-lg" style={{ maxWidth: "60ch", color: "var(--graphite)" }}>
              Multilingual requests arrive from everywhere, unranked. TriageAI structures and
              prioritises them with AI — and keeps a human in control of every reply that goes out.
            </Text>
          </Reveal>
        </div>

        <Reveal delay={240} className="case-hero__visual">
          <BrowserFrame url="triageai.app/inbox">
            <TriageInbox />
          </BrowserFrame>
        </Reveal>
      </header>

      {/* ── Snapshot / TL;DR ─────────────────────────────────── */}
      <section id="snapshot" data-label="Snapshot" className="container section--tight" aria-label="Snapshot">
        <Reveal className="snapshot">
          <div className="snapshot__row">
            <Icon name="alert" className="snapshot__icon" />
            <span className="snapshot__label">Problem</span>
            <span className="snapshot__value">
              Inbound requests arrive across channels and languages (ES/PT/FR/EN), unstructured and
              unranked — so urgent items wait, context is lost, and replies go out inconsistent.
            </span>
          </div>
          <div className="snapshot__row">
            <Icon name="users" className="snapshot__icon" />
            <span className="snapshot__label">For whom</span>
            <span className="snapshot__value">
              Small service and support teams handling multilingual inbound at volume — and the
              customers waiting on the other side.
            </span>
          </div>
          <div className="snapshot__row">
            <Icon name="user" className="snapshot__icon" />
            <span className="snapshot__label">My role</span>
            <span className="snapshot__value">
              Sole designer — problem framing, flows, information architecture, the human-AI
              interaction model, UI, and a design-system slice.
            </span>
          </div>
          <div className="snapshot__row">
            <Icon name="package" className="snapshot__icon" />
            <span className="snapshot__label">Delivered</span>
            <span className="snapshot__value">
              Core triage flow, key screens with real states (including when the AI is wrong), and a
              design-system slice.
            </span>
          </div>
          <div className="snapshot__row snapshot__row--wide">
            <Icon name="target" className="snapshot__icon" />
            <span className="snapshot__label">Expected impact — to validate</span>
            <span className="snapshot__value">
              Faster pickup of urgent cases; fewer items lost; more consistent multilingual replies;
              fewer wrong responses reaching customers.
              <span style={{ color: "var(--stone)" }}> Hypotheses to test — no numbers until measured.</span>
            </span>
          </div>
        </Reveal>
      </section>

      {/* ── Context & problem ────────────────────────────────── */}
      <section id="sec-context" data-label="Context" className="container section case-section" aria-labelledby="ctx">
        <Collapsible
          defaultOpen
          header={
            <div className="case-section__head">
              <Scramble className="eyebrow eyebrow--accent" text="01 — Context & problem" />
              <Reveal mask>
                <Text variant="h2" id="ctx">The message arrived. Now what?</Text>
              </Reveal>
            </div>
          }
        >
        <Reveal className="prose">
          <p>
            A request can arrive by WhatsApp, email or a web form, in Spanish, Portuguese, French or
            English, at any hour. Each one lands unstructured — no priority, no category, no clear
            read on what the person actually needs.
          </p>
          <p>
            A small team reads every message, guesses the language, guesses the urgency, decides who
            owns it, and tries to keep replies consistent. Under volume the predictable failure
            follows: the urgent message sits behind ten trivial ones, the same question gets three
            different answers, and anything in a language nobody on shift reads well gets pushed to
            &ldquo;later&rdquo; — and later becomes never.
          </p>
          <p>
            The real problem isn&rsquo;t replying. It&rsquo;s that <strong style={{ color: "var(--ink)", fontWeight: 500 }}>triage
            happens in someone&rsquo;s head, under pressure, with no structure</strong> — so attention
            flows to whatever is loudest, not whatever matters most. And the obvious fix, &ldquo;just
            automate it,&rdquo; fails its own test: unattended automation doesn&rsquo;t earn trust, it
            just moves the failure somewhere quieter.
          </p>
        </Reveal>

        <Reveal>
          <div className="evidence">
            <span className="evidence__label">Why this matters — external market data, not TriageAI&rsquo;s results</span>
            <div className="evidence__grid">
              {evidence.map((e) => (
                <div className="evidence-stat" key={e.num}>
                  <span className="evidence-stat__num">
                    <CountUp value={e.num} prefix={e.prefix} suffix={e.suffix} />
                  </span>
                  <span className="evidence-stat__desc">{e.desc}</span>
                </div>
              ))}
            </div>
            <span className="evidence__src">
              Sources: Salesforce, State of the Connected Customer · CSA Research · Lorikeet CX, 2026.
              Figures frame the market problem — they are not measured outcomes of this concept.
            </span>
          </div>
        </Reveal>

        <Reveal>
          <ChannelScatter />
        </Reveal>

        <Reveal style={{ maxWidth: "var(--max-prose)", paddingBlock: "var(--space-6)" }}>
          <QuoteBlock
            size="md"
            quote="Speed and language stopped being service niceties — they decide whether the customer stays. But unattended AI doesn't earn trust; a human still has to own the reply."
          />
        </Reveal>
        </Collapsible>
      </section>

      <div className="container"><Divider /></div>

      {/* ── Role, scope & constraints ────────────────────────── */}
      <section id="sec-scope" data-label="Scope" className="container section case-section" aria-labelledby="scope">
        <Collapsible
          header={
            <div className="case-section__head">
              <Scramble className="eyebrow eyebrow--accent" text="02 — Role, scope & constraints" />
              <Reveal mask>
                <Text variant="h2" id="scope">A real problem, an honest proposal.</Text>
              </Reveal>
            </div>
          }
        >
        <Reveal className="prose">
          <p className="muted">
            <strong style={{ color: "var(--ink)", fontWeight: 500 }}>Role.</strong> Sole designer —
            problem framing, flows, information architecture, the human-AI interaction model, screens
            and UI.
          </p>
          <p className="muted">
            <strong style={{ color: "var(--ink)", fontWeight: 500 }}>Scope.</strong> Concept case. The
            problem is real — multilingual inbound triage; the product is a proposal, not a deployed
            or trained system. AI behaviour is designed and illustrated, not live.
          </p>
          <p className="muted">
            <strong style={{ color: "var(--ink)", fontWeight: 500 }}>Effort.</strong> A few weeks
            across framing, the AI interaction model, flows, UI, and refinement.
          </p>
        </Reveal>

        <Reveal>
          <Text variant="h3" style={{ marginBottom: "var(--space-2)" }}>Constraints I designed for</Text>
          <div className="def-list def-list--icon">
            {constraints.map((c) => (
              <div className="def-item" key={c.term}>
                <Icon name={c.icon} className="def-item__icon" />
                <span className="def-item__term">{c.term}</span>
                <span className="def-item__desc">{c.desc}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <Text variant="h3" style={{ marginBottom: "var(--space-6)" }}>The system, with the human gate marked</Text>
          <SystemFlow />
        </Reveal>
        </Collapsible>
      </section>

      <div className="container"><Divider /></div>

      {/* ── Process ──────────────────────────────────────────── */}
      <section id="sec-process" data-label="Process" className="container section case-section" aria-labelledby="process">
        <Collapsible
          header={
            <div className="case-section__head">
              <Scramble className="eyebrow eyebrow--accent" text="03 — Process" />
              <Reveal mask>
                <Text variant="h2" id="process">Evidence and assumptions, kept honest.</Text>
              </Reveal>
            </div>
          }
        >
        <Reveal className="prose">
          <p className="muted">
            <strong style={{ color: "var(--ink)", fontWeight: 500 }}>Evidence vs. assumption.</strong>{" "}
            What I genuinely know: the multilingual service reality, inbound chaos, inconsistent replies
            across languages, the cost of a request slipping — plus the external market data above.
            What needs testing: that people trust and act on the confidence signals instead of
            rubber-stamping, that the explanation layer makes verification fast enough, and that
            approval-before-send is worth the speed cost at volume. Those are assumptions to validate
            with a real team.
          </p>
          <p className="muted">
            <strong style={{ color: "var(--ink)", fontWeight: 500 }}>Flows, information architecture.</strong>{" "}
            Before → after: from &ldquo;read everything, triage in your head, reply inconsistently&rdquo;
            to &ldquo;AI structures and ranks, a human verifies and approves, replies stay consistent.&rdquo;
            Core loop: message in → AI classifies → human reviews with confidence visible → approve or
            correct → send and logged.
          </p>
        </Reveal>

        <Reveal>
          <TriageFlow />
        </Reveal>

        <Reveal>
          <Text variant="h3" style={{ marginBottom: "var(--space-8)" }}>Key design decisions</Text>
        </Reveal>
        <DecisionsLedger decisions={decisions} />
        </Collapsible>
      </section>

      <div className="container"><Divider /></div>

      {/* ── The design & system ──────────────────────────────── */}
      <section id="sec-design" data-label="Design" className="container section case-section" aria-labelledby="design">
        <Collapsible
          header={
            <div className="case-section__head">
              <Scramble className="eyebrow eyebrow--accent" text="04 — The design & system" />
              <Reveal mask>
                <Text variant="h2" id="design">Built to be checked, not just trusted.</Text>
              </Reveal>
            </div>
          }
        >
        <Reveal className="prose">
          <p>
            The main screen is a triage inbox. On open, it surfaces what needs a human <em>now</em>:
            low-confidence flags, anything urgent, and anything missing the information needed to
            respond. Each case opens into an analysis panel — language, intent, urgency, missing info,
            and a proposed reply — with the confidence signal in plain view and, where languages
            differ, a back-translation for the reviewer.
          </p>
          <p className="muted">
            The human&rsquo;s job isn&rsquo;t to redo the work; it&rsquo;s to verify, correct if
            needed, and approve. The two states that make this a 2026 case and not a chatbot demo are
            the ones below: <strong style={{ color: "var(--ink)", fontWeight: 500 }}>low confidence</strong>{" "}
            and <strong style={{ color: "var(--ink)", fontWeight: 500 }}>the AI got it wrong and a human
            caught it.</strong>
          </p>
        </Reveal>

        {/* The signature screen — verify before approve */}
        <Reveal>
          <Text variant="h3" style={{ marginBottom: "var(--space-6)" }}>The analysis panel — verify, then approve</Text>
          <BrowserFrame url="triageai.app/case/REQ-4488">
            <AnalysisPanel />
          </BrowserFrame>
        </Reveal>

        {/* The recovery path — the differentiator */}
        <Reveal>
          <Text variant="h3" style={{ marginBottom: "var(--space-6)" }}>When the AI is wrong — the correction</Text>
          <CorrectionFlow />
        </Reveal>

        {/* Design-system slice */}
        <Reveal>
          <Text variant="h3" style={{ marginBottom: "var(--space-6)" }}>Design-system slice — case card &amp; confidence</Text>
          <div className="specimen">
            <div className="incident">
              <div className="incident__top">
                <span className="incident__id">REQ-4471</span>
                <Confidence level="low" />
              </div>
              <span className="incident__title">“No recibí el reembolso de mi reserva cancelada.”</span>
              <div className="incident__meta">
                <Tag>ES</Tag>
                <Tag>Refund</Tag>
                <Status variant="urgent">Urgent</Status>
              </div>
              <div className="incident__fields">
                <div className="incident__field">
                  <span className="incident__key">Channel</span>
                  <span className="incident__val">WhatsApp</span>
                </div>
                <div className="incident__field">
                  <span className="incident__key">Intent</span>
                  <span className="incident__val">Refund request</span>
                </div>
                <div className="incident__field">
                  <span className="incident__key">Missing</span>
                  <span className="incident__val">Booking reference</span>
                </div>
                <div className="incident__field">
                  <span className="incident__key">Action</span>
                  <span className="incident__val">Needs review</span>
                </div>
              </div>
            </div>

            <div className="stack" style={{ gap: "var(--space-5)" }}>
              <div className="stack" style={{ gap: "var(--space-2)" }}>
                <span className="incident__key">Confidence tokens</span>
                <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
                  <Confidence level="high" />
                  <Confidence level="review" />
                  <Confidence level="low" />
                </div>
              </div>
              <div className="stack" style={{ gap: "var(--space-2)" }}>
                <span className="incident__key">Tags — language · intent · urgency</span>
                <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
                  <Tag>ES</Tag>
                  <Tag>PT</Tag>
                  <Tag>FR</Tag>
                  <Tag>EN</Tag>
                  <Tag>Refund</Tag>
                  <Tag>Maintenance</Tag>
                </div>
              </div>
              <Text variant="small">
                The case card, confidence tokens and the analysis-panel pattern are the reusable
                spine: they put uncertainty in plain view so a human can verify fast and approve with
                their eyes open.
              </Text>
            </div>
          </div>
        </Reveal>

        {/* Mobile — review on the go */}
        <Reveal>
          <Text variant="h3" style={{ marginBottom: "var(--space-6)" }}>On mobile — review on the go</Text>
          <div className="design-mobile">
            <PhoneFrame>
              <TriageMobile />
            </PhoneFrame>
            <div className="design-mobile__note prose">
              <p className="muted">
                The same control principle on a phone: confidence in plain view, the case readable at
                a glance, and the two actions that matter — approve or correct. Quick to act on,
                impossible to send by accident.
              </p>
            </div>
          </div>
        </Reveal>

        {/* The states a real queue actually hits */}
        <Reveal>
          <Text variant="h3" style={{ marginBottom: "var(--space-6)" }}>States I designed for</Text>
          <TriageStates />
        </Reveal>
        </Collapsible>
      </section>

      <div className="container"><Divider /></div>

      {/* ── Outcome & reflection ─────────────────────────────── */}
      <section id="sec-outcome" data-label="Outcome" className="container section case-section" aria-labelledby="outcome">
        <Collapsible
          header={
            <div className="case-section__head">
              <Scramble className="eyebrow eyebrow--accent" text="05 — Outcome & reflection" />
              <Reveal mask>
                <Text variant="h2" id="outcome">Hypotheses, not results.</Text>
              </Reveal>
            </div>
          }
        >
        <Reveal className="prose">
          <p className="muted">
            <strong style={{ color: "var(--ink)", fontWeight: 500 }}>Expected impact — to validate.</strong>{" "}
            Urgent cases picked up faster; fewer requests lost across channels and languages; more
            consistent replies; fewer wrong responses reaching customers, because low-confidence items
            are caught. Hypotheses, not results.
          </p>
        </Reveal>

        <Reveal>
          <Text variant="h3" style={{ marginBottom: "var(--space-2)" }}>What I&rsquo;d measure next</Text>
          <div className="measure-list">
            {measure.map((m, i) => (
              <div className="measure-item" key={m.metric}>
                <span className="measure-item__num">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="measure-item__metric">{m.metric}</span>
                  <span className="measure-item__reveals">{m.reveals}</span>
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="prose">
          <p className="muted">
            <strong style={{ color: "var(--ink)", fontWeight: 500 }}>Trade-offs &amp; next steps.</strong>{" "}
            I kept this focused on the triage-and-approve loop. Auto-resolution, analytics dashboards
            and CRM integration were left out on purpose — they matter, but automating further before
            proving people trust the confidence signals would build speed on an unverified foundation.
            Next: test the confidence signals and the approval gate with a real team, and check whether
            the explanation and back-translation layer actually makes verification faster.
          </p>
          <p>
            <strong style={{ color: "var(--ink)", fontWeight: 500 }}>Reflection.</strong> Designing AI
            well isn&rsquo;t about making it look magical — it&rsquo;s about keeping a human in control
            of decisions that reach real people, especially across languages where a wrong word lands
            differently. The honesty about when the AI is unsure <em>is</em> the design, not a flaw in
            it.
          </p>
          <p className="muted">
            <strong style={{ color: "var(--ink)", fontWeight: 500 }}>On AI-assisted workflow.</strong>{" "}
            I used AI to move faster through research synthesis, structuring the case, and iterating on
            copy and layout. The framing, the interaction model, the trade-offs and what to leave out
            stayed mine. AI compressed the busywork — it didn&rsquo;t make the calls.
          </p>
        </Reveal>

        <Reveal className="case-cta">
          <Text variant="body" style={{ color: "var(--stone)" }}>
            More case studies coming as I document them.
          </Text>
          <Button href="/#contact" variant="secondary">Get in touch</Button>
        </Reveal>
        </Collapsible>
      </section>
    </article>
  );
}
