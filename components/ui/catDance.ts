// Cat Mosi-Mosi Dance & Lyrics Animation Data

export interface LyricLine {
  t: number;
  ja: string;
  romaji: string;
  en: string;
}

export const BPM = 143.6;
export const AUDIO_SRC = '/cat/mosi-mosi.mp3';
export const AUDIO_START = 40.378;

const toSec = (b: number) => Math.round((60 * b / BPM) * 1e3) / 1e3;

export const LYRICS: LyricLine[] = [
  { t: toSec(0), ja: 'もしもし？聞こえてる？', romaji: 'moshi moshi? kikoeteru?', en: 'hello? can you hear me?' },
  { t: toSec(8), ja: '', romaji: '', en: '' },
  { t: toSec(16), ja: '電波電波の怪電波', romaji: 'denpa denpa no kaidenpa', en: 'radio waves, radio waves, strange radio waves' },
  { t: toSec(24), ja: '宇宙に夢中で交信中', romaji: 'uchū ni muchū de kōshin-chū', en: 'lost in space, sending signals' },
  { t: toSec(32), ja: '', romaji: '', en: '' },
  { t: toSec(40), ja: '', romaji: '', en: '' }
];

export const HOOK_END = toSec(48);
export const LYRICS_END = HOOK_END;

// ── Math & Interpolation Utilities ──
const clamp01 = (a: number) => Math.max(0, Math.min(1, a));
const smoothstep = (a: number) => {
  const e = clamp01(a);
  return e * e * (3 - 2 * e);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const lerpVec2 = (a: [number, number], b: [number, number], t: number): [number, number] => [
  lerp(a[0], b[0], t),
  lerp(a[1], b[1], t)
];
const lerpAngle = (a: number, b: number, t: number) => a + (((b - a) % 360 + 540) % 360 - 180) * t;

export interface LimbDef {
  p: [number, number];
  head: boolean;
  k: number;
  show: number;
  hand?: string;
  aim?: number;
  behind?: boolean;
}

const createLimb = (p: [number, number], head = false, k = 1, show = 1, hand?: string): LimbDef => ({
  p,
  head,
  k,
  show,
  hand
});

const lerpLimb = (a: LimbDef, b: LimbDef, t: number): LimbDef => ({
  p: lerpVec2(a.p, b.p, t),
  head: t < 0.5 ? a.head : b.head,
  k: lerp(a.k, b.k, t),
  show: lerp(a.show, b.show, t),
  hand: t < 0.5 ? a.hand : b.hand,
  aim: a.aim == null || b.aim == null ? (t < 0.5 ? a.aim : b.aim) : lerpAngle(a.aim, b.aim, t),
  behind: t < 0.5 ? a.behind : b.behind
});

const makeLimb = (p: [number, number], hand = 'paw', opts: { aim?: number; behind?: boolean } = {}): LimbDef => ({
  ...createLimb(p),
  hand,
  aim: opts.aim,
  behind: opts.behind
});

const ARM_PATH = "M-11 -4C-11.5 16-12.5 36-12.5 52C-12.5 66-6.5 76 0.5 76C8 76 13.5 67 13 53C12.5 37 11.5 16 11 -4Z";
const TOES_PATH = "M-3.5 69L-3 75M4.5 69L4 75";

const defaultArmL = createLimb([110, 440], false, 1, 0);
const defaultArmR = createLimb([200, 440], false, 1, 0);
const defaultLegL = createLimb([116, 476], false, 1, 0);
const defaultLegR = createLimb([188, 476], false, 1, 0);

const legT = createLimb([70, 476], false, 1, 0.9);
const legI = createLimb([236, 474], false, 1, 0.9);
const legS = createLimb([72, 456], false, 1, 0.9);
const legN = createLimb([234, 452], false, 1, 0.9);

const p1 = makeLimb([62, 368], "open", { aim: 150 });
const h1 = makeLimb([234, 366], "open", { aim: -150 });
const b1 = makeLimb([72, 364], "fist", { aim: 180 });
const f1 = makeLimb([226, 360], "fist", { aim: 180 });
const g1 = makeLimb([40, 298], "open", { aim: 160, behind: true });
const R1 = makeLimb([282, 290], "open", { aim: -160, behind: true });
const L1 = makeLimb([40, 298], "open", { aim: 135, behind: true });
const d1 = makeLimb([282, 290], "open", { aim: -135, behind: true });
const v1 = makeLimb([40, 300], "fist", { aim: 180, behind: true });
const c1 = makeLimb([282, 292], "fist", { aim: 180, behind: true });
const M1 = makeLimb([42, 286], "point", { aim: 180, behind: true });
const u1 = makeLimb([280, 278], "point", { aim: 180, behind: true });
const z1 = makeLimb([40, 304], "point", { aim: 180, behind: true });
const k1 = makeLimb([282, 296], "point", { aim: 180, behind: true });
const x1 = makeLimb([132, 426], "point", { aim: 180 });
const y1 = makeLimb([166, 426], "point", { aim: 180 });
const P1 = makeLimb([134, 428], "fist", { aim: 180 });
const Y1 = makeLimb([166, 428], "fist", { aim: 180 });
const I1 = makeLimb([54, 392], "point", { aim: 90 });
const S1 = makeLimb([240, 388], "point", { aim: -90 });
const j1 = makeLimb([54, 396], "open", { aim: 90 });
const w1 = makeLimb([240, 392], "open", { aim: -90 });
const q1 = makeLimb([70, 438]);
const C1 = makeLimb([226, 436]);
const B1 = makeLimb([222, 440], "point", { aim: -15 });
const O1 = makeLimb([140, 440]);
const T1 = makeLimb([234, 432]);
const J1 = makeLimb([140, 420]);
const Q1 = makeLimb([154, 426]);
const U1 = makeLimb([52, 390], "point", { aim: 90 });
const A1 = makeLimb([242, 390], "fist", { aim: -90 });
const K1 = makeLimb([52, 382], "open", { aim: 90 });

export interface CatPose {
  lean: number;
  tilt: number;
  headY: number;
  x: number;
  rock: number;
  face: number;
  earR: number;
  earL: number;
  happy: number;
  judging: number;
  gaze: [number, number] | null;
  armL: LimbDef;
  armR: LimbDef;
  legL: LimbDef;
  legR: LimbDef;
}

const neutralPose: CatPose = {
  lean: 0,
  tilt: 0,
  headY: 0,
  x: 0,
  rock: 0,
  face: 0,
  earR: 0,
  earL: 0,
  happy: 0,
  judging: 0,
  gaze: null,
  armL: defaultArmL,
  armR: defaultArmR,
  legL: defaultLegL,
  legR: defaultLegR
};

const ZERO_GAZE: [number, number] = [0, 0];
const frac = (a: number) => a - Math.floor(a);
const decay = (a: number) => Math.exp(-7 * frac(a));
const shiftLimb = (limb: LimbDef, dx: number, dy: number): LimbDef => ({
  ...limb,
  p: [limb.p[0] + dx, limb.p[1] + dy]
});

const applyHop = (frame: any, beat: number, factor = 1) => {
  const d = decay(beat);
  frame.hopY += 2.4 * d * factor;
  frame.squash += 0.03 * d * factor;
};

const applySquashJump = (frame: any, time: number, trigger: number, jumpHeight: number, dur = 0.55) => {
  const diff = time - trigger;
  if (diff > -0.2 && diff < 0) {
    frame.squash += 0.07 * (1 - Math.abs(diff + 0.1) / 0.1);
  } else if (diff >= 0 && diff < dur) {
    const e = diff / dur;
    frame.hopY -= 4 * jumpHeight * e * (1 - e);
    frame.squash -= 0.05 * Math.sin(e * Math.PI);
  } else if (diff >= dur && diff < dur + 0.28) {
    frame.squash += 0.08 * (1 - (diff - dur) / 0.28);
  }
};

const applyFx = (frame: any, id: string, opacity: number, progress = 1, scale = 1) => {
  frame.fx[id] = { o: clamp01(opacity), p: clamp01(progress), s: scale };
};

const applySpin = (frame: any, time: number, start: number, end: number) => {
  if (time > start && time < end) {
    frame.spin = smoothstep((time - start) / (end - start));
  }
};

const tiltPose = (a: number) => ({ tilt: 7 * a, x: 5 * a, rock: 2 * a });

interface KeyframeEntry {
  b: number;
  move?: number;
  pose: Partial<CatPose>;
}

const KEYFRAMES: KeyframeEntry[] = [
  { b: 0.6, move: 0.6, pose: { ...tiltPose(-1), lean: 0.03, armL: p1, armR: h1, gaze: ZERO_GAZE } },
  { b: 3.6, move: 0.5, pose: { ...tiltPose(1), lean: 0.03, armL: p1, armR: h1, gaze: ZERO_GAZE } },
  { b: 8.1, move: 0.6, pose: { lean: -0.02, earR: -6, armL: L1, armR: d1, gaze: ZERO_GAZE } },
  { b: 13.4, move: 0.6, pose: { rock: 5, tilt: 6, x: 8, armL: O1, armR: T1, gaze: [0.7, 0.3] } },
  { b: 14.9, move: 0.35, pose: { rock: -5, tilt: -6, x: 2, armL: M1, armR: makeLimb([238, 420], "open", { aim: -90 }), legR: legI, gaze: ZERO_GAZE } },
  { b: 15.6, move: 0.35, pose: { armL: x1, armR: y1 } },
  { b: 16.1, pose: { armL: x1, armR: y1, gaze: ZERO_GAZE } },
  { b: 16.7, move: 0.25, pose: { headY: 4, tilt: -4, armL: M1, armR: B1, gaze: [-0.2, -0.8] } },
  { b: 17.4, move: 0.3, pose: { armL: x1, armR: y1, gaze: ZERO_GAZE } },
  { b: 18.4, move: 0.25, pose: { headY: 4, tilt: -4, armL: M1, armR: B1, gaze: [-0.2, -0.8] } },
  { b: 19.2, move: 0.3, pose: { armL: x1, armR: y1, gaze: ZERO_GAZE } },
  { b: 20.3, move: 0.25, pose: { lean: 0.03, armL: I1, armR: S1 } },
  { b: 21.4, move: 0.25, pose: { lean: 0, armL: x1, armR: y1 } },
  { b: 22.2, move: 0.25, pose: { lean: 0.03, armL: I1, armR: S1 } },
  { b: 23.3, move: 0.35, pose: { lean: 0, armL: g1, armR: R1, earR: -5 } },
  { b: 25.1, move: 0.5, pose: { face: -0.3, earR: 0, tilt: -6, armL: L1, armR: d1 } },
  { b: 26.3, move: 0.6, pose: { face: -0.8, tilt: -4, armL: makeLimb([52, 376], "open", { aim: 100 }), armR: makeLimb([38, 316], "open", { aim: 110, behind: true }), gaze: [-0.95, -0.15] } },
  { b: 27.4, move: 0.5, pose: { face: -0.8, armL: q1, armR: makeLimb([280, 282], "open", { aim: 180, behind: true }), gaze: [-0.7, -0.6] } },
  { b: 29.2, move: 0.5, pose: { face: 0, tilt: 0, armL: g1, armR: R1, gaze: ZERO_GAZE } },
  { b: 29.8, move: 0.4, pose: { armL: P1, armR: Y1 } },
  { b: 32.2, move: 0.6, pose: { rock: 5, tilt: 6, x: 8, armL: O1, armR: T1, gaze: [0.6, 0.3] } },
  { b: 34.6, move: 0.5, pose: { rock: -3, tilt: -5, x: 0, armL: P1, armR: c1, legL: legS, gaze: [0.4, -0.7] } },
  { b: 35.8, move: 0.4, pose: { rock: 0, tilt: 0, armL: P1, armR: Y1, legL: defaultLegL, gaze: ZERO_GAZE } },
  { b: 39.4, move: 0.5, pose: { ...tiltPose(-1), armL: shiftLimb(P1, -30, -6), armR: shiftLimb(Y1, -30, -6) } },
  { b: 40.6, move: 0.5, pose: { ...tiltPose(1), armL: shiftLimb(P1, 28, -6), armR: shiftLimb(Y1, 28, -6) } },
  { b: 41.8, move: 0.5, pose: { ...tiltPose(-1), armL: shiftLimb(P1, -30, -6), armR: shiftLimb(Y1, -30, -6) } },
  { b: 43.0, move: 0.4, pose: { ...tiltPose(0), lean: -0.02, armL: v1, armR: c1, earR: -5 } },
  { b: 45.4, move: 0.4, pose: { earR: 0, lean: 0.03, armL: j1, armR: w1 } },
  { b: 46.4, move: 0.5, pose: { lean: 0, armL: q1, armR: C1 } },
  { b: 47.4, move: 0.4, pose: { armL: makeLimb([84, 440], "fist"), armR: c1 } },
  { b: 48.4, move: 0.3, pose: { tilt: -5, rock: -2, legL: legS } },
  { b: 49.2, move: 0.3, pose: { tilt: 0, rock: 0, legL: defaultLegL } },
  { b: 50.2, move: 0.3, pose: { tilt: -5, rock: -2, armR: c1, legL: legS } },
  { b: 50.9, move: 0.35, pose: { tilt: 0, rock: 0, armL: v1, armR: makeLimb([228, 438], "fist"), legL: defaultLegL } },
  { b: 52.2, move: 0.3, pose: { tilt: 5, rock: 2, legR: legN } },
  { b: 53.0, move: 0.3, pose: { tilt: 0, rock: 0, legR: defaultLegR } },
  { b: 54.0, move: 0.3, pose: { tilt: 5, rock: 2, armL: v1, legR: legN } },
  { b: 54.8, move: 0.35, pose: { tilt: 0, rock: 0, armL: M1, armR: k1, legR: defaultLegR } },
  { b: 55.8, move: 0.4, pose: { armL: x1, armR: Y1, gaze: [0, 0.5] } },
  { b: 58.2, move: 0.4, pose: { tilt: -4, rock: -2, armL: U1, armR: k1, legL: legT, gaze: [-0.8, 0] } },
  { b: 59.8, move: 0.4, pose: { tilt: -10, rock: -5, x: -6, lean: 0.04, armL: makeLimb([50, 386], "point", { aim: 100 }), armR: u1, legL: legT, gaze: [-0.95, -0.1] } },
  { b: 61.3, move: 0.5, pose: { tilt: 0, rock: 0, x: 0, lean: 0, armL: P1, armR: Y1, legL: defaultLegL, gaze: ZERO_GAZE } },
  { b: 62.3, move: 0.7, pose: { face: 0.8, tilt: 3, judging: 0.7, armL: J1, armR: Q1, gaze: [0.9, 0.1] } },
  { b: 75.4, move: 0.6, pose: { face: 0, tilt: 0, judging: 0, armL: z1, armR: k1, gaze: ZERO_GAZE } },
  { b: 76.5, move: 0.35, pose: { armL: M1, armR: k1 } },
  { b: 77.7, move: 0.35, pose: { armL: M1, armR: u1 } },
  { b: 78.9, move: 0.35, pose: { armL: z1, armR: k1 } },
  { b: 81.3, move: 0.8, pose: { face: -0.8, tilt: -3, armL: K1, armR: makeLimb([150, 432]), gaze: [-0.9, -0.1] } },
  { b: 90.3, move: 0.5, pose: { armR: makeLimb([124, 412], "open", { aim: 110 }) } },
  { b: 90.9, move: 0.45, pose: { face: 0, tilt: 0, armL: g1, armR: R1, gaze: ZERO_GAZE } },
  { b: 91.7, move: 0.4, pose: { happy: 0.8, tilt: -5, armL: b1, armR: f1 } },
  { b: 93.4, move: 0.45, pose: { happy: 0, ...tiltPose(-1), lean: 0.03, armL: p1, armR: h1 } },
  { b: 97.4, move: 1.6, pose: {} }
];

const accumulatedPoses: CatPose[] = [];
KEYFRAMES.forEach((kf, idx) => {
  accumulatedPoses.push(
    idx === KEYFRAMES.length - 1
      ? { ...neutralPose }
      : { ...(idx ? accumulatedPoses[idx - 1] : neutralPose), ...kf.pose }
  );
});

interface ContinuousModifier {
  from: number;
  to: number;
  fn: (timeInSegment: number, frame: any, totalBeats: number) => void;
}

const MODIFIERS: ContinuousModifier[] = [
  {
    from: 0,
    to: 7.9,
    fn: (_dt, f, beat) => {
      applyHop(f, beat);
      const s = Math.sin(2 * Math.PI * beat);
      f.arms[0] = shiftLimb(f.arms[0], 2.5 * s, -2 * Math.abs(s));
      f.arms[1] = shiftLimb(f.arms[1], -2.5 * s, -2 * Math.abs(s));
      f.earR += -6 * decay(beat);
    }
  },
  {
    from: 8.4,
    to: 12.6,
    fn: (dt, f) => applySpin(f, dt, 0.2, 4)
  },
  {
    from: 13.4,
    to: 15.6,
    fn: (dt, f, beat) => {
      const s = Math.sin(2 * Math.PI * beat);
      if (dt < 1.4) {
        f.arms[0] = shiftLimb(f.arms[0], 0, 5 * s);
        f.arms[1] = shiftLimb(f.arms[1], 0, 5 * s);
      }
      applySquashJump(f, dt, 1.45, 8);
    }
  },
  {
    from: 16,
    to: 23.3,
    fn: (dt, f, beat) => {
      applyHop(f, beat, 0.8);
      for (const t of [0.7, 2.4]) {
        const diff = dt - t;
        if (diff > 0 && diff < 0.7) {
          f.squash += 0.05 * Math.sin((diff / 0.7) * Math.PI);
          f.hopY += 4 * Math.sin((diff / 0.7) * Math.PI);
          applyFx(f, 'signal', 1 - diff / 0.7, 2.4 * diff);
        }
      }
    }
  },
  {
    from: 23.3,
    to: 25.1,
    fn: (_dt, f, beat) => {
      applyHop(f, beat);
      const s = Math.sin(4 * Math.PI * beat);
      f.arms[0] = shiftLimb(f.arms[0], 2 * s, 0);
      f.arms[1] = shiftLimb(f.arms[1], -2 * s, 0);
    }
  },
  {
    from: 27.4,
    to: 29.2,
    fn: (_dt, f, beat) => applyFx(f, 'signal2', (1 - frac(beat)) * 0.9, 2 * frac(beat))
  },
  {
    from: 29.8,
    to: 32,
    fn: (_dt, f, beat) => {
      const s = 2 * Math.PI * beat;
      f.arms[0] = shiftLimb(f.arms[0], 7 * Math.cos(s), 6 * Math.sin(s));
      f.arms[1] = shiftLimb(f.arms[1], -7 * Math.cos(s), -6 * Math.sin(s));
      applyHop(f, beat, 0.6);
    }
  },
  {
    from: 34,
    to: 35.8,
    fn: (dt, f) => applySquashJump(f, dt, 0.5, 10)
  },
  {
    from: 35.8,
    to: 38.4,
    fn: (dt, f) => applySpin(f, dt, 0.3, 2.5)
  },
  {
    from: 38.4,
    to: 43,
    fn: (_dt, f, beat) => applyHop(f, beat, 0.8)
  },
  {
    from: 43,
    to: 45.4,
    fn: (_dt, f, beat) => {
      applyHop(f, beat, 1.2);
      f.arms[0] = shiftLimb(f.arms[0], 0, -6 * decay(beat));
      f.arms[1] = shiftLimb(f.arms[1], 0, -6 * decay(beat));
    }
  },
  {
    from: 48,
    to: 55,
    fn: (dt, f) => {
      for (const m of [0.4, 2.2, 4.2, 6]) {
        applySquashJump(f, dt, m, 11, 0.5);
      }
    }
  },
  {
    from: 55.8,
    to: 58,
    fn: (_dt, f, beat) => {
      const s = 2 * Math.PI * beat;
      f.arms[1] = shiftLimb(f.arms[1], 5 * Math.cos(s), 5 * Math.sin(s));
      applyHop(f, beat, 0.5);
    }
  },
  {
    from: 59.6,
    to: 61.3,
    fn: (dt, f) => applyFx(f, 'far', 1, (dt - 0.2) / 1)
  },
  {
    from: 62.3,
    to: 70.6,
    fn: (_dt, f, beat) => {
      applyHop(f, beat, 0.6);
      f.tilt += 3 * Math.sin(Math.PI * beat);
    }
  },
  {
    from: 70.6,
    to: 75.4,
    fn: (dt, f, beat) => {
      const r = beat < 71 || beat >= 75 ? 0 : Math.exp(-5 * frac(beat));
      f.arms[1] = lerpLimb(f.arms[1], A1, Math.min(1, 0.3 * smoothstep(2 * dt) + r));
      f.lean += 0.02 * r;
    }
  },
  {
    from: 75.4,
    to: 80,
    fn: (_dt, f, beat) => applyHop(f, beat, 0.7)
  },
  {
    from: 79.6,
    to: 90.3,
    fn: (_dt, f, beat) => {
      if (beat < 81.3) return;
      const d = Math.exp(-6 * frac((beat - 81.3) / 2));
      f.arms[0] = shiftLimb(f.arms[0], -7 * d, 0);
      applyHop(f, beat, 0.5);
    }
  },
  {
    from: 91.7,
    to: 93.4,
    fn: (_dt, f, beat) => applyHop(f, beat, 1)
  },
  {
    from: 93.4,
    to: 96.6,
    fn: (_dt, f, beat) => {
      applyHop(f, beat);
      const s = Math.sin(2 * Math.PI * beat);
      f.arms[0] = shiftLimb(f.arms[0], 2.5 * s, 0);
      f.arms[1] = shiftLimb(f.arms[1], -2.5 * s, 0);
    }
  }
];

const BEAT_DURATION = 60 / BPM;

export const MOSI_MOSI = {
  bpm: BPM,
  duration: KEYFRAMES[KEYFRAMES.length - 1].b * BEAT_DURATION,
  shoulders: [[98, 402], [196, 400]] as [number, number][],
  hips: [[110, 488], [194, 488]] as [number, number][],
  armLen: 63,
  reach: 0.78,
  shouldersBehind: [[84, 330], [240, 322]] as [number, number][],
  reachBehind: 1.7,
  beans: true,
  arm: ARM_PATH,
  toes: TOES_PATH,
  still: 16.9 * BEAT_DURATION,
  fx: [
    { id: 'signal', on: 'back', at: [42, 262] as [number, number], d: 'M30 256Q42 244 54 256M23 249Q42 230 61 249', width: 2.4 },
    { id: 'signal2', on: 'back', at: [280, 258] as [number, number], d: 'M268 252Q280 240 292 252M261 245Q280 226 299 245', width: 2.4 },
    { id: 'far', on: 'front', at: [30, 384] as [number, number], d: 'M30 384L-50 380', dashed: true, width: 2.4 }
  ],
  frame: function (timeInSeconds: number) {
    const beat = timeInSeconds / BEAT_DURATION;
    let idx = 0;
    while (idx < KEYFRAMES.length - 1 && KEYFRAMES[idx].b <= beat) {
      idx++;
    }

    const curr = KEYFRAMES[idx];
    const prevPose = idx > 0 ? accumulatedPoses[idx - 1] : neutralPose;
    const targetPose = accumulatedPoses[idx];

    const moveDur = Math.min(curr.move ?? 0.33, curr.b - (idx > 0 ? KEYFRAMES[idx - 1].b : -1));
    const h = beat >= curr.b ? 1 : smoothstep((beat - (curr.b - moveDur)) / moveDur);

    const f: any = {
      beat,
      lean: lerp(prevPose.lean, targetPose.lean, h),
      squash: 0,
      hopY: 0,
      x: lerp(prevPose.x, targetPose.x, h),
      rock: lerp(prevPose.rock, targetPose.rock, h),
      tilt: lerp(prevPose.tilt, targetPose.tilt, h),
      headY: lerp(prevPose.headY, targetPose.headY, h),
      earR: lerp(prevPose.earR, targetPose.earR, h),
      earL: lerp(prevPose.earL, targetPose.earL, h),
      face: lerp(prevPose.face, targetPose.face, h),
      expr: {
        happy: lerp(prevPose.happy, targetPose.happy, h),
        judging: lerp(prevPose.judging, targetPose.judging, h)
      },
      gaze: prevPose.gaze || targetPose.gaze ? lerpVec2(prevPose.gaze ?? [0, 0], targetPose.gaze ?? [0, 0], h) : null,
      tail: 10,
      arms: [lerpLimb(prevPose.armL, targetPose.armL, h), lerpLimb(prevPose.armR, targetPose.armR, h)],
      legs: [lerpLimb(prevPose.legL, targetPose.legL, h), lerpLimb(prevPose.legR, targetPose.legR, h)],
      fx: {}
    };

    if (idx === KEYFRAMES.length - 1 && h >= 1) {
      f.gaze = null;
    }

    for (const mod of MODIFIERS) {
      if (beat >= mod.from && beat < mod.to) {
        mod.fn(beat - mod.from, f, beat);
      }
    }

    return f;
  }
};
