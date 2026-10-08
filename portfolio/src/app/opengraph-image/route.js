import { ImageResponse } from "next/og";

// Stable bilingual social card. ImageResponse uses its deterministic fallback
// instead of fetching typography at request time; the public URL stays fixed.
const size = { width: 1200, height: 630 };
const headline = "Complex products, made clear.";

export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#FFFFFF",
          color: "#1F1C1B",
          padding: "76px 84px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", color: "#C74624" }}>
          <div style={{ width: 32, height: 2, backgroundColor: "#C74624", marginRight: 18 }} />
          <div style={{ display: "flex", fontSize: 20, fontWeight: 500, letterSpacing: 5 }}>
            BRENO SAMPAIO · PRODUCT DESIGNER
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 930 }}>
          <div style={{ display: "flex", fontSize: 86, lineHeight: 1.02, letterSpacing: -4 }}>
            {headline}
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 25, lineHeight: 1.35, color: "#5F5B56" }}>
            Product strategy · Interaction design · Design systems
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 22, color: "#5F5B56" }}>
          <div style={{ display: "flex" }}>brenosampaio.vercel.app</div>
          <div style={{ display: "flex" }}>Valencia, Spain · Available across Europe</div>
        </div>
      </div>
    ),
    size,
  );
}
