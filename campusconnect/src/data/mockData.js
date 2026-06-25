// Seed data to initialize localStorage databases

export const seedUsers = [
  {
    id: "u1",
    firstName: "Jane",
    lastName: "Doe",
    email: "janedoe@mtu.edu.ng",
    password: "password123",
    role: "Student",
    accountType: "Student",
    isVerifiedStudent: true,
    hasStore: false,
    storeId: null,
    createdAt: new Date().toISOString()
  },
  {
    id: "u2",
    firstName: "Sam",
    lastName: "Sales",
    email: "samsales@campus.com",
    password: "password123",
    role: "Entrepreneur",
    accountType: "Entrepreneur",
    isVerifiedStudent: false,
    hasStore: true,
    storeId: "s1",
    createdAt: new Date().toISOString()
  },
  {
    id: "u3",
    firstName: "Alex",
    lastName: "Active",
    email: "alexactive@mtu.edu.ng",
    password: "password123",
    role: "Student",
    accountType: "Student",
    isVerifiedStudent: true,
    hasStore: true,
    storeId: "s2",
    createdAt: new Date().toISOString()
  },
  {
    id: "u4",
    firstName: "Professor",
    lastName: "Dele",
    email: "profDele@mtu.edu.ng",
    password: "password123",
    role: "Staff",
    accountType: "Staff",
    isVerifiedStudent: false,
    hasStore: false,
    storeId: null,
    createdAt: new Date().toISOString()
  },
  {
    id: "u5",
    firstName: "MTU CS",
    lastName: "Association",
    email: "cscassociation@mtu.edu.ng",
    password: "password123",
    role: "Organization",
    accountType: "Organization",
    isVerifiedStudent: false,
    hasStore: false,
    storeId: null,
    createdAt: new Date().toISOString()
  },
  {
    id: "u6",
    firstName: "Admin",
    lastName: "Manual",
    email: "admin@mtu.edu.ng",
    password: "admin123",
    role: "Admin",
    accountType: "Admin",
    isVerifiedStudent: false,
    hasStore: false,
    storeId: null,
    createdAt: new Date().toISOString()
  }
];

export const seedStores = [
  {
    id: "s1",
    ownerId: "u2",
    storeName: "MTU Gear Store",
    description: "The official supplier of custom hoodies, varsity jackets, and campus accessories for students.",
    logo: "/images/stores/mtu Gear store.jpg",
    banner: "/images/stores/mtu Gear store.jpg",
    category: "Apparel",
    contactDetails: { email: "samsales@campus.com", phone: "+2348012345678" },
    socialLinks: { instagram: "mtu_gear", twitter: "mtu_gear", website: "mtugear.shop" },
    followers: ["u1"],
    createdAt: new Date().toISOString()
  },
  {
    id: "s2",
    ownerId: "u3",
    storeName: "Dorm Delights & Bites",
    description: "Providing quick snacks, home-made cookies, and fresh waffles right to your dorm room.",
    logo: "/images/stores/Dorm delights & bites.jpg",
    banner: "/images/stores/Dorm delights & bites.jpg",
    category: "Food & Snacks",
    contactDetails: { email: "alexactive@mtu.edu.ng", phone: "+2348098765432" },
    socialLinks: { instagram: "dorm_bites", twitter: "dorm_bites", website: "dormbites.com" },
    followers: ["u1", "u2"],
    createdAt: new Date().toISOString()
  },
  {
    id: "s3",
    ownerId: "u2",
    storeName: "ByteCode Tech",
    description: "Premium tech accessories, laptop stands, chargers, and headphones for engineering students.",
    logo: "/images/stores/bytecode tech.jpg",
    banner: "/images/stores/bytecode tech.jpg",
    category: "Electronics",
    contactDetails: { email: "tech@bytecode.com", phone: "+2348088888888" },
    socialLinks: { instagram: "bytecode_tech", twitter: "bytecode_tech", website: "bytecode.com" },
    followers: [],
    createdAt: new Date().toISOString()
  }
];

export const seedProducts = [
  {
    id: "p1",
    storeId: "s1",
    ownerId: "u2",
    name: "Campus Hoodie - Black",
    price: 12000,
    oldPrice: 25000,
    category: "Apparel",
    imageUrl: "/images/products/Hoodie.jpg",
    description: "Show your university pride with this ultra-comfortable, durable hoodie. Made with 100% organic cotton, featuring a classic fit and cozy fleece lining.",
    createdAt: new Date().toISOString()
  },
  {
    id: "p2",
    storeId: "s1",
    ownerId: "u2",
    name: "Vintage Varsity Jacket",
    price: 22000,
    category: "Apparel",
    imageUrl: "/images/products/varsity jacket.jpg",
    description: "Retro MTU varsity jacket with high-quality embroidery and premium leather sleeves. Perfect for fall campus walks.",
    createdAt: new Date().toISOString()
  },
  {
    id: "p3",
    storeId: "s2",
    ownerId: "u3",
    name: "Fresh Dorm Cookies (Dozen)",
    price: 3600,
    oldPrice: 4800,
    category: "Food & Snacks",
    imageUrl: "/images/products/cookies.jpg",
    description: "Baked daily and delivered warm. Assortment of chocolate chip, oatmeal raisin, and double chocolate.",
    createdAt: new Date().toISOString()
  },
  {
    id: "p4",
    storeId: "s2",
    ownerId: "u3",
    name: "Home-made Waffles (Pack of 4)",
    price: 4200,
    category: "Food & Snacks",
    imageUrl: "/images/products/waffles.jpg",
    description: "Fluffy Belgian waffles ready to pop in your toaster. Includes maple syrup and butter packages.",
    createdAt: new Date().toISOString()
  },
  {
    id: "p5",
    storeId: "s3",
    ownerId: "u2",
    name: "Wireless ANC Headphones",
    price: 36000,
    oldPrice: 44000,
    category: "Electronics",
    imageUrl: "/images/products/anc haeadphones.jpg",
    description: "Active noise-canceling headphones with 40-hour battery life. Block out dorm distractions and focus on your studies.",
    createdAt: new Date().toISOString()
  },
  {
    id: "p6",
    storeId: "s3",
    ownerId: "u2",
    name: "USB-C Multi-port Hub",
    price: 10000,
    category: "Electronics",
    imageUrl: "/images/products/usb c multiport hub.jpg",
    description: "7-in-1 USB-C hub with HDMI, 3 USB-A ports, SD card slots, and Power Delivery passthrough.",
    createdAt: new Date().toISOString()
  }
];

export const seedJobs = [
  {
    id: 1,
    title: "Campus Ambassador",
    company: "TechNova",
    location: "On-Campus",
    type: "Part-Time",
    salary: "₦25,000/month",
    description: "Represent TechNova on campus. Coordinate promotional campaigns, run small tech booths in the student hub, and gather student feedback.",
    postedBy: "u4",
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: "Software Engineering Intern",
    company: "Google",
    location: "Remote",
    type: "Internship",
    salary: "Paid – Competitive",
    description: "Work on production-grade systems alongside senior developers. Strong programming basics (JS, Python, or Go) required.",
    postedBy: "u6",
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    title: "Library Assistant",
    company: "MTU Main Library",
    location: "Main Library",
    type: "Work-Study",
    salary: "₦20,000/month",
    description: "Assist students in looking up literature, sorting books, and managing computer reservations at the reception desks.",
    postedBy: "u4",
    createdAt: new Date().toISOString()
  },
  {
    id: 4,
    title: "Marketing Coordinator",
    company: "Local Agency",
    location: "City Center",
    type: "Full-Time",
    salary: "₦800,000/year",
    description: "Plan and coordinate local business advertisements, design newsletters, and manage client relations.",
    postedBy: "u2",
    createdAt: new Date().toISOString()
  }
];

export const seedEvents = [
  {
    id: 1,
    title: "Spring Career Fair",
    date: "Apr 20, 2026",
    time: "10:00 AM - 4:00 PM",
    location: "Main Student Union",
    img: "/images/events/spring career fair.jpg",
    description: "Meet representatives from over 50 leading companies. Bring your resume and dress to impress! Networking booths available.",
    organizedBy: "u4"
  },
  {
    id: 2,
    title: "MTU Hackathon 2026",
    date: "May 15, 2026",
    time: "8:00 AM onwards",
    location: "Engineering Building",
    img: "/images/events/Hackathon.png",
    description: "A 48-hour challenge to design solutions for local community issues. Free food, stickers, and up to ₦800,000 in cash prizes!",
    organizedBy: "u5"
  },
  {
    id: 3,
    title: "AI in Healthcare Guest Lecture",
    date: "Apr 25, 2026",
    time: "2:00 PM",
    location: "Lecture Hall 3",
    img: "/images/events/Lecture.jpg",
    description: "Dr. Dele hosts a talk on how machine learning technologies are revolutionizing modern pathology and clinical diagnostic workflows.",
    organizedBy: "u4"
  }
];
