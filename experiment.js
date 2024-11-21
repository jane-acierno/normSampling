// DEFINE GLOBAL VARIABLES
let timeline = [];

// jsPsych Initialization
const jsPsych = initJsPsych({
  use_webaudio: false,
  display_element: 'jspsych-target',
  show_progress_bar: true,
  default_iti: 0,
  on_finish: function (data) {
    jsPsych.data.displayData('csv');
  }
});

const participantId = jsPsych.data.getURLVariable('PROLIFIC_PID');
const studyId = jsPsych.data.getURLVariable('STUDY_ID');
const sessionId = jsPsych.data.getURLVariable('SESSION_ID');

// Random assignment of manipulations
// Injunctive vs. Descriptive
const normManipulation = jsPsych.randomization.sampleWithoutReplacement(['injunctive', 'descriptive'], 1)[0];

// Political vs. Non-Political
const politicalManipulation = jsPsych.randomization.sampleWithoutReplacement(['present', 'absent'], 1)[0];

// High vs. Low Contribution
const contributionManipulation = jsPsych.randomization.sampleWithoutReplacement(['high', 'low'], 1)[0];

// Concatenate individual manipulation outcomes to create composite condition variable
const condition = normManipulation + "_" + politicalManipulation + "_" + contributionManipulation;


// const filename = `${participantId}` + "_" + `${studyId}` + "_" + `${sessionId}.csv`;
const filename = "debug3.csv"

jsPsych.data.addProperties({
  participantId: participantId,
  studyId: studyId,
  sessionId: sessionId,
  conditionNorm: normManipulation,
  conditionPolitical: politicalManipulation,
  conditionContribution: contributionManipulation
});

// Options
const valueOpinionOptions = ['Yes', 'Somewhat', 'No'];

// Political Ideology
const politicalResponses = [
  "1 = Extremely liberal",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7 = Extremely conservative",
];

// Experimenter Demand Effects
const demandEffectsResponses = [
  "1 = Not at all",
  "2",
  "3",
  "4",
  "5 = Very much so"
];

// ENTER FULLSCREEN //
const enterFullscreen = {
  type: jsPsychFullscreen,
  name: 'enter_fullscreen',
  fullscreen_mode: true,
  delay_after: 0
};

timeline.push(enterFullscreen)

// CONSENT FORM //
const consentForm = {
  type: jsPsychSurveyMultiChoice,
  questions: [
    {
      name: 'consent',
      prompt: `
            <p style="text-align:left;">
              You are being asked to participate in a research study titled 
              "Social Judgment and Decision-Making." You were selected to participate in 
              this project because you are an adult over age 18. This study is sponsored by 
              Boston College and the John Templeton Foundation.
            </p>
            <p style="text-align: left;">
              The purpose of this study is to understand how we weigh information about 
              others. This study will be conducted through this online survey. The survey 
              should take you between 15–45 minutes to complete. There are no direct 
              benefits to you, but you may feel gratified knowing that you helped further 
              the scholarly work in this research area, and we will compensate you for your 
              participation at a rate of $9.00/hour. In some cases, we will ask you about 
              your opinions; in other cases, we will ask you to try to answer questions and 
              prompts accurately. When we ask for the latter, we will also provide 
              additional compensation for each correct response. That rate will be $0.05 
              per correct response. There are no costs to you associated with your 
              participation.
            </p>
            <p style="text-align: left;">
              The researchers do not believe participation would entail any risks or 
              discomforts beyond those ordinarily encountered in everyday life.
            </p>
            <p style="text-align: left;">
              This Principal Investigator, Dr. Liane Young, will exert all reasonable efforts 
              to keep your responses and your identity confidential. We will not maintain 
              within our research data any information that uniquely identifies you, such as 
              your name, location, or Internet Protocol (IP) address. In any report we 
              publish, we will not include any information that will make it possible to 
              identify a participant. Data that includes user-ID information will be collected 
              and stored via third-party servers like Qualtrics or Pavlovia. Data collected 
              from the experiment will be coded to remove your name or any other 
              personal identifiers. All records will be secured in a locked cabinet in our lab. 
              The Institutional Review Board at Boston College and internal Boston College 
              auditors may review the research records. State or federal laws or court 
              orders may also require that information from research study records be 
              released. Otherwise, the researchers will not release to others any 
              information that could indicate your identity unless you give your permission, 
              or unless the researchers become legally required to do so.
            </p>
            <p style="text-align: left;">
              Although the survey will not prompt you directly to identify yourself by 
              name, email address or the like, the survey will include several demographic 
              items that would prompt you to provide certain demographic information, 
              such as your age, gender, ethnicity, education level and the like. In 
              combination, responses to such questions could suggest your identity. 
              Regardless, please know that the researchers will make no purposeful effort 
              to discern your identity based on such information. Additionally, please note 
              that you may opt to leave any such questions blank.
            </p>
            <p style="text-align: left;">
              Your participation is voluntary. If you choose not to participate it will not 
              affect your relations with Boston College. Some questions on the survey, 
              such as comprehension questions, may be required in order to complete the 
              survey and receive compensation. However, you may still choose to end 
              your participation in the study at any time. If you have questions or concerns 
              concerning this research you may contact the Principal Investigator at 
              <a href="tel:16175520240">+1 (617) 552-0240</a>
              or <a href="mailto:liane.young@bc.edu">liane.young@bc.edu</a>. If you have 
              questions about your rights as a research participant, you may contact the
              Office for Research Protections, Boston College, at 
              <a href="tel:16175524778">+1 (617) 552-4778</a> or
              <a href="mailto:irb@bc.edu">irb@bc.edu</a>.
            </p>
            <p style="text-align: left;">
              If you agree to the statements above and agree to participate in this study,
              please select the “Consent given” button below to continue.
            </p>`,
      options: ["Consent not given", "Consent given"],
      horizontal: true,
      required: true
    }
  ],
  preamble: '<h2 style="text-align: center"><strong>Consent Form</strong></h2>',

  // If the participant does not consent, end the experiment
  on_finish: function (data) {
    if (jsPsych.data.get().last(1).values()[0].response.consent == "Consent not given") {
      jsPsych.endExperiment(
        `<p class="jspsych-center">
          You did not consent to participate in this study.<br>
          Please return this study in Prolific.
        </p>`
      );
    }
  }
};

timeline.push(consentForm);


// GAME INSTRUCTIONS //
const instructionsGame = {
  type: jsPsychInstructions,
  pages: [`
        <h2><strong>Instructions</strong></h2>
        <p style="text-align: left;">
          Thank you for taking our study!
        </p>
        <p style="text-align: left;">
          In this study you are going to play a game. The game has only one round. 
          You will be matched with three other players, making a group of four. 
          The other players will be selected at random from a nationally representative sample of Americans.
        </p>
        <p style="text-align: left;">
          You and the other players in your group will each receive a 500 point endowment. 
          500 points is equal to $0.50. In this game, there is a common pool. 
          You can contribute any amount of your endowment, from 0 to 500 points, to the common pool. 
          Any contributions that you and your fellow group members make to the pool will be added together and doubled, 
          and then split evenly among the four of you. Any amount you decide to keep for yourself will not be doubled 
          or split among other players. The amount you keep and the amount that gets redistributed from the common pool 
          will be added up, translated into cash (500 points = $0.50), and paid to you as a bonus payment at the end of the game.
        </p>`,

    `<h2><strong>Instructions</strong></h2>
      <p style="text-align: left;">
        Here are some example gameplays.
      </p>
      <ul style="text-align: left;">
        <li>
          If everyone contributes their entire endowments to the common pool,
          everyone will end the game with 1000 points ($1).
        </li>
        <li>
          If no one contributes to the common pool, 
          everyone will end the game with 500 points ($0.50).
        </li>
        <li>
          If you do not contribute anything and the other players contribute their full endowments to the pool,
          they will each end the game with 750 points ($0.75) and you will end the game with 1250 points ($1.25).
        </li>
        <li>
          If you contribute your full endowment and the other players do not contribute anything to the pool, 
          you will end the game with 250 points ($0.25) and the other players will each end the game with 750 points ($0.75).
        </li>
      </ul>
      <p style="text-align: left;">
        These are only examples and for simplicity we explained cases where people contribute all or nothing, 
        but you are free to contribute any fraction of your endowment to the pool that you wish!
      </p>`
  ],
  show_clickable_nav: true,
};


const instructionsGameCompCheck = {
  type: jsPsychSurveyMultiChoice,
  questions: [
    {
      name: 'game_comp_check_1',
      prompt: '<strong><i class="fa-solid fa-circle-question"></i>&nbsp;&nbsp;What factor will any contributions to the common pool be multiplied by?</strong>',
      options: [
        "0.5x (halved)",
        "1x (no change)",
        "2x (doubled)",
        "3x (tripled)"
      ],
      correct: '2x (doubled)',
      hint: `That's not quite right.`,
      required: true,
    },
    {
      name: 'game_comp_check_2',
      prompt: `
            <strong>
              <i class="fa-solid fa-circle-question"></i>&nbsp;&nbsp;
              How will money in the common pool be distributed at the end of the game?
            </strong>`,
      options: [
        "You get it all (the other players get nothing)",
        "It is randomly split four ways",
        "It is evenly split four ways",
        "The other players split it (you get nothing)"
      ],
      correct: 'It is evenly split four ways',
      hint: `That's not quite right.`,
      required: true,
    },
    {
      name: 'game_comp_check_3',
      prompt: `
            <strong>
              <i class="fa-solid fa-circle-question"></i>&nbsp;&nbsp;
              What factor will any amount that you do not 
              contribute to the common pool be multiplied by?
            </strong>`,
      options: [
        "0.5x (halved)",
        "1x (no change)",
        "2x (doubled)",
        "3x (tripled)"
      ],
      correct: '1x (no change)',
      hint: `That's not quite right.`,
      required: true,
    },
    {
      name: 'game_comp_check_4',
      prompt: `
            <strong>
              <i class="fa-solid fa-circle-question"></i>&nbsp;&nbsp;
              How will your winnings be determined?
            </strong>`,
      options: [
        "the amount you kept + the amount you contributed",
        "the amount you kept + (2 x the amount you contributed)",
        "the amount you kept + the total amount in the common pool",
        "the amount you kept + (2 x the total amount in the common pool / 4)"
      ],
      correct: 'the amount you kept + (2 x the total amount in the common pool / 4)',
      hint: `That's not quite right.`,
      required: true,
    },
  ],
  preamble:
    `<h2 style="text-align: center;">Instructions Review</h2> 
    <p style="text-align: left;"> 
      Just to make sure you understand how the game works, please answer the following questions.
    </p>`,
};

// Game instructions
timeline.push(instructionsGame, instructionsGameCompCheck);


// ID INJUNCTIVE SAMPLING INSTRUCTIONS //
const instructionsInjunctiveID = {
  type: jsPsychInstructions,
  pages: [`
        <p style="text-align: left;">
          Before you play the game you will get to view the opinions of the previous players on how they think people should play the game. 
          For that study, we made sure to recruit a nationally representative sample of Americans. 
          Today you will have the chance to view some of their responses.
        </p>
        <p style="text-align: left;">
          Previous participants' political affiliation is indicated through blue and red circles around their avatars. 
          Blue circles indicate democrats and red circles indicate republicans.
        </p>
        <p style="text-align: left;">
          On the next page you will see avatars representing the people who participated in that study, 
          with blue or red circles indicating political party affiliation (blue for democrats, red for republicans). 
          Every time you click on an avatar, you will see the amount that that one person thinks others should contribute. 
          You can view the contributions of as many people as you'd like before playing the game yourself.
        </p>`
  ],
  show_clickable_nav: true,
};

// NO ID INJUNCTIVE SAMPLING INSTRUCTIONS //
const instructionsInjunctiveNoID = {
  type: jsPsychInstructions,
  pages: [`
        <p style="text-align: left;">
          Before you play the game you will get to view the opinions of the previous players on how they think people should play the game. 
          For that study, we made sure to recruit a nationally representative sample of Americans. 
          Today you will have the chance to view some of their responses.
        </p>
        <p style="text-align: left;">
          On the next page you will see avatars representing the people who participated in that study. 
          Every time you click on an avatar, you will see the amount that that one person thinks others should contribute. 
          You can view the contributions of as many people as you'd like before playing the game yourself.
        </p>`
  ],
  show_clickable_nav: true,
};

// NO ID DESCRIPTIVE SAMPLING INSTRUCTIONS //
const instructionsDescriptiveNoID = {
  type: jsPsychInstructions,
  pages: [`
        <p style="text-align: left;">
          Before you play the game you will get to view the contributions of the previous players. 
          For that study, we made sure to recruit a nationally representative sample of Americans. 
          Today you will have the chance to view some of their contributions.
        </p>
        <p style="text-align: left;">
          On the next page you will see avatars representing the people who participated in that study, 
          Every time you click on an avatar, you will see the amount that that one person contributed. 
          You can view the contributions of as many people as you'd like before playing the game yourself.
        </p>`
  ],
  show_clickable_nav: true,
};

// ID DESCRIPTIVE SAMPLING INSTRUCTIONS //
const instructionsDescriptiveID = {
  type: jsPsychInstructions,
  pages: [`
        <p style="text-align: left;">
          Before you play the game you will get to view the contributions of the previous players. 
          For that study, we made sure to recruit a nationally representative sample of Americans. 
          Today you will have the chance to view some of their contributions.
        </p>
        <p style="text-align: left;">
            Previous participants' political affiliation is indicated through blue and red circles around their avatars. 
            Blue circles indicate democrats and red circles indicate republicans.
        </p>
        <p style="text-align: left;">
          On the next page you will see avatars representing the people who participated in that study, 
          with blue or red circles indicating political party affiliation (blue for democrats, red for republicans). 
          Every time you click on an avatar, you will see the amount that that one person contributed. 
          You can view the contributions of as many people as you'd like before playing the game yourself.
        </p>`
  ],
  show_clickable_nav: true,
};


// PUSH
if (normManipulation === 'descriptive' && politicalManipulation === 'present') {
  timeline.push(
    instructionsDescriptiveID,
    // instructionsDescriptiveIDComprehensionCheck
  );
} else if (normManipulation === 'descriptive' && politicalManipulation === 'absent') {
  timeline.push(
    instructionsDescriptiveNoID,
    // instructionsDescriptiveNoIDComprehensionCheck
  );
} else if (normManipulation === 'injunctive' && politicalManipulation === 'present') {
  timeline.push(
    instructionsInjunctiveID,
    // instructionsInjunctiveIDComprehensionCheck
  );
} else if (normManipulation === 'injunctive' && politicalManipulation === 'absent') {
  timeline.push(
    instructionsInjunctiveNoID,
    // instructionsInjunctiveNoIDComprehensionCheck
  );
}


function selectionTask(normManipulation, politicalManipulation, contributionManipulation, avatarDictionary) {
  return {
    type: jsPsychSelectionLearning,
    avatars: avatarDictionary,
    conditionNorm: normManipulation,
    conditionPolitical: politicalManipulation,
    conditionContribution: contributionManipulation,
    choices: [
      "<i class='fa-solid fa-rotate-left'></i>&nbsp;&nbsp;Continue sampling",
      "<i class='fa-solid fa-circle-check' style='color: green'></i>&nbsp;&nbsp;I'm all done"
    ],
    choicesOnFinish: [
      "<i class='fa-solid fa-arrow-left'></i>&nbsp;&nbsp;Review",
      "<i class='fa-solid fa-circle-check' style='color: green'></i>&nbsp;&nbsp;I'm all done"
    ]
  };
};

const avatarNames = Array.from({ length: 100 }, (_, i) => "avatar" + i);
const avatarPhotos = Array.from({ length: 100 }, (_, i) => `./avatars/avatar${i + 1}.webp`);

let avatarDictionary = {};

for (let i = 0; i < 100; i++) {
  let avatarData = { avatar: avatarPhotos[i] };
  avatarDictionary[avatarNames[i + 1]] = avatarData;

  let avatarName = 'image' + i;
  let avatar = avatarDictionary[avatarNames[i + 1]].image;

  selectionTask = Object.assign(selectionTask, { [avatarName]: avatar });
};

// Sampling Task
timeline.push(selectionTask())


const contributionPGG = {
  type: jsPsychSurveyHtmlForm,
  preamble: `
    <p>Now it is time to play the game.</p>
    <p>You have received 500 points. In the upcoming days you will be randomly grouped with 3 other participants, 
    forming a group of 4. The other 3 participants will have also received 500 points each.</p>
    <p>Your task is to decide how much money to transfer to the 'common pool'. 
    You can transfer any amount from 0 to 500 points, including 0 and 500. 
    Each of the other 3 participants will make a decision about their transfer to the common pool.</p>
    <p>After all 4 participants in your group have reached a decision, 
    the transfers to the common pool are summed. Then, this sum is doubled. 
    Finally, the doubled sum in the common pool is divided equally between the 4 participants in your group. 
    You will receive your payoff in the upcoming days.</p>
    <p>Please indicate in the box below how many points to transfer to the common pool.</p>
    <br>Your contribution to the common pool:<br>
  `,
  html: `
    <div class="jspsych-survey-multi-choice-question">
      <label for="contribution">Your contribution to the common pool:</label><br>
      <input 
        type="number" 
        id="contribution" 
        name="contribution" 
        min="0" 
        max="500" 
        style="padding: 5px; width: 60px;" 
        required
        oninput="this.classList.remove('incomplete');"
      >
    </div>
  `,
  button_label: 'Next',
  on_finish: function (data) {
    const contribution = Number(data.response.contribution);

    // Safeguard: Ensure a valid contribution is logged
    const contributionPGGData = {
      contribution: isNaN(contribution) ? 0 : contribution
    };

    // Add the data to the current trial's node
    jsPsych.data
      .getDataByTimelineNode(jsPsych.getCurrentTimelineNodeID())
      .addToAll(contributionPGGData);
  }
};

// Add the task to the timeline
timeline.push(contributionPGG);


// DEMOGRAPHICS //
const demographicsQuestions = {
  type: jsPsychSurveyHtmlForm,
  preamble:
    `<p class="jspsych-survey-multi-choice-preamble">
      Using the scales provided, please respond to each question about you as an individual:
    </p>`,
  html: `
        <!-- Age -->

        <div class="jspsych-survey-multi-choice-question">
          <label for="age">How old are you?</label><br>
          <input 
            type="number" 
            id="age" 
            name="age" 
            min="18" max="100" 
            style="padding: 5px; width: 40px;" 
            class="incomplete"
            oninput="this.classList.remove('incomplete');"
          >
        </div>
        

        <!-- Race/Ethnicity -->

        <div class="jspsych-survey-multi-choice-question">
          <legend>Please indicate how you identify yourself:</legend>
          <div class="jspsych-survey-multi-choice-option">
            <input 
              type="checkbox" 
              id="race-ethnicity-indigenous" 
              name="race-ethnicity-indigenous" 
              value="Indigenous American or Alaskan Native" 
              class="demographics-race-ethnicity incomplete"
              oninput="
                let demographicsRaceEthnicity = document.querySelectorAll(
                  '.demographics-race-ethnicity'
                );
                for (let i = 0; i < demographicsRaceEthnicity.length; i++) {
                  demographicsRaceEthnicity[i].classList.remove('incomplete');
                };
              "
            >
            <label for="race-ethnicity-indigenous">Indigenous American or Alaskan Native</label>
          </div>
          <div class="jspsych-survey-multi-choice-option">
            <input 
              type="checkbox" 
              id="race-ethnicity-asian" 
              name="race-ethnicity-asian" 
              value="Asian or Asian-American" 
              class="demographics-race-ethnicity incomplete"
              oninput="
                let demographicsRaceEthnicity = document.querySelectorAll(
                  '.demographics-race-ethnicity'
                );
                for (let i = 0; i < demographicsRaceEthnicity.length; i++) {
                  demographicsRaceEthnicity[i].classList.remove('incomplete');
                };
              "
            >
            <label for="race-ethnicity-asian">Asian or Asian-American</label>
          </div>
          <div class="jspsych-survey-multi-choice-option">
            <input 
              type="checkbox" 
              id="race-ethnicity-black" 
              name="race-ethnicity-black" 
              value="African or African-American" 
              class="demographics-race-ethnicity incomplete"
              oninput="
                let demographicsRaceEthnicity = document.querySelectorAll(
                  '.demographics-race-ethnicity'
                );
                for (let i = 0; i < demographicsRaceEthnicity.length; i++) {
                  demographicsRaceEthnicity[i].classList.remove('incomplete');
                };
              "
            >
            <label for="race-ethnicity-black">African or African-American</label>
          </div>
          <div class="jspsych-survey-multi-choice-option">
            <input 
              type="checkbox" 
              id="race-ethnicity-native" 
              name="race-ethnicity-native" 
              value="Native Hawaiian or Pacific Islander" 
              class="demographics-race-ethnicity incomplete"
              oninput="
                let demographicsRaceEthnicity = document.querySelectorAll(
                  '.demographics-race-ethnicity'
                );
                for (let i = 0; i < demographicsRaceEthnicity.length; i++) {
                  demographicsRaceEthnicity[i].classList.remove('incomplete');
                };
              "
            >
            <label for="race-ethnicity-native">Native Hawaiian or other Pacific Islander</label>
          </div>
          <div class="jspsych-survey-multi-choice-option">
            <input 
              type="checkbox" 
              id="race-ethnicity-white" 
              name="race-ethnicity-white" 
              value="White" 
              class="demographics-race-ethnicity incomplete"
              oninput="
                let demographicsRaceEthnicity = document.querySelectorAll(
                  '.demographics-race-ethnicity'
                );
                for (let i = 0; i < demographicsRaceEthnicity.length; i++) {
                  demographicsRaceEthnicity[i].classList.remove('incomplete');
                };
              "
            >
            <label for="race-ethnicity-white">White</label>
          </div>
          <div class="jspsych-survey-multi-choice-option">
            <input 
              type="checkbox" 
              id="race-ethnicity-hispanic" 
              name="race-ethnicity-hispanic" 
              value="Hispanic/Latino/a/e/x" 
              class="demographics-race-ethnicity incomplete"
              oninput="
                let demographicsRaceEthnicity = document.querySelectorAll(
                  '.demographics-race-ethnicity'
                );
                for (let i = 0; i < demographicsRaceEthnicity.length; i++) {
                  demographicsRaceEthnicity[i].classList.remove('incomplete');
                };
              "
            >
            <label for="race-ethnicity-hispanic">Hispanic/Latino/a/e/x</label>
          </div>
          <div class="jspsych-survey-multi-choice-option">
            <input 
              type="checkbox" 
              id="race-ethnicity-other" 
              name="race-ethnicity-other" 
              value="Other" 
              class="demographics-race-ethnicity incomplete"
              oninput="
                let demographicsRaceEthnicity = document.querySelectorAll(
                  '.demographics-race-ethnicity'
                );
                for (let i = 0; i < demographicsRaceEthnicity.length; i++) {
                  demographicsRaceEthnicity[i].classList.remove('incomplete');
                };
              "
            >
            <label for="race-ethnicity-other">Other</label>
          </div>
          <div class="jspsych-survey-multi-choice-option">
            <input 
              type="checkbox"
              id="race-ethnicity-prefer-not" 
              name="race-ethnicity-prefer-not" 
              value="Prefer not to disclose" 
              class="demographics-race-ethnicity incomplete"
              oninput="
                let demographicsRaceEthnicity = document.querySelectorAll(
                  '.demographics-race-ethnicity'
                );
                for (let i = 0; i < demographicsRaceEthnicity.length; i++) {
                  demographicsRaceEthnicity[i].classList.remove('incomplete');
                };
              "
            >
            <label for="race-ethnicity-prefer-not">Prefer not to disclose</label>
          </div>
        </div>


        <!-- Gender -->
        
        <div class="jspsych-survey-multi-choice-question">
          <legend>With which gender do you most closely identify?</legend>
          <div class="jspsych-survey-multi-choice-option">
            <input 
              type="radio" 
              id="gender-man" 
              name="gender" 
              value="Man" 
              class="demographics-gender incomplete"
              oninput="
                let demographicsGender = document.querySelectorAll(
                  '.demographics-gender'
                );
                for (let i = 0; i < demographicsGender.length; i++) {
                  demographicsGender[i].classList.remove('incomplete');
                };
              "
            >
            <label for="gender-man">Man</label>
          </div>
          <div class="jspsych-survey-multi-choice-option">
            <input 
              type="radio" 
              id="gender-woman" 
              name="gender" 
              value="Woman" 
              class="demographics-gender incomplete"
              oninput="
                let demographicsGender = document.querySelectorAll(
                  '.demographics-gender'
                );
                for (let i = 0; i < demographicsGender.length; i++) {
                  demographicsGender[i].classList.remove('incomplete');
                };
              "
            >
            <label for="gender-woman">Woman</label>
          </div>
          <div class="jspsych-survey-multi-choice-option">
            <input 
              type="radio" 
              id="gender-non-binary" 
              name="gender" 
              value="Non-binary" 
              class="demographics-gender incomplete"
              oninput="
                let demographicsGender = document.querySelectorAll(
                  '.demographics-gender'
                );
                for (let i = 0; i < demographicsGender.length; i++) {
                  demographicsGender[i].classList.remove('incomplete');
                };
              "
            >
            <label for="gender-non-binary">Non-binary</label>
          </div>
          <div class="jspsych-survey-multi-choice-option">
            <input 
              type="radio" 
              id="gender-other" 
              name="gender" 
              value="Other" 
              class="demographics-gender incomplete"
              oninput="
                let demographicsGender = document.querySelectorAll(
                  '.demographics-gender'
                );
                for (let i = 0; i < demographicsGender.length; i++) {
                  demographicsGender[i].classList.remove('incomplete');
                };
              "
            >
            <label for="gender-other">Other</label>
          </div>
          <div class="jspsych-survey-multi-choice-option">
            <input 
              type="radio" 
              id="gender-prefer-not" 
              name="gender" 
              value="Prefer not to disclose" 
              class="demographics-gender incomplete"
              oninput="
                let demographicsGender = document.querySelectorAll(
                  '.demographics-gender'
                );
                for (let i = 0; i < demographicsGender.length; i++) {
                  demographicsGender[i].classList.remove('incomplete');
                };
              "
            >
            <label for="gender-prefer-not">Prefer not to disclose</label>
          </div>
        </div>


        <!-- Education -->
        
        <div class="jspsych-survey-multi-choice-question">
          <legend>
            What is the highest level of education you have received? 
            (If you are currently enrolled in school, please indicate the highest degree you have received)
          </legend>
          <div class="jspsych-survey-multi-choice-option">
            <input 
              type="radio" 
              id="education-less-high-school" 
              name="education" 
              value="Less than a high school diploma" 
              class="demographics-education incomplete"
              oninput="
                let demographicsEducation = document.querySelectorAll(
                  '.demographics-education'
                );
                for (let i = 0; i < demographicsEducation.length; i++) {
                  demographicsEducation[i].classList.remove('incomplete');
                };
              "
            >
            <label for="education-less-high-school">
              Less than a high school diploma
            </label>
          </div>

          <div class="jspsych-survey-multi-choice-option">
            <input 
              type="radio" 
              id="education-high-school" 
              name="education" 
              value="High school degree or equivalent (e.g. GED)" 
              class="demographics-education incomplete"
              oninput="
                let demographicsEducation = document.querySelectorAll(
                  '.demographics-education'
                );
                for (let i = 0; i < demographicsEducation.length; i++) {
                  demographicsEducation[i].classList.remove('incomplete');
                };
              "
            >
            <label for="education-high-school">
              High school degree or equivalent (e.g. GED)
            </label>
          </div>

          <div class="jspsych-survey-multi-choice-option">
            <input 
              type="radio" 
              id="education-some-college" 
              name="education" 
              value="Some college, no degree" 
              class="demographics-education incomplete"
              oninput="
                let demographicsEducation = document.querySelectorAll(
                  '.demographics-education'
                );
                for (let i = 0; i < demographicsEducation.length; i++) {
                  demographicsEducation[i].classList.remove('incomplete');
                };
              "
            >
            <label for="education-some-college">
              Some college, no degree
            </label>
          </div>

          <div class="jspsych-survey-multi-choice-option">
            <input 
              type="radio" 
              id="education-associate" 
              name="education" 
              value="Associate Degree (e.g. AA, AS)" 
              class="demographics-education incomplete"
              oninput="
                let demographicsEducation = document.querySelectorAll(
                  '.demographics-education'
                );
                for (let i = 0; i < demographicsEducation.length; i++) {
                  demographicsEducation[i].classList.remove('incomplete');
                };
              "
            >
            <label for="education-associate">
              Associate Degree (e.g. AA, AS)
            </label>
          </div>

          <div class="jspsych-survey-multi-choice-option">
            <input 
              type="radio" 
              id="education-bachelors" 
              name="education" 
              value="Bachelor's Degree (e.g. BA, BS)" 
              class="demographics-education incomplete"
              oninput="
                let demographicsEducation = document.querySelectorAll(
                  '.demographics-education'
                );
                for (let i = 0; i < demographicsEducation.length; i++) {
                  demographicsEducation[i].classList.remove('incomplete');
                };
              "
            >
            <label for="education-bachelors">
              Bachelor's Degree (e.g. BA, BS)
            </label>
          </div>
          
          <div class="jspsych-survey-multi-choice-option">
            <input 
              type="radio" 
              id="education-postgraduate" 
              name="education" 
              value="Postgraduate Degree (e.g. Master's Degree, Professional Degree, Doctorate Degree)" 
              class="demographics-education incomplete"
              oninput="
                let demographicsEducation = document.querySelectorAll(
                  '.demographics-education'
                );
                for (let i = 0; i < demographicsEducation.length; i++) {
                  demographicsEducation[i].classList.remove('incomplete');
                };
              "
            >
            <label for="education-postgraduate">
              Postgraduate Degree (e.g. Master's Degree, Professional Degree, Doctorate Degree)
            </label>
          </div>
        </div>
        
        <style id="jspsych-survey-multi-choice-css">
          .jspsych-survey-multi-choice-question { 
            margin-top: 2em; 
            margin-bottom: 2em; 
            text-align: left; 
          } .jspsych-survey-multi-choice-option { 
            font-size: 10pt; 
            line-height: 2; 
          } .jspsych-survey-multi-choice-horizontal 
            .jspsych-survey-multi-choice-option { 
            display: inline-block; 
            margin-left: 1em; 
            margin-right: 1em; 
            vertical-align: top; 
            text-align: center; 
          } label.jspsych-survey-multi-choice-text input[type='radio'] {
            margin-right: 1em;
          }
        </style>
      `,
  button_label: 'Next',
  request_response: true,
  on_finish: function (data) {
    let demographicsData = data.response;

    // Age
    const age = Number(demographicsData['age']);

    // Gender
    let gender = '';
    if (demographicsData['gender-man']) {
      gender = 'Man';
    } else if (demographicsData['gender-woman']) {
      gender = 'Woman';
    } else if (demographicsData['gender-non-binary']) {
      gender = 'Non-Binary';
    } else if (demographicsData['gender-other']) {
      gender = 'Other';
    }

    // Create a new object with the formatted data
    demographicsData = {
      age: age,
      race_ethnicity_indigenous: demographicsData['race-ethnicity-indigenous'],
      race_ethnicity_asian: demographicsData['race-ethnicity-asian'],
      race_ethnicity_black: demographicsData['race-ethnicity-black'],
      race_ethnicity_native: demographicsData['race-ethnicity-native'],
      race_ethnicity_white: demographicsData['race-ethnicity-white'],
      race_ethnicity_hispanic: demographicsData['race-ethnicity-hispanic'],
      race_ethnicity_other: demographicsData['race-ethnicity-other'],
      race_ethnicity_na: demographicsData['race-ethnicity-prefer-not'],
      gender: gender
    };

    jsPsych.data
      .getDataByTimelineNode(jsPsych.getCurrentTimelineNodeID())
      .addToAll(demographicsData);
  }
};

timeline.push(demographicsQuestions);


const politicsQuestions = {
  type: jsPsychSurveyMultiChoice,
  questions: [
    {
      name: 'political-ideology-economic',
      prompt: `
            <p class="jspsych-survey-multi-choice-question">
              Which response best captures your political beliefs surrounding <strong>economic</strong> issues?
            </p>`,
      options: politicalResponses,
      horizontal: true
    },
    {
      name: 'political-ideology-social',
      prompt: `
            <p class="jspsych-survey-multi-choice-question">
              Which response best captures your political beliefs surrounding <strong>social</strong> issues?
            </p>`,
      options: politicalResponses,
      horizontal: true
    },
    {
      name: 'political-ideology-overall',
      prompt: `
            <p class="jspsych-survey-multi-choice-question">
              Which response best captures your <strong>overall</strong> political beliefs?
            </p>`,
      options: politicalResponses,
      horizontal: true
    }
  ],
  preamble: `
        <p class="jspsych-survey-multi-choice-preamble">
          Please answer the following questions about your political ideology:
        </p>`,
  request_response: true,
  on_finish: function (data) {
    let politicalData = data.response;

    politicalData = {
      political_ideology_economic: politicalData['political-ideology-economic'],
      political_ideology_social: politicalData['political-ideology-social'],
      political_ideology_overall: politicalData['political-ideology-overall']
    };

    jsPsych.data
      .getDataByTimelineNode(jsPsych.getCurrentTimelineNodeID())
      .addToAll(politicalData);
  }
};

timeline.push(politicsQuestions);


const demandEffectsQuestions = {
  type: jsPsychSurveyMultiChoice,
  questions: [
    {
      name: 'pressure',
      prompt:
        `<p class="jspsych-survey-multi-choice-question">
            Did you feel pressure to respond in a particular way to any of the questions?
          </p>`,
      options: demandEffectsResponses,
      horizontal: true
    },
    {
      name: 'judgment',
      prompt:
        `<p class="jspsych-survey-multi-choice-question">
            Did you feel as though you might be judged for your responses to the questions you answered?
          </p>`,
      options: demandEffectsResponses,
      horizontal: true
    }
  ],
  randomize_question_order: true,
  request_response: true,
  scale_width: 500,
  preamble:
    `<p class="jspsych-survey-multi-choice-preamble">
        For these final questions, please answer as honestly as you can.
        The answers to these questions will <strong>not</strong> affect whether or not you receive credit/payment for participation!
      </p>`,
  on_finish: function (data) {
    let demandEffectsData = data.response;

    demandEffectsData = {
      pressure: demandEffectsData['pressure'],
      judgment: demandEffectsData['judgment']
    };

    jsPsych.data
      .getDataByTimelineNode(jsPsych.getCurrentTimelineNodeID())
      .addToAll(demandEffectsData);
  }
};

timeline.push(demandEffectsQuestions);


// Guess Study Purpose / Questions + Comments
const feedback = {
  type: jsPsychSurveyText,
  questions: [
    {
      name: 'guess-study-purpose',
      prompt: 'What do you think this study was about?',
      columns: 100,
      rows: 10
    },
    {
      name: 'feedback',
      prompt: 'Do you have any additional comments? We appreciate any and all feedback!',
      columns: 100,
      rows: 10
    }
  ],
  on_finish: function (data) {
    let purposeFeedbackData = data.response;

    purposeFeedbackData = {
      guess_study_purpose: purposeFeedbackData['guess-study-purpose'],
      feedback: purposeFeedbackData['feedback']
    };

    jsPsych.data
      .getDataByTimelineNode(jsPsych.getCurrentTimelineNodeID())
      .addToAll(purposeFeedbackData);
  }
}

timeline.push(feedback);

// Exit fullscreen
const exitFullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: false,
  delay_after: 0
};

timeline.push(exitFullscreen);

// Choose from among these to relay via DataPipe
const preregisteredExperimentId = "jWr5Nul5HYl2";
const debugExperimentId = "XyR978iH6AOX";

// DataPipe conclude data collection
const save_data = {
  type: jsPsychPipe,
  action: "save",
  experiment_id: debugExperimentId,
  filename: filename,
  data_string: () => jsPsych.data.get().csv(),
  on_finish: function (data) {
    function countdown(start, end) {
      const timer = setInterval(function () {
        if (start <= end) {
          clearInterval(timer);
        } else {
          start--;
          document.getElementById("countdown").innerHTML = start;
        }
      }, 1000);
    }

    countdown(5, 0);

    jsPsych.endExperiment(
      `<p class="jspsych-center">
        Thanks for participating! You will be redirected in <span id="countdown">5</span> seconds.
      </p>`
    );
    setTimeout(function () {
      window.location.href = "https://app.prolific.com/submissions/complete?cc=CNN3F4P4";
    }, 5000)
  }
};

timeline.push(save_data);

// Preload all images
const imageSet = avatarPhotos;

jsPsych.pluginAPI.preloadImages(imageSet, function () {
  startExperiment();
});

// Function to initialize the experiment; will be called once all images are preloaded
function startExperiment() {
  jsPsych.run(timeline);
};