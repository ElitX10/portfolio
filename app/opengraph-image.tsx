import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { PROFILE } from "@/lib/data/profile";

export const alt = `${PROFILE.name} — ${PROFILE.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Lit Inter (TTF statiques) depuis app/_fonts/. Satori (le moteur derrière
 * ImageResponse) ne supporte ni le woff2 ni les fonts variables, donc on
 * bundle des TTF statiques extraits du ZIP officiel rsms/inter.
 */
async function loadInter(weight: 400 | 700): Promise<Buffer> {
    const filename = weight === 700 ? "Inter-Bold.ttf" : "Inter-Regular.ttf";
    return readFile(join(process.cwd(), "app", "_fonts", filename));
}

export default async function Image() {
    const headerLine = `Portfolio · ${PROFILE.location}`;
    const linkedin =
        PROFILE.social
            .find((s) => s.label === "LinkedIn")
            ?.href.replace(/^https?:\/\/(www\.)?/, "")
            ?.replace(/\/$/, "") ?? "";
    const footerLine = linkedin ? `${PROFILE.email}  ·  ${linkedin}` : PROFILE.email;

    const [interRegular, interBold] = await Promise.all([loadInter(400), loadInter(700)]);

    return new ImageResponse(
        <div
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
                background: "#0a0a0f",
                color: "#ffffff",
                fontFamily: "Inter",
                display: "flex",
                flexDirection: "column",
                padding: "72px 80px",
                overflow: "hidden",
            }}
        >
            {/* Lueur indigo en haut à droite, type Hero */}
            <div
                style={{
                    position: "absolute",
                    top: -240,
                    right: -200,
                    width: 900,
                    height: 700,
                    borderRadius: 9999,
                    background:
                        "radial-gradient(closest-side, rgba(99,102,241,0.55), rgba(99,102,241,0))",
                    filter: "blur(20px)",
                    display: "flex",
                }}
            />
            {/* Trait fin indigo de gauche, signature visuelle */}
            <div
                style={{
                    position: "absolute",
                    top: 80,
                    bottom: 80,
                    left: 40,
                    width: 2,
                    background:
                        "linear-gradient(180deg, rgba(99,102,241,0) 0%, rgba(129,140,248,0.8) 50%, rgba(99,102,241,0) 100%)",
                    display: "flex",
                }}
            />

            {/* Bandeau du haut */}
            <div
                style={{
                    fontSize: 22,
                    color: "#a1a1aa",
                    letterSpacing: 6,
                    textTransform: "uppercase",
                    fontWeight: 400,
                    display: "flex",
                }}
            >
                {headerLine}
            </div>

            {/* Bloc central */}
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: 18,
                }}
            >
                <div
                    style={{
                        fontSize: 110,
                        fontWeight: 700,
                        letterSpacing: -3,
                        lineHeight: 1.05,
                        display: "flex",
                    }}
                >
                    {PROFILE.name}
                </div>
                <div
                    style={{
                        fontSize: 38,
                        color: "rgba(255,255,255,0.85)",
                        fontWeight: 400,
                        display: "flex",
                    }}
                >
                    {PROFILE.title}
                </div>
                <div
                    style={{
                        fontSize: 26,
                        color: "#a1a1aa",
                        fontWeight: 400,
                        maxWidth: 980,
                        marginTop: 12,
                        display: "flex",
                    }}
                >
                    {PROFILE.tagline}
                </div>
            </div>

            {/* Bandeau du bas */}
            <div
                style={{
                    fontSize: 20,
                    color: "#71717a",
                    fontWeight: 400,
                    display: "flex",
                }}
            >
                {footerLine}
            </div>
        </div>,
        {
            ...size,
            fonts: [
                { name: "Inter", data: interRegular, style: "normal", weight: 400 },
                { name: "Inter", data: interBold, style: "normal", weight: 700 },
            ],
        },
    );
}
