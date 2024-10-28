import Link from "next/link";
import React from "react";
import { dosis } from "@/utils/fonts";

export default function Logo() {
    const logoStyle = {
        fontSize: "2rem",
        color: "#333333",
        fontWeight: 500,
        display: "flex",
        alignItems: "center",
        gap: "0.3rem",
        // letterSpacing: "0.05em",
        transition: "color 0.3s ease",
    };

    const imageStyle = {
        fontWeight: 400,
        color: "#888888",
    };

    const hoverStyle = {
        color: "#666666",
    };

    return (
        <Link href="/">
            <h2
                className={dosis.className}
                style={logoStyle}
                onMouseEnter={(e) => (e.currentTarget.style.color = hoverStyle.color)}
                onMouseLeave={(e) => (e.currentTarget.style.color = logoStyle.color)}
            >
                refine
                <span style={imageStyle}>image</span>
            </h2>
        </Link>
    );
}
