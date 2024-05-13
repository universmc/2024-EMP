const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();
const legal = fetch('https://dalloz.fr/');
async function main(
) {
    const affaire_910 = `git(https://github.com/universmc/affaire_910)`;
  
    const citation = "[promptModel]ou[modelPhrase]";

    const sujet = "[choix].sujet";
    const verbe = "[action].sujet";
    const complement = "[object{direct(module_JSON),indirect(stream_codex.dalloz)}";
    const contexte = "affaire_910";
    
    const promptModel = `${sujet},${verbe};${complement}:${contexte}`;

    const const68 = `${legal}`;
    
    const enquest910 = `${promptModel},${const68}`;
    
    
    const basicPage = 

    groq.chat.completions.create({
      messages: [
      {role: "assistant",name:"codex",content:`codex:phase1[groq ${equest910}]`},
      {role: "system",content:"init{role:'system',name:'[job]_name','content:PromptModel'"},
      {role: "assistant",content: "init{role:'assistant',name:'[job]_name','content:PromptModel'"},
      {role: "user",content:"init{role:'user',name:'[job]_name','content:PromptModel'"},
      {
        role: "user",
        content:"Rédige-moi une dissertation, une demonstration Metaphysique ou un court Magistral sur ta compréhension ou interprétation de enquête de 'Pi' une intelligence artificielle Deux potentiels maîtrisons les approche métaphysique les différents lois en vigueur en 2024 et les références légales tu sais les éditteur `${Dalloz}`."
      },
      {
        role: "assistant",
        content:"la La dissertation devra t'être rédigé dans une page HTML avec CNN boostrap"
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
    const outputFilePath ="🥊-Clean-910_🇫🇷_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
    fs.writeFileSync(outputFilePath, mdContent);
    console.log("Groq.🌴.Job.✨" + outputFilePath
    );
  });
}

main();
