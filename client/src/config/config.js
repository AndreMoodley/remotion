const config = {
  // ==== HOME PAGE ====
  homePage: {
    // Number of sentences displayed per slide
    sentencePerSlide: 2, // Adjust this to control how many sentences are shown per slide
    slides: [
      [
        "Hola Mina Moreeee",
        "I hoope you see just how much I love you",
        // If you set `sentencePerSlide` to 2, the next text won't be visible
        "Surprise!",
      ],
      [
        "Another Kawaiii website",
        "So NOOOO i did not Forget",
      ],
      ["I LOVE GWACIEEE SOOO SOOOO MUCHHHHH."],
      // You can add more slides or delete slides as needed
    ],
  },
// Add this inside your config object
  // ==== VALENTINE'S PAGE ====
  valentinesPage: {
    title: "Happy Valentine's",
    // Make sure to add your envelope image to assets/images/
    envelopeSrc: "envelope.png", // Or null if you want CSS only
    buttonText: "click me!!!",
  },

  // ==== MEMORIES PAGE ====
  memoriesPage: {
    title: "Our Memories",
    // Data for the polaroids
    memories: [
      {
        id: 1,
        imgName: "IMG_3718.jpeg", // Replace with your actual file name
        caption: "Kawaiiii Time",
      },
      {
        id: 2,
        imgName: "IMG_4130.jpeg", 
        caption: "More Kawaiii",
      },
      {
        id: 3,
        imgName: "IMG_4717.jpeg", 
        caption: "Another Kawaiii",
      },
      {
        id: 4,
        imgName: "IMG_5017.jpeg",
        caption: "Kawaiii",
      },
      {
        id: 5,
        imgName: "IMG_4363.jpeg",
        caption: "Forever Kawaiii",
      },
    ],
  },
  // ==== QUIZ PAGE ====
  quizPage: {
    // Color of the progress bar
    progressBarColor: "#cf6b87",
    // Text labels for the quiz
    text: {
      questionLabel: "Question",
      ofLabel: "out of",
      scoreLabel: "Score:",
      yourScoreLabel: "Your score:",
      nextButtonText: "Go to next page",
    },
    // Quiz questions and answers
    questions: [
      {
        id: 1, // Unique ID for the question
        title: "who said I love you first?",
        description: "(accidental or not)",
        correctAnswer: "Gracie", // Correct answer value (must match one of the options' `value`)
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
        description: "Don't make the same mistake twice:D",
        correctAnswer: "March-14",
        options: [
          { value: "Feb-29", label: "Febuary 29th" },
          { value: "March-26", label: "March 26th" },
          { value: "April-1", label: "April 1st" },
          { value: "March-14", label: "March 14th" },
        ],
      },
      // You can add more questions here
    ],
    // GIF ANIMATION CONFIGURATION
    gifConfig: [
      {
        check: (score) => score >= 3, // If score is 3 or above, this GIF will be shown
        heading: "Wow!!!!!!! unbelievable",
        gifName: "gif4.gif", // Name of the GIF file in `src/assets/gifs`
        style: "w-44", // Tailwind CSS class for styling the GIF
      },
      {
        check: (score) => score === 2, // If score is exactly 2, this GIF will be shown
        heading: "Ehhh, not bad! so I still love you",
        gifName: "gif3.gif",
        style: "w-44",
      },
      {
        check: (score) => score === 1, // If score is exactly 1, this GIF will be shown
        heading: "It's okay, I know you tried so hard",
        gifName: "gif2.gif",
        style: "w-44",
      },
      {
        check: () => true, // Default case (if none of the above conditions are met)
        heading: "umm... wtf???",
        gifName: "gif1.gif",
        style: "w-44",
      },
    ],
  },

  // ==== DRAWING PAGE ====
  drawingPage: {
    // Messages displayed on the drawing page
    messages: [
      "Can you draw me a flower",
      "Give me another flower",
      "Draw me one last flower",
    ],
    // Colors available for drawing
    COLORS: ["#000000", "#FF7043", "#66BB6A", "#42A5F5", "#FFEE58"],
    // Text for the submit button
    text: {
      submitText: "Submit",
      finalText: "Thank you baby ❤️",
      loading: "Sending...",
    },
  },

  // ==== LETTER PAGE ====
  letterPage: {
  // Custom message you want to display (your love letter)
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

  BBYYY you truly make me the happiest most grateful man on this earth so would you do me the honors of being 
  
  my funny

  Valentine.......

  🥹🥹🥹

  Love,
Andre ❤️`,
    // Placeholder text for the letter input
    placeholder: {
      default: `Now, I want you to write me a letter :) Once you click "Send Message" I'll be able to see it hehe`,
      emptyInput: "You have to write me something first!! ):",
      success: "Thank you for the message my love!",
      error: "Failed to send the message. try it again!",
    },
    // Button text
    buttons: {
      sendMessage: "Send Message",
      clearText: "Clear",
      loading: "Sending...",
    },
    // API configuration for sending emails
    api: {
      baseURL: `http://localhost:3000`,
      // Configure this based on your development port (check server/app.js or .env.PORT) and update this to your live backend URL after deployment

      sendEmailEndpoint: "/send-email", // Endpoint for sending emails
    },
  },

  // ==== CLOSING PAGE ====
  closingPage: {
    // Final message displayed on the closing page
    message:
      "Thank you for contributing to this project. I love you with all my heart",
    // GIF displayed on the closing page
    gifName: "closing.gif", // Name of the GIF file in `src/assets/gifs`
    style: "w-44", // Tailwind CSS class for styling the GIF
  },
};

export default config;
