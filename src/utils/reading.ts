import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';

export type ReadingEntry = CollectionEntry<'reading'>;
export type ReadingNoteEntry = CollectionEntry<'readingNotes'>;
export type ReadingTimelineEventType = 'added' | 'started' | 'finished';

export interface ReadingTimelineEvent {
  id: string;
  type: ReadingTimelineEventType;
  date: Date;
  item: ReadingEntry;
}

export const readingStatusLabels = {
  reading: '最近在读',
  interested: '感兴趣',
  finished: '已读',
} as const;

export async function getPublishedReading() {
  const items = await getCollection('reading', ({ data }) => !data.draft);
  return items.sort((a, b) => {
    const dateA = getLatestReadingDate(a);
    const dateB = getLatestReadingDate(b);
    return dateB.valueOf() - dateA.valueOf();
  });
}

export async function getPublishedReadingNotes() {
  const notes = await getCollection('readingNotes', ({ data }) => !data.draft);
  return notes.sort((a, b) => b.data.recordedAt.valueOf() - a.data.recordedAt.valueOf());
}

export function getNotesForBook(notes: ReadingNoteEntry[], bookId: string) {
  return notes.filter((note) => note.data.book === bookId);
}

export function formatReadingNoteTime(date: Date) {
  return new Intl.DateTimeFormat('zh-CN', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Asia/Shanghai',
    hour12: false,
  }).format(date);
}

export function getReadingByStatus(items: ReadingEntry[], status: ReadingEntry['data']['status']) {
  return items.filter((item) => item.data.status === status);
}

export function getReadingTimeline(items: ReadingEntry[]) {
  const events: ReadingTimelineEvent[] = [];

  items.forEach((item) => {
    events.push({
      id: `${item.id}-added`,
      type: 'added',
      date: item.data.addedDate,
      item,
    });

    if (item.data.startedDate) {
      events.push({
        id: `${item.id}-started`,
        type: 'started',
        date: item.data.startedDate,
        item,
      });
    }

    if (item.data.finishedDate) {
      events.push({
        id: `${item.id}-finished`,
        type: 'finished',
        date: item.data.finishedDate,
        item,
      });
    }
  });

  const typePriority: Record<ReadingTimelineEventType, number> = {
    finished: 3,
    started: 2,
    added: 1,
  };

  return events.sort((a, b) => {
    return b.date.valueOf() - a.date.valueOf() || typePriority[b.type] - typePriority[a.type];
  });
}

export function getReadingTimelineLabel(event: ReadingTimelineEvent) {
  if (event.type === 'finished') return '读完';
  if (event.type === 'started') return '开始阅读';
  return event.item.data.status === 'interested' ? '加入感兴趣' : '加入阅读清单';
}

function getLatestReadingDate(item: ReadingEntry) {
  const dates = [item.data.addedDate, item.data.startedDate, item.data.finishedDate]
    .filter((date): date is Date => Boolean(date))
    .map((date) => date.valueOf());
  return new Date(Math.max(...dates));
}
