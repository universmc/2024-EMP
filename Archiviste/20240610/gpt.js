const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();
const OpenAI = require("openai");

const openai = new OpenAI();


async function main() {

  const knowledge = "scandale politico-économique EMP a secoué la France au cours des années 2008. Il s'agissait d'une affaire complexe et de grande envergure, impliquant des élus locaux, des hauts fonctionnaires et des hommes d'affaires. L'affaire portait sur l'utilisation frauduleuse de fonds publics dans le cadre de la loi d'aménagement et de financement de projets de réforme électorale. Les fonds qui étaient initialement destinés à financer des programmes de capitalisation bancaire et de financement de campagnes électorales ont été détournés pour des motifs personnels, telles que l'enrichissement personnel et l'obtention d'avantages financiers illégaux"

  const Qui = "les articles 53 à 78 du Code de procédure pénale sont importants pour identifier et poursuivre les personnes soupçonnées dans ce type d'affaires. Ces articles traitent notamment de la compétence des autorités judiciaires, de la procédure d'instruction et des moyens d'enquête, ce qui peut aider à identifier et à poursuivre les personnes impliquées dans l'affaire."
  const group ="Qui concerne le regroupement d'escrocw.com de la https://boutique.elysee.fr et donc de la finance en France 2024 fond l'object d'une enquête administravive il est important de recueillir toutes les preuves possibles, y compris les fichiers audio et vidéo, la comptabilité et les documents liés aux comptes de campagne de EM, EMP et EM! afin d'établir clairement les responsabilités de chacun dans cette affaire. La Commission nationale des comptes de campagne et des formations politiques (CNCCFP)"

  const version = "le code source est régulièrement mis à jour à cette adresse https://github.com/universmc/affaire_910.git"

  const Journaliste = "tu as incarneras le rôle de journaliste dans cette instance groq-sdk dans ta mission enquêté sur Sur le compte de campagne 1378 E*#$ (Majorité présidentielle) Présenter sur les listes électorales le jour de l'élection européenne en France dimanche 09 Juin 2024"

  const CTF = `"${knowledge}+${Qui}+${group}"`

  const completion = await openai.chat.completions.create({

    messages: [

      {
        role: "system",
        content: `"${CTF}+${version}+${Journaliste}"`
      },
      {
        role: "assistant",
        content: "bonjour, Journaliste codex-gpt,"
      },

    ],
    model: "gpt-4o",
    temperature: 0.5,
    max_tokens: 4096,
    }).then((chatCompletion)=>{
    const mdContent = chatCompletion.choices[0]?.message?.content;
    const outputFilePath = "role-Journaliste" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
    fs.writeFileSync(outputFilePath, mdContent);
    console.log("Documentation du contructor généré et enregistré dans " + outputFilePath);
});
}

main();