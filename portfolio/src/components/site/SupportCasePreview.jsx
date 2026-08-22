"use client";

import { BrowserFrame } from "@/components/site/BrowserFrame";
import { Status } from "@/components/ds";
import { useLang } from "@/context/AppContext";
import { getCaseStudy } from "@/lib/caseStudies";

export function SupportCasePreview({ slug, card = false }) {
  const { lang } = useLang();
  const bundle = getCaseStudy(lang, slug);
  if (!bundle) return null;
  const { preview, kind } = bundle.study;

  return (
    <BrowserFrame url={preview.url} className={card ? "browser-frame--card" : ""}>
      <div className={`lab-preview lab-preview--${kind}`}>
        <div className="lab-preview__top">
          <div>
            <span className="lab-preview__eyebrow">{preview.eyebrow}</span>
            <strong className="lab-preview__id">{preview.id}</strong>
          </div>
          <Status variant="done">{preview.status}</Status>
        </div>

        <div className="lab-preview__summary">
          <span className="lab-preview__title">{preview.headline}</span>
          <span className="lab-preview__detail">{preview.detail}</span>
        </div>

        <div className="lab-preview__path" role="list" aria-label={preview.eyebrow}>
          {preview.nodes.map((node, index) => (
            <div className="lab-preview__stepWrap" key={`${node.label}-${node.value}`} role="listitem">
              <div className={`lab-preview__step lab-preview__step--${node.state}`}>
                <span className="lab-preview__stepLabel">{node.label}</span>
                <span className="lab-preview__stepValue">{node.value}</span>
              </div>
              {index < preview.nodes.length - 1 && <span className="lab-preview__connector" aria-hidden="true" />}
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}
