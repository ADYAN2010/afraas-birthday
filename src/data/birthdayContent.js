/**
 * Birthday Configuration & Content for Afraa
 * Birthday Date: 15 November 2026 (Asia/Dhaka timezone)
 *
 * Sincere, natural, cheerful, and heartfelt.
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
    subtitle: "Wishing you a wonderful birthday full of happiness.",
    description:
      "Play some music, look through the memories, blow the candles, and enjoy your day.",
    ctaWish: "Make a Wish 🎂",
    ctaNote: "The Letter 💌",
    ctaExplore: "Fun and Games 🎈",
    scrollHint: "Scroll down to celebrate",
  },

  countdown: {
    heading: "Countdown to the Big Day",
    celebrationTitle: "HAPPY BIRTHDAY, AFRAA! 🎂",
    celebrationSubtitle: "Today is your day! Wishing you the best year ahead!",
    labels: {
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
    },
    footerNote: "Dhaka Time",
  },

  personalNote: {
    heading: "A Birthday Note",
    subtitle: "For your special day",
    salutation: "Hey Afraa,",
    letterParagraphs: [
      "Happy birthday Afraa! I wanted to put together something thoughtful for you instead of sending a basic text.",
      "I made this little space with your favorite music and memories so you have something fun to look back on. I really hope you enjoy it.",
      "Wishing you an incredible year ahead filled with happiness, good health, and success in everything you do.",
    ],
    closing: "Warmly,",
    signature: "Adyan",
  },

  thoughtfulNotes: {
    heading: "A Few Thoughts for You",
    badge: "FROM ADYAN",
    subtitle: "A few little thoughts for your special day.",
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
        quote: "Stay grounded, stay curious, and always be yourself.",
        paperColor: "#FFF9F1",
        borderColor: "#F0DFD0",
        tapeColor: "#E9E2F5",
        tapeAngle: -1.8,
        rotation: -0.9,
      },
      {
        id: 4,
        quote: "Take a moment today to look back and be proud of how far you have come.",
        paperColor: "#F7F4FB",
        borderColor: "#DDD4EC",
        tapeColor: "#F3DDE2",
        tapeAngle: 3,
        rotation: 1.1,
      },
      {
        id: 5,
        quote: "Not everything needs a big reason. Sometimes things are just nice as they are.",
        paperColor: "#FFFDF8",
        borderColor: "#F3DDE2",
        tapeColor: "#DDA6B0",
        tapeAngle: -2,
        rotation: -1.5,
      },
      {
        id: 6,
        quote: "Good days and good memories always stick with you.",
        paperColor: "#FCFAF6",
        borderColor: "#E8DDD4",
        tapeColor: "#F7D6BD",
        tapeAngle: 1.5,
        rotation: 0.8,
      },
      {
        id: 7,
        quote: "Wishing you plenty of exciting adventures and peaceful days ahead.",
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
    heading: "Little Notes",
    badge: "FOLDED NOTES",
    subtitle: "Four little notes waiting to be opened.",
    items: [
      {
        id: 1,
        label: "A Gentle Reminder",
        message: "Birthday calories definitely do not count today.",
        tag: "cake time 🍰",
        paperColor: "#FFFDF8",
        accentColor: "#A94B59",
        tapeColor: "#F3DDE2",
        rotation: -1.5,
      },
      {
        id: 2,
        label: "Behind This Tab",
        message: "Yes, I spent a lot of time picking out these colors.",
        tag: "true story 🎨",
        paperColor: "#FDF5F7",
        accentColor: "#C86070",
        tapeColor: "#DDA6B0",
        rotation: 1.2,
      },
      {
        id: 3,
        label: "Friendly Advice",
        message: "Take more naps, drink some water, and take it easy.",
        tag: "good advice 💧",
        paperColor: "#FFF9F1",
        accentColor: "#923C4A",
        tapeColor: "#F7D6BD",
        rotation: -0.8,
      },
      {
        id: 4,
        label: "One Final Note",
        message: "You are doing great. Keep going and stay positive.",
        tag: "always ✨",
        paperColor: "#F7F4FB",
        accentColor: "#7F5A96",
        tapeColor: "#E9E2F5",
        rotation: 1.5,
      },
    ],
  },

  wishes: {
    heading: "Birthday Wishes for You",
    subtitle: "Wishing you the very best in the year ahead.",
    items: [
      {
        id: 1,
        title: "Joy and Confidence",
        icon: "Compass",
        detail:
          "May you always feel confident in your choices and find happiness in the journey.",
      },
      {
        id: 2,
        title: "Study and Career Goals",
        icon: "Trophy",
        detail:
          "Wishing you great success in your exams, studies, and every goal you work toward.",
      },
      {
        id: 3,
        title: "Rest and Good Health",
        icon: "Sun",
        detail:
          "Peaceful sleep, refreshing mornings, and great energy every single day.",
      },
      {
        id: 4,
        title: "Fun Trips and Adventures",
        icon: "Camera",
        detail:
          "Fun getaways, great road trips, and wonderful memories with good friends.",
      },
      {
        id: 5,
        title: "Good Fortune",
        icon: "Sparkles",
        detail:
          "May good luck and great opportunities come your way easily throughout the year.",
      },
      {
        id: 6,
        title: "Peace of Mind",
        icon: "Smile",
        detail:
          "A calm mind, zero unnecessary worries, and lots of reasons to smile every day.",
      },
    ],
  },

  cake: {
    heading: "Make a Birthday Wish",
    subtitle: "Make a wish and blow out the candles.",
    promptLit: "Tap the candles or button to blow them out!",
    promptExtinguished: "Wish made! Keep it in your heart so it comes true ✨",
    buttonBlow: "Blow Candles 🕯️",
    buttonRelight: "Relight Candles ✨",
    wishGrantedTitle: "Wish Sent! 🌟",
    wishGrantedSub: "Hope you have some delicious cake today.",
  },

  interactiveFun: {
    heading: "Birthday Fun Zone",
    subtitle: "Pop balloons, answer trivia, and enjoy the celebration!",
    balloons: [
      { id: 1, color: "#f4b4cb", label: "Energy", poppedText: "⚡ +100 Energy Points!" },
      { id: 2, color: "#dfb65b", label: "Focus", poppedText: "🎯 Focus Shield Activated!" },
      { id: 3, color: "#c4b1fc", label: "Humor", poppedText: "😄 Sarcasm Level Up!" },
      { id: 4, color: "#85e3b3", label: "Luck", poppedText: "🍀 Good Fortune Boost!" },
      { id: 5, color: "#ffd166", label: "Chill", poppedText: "🛋️ Zero Stress Pass Granted!" },
    ],
    fortunes: [
      "☕ A good cup of coffee will make your day extra productive.",
      "🍰 Today's recommendation: enjoy some cake first.",
      "🚀 Whatever you are working on is going to turn out great.",
      "📦 A nice surprise is coming your way soon.",
      "🎉 Today's plan: relax and have a great time.",
      "🌟 You will easily accomplish what you set out to do.",
    ],
    quiz: {
      question: "What is the official rule when it is your birthday?",
      options: [
        { text: "Relax all day and enjoy lots of cake 🍰", isCorrect: true, response: "Exactly! That is the only correct answer." },
        { text: "Study complicated math all day long 📐", isCorrect: false, response: "Definitely not! That can wait for another time." },
        { text: "Answer work emails early in the morning 📧", isCorrect: false, response: "No way! Today is for celebrating." },
      ],
    },
  },

  finalCelebration: {
    intro: "ONE LAST THING",
    heading: "HAPPY BIRTHDAY, AFRAA!",
    closingMessage:
      "Wishing you the very best birthday celebration. Have an amazing day!",
    buttonText: "Launch Birthday Fireworks 🎆",
    replayText: "More Fireworks! 🎊",
    closeText: "Back to Party ✨",
    modalNote:
      "Happy Birthday Afraa! Wishing you joy, laughter, and a wonderful year ahead.",
  },

  footer: {
    heading: "Happy Birthday Afraa!",
    date: "15 November 2026",
    tagline: "Wishing you a wonderful day and a great year ahead!",
    signatureNote: "Made with care by Adyan for Afraa",
  },
};
