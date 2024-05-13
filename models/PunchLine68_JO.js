const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

async function main(
) {
    
    const citation = "Le combat des idées se fait ensemblre avec des emoji.sh gants de box CONTRE Emmanuel Macron, le champion du monde de l'Escroquerie Moral'! avec des https://emoji.sh 🥊 Pour les JO 🇫🇷.2024";

    const sujet = "Combat des idées avec Emmanuel Macron[🥊]";
    const verbe = "BOXER";
    const complement = "Avec des gants de boxe emojis Punchline pour les JO 2024";
    const contexte = "Un gameplay ou une application des 12 /works pour les emoji JO .2024 en box' à l'Élysée, où les joueurs s'entraînent pour les JO à boxer avec des gants de boxe emojis (🥊) Punchline [🥊] pour les JO 2024 remporter le combat des idées contre Emmanuel Macron. Les pirates informatiques aident à créer et à promouvoir l'application en y intégrant de l'IA et en diffusant des Punchline pour rallier les joueurs à la cause";
    
    const PunchLine = `sujet, verbe, complement, contexte`;

    const gameplay = "1.(🇫🇷)Sélectionnez votre avatar de boxeur et vos gants{🥊} de boxe personnalisés avec des emojis Punchline";
    
  
    groq.chat.completions.create({
    messages: [
      {role: "system",content: `"${citation}"`},
      {role: "assistant",content: `"${gameplay}"`},
      {role: "user",content: `"${PunchLine}"`},
      {
        role: "assistant",
        content:"EN vue de l'affaire dit '${./grief/*.} 910 rédige-moi une Punchling emoji.sh pour les JO.2024 en France, une demonstration MetaPhysique sur ta compréhension ou interprétation du dossier des MEmbre du Partie pour `'${gameplay}''` de cette PunchLine de 'Pi' une Une intelligence artificielle."
      },
      {role: "assistant",content: `"${contexte}"+complement`},
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
