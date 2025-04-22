"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";

// This dynamically imports the DrawingBoard component (which uses canvas/browser APIs)
const DrawingBoard = dynamic(
  () => import("../../app/board/components/DrawingBoard"),
  {
    ssr: false,
  }
);

export default function DrawingPage() {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return <DrawingBoard />;
}
