"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{
        margin: 0,
        padding: 0,
        background: "#0a0a0a",
        color: "#ffffff",
        fontFamily: "system-ui, sans-serif",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <div style={{
          maxWidth: "28rem",
          padding: "2rem",
          textAlign: "center",
        }}>
          <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
            Critical error
          </h1>
          <p style={{ color: "#94a3b8", marginBottom: "1.5rem" }}>
            A severe error occurred. Please refresh the page or try again later.
          </p>
          <button
            onClick={reset}
            style={{
              background: "#00d4ff",
              color: "#0a0a0a",
              border: "none",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.375rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              cursor: "pointer",
              minHeight: "44px",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
