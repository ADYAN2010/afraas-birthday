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
    subtitle: "Wishing you a wonderful year ahead, filled with happiness, laughter and success!",
    description:
      "A vibrant, handcrafted birthday experience made to celebrate your special day in style. Turn on the tunes, blow the candles, and enjoy the party!",
    ctaWish: "Make a Wish 🎂",
    ctaNote: "A Little Note 💌",
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
    subtitle: "A few words written with genuine care for your birthday.",
    salutation: "Hey Afraa,",
    specialMessage:
      "There's a little thought behind every detail here. I wanted to make something a bit different for your birthday, something you could enjoy and hopefully remember. I hope you love it!",
    messages: [
      "I didn't want your birthday to pass with just an ordinary wish.",
      "Some people are worth putting a little extra effort into.",
      "The smallest details can carry the biggest amount of thought.",
      "You deserve a day as lovely as the memories you're yet to make.",
      "I hope this brings a smile to your face. That was the whole idea.",
    ],
    closing: "With warm wishes,",
    signature: "— Adyan",
  },

  thoughtfulNotes: {
    heading: "A Few Thoughts for You",
    badge: "WRITTEN WITH CARE • FROM ADYAN",
    subtitle: "A little time, a lot of thought, and a few notes written especially for you.",
    notes: [
      {
        id: 1,
        quote: "Some people are worth putting a little extra effort into.",
        paperColor: "#FFFDF8",
        borderColor: "#F3DDE2",
        tapeColor: "#DDA6B0",
        tapeAngle: -2.5,
        rotation: -1.2,
      },
      {
        id: 2,
        quote: "A little time, a lot of thought, and a birthday wish made especially for you.",
        paperColor: "#FDF5F7",
        borderColor: "#EACCD2",
        tapeColor: "#F7D6BD",
        tapeAngle: 2,
        rotation: 1.4,
      },
      {
        id: 3,
        quote: "I didn't want your birthday to pass with just an ordinary wish.",
        paperColor: "#FFF9F1",
        borderColor: "#F0DFD0",
        tapeColor: "#E9E2F5",
        tapeAngle: -1.8,
        rotation: -0.9,
      },
      {
        id: 4,
        quote: "The smallest details can carry the biggest amount of thought.",
        paperColor: "#F7F4FB",
        borderColor: "#DDD4EC",
        tapeColor: "#F3DDE2",
        tapeAngle: 3,
        rotation: 1.1,
      },
      {
        id: 5,
        quote: "You deserve a day as lovely as the memories you're yet to make.",
        paperColor: "#FFFDF8",
        borderColor: "#F3DDE2",
        tapeColor: "#DDA6B0",
        tapeAngle: -2,
        rotation: -1.5,
      },
      {
        id: 6,
        quote: "Some wishes deserve more than just a simple message.",
        paperColor: "#FCFAF6",
        borderColor: "#E8DDD4",
        tapeColor: "#F7D6BD",
        tapeAngle: 1.5,
        rotation: 0.8,
      },
      {
        id: 7,
        quote: "A little extra effort for a day worth celebrating.",
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
    subtitle: "Chosen with care, waiting to be opened.",
    items: [
      {
        id: 1,
        label: "A little reminder",
        message: "You deserve a day as lovely as the memories you're yet to make.",
        paperColor: "#FFFDF8",
        accentColor: "#A94B59",
        tapeColor: "#F3DDE2",
        rotation: -1.5,
      },
      {
        id: 2,
        label: "Behind this page",
        message: "I hope you notice all the little details. They were chosen with care.",
        paperColor: "#FDF5F7",
        accentColor: "#C86070",
        tapeColor: "#DDA6B0",
        rotation: 1.2,
      },
      {
        id: 3,
        label: "Something worth reading",
        message: "Some wishes deserve more than just a simple message.",
        paperColor: "#FFF9F1",
        accentColor: "#923C4A",
        tapeColor: "#F7D6BD",
        rotation: -0.8,
      },
      {
        id: 4,
        label: "One more thing...",
        message: "I hope this brings a smile to your face. That was the whole idea.",
        paperColor: "#F7F4FB",
        accentColor: "#7F5A96",
        tapeColor: "#E9E2F5",
        rotation: 1.5,
      },
    ],
  },

  finalMessage: {
    title: "One last thought...",
    quote: "Some people are worth putting a little extra effort into.",
    signature: "— Adyan",
  },

  wishes: {
    heading: "Here's To Your New Chapter!",
    subtitle: "Six vibrant wishes for an unforgettable year filled with joy and high spirits.",
    items: [
      {
        id: 1,
        title: "Happiness in Every Little Moment",
        icon: "Smile",
        detail:
          "May ordinary everyday moments bring you spontaneous reasons to laugh out loud, feel energized, and smile bright.",
      },
      {
        id: 2,
        title: "Success in Everything You Pursue",
        icon: "Trophy",
        detail:
          "Whatever academic goals, exciting projects, or bold challenges you tackle this year—may you achieve them all with flying colors.",
      },
      {
        id: 3,
        title: "Beautiful Memories Worth Remembering",
        icon: "Camera",
        detail:
          "Here's to great times with awesome friends, hilarious adventures, delicious birthday food, and unforgettable memories.",
      },
      {
        id: 4,
        title: "New Adventures & Opportunities",
        icon: "Compass",
        detail:
          "May this year open up exciting doors, fresh experiences, inspiring travels, and plenty of thrilling opportunities.",
      },
      {
        id: 5,
        title: "Good Health & Peaceful Days",
        icon: "Sun",
        detail:
          "Abundant energy to do everything you enjoy, peaceful restful nights, and a calm, stress-free mindset throughout the year.",
      },
      {
        id: 6,
        title: "Dreams Turning into Reality",
        icon: "Sparkles",
        detail:
          "May every ambition, idea, and goal you've been working towards come together in the best and most rewarding way possible.",
      },
    ],
  },

  cake: {
    heading: "Make a Birthday Wish",
    subtitle: "Close your eyes, make a wish, and let the magic begin! ✨",
    promptLit: "Tap the candles or button to blow them out!",
    promptExtinguished: "Your birthday wish has been launched into the stars! 🌟",
    buttonBlow: "Make a Wish ✨",
    buttonRelight: "Relight Candles 🕯️",
    wishGrantedTitle: "May All Your Wishes Come True! 🎉",
    wishGrantedSub: "Wishing you a fabulous birthday filled with cake, laughs, and pure celebration!",
  },

  interactiveFun: {
    heading: "The Birthday Fun Zone",
    subtitle: "Pop balloons, test your birthday trivia, and draw positive vibes!",
    balloons: [
      { id: 1, color: "#f4b4cb", label: "Joy", poppedText: "🎉 +100 Happiness Points!" },
      { id: 2, color: "#dfb65b", label: "Success", poppedText: "🏆 All Goals Achieved!" },
      { id: 3, color: "#c4b1fc", label: "Laughter", poppedText: "😄 Non-stop Good Vibes!" },
      { id: 4, color: "#85e3b3", label: "Energy", poppedText: "⚡ Zero-Stress Superpower!" },
      { id: 5, color: "#ffd166", label: "Luck", poppedText: "🌟 Max Good Fortune!" },
    ],
    fortunes: [
      "✨ Pro tip: Birthday calories officially do not count today. Eat all the cake!",
      "🚀 Prediction: This next year is going to be your most successful chapter yet.",
      "🎉 Cosmic memo: You are destined for awesome adventures and great accomplishments.",
      "☀️ Good fortune alert: Something exciting and unexpected is headed your way soon.",
      "🌟 High score incoming: You're going to ace whatever you're currently working on!",
      "🍰 Birthday Law #1: You have full authority to relax, laugh, and celebrate all day long.",
    ],
    quiz: {
      question: "What is the #1 Golden Rule of Birthdays?",
      options: [
        { text: "Birthday calories definitely do not count 🎂", isCorrect: true, response: "Spot on! Science fully agrees." },
        { text: "You must smile in at least 50 photos 📸", isCorrect: false, response: "Good idea, but cake comes first!" },
        { text: "Do homework instead of partying 📚", isCorrect: false, response: "Definitely incorrect! No way." },
      ],
    },
  },

  finalCelebration: {
    intro: "ONCE AGAIN...",
    heading: "HAPPY BIRTHDAY, AFRAA!",
    closingMessage:
      "May this year bring you endless smiles, incredible achievements and countless unforgettable memories.",
    buttonText: "Launch Birthday Fireworks 🎆",
    replayText: "More Fireworks! 🎊",
    closeText: "Back to Party ✨",
  },

  footer: {
    heading: "Wishing Afraa the Happiest of Birthdays!",
    date: "15 November 2026",
    tagline: "Have an extraordinary day and an even better year ahead!",
    signatureNote: "Made with care by Adyan for Afraa",
  },
};
