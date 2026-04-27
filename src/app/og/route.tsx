import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "Dinn.dev";
  const tagsParam = searchParams.get("tags") ?? "";
  const tags = tagsParam ? tagsParam.split(",").slice(0, 4) : [];

  const fontData = await fetch(
    "https://fonts.gstatic.com/s/notosanskr/v36/PbyxFmXiEBPT4ITbgNA5Cgms3VYcOA-vvnIzzuoyeLTq8H4hfeE.woff2"
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 72px",
          background: "#09090b",
          fontFamily: "Noto Sans KR, sans-serif",
        }}
      >
        {/* Tags */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                background: "#27272a",
                color: "#a1a1aa",
                fontSize: 20,
                padding: "6px 14px",
                borderRadius: 6,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 40 ? 48 : 60,
            fontWeight: 700,
            color: "#fafafa",
            lineHeight: 1.3,
            letterSpacing: "-0.02em",
            maxWidth: 900,
          }}
        >
          {title}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "#3f3f46",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                color: "#fafafa",
              }}
            >
              D
            </div>
            <span style={{ color: "#71717a", fontSize: 22 }}>주정혁</span>
          </div>
          <span style={{ color: "#52525b", fontSize: 22 }}>dinn.dev</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Noto Sans KR",
          data: fontData,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}
