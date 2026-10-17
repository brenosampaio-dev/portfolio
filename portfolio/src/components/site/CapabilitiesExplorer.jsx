"use client";

import { useEffect, useState } from "react";
import styles from "./EditorialShell.module.css";

export function CapabilitiesExplorer({ copy }) {
  const [activeId, setActiveId] = useState(copy.tabs[0].id);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 700px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  function onKeyDown(event, index) {
    const nextKey = isMobile ? "ArrowRight" : "ArrowDown";
    const prevKey = isMobile ? "ArrowLeft" : "ArrowUp";
    let nextIndex = index;
    if (event.key === nextKey) nextIndex = (index + 1) % copy.tabs.length;
    else if (event.key === prevKey) nextIndex = (index - 1 + copy.tabs.length) % copy.tabs.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = copy.tabs.length - 1;
    else return;

    event.preventDefault();
    const targetTab = copy.tabs[nextIndex];
    setActiveId(targetTab.id);
    document.getElementById(`cap-tab-${targetTab.id}`)?.focus();
  }

  return (
    <div className={styles.capExplorer}>
      <div
        className={styles.capRail}
        role="tablist"
        aria-label={copy.tablistLabel}
        aria-orientation={isMobile ? "horizontal" : "vertical"}
      >
        {copy.tabs.map((tab, idx) => {
          const selected = tab.id === activeId;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`cap-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`cap-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              className={styles.capTab}
              onClick={() => setActiveId(tab.id)}
              onKeyDown={(e) => onKeyDown(e, idx)}
            >
              <span className={styles.capTabTop}>
                <span>{tab.label}</span>
                <span className={styles.capArrow} aria-hidden="true">↗</span>
              </span>
              <span className={styles.capTabDescription}>{tab.description}</span>
            </button>
          );
        })}
      </div>

      <div className={styles.capStage}>
        {copy.tabs.map((tab) => {
          const selected = tab.id === activeId;
          return (
            <div
              key={tab.id}
              role="tabpanel"
              id={`cap-panel-${tab.id}`}
              aria-labelledby={`cap-tab-${tab.id}`}
              tabIndex={0}
              hidden={!selected}
              className={styles.capPanel}
            >
              <div className={styles.artifact}>
                <div className={styles.artifactBar}>
                  <span className={styles.artifactSymbol} aria-hidden="true">{tab.symbol}</span>
                  <span>{tab.barTitle}</span>
                  <span className={styles.artifactType}>{tab.barType}</span>
                </div>
                <h3 className={styles.artifactHeading}>
                  {tab.heading} <em>{tab.headingEmphasis}</em>
                </h3>

                {tab.id === "context" && (
                  <>
                    <div className={styles.contextGrid}>
                      {tab.notes.map((note, i) => (
                        <div key={note.title} className={styles.contextNote}>
                          <span className={`${styles.noteMarker} ${styles[`noteMarker${i + 1}`]}`} aria-hidden="true" />
                          <h4>{note.title}</h4>
                          <p>{note.body}</p>
                        </div>
                      ))}
                    </div>
                    <div className={styles.artifactFooter}>
                      <span>{tab.footerLeft}</span>
                      <span className={styles.footerConnector} aria-hidden="true" />
                      <span>{tab.footerRight}</span>
                    </div>
                  </>
                )}

                {tab.id === "interaction" && (
                  <>
                    <div className={styles.flowGrid}>
                      {tab.nodes.map((node, i) => (
                        <div key={node.title} className={styles.flowItemWrap}>
                          <div className={styles.flowNode}>
                            <span className={styles.flowIndex} aria-hidden="true">{node.index}</span>
                            <h4>{node.title}</h4>
                            <p>{node.body}</p>
                          </div>
                          {i < tab.nodes.length - 1 && (
                            <span className={styles.flowArrow} aria-hidden="true">→</span>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className={styles.stateStrip}>
                      {tab.states.map((st, i) => (
                        <span key={st} className={i === 2 ? styles.stateAccent : undefined}>{st}</span>
                      ))}
                    </div>
                  </>
                )}

                {tab.id === "prototype" && (
                  <div className={styles.prototypeDemo}>
                    <div className={styles.demoContext}>
                      <span className={styles.demoDot} aria-hidden="true" />
                      <span>{tab.demoContext}</span>
                    </div>
                    <details className={styles.demoDetails}>
                      <summary>
                        <span>{tab.demoSummary}</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </summary>
                      <p>{tab.demoBody}</p>
                    </details>
                    <p className={styles.demoFootnote}>{tab.demoFootnote}</p>
                  </div>
                )}
              </div>

              <div className={styles.panelCaption}>
                <span>{tab.captionLeft}</span>
                <span>{tab.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
