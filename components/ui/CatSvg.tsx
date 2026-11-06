'use client';

import React, { useId, useMemo, useRef, useEffect } from 'react';
import { useAnimationFrame } from 'framer-motion';
import { CAT_SIT } from './catData';
import { MOSI_MOSI } from './catDance';

const BASE_DARK = '#060c18';
const STROKE_COLOR = '#2d4663';
const CORE_COLOR = '#3a5874';
const CREAM_COLOR = '#f7ebd7';
const RED_COLOR = '#d02a1e';

const EXPRESSIONS = ['happy', 'sleepy', 'surprised', 'judging', 'love', 'smug'] as const;
type ExpressionType = (typeof EXPRESSIONS)[number] | 'neutral';

const degToRad = Math.PI / 180;
const formatRotate = (angle: number, [cx, cy]: readonly [number, number]) =>
  `rotate(${angle.toFixed(3)} ${cx} ${cy})`;
const formatScale = (sx: number, sy: number, [cx, cy]: readonly [number, number]) =>
  `translate(${cx} ${cy}) scale(${sx.toFixed(4)} ${sy.toFixed(4)}) translate(${-cx} ${-cy})`;

function rng(state: { seed: number }) {
  state.seed = (1664525 * state.seed + 0x3c6ef35f) >>> 0;
  return state.seed / 0x100000000;
}

const isStrokeFx = (fx: any) => fx.draw ?? (!fx.fill && !fx.dashed);

interface PartProps {
  part: any;
  small?: boolean;
  tag?: string;
}

function VectorPart({ part, small, tag }: PartProps) {
  if (!part) return null;
  return (
    <>
      <path d={part.fill} fill={BASE_DARK} fillRule="evenodd" />
      {part.line && (
        <path
          d={part.line}
          fill={STROKE_COLOR}
          fillRule="evenodd"
          {...(small && { stroke: CORE_COLOR, strokeWidth: 0.55, vectorEffect: 'non-scaling-stroke' })}
        />
      )}
      {part.core && <path d={part.core} fill={CORE_COLOR} fillRule="evenodd" />}
      {part.dark && <path d={part.dark} fill="#02040a" fillRule="evenodd" />}
      {part.red && <path d={part.red} fill={RED_COLOR} fillRule="evenodd" data-part={tag ? `${tag}-red` : undefined} />}
    </>
  );
}

const HAND_TYPES = ['open', 'point', 'fist', 'bean'] as const;

function PawHand({ id, small }: { id: string; small?: boolean }) {
  const sw = small ? 0.8 : 2.4;
  const nonScale = small ? { vectorEffect: 'non-scaling-stroke' as const } : {};

  const outlines: Record<string, React.ReactNode> = {
    open: (
      <>
        <ellipse cx={0} cy={-1} rx={13.5} ry={12.5} />
        <circle cx={-12.5} cy={7} r={5.4} />
        <circle cx={-5} cy={12.5} r={5.6} />
        <circle cx={5} cy={12.5} r={5.6} />
        <circle cx={12.5} cy={7} r={5.4} />
      </>
    ),
    point: (
      <>
        <ellipse cx={0} cy={0} rx={13} ry={12.5} />
        <rect x={-4.6} y={2} width={9.2} height={23} rx={4.6} />
      </>
    ),
    fist: <ellipse cx={0} cy={0} rx={13.5} ry={13} />,
    bean: <ellipse cx={0} cy={0} rx={13} ry={12.5} />
  };

  const details: Record<string, React.ReactNode> = {
    open: (
      <>
        <path d="M-5.5 1C-5.5-3.5 5.5-3.5 5.5 1C5.5 4.5 2.5 5 0 5C-2.5 5-5.5 4.5-5.5 1Z" fill={CORE_COLOR} />
        {[[-12, 8.5], [-4.8, 14], [4.8, 14], [12, 8.5]].map(([cx, cy], idx) => (
          <circle key={idx} cx={cx} cy={cy} r={1.9} fill={CORE_COLOR} />
        ))}
      </>
    ),
    point: (
      <path
        d="M-9.5 3Q-7 8-3.5 6M9.5 3Q7 8 3.5 6"
        fill="none"
        stroke={STROKE_COLOR}
        strokeWidth={small ? 0.6 : 1.3}
        strokeLinecap="round"
        {...nonScale}
      />
    ),
    fist: (
      <path
        d="M-9 4.5Q-6.5 9-3 6.5M-3 7.5Q0 10.5 3 7.5M3 6.5Q6.5 9 9 4.5"
        fill="none"
        stroke={STROKE_COLOR}
        strokeWidth={small ? 0.6 : 1.3}
        strokeLinecap="round"
        {...nonScale}
      />
    ),
    bean: (
      <path
        d="M-3.5 6.5L-3 11.5M3.5 6.5L3 11.5"
        fill="none"
        stroke={STROKE_COLOR}
        strokeWidth={small ? 0.6 : 1.3}
        strokeLinecap="round"
        {...nonScale}
      />
    )
  };

  return (
    <g data-part={id} transform="scale(0)">
      {HAND_TYPES.map((h) => (
        <g key={h} data-part={`${id}-${h}`} opacity={0}>
          <g fill={BASE_DARK} stroke={STROKE_COLOR} strokeWidth={sw} {...nonScale}>
            {outlines[h]}
          </g>
          <g fill={BASE_DARK}>{outlines[h]}</g>
          {details[h]}
        </g>
      ))}
    </g>
  );
}

function EyeComponent({ eye, index, clipId }: { eye: any; index: number; clipId: string }) {
  const [cx, cy] = eye.c;
  const [rx, ry] = eye.r;
  const minX = cx - rx - 6;
  const maxX = cx + rx + 6;
  const topY = cy - ry;

  const arcPath = (y1: number, y2: number) =>
    `M${(cx - 0.66 * rx).toFixed(1)} ${(cy + y1 * ry).toFixed(1)}Q${cx.toFixed(1)} ${(cy + y2 * ry).toFixed(1)} ${(cx + 0.66 * rx).toFixed(1)} ${(cy + y1 * ry).toFixed(1)}`;
  const arcStroke = {
    fill: 'none',
    stroke: CREAM_COLOR,
    strokeWidth: Math.max(5, 0.26 * rx),
    strokeLinecap: 'round' as const
  };

  const sign = index === 0 ? 1 : -1;
  const winkPath = `M${(cx - sign * rx * 0.5).toFixed(1)} ${(cy - 0.42 * ry).toFixed(1)}L${(cx + sign * rx * 0.45).toFixed(1)} ${cy.toFixed(1)}L${(cx - sign * rx * 0.5).toFixed(1)} ${(cy + 0.42 * ry).toFixed(1)}`;

  return (
    <g data-part={`eyeWrap${index}`}>
      <g data-part={`eye${index}`}>
        <path d={eye.cream} fill={CREAM_COLOR} />
        <g clipPath={clipId}>
          <g data-part={`pupil${index}`}>
            <g data-part={`pupilShape${index}`}>
              <path d={eye.pupil} fill="#07090d" />
            </g>
            <g data-part={`heart${index}`} opacity={0}>
              <path
                d="M0 9C-7 4-12 0-12-5C-12-10-7-12-4-11C-2-10.5-0.8-9 0-7.5C0.8-9 2-10.5 4-11C7-12 12-10 12-5C12 0 7 4 0 9Z"
                transform={`translate(${eye.p[0]} ${eye.p[1] + 1}) scale(${(rx / 15).toFixed(3)})`}
                fill={RED_COLOR}
              />
            </g>
          </g>
          <g data-part={`lid${index}`}>
            <path d={`M${minX} ${topY - 90}H${maxX}V${topY}H${minX}Z`} fill={BASE_DARK} />
            <path d={`M${minX} ${topY}H${maxX}`} stroke={STROKE_COLOR} strokeWidth={3.2} />
          </g>
        </g>
      </g>
      <g data-part={`arcH${index}`} opacity={0}>
        <path d={arcPath(0.22, -0.75)} {...arcStroke} />
      </g>
      <g data-part={`arcS${index}`} opacity={0}>
        <path d={arcPath(-0.05, 0.6)} {...arcStroke} />
      </g>
      <g data-part={`arcE${index}`} opacity={0}>
        <path d={winkPath} {...arcStroke} strokeLinejoin="round" />
      </g>
    </g>
  );
}

function TailsAndSmoke({ data, filter, small }: { data: any; filter?: string; small?: boolean }) {
  const parts = data.parts;
  const smoke = (
    <g data-part="smoke">
      <path d={data.smoke.d} fill="#1f3b61" fillRule="evenodd" filter={filter} />
    </g>
  );

  const wrapTail = (partName: string, child: React.ReactNode) =>
    parts[partName] ? (
      <g data-part={partName}>
        <VectorPart part={parts[partName]} small={small} />
        {child}
      </g>
    ) : (
      child
    );

  return wrapTail('tail1', wrapTail('tail2', wrapTail('tail3', smoke)));
}

export interface CatSvgProps {
  data?: typeof CAT_SIT;
  action?: 'idle' | 'walk' | 'still';
  gaze?: 'wander' | 'pointer' | 'rest' | [number, number];
  expression?: ExpressionType;
  cadence?: number;
  dance?: typeof MOSI_MOSI | null;
  danceStart?: number | null;
  freeze?: number | null;
  paused?: boolean;
  small?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function CatSvg({
  data = CAT_SIT,
  action = 'idle',
  gaze = 'wander',
  expression = 'neutral',
  cadence = 0.9,
  dance = null,
  danceStart = null,
  freeze = null,
  paused = false,
  small = false,
  className = '',
  style
}: CatSvgProps) {
  const rawId = useId();
  const idPrefix = useMemo(() => rawId.replace(/:/g, ''), [rawId]);

  const stateRef = useRef({
    nodes: {} as Record<string, SVGElement>,
    off: null as SVGElement | null,
    pointer: null as [number, number] | null,
    seed: 0x135289e,
    blinkAt: 1.2,
    blinkDouble: false,
    twitchAt: 2.5,
    saccadeAt: 0.8,
    gazeT: [0, 0] as [number, number],
    gaze: [0, 0] as [number, number],
    absW: 0,
    gazeAbs: [0, 0] as [number, number],
    ex: {} as Record<string, number>,
    walk: 0,
    phase: 0,
    last: 0
  });

  const parts = data.parts;

  const eyesWithLimits = useMemo(
    () =>
      data.eyes.map((e: any) => {
        const tx = Math.max(0.5, e.r[0] - e.pr[0] - 1.2);
        const ty = Math.max(0.5, e.r[1] - e.pr[1] - 1.2);
        return {
          ...e,
          tx,
          ty,
          rest: [(e.p[0] - e.c[0]) / tx, (e.p[1] - e.c[1]) / ty] as [number, number]
        };
      }),
    [data]
  );

  const legsList = useMemo(
    () => ['legBR', 'legBL', 'legFR', 'legFL'].filter((l) => (data.parts as any)[l]),
    [data]
  );

  const smokeBounds = useMemo(() => {
    const nums = data.smoke.d.match(/-?\d+(\.\d+)?/g)?.map(Number) || [0, 0, 100, 100];
    const xs = nums.filter((_, i) => i % 2 === 0);
    const ys = nums.filter((_, i) => i % 2 === 1);
    const minX = Math.min(...xs) - 8;
    const minY = Math.min(...ys) - 8;
    return [minX, minY, Math.max(...xs) - minX + 16, Math.max(...ys) - minY + 16];
  }, [data]);

  // Animation frame loop
  useAnimationFrame((timeMs) => {
    if (paused) return;
    const st = stateRef.current;
    const isStill = action === 'still';
    const headPivot = parts.head.pivot;
    const bodyPivot = parts.body.pivot;
    const pivotDy = bodyPivot[1] - headPivot[1];

    const elapsedSec = (isStill ? 0 : timeMs) / 1000;
    const dt = isStill ? 0.2 : Math.min(0.05, elapsedSec - st.last || 0.016);
    st.last = elapsedSec;

    const setTransform = (key: string, val: string) =>
      st.nodes[key]?.setAttribute('transform', isStill ? '' : val);
    const setAttr = (key: string, attr: string, val: string) =>
      st.nodes[key]?.setAttribute(attr, val);

    let danceFrame: any = null;
    if (dance && !isStill) {
      if (danceStart != null) {
        const danceTime = (performance.now() - danceStart) / 1000;
        if (danceTime >= 0 && danceTime <= dance.duration) {
          danceFrame = dance.frame(danceTime);
        }
      } else if (freeze != null) {
        danceFrame = dance.frame(freeze);
      }
    }

    // Blend expressions smoothly
    const expAlpha = 1 - Math.exp(-9 * dt);
    for (const exp of EXPRESSIONS) {
      const target = Math.max(+(expression === exp), danceFrame?.expr?.[exp] ?? 0);
      st.ex[exp] = (st.ex[exp] ?? 0) + (target - (st.ex[exp] ?? 0)) * expAlpha;
    }

    const { happy = 0, sleepy = 0, surprised = 0, judging = 0, love = 0, smug = 0 } = st.ex;

    const isWalking = action === 'walk' && legsList.length > 0 && !danceFrame;
    st.walk += (Number(isWalking) - st.walk) * Math.min(1, 6 * dt);
    st.phase += dt * cadence * Math.PI * 2 * (isWalking ? 1 : st.walk);

    const walkAmt = st.walk;
    const walkPhase = st.phase;

    // Breathing rhythm
    const breathSin = Math.sin((elapsedSec * Math.PI * 2) / (3.4 + 1.6 * sleepy));
    const scaleY = 1 + (0.014 + 0.008 * sleepy) * breathSin * (1 - walkAmt);
    const scaleX = 1 + 0.006 * breathSin * (1 - walkAmt);

    const hopY = -2.6 * walkAmt * (0.5 + 0.5 * Math.cos(2 * walkPhase)) + (danceFrame?.hopY ?? 0);
    const rock = 1.2 * walkAmt * Math.sin(walkPhase) + (danceFrame?.rock ?? 0);
    const lean = danceFrame?.lean ?? 0;
    const squash = danceFrame?.squash ?? 0;
    const faceTurn = danceFrame?.face ?? 0;

    const spinCos = Math.cos((danceFrame?.spin ?? 0) * Math.PI * 2);
    const isBackFacing = spinCos < 0;
    const spinFactor =
      (0.08 > Math.abs(spinCos) ? 0.08 * Math.sign(spinCos || 1) : spinCos) *
      (1 - 0.1 * Math.abs(faceTurn));

    setTransform(
      'root',
      `translate(${(danceFrame?.x ?? 0).toFixed(3)} ${hopY.toFixed(3)}) ${formatRotate(
        rock,
        data.anchor
      )} ${formatScale((1 + lean + squash) * spinFactor, 1 + lean - squash, data.anchor)}`
    );

    // Front details opacity when spinning
    for (const p of ['head-red', 'earR-red', 'earL-red', 'flap-red', 'body-red', 'bow']) {
      setAttr(p, 'opacity', isBackFacing ? '0' : '1');
    }

    setTransform('body', formatScale(scaleX, scaleY, bodyPivot));
    setTransform('bodySocket', formatScale(scaleX, scaleY, bodyPivot));

    const headBreathingOffset = -(scaleY - 1) * pivotDy;
    const headBob = 1.1 * walkAmt * Math.cos(2 * walkPhase - 0.7);
    const headY = headBreathingOffset + headBob + (danceFrame?.headY ?? 0) + 3 * sleepy - 3 * surprised;
    const headTilt =
      1.3 * Math.sin(0.55 * elapsedSec) * (1 - walkAmt) * (danceFrame ? 0.3 : 1) +
      1.6 * walkAmt * Math.sin(walkPhase - 0.5) +
      (danceFrame?.tilt ?? 0) +
      7 * smug -
      3 * judging +
      4 * love * Math.sin(2.4 * elapsedSec);
    const headX = 16 * faceTurn;

    setTransform('head', `translate(${headX.toFixed(3)} ${headY.toFixed(3)}) ${formatRotate(headTilt, headPivot)}`);
    setTransform(
      'bow',
      `translate(${(0.55 * headX).toFixed(3)} ${(0.7 * headBreathingOffset + 0.6 * headBob + (danceFrame?.headY ?? 0) * 0.85).toFixed(3)}) ${formatRotate(0.3 * headTilt, headPivot)}`
    );

    // Legs walk cycle
    for (const leg of legsList) {
      const isDiagonal = leg === 'legFL' || leg === 'legBR';
      setTransform(
        leg,
        formatRotate(
          17 * walkAmt * Math.sin(walkPhase + (isDiagonal ? 0 : Math.PI)),
          (parts as any)[leg].pivot
        )
      );
    }

    // Ear twitches
    if (elapsedSec > st.twitchAt + 0.6) {
      st.twitchAt = elapsedSec + 3 + 5 * rng(st);
    }
    const twitchDt = elapsedSec - st.twitchAt;
    const twitchAngle =
      twitchDt > 0 && twitchDt < 0.6 && !danceFrame
        ? -11 * Math.exp(-6 * twitchDt) * Math.sin(twitchDt * Math.PI * 7)
        : 0;
    const earBob = 3 * walkAmt * Math.sin(2 * walkPhase - 1.2);
    const earMood = -11 * surprised + 10 * sleepy + 4 * judging;

    if (parts.earR) {
      setTransform(
        'earR',
        formatRotate(twitchAngle + earBob + (danceFrame?.earR ?? 0) + earMood, parts.earR.pivot)
      );
    }
    if ((parts as any).earL) {
      setTransform(
        'earL',
        formatRotate(
          -0.35 * twitchAngle - 0.8 * earBob + (danceFrame?.earL ?? 0) - 0.6 * earMood,
          (parts as any).earL.pivot
        )
      );
    }
    if (parts.flap) {
      setTransform(
        'flap',
        formatRotate(
          -0.3 * twitchAngle + 2 * walkAmt * Math.sin(2 * walkPhase - 1.6) + (danceFrame?.earL ?? 0) * 0.6 - 0.6 * earMood,
          parts.flap.pivot
        )
      );
    }

    // Tail motion
    const tailSpeed = 2 * Math.PI / (3.6 - 2.2 * walkAmt + 2 * sleepy);
    const tailMul = 1 + 0.6 * walkAmt - 0.4 * sleepy;
    const tailDance = danceFrame ? danceFrame.tail * Math.sin(Math.PI * danceFrame.beat) : 0;
    const applyTail = (partName: string, amp: number, phaseShift: number, danceFactor: number) => {
      if ((parts as any)[partName]) {
        setTransform(
          partName,
          formatRotate(
            amp * tailMul * Math.sin(tailSpeed * elapsedSec - phaseShift) + danceFactor,
            (parts as any)[partName].pivot
          )
        );
      }
    };

    applyTail('tail1', 4, 0, 0.15 * tailDance);
    applyTail('tail2', 6, 0.7, 0.3 * tailDance);
    applyTail('tail3', 8, 1.4, 0.5 * tailDance);

    // Smoke / antenna radio wave
    const smokePivot = data.smoke.pivot;
    const smokeSkew = 7 * Math.sin(tailSpeed * elapsedSec - 2.1) + 3 * Math.sin(1.7 * elapsedSec) + 0.6 * tailDance;
    setTransform(
      'smoke',
      `${formatRotate(4 * tailMul * Math.sin(tailSpeed * elapsedSec - 2.1) + tailDance, smokePivot)} translate(${smokePivot[0]} ${smokePivot[1]}) skewX(${smokeSkew.toFixed(3)}) translate(${-smokePivot[0]} ${-smokePivot[1]})`
    );
    st.off?.setAttribute('dy', isStill ? '0' : (-9 * elapsedSec).toFixed(2));

    // Blinking
    const blinkDuration = 0.16 + 0.55 * sleepy;
    if (elapsedSec > st.blinkAt + blinkDuration + 0.25) {
      st.blinkDouble = rng(st) < 0.22 * (1 - sleepy);
      st.blinkAt = elapsedSec + 2.2 + 3.6 * rng(st) + 1.5 * sleepy;
    }
    const blinkDt = elapsedSec - st.blinkAt;
    const blinkShape = (t: number) => (t > 0 && t < blinkDuration ? Math.sin((t / blinkDuration) * Math.PI) : 0);
    const eyelidOpen = 1 - 0.93 * Math.max(blinkShape(blinkDt), st.blinkDouble ? blinkShape(blinkDt - blinkDuration - 0.06) : 0);

    // Gaze tracking
    if (gaze === 'wander') {
      if (elapsedSec > st.saccadeAt) {
        st.saccadeAt = elapsedSec + 1.2 + 2.8 * rng(st);
        st.gazeT = 0.4 > rng(st) ? [0, 0] : [(2 * rng(st) - 1) * 0.9, (2 * rng(st) - 1) * 0.6];
      }
    } else if (gaze === 'pointer') {
      const ctm = (st.nodes.root as any)?.ownerSVGElement?.getScreenCTM();
      if (st.pointer && ctm) {
        const domPoint = new DOMPoint(headPivot[0], headPivot[1] - 0.4 * pivotDy).matrixTransform(ctm);
        st.gazeT = [
          Math.max(-1, Math.min(1, (st.pointer[0] - domPoint.x) / 260)),
          Math.max(-1, Math.min(1, (st.pointer[1] - domPoint.y) / 200))
        ];
      }
    } else if (gaze === 'rest') {
      st.gazeT = [0, 0];
    } else if (Array.isArray(gaze)) {
      st.gazeT = gaze;
    }

    const gazeSmoothing = 1 - Math.exp(-18 * dt);
    st.gaze = [
      st.gaze[0] + (st.gazeT[0] - st.gaze[0]) * gazeSmoothing,
      st.gaze[1] + (st.gazeT[1] - st.gaze[1]) * gazeSmoothing
    ];

    const forcedGaze = danceFrame?.gaze;
    const overrideWeight = forcedGaze ? 1 : Math.max(judging, 0.8 * sleepy);
    st.absW += (overrideWeight - st.absW) * gazeSmoothing;
    if (forcedGaze) {
      st.gazeAbs = [
        st.gazeAbs[0] + (forcedGaze[0] - st.gazeAbs[0]) * gazeSmoothing,
        st.gazeAbs[1] + (forcedGaze[1] - st.gazeAbs[1]) * gazeSmoothing
      ];
    }

    const eyeLidDroop = Math.max(0.56 * sleepy, 0.48 * judging);

    // Update each eye
    eyesWithLimits.forEach((eye: any, idx: number) => {
      const isAsleep = danceFrame?.asleep ?? 0;
      const isScrunch = danceFrame?.scrunch ?? 0;
      const isClosed = Math.max(happy, smug, isAsleep, isScrunch, idx === 1 ? danceFrame?.wink ?? 0 : 0);
      const eyeScale = 1 + 0.14 * surprised + 0.04 * love;
      const eyeSideSkew = Math.max(0, idx === 0 ? faceTurn : -faceTurn);

      st.nodes[`eyeWrap${idx}`]?.setAttribute(
        'transform',
        formatScale(eyeScale * (1 - 0.3 * eyeSideSkew), eyeScale, eye.c)
      );
      setAttr(`eyeWrap${idx}`, 'opacity', isBackFacing ? '0' : '1');

      st.nodes[`eye${idx}`]?.setAttribute(
        'transform',
        formatScale(1, (isStill ? 1 : eyelidOpen) * (1 - 0.94 * isClosed), eye.c)
      );
      setAttr(`eye${idx}`, 'opacity', Math.max(0, Math.min(1, (0.92 - isClosed) / 0.3)).toFixed(3));

      let gazeX = (eye.rest[0] + st.gaze[0]) * (1 - st.absW) + st.gazeAbs[0] * st.absW;
      let gazeY = (eye.rest[1] + st.gaze[1]) * (1 - st.absW) + st.gazeAbs[1] * st.absW;
      const dist = Math.hypot(gazeX, gazeY);
      if (dist > 1) {
        gazeX /= dist;
        gazeY /= dist;
      }

      st.nodes[`pupil${idx}`]?.setAttribute(
        'transform',
        `translate(${(gazeX * eye.tx - (eye.p[0] - eye.c[0])).toFixed(3)} ${(gazeY * eye.ty - (eye.p[1] - eye.c[1])).toFixed(3)})`
      );

      const pupilShrink = 1 - 0.32 * surprised;
      st.nodes[`pupilShape${idx}`]?.setAttribute(
        'transform',
        formatScale(
          pupilShrink * (danceFrame?.pupil?.[0] ?? 1),
          pupilShrink * (danceFrame?.pupil?.[1] ?? 1),
          eye.p
        )
      );
      setAttr(`pupilShape${idx}`, 'opacity', (1 - love).toFixed(3));

      const heartPulse = 0.9 + 0.12 * Math.max(0, Math.sin(7.5 * elapsedSec)) ** 4;
      st.nodes[`heart${idx}`]?.setAttribute(
        'transform',
        formatScale(heartPulse * (0.5 + 0.5 * love), heartPulse * (0.5 + 0.5 * love), eye.p)
      );
      setAttr(`heart${idx}`, 'opacity', love.toFixed(3));

      st.nodes[`lid${idx}`]?.setAttribute('transform', `translate(0 ${(2 * eyeLidDroop * eye.r[1]).toFixed(3)})`);

      const happyArc = Math.max(happy, idx === 1 ? danceFrame?.wink ?? 0 : 0) * (1 - Math.max(smug, isAsleep, isScrunch));
      setAttr(`arcE${idx}`, 'opacity', Math.min(1, 1.4 * isScrunch - 0.2).toFixed(3));
      setAttr(`arcH${idx}`, 'opacity', Math.min(1, 1.4 * happyArc - 0.2).toFixed(3));
      setAttr(`arcS${idx}`, 'opacity', Math.min(1, 1.4 * Math.max(smug, isAsleep) - 0.2).toFixed(3));
    });

    if (!dance) return;

    // Inverse kinematics for arms & legs in dance
    const renderLimb = (partId: string, baseJoint: [number, number], targetLimb: any, armIndex: number) => {
      const visibility = targetLimb ? targetLimb.k * targetLimb.show : 0;
      const hideLimb = (k: string) => {
        setAttr(k, 'transform', 'scale(0)');
        setAttr(`${k}h`, 'transform', 'scale(0)');
      };

      if (!targetLimb || visibility < 0.02) {
        hideLimb(partId);
        hideLimb(`${partId}b`);
        return null;
      }

      hideLimb(targetLimb.behind ? partId : `${partId}b`);
      if (targetLimb.behind) {
        partId = `${partId}b`;
      }

      let [tx, ty] = targetLimb.p;
      if (targetLimb.head) {
        const rad = headTilt * degToRad;
        const cosA = Math.cos(rad);
        const sinA = Math.sin(rad);
        const dx = tx - headPivot[0];
        const dy = ty - headPivot[1];
        tx = headPivot[0] + dx * cosA - dy * sinA + headX;
        ty = headPivot[1] + dx * sinA + dy * cosA + headY;
      }

      if (targetLimb.behind && armIndex >= 0 && dance.shouldersBehind) {
        baseJoint = dance.shouldersBehind[armIndex];
      }

      const dx = tx - baseJoint[0];
      const dy = ty - baseJoint[1];
      const angleDeg = Math.atan2(-dx, dy) / degToRad;
      const reachMax = (targetLimb.behind ? dance.reachBehind : undefined) ?? dance.reach ?? 1.45;
      const stretch = Math.max(0.45, Math.min(reachMax, Math.hypot(dx, dy) / (dance.armLen * visibility)));

      setAttr(
        partId,
        'transform',
        `translate(${baseJoint[0]} ${baseJoint[1]}) rotate(${angleDeg.toFixed(2)}) scale(${visibility.toFixed(3)} ${(visibility * stretch).toFixed(3)})`
      );

      const handShape = targetLimb.hand ?? (dance.beans && armIndex >= 0 ? 'bean' : 'paw');
      const offsetLen = (76 * stretch - 12.5) * visibility;
      const handX = baseJoint[0] - offsetLen * Math.sin(angleDeg * degToRad);
      const handY = baseJoint[1] + offsetLen * Math.cos(angleDeg * degToRad);

      setAttr(
        `${partId}h`,
        'transform',
        handShape === 'paw'
          ? 'scale(0)'
          : `translate(${handX.toFixed(2)} ${handY.toFixed(2)}) rotate(${(targetLimb.aim ?? angleDeg).toFixed(2)}) scale(${visibility.toFixed(3)})`
      );

      for (const h of HAND_TYPES) {
        setAttr(`${partId}h-${h}`, 'opacity', h === handShape ? '1' : '0');
      }

      const isHiddenBehindBack = isBackFacing && ty > bodyPivot[1] + 30 && armIndex >= 0;
      setAttr(partId, 'opacity', isHiddenBehindBack ? '0' : '1');
      setAttr(`${partId}h`, 'opacity', isHiddenBehindBack ? '0' : '1');

      return [tx, ty];
    };

    dance.shoulders.forEach((shoulder, i) => {
      renderLimb(`arm${i}`, shoulder, danceFrame?.arms[i], i);
    });
    dance.hips?.forEach((hip, i) => {
      renderLimb(`leg${i}`, hip, danceFrame?.legs?.[i], -1);
    });

    // Special effects (signals, rays)
    for (const fx of dance.fx) {
      const fxState = danceFrame?.fx[fx.id];
      const fxKey = `fx-${fx.id}`;
      if (!fxState || fxState.o < 0.01) {
        setAttr(fxKey, 'opacity', '0');
        continue;
      }
      setAttr(fxKey, 'opacity', Math.min(1, fxState.o).toFixed(3));
      const rx = fxState.x ?? 0;
      const ry = fxState.y ?? 0;
      const scaleVal = fx.dashed ? Math.max(0.01, fxState.p) * fxState.s : fxState.s;
      setAttr(
        fxKey,
        'transform',
        `translate(${rx.toFixed(2)} ${ry.toFixed(2)}) ${formatRotate(fxState.r ?? 0, fx.at)} ${formatScale(scaleVal, fxState.s, fx.at)}`
      );
      if (isStrokeFx(fx)) {
        setAttr(fxKey, 'stroke-dashoffset', (1 - Math.max(0, Math.min(1, fxState.p))).toFixed(3));
      }
    }
  });

  const isPointerGaze = gaze === 'pointer';
  const smokeFilterId = `${idPrefix}-smoke`;
  const nonScaleProps = small ? { vectorEffect: 'non-scaling-stroke' as const } : {};

  const renderFxList = (placement: 'back' | 'front' | 'head' | 'mid' | 'root') =>
    dance?.fx
      .filter((fx) => (fx as any).on === placement)
      .map((fx) => (
        <g
          key={fx.id}
          data-part={`fx-${fx.id}`}
          opacity={0}
          strokeDasharray={isStrokeFx(fx) ? '1 1' : undefined}
        >
          <path
            d={fx.d}
            pathLength={isStrokeFx(fx) ? 1 : undefined}
            fill={(fx as any).fill ?? 'none'}
            fillRule="evenodd"
            stroke={(fx as any).stroke ?? '#e5322d'}
            strokeWidth={small ? 1 : (fx as any).width ?? ((fx as any).fill ? 1.8 : 2.6)}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={fx.dashed ? '6 5' : undefined}
            {...nonScaleProps}
          />
        </g>
      ));

  const renderLimbGroup = (id: string) =>
    dance && (
      <g key={id} data-part={id} transform="scale(0)">
        <path d={dance.arm} fill={BASE_DARK} stroke={STROKE_COLOR} strokeWidth={small ? 0.8 : 2.4} {...nonScaleProps} />
        {!small && <path d={dance.arm} fill="none" stroke={CORE_COLOR} strokeWidth={0.9} />}
        <path d={dance.toes} fill="none" stroke={STROKE_COLOR} strokeWidth={small ? 0.6 : 1.3} strokeLinecap="round" {...nonScaleProps} />
        <ellipse cx={0} cy={-3} rx={12.2} ry={11} fill={BASE_DARK} />
      </g>
    );

  return (
    <g
      ref={(el) => {
        if (!el) return;
        const st = stateRef.current;
        st.nodes = {};
        el.querySelectorAll('[data-part]').forEach((n) => {
          st.nodes[(n as HTMLElement).dataset.part!] = n as SVGElement;
        });
        st.off = el.querySelector('feOffset');
        if (!isPointerGaze) return;
        const onPointerMove = (e: PointerEvent) => {
          st.pointer = [e.clientX, e.clientY];
        };
        window.addEventListener('pointermove', onPointerMove);
        return () => window.removeEventListener('pointermove', onPointerMove);
      }}
      className={className}
      style={style}
    >
      <defs>
        {data.eyes.map((e: any, idx: number) => (
          <clipPath key={idx} id={`${idPrefix}-eye${idx}`}>
            <path d={e.cream} />
          </clipPath>
        ))}
        {!small && (
          <filter
            id={smokeFilterId}
            filterUnits="userSpaceOnUse"
            x={smokeBounds[0]}
            y={smokeBounds[1]}
            width={smokeBounds[2]}
            height={smokeBounds[3]}
          >
            <feTurbulence type="fractalNoise" baseFrequency="0.035 0.05" numOctaves={1} seed={7} result="n" />
            <feOffset in="n" dx="0" dy="0" result="m" />
            <feDisplacementMap in="SourceGraphic" in2="m" scale="2.4" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        )}
      </defs>

      {renderFxList('back')}

      <g data-part="root">
        {parts.body.socket && (
          <g data-part="bodySocket">
            <path d={parts.body.socket} fill={BASE_DARK} />
          </g>
        )}

        <TailsAndSmoke data={data} filter={action === 'still' || small ? undefined : `url(#${smokeFilterId})`} small={small} />

        {data.legsBack?.map((legKey: string) => (
          <g key={legKey} data-part={legKey}>
            <VectorPart part={(parts as any)[legKey]} small={small} />
          </g>
        ))}

        {dance?.hips?.map((_, idx) => (
          <g key={idx} data-part={`leg${idx}`} transform="scale(0)">
            <path d={dance.arm} fill={BASE_DARK} stroke={STROKE_COLOR} strokeWidth={small ? 0.8 : 2.4} {...nonScaleProps} />
            <path d={dance.toes} fill="none" stroke={STROKE_COLOR} strokeWidth={small ? 0.6 : 1.3} strokeLinecap="round" {...nonScaleProps} />
          </g>
        ))}

        <g data-part="body">
          <VectorPart part={parts.body} small={small} tag="body" />
        </g>

        {data.legsFront?.map((legKey: string) => (
          <g key={legKey} data-part={legKey}>
            <VectorPart part={(parts as any)[legKey]} small={small} />
          </g>
        ))}

        {dance?.shoulders.map((_, idx) => renderLimbGroup(`arm${idx}b`))}
        {dance?.shoulders.map((_, idx) => (
          <PawHand key={`bh-${idx}`} id={`arm${idx}bh`} small={small} />
        ))}

        <g data-part="head">
          {parts.head.socket && <path d={parts.head.socket} fill={BASE_DARK} />}
          {(parts as any).earL && (
            <g data-part="earL">
              <VectorPart part={(parts as any).earL} small={small} tag="earL" />
            </g>
          )}
          {parts.earR && (
            <g data-part="earR">
              <VectorPart part={parts.earR} small={small} tag="earR" />
            </g>
          )}
          <VectorPart part={parts.head} small={small} tag="head" />
          {data.eyes.map((eye: any, idx: number) => (
            <EyeComponent key={idx} eye={eye} index={idx} clipId={`url(#${idPrefix}-eye${idx})`} />
          ))}
          {parts.flap && (
            <g data-part="flap">
              <VectorPart part={parts.flap} small={small} tag="flap" />
            </g>
          )}
          {renderFxList('head')}
        </g>

        <g data-part="bow">
          <path d={data.bow} fill={RED_COLOR} fillRule="evenodd" />
        </g>

        {renderFxList('mid')}

        {dance?.shoulders.map((_, idx) => renderLimbGroup(`arm${idx}`))}
        {dance?.shoulders.map((_, idx) => (
          <PawHand key={`h-${idx}`} id={`arm${idx}h`} small={small} />
        ))}

        {renderFxList('root')}
      </g>

      {renderFxList('front')}
    </g>
  );
}
export default CatSvg;
