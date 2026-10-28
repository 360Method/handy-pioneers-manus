/**
 * COPIED FROM HP-Estimator-app by scripts/sync-360-method.mjs. Do not edit
 * here; change the source in the pro app and run the sync again.
 */
import type { RoadmapData } from "../components/method/ThreeSixtyRoadmap";

export const METHOD_CANON: RoadmapData = {
  "title": "The 360 Method: A Roadmap to Home Ownership Mastery",
  "subtitle": "A clear, 9-step way to care for your home, from knowing it to building on it.",
  "footnote": "Education for homeowners, not financial advice.",
  "image": "/brand/360-method/360-roadmap.png?v=96402c83",
  "imageAlt": "The 360 Method roadmap: three phases, Aware, Act and Advance, and nine steps from Baseline to Scale.",
  "phases": [
    {
      "id": "aware",
      "name": "Aware",
      "label": "PHASE 1: AWARE",
      "subtitle": "Know Before You Need",
      "tone": {
        "accent": "#033D26",
        "onAccent": "#FBF4EA",
        "wash": "#EEF3EE"
      },
      "steps": [
        {
          "number": 1,
          "key": "baseline",
          "name": "Baseline",
          "icon": "ClipboardList",
          "line": "Document every major system, including HVAC age and roof condition, to create your home's medical record."
        },
        {
          "number": 2,
          "key": "inspect",
          "name": "Inspect",
          "icon": "Search",
          "line": "Conduct seasonal walkthroughs to catch small issues like cracked caulk or loose trim before they become emergencies."
        },
        {
          "number": 3,
          "key": "track",
          "name": "Track",
          "icon": "BarChart3",
          "line": "Maintain a living log of every repair, contractor, and dollar spent to reveal spending patterns."
        }
      ]
    },
    {
      "id": "act",
      "name": "Act",
      "label": "PHASE 2: ACT",
      "subtitle": "Fix Small Before It's Big",
      "tone": {
        "accent": "#C8922A",
        "onAccent": "#1A2E1A",
        "wash": "#FBF3E2"
      },
      "steps": [
        {
          "number": 4,
          "key": "prioritize",
          "name": "Prioritize",
          "icon": "ListChecks",
          "line": "Use a three-tier system, NOW (safety), SOON (ROI), and WAIT (comfort), to stop wasting money on cosmetics."
        },
        {
          "number": 5,
          "key": "schedule",
          "name": "Schedule",
          "icon": "CalendarCheck",
          "line": "Build a complete maintenance calendar with monthly, quarterly, and annual tasks so nothing falls through the cracks."
        },
        {
          "number": 6,
          "key": "execute",
          "name": "Execute",
          "icon": "Wrench",
          "line": "Apply a DIY vs. Hire decision framework to gain the confidence to complete repairs efficiently."
        }
      ]
    },
    {
      "id": "advance",
      "name": "Advance",
      "label": "PHASE 3: ADVANCE",
      "subtitle": "Build Wealth Through Property Care",
      "tone": {
        "accent": "#6D543A",
        "onAccent": "#FBF4EA",
        "wash": "#F3EEE8"
      },
      "steps": [
        {
          "number": 7,
          "key": "preserve",
          "name": "Preserve",
          "icon": "ShieldCheck",
          "line": "Implement system preservation routines to extend the lifespan of major appliances, like water heaters and HVACs."
        },
        {
          "number": 8,
          "key": "upgrade",
          "name": "Upgrade",
          "icon": "TrendingUp",
          "line": "Use the Good-Better-Best framework to ensure every improvement dollar increases property value or prevents failure."
        },
        {
          "number": 9,
          "key": "scale",
          "name": "Scale",
          "icon": "Landmark",
          "line": "Apply CFO intelligence to understand equity and evaluate refinance, mortgage, or investment decisions."
        }
      ]
    }
  ]
};
