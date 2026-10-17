/** Original decorative gesture: separate paths converging into a shared direction. */
export function EditorialMark({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 480 500" fill="none" aria-hidden="true" focusable="false">
      <path d="M86 363C13 301 24 177 106 101C164 47 236 43 277 80C318 118 277 202 217 242C168 275 181 321 229 346C280 372 294 429 247 449C190 474 126 414 86 363Z" fill="var(--editorial-sage)" opacity=".46" />
      <path d="M255 66C332 40 429 90 441 175C452 257 375 312 309 302C248 294 231 244 249 196C267 148 209 93 255 66Z" fill="var(--editorial-blue)" opacity=".40" />
      <path d="M156 366C199 317 283 305 346 332C408 359 423 411 377 438C327 468 245 440 217 402C190 366 174 373 156 366Z" fill="var(--editorial-terra)" opacity=".48" />
      <path d="M51 277C110 327 211 320 267 257C316 202 326 145 305 121C287 100 257 123 255 163C251 244 330 315 427 283" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M83 287C145 341 220 333 278 275" stroke="currentColor" strokeWidth=".8" strokeLinecap="round" opacity=".55" />
    </svg>
  );
}
