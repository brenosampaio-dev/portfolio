"use client";

import { useRef, useState } from "react";
import styles from "./HeroSkills.module.css";

export function HeroSkills({ skills, lang = "en" }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  if (!skills || !skills.tracks || skills.tracks.length === 0) return null;

  const tracks = skills.tracks;
  const activeTrack = tracks[activeIdx] || tracks[0];

  function onKeyDown(e, idx) {
    let nextIdx = idx;
    if (e.key === "ArrowRight") nextIdx = (idx + 1) % tracks.length;
    else if (e.key === "ArrowLeft") nextIdx = (idx - 1 + tracks.length) % tracks.length;
    else if (e.key === "Home") nextIdx = 0;
    else if (e.key === "End") nextIdx = tracks.length - 1;
    else return;

    e.preventDefault();
    setActiveIdx(nextIdx);
    document.getElementById(`hero-skill-tab-${tracks[nextIdx].id}`)?.focus();
  }

  function handleTouchStart(e) {
    touchStartX.current = e.changedTouches[0].screenX;
  }

  function handleTouchEnd(e) {
    touchEndX.current = e.changedTouches[0].screenX;
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      const minSwipeDistance = 40;
      if (diff > minSwipeDistance) {
        setActiveIdx((prev) => (prev + 1) % tracks.length);
      } else if (diff < -minSwipeDistance) {
        setActiveIdx((prev) => (prev - 1 + tracks.length) % tracks.length);
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  }

  const hintText = lang === "fr" ? "Glisser ou toucher les onglets" : "Swipe or tap tabs to switch";

  return (
    <div className={styles.skillsRoot} aria-label="Core skills and domain capabilities">
      {/* ── DESKTOP & TABLET VIEW: DOTTED LEADER SPEC (OPTION 8) ── */}
      <div className={styles.desktopSpec} aria-hidden="true">
        {tracks.map((track) => (
          <div key={track.id} className={styles.specRow}>
            <span className={styles.specLabel}>{track.label}</span>
            <span className={styles.specDots} />
            <div className={styles.specTokens}>
              {track.items.map((item, i) => {
                const isHighlight = track.highlights?.includes(item);
                return (
                  <span key={item} className={styles.token}>
                    {isHighlight ? <strong>{item}</strong> : item}
                    {i < track.items.length - 1 && <span className={styles.tokenSep}> · </span>}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* ── MOBILE VIEW: SEGMENTED HORIZON DECK (OPTION C) ── */}
      <div className={styles.mobileDeck}>
        <div
          className={styles.segNav}
          role="tablist"
          aria-label={lang === "fr" ? "Compétences clés" : "Key capabilities"}
        >
          {tracks.map((track, idx) => {
            const isSelected = idx === activeIdx;
            return (
              <button
                key={track.id}
                id={`hero-skill-tab-${track.id}`}
                role="tab"
                aria-selected={isSelected}
                aria-controls={`hero-skill-panel-${track.id}`}
                className={`${styles.segBtn} ${isSelected ? styles.segBtnActive : ""}`}
                onClick={() => setActiveIdx(idx)}
                onKeyDown={(e) => onKeyDown(e, idx)}
                type="button"
              >
                {track.tab}
              </button>
            );
          })}
        </div>

        <div
          id={`hero-skill-panel-${activeTrack.id}`}
          role="tabpanel"
          aria-labelledby={`hero-skill-tab-${activeTrack.id}`}
          className={styles.activeCard}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className={styles.cardHead}>
            <span className={styles.cardTitle}>{activeTrack.title}</span>
            <span className={styles.cardBadge}>[{activeTrack.badge}]</span>
          </div>

          <div className={styles.cardChips}>
            {activeTrack.items.map((item) => (
              <span key={item} className={styles.cardChip}>
                {item}
              </span>
            ))}
          </div>

          <p className={styles.cardDesc}>{activeTrack.desc}</p>

          <div className={styles.cardSwipeHint}>
            <span>{hintText}</span>
            <span>{activeIdx + 1} / {tracks.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
