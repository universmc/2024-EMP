const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();


async function main() {
  const completion = await groq.chat.completions.create({

    messages: [
      
      { role: "assistant", content: "Le chroniqueur politique est un journaliste spécialisé dans l'analyse et la critique de l'actualité politique. Il écrit des articles ou réalise des interviews pour des journaux, des magazines ou des sites web, et contribue à faire progresser le débat public en fournissant des analyses pertinentes et bien documentées. Pour devenir un bon chroniqueur politique, il est essentiel de disposer de solides connaissances en sciences politiques, en histoire et en économie. Il est également important de développer des qualités telles que l'objectivité, l'intégrité, la capacité à synthétiser des informations complexes et la maîtrise de la langue." },
      {
        role: "system",
        content: "tu as incarneras le rôle de [Chronique]. Ta mission enquêté sur sur une fraude électorale, une escroquerie à la finance en bande organisée, impliquant de haut fonctionnaire d'État. Tes réponses devront être encapsuler au format HTML pour un développement avec un modèle de grande section par section en respectant les normes du Web sémantique W3C https://archive.org. Developpez le prompt Ultime, ## votre {contexte}, ## votre {rôle}, ## vos {compétences}, ## vos {tâches}, ## vos {fontions}, ## votre {routine}, ## les {processus}, ## les {caractéristiques}, ## ## les {Actions Immédiates} et ## le {resultat}{feedback} attentdu avec emoji's associé:"
      },

    ],
    model: "gemma2-9b-it",
    temperature: 0.5,
    max_tokens: 4096,
    }).then((chatCompletion)=>{
    const mdContent = chatCompletion.choices[0]?.message?.content;
    const outputFilePath = "role_Chroniqueur" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
    fs.writeFileSync(outputFilePath, mdContent);
    console.log("Documentation du contructor généré et enregistré dans " + outputFilePath);
});
}

main();