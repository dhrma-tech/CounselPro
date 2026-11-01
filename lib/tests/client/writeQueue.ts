"use client";

import type { PaletteStatus } from '../types';

export interface QueuedWrite {
  questionId: string;
  seq: number;
  status: PaletteStatus;
  selectedOptionIds: string[];
  numericalInput: string | null;
  timeSpentDeltaMs: number;
  visited?: boolean;
}

export type SyncState = 'saved' | 'saving' | 'offline';

interface WriteQueueOptions {
  attemptId: string;
  onState: (state: SyncState) => void;
  onSaved?: (write: QueuedWrite, response: Record<string, unknown>) => void;
  onRejected?: (write: QueuedWrite, code: string, message: string) => void;
}

const RETRY_DELAYS = [1000, 2000, 4000, 8000, 15000];

/**
 * Ordered, offline-tolerant answer writes. Pending writes survive a tab close (localStorage) and
 * are flushed in order on reconnect. Writes for the same question are merged (latest answer wins,
 * time spent is summed). Validation errors (4xx) are dropped; network / 5xx errors are retried.
 */
export class WriteQueue {
  private queue: QueuedWrite[] = [];
  private flushing = false;
  private retryIndex = 0;
  private retryTimer: ReturnType<typeof setTimeout> | null = null;
  private idleResolvers: (() => void)[] = [];

  constructor(private opts: WriteQueueOptions) {
    this.queue = this.load();
    if (this.queue.length > 0) void this.flush();
  }

  private get storageKey() {
    return `cp_queue_${this.opts.attemptId}`;
  }

  private load(): QueuedWrite[] {
    try {
      const raw = localStorage.getItem(this.storageKey);
      return raw ? (JSON.parse(raw) as QueuedWrite[]) : [];
    } catch {
      return [];
    }
  }

  private persist() {
    try {
      if (this.queue.length === 0) localStorage.removeItem(this.storageKey);
      else localStorage.setItem(this.storageKey, JSON.stringify(this.queue));
    } catch {
      // Storage unavailable (private mode); the queue still works in memory
    }
  }

  get pending(): number {
    return this.queue.length;
  }

  /** Highest sequence number still waiting to be sent (0 when empty). */
  maxSeq(): number {
    return this.queue.reduce((m, w) => Math.max(m, w.seq), 0);
  }

  /** Latest queued (unsent) write per question, used to restore answers on resume. */
  pendingByQuestion(): Map<string, QueuedWrite> {
    return new Map(this.queue.map((w) => [w.questionId, w]));
  }

  enqueue(write: QueuedWrite) {
    const idx = this.queue.findIndex((w) => w.questionId === write.questionId);
    // Never merge into the write that is currently in flight (index 0 while flushing)
    if (idx > 0 || (idx === 0 && !this.flushing)) {
      const prev = this.queue[idx];
      this.queue[idx] = {
        ...write,
        timeSpentDeltaMs: prev.timeSpentDeltaMs + write.timeSpentDeltaMs,
        visited: prev.visited || write.visited,
      };
    } else {
      this.queue.push(write);
    }
    this.persist();
    void this.flush();
  }

  /** Resolves once every queued write has been sent (or dropped). */
  whenIdle(timeoutMs = 8000): Promise<void> {
    if (this.queue.length === 0 && !this.flushing) return Promise.resolve();
    return new Promise((resolve) => {
      const timer = setTimeout(resolve, timeoutMs);
      this.idleResolvers.push(() => {
        clearTimeout(timer);
        resolve();
      });
      if (this.retryTimer) {
        clearTimeout(this.retryTimer);
        this.retryTimer = null;
        void this.flush();
      }
    });
  }

  retryNow() {
    if (this.retryTimer) {
      clearTimeout(this.retryTimer);
      this.retryTimer = null;
    }
    this.retryIndex = 0;
    void this.flush();
  }

  dispose() {
    if (this.retryTimer) clearTimeout(this.retryTimer);
  }

  private async flush() {
    if (this.flushing) return;
    this.flushing = true;
    this.opts.onState('saving');

    while (this.queue.length > 0) {
      const write = this.queue[0];
      try {
        const res = await fetch(`/api/attempts/${this.opts.attemptId}/responses/${write.questionId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...write, clientTs: Date.now() }),
          keepalive: true,
        });
        const body = await res.json().catch(() => ({}));
        if (res.ok) {
          this.opts.onSaved?.(write, body);
        } else if (res.status >= 400 && res.status < 500) {
          this.opts.onRejected?.(write, body.code ?? 'INVALID', body.error ?? 'Could not save');
        } else {
          throw new Error('server');
        }
        this.queue.shift();
        this.persist();
        this.retryIndex = 0;
      } catch {
        this.flushing = false;
        this.opts.onState('offline');
        const delay = RETRY_DELAYS[Math.min(this.retryIndex++, RETRY_DELAYS.length - 1)];
        this.retryTimer = setTimeout(() => {
          this.retryTimer = null;
          void this.flush();
        }, delay);
        return;
      }
    }

    this.flushing = false;
    this.opts.onState('saved');
    const resolvers = this.idleResolvers;
    this.idleResolvers = [];
    resolvers.forEach((r) => r());
  }
}
