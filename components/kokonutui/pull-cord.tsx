"use client";

/**
 * @author: @dorianbaffier (enhanced for SajDex on-screen ceiling mounting)
 * @description: Pull Cord - Real-time physics chain light switch
 * @license: MIT
 * @website: https://kokonutui.com
 */

import {
  type PointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

const WIDTH = 240;
const DEFAULT_HEIGHT = 270;
// Where the cord hangs from, under the lamp shade.
const ANCHOR = { x: WIDTH / 2 + 32, y: 116 };
// The cord is a chain of points joined by fixed-length links.
const LINKS = 12;
const LINK = 8.5;
// Simulation, in px and seconds. A fixed step keeps the chain stable on any refresh rate.
const STEP = 1 / 120;
const GRAVITY = 1400;
const DAMPING = 0.992;
const MAX_SPEED = 4;
const BEND_MIN = LINK * 1.9;
const BEND_STIFFNESS = 0.8;
const ITERATIONS = 14;
const CLICK_PULL = 22;
const MAX_STRETCH = 34;
const REST_EPSILON = 0.015;
const REST_STEPS = 24;

function damp(distance: number, max: number) {
  return max * (1 - Math.exp(-distance / max));
}

function haptic() {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    try {
      navigator.vibrate(8);
    } catch {}
  }
}

function relax(
  chain: { xs: Float64Array; ys: Float64Array; held: number },
  a: number,
  b: number,
  length: number,
  bend: boolean
) {
  const { xs, ys, held } = chain;
  const aFixed = a === 0 || a === held;
  const bFixed = b === held;
  if (aFixed && bFixed) {
    return;
  }
  const dx = xs[b] - xs[a];
  const dy = ys[b] - ys[a];
  const dist = Math.hypot(dx, dy) || 0.0001;
  if (bend && dist >= length) {
    return;
  }
  const diff = ((dist - length) / dist) * (bend ? BEND_STIFFNESS : 1);
  let wa = 0.5;
  if (aFixed) {
    wa = 0;
  } else if (bFixed) {
    wa = 1;
  }
  xs[a] += dx * diff * wa;
  ys[a] += dy * diff * wa;
  xs[b] -= dx * diff * (1 - wa);
  ys[b] -= dy * diff * (1 - wa);
}

function cordPath(xs: Float64Array, ys: Float64Array) {
  let d = `M${xs[0].toFixed(2)} ${ys[0].toFixed(2)}`;
  for (let i = 1; i < xs.length - 1; i++) {
    const mx = (xs[i] + xs[i + 1]) / 2;
    const my = (ys[i] + ys[i + 1]) / 2;
    d += ` Q${xs[i].toFixed(2)} ${ys[i].toFixed(2)} ${mx.toFixed(2)} ${my.toFixed(2)}`;
  }
  const last = xs.length - 1;
  d += ` L${xs[last].toFixed(2)} ${ys[last].toFixed(2)}`;
  return d;
}

function restingChain() {
  const xs = new Float64Array(LINKS + 1);
  const ys = new Float64Array(LINKS + 1);
  for (let i = 0; i <= LINKS; i++) {
    xs[i] = ANCHOR.x;
    ys[i] = ANCHOR.y + i * LINK;
  }
  return { xs, ys };
}

const REST = restingChain();
const REST_PATH = cordPath(REST.xs, REST.ys);

export interface PullCordProps {
  /** Controlled state. */
  checked?: boolean;
  /** Initial state when uncontrolled. */
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Accessible name of the switch. */
  label?: string;
  className?: string;
  /** Whether to render frameless without box border/background (for on-screen ceiling mounting). */
  frameless?: boolean;
  height?: number;
}

export default function PullCord({
  checked: checkedProp,
  defaultChecked = true,
  onCheckedChange,
  label = "Desk lamp",
  className,
  frameless = false,
  height = DEFAULT_HEIGHT,
}: PullCordProps) {
  const [internal, setInternal] = useState(defaultChecked);
  const checked = checkedProp ?? internal;
  const [focused, setFocused] = useState(false);
  const [grabbing, setGrabbing] = useState(false);

  const svgRef = useRef<SVGSVGElement>(null);
  const cordRef = useRef<SVGPathElement>(null);
  const hitRef = useRef<SVGPathElement>(null);
  const beadRef = useRef<SVGGElement>(null);

  const sim = useRef({
    xs: Float64Array.from(REST.xs),
    ys: Float64Array.from(REST.ys),
    pxs: Float64Array.from(REST.xs),
    pys: Float64Array.from(REST.ys),
    raf: 0,
    last: 0,
    carry: 0,
    still: 0,
    held: -1,
    targetX: 0,
    targetY: 0,
    armed: true,
    reduceMotion: false,
  });

  const latest = useRef<{ checked: boolean; toggle: (next: boolean) => void }>({
    checked,
    toggle: () => undefined,
  });

  const toggle = useCallback(
    (next: boolean) => {
      if (checkedProp === undefined) {
        setInternal(next);
      }
      onCheckedChange?.(next);
    },
    [checkedProp, onCheckedChange]
  );
  latest.current = { checked, toggle };

  const draw = useCallback(() => {
    const { xs, ys } = sim.current;
    const d = cordPath(xs, ys);
    cordRef.current?.setAttribute("d", d);
    hitRef.current?.setAttribute("d", d);

    const n = LINKS;
    const angle =
      (Math.atan2(xs[n] - xs[n - 1], ys[n] - ys[n - 1]) * 180) / Math.PI;
    beadRef.current?.setAttribute(
      "transform",
      `translate(${xs[n].toFixed(2)} ${ys[n].toFixed(2)}) rotate(${(-angle).toFixed(2)})`
    );
  }, []);

  const integrate = useCallback(() => {
    const s = sim.current;
    const { xs, ys, pxs, pys } = s;
    let moved = 0;
    for (let i = 1; i <= LINKS; i++) {
      if (i === s.held) {
        continue;
      }
      let vx = (xs[i] - pxs[i]) * DAMPING;
      let vy = (ys[i] - pys[i]) * DAMPING;
      const speed = Math.hypot(vx, vy);
      if (speed > MAX_SPEED) {
        vx *= MAX_SPEED / speed;
        vy *= MAX_SPEED / speed;
      }
      pxs[i] = xs[i];
      pys[i] = ys[i];
      xs[i] += vx;
      ys[i] += vy + GRAVITY * STEP * STEP;
      moved = Math.max(moved, Math.abs(vx) + Math.abs(vy));
    }
    if (s.held > 0) {
      const i = s.held;
      moved = Math.max(
        moved,
        Math.abs(s.targetX - xs[i]) + Math.abs(s.targetY - ys[i])
      );
      pxs[i] = xs[i];
      pys[i] = ys[i];
      xs[i] = s.targetX;
      xs[i] = s.targetX;
      ys[i] = s.targetY;
    }
    return moved;
  }, []);

  const constrain = useCallback(() => {
    const s = sim.current;
    for (let k = 0; k < ITERATIONS; k++) {
      for (let i = 0; i < LINKS; i++) {
        relax(s, i, i + 1, LINK, false);
      }
      for (let i = 0; i + 2 <= LINKS; i++) {
        relax(s, i, i + 2, BEND_MIN, true);
      }
    }
  }, []);

  const step = useCallback(() => {
    const moved = integrate();
    constrain();
    return moved;
  }, [integrate, constrain]);

  const tick = useCallback(
    (now: number) => {
      const s = sim.current;
      s.raf = 0;
      const elapsed = s.last ? Math.min((now - s.last) / 1000, 0.05) : STEP;
      s.last = now;
      s.carry += elapsed;
      let moved = 0;
      while (s.carry >= STEP) {
        moved = Math.max(moved, step());
        s.carry -= STEP;
      }
      draw();
      s.still = moved < REST_EPSILON ? s.still + 1 : 0;
      if (s.held > 0 || s.still < REST_STEPS) {
        s.raf = requestAnimationFrame(tick);
      } else {
        s.last = 0;
      }
    },
    [draw, step]
  );

  const wake = useCallback(() => {
    const s = sim.current;
    if (!s.raf) {
      s.last = performance.now();
      s.raf = requestAnimationFrame(tick);
    }
  }, [tick]);

  useEffect(() => {
    draw();
    const s = sim.current;
    s.reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    return () => cancelAnimationFrame(s.raf);
  }, [draw]);

  const localPoint = (event: PointerEvent) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) {
      return { x: 0, y: 0 };
    }
    return {
      x: ((event.clientX - rect.left) / rect.width) * WIDTH,
      y: ((event.clientY - rect.top) / rect.height) * height,
    };
  };

  const reach = (index: number, x: number, y: number) => {
    const dx = x - ANCHOR.x;
    const dy = y - ANCHOR.y;
    const dist = Math.hypot(dx, dy) || 0.0001;
    const length = index * LINK;
    if (dist <= length) {
      return { x, y, pull: 0 };
    }
    const allowed = length + damp(dist - length, MAX_STRETCH);
    return {
      x: ANCHOR.x + (dx / dist) * allowed,
      y: ANCHOR.y + (dy / dist) * allowed,
      pull: dy > 0 ? (allowed - length) * (dy / dist) : 0,
    };
  };

  const handlePointerDown = (event: PointerEvent<SVGElement>) => {
    const s = sim.current;
    if (s.held > 0) {
      return;
    }
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }
    event.preventDefault();
    const point = localPoint(event);
    let nearest = LINKS;
    let best = Number.POSITIVE_INFINITY;
    for (let i = 1; i <= LINKS; i++) {
      const d = Math.hypot(s.xs[i] - point.x, s.ys[i] - point.y);
      if (d < best) {
        best = d;
        nearest = i;
      }
    }
    s.held = nearest;
    svgRef.current?.setPointerCapture(event.pointerId);
    const target = reach(s.held, point.x, point.y);
    s.targetX = target.x;
    s.targetY = target.y;
    s.armed = true;
    setGrabbing(true);
    wake();
  };

  const handlePointerMove = (event: PointerEvent<SVGSVGElement>) => {
    const s = sim.current;
    if (s.held < 0) {
      return;
    }
    const point = localPoint(event);
    const target = reach(s.held, point.x, point.y);
    s.targetX = target.x;
    s.targetY = target.y;
    if (s.armed && target.pull > CLICK_PULL) {
      s.armed = false;
      haptic();
      latest.current.toggle(!latest.current.checked);
    } else if (!s.armed && target.pull < CLICK_PULL * 0.4) {
      s.armed = true;
    }
    wake();
  };

  const handlePointerUp = () => {
    const s = sim.current;
    if (s.held < 0) {
      return;
    }
    s.held = -1;
    setGrabbing(false);
    if (s.reduceMotion) {
      s.xs.set(REST.xs);
      s.ys.set(REST.ys);
      s.pxs.set(REST.xs);
      s.pys.set(REST.ys);
      draw();
      return;
    }
    wake();
  };

  const handleKeyToggle = () => {
    toggle(!checked);
    const s = sim.current;
    if (!s.reduceMotion) {
      s.pys[LINKS] = s.ys[LINKS] - 5;
      wake();
    }
  };

  return (
    <div
      className={cn(
        "relative select-none",
        !frameless && [
          "overflow-hidden rounded-3xl border transition-colors duration-300 ease-out",
          checked
            ? "border-zinc-200 bg-white text-zinc-900"
            : "border-zinc-800 bg-zinc-950 text-zinc-100",
        ],
        frameless && "pointer-events-none bg-transparent",
        className
      )}
      style={{ width: WIDTH, height }}
    >
      <svg
        aria-hidden="true"
        className={cn(
          "absolute inset-0 touch-none overflow-visible",
          frameless && "pointer-events-none",
          grabbing ? "cursor-grabbing" : "cursor-default"
        )}
        height={height}
        onLostPointerCapture={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        ref={svgRef}
        viewBox={`0 0 ${WIDTH} ${height}`}
        width={WIDTH}
      >
        {/* Ambient lamp glow when bulb is lit (Light mode) */}
        {checked && (
          <ellipse
            cx={WIDTH / 2}
            cy={126}
            rx={50}
            ry={32}
            className="fill-amber-400/20 dark:fill-amber-400/30 blur-md pointer-events-none transition-opacity duration-300"
          />
        )}

        {/* Ceiling wire and shade */}
        <line
          className={cn(
            "transition-[stroke] duration-300 ease-out",
            checked ? "stroke-zinc-400 dark:stroke-zinc-600" : "stroke-zinc-700 dark:stroke-zinc-600"
          )}
          strokeWidth={1.5}
          x1={WIDTH / 2}
          x2={WIDTH / 2}
          y1={0}
          y2={62}
        />
        <path
          className={cn(
            "transition-[fill] duration-300 ease-out drop-shadow-xs",
            checked ? "fill-zinc-800 dark:fill-zinc-700" : "fill-zinc-800 dark:fill-zinc-800"
          )}
          d={`M${WIDTH / 2 - 14} 62 h28 l38 50 q2 4 -3 4 h-98 q-5 0 -3 -4 Z`}
        />

        {/* The bulb, lit or dimmed */}
        <path
          className={cn(
            "transition-[fill] duration-300 ease-out",
            checked ? "fill-amber-400" : "fill-zinc-600 dark:fill-zinc-700"
          )}
          d={`M${WIDTH / 2 - 15} 116 a15 13 0 0 0 30 0 Z`}
        />

        {/* The visual pull cord */}
        <path
          className={cn(
            "transition-[stroke] duration-300 ease-out",
            checked ? "stroke-zinc-500 dark:stroke-zinc-400" : "stroke-zinc-600 dark:stroke-zinc-500"
          )}
          d={REST_PATH}
          fill="none"
          ref={cordRef}
          strokeLinecap="round"
          strokeWidth={1.5}
        />

        {/* A wider invisible copy of the cord, so it's easy to grab */}
        <path
          className={cn("pointer-events-auto", !grabbing && "cursor-grab")}
          d={REST_PATH}
          fill="none"
          onPointerDown={handlePointerDown}
          pointerEvents="stroke"
          ref={hitRef}
          stroke="transparent"
          strokeWidth={26}
        />

        {/* The tactile bead at the bottom of the cord */}
        <g
          className={cn("pointer-events-auto", !grabbing && "cursor-grab")}
          onPointerDown={handlePointerDown}
          ref={beadRef}
          transform={`translate(${ANCHOR.x} ${ANCHOR.y + LINKS * LINK})`}
        >
          <circle fill="transparent" r={26} />
          {focused && (
            <rect
              className="fill-none stroke-amber-400"
              height={30}
              rx={9}
              strokeWidth={2}
              width={20}
              x={-10}
              y={-4}
            />
          )}
          <rect
            className={cn(
              "transition-[fill] duration-300 ease-out shadow-md",
              checked ? "fill-amber-500" : "fill-zinc-300 dark:fill-zinc-400"
            )}
            height={20}
            rx={5}
            width={10}
            x={-5}
            y={1}
          />
        </g>
      </svg>

      {!frameless && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6">
          <p className="font-medium text-sm">{label}</p>
          <p className="text-sm text-zinc-500">
            {checked ? "On" : "Off"} · pull the cord
          </p>
        </div>
      )}

      <button
        aria-checked={checked}
        aria-label={label}
        className="sr-only"
        onBlur={() => setFocused(false)}
        onClick={handleKeyToggle}
        onFocus={(event) =>
          setFocused(event.currentTarget.matches(":focus-visible"))
        }
        role="switch"
        type="button"
      />
    </div>
  );
}
