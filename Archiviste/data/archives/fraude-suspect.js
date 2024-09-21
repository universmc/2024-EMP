const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();



async function main() {

    const affaireEM = "git commit -m 'regulilèrement mis à jour' https://github.com/universmc/affaire_910";

    const chatCompletion = await groq.chat.completions.create({

    "messages": [
      {role: "system",name:"[📔.codex]", content:"phase[01]:[RUN]:[brainstorming(session.timestamp)]"},
      {role: "assistant",name:"adopi", content:affaireEM},
      {role: "assistant",name:"adopi", content:"mise à jour du sommaire et j'interfaces graphiques présentation de l'affaire de fraude électorale datant du 9 juin 2024"},
      {role: "user",name:"Journaliste", content:"bonjour je suis journaliste, instruction > élaboration d'un plan de communication pour informer le public et les parties prenantes concernées de l'affaire et de ses conséquences mise a jours sur https://github.com/universmc/affaire_910 "},
      {role: "system",name:"adhoc", content:`{
          "events": [
              {
                  "date": "2024-06-09",
                  "description": "Emmanuel Macron prononce un discours et fait adopter des lois qui provoquent la dissolution du Parlement européen."
                },
                {
                    "date": "2024-06-13",
                    "description": "Le G7 se réunit en Italie et discute de projets de loi concernant la croissance, la finance et le climat."
                },
                {
                    "date": "2024-16-07",
                    "description": "Emmanuel Macron prévoit une élection pour le président du Parlement européen à Strasbourg, prévue pour les 16 et 18 juillet 2024."
                },
                {
                    "date": "JO-2024",
                    "description": "Soupçons de fraude aux comptes de campagne liés au parti politique EMP, qui pourrait avoir utilisé des emplois fictifs pour financer sa campagne électorale."
                }
            ]
        }`},
        {role: "user",name:"Journaliste", content:"Identification des parties prenantes clés concernées par l'affaire"},
        {role: "user",name:"Mike", content:"EMP ENSEMBLE, Contre la fraude électorale"},
        {role: "assistant",name:"LCP", content:"Élaboration d'un communiqué de presse pour annoncer l'affaire et ses conséquences. Le communiqué devrait inclure les dates clés, la description de l'affaire et les mesures prises pour y faire face. Il devrait être diffusé à tous les médias pertinents, y compris les journaux, les chaînes de télévision et les radios."},
    ],
    model: "mixtral-8x7b-32768",
    temperature: 0.5,
    max_tokens: 2024,
    top_p: 1,
    stop: null,
    stream: false
}).then((chatCompletion)=>{
    const mdContent = chatCompletion.choices[0]?.message?.content;
    const outputFilePath = "SOMMAIRE-DEV_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
    fs.writeFileSync(outputFilePath, mdContent);
    console.log("Documentation du contructor généré et enregistré dans " + outputFilePath);
});
}

main();