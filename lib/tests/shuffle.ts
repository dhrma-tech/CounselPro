export function hashString(input: string): number {
  // FNV-1a 32-bit
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffleInPlace<T>(items: T[], random: () => number): T[] {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

export interface ShuffleQuestionInput {
  id: string;
  // Questions sharing a group (e.g. one passage) stay together and in their original order
  groupId: string | null;
  optionIds: string[];
  shuffleOptions: boolean;
}

export interface ShuffleSectionInput {
  id: string;
  questions: ShuffleQuestionInput[];
  keepOrder?: boolean;
}

export interface PaperOrder {
  sections: { id: string; questionIds: string[] }[];
  optionOrder: Record<string, string[]>;
}

/** Deterministic per-attempt paper: same seed always yields the same order (needed for resume). */
export function generateShuffledPaper(seed: string, sections: ShuffleSectionInput[]): PaperOrder {
  const random = mulberry32(hashString(seed));
  const optionOrder: Record<string, string[]> = {};

  const orderedSections = sections.map((section) => {
    const blocks: ShuffleQuestionInput[][] = [];
    const byGroup = new Map<string, ShuffleQuestionInput[]>();
    for (const q of section.questions) {
      if (q.groupId) {
        const existing = byGroup.get(q.groupId);
        if (existing) {
          existing.push(q);
          continue;
        }
        const block = [q];
        byGroup.set(q.groupId, block);
        blocks.push(block);
      } else {
        blocks.push([q]);
      }
    }
    if (!section.keepOrder) shuffleInPlace(blocks, random);

    const questionIds: string[] = [];
    for (const block of blocks) {
      for (const q of block) {
        questionIds.push(q.id);
        if (q.optionIds.length > 0) {
          optionOrder[q.id] = q.shuffleOptions ? shuffleInPlace([...q.optionIds], random) : [...q.optionIds];
        }
      }
    }
    return { id: section.id, questionIds };
  });

  return { sections: orderedSections, optionOrder };
}
