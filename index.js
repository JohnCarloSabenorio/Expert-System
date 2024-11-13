const questionText = document.querySelector(".question");
const startBtn = document.getElementById("start-btn");
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const retryBtn = document.getElementById("retry-btn");
const header = document.querySelector(".main-header");
const results = document.querySelector(".results");
const btnContainer = document.querySelector(".btn-container");
const mainContainer = document.querySelector(".main-container");
const entity = document.querySelector(".entity");
const deportment = document.querySelector(".deportment");
const prescriptionPeriod = document.querySelector(".prescription-period");
const infoContainer = document.querySelector(".info-container");

let crimes_committed = [];

let crimes_n_punishment = {
  0: {
    crime: "Acts of Trafficking",
    punishment:
      "Imprisonment of twenty (20) years and a fine of not less than One million pesos (P1,000,000.00) but not more than Two million pesos (P2,000,000.00)",
  },
  1: {
    crime: "Promotion of Human Trafficking",
    punishment:
      "Imprisonment of fifteen (15) years and a fine of not less than Five hundred thousand pesos (P500,000.00) but not more than One million pesos (P1,000,000.00)",
  },
  2: {
    crime: "Qualified Trafficking",
    punishment:
      "Life imprisonment and a fine of not less than Two million pesos (P2,000,000.00) but not more than Five million pesos (P5,000,000.00)",
  },
  3: {
    crime: "Breach of Confidentiality",
    punishment:
      "imprisonment of six (6) years and a fine of not less than Five hundred thousand pesos (P500,000.00) but not more than One million pesos (P1,000,000.00)",
  },
  4: {
    crime: "Use of trafficked Persons",
    firstOffense: {
      punishment:
        "Six (6) months of community service as may be determined by the court and a fine of Fifty thousand pesos (P50,000.00)",
    },
    subseqOffense: {
      punishment:
        "Imprisonment of one (1) year and a fine of One hundred thousand pesos (P100,000.00)",
    },
  },
};

let sectionNum = 1;
let idx = 0;
let isEntity = false; // checks whether penalty is imposed on the responsible owner of a person
let isForeigner = false; // handles the barring of foreigners
let isSyndicate = false; // handles the prescriptive period
let useTrafficked = false;
let moreThanOnce = false;
startBtn.addEventListener("click", startTest);

let trafficking_questions = [
  // If the person is an entity
  "Is a person the owner, president, partner, manager, or a responsible officer of the corporation, partnership, association, club, establishment, or any juridical person that participated in the commission of the crime or knowingly permitted or failed to prevent its commission?",
  // If the person is a foreigner
  "Is the person a foreigner?",
  // User of trafficked persons
  "Did the person knowingly engaged the services of an individual who was trafficked for the purpose of prostitution?",
  "Did the person engage in the use of trafficked persons for prostitution more than once?",
  // "Is a syndicate"
  "Is the person involved operate as part of a syndicate?",
  "Did the person recruit, transport, harbor, provide, or receive any person under the pretext of employment or training, with the intent of subjecting them to prostitution, pornography, sexual exploitation, forced labor, slavery, involuntary servitude, or debt bondage?",
  "Did the person introduce a woman to foreign nationals for marriage with the intent of acquiring, buying, offering, selling, or trading her for purposes of prostitution, pornography, sexual exploitation, forced labor, slavery, involuntary servitude, or debt bondage?",
  "Did the person offer or arrange a real or simulated marriage with the intent of engaging the other person in prostitution, pornography, sexual exploitation, forced labor, slavery, involuntary servitude, or debt bondage?",
  "Did the person undertake or organize tours and travel plans with the intent of offering prostitution, pornography, or sexual exploitation?",
  "Did the person hire someone to engage in prostitution and pornography?",
  "Did the person hire someone using force, threats, or violence with the intent to remove and sell their organ?",
  "Did the person adopt someone for the purpose of sexual engagements, force labor, or involuntary service?",
  "Did the person recruit, transport, or adopt a child with the purpose of engaging them in armed activities, either in the Philippines or abroad?",
];

let promotion_questions = [
  // If the person is an entity
  "Is a person the owner, president, partner, manager, or a responsible officer of the corporation, partnership, association, club, establishment, or any juridical person that participated in the commission of the crime or knowingly permitted or failed to prevent its commission?",
  // If the person is a foreigner
  "Is the person a foreigner?",
  // User of trafficked persons
  "Did the person knowingly engaged the services of an individual who was trafficked for the purpose of prostitution?",
  "Did the person engage in the use of trafficked persons for prostitution more than once?",
  // "Is a syndicate"
  "Is the person involved operate as part of a syndicate?",
  "Is an establishment being used for the purpose of promoting trafficking in people?",
  "Did the person forge his/her requirements for the purpose of promoting trafficking in persons?",
  "Did the person use any means of advertising to promote human trafficking?",
  "Did the person help obtain clearances or exit documents through misrepresentation or fraud, with the intent to secure pre-departure registration or services from government agencies, and to promote or facilitate trafficking in persons?",
  "Did the person assist someone in entering or leaving the country through an airport, seaport, or border while possessing tampered, fake, or unauthorized travel documents, with the intent to promote or facilitate trafficking in persons?",
  "Did the person sabotaged the person’s travel requirements to prevent trafficked persons from leaving the country?",
  "Did the person gain benefits from the labor or services of someone held in conditions of involuntary servitude, forced labor, or slavery?",
];

let qualified_questions = [
  // If the person is an entity
  "Is a person the owner, president, partner, manager, or a responsible officer of the corporation, partnership, association, club, establishment, or any juridical person that participated in the commission of the crime or knowingly permitted or failed to prevent its commission?",
  // If the person is a foreigner
  "Is the person a foreigner?",
  // User of trafficked persons
  "Did the person knowingly engaged the services of an individual who was trafficked for the purpose of prostitution?",
  "Did the person engage in the use of trafficked persons for prostitution more than once?",
  // "Is a syndicate"
  "Is the person involved operate as part of a syndicate?",
  "Did the person trafficked a child?",
  "Did the person adopt a child through RA 8043 with the purpose of exploiting them for prostitution, pornography, sexual exploitation, forced labor, slavery, involuntary servitude, or debt bondage, or to engage them in forced labor or slavery?",
  "Was a trafficking conducted by a group of two or more people?",
  "Is the person a parent, sibling, or a legal guardian that holds a position of authority over the trafficked person (e.g., police officer or any government position)?",
  "Was the trafficked person recruited specifically for prostitution, and did the recruitment involve a member of the military or law enforcement?",
  "Is the person a member of the military or law enforcement agencies?",
  "Did the person experience physical harm or mutilation and were they diagnosed with HIV/AIDS?",
];
let breach_questions = [
  // If the person is an entity
  "Did the person experience physical harm or mutilation and were they diagnosed with HIV/AIDS?", // idx = 21
  // Breach of Confidentiality (Section 7)
  "Did the person order a closed-door investigation to conceal the privacy of the trafficked person or the accused during the proceedings?",
  "Did the person fail to recognize the right to privacy of the trafficked person and the accused at any stage of the investigation?",
  "Did the person disclose personal information about the trafficked person or the accused to the public during the trial?",
  "Did the person neglect to consider the best interests of the parties before deciding on confidentiality measures?",
  "Did the person allow the identities and personal circumstances of the trafficked person or the accused to be publicly known throughout the legal process?", // 26
  // If the person is an entity Section 10 (e)
  "Is a person the owner, president, partner, manager, or a responsible officer of the corporation, partnership, association, club, establishment, or any juridical person that participated in the commission of the crime or knowingly permitted or failed to prevent its commission?",
  // If the person is a foreigner Section 10(g)
  "Is the person a foreigner?",
  // User of trafficked persons // Section 11
  "Did the person knowingly engaged the services of an individual who was trafficked for the purpose of prostitution?",
  "Did the person engage in the use of trafficked persons for prostitution more than once?",
  // "Is a syndicate"
  "Is the person involved operate as part of a syndicate?",
  "Did the person order a closed-door investigation to conceal the privacy of the trafficked person or the accused during the proceedings?",
  "Did the person fail to recognize the right to privacy of the trafficked person and the accused at any stage of the investigation?",
  "Did the person disclose personal information about the trafficked person or the accused to the public during the trial?",
  "Did the person neglect to consider the best interests of the parties before deciding on confidentiality measures?",
  "Did the person allow the identities and personal circumstances of the trafficked person or the accused to be publicly known throughout the legal process?", // 26
];

let crime_desc = [
  "Human Trafficking is the illegal act of recruiting, transporting, or harboring people through coercion, deceit, or force for purposes of exploitation, such as forced labor, sexual exploitation, or involuntary servitude. It is a severe violation of human rights and involves both domestic and international trafficking.",

  "Promotion of Human Trafficking refers to the act of recruiting, providing, or offering individuals to traffickers with the intent of exploiting them. This includes activities such as advertisement, facilitation, or profiting from trafficking, which are punishable under the law.",
  "Qualified Trafficking involves the trafficking of individuals under specific aggravating circumstances, such as when the victim is a minor or the trafficking involves more than one victim. This is treated more severely under Philippine law and carries harsher penalties.",

  "Qualified Trafficking involves the trafficking of individuals under specific aggravating circumstances, such as when the victim is a minor or the trafficking involves more than one victim. This is treated more severely under Philippine law and carries harsher penalties.",

  "Breach of Confidentiality (RA 9208) occurs when individuals, agencies, or institutions handling cases of human trafficking disclose confidential information regarding victims, perpetrators, or investigations. This breach is prohibited under Republic Act No. 9208, which protects the privacy and safety of trafficking victims. Violators can face penalties for disclosing sensitive information that may endanger victims or compromise legal proceedings.",
];

function displayQuestion() {
  if (sectionNum == 1) {
    questionText.textContent = trafficking_questions[idx];
  } else if (sectionNum == 2) {
    questionText.textContent = promotion_questions[idx];
  } else if (sectionNum == 3) {
    questionText.textContent = qualified_questions[idx];
  } else if (sectionNum == 4) {
    questionText.textContent = breach_questions[idx];
  }
}

function startTest() {
  isEntity = false;
  isForeigner = false;
  isSyndicate = false;
  useTrafficked = false;
  moreThanOnce = false;
  displayQuestion();
  crimes_committed = [];
  removeResults();
  startBtn.style.display = "none";
  retryBtn.style.display = "none";
  questionText.style.display = "block";
  results.style.display = "none";
  yesBtn.style.display = "inline-block";
  noBtn.style.display = "inline-block";
}

function endTest() {
  idx = 0;
  console.log(crimes_committed);
  questionText.textContent = "";
  questionText.style.display = "none";
  yesBtn.style.display = "none";
  noBtn.style.display = "none";
  header.style.display = "block";
  header.textContent = "Offenses Committed";
  retryBtn.style.display = "inline-block";
  results.style.display = "block";
  addResults();
}

function addResults() {
  if (crimes_committed.length == 0) {
    // Create the main offense div
    console.log("SO PURE BRO");
    const offenseDiv = document.createElement("div");
    offenseDiv.classList.add("offense");

    // Create the h1 element for the crime
    const crimeElement = document.createElement("h1");
    crimeElement.classList.add("no-violations");
    crimeElement.textContent = "No laws violated.";

    // Append the crime and punishment elements to the offense div
    offenseDiv.appendChild(crimeElement);
    // Append the offense div to the offensesContainer
    results.appendChild(offenseDiv);
    return;
  }
  crimes_committed.forEach((offense) => {
    // Create the main offense div
    const offenseDiv = document.createElement("div");
    offenseDiv.classList.add("offense");

    // Create the h1 element for the crime
    const crimeElement = document.createElement("h1");
    crimeElement.classList.add("crime");
    crimeElement.textContent = offense.crime;

    // Create the p element for the punishment
    const punishmentElement = document.createElement("p");
    punishmentElement.classList.add("punishment");

    if (offense.crime == "Use of trafficked Persons") {
      if (moreThanOnce) {
        punishmentElement.textContent = offense.subseqOffense.punishment;
      } else {
        punishmentElement.textContent = offense.firstOffense.punishment;
      }
    } else {
      punishmentElement.textContent = offense.punishment;
    }

    // Append the crime and punishment elements to the offense div
    offenseDiv.appendChild(crimeElement);
    offenseDiv.appendChild(punishmentElement);

    // Append the offense div to the offensesContainer
    results.appendChild(offenseDiv);
    results.appendChild(document.createElement("hr"));
  });
  if (isEntity) {
    const entityParagraph = document.createElement("p");
    entityParagraph.classList.add("conditional", "entity");

    const italicText = document.createElement("i");
    italicText.textContent =
      "The penalty will be imposed on the owner, president, partner, manager, or any responsible officer involved in the crime. The erring agency's SEC registration and operating license will be permanently revoked, and these individuals will be banned from operating similar businesses under a different name.";

    entityParagraph.appendChild(italicText);
    results.appendChild(entityParagraph);
  }

  if (isForeigner) {
    const deportmentDiv = document.createElement("p");
    deportmentDiv.classList.add("conditional", "deportment");
    deportmentDiv.innerHTML = `<em>The offender shall be immediately deported after serving his sentence and be barred permanently from entering the country.</em>`;
    results.appendChild(deportmentDiv);
  }

  const prescriptionPeriod = document.createElement("p");
  prescriptionPeriod.classList.add("conditional", "prescription-period");
  prescriptionPeriod.innerHTML = `<em>The case should be prescribed within ${
    isSyndicate ? 20 : 10
  } years.</em>`;

  results.appendChild(prescriptionPeriod);
}

function removeResults() {
  // Clear all child elements inside the results container
  while (results.firstChild) {
    results.removeChild(results.firstChild);
  }
}

function nextQuestion() {
  idx++;
  displayQuestion();
}

function skipQuestion(num) {
  idx = num;
  displayQuestion();
}

function displayInfoContainer(sectionNumber) {
  sectionNum = sectionNumber;
  header.textContent = crimes_n_punishment[sectionNumber - 1].crime;
  questionText.textContent = crime_desc[sectionNumber];
  infoContainer.style.display = "block";
}

function closeInfoContainer() {
  sectionNum = 1;
  idx = 0;
  isEntity = false; // checks whether penalty is imposed on the responsible owner of a person
  isForeigner = false; // handles the barring of foreigners
  isSyndicate = false; // handles the prescriptive period
  useTrafficked = false;
  moreThanOnce = false;
  yesBtn.style.display = "none";
  noBtn.style.display = "none";
  startBtn.style.display = "block";
  retryBtn.style.display = "none";
  infoContainer.style.display = "none";
  results.style.display = "none";
  removeResults();
  questionText.style.display = "block";
}

function checkAnswer(ans) {
  if (sectionNum == 1) {
    if (idx >= trafficking_questions.length - 1) endTest();
  } else if (sectionNum == 2) {
    if (idx > promotion_questions.length - 1) endTest();
  } else if (sectionNum == 3) {
    if (idx > qualified_questions.length - 1) endTest();
  } else if (sectionNum == 4) {
    if (idx > breach_questions.length - 1) endTest();
  }
  if (ans == true) {
    if (idx <= 2) {
      if (idx == 0) {
        isEntity = true;
      } else if (idx == 1) {
        isForeigner = true;
      } else if (idx == 2) {
        useTrafficked = true;
      }
    }

    if (idx == 3) {
      moreThanOnce = true;
    }
    if (idx > 3) {
      if (sectionNum == 1) {
        console.log("TEST ENDED");
        crimes_committed.push(crimes_n_punishment[0]);
        endTest();
        return;
      } else if (sectionNum == 2) {
        console.log("TEST ENDED");
        crimes_committed.push(crimes_n_punishment[1]);
        endTest();
        return;
      } else if (sectionNum == 3) {
        console.log("TEST ENDED");
        crimes_committed.push(crimes_n_punishment[2]);
        endTest();
        return;
      } else if (sectionNum == 4) {
        console.log("TEST ENDED");
        crimes_committed.push(crimes_n_punishment[3]);
        endTest();
        return;
      }
    }
  }

  nextQuestion();
}
