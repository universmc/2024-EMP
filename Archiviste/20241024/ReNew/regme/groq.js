const groq = require('groq-sdk');
const { GPT } = require('gpt-js');
const gemini = require('gemini');
const Questor = require('questor');

// Initialize GPT
const gpt = new GPT();

// Initialize Gemini
const gemini = require('gemini');

// Set up Questor
const questor = new Questor();

async function questionAnswerSession(role, question, maxLength, addEmoji) {
  let response = "";
  
  switch(role) {
    case "GPT":
      response = await gpt.answer(question);
      break;
    case "Gemini":
      response = await gemini.ask(question);
      break;
  }

  const conciseResponse = conciseResponse(response, maxLength, addEmoji);
  return conciseResponse;
}

async function generateVideoContent(
) {
  const videoContent = "";

  // Generate questions
const questions = ["Q1", "Q2", "Q3", "Q4", "Q5"];
  for (const question of questions) {
    const questionText = `${question}. What are the advantages of working with AI for ${question}?`;
    
    // Set roles and contexts
const roles = ["GPT", "Gemini"];
    for (const role of roles) {
      const response = await questionAnswerSession(role, questionText, 25, true);
      videoContent += `${role}: ${response} \n\n`;
    }
  }

  return videoContent;
}

async function main(
) {
  const videoContent = await generateVideoContent();
  console.log(videoContent);
}

main();
