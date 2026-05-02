import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

/**
 * Initiales affichées dans le favicon. Variantes possibles :
 * - "TL"  → version courte (lisible jusqu'à 16×16)
 * - "TLS" → version trois lettres (légèrement plus serrée)
 */
const INITIALS = "TLS";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
    const inter = await readFile(join(process.cwd(), "app", "_fonts", "Inter-Bold.ttf"));

    const fontSize = INITIALS.length === 2 ? 38 : 26;
    const letterSpacing = INITIALS.length === 2 ? -2 : -1;

    return new ImageResponse(
        <div
            style={{
                width: "100%",
                height: "100%",
                background: "linear-gradient(135deg, #0a0a0f 0%, #312e81 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Inter",
                fontWeight: 700,
                fontSize,
                letterSpacing,
                color: "#ffffff",
                borderRadius: 12,
            }}
        >
            {INITIALS}
        </div>,
        {
            ...size,
            fonts: [{ name: "Inter", data: inter, style: "normal", weight: 700 }],
        },
    );
}
