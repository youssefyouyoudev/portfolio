import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #020817 0%, #071b35 55%, #083344 100%)",
          color: "white",
          padding: 72,
          fontFamily: "Arial",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 28, color: "#67e8f9", letterSpacing: 6 }}>YOUSSEFYOUYOU.COM</div>
          <div style={{ border: "1px solid rgba(103,232,249,.45)", borderRadius: 999, padding: "14px 22px", fontSize: 24 }}>Nador, Morocco</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 900, lineHeight: 1.02 }}>Youssef Youyou</div>
          <div style={{ marginTop: 22, fontSize: 44, color: "#bae6fd" }}>Senior Full-Stack Web Developer</div>
          <div style={{ marginTop: 34, maxWidth: 920, fontSize: 30, lineHeight: 1.35, color: "#dbeafe" }}>
            Laravel backend, React/Next.js frontend, APIs, dashboards, SaaS concepts, deployment and SEO.
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, fontSize: 24 }}>
          {["Laravel", "React", "Next.js", "MySQL", "Nginx", "SEO"].map((item) => (
            <div key={item} style={{ border: "1px solid rgba(255,255,255,.18)", borderRadius: 999, padding: "12px 18px", background: "rgba(255,255,255,.08)" }}>
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
