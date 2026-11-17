'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Copy, Sparkles, X, Info } from 'lucide-react';

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'copy' | 'info';
  duration?: number;
}

interface ToastContextType {
  toast: (options: Omit<ToastItem, 'id'>) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback(({ title, description, type = 'success', duration = 3000 }: Omit<ToastItem, 'id'>) => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const newToast: ToastItem = { id, title, description, type, duration };

    setToasts((prev) => [...prev.slice(-3), newToast]); // Keep at most 4 toasts

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      {/* Floating Toast Notification Dock */}
      <div className="fixed bottom-5 right-5 z-[150] flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 16, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.94 }}
              transition={{ type: 'spring', stiffness: 500, damping: 32 }}
              className="pointer-events-auto w-full p-3.5 rounded-xl bg-white/95 dark:bg-[#121316]/95 border border-[#E2E4E8] dark:border-[#27272A] shadow-[0_12px_36px_rgba(0,0,0,0.18)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.7)] backdrop-blur-md flex items-start gap-3 select-none"
            >
              {/* Icon Indicator */}
              <div className="mt-0.5 shrink-0">
                {t.type === 'copy' && (
                  <div className="p-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <Copy size={13} />
                  </div>
                )}
                {t.type === 'success' && (
                  <div className="p-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 size={13} />
                  </div>
                )}
                {t.type === 'info' && (
                  <div className="p-1 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    <Sparkles size={13} />
                  </div>
                )}
              </div>

              {/* Title & Description */}
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-[#09090B] dark:text-white font-sans truncate">
                  {t.title}
                </div>
                {t.description && (
                  <div className="text-[11px] text-[#71717A] dark:text-[#A1A1AA] font-mono mt-0.5 leading-snug break-words">
                    {t.description}
                  </div>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={() => removeToast(t.id)}
                className="text-[#71717A] hover:text-[#09090B] dark:text-[#A1A1AA] dark:hover:text-white p-0.5 rounded transition-colors cursor-pointer shrink-0"
                title="Dismiss"
              >
                <X size={12} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
