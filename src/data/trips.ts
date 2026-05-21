// Trip data for the planner. Add or edit trips here — pages rebuild from this.

export type ActivityTag = 'sight' | 'food' | 'transport' | 'stay' | 'activity';

export interface Activity {
  time: string;
  title: string;
  note?: string;
  tag: ActivityTag;
}

export interface Day {
  label: string;
  date: string;
  summary: string;
  activities: Activity[];
}

export interface Trip {
  slug: string;
  title: string;
  destination: string;
  country: string;
  emoji: string;
  start: string;
  end: string;
  travelers: number;
  budget: string;
  summary: string;
  /** Two colors for the card / hero gradient. */
  gradient: [string, string];
  days: Day[];
}

export const trips: Trip[] = [
  {
    slug: 'kyoto-japan',
    title: 'Kyoto in Spring',
    destination: 'Kyoto',
    country: 'Japan',
    emoji: '🏯',
    start: '2026-04-03',
    end: '2026-04-07',
    travelers: 2,
    budget: '$1,800',
    summary:
      'Temples, tea houses and cherry blossoms — a slow five days through the old capital.',
    gradient: ['#0d9488', '#38bdf8'],
    days: [
      {
        label: 'Day 1',
        date: '2026-04-03',
        summary: 'Arrive & ease into Gion',
        activities: [
          { time: '13:00', title: 'Land at Kansai Airport', note: 'Haruka express to Kyoto Station', tag: 'transport' },
          { time: '15:30', title: 'Check in — ryokan in Higashiyama', tag: 'stay' },
          { time: '17:00', title: 'Stroll Gion & Shirakawa canal', note: 'Best light before sunset', tag: 'sight' },
          { time: '19:30', title: 'Dinner — kaiseki tasting menu', tag: 'food' },
        ],
      },
      {
        label: 'Day 2',
        date: '2026-04-04',
        summary: 'Eastern temples',
        activities: [
          { time: '08:00', title: 'Kiyomizu-dera at opening', note: 'Beat the crowds', tag: 'sight' },
          { time: '10:30', title: 'Walk Sannenzaka & Ninenzaka', tag: 'sight' },
          { time: '12:30', title: 'Lunch — udon near Yasaka', tag: 'food' },
          { time: '14:30', title: 'Kodai-ji temple & garden', tag: 'sight' },
          { time: '18:00', title: 'Tea ceremony experience', tag: 'activity' },
        ],
      },
      {
        label: 'Day 3',
        date: '2026-04-05',
        summary: 'Arashiyama day trip',
        activities: [
          { time: '08:30', title: 'Train to Arashiyama', tag: 'transport' },
          { time: '09:15', title: 'Bamboo Grove walk', tag: 'sight' },
          { time: '10:30', title: 'Tenryu-ji temple', tag: 'sight' },
          { time: '12:00', title: 'Riverside lunch', tag: 'food' },
          { time: '14:00', title: 'Iwatayama Monkey Park', tag: 'activity' },
        ],
      },
      {
        label: 'Day 4',
        date: '2026-04-06',
        summary: 'Shrines & sake',
        activities: [
          { time: '08:00', title: 'Fushimi Inari — climb the torii gates', tag: 'sight' },
          { time: '12:00', title: 'Lunch in Fushimi sake district', tag: 'food' },
          { time: '14:00', title: 'Sake brewery tour & tasting', tag: 'activity' },
          { time: '17:00', title: 'Nishiki Market browse', tag: 'food' },
        ],
      },
      {
        label: 'Day 5',
        date: '2026-04-07',
        summary: 'Last morning & departure',
        activities: [
          { time: '09:00', title: 'Ginkaku-ji & Philosopher’s Path', tag: 'sight' },
          { time: '12:00', title: 'Farewell ramen', tag: 'food' },
          { time: '14:30', title: 'Haruka express to airport', tag: 'transport' },
        ],
      },
    ],
  },
  {
    slug: 'bali-indonesia',
    title: 'Bali Escape',
    destination: 'Ubud & Uluwatu',
    country: 'Indonesia',
    emoji: '🌴',
    start: '2026-06-12',
    end: '2026-06-15',
    travelers: 4,
    budget: '$1,200',
    summary:
      'Rice terraces, surf beaches and clifftop sunsets across four easy days.',
    gradient: ['#0f766e', '#fbbf24'],
    days: [
      {
        label: 'Day 1',
        date: '2026-06-12',
        summary: 'Settle into Ubud',
        activities: [
          { time: '11:00', title: 'Arrive Denpasar, drive to Ubud', tag: 'transport' },
          { time: '13:30', title: 'Check in — jungle villa', tag: 'stay' },
          { time: '16:00', title: 'Tegallalang rice terraces', tag: 'sight' },
          { time: '19:00', title: 'Dinner — Balinese warung', tag: 'food' },
        ],
      },
      {
        label: 'Day 2',
        date: '2026-06-13',
        summary: 'Waterfalls & temples',
        activities: [
          { time: '07:30', title: 'Tibumana Waterfall swim', tag: 'activity' },
          { time: '11:00', title: 'Tirta Empul holy spring', tag: 'sight' },
          { time: '13:00', title: 'Lunch with valley view', tag: 'food' },
          { time: '17:00', title: 'Sunset yoga session', tag: 'activity' },
        ],
      },
      {
        label: 'Day 3',
        date: '2026-06-14',
        summary: 'Move to the coast',
        activities: [
          { time: '09:00', title: 'Drive to Uluwatu', tag: 'transport' },
          { time: '11:30', title: 'Beach club & surf watch', tag: 'activity' },
          { time: '17:30', title: 'Uluwatu Temple & Kecak dance', tag: 'sight' },
          { time: '20:00', title: 'Seafood on Jimbaran Bay', tag: 'food' },
        ],
      },
      {
        label: 'Day 4',
        date: '2026-06-15',
        summary: 'Beach morning & fly out',
        activities: [
          { time: '08:00', title: 'Padang Padang Beach', tag: 'sight' },
          { time: '12:00', title: 'Final lunch near the airport', tag: 'food' },
          { time: '15:00', title: 'Departure from Denpasar', tag: 'transport' },
        ],
      },
    ],
  },
  {
    slug: 'swiss-alps',
    title: 'Swiss Alps Long Weekend',
    destination: 'Interlaken & Grindelwald',
    country: 'Switzerland',
    emoji: '🏔️',
    start: '2026-09-18',
    end: '2026-09-20',
    travelers: 2,
    budget: '$2,400',
    summary:
      'Mountain trains, glacier views and alpine hikes packed into three crisp days.',
    gradient: ['#134e4a', '#38bdf8'],
    days: [
      {
        label: 'Day 1',
        date: '2026-09-18',
        summary: 'Lakes & town',
        activities: [
          { time: '10:00', title: 'Train to Interlaken', tag: 'transport' },
          { time: '12:00', title: 'Check in — chalet hotel', tag: 'stay' },
          { time: '14:00', title: 'Lake Brienz boat cruise', tag: 'activity' },
          { time: '18:30', title: 'Fondue dinner', tag: 'food' },
        ],
      },
      {
        label: 'Day 2',
        date: '2026-09-19',
        summary: 'Top of Europe',
        activities: [
          { time: '07:30', title: 'Train to Jungfraujoch', note: 'Via Kleine Scheidegg', tag: 'transport' },
          { time: '10:00', title: 'Ice Palace & Sphinx viewpoint', tag: 'sight' },
          { time: '13:00', title: 'Lunch at the summit', tag: 'food' },
          { time: '15:30', title: 'Hike Eiger Trail to Grindelwald', tag: 'activity' },
        ],
      },
      {
        label: 'Day 3',
        date: '2026-09-20',
        summary: 'First cliff walk & departure',
        activities: [
          { time: '08:30', title: 'Gondola to First', tag: 'transport' },
          { time: '09:30', title: 'First Cliff Walk & Bachalpsee hike', tag: 'activity' },
          { time: '13:00', title: 'Lunch in Grindelwald', tag: 'food' },
          { time: '16:00', title: 'Train home', tag: 'transport' },
        ],
      },
    ],
  },
];

export function getTrip(slug: string): Trip | undefined {
  return trips.find((t) => t.slug === slug);
}
