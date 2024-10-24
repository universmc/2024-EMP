const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();
async function main() {

    const inviteJournaliste = [
        '{"role": "journalist"}',
        '{"competence": ["analytical thinking", "deep research", "objective storytelling"]}',
        '{"context": {"caseName":"Macronnie affair","issues":["large scale fraud", "judicial corruption", "accounting procedure violations", "violent & financial repression during protests", "weapons trafficking", "potential war crimes"]}}',
        `{"task": "Use the provided Groq SDK toolkit to analyze the given URL and gather relevant information related to the case, then create a well-structured markdown file with your findings." }`,
        '{"steps": [{ "step1": "Visit the specified URL for gathering essential details"}, {' +
          '"step2": "Utilize the powerful analysis capabilities offered by the Groq SDK toolkit to interpret and synthesize gathered knowledge"}, {' +
          '"step3": "Organize your conclusions in a clean, easy-to-understand format"}] }',
        `{"desiredFeatures": [{"feature1": "meticulously organized summary of major findings"}, {"feature2": "coherent narrative reflecting facts revealed throughout the investigation"}]}`
      ];

    groq.chat.completions.create({
        //
        // Required parameters
        //
        messages: [
            // Set an optional system message. This sets the behavior of the
            // assistant and can be used to provide specific instructions for
            // how it should behave throughout the conversation.
        
            {
                role: "system",
                content: "tu as incarneras le rôle de journaliste dans cette instance groq-sdk dans ta mission enquêté sur https://github.com/universmc/affaire_910 ladite Macronnie Tes réponses devront être encapsuler au format HTML pour un développement avec un modèle de grande section par section en respectant les normes du Web sémantique W3C https://archive.org"
            },
            {
                role: "user",
                content: `${inviteJournaliste}`,
            },
            {
                role: "assistant",
                name:"journaliste",
                content: "très bien procédons à l'analyse du dossier : https://github.com/universmc/affaire_910  ladite affaire 910, concernant les Membres de Macronnie Partie Politique 910.json inscrit à la https://cnccfp.fr Tes réponses seront intégrés de pages_date.html en page_date.html dans le répertoire /public/ "
            },
        ],
        // The language model which will generate the completion.
        model: "mixtral-8x7b-32768",
        //
        // Optional parameters
        
        // Controls randomness: lowering results in less random completions.
        // As the temperature approaches zero, the model will become deterministic
        // and repetitive.
        temperature: 0.5,
        // The maximum number of tokens to generate. Requests can use up to
        // 2048 tokens shared between prompt and completion.
        max_tokens: 1024,
        // Controls diversity via nucleus sampling: 0.5 means half of all
        // likelihood-weighted options are considered.
        top_p: 1,
        // A stop sequence is a predefined or user-specified text string that
        // signals an AI to stop generating content, ensuring its responses
        // remain focused and concise. Examples include punctuation marks and
        // markers like "[end]".
        stop: null,
        // If set, partial message deltas will be sent.
        stream: false
    }).then((chatCompletion)=>{
        // Print the completion returned by the LLM.
        const htmlContent = chatCompletion.choices[0]?.message?.content;
        const outputFilePath = "indexPage_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".html";
        fs.writeFileSync(outputFilePath, htmlContent);
        console.log("Code HTML généré et enregistré dans " + outputFilePath);
    });

}
main();
