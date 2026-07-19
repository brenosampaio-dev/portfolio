/*
 * StatesGrid — the states a tired user actually hits, shown as small real
 * specimens. Generic version of the original UIStates: each case passes its
 * own { label, variant, caption } specimens instead of forking the markup.
 * variant one of: empty · loading · error · success.
 */
export function StatesGrid({ states = [] }) {
  return (
    <div className="states">
      {states.map((st) => (
        <div className="state" key={st.label}>
          <span className="state__label">{st.label}</span>
          <div className={`state__box${st.variant ? ` state__box--${st.variant}` : ""}`}>
            {st.variant === "empty" && <span className="state__line state__line--dashed" />}
            {st.variant === "loading" && (
              <>
                <span className="state__skeleton state__skeleton--w80" />
                <span className="state__skeleton state__skeleton--w60" />
                <span className="state__skeleton state__skeleton--w70" />
              </>
            )}
            {st.variant === "error" && <span className="state__dot" aria-hidden="true" />}
            {st.variant === "success" && <span className="state__check" aria-hidden="true">✓</span>}
            {st.caption && <span className="state__caption">{st.caption}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
