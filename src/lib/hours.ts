/**
 * Calisma saati hesaplari.
 *
 * Onemli: hesap her zaman Kibris yerel saatine gore yapilir. Ziyaretci
 * Almanya veya Ingiltere'den bakiyorsa kendi saatine gore yanlis sonuc
 * gormemesi icin tarayici saati degil Europe/Nicosia kullanilir.
 */
import { type DayHours } from '../config/site';

const TIME_ZONE = 'Europe/Nicosia';

/** "08:00" -> 480, "24:00" -> 1440 */
export const toMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

/** 1440 -> "00:00" (gece yarisini insan gozune uygun yazar) */
export const formatTime = (time: string) => (time === '24:00' ? '00:00' : time);

const SHORT_DAY_TO_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

/** Kibris saatine gore su anki gun indeksi (0 = Pazar) ve gun icindeki dakika. */
export const nowInCyprus = (now: Date = new Date()) => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TIME_ZONE,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(now);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? '';

  // hour12: false bazi ortamlarda gece yarisini "24" olarak verir.
  const hour = Number(get('hour')) % 24;

  return {
    day: SHORT_DAY_TO_INDEX[get('weekday')] ?? 0,
    minute: hour * 60 + Number(get('minute')),
  };
};

export type OpenStatus =
  | { open: true; closesAt: string }
  /** opensDayIndex: 0 = Pazar. Gun adi ceviriden okunur, burada dil yoktur. */
  | { open: false; opensAt: string; opensDayIndex: number; opensToday: boolean };

/**
 * Su an acik mi? Acikken kapanis saatini, kapaliyken siradaki acilisi dondurur.
 * Gece yarisini asan saatler (ornek: 18:00 - 03:00) da dogru degerlendirilir.
 */
export const getOpenStatus = (
  hours: readonly DayHours[],
  now: Date = new Date()
): OpenStatus => {
  const { day, minute } = nowInCyprus(now);

  const today = hours[day];
  if (!today.closed) {
    const opens = toMinutes(today.opens);
    const closes = toMinutes(today.closes);
    // Ayni gun icinde kapanan normal aralik.
    if (closes > opens && minute >= opens && minute < closes) {
      return { open: true, closesAt: formatTime(today.closes) };
    }
    // Gece yarisini asan aralik: bugun acildi, yarin kapaniyor.
    if (closes < opens && minute >= opens) {
      return { open: true, closesAt: formatTime(today.closes) };
    }
  }

  // Dun acilip gece yarisini asarak bu saate tasan bir aralik var mi?
  const yesterdayIndex = (day + 6) % 7;
  const yesterday = hours[yesterdayIndex];
  if (!yesterday.closed) {
    const opens = toMinutes(yesterday.opens);
    const closes = toMinutes(yesterday.closes);
    if (closes < opens && minute < closes) {
      return { open: true, closesAt: formatTime(yesterday.closes) };
    }
  }

  // Kapali: bugunden baslayarak siradaki acilisi bul.
  for (let offset = 0; offset < 7; offset += 1) {
    const index = (day + offset) % 7;
    const candidate = hours[index];
    if (candidate.closed) continue;
    // Bugun ise acilis saati henuz gelmemis olmali.
    if (offset === 0 && minute >= toMinutes(candidate.opens)) continue;
    return {
      open: false,
      opensAt: candidate.opens,
      opensDayIndex: index,
      opensToday: offset === 0,
    };
  }

  // Hicbir gun acik degil (teorik durum).
  return { open: false, opensAt: '', opensDayIndex: -1, opensToday: false };
};
