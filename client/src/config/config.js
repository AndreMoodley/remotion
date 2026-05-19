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
      { id: 9, imgName: "IMG_3601.jpeg", date: "", label: "wuv" },
      { id: 10, imgName: "IMG_4130.jpeg", date: "", label: "story" },
      { id: 11, imgName: "IMG_4363.jpeg", date: "", label: "yet" },
      { id: 12, imgName: "IMG_4717.jpeg", date: "", label: "to" },
      { id: 13, imgName: "IMG_5017.jpeg", date: "", label: "write" },
      { id: 14, imgName: "IMG_5584.jpeg", date: "", label: "and" },
      { id: 15, imgName: "NEW_05.jpeg", date: "", label: "I" },
      { id: 16, imgName: "NEW_02.jpeg", date: "", label: "wuvv" },
      { id: 17, imgName: "NEW_01.jpeg", date: "", label: "you" },
      { id: 18, imgName: "NEW_07.jpeg", date: "", label: "eternally ♥" },
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
    customMessage: `To my wifffeeeyyyyyy,

  I can cant believe its been a whole year since we started our story meow i am so in wuv with you.🥹

  I wuv you so sho shoo shhooooo shhhoohooo muchhhh mi amor and its been the best 400 days of my life, 

  ever since i first ask you to record from the very first day i was addicted. the glow in your eyes and

  the life you breathed into me, in knew instantly you were the one, even if you think i am lying it is my

  truth that i have loved you despite not knowing it since the day i met you, like they say "love at first sight" 
  
  and i am so grateful for i have got to play with you everyday for a entire year :0 and i am so so gwateful for all the compramises

  and sacrifices you have made for me and our relationship and i want you to know that i see it all and i appreciate it
  
  every single thing you have done. I wuv you with all my heart my gwacie and i am so lucky i get to continue 

  loving you and making you happy for the rest of our lives together. I know we have had our ups and downs but to me

  but i wouldnt trade it for the world, I wuv you bbbyyy and i cant wait for another year of love and play, 

  thank youuuuu shooo muchh for being mine and making me the happiest man in existance :)))))) 

  I WUV WUV WUV WUV WUV YOUUUUUU

  MINA MOREEEEEE

  Love,
     DUDU ❤️`,
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
