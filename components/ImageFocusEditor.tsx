"use client";

import { useRef } from "react";

function clamp(value: number) {
  return Math.min(100, Math.max(0, value));
}

export default function ImageFocusEditor({
  src,
  focusX,
  focusY,
  onChange,
}: {
  src: string;
  focusX: number;
  focusY: number;
  onChange: (x: number, y: number) => void;
}) {
  const drag = useRef<{ x: number; y: number; fx: number; fy: number } | null>(null);

  function start(e: React.PointerEvent<HTMLDivElement>) {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, fx: focusX, fy: focusY };
  }

  function move(e: React.PointerEvent<HTMLDivElement>) {
    if (!drag.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - drag.current.x;
    const dy = e.clientY - drag.current.y;
    onChange(
      clamp(drag.current.fx - (dx / Math.max(rect.width, 1)) * 100),
      clamp(drag.current.fy - (dy / Math.max(rect.height, 1)) * 100)
    );
  }

  function end() {
    drag.current = null;
  }

  const position = { objectPosition: `${focusX}% ${focusY}%` };

  return (
    <div className="focus-row">
      <div>
        <p className="meta">כך בדף הבית — גררו כדי למקם</p>
        <div
          className="focus-frame focus-home"
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerCancel={end}
        >
          <img src={src} alt="" style={position} draggable={false} />
        </div>
      </div>
      <div>
        <p className="meta">כך בתוך הכתבה — גררו כדי למקם</p>
        <div
          className="focus-frame focus-article"
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerCancel={end}
        >
          <img src={src} alt="" style={position} draggable={false} />
        </div>
      </div>
    </div>
  );
}
