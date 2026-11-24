import type {
  ScheduleItem,
  ProgramItem,
  CampItem,
  PartyPackage,
  GalleryItem,
  ReviewItem,
  FaqItem,
  LeadItem
} from '../types';

export const SCHEDULES: ScheduleItem[] = [
  {
    id: 'sch-1',
    category: 'after-school',
    categoryLabel: 'After School',
    sessions: '6 Sessions',
    title: 'Fall 2026 Junior Robotics & Engineering',
    location: 'Franklin Classical School',
    locationId: 'classical',
    dates: 'Nov 04 – Dec 16, 2026',
    time: '02:45 PM – 03:45 PM',
    price: '$150.00',
    priceNumber: 150,
    age: '5–12 yrs',
    spotsLeft: 4,
    totalSpots: 16,
    description: 'Hands-on motorized mechanisms, gear ratios, and junior robotic sensors tailored for elementary students.'
  },
  {
    id: 'sch-2',
    category: 'homeschool',
    categoryLabel: 'Homeschool',
    sessions: '15 Sessions',
    title: 'Friday LEGO® STEM Junior Engineer',
    location: 'Vine Christian Academy (Lifepoint Church)',
    locationId: 'vine',
    dates: 'Aug 28 – Dec 18, 2026',
    time: '10:00 AM – 11:00 AM',
    price: '$225.00',
    priceNumber: 225,
    age: '5–9 yrs',
    spotsLeft: 2,
    totalSpots: 14,
    description: 'Weekly comprehensive STEM homeschool curriculum covering architecture, classical simple machines, and creative storytelling.'
  },
  {
    id: 'sch-3',
    category: 'camps',
    categoryLabel: 'Winter Camp',
    sessions: '4 Full Days',
    title: 'Winter LEGO® Camp | Dec 21–24',
    location: '215 Gothic Ct Suite 102, Franklin',
    locationId: 'gothic',
    dates: 'Dec 21 – Dec 24, 2026',
    time: '09:30 AM – 03:30 PM',
    price: '$279.00',
    priceNumber: 279,
    age: '5–12 yrs',
    spotsLeft: 6,
    totalSpots: 20,
    description: 'Intensive 4-day holiday robotics, winter vehicle construction, and motorized carnival rides.'
  },
  {
    id: 'sch-4',
    category: 'camps',
    categoryLabel: 'Winter Camp',
    sessions: '1 Full Day',
    title: 'Winter LEGO® Camp | Mon Dec 21 Single Day',
    location: '215 Gothic Ct Suite 102, Franklin',
    locationId: 'gothic',
    dates: 'Dec 21, 2026',
    time: '09:30 AM – 03:30 PM',
    price: '$79.00',
    priceNumber: 79,
    age: '5–12 yrs',
    spotsLeft: 3,
    totalSpots: 10,
    description: 'Flexible drop-in single day experience packed with customized motorized builds and brick battles.'
  },
  {
    id: 'sch-5',
    category: 'camps',
    categoryLabel: 'Break Camp',
    sessions: '3 Full Days',
    title: 'Thanksgiving Break Camp | 3-Day Full-Day',
    location: '215 Gothic Ct Suite 102, Franklin',
    locationId: 'gothic',
    dates: 'Nov 23 – Nov 25, 2026',
    time: '09:30 AM – 03:30 PM',
    price: '$199.00',
    priceNumber: 199,
    age: '5–12 yrs',
    spotsLeft: 5,
    totalSpots: 18,
    description: 'Seasonal harvest machines, catapults, motorized turkey derby racers, and team bridge challenges.'
  },
];

export const PROGRAMS: ProgramItem[] = [
  {
    id: 'prog-after-school',
    slug: 'after-school-enrichment',
    ageGroup: 'elementary',
    ageLabel: '5–12 yrs',
    title: 'After School Programs',
    subtitle: 'Weekly on-campus STEAM workshops across Franklin & Williamson County',
    description: 'One-hour weekly STEAM classes hosted directly at Williamson County and Franklin elementary campuses.',
    longDescription: 'Hands-on 60-minute weekly workshops right on your school campus. Students build with motorized LEGO® Technic kits and motors in collaborative pairs—mastering core physics, mechanics, and creative problem-solving.',
    priceOrNote: 'From $150.00 / 6 weeks',
    priceNumber: 150,
    ctaText: 'View Dates & Enroll',
    iconName: 'GraduationCap',
    imageUrl: '/images/client/after-school-class.png',
    features: [
      'Hosted on-site at schools right after dismissal',
      'All proprietary project kits and motors included',
      'Weekly parent lesson summary cards to bridge classroom to home',
      'Certified, background-checked STEAM instructors'
    ],
    curriculum: [
      { weekOrUnit: 'Week 1', title: 'Torque & Gear Ratios', description: 'Building the motorized dragster and testing high-speed spur vs crown gears.' },
      { weekOrUnit: 'Week 2', title: 'Pulleys & Cranks', description: 'Constructing the high-tower construction crane with dual-string lift.' },
      { weekOrUnit: 'Week 3', title: 'Friction & Traction', description: 'Designing all-terrain 4x4 climber trucks over simulated rocky obstacles.' },
      { weekOrUnit: 'Week 4', title: 'Centrifugal Force', description: 'Spin art machines and high-velocity carousel physics.' },
      { weekOrUnit: 'Week 5', title: 'Earthquake Simulators', description: 'Structural engineering: testing beam integrity under oscillating loads.' },
      { weekOrUnit: 'Week 6', title: 'Grand Brick Showcase', description: 'Student freestyle motorized innovation challenge and graduation celebration.' }
    ],
    learningOutcomes: [
      'Master mechanical components (gears, pulleys, axles, ratchets)',
      'Strengthen teamwork and communicative articulation',
      'Apply scientific principles through physical experimentation',
      'Develop perseverance through testing and iterative debugging'
    ],
    recommendedAge: 'Kindergarten through 5th Grade (Ages 5–12)'
  },
  {
    id: 'prog-robotics-coding',
    slug: 'robotics-and-coding',
    ageGroup: 'elementary',
    ageLabel: '6–12 yrs',
    title: 'Robotics & Coding',
    subtitle: 'Motorized sensors, WeDo robotics, and block coding challenges',
    description: 'Junior Robotics & Engineering incorporating smart hub motors, tilt/motion sensors, and drag-and-drop block coding.',
    longDescription: 'Bridge mechanical building with software logic! Students use smart hub motors, tilt sensors, and Bluetooth to write visual block code—bringing robotic rovers, animals, and vehicles to life with interactive programming.',
    priceOrNote: 'From $175.00',
    priceNumber: 175,
    ctaText: 'Explore Robotics',
    iconName: 'Bot',
    imageUrl: '/images/client/junior-robotics-1.png',
    features: [
      'Smart Hubs, Tilt Sensors & Motion Detectors',
      'Beginner-friendly visual Scratch & block coding interface',
      'Step-by-step logic progression from sequencing to conditionals',
      'Tablet devices and robotics sets provided for every pair'
    ],
    curriculum: [
      { weekOrUnit: 'Unit 1', title: 'Autonomous Motion', description: 'Programming motors for distance calibration, wheel rotations, and turning arcs.' },
      { weekOrUnit: 'Unit 2', title: 'Sensor Integration', description: 'Using distance detectors to avoid collision in smart autonomous vehicles.' },
      { weekOrUnit: 'Unit 3', title: 'Dynamic Loops & Variables', description: 'Creating automated sound effects, flashing LED alerts, and looping cycles.' },
      { weekOrUnit: 'Unit 4', title: 'Robotics Battle Arena', description: 'Engineering sumo bot chassis and writing combat defensive routines.' }
    ],
    learningOutcomes: [
      'Understand inputs, outputs, and controller logic',
      'Program conditional branches (If/Else) and repeat loops',
      'Calibrate ultrasonic & tilt sensors accurately',
      'Translate abstract algorithms into physical robot reactions'
    ],
    recommendedAge: '1st through 6th Grade (Ages 6–12)'
  },
  {
    id: 'prog-preschool-duplo',
    slug: 'preschool-duplo-enrichment',
    ageGroup: 'prek',
    ageLabel: '3–5 yrs',
    title: 'Engaging Pre-School with DUPLO®',
    subtitle: 'Fine-motor fundamentals, color sequencing, letters, and early math',
    description: 'Patterning, counting, letter recognition, and guided spatial building designed specially for early learners.',
    longDescription: 'Specially engineered for little hands (ages 3–5) using larger DUPLO® bricks to boost early developmental milestones—exploring numbers, letters, and shapes while strengthening motor skills, coordination, and social empathy.',
    priceOrNote: 'Preschool Partner Inquiries',
    priceNumber: 95,
    ctaText: 'Preschool Inquiry',
    iconName: 'Blocks',
    imageUrl: '/images/client/model-building-class.png',
    features: [
      'Tailored for 3 to 5-year-old sensory development',
      'Thematic weekly storytelling (Animals, Space, Community Helpers)',
      'Fine-motor grip development through large-scale brick manipulation',
      'Bilingual vocabulary & counting reinforcement'
    ],
    curriculum: [
      { weekOrUnit: 'Week 1', title: 'Zoo Animals & Habitats', description: 'Building giraffes, bridges, and cages while learning animal sounds and counting.' },
      { weekOrUnit: 'Week 2', title: 'Vehicles that Roll & Fly', description: 'Color sequencing with wheels, trains, airplanes, and sorting patterns.' },
      { weekOrUnit: 'Week 3', title: 'Letters & Architectural Towers', description: 'Building the Alphabet: constructing letter shapes with sturdy baseplates.' },
      { weekOrUnit: 'Week 4', title: 'Under the Sea & Marine Life', description: 'Creative storytelling with submarine builds, sea creatures, and buoyancy.' }
    ],
    learningOutcomes: [
      'Fine motor muscle control and bilateral hand coordination',
      'Pattern identification and early mathematical grouping',
      'Letter formation and phonetic associations',
      'Sharing, waiting turns, and cooperative clean-up habits'
    ],
    recommendedAge: 'Ages 3 to 5 (Preschool & Pre-K)'
  },
  {
    id: 'prog-seasonal-camps',
    slug: 'holiday-summer-camps',
    ageGroup: 'elementary',
    ageLabel: '5–12 yrs',
    title: 'Winter & Summer Camps',
    subtitle: 'Full-day, half-day, and single-day themed engineering adventures',
    description: 'Half-day and full-day themed LEGO® camps during Thanksgiving, Winter, and Summer school breaks in Franklin.',
    longDescription: 'When school is out, the bricks come out! Our seasonal STEM camps in Franklin, TN immerse kids in high-energy thematic adventures. From Space Colonization and Amusement Park Physics to Mining & Crafting and Battlebots, every day combines instructional motorized builds, creative free-play, brick mosaic art, and friendly design competitions.',
    priceOrNote: 'From $49/day • $279/week',
    priceNumber: 279,
    ctaText: 'See Camp Schedules',
    iconName: 'Trees',
    imageUrl: '/images/client/hero-camps-banner.png',
    features: [
      'Convenient Franklin facility at 215 Gothic Ct Suite 102',
      'Flexible full-day (9:30-3:30) and half-day (AM/PM) options',
      'New theme builds every single day: never repetitive',
      'Low student-to-teacher ratio (maximum 1:8)'
    ],
    curriculum: [
      { weekOrUnit: 'Day 1', title: 'Galactic Explorers', description: 'Motorized planetary rovers, satellite orbital arrays, and rocket launching gantries.' },
      { weekOrUnit: 'Day 2', title: 'Thrill Park Physics', description: 'Loop-the-loop coaster carts, motorized swinging pirate ships, and Ferris wheels.' },
      { weekOrUnit: 'Day 3', title: 'Mining & Crafting Block World', description: 'Creepers, redstone piston traps, motorized mining carts, and diamond tool forge.' },
      { weekOrUnit: 'Day 4', title: 'Robotics Battle Arena', description: 'Heavy-duty battlebots with spinning hammers, wedged rams, and tournament bracket.' }
    ],
    learningOutcomes: [
      'Deep engagement with mechanical physics concepts',
      'Social friendships with like-minded peer builders',
      'Creative problem-solving under playful engineering constraints',
      'Pride of building 8+ unique motorized machines throughout the week'
    ],
    recommendedAge: 'Ages 5 to 12 (Elementary & Middle School)'
  },
  {
    id: 'prog-scouts-seniors',
    slug: 'scouts-and-bricks4seniors',
    ageGroup: 'community',
    ageLabel: 'Community',
    title: 'Scouts Badges & Bricks4Seniors',
    subtitle: 'Troop badge workshops and cognitive wellness sessions for senior living',
    description: 'Custom STEM badge workshops for Scout troops and cognitive-building therapy sessions for senior communities.',
    longDescription: 'Bricks 4 Kidz brings hands-on building to the broader Williamson County community. For Scout Troops (Cub Scouts, Girl Scouts, Scouts BSA), we host complete STEM badge workshops fulfilling all rank requirements. For senior living communities, our Bricks4Seniors program stimulates cognitive flexibility, motor dexterity, and nostalgic joy through tactile brick building.',
    priceOrNote: 'Custom Group Quotes',
    priceNumber: 180,
    ctaText: 'Request Group Quote',
    iconName: 'Users',
    imageUrl: '/images/client/stem-benefits.webp',
    features: [
      'Scout Badge certification documentation and patch support',
      'Mobile equipment brought directly to troop den or senior facility',
      'Gentle, low-pressure cognitive stimulation for memory care communities',
      'Customized scheduling on weekday evenings and weekends'
    ],
    curriculum: [
      { weekOrUnit: 'Track A', title: 'Cub Scouts STEM Adventures', description: 'Engineering, robotics, and machine badges completed in a single 2-hour session.' },
      { weekOrUnit: 'Track B', title: 'Girl Scouts STEM Badges', description: 'Mechanical engineering, coding, and vehicle design badge fulfillment.' },
      { weekOrUnit: 'Track C', title: 'Bricks4Seniors Cognitive Joy', description: 'Tactile architectural builds, mosaic patterns, and memory recall exercises.' }
    ],
    learningOutcomes: [
      'Earn certified badges in an engaging, interactive setting',
      'Foster multi-generational connection and community warmth',
      'Exercise fine-motor finger muscles and tactile spatial cognition',
      'Experience the universal therapeutic fun of LEGO® bricks'
    ],
    recommendedAge: 'Scouts (Ages 6–16) • Seniors (All ages & abilities)'
  }
];

export const CAMPS: CampItem[] = [
  {
    id: 'camp-1',
    season: 'winter',
    track: 'Week 1 • 4 Full Days',
    spotsLeft: '6 spots left',
    spotsNumber: 6,
    title: 'Winter LEGO® Camp | Dec 21–24',
    time: '09:30 AM – 03:30 PM',
    location: '215 Gothic Ct Suite 102, Franklin',
    price: '$279.00',
    priceNumber: 279,
    age: '5–12 yrs',
    isPopular: true,
    imageUrl: '/images/client/hero-camps-banner.png',
    description: 'Our most popular holiday camp! 4 full days of motorized robotics, Arctic rescue transports, snowmobile derby races, and free-play engineering.',
    themes: ['Arctic Engineering', 'Motorized Battlebots', 'Space Station Alpha', 'Carnival Rides']
  },
  {
    id: 'camp-2',
    season: 'winter',
    track: 'Week 1 • 4 Half Days',
    spotsLeft: 'AM or PM Tracks',
    spotsNumber: 8,
    title: 'Winter LEGO® Camp | Half-Day Track',
    time: '09:30 AM – 12:00 PM or 12:30 PM – 03:30 PM',
    location: '215 Gothic Ct Suite 102, Franklin',
    price: '$179.00',
    priceNumber: 179,
    age: '5–12 yrs',
    imageUrl: '/images/client/camps-visual.png',
    description: 'Designed for younger campers or busy family holiday schedules. Enjoy a concentrated 2.5-hour morning or afternoon of motorized builds.',
    themes: ['Speed Racers', 'Mechanical Gears', 'Brick Mosaic Art']
  },
  {
    id: 'camp-3',
    season: 'winter',
    track: 'Week 2 • Dec 28–31',
    spotsLeft: '1-Day or 4-Day',
    spotsNumber: 7,
    title: 'Week 2 Winter LEGO® Camp | Dec 28–31',
    time: 'Single Full Day ($79) or 4 Full Days ($279) • 9:30 AM – 3:30 PM',
    location: '215 Gothic Ct Suite 102, Franklin',
    price: '$79–$279',
    priceNumber: 279,
    age: '5–12 yrs',
    imageUrl: '/images/client/camp-activities.jpg',
    description: 'Wrap up winter break with New Year robotics countdowns, motorized kinetic fireworks towers, and earthquake-proof skyscraper challenges.',
    themes: ['New Year Kinetic Towers', 'Motorized Coasters', 'Demolition Derby']
  },
  {
    id: 'camp-4',
    season: 'thanksgiving',
    track: 'Nov 23–25 • 3 Days',
    spotsLeft: '3 spots left',
    spotsNumber: 3,
    title: 'Thanksgiving Break Camp | 3-Day Full or Half',
    time: 'Full-Day $199 (1-Day $79) • Half-Day $129 (1-Day $49)',
    location: '215 Gothic Ct Suite 102, Franklin',
    price: '$49–$199',
    priceNumber: 199,
    age: '5–12 yrs',
    imageUrl: '/images/client/after-school-class.png',
    description: 'The ultimate 3-day holiday boredom buster! Kids build automated grain mills, motorized turkey pull toys, catapults, and suspension bridges.',
    themes: ['Harvest Machines', 'Catapult Physics', 'Bridge Destruction Testing']
  },
  {
    id: 'camp-5',
    season: 'summer',
    track: 'Summer 2026 Season',
    spotsLeft: 'Early-Bird Open',
    spotsNumber: 15,
    title: '2026 Summer Engineering LEGO® Camps',
    time: 'Weekly Monday–Friday • 9:30 AM – 3:30 PM (Franklin & Nashville)',
    location: 'Franklin Classical & 215 Gothic Ct',
    price: 'Early-Bird $295/wk',
    priceNumber: 295,
    age: '5–12 yrs',
    imageUrl: '/images/client/stem-program-kids.png',
    description: '10 weeks of unique summer themes: Galaxy Space Explorers, Battlebot Tournaments, Superheroes in Motion, Video Game Animation, and Amusement Park STEM.',
    themes: ['Space Colonization', 'Battlebots Extreme', 'Superheroes STEM', 'Amusement Park Physics', 'Jurassic Dinos']
  },
];

export const PARTY_PACKAGES: PartyPackage[] = [
  {
    id: 'pkg-premium',
    name: 'Premium Party',
    guests: 'Up to 10 guests',
    guestCount: 10,
    duration: '75 minutes',
    price: '$249.00',
    priceNumber: 249,
    description: 'Dedicated Bricks 4 Kidz certified party host, interactive motorized build, massive creative free play, and birthday child gift.',
    features: [
      'Certified, high-energy Bricks 4 Kidz host',
      'Interactive motorized LEGO® STEM project build',
      'Huge collection of free-play LEGO® bricks & ramp testing',
      'Official Bricks 4 Kidz T-Shirt for the birthday child',
      'Downloadable & printable custom LEGO® invitations'
    ],
    themes: ['Minecraft Block World', 'Star Wars Galaxy', 'Superheroes In Action', 'Ninjago Spinners', 'Crazy Derby Cars']
  },
  {
    id: 'pkg-supreme',
    name: 'Supreme Party',
    guests: 'Up to 12 guests',
    guestCount: 12,
    duration: '90 minutes',
    price: '$349.00',
    priceNumber: 349,
    isPopular: true,
    description: 'Everything in Premium plus 2 extra guests, 15 extra minutes, custom Mini-Figure favors for every guest, and ramp derby races.',
    features: [
      'Everything included in the Premium package',
      'Up to 12 guests included (vs 10 in Premium)',
      '15 additional party minutes (90 minutes total)',
      'Custom LEGO® Mini-Figure Factory: every guest builds & takes home a custom mini-figure!',
      'Exciting competitive brick derby & high-speed gravity car ramp tournament'
    ],
    themes: ['Battlebots Arena', 'Minecraft Block World', 'Star Wars Galaxy', 'Superheroes In Action', 'Ninjago Spinners']
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'The Wright Flyer Airplane',
    category: 'engineering',
    categoryLabel: 'Historical Engineering',
    ageGroup: '7–12 yrs',
    imageUrl: '/images/client/spike-prime-junior.png',
    description: 'Dual-propeller counter-rotating motorized airplane built by 3rd graders at Franklin Classical School.',
    motorized: true,
    tags: ['Aviation', 'Gears', 'History']
  },
  {
    id: 'gal-2',
    title: 'Crusher Battlebot Robot',
    category: 'robotics',
    categoryLabel: 'Robotics & Sensors',
    ageGroup: '8–12 yrs',
    imageUrl: '/images/client/junior-robotics-2.png',
    description: 'Programmed with ultrasonic proximity sensors to detect and ram opponent bots in our arena challenge.',
    motorized: true,
    tags: ['Robotics', 'Scratch Code', 'Motors']
  },
  {
    id: 'gal-3',
    title: 'Winter Wonderland Windmill',
    category: 'camps',
    categoryLabel: 'Winter Camp Build',
    ageGroup: '6–10 yrs',
    imageUrl: '/images/client/camps-visual.png',
    description: 'High-torque gear reduction driving four-bladed rotating sails with simulated snowy landscaping.',
    motorized: true,
    tags: ['Kinetic Energy', 'Winter Camp', 'Gears']
  },
  {
    id: 'gal-4',
    title: 'LEGO® Birthday Party Derby Track',
    category: 'parties',
    categoryLabel: 'Birthday Party',
    ageGroup: 'All Ages',
    imageUrl: '/images/client/birthday-party-package.png',
    description: 'Supreme party setup featuring 12 customized racer creations ready for the dual-lane gravity ramp showdown.',
    motorized: false,
    tags: ['Birthday', 'Derby Race', 'Mini-Figures']
  },
  {
    id: 'gal-5',
    title: 'Amusement Park Ferris Wheel',
    category: 'engineering',
    categoryLabel: 'Physics & Motion',
    ageGroup: '7–12 yrs',
    imageUrl: '/images/client/spike-prime-senior.png',
    description: 'Complete 360-degree rotating Ferris Wheel powered by a 9V motor and worm gear safety clutch.',
    motorized: true,
    tags: ['Amusement Park', 'Worm Gear', 'Physics']
  },
  {
    id: 'gal-6',
    title: 'Pre-School DUPLO Safari Bridge',
    category: 'duplo',
    categoryLabel: 'Pre-K Early STEM',
    ageGroup: '3–5 yrs',
    imageUrl: '/images/client/model-building-class.png',
    description: 'Early architectural bridging project designed to test block stability and color-pattern weight distribution.',
    motorized: false,
    tags: ['DUPLO', 'Colors', 'Fine Motor']
  }
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Andrea',
    role: 'Young Builder (Age 8)',
    quote: '"I built an airplane just like the Wright Brothers made. It actually had two propellers that spun in opposite directions!"',
    stars: 5,
    location: 'Franklin Classical School'
  },
  {
    id: 'rev-2',
    author: 'Marty',
    role: 'Junior Robotics Student (Age 10)',
    quote: '"I built a really cool motorized robot to battle with my brother. Learning how the gears give it more power was awesome."',
    stars: 5,
    location: 'Vine Christian Academy'
  },
  {
    id: 'rev-3',
    author: 'Mariana',
    role: 'Camp Alumni (Age 7)',
    quote: '"I like to make things from my imagination. At camp, we built rollercoasters and race cars that climbed up ramps!"',
    stars: 5,
    location: '215 Gothic Ct, Franklin'
  },
  {
    id: 'rev-4',
    author: 'Sandra',
    role: 'STEAM Builder (Age 9)',
    quote: '"I built a windmill just like the ones in Don Quixote! The teacher explained how wind turns into electricity."',
    stars: 5,
    location: 'Williamson County Schools'
  },
  {
    id: 'rev-5',
    author: 'Malik',
    role: 'Future Mechanical Engineer (Age 11)',
    quote: '"I want to design electric cars when I grow up! Bricks 4 Kidz helped me understand how differential gears make wheels turn corners."',
    stars: 5,
    location: 'Brentwood, TN'
  },
  {
    id: 'rev-6',
    author: 'Aarush',
    role: 'Robotics Summer Camper (Age 8)',
    quote: '"I really like to build all the different projects. Every day was a brand new challenge with motors and sensors."',
    stars: 5,
    location: 'Nashville / Franklin'
  },
  {
    id: 'rev-7',
    author: 'Rachel M.',
    role: 'Parent of 2 Campers',
    quote: '"Best camp experience in Williamson County. The kids were engaged every single day and begged to return for the winter session!"',
    stars: 5,
    location: 'Franklin, TN'
  }
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'general',
    question: 'What age groups do you serve in Franklin?',
    answer: 'We provide specialized STEAM curriculum for ages 3 to 13+. We have DUPLO® early-learning programs for ages 3–5, LEGO® Technic and Robotics for elementary ages 5–12, and advanced coding & community workshops for older kids.'
  },
  {
    id: 'faq-2',
    category: 'camps',
    question: 'Where are your Franklin camps hosted?',
    answer: 'Our camps are hosted at our dedicated Franklin facility: 215 Gothic Court Suite 102, Franklin, TN 37067 (inside Dance Mania Nashville) as well as partnered school campuses throughout Williamson County.'
  },
  {
    id: 'faq-3',
    category: 'camps',
    question: 'What should my child bring to full-day camps?',
    answer: 'Please pack a nut-free lunch, two nut-free snacks, and a reusable water bottle. All building sets, motors, batteries, and instructional materials are provided by Bricks 4 Kidz.'
  },
  {
    id: 'faq-4',
    category: 'parties',
    question: 'Can you host birthday parties at our house?',
    answer: 'Yes! Our certified party host travels to your home anywhere across Franklin, Brentwood, Nashville, and surrounding Williamson County. We bring all bricks, motorized models, derby ramps, and handle clean-up. You can also host at our Franklin venue for a +$120 facility fee.'
  },
  {
    id: 'faq-5',
    category: 'schools',
    question: 'How do schools or PTOs partner with Bricks 4 Kidz?',
    answer: 'We provide turnkey after-school enrichment proposals, STEM assemblies, and in-school field trips with zero administrative burden on school staff. We handle online registrations, background checks, and all equipment.'
  }
];

export const LEADS: LeadItem[] = [
  {
    id: 'lead-1',
    name: 'Sarah M.',
    channel: 'Instagram DM',
    inquiry: 'Supreme Party ($349) Dec 12',
    status: 'Stripe Sent',
    statusVariant: 'success',
    details: 'AI answered venue pricing (+$120 B4K Venue) and sent a one-tap Stripe deposit link.',
    amount: '$469.00 Est.',
    nudged: false
  },
  {
    id: 'lead-2',
    name: 'David K.',
    channel: 'Website Chat',
    inquiry: 'Winter Camp Dec 21–24 (Age 7)',
    status: 'Paid',
    statusVariant: 'info',
    details: 'Converted automatically from schedule Q&A to 4-Day Full-Day Camp enrollment.',
    amount: '+$279.00 Paid',
    nudged: true
  },
  {
    id: 'lead-3',
    name: 'Jennifer B.',
    channel: 'Facebook Messenger',
    inquiry: 'Franklin Classical School Robotics',
    status: 'Booked',
    statusVariant: 'success',
    details: 'Enrolled child for Nov-Dec robotics 6-session series via quick checkout link.',
    amount: '+$150.00 Paid',
    nudged: true
  },
  {
    id: 'lead-4',
    name: 'Oak View PTO President',
    channel: 'Partnership Form',
    inquiry: 'Spring 2027 After-School Proposal',
    status: 'Proposal Pending',
    statusVariant: 'warning',
    details: 'Requested 8-week STEM enrichment program proposal for 35 kindergarten-4th graders.',
    amount: '$3,800.00 Est.',
    nudged: false
  }
];
