'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '@/hooks/useSound';
import { useToast } from '@/components/ui/ToastProvider';
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Cpu,
  Layers,
  Settings2,
  HelpCircle,
  Activity,
  Zap,
} from 'lucide-react';
import KeycapBadge from '@/components/ui/KeycapBadge';

interface Point {
  x: number; // in [-1, 1]
  y: number; // in [-1, 1]
  label: 0 | 1; // 0 = Cyan, 1 = Emerald
}

// Preset datasets demonstrating non-linear classification
const PRESETS: Record<string, { name: string; desc: string; generate: () => Point[] }> = {
  concentric: {
    name: 'Concentric Rings',
    desc: 'Non-linear circular topology (MLP hidden layers required)',
    generate: () => {
      const pts: Point[] = [];
      // Inner cluster (label 1 - Emerald)
      for (let i = 0; i < 24; i++) {
        const r = 0.15 + Math.random() * 0.25;
        const theta = Math.random() * 2 * Math.PI;
        pts.push({ x: r * Math.cos(theta), y: r * Math.sin(theta), label: 1 });
      }
      // Outer ring (label 0 - Cyan)
      for (let i = 0; i < 36; i++) {
        const r = 0.65 + Math.random() * 0.25;
        const theta = Math.random() * 2 * Math.PI;
        pts.push({ x: r * Math.cos(theta), y: r * Math.sin(theta), label: 0 });
      }
      return pts;
    },
  },
  xor: {
    name: 'XOR Diagonal',
    desc: 'Classic Minsky-Papert XOR problem solved by hidden neurons',
    generate: () => {
      const pts: Point[] = [];
      const createCluster = (cx: number, cy: number, label: 0 | 1, n = 15) => {
        for (let i = 0; i < n; i++) {
          pts.push({
            x: cx + (Math.random() - 0.5) * 0.45,
            y: cy + (Math.random() - 0.5) * 0.45,
            label,
          });
        }
      };
      createCluster(-0.5, 0.5, 1);  // Q2: Emerald
      createCluster(0.5, -0.5, 1);  // Q4: Emerald
      createCluster(-0.5, -0.5, 0); // Q3: Cyan
      createCluster(0.5, 0.5, 0);   // Q1: Cyan
      return pts;
    },
  },
  two_clusters: {
    name: 'Linear Clusters',
    desc: 'Separable decision manifold benchmark',
    generate: () => {
      const pts: Point[] = [];
      for (let i = 0; i < 25; i++) {
        pts.push({
          x: -0.45 + (Math.random() - 0.5) * 0.5,
          y: -0.45 + (Math.random() - 0.5) * 0.5,
          label: 0,
        });
        pts.push({
          x: 0.45 + (Math.random() - 0.5) * 0.5,
          y: 0.45 + (Math.random() - 0.5) * 0.5,
          label: 1,
        });
      }
      return pts;
    },
  },
};

export default function NeuralPlayground() {
  const { playClick, playHover } = useSound();
  const { toast } = useToast();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [points, setPoints] = useState<Point[]>(() => PRESETS.concentric.generate());
  const [selectedLabel, setSelectedLabel] = useState<0 | 1>(1);
  const [activePreset, setActivePreset] = useState<string>('concentric');
  const [isTraining, setIsTraining] = useState(false);
  const [hiddenNeurons, setHiddenNeurons] = useState<number>(6);
  const [learningRate, setLearningRate] = useState<number>(0.18);
  const [epoch, setEpoch] = useState<number>(0);
  const [loss, setLoss] = useState<number>(0.69);

  // Weights & biases state for 2-layer MLP (Input: 2 -> Hidden: H -> Output: 1)
  const networkRef = useRef<{
    W1: number[][]; // [2][H]
    b1: number[];   // [H]
    W2: number[];   // [H]
    b2: number;     // scalar
  }>({
    W1: [],
    b1: [],
    W2: [],
    b2: 0,
  });

  // Initialize weights using He/Xavier uniform initialization
  const initWeights = useCallback((hDim: number) => {
    const scale1 = Math.sqrt(2 / (2 + hDim));
    const W1: number[][] = [
      Array.from({ length: hDim }, () => (Math.random() * 2 - 1) * scale1),
      Array.from({ length: hDim }, () => (Math.random() * 2 - 1) * scale1),
    ];
    const b1: number[] = Array(hDim).fill(0);

    const scale2 = Math.sqrt(2 / (hDim + 1));
    const W2: number[] = Array.from({ length: hDim }, () => (Math.random() * 2 - 1) * scale2);
    const b2 = 0;

    networkRef.current = { W1, b1, W2, b2 };
    setEpoch(0);
    setLoss(0.693);
  }, []);

  // Initialize weights on mount or hidden dimension change
  useEffect(() => {
    initWeights(hiddenNeurons);
  }, [hiddenNeurons, initWeights]);

  // Forward pass for single coordinate: input [x, y] -> probability in [0, 1]
  const forward = (x: number, y: number, net = networkRef.current): number => {
    const { W1, b1, W2, b2 } = net;
    const hDim = b1.length;
    if (W1.length < 2 || W1[0].length !== hDim) return 0.5;

    // Layer 1: Tanh activation
    let z2 = b2;
    for (let j = 0; j < hDim; j++) {
      const z1_j = x * W1[0][j] + y * W1[1][j] + b1[j];
      const a1_j = Math.tanh(z1_j);
      z2 += a1_j * W2[j];
    }

    // Output: Sigmoid activation
    return 1 / (1 + Math.exp(-Math.max(-15, Math.min(15, z2))));
  };

  // Backpropagation optimization step
  const trainStep = useCallback(() => {
    if (points.length === 0) return;

    const net = networkRef.current;
    const { W1, b1, W2 } = net;
    const hDim = b1.length;
    const N = points.length;

    // Accumulators for gradients
    const dW1: number[][] = [Array(hDim).fill(0), Array(hDim).fill(0)];
    const db1: number[] = Array(hDim).fill(0);
    const dW2: number[] = Array(hDim).fill(0);
    let db2 = 0;
    let totalLoss = 0;

    for (let i = 0; i < N; i++) {
      const { x, y, label } = points[i];

      // Forward Pass
      const a1: number[] = [];
      let z2 = net.b2;
      for (let j = 0; j < hDim; j++) {
        const z1_j = x * W1[0][j] + y * W1[1][j] + b1[j];
        const val = Math.tanh(z1_j);
        a1.push(val);
        z2 += val * W2[j];
      }
      const yHat = 1 / (1 + Math.exp(-Math.max(-15, Math.min(15, z2))));

      // Binary Cross-Entropy Loss
      const eps = 1e-7;
      totalLoss += -(label * Math.log(yHat + eps) + (1 - label) * Math.log(1 - yHat + eps));

      // Output gradient
      const dZ2 = yHat - label;
      db2 += dZ2;

      // Hidden gradients
      for (let j = 0; j < hDim; j++) {
        dW2[j] += dZ2 * a1[j];
        const dA1_j = dZ2 * W2[j];
        const dZ1_j = dA1_j * (1 - a1[j] * a1[j]); // derivative of tanh
        dW1[0][j] += dZ1_j * x;
        dW1[1][j] += dZ1_j * y;
        db1[j] += dZ1_j;
      }
    }

    // Gradient descent parameter update
    const lr = learningRate;
    for (let j = 0; j < hDim; j++) {
      W1[0][j] -= (lr * dW1[0][j]) / N;
      W1[1][j] -= (lr * dW1[1][j]) / N;
      b1[j] -= (lr * db1[j]) / N;
      W2[j] -= (lr * dW2[j]) / N;
    }
    net.b2 -= (lr * db2) / N;

    setLoss(Number((totalLoss / N).toFixed(4)));
    setEpoch((prev) => prev + 1);
  }, [points, learningRate]);

  // Training loop execution via requestAnimationFrame
  useEffect(() => {
    if (!isTraining) return;

    let frameId: number;
    const loop = () => {
      // Run 5 mini-steps per animation frame for crisp convergence speed
      for (let i = 0; i < 5; i++) {
        trainStep();
      }
      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [isTraining, trainStep]);

  // Render decision boundary heatmap and points onto HTML Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // 1. Draw Decision Boundary Grid (Heatmap)
    const gridSize = 45;
    const cellW = width / gridSize;
    const cellH = height / gridSize;

    for (let gx = 0; gx < gridSize; gx++) {
      for (let gy = 0; gy < gridSize; gy++) {
        const x = (gx / (gridSize - 1)) * 2 - 1;
        const y = -((gy / (gridSize - 1)) * 2 - 1); // invert canvas Y axis
        const prob = forward(x, y);

        // Interpolate colors: Class 0 (Cyan #3B82F6) -> Class 1 (Emerald #10B981)
        if (prob > 0.5) {
          const alpha = Math.min(0.42, (prob - 0.5) * 0.85);
          ctx.fillStyle = `rgba(16, 185, 129, ${alpha})`;
        } else {
          const alpha = Math.min(0.42, (0.5 - prob) * 0.85);
          ctx.fillStyle = `rgba(59, 130, 246, ${alpha})`;
        }
        ctx.fillRect(gx * cellW, gy * cellH, cellW + 1, cellH + 1);
      }
    }

    // 2. Draw Carthesian Coordinate Axes & Grid Lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();

    // 3. Render Data Points
    points.forEach((pt) => {
      const cx = ((pt.x + 1) / 2) * width;
      const cy = ((-pt.y + 1) / 2) * height; // invert Y

      ctx.save();
      if (pt.label === 1) {
        // Emerald Class (Circle)
        ctx.fillStyle = '#10B981';
        ctx.shadowColor = 'rgba(16, 185, 129, 0.6)';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(cx, cy, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(cx, cy, 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Cyan Class (Square)
        ctx.fillStyle = '#3B82F6';
        ctx.shadowColor = 'rgba(59, 130, 246, 0.6)';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.rect(cx - 5.5, cy - 5.5, 11, 11);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.rect(cx - 2, cy - 2, 4, 4);
        ctx.fill();
      }
      ctx.restore();
    });
  }, [points, epoch]);

  // Click on canvas to drop data points
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const normX = (clickX / rect.width) * 2 - 1;
    const normY = -((clickY / rect.height) * 2 - 1);

    playClick();
    setPoints((prev) => [
      ...prev,
      { x: Math.max(-0.95, Math.min(0.95, normX)), y: Math.max(-0.95, Math.min(0.95, normY)), label: selectedLabel },
    ]);
  };

  const handleSelectPreset = (key: string) => {
    playClick();
    setActivePreset(key);
    setIsTraining(false);
    setPoints(PRESETS[key].generate());
    initWeights(hiddenNeurons);
    toast({
      title: `Dataset Loaded: ${PRESETS[key].name}`,
      description: PRESETS[key].desc,
      type: 'info',
    });
  };

  const handleReset = () => {
    playClick();
    setIsTraining(false);
    initWeights(hiddenNeurons);
  };

  const handleClear = () => {
    playClick();
    setIsTraining(false);
    setPoints([]);
    initWeights(hiddenNeurons);
  };

  return (
    <div className="w-full rounded-2xl bg-white dark:bg-[#111216] border border-[#E2E4E8] dark:border-[#22242B] p-4 sm:p-6 space-y-5 shadow-2xs select-none font-sans">
      
      {/* ── HEADER STRIP & REAL-TIME ML TELEMETRY ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E4E8] dark:border-[#22242B] pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Cpu size={14} />
            </span>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#71717A] dark:text-[#A1A1AA]">
              APPLIED MACHINE LEARNING LAB // MULTI-LAYER PERCEPTRON
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[#09090B] dark:text-white tracking-tight">
            Decision Boundary Contour Classifier
          </h3>
        </div>

        {/* Live Loss & Epoch Telemetry Badge */}
        <div className="flex items-center gap-2 font-mono text-xs self-start sm:self-auto">
          <div className="px-3 py-1.5 rounded-lg bg-[#F4F4F6] dark:bg-[#18191E] border border-[#E2E4E8] dark:border-[#27272A] flex items-center gap-3">
            <div>
              <span className="text-[9.5px] text-[#71717A] dark:text-[#A1A1AA] uppercase">EPOCH: </span>
              <span className="font-bold text-[#09090B] dark:text-white">{epoch}</span>
            </div>
            <div className="w-px h-3 bg-[#E2E4E8] dark:bg-[#27272A]" />
            <div>
              <span className="text-[9.5px] text-[#71717A] dark:text-[#A1A1AA] uppercase">LOSS: </span>
              <span className={`font-bold ${loss < 0.08 ? 'text-emerald-500' : 'text-amber-500'}`}>
                {loss.toFixed(3)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN INTERACTIVE GRID: CANVAS + HYPERPARAMETER CONTROLS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* Left: 2D Interactive Decision Canvas (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="relative w-full aspect-square max-w-[440px] mx-auto rounded-xl overflow-hidden border border-[#D1D5DB] dark:border-[#27272A] bg-[#0A0B0E] shadow-inner cursor-crosshair group">
            <canvas
              ref={canvasRef}
              width={420}
              height={420}
              onClick={handleCanvasClick}
              className="w-full h-full block"
            />

            {/* Corner Viewfinder Marks */}
            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/40 pointer-events-none" />
            <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/40 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/40 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/40 pointer-events-none" />

            {/* In-Canvas Status Overlay */}
            <div className="absolute bottom-2 left-2.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[9px] font-mono text-[#A1A1AA] pointer-events-none">
              Click canvas to add points ({points.length} samples)
            </div>
          </div>

          {/* Point Class Selector Switch */}
          <div className="flex items-center justify-between text-xs font-mono max-w-[440px] mx-auto px-1">
            <span className="text-[#71717A] dark:text-[#A1A1AA] text-[11px]">Click to add:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  playClick();
                  setSelectedLabel(1);
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                  selectedLabel === 1
                    ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-600 dark:text-emerald-400 shadow-xs'
                    : 'bg-[#F4F4F6] dark:bg-[#18191E] border border-transparent text-[#71717A] hover:text-[#09090B] dark:hover:text-white'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                <span>Class 1 (●)</span>
              </button>

              <button
                onClick={() => {
                  playClick();
                  setSelectedLabel(0);
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                  selectedLabel === 0
                    ? 'bg-blue-500/20 border border-blue-500 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'bg-[#F4F4F6] dark:bg-[#18191E] border border-transparent text-[#71717A] hover:text-[#09090B] dark:hover:text-white'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-xs bg-blue-500 inline-block" />
                <span>Class 0 (■)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Controls & Hyperparameters (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Primary Train Toggle Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playClick();
                setIsTraining((prev) => !prev);
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer shadow-xs ${
                isTraining
                  ? 'bg-amber-500 hover:bg-amber-600 text-black animate-pulse'
                  : 'bg-black hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black'
              }`}
            >
              {isTraining ? <Pause size={14} /> : <Play size={14} />}
              <span>{isTraining ? 'PAUSE TRAINING' : 'TRAIN NEURAL NET'}</span>
            </button>

            <button
              onClick={handleReset}
              className="p-2.5 rounded-xl bg-[#F4F4F6] hover:bg-[#EAECEF] dark:bg-[#18191E] dark:hover:bg-[#22242B] border border-[#E2E4E8] dark:border-[#27272A] text-[#71717A] hover:text-[#09090B] dark:hover:text-white transition-colors cursor-pointer"
              title="Re-initialize weights"
            >
              <RotateCcw size={14} />
            </button>
          </div>

          {/* Preset Datasets */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase text-[#71717A] dark:text-[#A1A1AA] tracking-wider font-bold">
              Benchmark Topology Presets
            </label>
            <div className="grid grid-cols-3 gap-1.5 font-mono text-[11px]">
              {Object.entries(PRESETS).map(([key, p]) => (
                <button
                  key={key}
                  onClick={() => handleSelectPreset(key)}
                  className={`p-2 rounded-lg text-center transition-all cursor-pointer border ${
                    activePreset === key
                      ? 'bg-black text-white dark:bg-white dark:text-black font-bold border-black dark:border-white'
                      : 'bg-[#F4F4F6] dark:bg-[#18191E] border-[#E2E4E8] dark:border-[#27272A] text-[#71717A] hover:text-[#09090B] dark:hover:text-white'
                  }`}
                >
                  {p.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Hyperparameters Configuration */}
          <div className="p-3.5 rounded-xl bg-[#F9F9FB] dark:bg-[#16171B] border border-[#E2E4E8] dark:border-[#22242B] space-y-3 font-mono text-xs">
            
            {/* Hidden Neurons (Architecture) */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-[#71717A] dark:text-[#A1A1AA]">HIDDEN NEURONS:</span>
                <span className="font-bold text-[#09090B] dark:text-white">{hiddenNeurons} neurons (2 → {hiddenNeurons} → 1)</span>
              </div>
              <div className="flex items-center gap-1.5 pt-1">
                {[2, 4, 6, 8].map((n) => (
                  <button
                    key={n}
                    onClick={() => {
                      playClick();
                      setHiddenNeurons(n);
                    }}
                    className={`flex-1 py-1 rounded text-center text-[10.5px] transition-all cursor-pointer ${
                      hiddenNeurons === n
                        ? 'bg-emerald-500 text-white font-bold'
                        : 'bg-white dark:bg-[#202128] border border-[#E2E4E8] dark:border-[#27272A] text-[#71717A] hover:text-[#09090B] dark:hover:text-white'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            {/* Learning Rate Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-[#71717A] dark:text-[#A1A1AA]">LEARNING RATE (η):</span>
                <span className="font-bold text-[#09090B] dark:text-white">{learningRate}</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.4"
                step="0.01"
                value={learningRate}
                onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-1.5 rounded-lg bg-black/10 dark:bg-white/10"
              />
            </div>

            {/* Clear Button */}
            <div className="pt-2 border-t border-[#E2E4E8] dark:border-white/5 flex items-center justify-between">
              <span className="text-[10px] text-[#71717A] dark:text-[#A1A1AA]">ACTIVATION: TANH + SIGMOID</span>
              <button
                onClick={handleClear}
                className="text-[10px] font-bold text-rose-500 hover:text-rose-600 transition-colors cursor-pointer"
              >
                CLEAR DATA
              </button>
            </div>
          </div>

          <p className="text-[11px] font-sans text-[#71717A] dark:text-[#A1A1AA] leading-relaxed">
            Real backpropagation running at 60fps in pure TypeScript. Demonstrates gradient descent optimizing the decision boundary manifold across non-linear spatial data.
          </p>

        </div>

      </div>

    </div>
  );
}
