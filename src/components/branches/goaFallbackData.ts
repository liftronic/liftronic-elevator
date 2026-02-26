import type {
  LegacySection,
  WhyChooseReason,
  StiltzExperience,
  BookingSection,
  SpecializedEngineeringSection,
  BranchConsultant,
} from "~/sanity/lib/branchTypes";

export const GOA_HERO_TITLE =
  "Crafting the future of Vertical Living – Local Expertise meets Elevated Design";

export const GOA_TAGLINE =
  "\u201CPreserving the soul of historic Goa while elevating its modern aspirations.\u201D";

export const GOA_LEGACY_SECTION: LegacySection = {
  title: "Our Legacy in Motion",
  body: "At Liftronic Homelifts Pvt. Ltd., we believe that vertical transportation should be an extension of a home\u2019s soul, not just a utility. With our Office strategically positioned to serve the community, at Liftronic Homelifts, our Goa team combines deep technical mastery with an intimate understanding of local coastal architecture, ensuring personalized care and local support. Whether we are enhancing the privacy of a luxury villa or powering the efficiency of a premier high\u2013rise, we are already in your neighborhood, ready to elevate your perspective.",
};

export const GOA_WHY_CHOOSE_REASONS: WhyChooseReason[] = [
  {
    title: "Architectural Harmony",
    description:
      "Solutions designed to respect heritage aesthetics while providing modern reliability.",
  },
  {
    title: "Bespoke Engineering",
    description:
      "Tailored installations for the most discerning private residences.",
  },
  {
    title: "Proximity & Peace of Mind",
    description:
      "A dedicated local team that understands the unique coastal requirements of our Goa region.",
  },
];

export const GOA_STILTZ_EXPERIENCE: StiltzExperience = {
  intro:
    "We invite you to witness the seamless British engineering and bespoke design. Do not just take our word for it \u2013 feel the whisper\u2013quiet transition and effortless movement of our incredible product in person.",
  experiences: [
    {
      title: "Live Demonstration",
      description:
        "See our compact, pitless, and heritage sensitive model in action.",
    },
    {
      title: "Design Consultation",
      description:
        "Meet our local experts to discuss finishes, cabin materials and structural integration.",
    },
    {
      title: "Technical Walkthrough",
      description:
        "Understand our plug and play lift and safety innovations first hand.",
    },
  ],
};

export const GOA_BOOKING_SECTION: BookingSection = {
  description:
    "To ensure an exclusive and personalized experience, we operate by private appointment.",
  conciergePhone: "+91 7387890280",
  visitAddress:
    "Shop no.6, Buildmore Woods, Wing B\nKhorlim, Mapusa, Bardez Goa \u2013 403507",
  gpsLink: undefined,
};

export const GOA_SPECIALIZED_ENGINEERING: SpecializedEngineeringSection[] = [
  {
    title: "Inclined Elevators: Mastering the Terrain",
    subtitle:
      "The perfect solution for Goa\u2019s hillside and coastal cliffs.",
    description:
      "Our bespoke inclined lifts offer seamless access to tiered gardens or waterfront projects without compromising the natural landscape.",
    features: [
      {
        title: "Aesthetic Integration",
        description:
          "Designed to blend into tropical greenery or stone terracing.",
      },
      {
        title: "All\u2013Weather Durability",
        description:
          "Built with marine\u2013grade materials to withstand the coastal elements too.",
      },
    ],
  },
  {
    title: "ATEX\u2013Certified Vertical Solutions: Safety without Compromise",
    subtitle:
      "Precision engineering for high\u2013risk and industrial environments.",
    description:
      "For specialized projects requiring the highest level of spark-resistant and containment, we provide certified explosion-proof (Ex) elevator systems.",
    features: [
      {
        title: "Certified Protection",
        description:
          "Engineered to meet rigorous safety standards for hazardous zones.",
      },
      {
        title: "Robust Reliability",
        description:
          "Combining heavy-duty performance with the signature Liftronics commitment to Quality.",
      },
    ],
  },
];

export const GOA_CONSULTANT: BranchConsultant = {
  name: "Mr. Suraj Prabhudesai",
  position: "General Manager",
  phone: "+91 7798400331",
  email: "suraj@liftronicelevtaor.com",
};

export const GOA_QUOTE_EMAIL = "info@liftronicelevator.com";

export const GOA_CLOSING_QUOTE =
  "\u201CA Liftronic\u2019s experience is more than a demonstration; it is the first step towards transforming your residences.\u201D";
