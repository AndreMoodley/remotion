const config = {
  // ==== HOME PAGE ====
  homePage: {
    sentencePerSlide: 2,
    slides: [
      [
        "Happy Anniversary, my love",
        "365 days with you has been everything",
      ],
      [
        "Every moment with you",
        "is a memory I never want to forget",
      ],
      ["Here's to forever ♥"],
    ],
  },

  // ==== ANNIVERSARY PAGE ====
  anniversaryPage: {
    title: "One Year",
    buttonText: "Our Story",
  },

  // ==== MEMORIES PAGE ====
  memoriesPage: {
    title: "Our Story",
    // 18 photos in story-progression order. One-word labels combine to form:
    // "Every chapter with you has been my favorite love story yet to write
    //  and I love you forever ♥"
    milestones: [
      { id: 1, imgName: "IMG_8298.jpeg", date: "", label: "Every" },
      { id: 2, imgName: "IMG_1189.jpg", date: "", label: "chapter" },
      { id: 3, imgName: "IMG_9501.jpeg", date: "", label: "with" },
      { id: 4, imgName: "NEW_03.jpeg", date: "", label: "you" },
      { id: 5, imgName: "NEW_04.jpeg", date: "", label: "has" },
      { id: 6, imgName: "IMG_2416.JPG", date: "", label: "been" },
      { id: 7, imgName: "NEW_06.jpeg", date: "", label: "my" },
      { id: 8, imgName: "IMG_3155.jpeg", date: "", label: "favorite" },
      { id: 9, imgName: "IMG_3601.jpeg", date: "", label: "love" },
      { id: 10, imgName: "IMG_4130.jpeg", date: "", label: "story" },
      { id: 11, imgName: "IMG_4363.jpeg", date: "", label: "yet" },
      { id: 12, imgName: "IMG_4717.jpeg", date: "", label: "to" },
      { id: 13, imgName: "IMG_5017.jpeg", date: "", label: "write" },
      { id: 14, imgName: "IMG_5584.jpeg", date: "", label: "and" },
      { id: 15, imgName: "NEW_05.jpeg", date: "", label: "I" },
      { id: 16, imgName: "NEW_02.jpeg", date: "", label: "love" },
      { id: 17, imgName: "NEW_01.jpeg", date: "", label: "you" },
      { id: 18, imgName: "NEW_07.jpeg", date: "", label: "forever ♥" },
    ],
  },

  // ==== QUIZ PAGE ====
  quizPage: {
    progressBarColor: "#d4a853",
    text: {
      questionLabel: "Question",
      ofLabel: "out of",
      scoreLabel: "Score:",
      yourScoreLabel: "Your score:",
      nextButtonText: "Go to next page",
    },
    questions: [
      {
        id: 1,
        title: "who said I love you first?",
        description: "(accidental or not)",
        correctAnswer: "Gracie",
        options: [
          { value: "Andre", label: "Andre" },
          { value: "Gracie", label: "Gracie" },
        ],
      },
      {
        id: 2,
        title: "Where was our first kiss?",
        description: "Back of the car",
        correctAnswer: "McLennon",
        options: [
          { value: "Walmart", label: "Walmart" },
          { value: "Pool", label: "Pool" },
          { value: "Parking Lot", label: "Parking Lot" },
          { value: "McLennon", label: "McLennon" },
        ],
      },
      {
        id: 3,
        title: "When did I get your IG?",
        description: "Don't make the same mistake twice :D",
        correctAnswer: "March-14",
        options: [
          { value: "Feb-29", label: "February 29th" },
          { value: "March-26", label: "March 26th" },
          { value: "April-1", label: "April 1st" },
          { value: "March-14", label: "March 14th" },
        ],
      },
    ],
    gifConfig: [
      {
        check: (score) => score >= 3,
        heading: "Wow!!!!!!! unbelievable",
        gifName: "gif4.gif",
        style: "w-44",
      },
      {
        check: (score) => score === 2,
        heading: "Ehhh, not bad! so I still love you",
        gifName: "gif3.gif",
        style: "w-44",
      },
      {
        check: (score) => score === 1,
        heading: "It's okay, I know you tried so hard",
        gifName: "gif2.gif",
        style: "w-44",
      },
      {
        check: () => true,
        heading: "umm... wtf???",
        gifName: "gif1.gif",
        style: "w-44",
      },
    ],
  },

  // ==== DRAWING PAGE ====
  drawingPage: {
    messages: [
      "Can you draw me a flower",
      "Give me another flower",
      "Draw me one last flower",
    ],
    COLORS: ["#000000", "#FF7043", "#66BB6A", "#42A5F5", "#FFEE58"],
    text: {
      submitText: "Submit",
      finalText: "Thank you baby ❤️",
      loading: "Sending...",
    },
  },

  // ==== LETTER PAGE ====
  letterPage: {
    customMessage: `To my bbbyyyyy,

  I wuv you so so so so so so so so so so so so so muchhhh and everyday I am so thankful you are mine,

  to me it feels like we have been married for a eternity and i dont know how to explain it but every moment

  with you good or bad i am truly grateful and I geniuley see you as my other half and partner in this life

  we will share together on earth. I know times have been tough recently and its been hard to deal with me

  but to me it shows me just how much i can love my gwacie and fight for you, as i never for one moment stopped

  loving you despite all our fights and hard times and this brings me back to what they say you know "through

  the good and bad times" I will always love my bbyyyy so never ever ever ever ever forget that my love and always

  remember your dudu is here for you and wuvs you eternally and is so so so excited to explore the world and life

  with you and cant wait for every new memory that comes along the way <3 Also I want to take the momment and thank

  you for every single thing you do for me and i appreciate all the little things like my baby callig me texting

  me and giving me attention even though you have a million different things to do and you are a busy busy girl

  so once again bby i appreciate everything and thank you so so so much for being mine and making me the luckiest

  guy in the UNIVERSEEEEE I WUVVV YOUUU MY BBYYYYYYYY SOOOOOOOOO

  BBYYY you truly make me the happiest most grateful man on this earth — here's to one incredible year together

  and to every adventure that comes next.

  🥹🥹🥹

  Love,
Andre ❤️`,
    placeholder: {
      default: `Now, I want you to write me a letter :) Once you click "Send Message" I'll be able to see it hehe`,
      emptyInput: "You have to write me something first!! ):",
      success: "Thank you for the message my love!",
      error: "Failed to send the message. try it again!",
    },
    buttons: {
      sendMessage: "Send Message",
      clearText: "Clear",
      loading: "Sending...",
    },
    api: {
      baseURL: `http://localhost:3000`,
      sendEmailEndpoint: "/send-email",
    },
  },

  // ==== CLOSING PAGE ====
  closingPage: {
    message:
      "Thank you for the most incredible year of my life. Here's to forever, my love.",
    gifName: "closing.gif",
    style: "w-44",
  },
};

export default config;
