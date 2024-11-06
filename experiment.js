// Add curiosity yes/no TODO: in progress -- wait to receive actual numbers, make in big font
// Debug for nulls
// Create study 1 pipe 
// Wait for Jordan correct redirect number 

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

// Concatenate individual manipulation outcomes to create composi te condition variable
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

// Perspective Taking Empathy (iri)
const iriResponses = [
  "1 = Does not describe me at all",
  "2",
  "3",
  "4",
  "5 = Describes me very well"
];

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

// Personality: Intellectual Humility
const ihResponses = [
  "1 = Not at all\ncharacteristic of me",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7 = Very characteristic\nof me"
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


// DESCRIPTIVE INSTRUCTIONS //
const instructionsDescriptive = {
  type: jsPsychInstructions,
  pages: [`
        <h2><strong>Instructions (1/4)</strong></h2>
        <p style="text-align: left;">
          Welcome to this experiment! In a previous experiment we recruited a <strong> nationally representative 
          sample of Americans </strong> to play a game. The game had only one round. People were matched in groups 
          of four players.
        </p>
        <p style="text-align: left;">
          The players each received 500 point endowments. 500 points is equal to $0.50. In the game there 
          is a public pool. Players were allowed to contribute any amount of their endowment, from 
          0 to 500 points, to the public pool. Any contributions that group members made were added together 
          and doubled, then split evenly among the four players. Any amount that players kept for themselves 
          was not doubled. For each player, the amount that gets redistributed from the common pool was 
          added to the amount they kept, then translated into cash (500 points = $0.50) and paid out as 
          a bonus payment at the end of the game.
        </p>`,

    `<h2><strong>Instructions (2/4)</strong></h2>
        <p style="text-align: left;">
          Today, you will get to view the contibutions of the previous study participants. 
          For that study, we made sure to recruit a nationally representative 
          sample so that the behavior of those participants should accurately represent the behavior of people 
          in the <strong>U.S. more broadly</strong>.
        </p>`,

    `<h2><strong>Instructions (3/4)</strong></h2>
        <p style="text-align: left;">
          Your job is to estimate the average amount of money that people contribute to the common pool.
        </p>`,

    `<h2><strong>Instructions (4/4)</strong></h2>
        <p style="text-align: left;">
          To help you estimate how much other Americans contribute, you will have the opportunity 
          to see the amounts that people in that previous study contributed. You will see 
          randomly generated avatars representing people who participated in that study.
        </p>
        <p style="text-align: left;">
          Every time you click on an avatar, you will see the amount that
          <strong> that one person contributed.</strong> 
          You can view the contributions of as many people as you'd like before making your estimate.
        </p>`
  ],
  show_clickable_nav: true,
};

// INJUNCTIVE INSTRUCTIONS //
const instructionsInjunctive = {
  type: jsPsychInstructions,
  pages: [
    `<h2><strong>Instructions (1/4)</strong></h2>
        <p style="text-align: left;">
          Welcome to this experiment! In a previous experiment we recruited a <strong> nationally representative 
          sample of Americans </strong> to tell us their opinions about a game. The game would have only one round, 
          and people would be matched in groups of four players.
        </p>
        <p style="text-align: left;">
          The players would each received 500 point endowments. 500 points is equal to $0.50. In the game there 
          would be a public pool. Players would be allowed to contribute any amount of their endowment, from 
          0 to 500 points, to the public pool. Any contributions that group members made would be added together 
          and doubled, then split evenly among the four players. Any amount that players keep for themselves 
          would not doubled. For each player, the amount that gets redistributed from the common pool would be 
          added to the amount they keep, then translated into cash (500 points = $0.50) and paid out as 
          a bonus payment at the end of the game.
        </p>`,

    `<h2><strong>Instructions (2/4)</strong></h2>
    <p style="text-align: left;">
      Today, you will get to view the opinions of the previous study participants on how they think people should 
      play the game. For that study, we made sure to recruit a nationally representative 
      sample so that the opinions of those participants should accurately represent the opinions of people 
      in the <strong>U.S. more broadly</strong>.
    </p>`,

    `<h2><strong>Instructions (3/4)</strong></h2>
    <p style="text-align: left;">
          Your job is to estimate the average amount of money that <strong>people think others should contribute</strong> to the common pool.
    </p>`,

    `<h2><strong>Instructions (4/4)</strong></h2>
        <p style="text-align: left;">
          To help you estimate how much other Americans think players should contribute, you will have the opportunity 
          to see the amounts that people in that previous study said others should contribute. You will see 
          randomly generated avatars representing people who participated in that study.
        </p>
        <p style="text-align: left;">
          Every time you click on an avatar, you will see the amount that
          <strong> that one person thinks others should contribute.</strong> 
          You can view the opinions of as many people as you'd like before making your estimate.
        </p>`
  ],
  show_clickable_nav: true
};

const instructionsDescriptiveComprehensionCheck = {
  type: jsPsychSurveyMultiChoice,
  questions: [
    {
      name: 'desc_comp_check_1',
      prompt: '<strong><i class="fa-solid fa-circle-question"></i>&nbsp;&nbsp;For each statement, your task is to:</strong>',
      options: [
        "Estimate the average contribution amount of people in the U.S.",
        "Estimate the average age of people in the U.S.",
        "Estimate the percentage of people in the U.S. who agree with me about how to play the game",
        "Estimate the percentage of people in the U.S. who have played this game before"
      ],
      correct: 'Estimate the average contribution amount of people in the U.S.',
      hint: `That's not quite right. Remember, you are trying to estimate the <strong>average contribution amount</strong> of people in the U.S.`,
      required: true,
    },
    {
      name: 'desc_comp_check_2',
      prompt: `
            <strong>
              <i class="fa-solid fa-circle-question"></i>&nbsp;&nbsp;
              You can view the contributions of as many people as you'd like before making your estimate.
            </strong>`,
      options: ["True", "False"],
      correct: 'True',
      hint: `That's not quite right. Remember, you will have the chance to view the contributions of <strong>as many people as you'd like</strong> before making your estimate.`,
      required: true,
    },
  ],
  preamble:
    `<h2 style="text-align: center;">Instructions Review</h2> 
    <p style="text-align: left;"> 
      The experiment will begin on the next page.
      
      As a reminder, you will see the contributions made by a nationally representative sample
      of Americans and be asked to estimate the avergae contribution.<br><br>

      We will first ask you a few questions about how much you expect people will contribute
      before you get to see any information about what others actually contributed. Then, you will see a page 
      of many different avatars that each represent real participants' contributions. <br><br>

      <strong>
        You are free to review as many contributions as you would like before providing us 
        your final estimate of the avergae contribution amount.
      </strong>

      To make sure you fully understand the instructions for this study, please answer the questions below: 
    </p>`,
};

const instructionsInjunctiveComprehensionCheck = {
  type: jsPsychSurveyMultiChoice,
  questions: [
    {
      name: 'inj_comp_check_1',
      prompt: `
            <strong>
              <i class="fa-solid fa-circle-question"></i>&nbsp;&nbsp;
              For each statement, your task is to:
            </strong>`,
      options: [
        "Estimate the average age of people in the U.S.",
        "Estimate the average amount that people in the U.S. think others should contribute",
        "Estimate the percentage of people in the U.S. who agree with me about how to play the game",
        "Estimate the percentage of people in the U.S. who have played this game before"
      ],
      correct: 'Estimate the average amount that people in the U.S. think others should contribute',
      hint: `That's not quite right. Remember, you are trying to estimate the average amount that people in the U.S. <strong>think others should contribute</strong>.`,
      required: true,
    },
    {
      name: 'inj_comp_check_2',
      prompt: `
            <strong>
              <i class="fa-solid fa-circle-question"></i>&nbsp;&nbsp;
              You can view the opinions of as many people as you'd like before making your estimate:
            </strong>`,
      options: [
        "True",
        "False"
      ],
      correct: 'True',
      hint: `That's not quite right. Remember, you will have the chance to view the opinions of <strong>as many people as you'd like</strong> before making your estimate.`,
      required: true,
    },
  ],
  preamble: `
    <h2 style="text-align: center;">Instructions</h2> 
    <p style="text-align: left;"> 
      The experiment will begin on the next page.
      
      As a reminder, you will see the opinions of a nationally representative sample
      of Americans on how much they think others should contribute, and you will be 
      asked to estimate the avergae amount others think players should contribute.<br><br>

      We will first ask you a few questions about how much you expect other people think players should contribute
      before you get to see previous participants' opinions. Then, you will see a page 
      of many different avatars that each represent real participants' opinions about how much others should contribute. <br><br>

      <strong>
        You are free to review as many opinions as you would like before providing us 
        your final estimate of the avergae amount that other people think players should contribute.
      </strong>

      To make sure you fully understand the instructions for this study, please answer the questions below: 
    </p>`,
};


// PUSH
// if (normManipulation === 'descriptive') {

//   timeline.push(
//     instructionsDescriptive,
//     instructionsDescriptiveComprehensionCheck
//   );

// } else if (normManipulation === 'injunctive') {
  
//   timeline.push
//     instructionsInjunctive,
//     instructionsInjunctiveComprehensionCheck
//   );
// };

// Pre-Predictions (Self) //
function prePredictionsSelf() {
  return {
    type: jsPsychSurveyHtmlForm,
    preamble: `
          <p class="jspsych-survey-multi-choice-preamble">
            Before you see what other people think about 
            the statement, we want to know what you think:
          </p><br><br>`,
    html: `
          <!-- Pre-Sampling Moral Action Rating -->
          
          <input type="hidden" name="pre-slider-moral-action-clicked" value="false">
          <label for="pre-slider-moral-action" class="jspsych-survey-multi-choice-question">
            To what extent do you think this <em>action</em> is morally good or morally bad?
          </label>
          <div style="position: relative;">
            <input 
              name="pre-slider-moral-action" 
              type="range" 
              class="jspsych-slider incomplete" 
              value="50" min="0" max="100" step="1" 
              id="pre-slider-moral-action"
              onmousedown="
                this.classList.remove('incomplete');
                this.classList.add('bipolar-clicked');

                document.getElementsByName('pre-slider-moral-action-clicked')[0].value = 'true';
              "
              oninput="
                this.classList.remove('incomplete');
                this.classList.add('bipolar-clicked');

                document.getElementsByName('pre-slider-moral-action-clicked')[0].value = 'true';
              "
            >
            <div class="slider-anchors">
              <span class="jspsych-slider-left-anchor">
                Definitely morally bad
              </span>
              <span class="jspsych-slider-right-anchor">
                Definitely morally good
              </span>
            </div>
          </div><br><br><br>


          <!-- Pre-Sampling Moral Person Rating -->

          <input type="hidden" name="pre-slider-moral-person-clicked" value="false">
          <label for="pre-slider-moral-person" class="jspsych-survey-multi-choice-question">
            To what extent do you think this <em>person</em> is morally good or morally bad?
          </label>
          <div style="position: relative;">
            <input 
              name="pre-slider-moral-person"
              type="range" 
              class="jspsych-slider incomplete" 
              value="50" min="0" max="100" step="1" 
              id="pre-slider-moral-person"
              onmousedown="
                this.classList.remove('incomplete');
                this.classList.add('bipolar-clicked');

                document.getElementsByName('pre-slider-moral-person-clicked')[0].value = 'true';
              "
              oninput="
                this.classList.remove('incomplete');
                this.classList.add('bipolar-clicked');

                document.getElementsByName('pre-slider-moral-person-clicked')[0].value = 'true';
              "
            >
            <div class="slider-anchors">
              <span class="jspsych-slider-left-anchor">
                Definitely morally bad
              </span>
              <span class="jspsych-slider-right-anchor">
                Definitely morally good
              </span>
            </div>
          </div><br><br><br>
          
          <!-- Pre-Sampling Moral Curiosity -->

          <input type="hidden" name="pre-slider-moral-curious-clicked" value="false">
          <label for="pre-slider-moral-curious" class="jspsych-survey-multi-choice-question">
            How curious are you to learn about what other people think about this statement?<br>
          </label>
          <div style="position: relative;">
            <input 
              name="pre-slider-moral-curious" 
              type="range" 
              class="jspsych-slider incomplete" 
              value="50" min="0" max="100" step="1" 
              id="pre-slider-moral-curious"
              onmousedown="
                this.classList.remove('incomplete');
                this.classList.add('unipolar-clicked');

                document.getElementsByName('pre-slider-moral-curious-clicked')[0].value = 'true';
              "
              oninput="
                this.classList.remove('incomplete');
                this.classList.add('unipolar-clicked');

                document.getElementsByName('pre-slider-moral-curious-clicked')[0].value = 'true';
              "
            >
            <div class="slider-anchors">
              <span class="jspsych-slider-left-anchor">
                Not at all curious
              </span>
              <span class="jspsych-slider-right-anchor">
                Extremely curious
              </span>
            </div>
          </div><br><br><br>`,
    button_label: 'Next',
    request_response: true,
    on_finish: function (data) {
      let preSamplingMoralSelfData = data.response;

      let pre_slider_moral_action_check = preSamplingMoralSelfData['pre-slider-moral-action-clicked'] === 'true' ? preSamplingMoralSelfData['pre-slider-moral-action'] : null;
      let pre_slider_moral_person_check = preSamplingMoralSelfData['pre-slider-moral-person-clicked'] === 'true' ? preSamplingMoralSelfData['pre-slider-moral-person'] : null;
      let pre_slider_moral_curious_check = preSamplingMoralSelfData['pre-slider-moral-curious-clicked'] === 'true' ? preSamplingMoralSelfData['pre-slider-moral-curious'] : null;


      preSamplingMoralSelfData = {
        pre_slider_moral_action: pre_slider_moral_action_check,
        pre_slider_moral_person: pre_slider_moral_person_check,
        pre_slider_moral_curious: pre_slider_moral_curious_check
      };

      jsPsych.data
        .getDataByTimelineNode(jsPsych.getCurrentTimelineNodeID())
        .addToAll(preSamplingMoralSelfData);
    }
  };
};

// Pre-Predictions (Other) //
function prePredictionsOther() {
  return {
    type: jsPsychSurveyHtmlForm,
    preamble: `
          <p class="jspsych-survey-multi-choice-preamble">
            Before you see what other people think about the statement, we want to know what you think:
          </p><br><br>`,
    html: `
          <!-- Pre-Sampling Moral Estimate Rating -->

          <input type="hidden" name="pre-slider-moral-estimate-percent-clicked" value="false">
          <label for="pre-slider-moral-estimate-percent" class="jspsych-survey-multi-choice-question">
            What percentage of people in the U.S. do you think consider this action to be morally good vs. think this is morally bad?
          </label>
          <div style="position: relative;">
            <input 
              name="pre-slider-moral-estimate-percent" 
              type="range" 
              class="jspsych-slider incomplete" 
              value="50" min="0" max="100" step="1" 
              id="pre-slider-moral-estimate-percent"
                            onmousedown="
                this.classList.remove('incomplete');
                this.classList.add('bipolar-clicked');

                document.getElementsByName('pre-slider-moral-estimate-percent-clicked')[0].value = 'true';

                let rawRating = parseFloat(this.value);
                let downRating = (100 - rawRating) + '%';
                let upRating = rawRating + '%';
              
                $('#slider-downRating').text(downRating);
                
              oninput="
                this.classList.remove('incomplete');
                this.classList.add('bipolar-clicked');

                document.getElementsByName('pre-slider-moral-estimate-percent-clicked')[0].value = 'true';

                let rawRating = parseFloat(this.value);
                let downRating = (100 - rawRating) + '%';
                let upRating = rawRating + '%';
              
                $('#slider-downRating').text(downRating);
                $('#slider-upRating').text(upRating);
              "
            >

            <div class="slider-container">
              <output id="slider-downRating">50%</output>
              <output id="slider-upRating">50%</output>
            </div>
            <div class="slider-anchors">
              <span class="jspsych-slider-left-anchor">
                Believe this is morally bad
              </span>
              <span class="jspsych-slider-right-anchor">
                Believe this is morally good
              </span>
            </div>
          </div><br><br><br>


          <!-- Pre-Sampling Moral Estimate Confidence -->

          <input type="hidden" name="pre-slider-moral-confidence-clicked" value="false">
          <label for="pre-slider-moral-confidence" class="jspsych-survey-multi-choice-question">
            How confident are you in your answer?
          <div style="position: relative;">
            <input 
              name="pre-slider-moral-confidence" 
              type="range" 
              class="jspsych-slider incomplete" 
              value="50" min="0" max="100" step="1" 
              id="pre-slider-moral-confidence"
              onmousedown="
                this.classList.remove('incomplete');
                this.classList.add('unipolar-clicked');

                document.getElementsByName('pre-slider-moral-confidence-clicked')[0].value = 'true';
              "
              oninput="
                this.classList.remove('incomplete');
                this.classList.add('unipolar-clicked');

                document.getElementsByName('pre-slider-moral-confidence-clicked')[0].value = 'true';
              "
            >
            <div class="slider-anchors">
              <span class="jspsych-slider-left-anchor">
                Not at all confident
              </span>
              <span class="jspsych-slider-right-anchor">
                Completely confident
              </span>
            </div>
          </div><br><br><br>`,
    button_label: 'Next',
    request_response: true,
    on_finish: function (data) {
      let preSamplingMoralOtherData = data.response;

      let pre_slider_moral_estimate_percent_check = preSamplingMoralOtherData['pre-slider-moral-estimate-percent-clicked'] === 'true' ? preSamplingMoralOtherData['pre-slider-moral-estimate-percent'] : null;
      let pre_slider_moral_confidence_check = preSamplingMoralOtherData['pre-slider-moral-confidence-clicked'] === 'true' ? preSamplingMoralOtherData['pre-slider-moral-confidence'] : null;

      preSamplingMoralOtherData = {
        pre_slider_moral_estimate_percent: pre_slider_moral_estimate_percent_check,
        pre_slider_moral_confidence: pre_slider_moral_confidence_check,
      };

      jsPsych.data
        .getDataByTimelineNode(jsPsych.getCurrentTimelineNodeID())
        .addToAll(preSamplingMoralOtherData);
    }
  };
};

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

// Post-Predictions (Self) //
function postPredictionsSelf() {
  return {
    type: jsPsychSurveyHtmlForm,
    preamble: `
          <p class="jspsych-survey-multi-choice-preamble">
            Now that you've had the chance to see what other people 
            think about the statement, we want to know what you think again.
            Please answer the following questions:
          </p><br><br>`,
    html: `
          <!-- Post-Sampling Moral Action Rating -->

          <input type="hidden" name="post-slider-moral-action-clicked" value="false">
          <label for="post-slider-moral-action" class="jspsych-survey-multi-choice-question">
            To what extent do you think this <em>action</em> is morally good or morally bad? 
          </label>
          <div style="position: relative;">
            <input 
              name="post-slider-moral-action" 
              type="range" 
              class="jspsych-slider incomplete" 
              value="50" min="0" max="100" step="1" 
              id="post-slider-moral-action"
              onmousedown="
                this.classList.remove('incomplete');
                this.classList.add('bipolar-clicked');
                document.getElementsByName('post-slider-moral-action-clicked')[0].value = 'true';
              "
              oninput="
                this.classList.remove('incomplete');
                this.classList.add('bipolar-clicked');
                document.getElementsByName('post-slider-moral-action-clicked')[0].value = 'true';
              "
            >
            <div class="slider-anchors">
              <span class="jspsych-slider-left-anchor">
                Definitely morally bad
              </span>
              <span class="jspsych-slider-right-anchor">
                Definitely morally good
              </span>
            </div>
          </div><br><br><br>
          

          <!-- Post-Sampling Moral Person Rating -->

          <input type="hidden" name="post-slider-moral-person-clicked" value="false">
          <label for="post-slider-moral-person" class="jspsych-survey-multi-choice-question">
            To what extent do you think this <em>person</em> is morally good or morally bad? 
          </label>
          <div style="position: relative;">
            <input 
              name="post-slider-moral-person"
              type="range" 
              class="jspsych-slider incomplete" 
              value="50" min="0" max="100" step="1" 
              id="post-slider-moral-person"
              onmousedown="
                this.classList.remove('incomplete');
                this.classList.add('bipolar-clicked');
                document.getElementsByName('post-slider-moral-person-clicked')[0].value = 'true';
              "
              oninput="
                this.classList.remove('incomplete');
                this.classList.add('bipolar-clicked');
                document.getElementsByName('post-slider-moral-person-clicked')[0].value = 'true';
              "
            >
            <div class="slider-anchors">
              <span class="jspsych-slider-left-anchor">
                Definitely morally bad
              </span>
              <span class="jspsych-slider-right-anchor">
                Definitely morally good
              </span>
            </div>
          </div><br><br><br>`,
    button_label: 'Next',
    request_response: true,
    on_finish: function (data) {
      let postSamplingMoralSelfData = data.response;

      let post_slider_moral_action_check = postSamplingMoralSelfData['post-slider-moral-action-clicked'] === 'true' ? postSamplingMoralSelfData['post-slider-moral-action'] : null;
      let post_slider_moral_person_check = postSamplingMoralSelfData['post-slider-moral-person-clicked'] === 'true' ? postSamplingMoralSelfData['post-slider-moral-person'] : null;

      postSamplingMoralSelfData = {
        post_slider_moral_action: post_slider_moral_action_check,
        post_slider_moral_person: post_slider_moral_person_check
      };

      jsPsych.data
        .getDataByTimelineNode(jsPsych.getCurrentTimelineNodeID())
        .addToAll(postSamplingMoralSelfData);
    }
  };
};

// Post-Predictions (Other) //
function postPredictionsOther() {
  return {
    type: jsPsychSurveyHtmlForm,
    preamble: `
          <p class="jspsych-survey-multi-choice-preamble">
            Now that you've had the chance to see what other people 
            think about the statement, we want to know what you think again.
            Please answer the following questions:
          </p><br><br>`,
    html: `
          <!-- Post-Sampling Moral Estimate Rating -->

          <input type="hidden" name="post-slider-moral-estimate-percent-clicked" value="false">
          <label for="post-slider-moral-estimate-percent" class="jspsych-survey-multi-choice-question">
            What percentage of people in the U.S. do you think consider this action to be morally good vs. think this is morally bad?
          </label>
          <div style="position: relative;">
            <input 
              name="post-slider-moral-estimate-percent" 
              type="range" 
              class="jspsych-slider incomplete" 
              value="50" min="0" max="100" step="1" 
              id="post-slider-moral-estimate-percent"
              onmousedown="
                this.classList.remove('incomplete');
                this.classList.add('bipolar-clicked');

                document.getElementsByName('post-slider-moral-estimate-percent-clicked')[0].value = 'true';
              
                let rawRating = parseFloat(this.value);
                let downRating = (100 - rawRating) + '%';
                let upRating = rawRating + '%';
              
                $('#slider-downRating').text(downRating);
                $('#slider-upRating').text(upRating);
              "
              oninput="
                this.classList.remove('incomplete');
                this.classList.add('bipolar-clicked');

                document.getElementsByName('post-slider-moral-estimate-percent-clicked')[0].value = 'true';
              
                let rawRating = parseFloat(this.value);
                let downRating = (100 - rawRating) + '%';
                let upRating = rawRating + '%';
              
                $('#slider-downRating').text(downRating);
                $('#slider-upRating').text(upRating);
              "
            >
            <div class="slider-container">
              <output id="slider-downRating">50%</output>
              <output id="slider-upRating">50%</output>
            </div>
            <div class="slider-anchors">
              <span class="jspsych-slider-left-anchor">
                Believe this action is morally bad
              </span>
              <span class="jspsych-slider-right-anchor">
                Believe this action is morally good
              </span>
            </div>
          </div><br><br><br>

          
          <!-- Post-Sampling Moral Estimate Confidence -->
          
          <input type="hidden" name="post-slider-moral-confidence-clicked" value="false">
          <label for="post-slider-moral-confidence" class="jspsych-survey-multi-choice-question">
            How confident are you in your answer?
          </label>
          <div style="position: relative;">
            <input 
              name="post-slider-moral-confidence" 
              type="range" 
              class="jspsych-slider incomplete" 
              value="50" min="0" max="100" step="1" 
              id="post-slider-moral-confidence"
              onmousedown="
                this.classList.remove('incomplete');
                this.classList.add('unipolar-clicked');

                document.getElementsByName('post-slider-moral-confidence-clicked')[0].value = 'true';
              "
              oninput="
                this.classList.remove('incomplete');
                this.classList.add('unipolar-clicked');

                document.getElementsByName('post-slider-moral-confidence-clicked')[0].value = 'true';
              "
            >
            <div class="slider-anchors">
              <span class="jspsych-slider-left-anchor">
                Not at all confident
              </span>
              <span class="jspsych-slider-right-anchor">
                Completely confident
              </span>
            </div>
          </div><br><br><br>`,
    button_label: 'Next',
    request_response: true,
    on_finish: function (data) {
      let postSamplingMoralOtherData = data.response;

      let post_slider_moral_estimate_percent_check = postSamplingMoralOtherData['post-slider-moral-estimate-percent-clicked'] === 'true' ? postSamplingMoralOtherData['post-slider-moral-estimate-percent'] : null;
      let post_slider_moral_confidence_check = postSamplingMoralOtherData['post-slider-moral-confidence-clicked'] === 'true' ? postSamplingMoralOtherData['post-slider-moral-confidence'] : null;

      postSamplingMoralOtherData = {
        post_slider_moral_estimate_percent: post_slider_moral_estimate_percent_check,
        post_slider_moral_confidence: post_slider_moral_confidence_check
      };

      jsPsych.data
        .getDataByTimelineNode(jsPsych.getCurrentTimelineNodeID())
        .addToAll(postSamplingMoralOtherData);
    }
  };
};

// INDIVIDUAL DIFFERENCES //
const instructionsIndividualDifferences = {
  type: jsPsychInstructions,
  pages: [`
    <p style="text-align: left;">
      We will start by asking you some questions about yourself. 
      Please answer honestly. After you complete these, you will begin the main task.
    </p>
    `],
  show_clickable_nav: true
}

// IRI - Perspective Taking //
const iriQuestions = {
  type: jsPsychSurveyMultiChoice,
  questions: [
    {
      name: 'iri-1',
      prompt:
        `<p class="jspsych-survey-multi-choice-question">
        I try to look at everybody's side of a disagreement before I make a decision.
        </p>`,
      options: iriResponses,
      horizontal: true
    },
    {
      name: 'iri-2',
      prompt:
        `<p class="jspsych-survey-multi-choice-question">
        I sometimes try to understand my friends better by imagining how things
        look from their perspective.
        </p>`,
      options: iriResponses,
      horizontal: true
    },
    {
      name: 'iri-3',
      prompt:
        `<p class="jspsych-survey-multi-choice-question">
        When I'm upset at someone, I usually try to 'put myself in his shoes' for a
        while.
        </p>`,
      options: iriResponses,
      horizontal: true
    },
    {
      name: 'iri-4',
      prompt:
        `<p class="jspsych-survey-multi-choice-question">
        Before criticizing somebody, I try to imagine how I would feel if I were in
        their place.
        </p>`,
      options: iriResponses,
      horizontal: true
    }
  ],
  randomize_question_order: true,
  request_response: true,
  preamble:
    `<p class="jspsych-survey-multi-choice-preamble">
      Please indicate how well each of the following statements
      describe you using the scale provided:
    </p>`,
  scale_width: 500,
  on_finish: function (data) {
    let iriData = data.response;

    iriData = {
      iri_1: iriData['iri-1'],
      iri_2: iriData['iri-2'],
      iri_3: iriData['iri-3'],
      iri_4: iriData['iri-4']
    };

    jsPsych.data
      .getDataByTimelineNode(jsPsych.getCurrentTimelineNodeID())
      .addToAll(iriData);
  }
};

const ihQuestions = {
  type: jsPsychSurveyMultiChoice,
  questions: [
    {
      name: "ih-1-r",
      prompt: `
        <p class="jspsych-survey-multi-choice-question">
        My intellectual ideas are usually superior to others' ideas.</strong>
        </p>`,
      options: ihResponses,
      horizontal: true,
      // anchor: true,
      // labels: ['Strongly Disagree', 'Strongly Agree']
    },
    {
      name: "ih-2-r",
      prompt: `
        <p class="jspsych-survey-multi-choice-question">
        I desire to be famous for an intellectual contribution.</strong>
        </p>`,
      options: ihResponses,
      horizontal: true
    },
    {
      name: "ih-3-r",
      prompt: `
        <p class="jspsych-survey-multi-choice-question">
        I know just about everything there is to know. </strong>
        </p>`,
      options: ihResponses,
      horizontal: true
    },
    {
      name: "ih-4-r",
      prompt: `
        <p class="jspsych-survey-multi-choice-question">
        Other people think that I am a know-it-all.</strong>
        </p>`,
      options: ihResponses,
      horizontal: true
    },
    {
      name: "ih-5",
      prompt: `
        <p class="jspsych-survey-multi-choice-question">
        I am open to other's ideas about how to do things.</strong>
        </p>`,
      options: ihResponses,
      horizontal: true
    },
    {
      name: "ih-6",
      prompt: `
        <p class="jspsych-survey-multi-choice-question">
        I can learn from other people.</strong>
        </p>`,
      options: ihResponses,
      horizontal: true
    },
    {
      name: "ih-7",
      prompt: `
        <p class="jspsych-survey-multi-choice-question">
        I am open to others' criticisms of my intellectual ideas.</strong>
        </p>`,
      options: ihResponses,
      horizontal: true
    },
    {
      name: "ih-8",
      prompt: `
        <p class="jspsych-survey-multi-choice-question">
        I am an intellectually humble person.</strong>
        </p>`,
      options: ihResponses,
      horizontal: true
    }
  ],
  randomize_question_order: true,
  request_response: true,
  preamble: `
    <p class="jspsych-survey-multi-choice-preamble">
      For each of the statements below, please indicate how much the statement
      is generally characteristic of you.
    </p>`,
  on_finish: function (data) {
    let ihData = data.response;

    ihData = {
      ih_1_r: ihData['ih-1-r'],
      ih_2_r: ihData['ih-2-r'],
      ih_3_r: ihData['ih-3-r'],
      ih_4_r: ihData['ih-4-r'],
      ih_5: ihData['ih-5'],
      ih_6: ihData['ih-6'],
      ih_7: ihData['ih-7'],
      ih_8: ihData['ih-8']
    };

    jsPsych.data
      .getDataByTimelineNode(jsPsych.getCurrentTimelineNodeID())
      .addToAll(ihData);
  }
};

// Instructions
// timeline.push(instructions, instructionsComprehensionCheck);

// Sampling Task

 timeline.push(
  // prePredictionsSelf(),
  // prePredictionsOther(),
  selectionTask(),
  postPredictionsSelf(),
  postPredictionsOther())


// Opportunity to learn the true percentage... (take from intro)
// Instructional screen
// Curiosity is regarding learning about information

// Post-Sampling Individual Differences
timeline.push(iriQuestions, ihQuestions);

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