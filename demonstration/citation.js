const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

async function main(
) {
    
    const citation = "Le combat des idées se fait ensemblre avec des gants de box CONTRE Emmanuel Macron, le champion du monde de l'Escroquerie Moral'! avec des https://emoji.sh 🥊🇫🇷";

    const sujet = "Combat des idées avec Emmanuel Macron[🥊]";
    const verbe = "BOXER";
    const complement = "Avec des gants de boxe emojis Punchline";
    const contexte = "Un gameplay ou une application prototype de boxe à l'Élysée, où les joueurs s'entraînent à boxer avec des gants de boxe emojis (🥊) Punchline [🥊] pour remporter le combat des idées contre Emmanuel Macron. Les pirates informatiques aident à créer et à promouvoir l'application en y intégrant de l'IA et en diffusant des Punchline pour rallier les joueurs à la cause";
    
    const PunchLine = `sujet, verbe, complement, contexte`;

    const gameplay = "1.(🇫🇷)Sélectionnez votre avatar de boxeur et vos gants{🥊} de boxe personnalisés avec des emojis Punchline";
    
  
    groq.chat.completions.create({
    messages: [
      {role: "system",content: `"${citation}"`},
      {role: "assistant",content: `"${gameplay}"`},
      {role: "user",content: `"${PunchLine}"`},
      {
        role: "assistant",
        content:
          "Rédige-moi une dissertation, une demonstration ou un court Magistral sur ta compréhension ou interprétation de cette PunchLine de 'Pi' une Une intelligence artificielle."
}
    ],
    model: "mixtral-8x7b-32768",
    temperature: 0.5,
    max_tokens: 2048,
    top_p: 1,
    stop: null,
    stream: false
}).then((chatCompletion) => {
    const mdContent = chatCompletion.choices[0]?.message?.content;
    const outputFilePath =
      "🥊-PunchLine68🇫🇷_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
    fs.writeFileSync(outputFilePath, mdContent);
    console.log(
      "Documentation générée et enregistrée dans " + outputFilePath
    );
  });
}

main();
