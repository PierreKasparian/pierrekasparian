import { Bot } from "lucide-react";
import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "8px",
          background:
            "radial-gradient(circle at 30% 25%, #67e8f9 0%, #4f46e5 38%, #1e1b4b 100%)",
          boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.16)",
        }}
      >
        <Bot
          size={22}
          strokeWidth={2.25}
          color="#ffffff"
          absoluteStrokeWidth
        />
      </div>
    ),
    {
      ...size,
    },
  );
}
