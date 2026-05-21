// UI string sets for per-page localisation. Each trip day picks a `lang`
// in its frontmatter; the index page sets it directly.
export type Lang = 'en' | 'th';

export interface UIStrings {
  htmlLang: string;
  locale: string;
  dayLabel: string;
  logged: string;
  planning: string;
  statSteps: string;
  statSpent: string;
  statStops: string;
  statPhotos: string;
  timeline: string;
  timelineEmpty: string;
  colTime: string;
  colStop: string;
  colCost: string;
  routeMap: string;
  routeEmpty: string;
  photos: string;
  references: string;
  tripIndex: string;
  footerBlog: string;
}

const en: UIStrings = {
  htmlLang: 'en',
  locale: 'en-GB',
  dayLabel: 'Day',
  logged: '✓ Logged',
  planning: '✎ Planning',
  statSteps: 'Steps',
  statSpent: 'Spent',
  statStops: 'Stops',
  statPhotos: 'Photos',
  timeline: 'Timeline',
  timelineEmpty: 'No timeline for this day yet.',
  colTime: 'Time',
  colStop: 'Stop',
  colCost: 'Cost',
  routeMap: 'Route map',
  routeEmpty:
    'No route mapped yet — stops will appear here once the day is decided.',
  photos: 'Photos',
  references: 'References & links',
  tripIndex: 'Trip index',
  footerBlog: 'z4go — Osaka / Kansai trip plan',
};

const th: UIStrings = {
  htmlLang: 'th',
  locale: 'th-TH-u-ca-gregory',
  dayLabel: 'วันที่',
  logged: '✓ บันทึกแล้ว',
  planning: '✎ กำลังวางแผน',
  statSteps: 'ก้าวเดิน',
  statSpent: 'ใช้จ่าย',
  statStops: 'จุดแวะ',
  statPhotos: 'รูปภาพ',
  timeline: 'ไทม์ไลน์',
  timelineEmpty: 'ยังไม่มีไทม์ไลน์ของวันนี้',
  colTime: 'เวลา',
  colStop: 'จุดแวะ',
  colCost: 'ค่าใช้จ่าย',
  routeMap: 'แผนที่เส้นทาง',
  routeEmpty: 'ยังไม่ได้วางเส้นทาง — จุดแวะจะปรากฏที่นี่เมื่อวางแผนวันนี้เสร็จ',
  photos: 'รูปภาพ',
  references: 'ลิงก์อ้างอิง',
  tripIndex: 'หน้าทริป',
  footerBlog: 'z4go — แผนเที่ยวโอซากะ / คันไซ',
};

export const strings: Record<Lang, UIStrings> = { en, th };

export function t(lang: Lang = 'en'): UIStrings {
  return strings[lang] ?? en;
}
