/**
 * Birthday Configuration & Content for Afraa
 * Birthday Date: 15 November 2026 (Asia/Dhaka timezone)
 *
 * Friendly, cheerful, vibrant, and celebratory.
 * A thoughtful birthday gift from Adyan to Afraa.
 */

export const birthdayData = {
  recipient: {
    fullName: "Afraa",
    nickname: "Afraa",
    birthDate: "2026-11-15T00:00:00+06:00", // Asia/Dhaka (+06:00)
    timezone: "Asia/Dhaka",
    displayDate: "15 November 2026",
  },

  openingScreen: {
    badge: "A LITTLE BIRTHDAY SURPRISE",
    title: "Afraa",
    subtitle: "Ready for a little celebration?",
    buttonText: "Open Your Surprise 💌",
    audioHint: "Click to open with a sweet birthday melody 🎵",
  },

  hero: {
    badge: "15 NOVEMBER 2026 • CELEBRATION TIME",
    headingMain: "HAPPY BIRTHDAY",
    name: "Afraa",
    subtitle: "Another lap around the sun, and plenty to celebrate.",
    description:
      "Turn on the tunes, explore the scrapbook, blow the candles, and enjoy everything put together for your day.",
    ctaWish: "Make a Wish 🎂",
    ctaNote: "The Letter 💌",
    ctaExplore: "Fun & Games 🎈",
    scrollHint: "Scroll down to celebrate",
  },

  countdown: {
    heading: "Countdown to the Big Day",
    celebrationTitle: "HAPPY BIRTHDAY, AFRAA! 🎂",
    celebrationSubtitle: "Today is officially your birthday! Wishing you the most incredible year ahead!",
    labels: {
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
    },
    footerNote: "Counted with Asia/Dhaka timezone",
  },

  personalNote: {
    heading: "A Little Note For You",
    subtitle: "Written especially for your birthday.",
    salutation: "Hey Afraa,",
    letterParagraphs: [
      "I didn't want your birthday to pass by with just a standard text message.",
      "There's a little thought behind every detail here. I wanted to build something a bit different for your birthday—something you could explore, look back on, and hopefully remember. I hope you love it!",
      "I hope this year treats you exceptionally well, opens up exciting paths, and gives you plenty of room to grow at your own pace.",
    ],
    closing: "With warm wishes,",
    signature: "— Adyan",
  },

  thoughtfulNotes: {
    heading: "A Few Thoughts for You",
    badge: "WRITTEN WITH CARE • FROM ADYAN",
    subtitle: "A collection of perspectives on timing, personality, and milestones.",
    notes: [
      {
        id: 1,
        quote: "The best things in life usually happen when you stop overthinking them.",
        paperColor: "#FFFDF8",
        borderColor: "#F3DDE2",
        tapeColor: "#DDA6B0",
        tapeAngle: -2.5,
        rotation: -1.2,
      },
      {
        id: 2,
        quote: "Some conversations have a way of quietly resetting your whole day.",
        paperColor: "#FDF5F7",
        borderColor: "#EACCD2",
        tapeColor: "#F7D6BD",
        tapeAngle: 2,
        rotation: 1.4,
      },
      {
        id: 3,
        quote: "Stay grounded, stay slightly chaotic, and never become predictable.",
        paperColor: "#FFF9F1",
        borderColor: "#F0DFD0",
        tapeColor: "#E9E2F5",
        tapeAngle: -1.8,
        rotation: -0.9,
      },
      {
        id: 4,
        quote: "Birthdays are a good excuse to pause, look back, and be proud of how far you've come.",
        paperColor: "#F7F4FB",
        borderColor: "#DDD4EC",
        tapeColor: "#F3DDE2",
        tapeAngle: 3,
        rotation: 1.1,
      },
      {
        id: 5,
        quote: "Not everything requires a deep reason—sometimes things are just nice as they are.",
        paperColor: "#FFFDF8",
        borderColor: "#F3DDE2",
        tapeColor: "#DDA6B0",
        tapeAngle: -2,
        rotation: -1.5,
      },
      {
        id: 6,
        quote: "Some days don't look like much on a calendar, but they end up sticking with you anyway.",
        paperColor: "#FCFAF6",
        borderColor: "#E8DDD4",
        tapeColor: "#F7D6BD",
        tapeAngle: 1.5,
        rotation: 0.8,
      },
      {
        id: 7,
        quote: "Here's to a year where you get to say 'yes' to new adventures and 'no' to boring routines.",
        paperColor: "#FDF4F6",
        borderColor: "#EBCBD2",
        tapeColor: "#E9E2F5",
        tapeAngle: -3,
        rotation: -1.0,
      },
    ],
  },
  get randomThoughts() {
    return this.thoughtfulNotes;
  },

  hiddenNotes: {
    heading: "A Few Little Reminders",
    badge: "FOLDED NOTES",
    subtitle: "Four tiny folded notes waiting to be opened.",
    items: [
      {
        id: 1,
        label: "A Gentle Reminder",
        message: "Birthday calories don't count today. That's a verified scientific fact.",
        tag: "scientific fact 🍰",
        paperColor: "#FFFDF8",
        accentColor: "#A94B59",
        tapeColor: "#F3DDE2",
        rotation: -1.5,
      },
      {
        id: 2,
        label: "Behind This Tab",
        message: "Yes, I spent an embarrassing amount of time picking out these colors.",
        tag: "true story 🎨",
        paperColor: "#FDF5F7",
        accentColor: "#C86070",
        tapeColor: "#DDA6B0",
        rotation: 1.2,
      },
      {
        id: 3,
        label: "Life Advice",
        message: "Take more naps, drink some water, and ignore emails you don't feel like answering.",
        tag: "solid advice 💧",
        paperColor: "#FFF9F1",
        accentColor: "#923C4A",
        tapeColor: "#F7D6BD",
        rotation: -0.8,
      },
      {
        id: 4,
        label: "One Final Secret",
        message: "You're doing much better than you give yourself credit for. Keep going.",
        tag: "remember this ✨",
        paperColor: "#F7F4FB",
        accentColor: "#7F5A96",
        tapeColor: "#E9E2F5",
        rotation: 1.5,
      },
    ],
  },

  wishes: {
    heading: "Here's To Your New Chapter!",
    subtitle: "Six specific wishes for the milestones and adventures ahead.",
    items: [
      {
        id: 1,
        title: "Clarity & Confidence",
        icon: "Compass",
        detail:
          "May your upcoming choices feel intuitive and lead to doors you didn't even know were waiting for you.",
      },
      {
        id: 2,
        title: "Academic & Career Wins",
        icon: "Trophy",
        detail:
          "Here's to acing your exams, mastering tough subjects, and knocking every ambition out of the park.",
      },
      {
        id: 3,
        title: "Restful Nights & Energy",
        icon: "Sun",
        detail:
          "Consistent sleep schedules, refreshing mornings, and plenty of stamina for busy days.",
      },
      {
        id: 4,
        title: "Spontaneous Road Trips",
        icon: "Camera",
        detail:
          "Unplanned weekend getaways, great road playlists, and scenic stops with good company.",
      },
      {
        id: 5,
        title: "Financial Green Lights",
        icon: "Sparkles",
        detail:
          "May your budget stay healthy enough to buy whatever catches your eye without second guessing.",
      },
      {
        id: 6,
        title: "Unapologetic Peace of Mind",
        icon: "Smile",
        detail:
          "A year with minimal drama, zero overthinking, and plenty of room to breathe at your own pace.",
      },
    ],
  },

  cake: {
    heading: "Make a Birthday Wish",
    subtitle: "Close your eyes, make a silent wish, and blow out the candles.",
    promptLit: "Tap the candles or button to blow them out!",
    promptExtinguished: "Wish sent into the stars! Keep it secret so it comes true ✨",
    buttonBlow: "Blow Candles 🕯️",
    buttonRelight: "Relight Candles ✨",
    wishGrantedTitle: "Wish Sent Into the Universe! 🌟",
    wishGrantedSub: "Now go enjoy some real cake today.",
  },

  interactiveFun: {
    heading: "The Birthday Fun Zone",
    subtitle: "Pop balloons, test your birthday trivia, and draw positive vibes!",
    balloons: [
      { id: 1, color: "#f4b4cb", label: "Energy", poppedText: "⚡ +100 Energy Points!" },
      { id: 2, color: "#dfb65b", label: "Focus", poppedText: "🎯 Distraction Shield Activated!" },
      { id: 3, color: "#c4b1fc", label: "Humor", poppedText: "😄 Sarcasm Level Up!" },
      { id: 4, color: "#85e3b3", label: "Luck", poppedText: "🍀 Good Fortune Multiplier!" },
      { id: 5, color: "#ffd166", label: "Chill", poppedText: "🛋️ Zero-Stress Pass Granted!" },
    ],
    fortunes: [
      "☕ A sudden craving for coffee will lead to an unexpectedly productive afternoon.",
      "🍰 Cosmic recommendation: Order dessert first today. No regrets.",
      "🚀 Your next big idea is going to turn out much better than you expect.",
      "📦 A package you forgot you ordered is about to arrive and make your day.",
      "🎉 Today’s agenda: maximum relaxation, zero obligations.",
      "🌟 You will successfully finish that one task you’ve been putting off for weeks.",
    ],
    quiz: {
      question: "What is the official procedure when it's your birthday?",
      options: [
        { text: "Take the whole day off and demand snacks 🍰", isCorrect: true, response: "Spot on! Science fully agrees." },
        { text: "Study linear algebra for 8 straight hours 📐", isCorrect: false, response: "Definitely not! Save that for another day." },
        { text: "Check work emails first thing in the morning 📧", isCorrect: false, response: "Hard pass! Today is for celebration." },
      ],
    },
  },

  finalCelebration: {
    intro: "ONE LAST THING...",
    heading: "HAPPY BIRTHDAY, AFRAA!",
    closingMessage:
      "May this next year surprise you with how good things can get. Go celebrate—you've earned it.",
    buttonText: "Launch Birthday Fireworks 🎆",
    replayText: "More Fireworks! 🎊",
    closeText: "Back to Party ✨",
    modalNote:
      "Thanks for checking out this little project. Here's to making this year your best chapter yet!",
  },

  footer: {
    heading: "Wishing Afraa the Happiest of Birthdays!",
    date: "15 November 2026",
    tagline: "Have an extraordinary day and an even better year ahead!",
    signatureNote: "Made with care by Adyan for Afraa",
  },
};
