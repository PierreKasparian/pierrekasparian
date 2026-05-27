import { ImageResponse } from "next/og";

export const alt = "Pierre Kasparian - Intégration IA freelance conforme RGPD";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#09090b",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "80px",
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      {/* Accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "6px",
          height: "100%",
          background: "#ffffff",
        }}
      />

      {/* Badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          background: "#27272a",
          color: "#a1a1aa",
          fontSize: 18,
          padding: "8px 16px",
          borderRadius: "6px",
          marginBottom: "32px",
          letterSpacing: "0.05em",
        }}
      >
        Freelance IA &middot; RGPD conforme &middot; Hébergement EU
      </div>

      {/* Name */}
      <div
        style={{
          fontSize: 72,
          fontWeight: 700,
          color: "#ffffff",
          lineHeight: 1.1,
          marginBottom: "16px",
        }}
      >
        Pierre Kasparian
      </div>

      {/* Tagline */}
      <div
        style={{
          fontSize: 30,
          color: "#a1a1aa",
          lineHeight: 1.4,
          maxWidth: "800px",
        }}
      >
        Intégration IA et data engineering pour PME et startups françaises
      </div>

      {/* Skills */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginTop: "40px",
          flexWrap: "wrap",
        }}
      >
        {["RAG", "Agents IA", "LLM", "Python", "Data Engineering"].map(
          (skill) => (
            <div
              key={skill}
              style={{
                background: "#18181b",
                border: "1px solid #3f3f46",
                color: "#d4d4d8",
                fontSize: 18,
                padding: "6px 14px",
                borderRadius: "4px",
              }}
            >
              {skill}
            </div>
          ),
        )}
      </div>

      {/* URL */}
      <div
        style={{
          position: "absolute",
          bottom: "48px",
          right: "80px",
          color: "#52525b",
          fontSize: 18,
        }}
      >
        pierrekasparian.com
      </div>
    </div>,
    size,
  );
}
