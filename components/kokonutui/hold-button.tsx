"use client";

/**
 * @author: @dorianbaffier (enhanced for SajDex portfolio)
 * @description: Hold Button - Tactile hold-to-confirm micro-interaction
 * @license: MIT
 * @website: https://kokonutui.com
 */

import {
  type LucideIcon,
  Download,
  Check,
  Send,
  Trash2,
  Copy,
} from "lucide-react";
import {
  AnimatePresence,
  type AnimationPlaybackControls,
  animate,
  MotionConfig,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import {
  type ButtonHTMLAttributes,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

export type HoldButtonVariant = "mono" | "emerald" | "blue" | "red";

const VARIANT_STYLES: Record<HoldButtonVariant, string> = {
  mono: cn(
    "border-[#E2E4E8] bg-white text-[#09090B] hover:bg-[#F4F4F6]",
    "dark:border-[#27272A] dark:bg-[#121316] dark:text-[#EDEDED] dark:hover:bg-[#1C1D22]",
    "data-complete:border-[#09090B] data-complete:bg-[#09090B] data-complete:text-white",
    "dark:data-complete:border-white dark:data-complete:bg-white dark:data-complete:text-[#09090B]"
  ),
  emerald: cn(
    "border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100/70",
    "dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-300 dark:hover:bg-emerald-500/15",
    "data-complete:border-emerald-600 data-complete:bg-emerald-600 data-complete:text-white",
    "dark:data-complete:border-emerald-500 dark:data-complete:bg-emerald-500 dark:data-complete:text-white"
  ),
  blue: cn(
    "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100/70",
    "dark:border-blue-500/25 dark:bg-blue-500/10 dark:text-blue-300 dark:hover:bg-blue-500/15",
    "data-complete:border-blue-600 data-complete:bg-blue-600 data-complete:text-white",
    "dark:data-complete:border-blue-500 dark:data-complete:bg-blue-500 dark:data-complete:text-white"
  ),
  red: cn(
    "border-red-200 bg-red-50 text-red-700 hover:bg-red-100/70",
    "dark:border-red-500/25 dark:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/15",
    "data-complete:border-red-600 data-complete:bg-red-600 data-complete:text-white",
    "dark:data-complete:border-red-500 dark:data-complete:bg-red-500 dark:data-complete:text-white"
  ),
};

const VARIANT_DEFAULTS: Record<
  HoldButtonVariant,
  { icon: LucideIcon; label: string; completeLabel: string }
> = {
  mono: { icon: Download, label: "Hold to download", completeLabel: "Downloaded" },
  emerald: { icon: Copy, label: "Hold to copy", completeLabel: "Copied" },
  blue: { icon: Send, label: "Hold to send", completeLabel: "Dispatched" },
  red: { icon: Trash2, label: "Hold to clear", completeLabel: "Cleared" },
};

export interface HoldButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  variant?: HoldButtonVariant;
  children?: ReactNode;
  icon?: LucideIcon;
  holdDuration?: number;
  holdingLabel?: ReactNode;
  completeLabel?: ReactNode;
  resetAfter?: number;
  onHoldComplete?: () => void;
}

type Phase = "idle" | "holding" | "complete";

const HOLD_KEYS = new Set([" ", "Enter"]);
const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const LABEL_TRANSITION = { duration: 0.2, ease: EASE_OUT };
const DRAIN_MS = 300;
const LABEL_DELAY_MS = 150;

function DrawnCheck() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 16 16">
      <motion.path
        animate={{ pathLength: 1 }}
        d="M3.5 8.5 6.5 11.5 12.5 4.5"
        initial={{ pathLength: 0 }}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        transition={{ duration: 0.3, delay: 0.1, ease: EASE_OUT }}
      />
    </svg>
  );
}

export default function HoldButton({
  className,
  variant = "mono",
  icon: CustomIcon,
  holdDuration = 1000,
  holdingLabel = "Keep holding...",
  completeLabel,
  resetAfter = 2000,
  onHoldComplete,
  children,
  type = "button",
  disabled,
  onPointerDown,
  onPointerUp,
  onPointerLeave,
  onPointerCancel,
  onKeyDown,
  onKeyUp,
  onBlur,
  ...props
}: HoldButtonProps) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [showHoldingLabel, setShowHoldingLabel] = useState(false);
  const labelTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const phaseRef = useRef<Phase>("idle");
  const progress = useMotionValue(0);
  const animationRef = useRef<AnimationPlaybackControls | null>(null);
  const resetRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onHoldCompleteRef = useRef(onHoldComplete);
  const shouldReduceMotion = useReducedMotion();
  const clipPath = useTransform(
    progress,
    (p: number) => `inset(0 ${(1 - p) * 100}% 0 0)`
  );

  const defaults = VARIANT_DEFAULTS[variant];
  const Icon = CustomIcon || defaults.icon;

  useEffect(() => {
    onHoldCompleteRef.current = onHoldComplete;
  }, [onHoldComplete]);

  useEffect(
    () => () => {
      animationRef.current?.stop();
      if (labelTimerRef.current) {
        clearTimeout(labelTimerRef.current);
      }
      if (resetRef.current) {
        clearTimeout(resetRef.current);
      }
    },
    []
  );

  const updatePhase = (next: Phase) => {
    phaseRef.current = next;
    setPhase(next);
  };

  const startHold = () => {
    if (disabled || phaseRef.current === "complete") {
      return;
    }
    if (resetRef.current) {
      clearTimeout(resetRef.current);
      resetRef.current = null;
    }
    updatePhase("holding");
    if (labelTimerRef.current) {
      clearTimeout(labelTimerRef.current);
    }
    labelTimerRef.current = setTimeout(() => {
      setShowHoldingLabel(true);
    }, LABEL_DELAY_MS);

    animationRef.current?.stop();
    if (shouldReduceMotion) {
      progress.set(1);
      finishHold();
      return;
    }
    const current = progress.get();
    const remainingMs = holdDuration * (1 - current);
    animationRef.current = animate(progress, 1, {
      duration: Math.max(0, remainingMs) / 1000,
      ease: "linear",
      onComplete: finishHold,
    });
  };

  const finishHold = () => {
    updatePhase("complete");
    setShowHoldingLabel(false);
    if (labelTimerRef.current) {
      clearTimeout(labelTimerRef.current);
    }
    try {
      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate?.([15, 40, 20]);
      }
    } catch {}

    onHoldCompleteRef.current?.();

    if (resetAfter > 0) {
      resetRef.current = setTimeout(() => {
        progress.set(0);
        updatePhase("idle");
      }, resetAfter);
    }
  };

  const endHold = () => {
    if (phaseRef.current !== "holding") {
      return;
    }
    animationRef.current?.stop();
    if (labelTimerRef.current) {
      clearTimeout(labelTimerRef.current);
    }
    setShowHoldingLabel(false);
    updatePhase("idle");
    const current = progress.get();
    if (current > 0) {
      animationRef.current = animate(progress, 0, {
        duration: (DRAIN_MS * current) / 1000,
        ease: EASE_OUT,
      });
    }
  };

  const handlePointerDown = (e: PointerEvent<HTMLButtonElement>) => {
    onPointerDown?.(e);
    if (e.button === 0) {
      e.currentTarget.setPointerCapture?.(e.pointerId);
      startHold();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(e);
    if (HOLD_KEYS.has(e.key) && !e.repeat) {
      startHold();
    }
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLButtonElement>) => {
    onKeyUp?.(e);
    if (HOLD_KEYS.has(e.key)) {
      endHold();
    }
  };

  const label =
    phase === "complete"
      ? (completeLabel ?? defaults.completeLabel)
      : showHoldingLabel
        ? holdingLabel
        : (children ?? defaults.label);

  const labelKey =
    phase === "complete" ? "complete" : showHoldingLabel ? "holding" : "idle";

  return (
    <MotionConfig reducedMotion="user">
      <button
        {...props}
        aria-disabled={disabled || phase === "complete"}
        className={cn(
          "group/hold relative inline-flex h-9 sm:h-10 min-w-36 sm:min-w-40 touch-none select-none items-center justify-center overflow-hidden rounded-lg px-3.5 sm:px-4 font-sans font-medium text-xs sm:text-sm border transition-[background-color,border-color,color] duration-150 ease-out cursor-pointer shadow-2xs active:scale-[0.98]",
          VARIANT_STYLES[variant],
          className
        )}
        data-complete={phase === "complete" ? "" : undefined}
        disabled={disabled}
        onBlur={(e) => {
          onBlur?.(e);
          endHold();
        }}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onPointerCancel={(e) => {
          onPointerCancel?.(e);
          endHold();
        }}
        onPointerDown={handlePointerDown}
        onPointerLeave={(e) => {
          onPointerLeave?.(e);
          endHold();
        }}
        onPointerUp={(e) => {
          onPointerUp?.(e);
          endHold();
        }}
        type={type}
      >
        {/* Fill layer */}
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-current/15 transition-opacity duration-150 group-data-complete/hold:opacity-0 dark:bg-current/20"
          style={{ clipPath }}
        />
        <span className="relative flex items-center justify-center overflow-hidden">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.span
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              className="inline-flex items-center gap-1.5 sm:gap-2 whitespace-nowrap"
              exit={{ opacity: 0, y: -10, filter: "blur(2px)" }}
              initial={{ opacity: 0, y: 10, filter: "blur(2px)" }}
              key={labelKey}
              transition={LABEL_TRANSITION}
            >
              {labelKey === "complete" ? (
                <DrawnCheck />
              ) : (
                <Icon aria-hidden="true" className="size-3.5 sm:size-4" />
              )}
              {label}
            </motion.span>
          </AnimatePresence>
        </span>
        <span aria-live="polite" className="sr-only">
          {phase === "complete"
            ? (completeLabel ?? defaults.completeLabel)
            : ""}
        </span>
      </button>
    </MotionConfig>
  );
}
