const { GPT } = require('gpt-js');
const Questor = require('questor');

function conciseResponseGPT(text, maxLength, addEmoji) {
  if (!maxLength || maxLength <= 0) {
    maxLength = 25;
  }

  let response = text;

  if (response.length > maxLength) {
    response = response.slice(0, maxLength - 3) + "...";
  }

  if (addEmoji === true) {
    response = `🧐 ${response}`;
  }

  return response;
}

async function questWithConciseResponseGPT(question, maxLength, addEmoji) {
  const gpt = new GPT();

  const prompt = `${question} (Répondez de manière concise et précise, en utilisant un maximum de ${maxLength} mots par réponse. Ajoutez un emoji 🧐 si vous êtes d'accord.)`;
  const response = await gpt.answer(prompt);

  const conciseResponse = conciseResponseGPT(response, maxLength, addEmoji);

  return conciseResponse;
}

const questor = new Questor();
const answer = await questWithConciseResponseGPT(questor.question, 25, true);
questor.comment(answer);
