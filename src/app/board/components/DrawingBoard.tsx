"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Canvas, PencilBrush, FabricImage } from "fabric";

export default function DrawingBoard() {
  const canvasRef = useRef<Canvas | null>(null);
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const undoStack = useRef<string[]>([]);
  const redoStack = useRef<string[]>([]);

  const [tool, setTool] = useState<"pencil" | "select">("pencil");
  const [color, setColor] = useState("#fff");
  const [strokeWidth, setStrokeWidth] = useState(2);

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const json = JSON.stringify(canvas.toJSON());
    undoStack.current.push(json);
    redoStack.current = [];
  };

  const handleUndo = () => {
    const canvas = canvasRef.current;
    if (!canvas || undoStack.current.length === 0) return;

    const current = JSON.stringify(canvas.toJSON());
    redoStack.current.push(current);

    const prev = undoStack.current.pop();
    if (prev) {
      canvas.loadFromJSON(prev, () => {
        refreshCanvasAfterLoad(); // ✅ re-apply tool + background
      });
    }
  };

  const handleRedo = () => {
    const canvas = canvasRef.current;
    if (!canvas || redoStack.current.length === 0) return;

    const current = JSON.stringify(canvas.toJSON());
    undoStack.current.push(current);

    const next = redoStack.current.pop();
    if (next) {
      canvas.loadFromJSON(next, () => {
        refreshCanvasAfterLoad(); // ✅ re-apply tool + background
      });
    }
  };
  const refreshCanvasAfterLoad = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.backgroundColor = "#1f1f1f";

    if (tool === "select") {
      canvas.isDrawingMode = false;
      canvas.selection = true;
      canvas.forEachObject((obj) => (obj.selectable = true));
    } else {
      canvas.isDrawingMode = true;
      canvas.selection = false;
      canvas.forEachObject((obj) => (obj.selectable = false));

      const brush = new PencilBrush(canvas);
      brush.color = color;
      brush.width = strokeWidth;
      canvas.freeDrawingBrush = brush;
    }

    canvas.renderAll();
  };

  useEffect(() => {
    if (!canvasEl.current) return;
    const canvas = new Canvas(canvasEl.current, {
      width: 2000,
      height: 2000,
      selection: true,
    });
    canvasRef.current = canvas;

    canvas.backgroundColor = "#1f1f1f";
    canvas.requestRenderAll();

    const brush = new PencilBrush(canvas);
    brush.color = color;
    brush.width = strokeWidth;
    canvas.freeDrawingBrush = brush;
    canvas.isDrawingMode = true;

    saveState();

    canvas.on("path:created", saveState);
    canvas.on("object:modified", saveState);
    canvas.on("object:removed", saveState);

    return () => {
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (tool === "select") {
      canvas.isDrawingMode = false;
      canvas.selection = true;
      canvas.forEachObject((obj) => (obj.selectable = true));
    } else {
      canvas.isDrawingMode = true;
      canvas.selection = false;
      canvas.forEachObject((obj) => (obj.selectable = false));

      const brush = new PencilBrush(canvas);
      brush.color = color;
      brush.width = strokeWidth;
      canvas.freeDrawingBrush = brush;
    }

    canvas.requestRenderAll();
  }, [tool, color, strokeWidth]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !canvasRef.current) return;

    const reader = new FileReader();
    reader.onload = (f) => {
      const url = f.target?.result as string;

      const imageEl = document.createElement("img");
      imageEl.crossOrigin = "anonymous";
      imageEl.src = url;

      imageEl.onload = () => {
        const fabricImage = new FabricImage(imageEl, {
          left: 100,
          top: 100,
          scaleX: 0.5,
          scaleY: 0.5,
        });

        canvasRef.current?.add(fabricImage);
        canvasRef.current?.setActiveObject(fabricImage);
        canvasRef.current?.requestRenderAll();

        saveState();
      };
    };

    reader.readAsDataURL(file);
  };

  const handleExportAsPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataURL = canvas.toDataURL({
      format: "png",
      quality: 1.0,
      multiplier: 2,
    });

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "drawing.png";
    link.click();
  };

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return (
    <div>
      <div className="toolbar space-x-4 p-4 px-8 bg-gray-800 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="https://uwit.rs" target="_blank">
            <Image
              alt="uwit logo"
              src="https://uwit.rs/_next/static/media/gradient white.bf208e81.svg"
              width={100}
              height={50}
              className="cursor-pointer"
            />
          </Link>
          <Link href="/">
            <h1 className="text-2xl font-bold text-white">Black Board</h1>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={() => setTool("pencil")}>✏️ Pencil</button>
          <button onClick={() => setTool("select")}>🖱 Select</button>
          <button onClick={handleUndo}>↩️ Undo</button>
          <button onClick={handleRedo}>↪️ Redo</button>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <input
            type="range"
            min={1}
            max={10}
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(Number(e.target.value))}
          />
          <input type="file" onChange={handleImageUpload} />
          <button onClick={handleExportAsPNG}>🖼 Export PNG</button>
        </div>
      </div>
      <canvas ref={canvasEl} className="" />
    </div>
  );
}
