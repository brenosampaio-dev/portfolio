# Portfolio v2 — Protected Main-Branch Delivery Strategy

**Status:** Approved direction; pending Breno's review of this written specification

**Date:** 2026-09-21

**Companion specifications:**

- `2026-09-21-portfolio-v2-information-architecture-design.md`
- `2026-09-21-portfolio-v2-visual-system-design.md`

This document governs delivery order, access protection, Git safety, release boundaries, and the decision to postpone case-study work. The information-architecture specification remains authoritative for page hierarchy and content truth. The visual-system specification remains authoritative for presentation. Where their earlier migration sequences conflict with this delivery decision, this document controls sequencing only.

## 1. Purpose

Portfolio v2 will be developed directly on the current `main` branch while the production deployment is private. The current public portfolio will not remain available as a parallel public version during the redesign.

The strategy must:

1. let Breno review the evolving site at its real production URL;
2. avoid maintaining a long-lived implementation branch or duplicate portfolio;
3. preserve a reliable return point for the current public version;
4. allow the information architecture and visual system to be implemented before choosing or rewriting the three case studies;
5. prevent unfinished work, unsupported claims, and incomplete cases from being presented to recruiters;
6. keep every change attributable, reversible, and independently verifiable.

## 2. Approved Decisions

The following decisions are approved for implementation planning:

- development continues on the existing `main` branch;
- Vercel protects all production and generated deployment URLs before the first implementation push;
- the preferred access method is Vercel Authentication, not a custom password screen;
- a recovery reference is created before product-code changes;
- changes are divided into small, reviewable commits;
- the three case studies remain frozen until the final content phase;
- current case content is not silently relabelled, rewritten, or treated as shipped product work;
- production protection is removed only after final QA and Breno's explicit approval.

This approval does not yet authorize changing Vercel settings, creating Git references, editing product code, pushing commits, or deploying. Those actions begin only after this specification and the subsequent implementation plan are reviewed and approved.

## 3. Protection Model

### 3.1 Required configuration

Before any portfolio-v2 implementation commit is pushed:

1. open the Vercel project;
2. enable **Vercel Authentication**;
3. select **All Deployments** so production, preview, generated deployment URLs, and the production domain are protected;
4. verify the production domain from a signed-out private/incognito session;
5. verify that an authorized Vercel session can still access the site;
6. capture the configuration state without exposing tokens or account secrets.

### 3.2 Explicit exclusions

- Do not add a password, shared secret, or authentication credential to the repository.
- Do not build a custom Next.js password gate merely to avoid Vercel Authentication.
- Do not purchase Vercel Password Protection unless Breno later makes a separate informed decision to do so.
- Do not assume that protecting a preview also protects the production domain; the verification must use the canonical production URL.

### 3.3 Known consequences

While All Deployments protection is active:

- recruiters and other unauthorised visitors cannot see the portfolio;
- existing portfolio links lead to Vercel authentication rather than the site;
- resume PDFs hosted under the same deployment are also unavailable publicly;
- crawlers cannot inspect normal portfolio pages, so an extended private period may affect search visibility;
- external monitoring, screenshots, accessibility checks, and browser automation may require an approved automation bypass secret;
- bypass values remain environment secrets and are never committed.

These consequences are intentional during the rebuild. Before enabling protection, Breno should confirm that no active application currently depends on public access to the portfolio or its hosted resume PDFs.

## 4. Git and Recovery Contract

### 4.1 Repository boundaries

- Actual Git root: `.../Meus projetos`.
- Portfolio application: `.../Meus projetos/portfolio`.
- Stage only intended `portfolio/**` paths.
- Preserve unrelated untracked siblings, including `docs/`, `hertwill-shopify-store-ops/`, and `triageai/` at the Git root.

### 4.2 Recovery point

Before implementation begins, create an immutable annotated tag named:

`portfolio-public-pre-v2-2026-09-21`

The tag points to the commit that represents the last verified public application before portfolio-v2 product-code changes. Record the exact commit SHA in the implementation log.

The recovery point is not a parallel development branch. It exists solely to make restoration explicit and auditable.

### 4.3 Main-branch discipline

- no force pushes;
- no history rewriting;
- no destructive reset of user work;
- no combined foundation, page, and case-study mega-commit;
- inspect the staged diff before every commit;
- run phase-appropriate validation before pushing;
- do not unlock production merely because the latest commit builds.

## 5. What “Cases Last” Means

The case-study freeze applies to project selection, final narrative, claims, evidence, imagery, results, and publication status.

Before the case phase, implementation may create only the reusable system needed to host future cases:

- project-card schema and status vocabulary;
- Work hub sections and empty-state behaviour;
- reusable case-study shell;
- executive-summary component contract;
- evidence, disclosure, appendix, related-work, and action modules;
- route and metadata conventions;
- accessibility and responsive behaviour for the template.

Before the case phase, implementation must not:

- choose the final three featured projects on Breno's behalf;
- rewrite the current support simulations as product-design work;
- label a concept as `Built` or `Shipped`;
- invent Live, GitHub, Figma, participant, metric, client, or outcome evidence;
- create polished placeholder case narratives that could be mistaken for completed work;
- remove the current case sources before their final migration decision is made.

## 6. Delivery Sequence

### Phase 0 — Lock and recovery

- confirm repository and deployment state;
- identify the exact pre-v2 public commit;
- create the annotated recovery tag;
- enable Vercel Authentication for All Deployments;
- verify denied and authorized access;
- record the protection and rollback procedure.

No product-code modification precedes this phase.

### Phase 1 — Foundations

- consolidate primitive, semantic, and component tokens;
- implement the approved light and dark foundations;
- correct text minimums, radii, borders, shadows, focus, and motion roles;
- preserve the existing design-system identity while eliminating conflicting overrides;
- establish baseline visual, accessibility, performance, lint, and build checks.

### Phase 2 — Global experience

- align header, footer, progress rail, compact indicator, mobile dock, theme, language controls, skip link, and back-to-top with the specifications;
- preserve all protected motion and orientation behaviours;
- ensure reduced motion, keyboard access, mobile safe areas, and 320-pixel reflow.

### Phase 3 — Information-architecture shell

- create Home, Work, Labs, About, and locale-aware route structures;
- implement navigation and internal-link contracts;
- create the reusable project and case content models;
- keep unfinished project destinations unavailable or explicitly marked, with no false calls to action;
- preserve current case routes and sources until the case phase determines their final placement.

### Phase 4 — Non-case content and visual composition

- implement the transitional Product Designer-to-frontend positioning without claiming the Design Engineer title;
- rewrite Home, capabilities, experience bridge, process, About, contact, and global metadata using supported facts;
- apply the Shibui Digital / Technical Iki system and approved page rhythm;
- expose GitHub, resume, location, languages, and canonical contact data consistently;
- do not feature unfinished cases as proof.

### Phase 5 — Non-case QA

- validate Home, Work, Labs, About, navigation, locale behaviour, themes, protected motion, responsive layouts, accessibility, performance, metadata, and errors;
- run lint, production build, security audit, accessibility checks, interaction checks, and visual review separately;
- fix shell and foundation defects before case content begins.

### Phase 6 — Cases

- Breno selects the cases and their order;
- each case receives its own truthful scope, evidence inventory, build or prototype decision, validation work, content design, implementation, and QA;
- existing operational simulations are preserved, archived, revised, or retired only through an explicit case decision;
- each public status follows the publication and honesty gates in the information-architecture specification.

### Phase 7 — Release

- verify every visible project status and action;
- verify that primary resume files and portfolio positioning agree;
- run the full English/French, light/dark, responsive, keyboard, reduced-motion, metadata, link, console, accessibility, performance, and visual-regression matrix;
- confirm the production domain and resume URLs after protection is removed;
- remove protection only after Breno's explicit release approval;
- perform an external signed-out production smoke test.

## 7. Commit Boundaries

The implementation plan should preserve these default commit boundaries:

1. protection and recovery documentation;
2. token foundations;
3. global chrome and accessibility;
4. route and content-model shell;
5. Home;
6. Work and Labs;
7. About, contact, metadata, and localization;
8. non-case QA corrections;
9. one or more commits per selected case;
10. release corrections.

Commit boundaries may be divided further. They must not be collapsed into one portfolio-wide rewrite.

## 8. Release Gates

Production remains protected until all of the following are true:

- the application builds from a clean production command;
- lint passes;
- critical accessibility failures are resolved;
- protected motion and navigation behaviours pass regression review;
- Home, Work, Labs, About, and all published case routes work on required breakpoints;
- all visible claims and statuses are supported;
- no unfinished card presents dead or misleading Live, Code, Case, or Figma actions;
- at least one project qualifies for the prominence it receives;
- public resume files are correct and reachable after protection is removed;
- the full release checklist is recorded;
- Breno explicitly approves public release.

## 9. Rollback Strategy

If direct work on `main` produces a release-blocking failure:

1. keep Vercel protection active;
2. identify the first failing commit through the small commit history;
3. prefer a normal revert commit over history rewriting;
4. validate the reverted state locally;
5. restore the tagged pre-v2 application only if incremental reverts cannot recover a stable state;
6. never discard unrelated user files or untracked sibling directories.

Removing protection is not part of rollback. It is a separate release decision.

## 10. Acceptance Criteria for This Strategy

The delivery strategy is implemented correctly when:

- production was protected and verified before the first product-code push;
- the recovery tag points to the recorded pre-v2 public commit;
- all v2 implementation work remains on `main` as requested;
- unrelated Git-root siblings remain untouched;
- the case-study freeze is respected through the non-case phases;
- every phase has attributable commits and validation evidence;
- no secret or protection bypass value appears in Git;
- the portfolio cannot become public again without a deliberate protection change;
- release happens only after the complete QA matrix and Breno's explicit approval.

## 11. Decision Record

### Selected approach

**Protected production with direct main-branch development.**

This approach was selected because Breno prefers one evolving portfolio rather than parallel public and development versions. Privacy during the rebuild prevents unfinished positioning and incomplete cases from reaching recruiters. An immutable recovery tag and small commits provide the safety normally supplied by a long-lived implementation branch.

### Alternatives not selected

1. **Long-lived v2 branch and preview:** safer isolation, but rejected because Breno prefers to work directly on the current branch and URL.
2. **Public incremental redesign:** avoids portfolio downtime, but exposes incomplete hierarchy, claims, and case placeholders.
3. **Custom application password gate:** rejected because it adds code, secret-handling, accessibility, and security responsibilities that Vercel Authentication already covers.

## 12. Review Gate

This specification authorizes no implementation by itself. After Breno reviews and approves this written document, the next artifact is a detailed implementation plan with exact files, commands, verification steps, commit boundaries, Vercel checks, rollback steps, and stop conditions.
