"use client";
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_UPDONE;
export const TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMGM1YjI0OGY2ZWY5MjE1MDFkN2U5MTFjZGM2NWI3ZDI3YzAzNWJhYWJiZGJhMWMyZGZlNDdkYTJmZTFhY2U5NzRlY2U2MzRiNjQ1M2YyM2UiLCJpYXQiOjE3MjExMTc3NjIuMjQxMDU1LCJuYmYiOjE3MjExMTc3NjIuMjQxMDU3LCJleHAiOjE3NTI2NTM3NjIuMjM3NTAzLCJzdWIiOiI0Iiwic2NvcGVzIjpbXX0.a99qfwUDTsuN5UJdguXFYtdG5n89qDFbUg24hxGrGTBdZtw5uR7pSQvWQE9Vj2T4FoxYRJwJR6cTaMgQz59mp_uw4XKbT52k3grjtrrtPmKQxfjLs1fuDMm0twCODcRG4lrtRkAEq7JTnZnp4p_xUKakAY1youO4ZLWKko5z1eKw9Z_9zprOHz3myD71Xi0wHcf7gECJ1kMVUTJq08L3wx-BgLmywehbuLef9NPSN7tEUAqvOzOeXX3d2yc8gh1RoenBcX4ZFng0G4ynH-tR46Jz4btOPL7GKsJ_O3aKdOuUoDZBQQg6y0KXk_QjNJpTboMqqvWrUp-Z3heqSilYy6mEsWjBmzzrTUmDYdXL4Z6lTaY7KMLUj57jXU66CAcZc2Hz9EtOi0Pt-Hs71T_K9el-MmGIS-OQKSBvX_DZfMH-Pz0ofBURWKV8Nwk7IQioOgmS2I6cusxORPJNoOEOyr3IAcWcc7mWZXpxFQUeVSrT-mVVMbubuiE7ibZdHiPa7uDH9hy65jzJmXiHq_VJ4A-ZV9vQhfPhelV0S5-LKiO00Cs77g1dwpKn8UaoJMdVNG_uTtgMJrlOAVgJPoEAVVDNfM0ow82DczCDCsI9RTYQ9X8q_XF4W_ngjFBhCOMdyUreyHOvFrqx5V1OBfCTwZASu_9stvpiBR9jNahMxQ8";
export const HERO_FILTER_STAFF: { [key: string]: string } = {
  gap: "0px",
  borderRadius: "8px",
  borderWidth: "0.6px 0 0 0",
  position: "relative",
  top: "0px",
  maxWidth: "797px",
  margin: "auto",
  justifyContent: "space-evenly",
  border: "none",
  padding: "0px 0px 0px 0px",
  left: "12px",
};
export const CHOOSE_SERVICES = [
  { id: 1, text: "Cocktail Server" },
  { id: 2, text: "Promo Model" },
  { id: 3, text: "Waiter" },
  { id: 4, text: "Bartender" },
];

export const LOCATION = [{ value: "0", label: "Location" }];
export const SERVICE = [{ value: "0", label: "Selected Service" }];
export const PAGINATION_LIMIT = [
  { value: "12", label: "12" },
  { value: "24", label: "24" },
  { value: "36", label: "36" },
];
export const TIMES_CONST = [
  { value: "0", label: "Event Date" },
  { value: "Waiters", label: "Waiters" },
  { value: "Cocktail Servers", label: "Cocktail Servers" },
  { value: "Barbacks", label: "Barbacks" },
  { value: "Promo Models", label: "Promo Models" },
  { value: "Event Helper", label: "Event Helper" },
];
export const TIMES_DATA: string[] = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
];
//footer component constants
export const ABOUT_ITEMS = [
  {
    text: "How it works",
    href: "https://www.creative-tim.com/presentation?ref=njs-profile",
  },
  { text: "Featured", href: "https://blog.creative-tim.com?ref=njs-profile" },
  {
    text: "Partnership",
    href: "https://www.github.com/creativetimofficial?ref=njs-profile",
  },
  {
    text: "Refund Policy",
    href: "https://www.creative-tim.com/bootstrap-themes/free?ref=njs-profile",
  },
];

export const LISTING_ITEMS = [
  {
    text: "Worker list",
    href: "https://github.com/creativetimofficial/notus-js/blob/main/LICENSE.md?ref=njs-profile",
  },
  { text: "Payment", href: "https://creative-tim.com/terms?ref=njs-profile" },
  { text: "Blogs", href: "https://creative-tim.com/terms?ref=njs-profile" },
];

export const SOCIAL_ITEMS = [
  {
    text: "Discord",
    href: "https://github.com/creativetimofficial/notus-js/blob/main/LICENSE.md?ref=njs-profile",
  },
  { text: "Instagram", href: "https://creative-tim.com/terms?ref=njs-profile" },
  { text: "Twitter", href: "https://creative-tim.com/privacy?ref=njs-profile" },
  {
    text: "Facebook",
    href: "https://creative-tim.com/contact-us?ref=njs-profile",
  },
];
//Header links data
// Define your navigation links
export const NAV_LINKS = [
  { href: "/staff", label: "Workers" },
  { href: "/faqs", label: "Contact" },
  { href: "/community", label: "About Us" },
  { href: "/contact-us", label: "Blogs" },
  // Add more links as needed
];
//staff details constanst

export const STAFF_IAMHES = [
  {
    src: "/images/staff-listing/d1.jpg",
    alt: "Staff 1",
    class: "object-cover rounded-[4px] relative top-[18px]",
  },
  {
    src: "/images/staff-listing/d2.jpg",
    alt: "Staff 2",
    class: "object-cover rounded-[4px] relative top-[18px]",
  },
  {
    src: "/images/staff-listing/d3.jpg",
    alt: "Staff 3",
    class: "object-cover rounded-[4px]",
  },
  {
    src: "/images/staff-listing/d4.jpg",
    alt: "Staff 4",
    class: "object-cover rounded-[4px]",
  },
];

//home page services section constanst
export const services = [
  {
    id: 1,
    name: "Bartender",
    description:
      "Certified professionals crafting delicious drinks and keeping the party flowing.",
    serviceSrc: "/images/services/bartander.svg",
    imgSrc: "/images/services/image 26.webp",
    alt: "Bartender",
  },
  {
    id: 2,
    name: "Waiter",
    description:
      "The attentive wait talent delivers food efficiently and adds a touch of elegance.",
    serviceSrc: "/images/services/waiter.svg",
    imgSrc: "/images/services/image 32.webp",
    alt: "Waiter",
  },
  {
    id: 3,
    name: "Cocktail server",
    description:
      "Skilled servers present your signature drinks flawlessly for a perfect experience.",
    serviceSrc: "/images/services/cocktail.svg",
    imgSrc: "/images/services/image 82.webp",
    alt: "Cocktail",
  },
  {
    id: 4,
    name: "Promo Model",
    description:
      "Engaging models bring your brand to life and captivate your audience.",
    serviceSrc: "/images/services/model.svg",
    imgSrc: "/images/services/image 86.webp",
    alt: "Barbacks",
  },
  {
    id: 5,
    name: "Event Helper",
    description:
      "Multi-skilled helpers tackle setup, breakdown, and guest assistance.",
    serviceSrc: "/images/services/helper.svg",
    imgSrc: "/images/services/new file.webp",
    alt: "Promo Model",
  },
  {
    id: 6,
    name: "Barback",
    description:
      "Experienced crew ensuring bartenders have everything they need.",
    serviceSrc: "/images/services/barback.svg",
    imgSrc: "/images/services/image 85.webp",
    alt: "Event Helper",
  },
];
//components/booking/form-titles

export const STEPS_DATA = [
  {
    imageSrc: "/images/booking/editPancel.svg",
    imageAlt: "step-1",
    description:
      "Tell us about your event. We use these details to find talents in your area who fit your needs.",
  },
  {
    imageSrc: "/images/booking/find-workder-title.svg",
    imageAlt: "step-2",
    description:
      "Filter and sort to find your talents. Then view their availability to request your date and time.",
  },
  {
    imageSrc: "/images/booking/payment-done.svg",
    imageAlt: "step-3",
    description: `You're almost done! We just need a few more details to connect you with your Tasker.`,
  },
];

//step-one constants booking process
export const CITY_OPTIONS = [
  { id: 1, value: "los angeles", label: "Los Angeles" },
];
export const locationOptions = [
  { value: "", label: "Choose Event Location *", disabled: true },
  { value: "agoura_hills", label: "Agoura Hills" },
  { value: "alhambra", label: "Alhambra" },
  { value: "arcadia", label: "Arcadia" },
  { value: "artesia", label: "Artesia" },
  { value: "avalon", label: "Avalon" },
  { value: "azusa", label: "Azusa" },
  { value: "baldwin_park", label: "Baldwin Park" },
  { value: "bell", label: "Bell" },
  { value: "bell_gardens", label: "Bell Gardens" },
  { value: "bellflower", label: "Bellflower" },
  { value: "beverly_hills", label: "Beverly Hills" },
  { value: "bradbury", label: "Bradbury" },
  { value: "burbank", label: "Burbank" },
  { value: "calabasas", label: "Calabasas" },
  { value: "carson", label: "Carson" },
  { value: "cerritos", label: "Cerritos" },
  { value: "claremont", label: "Claremont" },
  { value: "commerce", label: "Commerce" },
  { value: "compton", label: "Compton" },
  { value: "covina", label: "Covina" },
  { value: "cudahy", label: "Cudahy" },
  { value: "culver_city", label: "Culver City" },
  { value: "diamond_bar", label: "Diamond Bar" },
  { value: "downey", label: "Downey" },
  { value: "duarte", label: "Duarte" },
  { value: "el_monte", label: "El Monte" },
  { value: "el_segundo", label: "El Segundo" },
  { value: "gardena", label: "Gardena" },
  { value: "glendale", label: "Glendale" },
  { value: "glendora", label: "Glendora" },
  { value: "hawaiian_gardens", label: "Hawaiian Gardens" },
  { value: "hawthorne", label: "Hawthorne" },
  { value: "hermosa_beach", label: "Hermosa Beach" },
  { value: "hidden_hills", label: "Hidden Hills" },
  { value: "huntington_park", label: "Huntington Park" },
  { value: "industry", label: "Industry" },
  { value: "inglewood", label: "Inglewood" },
  { value: "irwindale", label: "Irwindale" },
  { value: "la_canada_flintridge", label: "La Cañada Flintridge" },
  { value: "la_habra_heights", label: "La Habra Heights" },
  { value: "la_mirada", label: "La Mirada" },
  { value: "la_puente", label: "La Puente" },
  { value: "la_verne", label: "La Verne" },
  { value: "lakewood", label: "Lakewood" },
  { value: "lancaster", label: "Lancaster" },
  { value: "lawndale", label: "Lawndale" },
  { value: "lomita", label: "Lomita" },
  { value: "long_beach", label: "Long Beach" },
  { value: "lynwood", label: "Lynwood" },
  { value: "malibu", label: "Malibu" },
  { value: "manhattan_beach", label: "Manhattan Beach" },
  { value: "maywood", label: "Maywood" },
  { value: "monrovia", label: "Monrovia" },
  { value: "montebello", label: "Montebello" },
  { value: "monterey_park", label: "Monterey Park" },
  { value: "norwalk", label: "Norwalk" },
  { value: "palmdale", label: "Palmdale" },
  { value: "palos_verdes_estates", label: "Palos Verdes Estates" },
  { value: "paramount", label: "Paramount" },
  { value: "pasadena", label: "Pasadena" },
  { value: "pico_rivera", label: "Pico Rivera" },
  { value: "pomona", label: "Pomona" },
  { value: "rancho_palos_verdes", label: "Rancho Palos Verdes" },
  { value: "redondo_beach", label: "Redondo Beach" },
  { value: "rolling_hills", label: "Rolling Hills" },
  { value: "rolling_hills_estates", label: "Rolling Hills Estates" },
  { value: "rosemead", label: "Rosemead" },
  { value: "san_dimas", label: "San Dimas" },
  { value: "san_fernando", label: "San Fernando" },
  { value: "san_gabriel", label: "San Gabriel" },
  { value: "san_marino", label: "San Marino" },
  { value: "santa_clarita", label: "Santa Clarita" },
  { value: "santa_fe_springs", label: "Santa Fe Springs" },
  { value: "santa_monica", label: "Santa Monica" },
  { value: "sierra_madre", label: "Sierra Madre" },
  { value: "signal_hill", label: "Signal Hill" },
  { value: "south_el_monte", label: "South El Monte" },
  { value: "south_gate", label: "South Gate" },
  { value: "south_pasadena", label: "South Pasadena" },
  { value: "temple_city", label: "Temple City" },
  { value: "torrance", label: "Torrance" },
  { value: "vernon", label: "Vernon" },
  { value: "walnut", label: "Walnut" },
  { value: "west_covina", label: "West Covina" },
  { value: "west_hollywood", label: "West Hollywood" },
  { value: "westlake_village", label: "Westlake Village" },
  { value: "whittier", label: "Whittier" },
];
//HOW-WORK updone component constants
export const CARDS_DATA_CONSTANT = [
  {
    id: 1,
    dec: `Select the skills needed, event zip, event date, and a brief description.`,
    text: `1. Post a Job for your Event`,
    image: "/Frame 1410126545.webp",
  },
  {
    id: 2,
    dec: `Once posted, review talent profiles and invite the best candidates to talent your event. Talent will be notified in real time for fast response.`,
    text: "2.  Invite the Best Talent",
    image: "/Frame 1410126546.webp",
  },
  {
    id: 3,
    dec: `Review offers from talents at a glance. Compare profiles, ratings, and experience to make an informed decision.`,
    text: "3.  Receive and Review Offers",
    image: "/Frame 1410126849.webp",
  },
  {
    id: 4,
    dec: `Once you select your choice, you will be able to communicate with your talent to finalize any details.`,
    text: "4.  Select Your Talent and Your Are Done!",
    image: "/Frame 1410126496.webp",
  },
];
//security components constants
export const FIRST_SECTION_ITEMS = [
  {
    src: "/images/security/qualified.svg",
    alt: "qualified",
    title: "Pre-vetted, Qualified Talent",
    description:
      "Updone ensures consistent quality by thoroughly vetting all talent for skills, experience, and professionalism.",
  },
  {
    src: "/images/security/flexible.svg",
    alt: "flexible",
    title: "Flexibility and Scalability",
    description:
      "Updone caters to a variety of staffing needs, from last-minute replacements to long-term engagements.",
  },
];

export const SECOND_SECTION_ITEMS = [
  {
    src: "/images/security/streamlined.svg",
    alt: "streamlined",
    title: "Streamlined Booking Process",
    description:
      "The user-friendly online platform allows clients to browse available talent, filter by specific needs, and confirm bookings within minutes.",
  },
  {
    src: "/images/security/sransparent.svg",
    alt: "transparent",
    title: "Transparent Pricing Structure",
    description:
      "Competitive rates and transparent pricing structure ensure clients get the best value for their staffing needs.",
  },
];

export const TRUST_SIGNALS =[
  {
    src: "/images/security/qualified.svg",
    alt: "qualified",
    title: "Pre-vetted, Qualified Talent",
    
  },
  {
    src: "/images/security/sransparent.svg",
    alt: "transparent",
    title: "Transparent Pricing Structure",
    
  },
];
export const GALLERY_CONTENT_COUNT = [1, 2, 3, 4]; // You can replace this with actual data if needed

export const STANDARD_TIMES_SLOTS = [
  "12:00 AM",
  "1:00 AM",
  "2:00 AM",
  "3:00 AM",
  "4:00 AM",
  "5:00 AM",
  "6:00 AM",
  "7:00 AM",
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
  "9:00 PM",
  "10:00 PM",
  "11:00 PM",
];
