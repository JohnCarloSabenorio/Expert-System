const questionText = document.querySelector(".question");
const startBtn = document.getElementById("start-btn");
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const retryBtn = document.getElementById("retry-btn");
let crimes_committed = [];

let crimes_n_punishment = {
  0: {
    crime: "Trafficking",
    imprisonment: "20 years",
    fine: "Not less than One million pesos (P1,000,000.00) but not more than Two million pesos (P2,000,000.00)",
  },
  1: {
    crime: "Promotion of human trafficking",
    imprisonment: "15 years",
    fine: "Not less than Five hundred thousand pesos (P500,000.00) but not more than One million pesos (P1,000,000.00)",
  },
  2: {
    crime: "Qualified trafficking",
    imprisonment: "life imprisonment",
    fine: "Not less than Two million pesos (P2,000,000.00) but not more than Five million pesos (P5,000,000.00)",
  },
  3: {
    crime: "Breach of confidentiality",
    imprisonment: "6 years",
    fine: "Not less than Five hundred thousand pesos (P500,000.00) but not more than One million pesos (P1,000,000.00)",
  },
  4: {
    crime: "Use of trafficked persons",
    firstOffense: {
      commService: "6 months",
      fine: "Fifty thousand pesos (P50,000.00);",
    },
    subseqOffense: {
      imprisonment: "1 year",
      fine: "One hundred thousand pesos (P100,000.00)",
    },
  },
};

let idx = 0;
let isEntity = false; // checks whether penalty is imposed on the responsible owner of a person
let isForeigner = false; // handles the barring of foreigners
let isSyndicate = false; // handles the prescriptive period

startBtn.addEventListener("click", startTest);
let questions = [
  // Trafficking Questions
  "Did the person recruit, transport, harbor, provide, or receive any person under the pretext of employment or training, with the intent of subjecting them to prostitution, pornography, sexual exploitation, forced labor, slavery, involuntary servitude, or debt bondage?",
  "Did the person introduce a woman to foreign nationals for marriage with the intent of acquiring, buying, offering, selling, or trading her for purposes of prostitution, pornography, sexual exploitation, forced labor, slavery, involuntary servitude, or debt bondage?",
  "Did the person offer or arrange a real or simulated marriage with the intent of engaging the other person in prostitution, pornography, sexual exploitation, forced labor, slavery, involuntary servitude, or debt bondage?",
  "Did the person undertake or organize tours and travel plans with the intent of offering prostitution, pornography, or sexual exploitation?",
  "Did the person hire someone to engage in prostitution and pornography?",
  "Did the person hire someone using force, threats, or violence with the intent to remove and sell their organ?",
  "Did the person adopt someone for the purpose of sexual engagements, force labor, or involuntary service?",
  "Did the person recruit, transport, or adopt a child with the purpose of engaging them in armed activities, either in the Philippines or abroad?", // idx = 7
  // Promotion of human trafficking
  "Is an establishment being used for the purpose of promoting trafficking in people?",
  "Did the person forge his/her requirements for the purpose of promoting trafficking in persons?",
  "Did the person use any means of advertising to promote human trafficking?",
  "Did the person help obtain clearances or exit documents through misrepresentation or fraud, with the intent to secure pre-departure registration or services from government agencies, and to promote or facilitate trafficking in persons?",
  "Did the person assist someone in entering or leaving the country through an airport, seaport, or border while possessing tampered, fake, or unauthorized travel documents, with the intent to promote or facilitate trafficking in persons?",
  "Did the person sabotaged the person’s travel requirements to prevent trafficked persons from leaving the country?",
  "Did the person gain benefits from the labor or services of someone held in conditions of involuntary servitude, forced labor, or slavery?", // idx = 14
  // Qualified trafficking
  "Is the trafficked person a child? ",
  "Did the person adopt a child through RA 8043 with the purpose of exploiting them for prostitution, pornography, sexual exploitation, forced labor, slavery, involuntary servitude, or debt bondage, or to engage them in forced labor or slavery?",
  "Was the trafficking conducted by a group of two or more people?",
  "Is the offender a parent, sibling, or legal guardian of the trafficked person, or do they hold a position of authority over the trafficked person (e.g., police officer or any government position)?",
  "Was the trafficked person recruited specifically for prostitution, and did the recruitment involve a member of the military or law enforcement",
  "Is the person a member of the military or law enforcement agencies?",
  "Did the person experience physical harm or mutilation and were they diagnosed with HIV/AIDS?", // idx = 21
  // Breach of Confidentiality
  "Did the person order a closed-door investigation to conceal the privacy of the trafficked person or the accused during the proceedings?",
  "Did the person fail to recognize the right to privacy of the trafficked person and the accused at any stage of the investigation?",
  "Did the person disclose personal information about the trafficked person or the accused to the public during the trial?",
  "Did the person neglect to consider the best interests of the parties before deciding on confidentiality measures?",
  "Did the person allow the identities and personal circumstances of the trafficked person or the accused to be publicly known throughout the legal process?", // 26

  // If the person is an entity
  "Is a person the owner, president, partner, manager, or a responsible officer of the corporation, partnership, association, club, establishment, or any juridical person that participated in the commission of the crime or knowingly permitted or failed to prevent its commission?",
  // If the person is a foreigner
  "Is the person a foreigner?",
  // User of trafficked persons
  "Did the person knowingly engaged the services of an individual who was trafficked for the purpose of prostitution?",
];
function displayQuestion() {
  questionText.textContent = questions[idx];
}

function startTest() {
  displayQuestion();
  startBtn.style.display = "none";
  retryBtn.style.display = "none";

  yesBtn.style.display = "inline-block";
  noBtn.style.display = "inline-block";
}

function endTest() {
  yesBtn.style.display = "none";
  noBtn.style.display = "none";
  retryBtn.style.display = "inline-block";
  idx = 0;
  isEntity = false;
  isForeigner = false;
  isSyndicate = false;
}

function nextQuestion() {
  idx++;
  displayQuestion();
}

function skipQuestion(num) {
  idx = num;
  displayQuestion();
}

function checkAnswer(ans) {
  if (idx >= questions.length - 1) {
    alert("The test is done!");
    endTest();
  }
  console.log(idx);
  if (ans == true) {
    if (idx <= 7) {
      console.log("trafficking!");
      skipQuestion(8);
      return;
    } else if (idx <= 14) {
      console.log("Promotion of trafficking!");
      skipQuestion(15);
      return;
    } else if (idx <= 21) {
      console.log("Qualified trafficking!");
      skipQuestion(22);
      return;
    } else if (idx <= 26) {
      console.log("Breach of confidentiality!");
      skipQuestion(27);
      return;
    } else if (idx == 27) {
      console.log("entity!");
    } else if (idx == 28) {
      console.log("foreigner!");
    } else if (idx == 29) {
      console.log("User of trafficked persons!");
    }
    nextQuestion();
  } else {
    nextQuestion();
  }
}
