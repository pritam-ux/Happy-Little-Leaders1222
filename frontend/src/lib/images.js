const U = (id, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const HERO_SLIDES = [
  { src: U('1503676260728-1c00da094a0b'), caption: 'Curious little learners' },
  { src: U('1587654780291-39c9404d746b'), caption: 'Hands-on discovery' },
  { src: U('1543109740-4bdb38fda756'), caption: 'Storytelling circles' },
  { src: U('1488521787991-ed7bbaae773c'), caption: 'Arts & crafts' },
  { src: U('1597211833712-5e41faa202f3'), caption: 'Music & movement' },
];

export const PROGRAM_IMAGES = {
  Playgroup: U('1587653263995-422546a7a569', 900),
  Nursery: U('1576267423445-b2e0074d68a4', 900),
  LKG: U('1517502884422-41eaead166d4', 900),
  UKG: U('1503676260728-1c00da094a0b', 900),
};

export const ACTIVITY_IMAGES = {
  story: U('1543109740-4bdb38fda756', 700),
  art: U('1488521787991-ed7bbaae773c', 700),
  music: U('1597211833712-5e41faa202f3', 700),
  outdoor: U('1571210862729-78a52d3779a2', 700),
  rhymes: U('1607013251379-e6eecfffe234', 700),
  sensory: U('1587654780291-39c9404d746b', 700),
  festival: U('1604881988758-f76ad2f7aac1', 700),
  speaking: U('1588072432836-e10032774350', 700),
};

export const GALLERY_PHOTOS = [
  { id: 1, src: U('1503676260728-1c00da094a0b', 900), category: 'Classroom Activities', label: 'Morning Circle' },
  { id: 2, src: U('1543109740-4bdb38fda756', 900), category: 'Story Reading', label: 'Story Hour' },
  { id: 3, src: U('1488521787991-ed7bbaae773c', 900), category: 'Art & Craft', label: 'Paint Day' },
  { id: 4, src: U('1571210862729-78a52d3779a2', 900), category: 'Sports Day', label: 'Mini Marathon' },
  { id: 5, src: U('1604881988758-f76ad2f7aac1', 900), category: 'Festivals', label: 'Diwali Celebration' },
  { id: 6, src: U('1597211833712-5e41faa202f3', 900), category: 'Classroom Activities', label: 'Music Class' },
  { id: 7, src: U('1587653263995-422546a7a569', 900), category: 'Classroom Activities', label: 'Reading Corner' },
  { id: 8, src: U('1607013251379-e6eecfffe234', 900), category: 'Field Trips', label: 'Nature Walk' },
  { id: 9, src: U('1517502884422-41eaead166d4', 900), category: 'Annual Day', label: 'Stage Performance' },
  { id: 10, src: U('1576267423445-b2e0074d68a4', 900), category: 'Art & Craft', label: 'Clay Modelling' },
  { id: 11, src: U('1588072432836-e10032774350', 900), category: 'Story Reading', label: 'Library Time' },
  { id: 12, src: U('1587654780291-39c9404d746b', 900), category: 'Classroom Activities', label: 'Sensory Play' },
];

export const GALLERY_CATEGORIES = [
  'All',
  'Classroom Activities',
  'Story Reading',
  'Art & Craft',
  'Sports Day',
  'Festivals',
  'Field Trips',
  'Annual Day',
];

export const SAFETY_IMAGES = {
  cctv: U('1557597774-9d273605dfa9', 700),
  sanitize: U('1584036561566-baf8f5f1b144', 700),
  caregivers: U('1503676260728-1c00da094a0b', 700),
  entry: U('1568667256549-094345857637', 700),
  snacks: U('1490818387583-1baba5e638af', 700),
  emergency: U('1576765608535-5f04d1e3f289', 700),
};

export const DAYCARE_IMAGES = [
  U('1587653263995-422546a7a569', 1000),
  U('1587654780291-39c9404d746b', 1000),
];

export const FOUNDER_IMAGE = '/founder.jpg';

export const TOUR_THUMB = U('1503676260728-1c00da094a0b', 1400);
export const TOUR_VIDEO_ID = 'gEK0HlXkoXI';
