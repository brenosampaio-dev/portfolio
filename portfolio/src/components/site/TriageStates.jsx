/*
 * TriageStates — the states a real queue actually hits, not just the happy
 * path: empty, the AI still processing, a low-confidence item pulled up for a
 * human, and a case that can't be drafted yet because information is missing.
 * Each is a small labelled specimen from the same tokens as the product.
 * Reuses the shared .states / .state CSS, with a slate "needs review" variant.
 */
export function TriageStates() {
  const { t } = useI18n();
  const states = t.specimens.triage.states;
  return (
    <div className="states">
      {states.map((state) => (
        <div className="state" key={state.label}>
          <span className="state__label">{state.label}</span>
          <div className={`state__box${state.variant ? ` state__box--${state.variant}` : ""}`}>
            {state.variant === "empty" && <span className="state__line state__line--dashed" />}
            {state.variant === "processing" && (
              <>
                <span className="state__skeleton state__skeleton--w80" />
                <span className="state__skeleton state__skeleton--w60" />
                <span className="state__skeleton state__skeleton--w70" />
              </>
            )}
            {state.variant === "review" && <span className="state__dot state__dot--review" aria-hidden="true" />}
            {state.caption && <span className="state__caption">{state.caption}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
import { useI18n } from "@/lib/useI18n";
