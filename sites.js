// Edit this file to change what the dashboard shows.
//
// Each site needs a name and a url.
// Optional fields:
//   description: one short line under the name
//   icon:  card, plane, calendar, heart, home, chart, link, lock
//   color: teal, blue, amber, violet, rose, slate (defaults to the icon's color)

window.DASHBOARD = {
  title: "Launchpad",
  subtitle: "Quick links to my sites and tools.",
  newTab: true, // open sites in a new tab

  sites: [
    {
      name: "Card Picker",
      description: "Find the best credit card for how you spend, plus our referral links.",
      url: "https://jonchao.github.io/card-recommender/",
      icon: "card",
    },
    {
      name: "Travel Tracker",
      description: "See and add travel plans for the wedding.",
      url: "https://jonchao.github.io/travel-tracker/",
      icon: "plane",
    },
    {
      name: "POI Planner",
      description: "Add trips from Wanderlog and vote on where to go next.",
      url: "https://jonchao.github.io/trip-ranker/",
      icon: "chart",
      color: "violet",
    },
  ],
};
