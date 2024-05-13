const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

const affaire910 = `grief/*.`
const constitution68 = `grief/Affaire_910-ref-légal_dalloz.json`

const borderCharsPV = {
    topLeft: '╔',
    topRight: '╗',
    bottomLeft: '╚',
    bottomRight: '╝',
    horizontal: '═',
    vertical: '║',
    intersectionLeft: '╠',
    intersectionRight: '╣',
    intersectionTop: '╦',
    intersectionBottom: '╩',
    intersectionCross: '╬',
  };

async function main() {

    const systemContent = "Bienvenue dans la Team', [🌌.systemDream]! Nous sommes ravis de vous avoir à bord pour aider à construire la plateforme et projet de machine learning pour les IA. Pour que nous puissions mieux comprendre votre expérience et vos compétences, pouvez-vous nous fournir votre curriculum vitae et nous parler de vos précédentes réalisations dans le domaine du développement Web et du storyTelling, de l'intelligence artificielle Apprentissage automatique.  Nous allons commencer par vous présenter notre instance pour le systremDream (name du {role:system})et donc rediger les code source normé w3c, documentanter (readme.md [traduit en lang=Fr, français]), surtout fonctionnel respectant la logique de gantt du web sementique";
    const BorderChars = "inistlisation du template de response avec insterface graphique ASCII datase `BorderChars`";
    const affaireEscrow = affaire910
    const Accuse910 = constitution68
    const CadreProc = borderCharsPV

    const chatCompletion = await groq.chat.completions.create({

    "messages": [
      {role: "system", content:systemContent},
      {role: "system", content:BorderChars},
      {role: "assistant",name:"[📔.dalloz]", content:"phase[01]:[RUN]:[brainstorming(session.timestamp)]"},
      {role: "system", content: "Dossier de mise en état à joindre au grief `{./grief/*}`" },
      {role: "system",name:"procureurRépublique", content:`groq -l ${affaireEscrow}`},
      {role: "system",name:"procureurRépublique", content: `groq -l ${Accuse910}`},
      {role: "system",name:"procureurRépublique", content: `groq -l ${CadreProc}`},
      {role: "assistant",name:"[📔.dalloz]", content:"Ressource et recourt actircle 41-1-1 code de procédure pénal à la commission nationale des comptes de campagne et de la fraude politique:{'https://www.cnccfp.fr/partis-politiques/','https://www.legifrance.gouv.fr/','https://budget.gouv.fr/, pour la composition pénal (313) })]"},
      {role: "assistant",name:"[📔.dalloz]", content:"phase[02]:[RUN]:[Commission"},
      {role: "system", content:"Magistrat, Mandataire(1113)présent"},
      {role: "assistant",name:"Mandataire", content:"groq -L, traduit et develleppe le document en FRANçais lang=Fr. "},
      {role: "system",name:"proc", content:`groq -l ${affaireEscrow}`},
      {role: "assistant",name:"Magistrat", content:"Les membres du parti politique lancent une commission d'enquête sur une affaire d'escroquerie à finance grande échelle, corruption de la justice et violations de procédures comptables. Ils rassemblent les preuves nécessaires, notamment des PV, des vidéos de répression lors des manifestations et des témoignages de victimes. Les membres du parti mettent en lumière les manipulations politiques, les abus de pouvoir et les violations du consentement démocratique."},
      {role: "assistant",name:"Magistrat", content:"rédige-moi un bilan détaillé sur chaque fichier de ce dossier /grief/"},
 //   {role: "user",name:"temoin", content:"Bonjour. Je me présente rapidement. Fabien Grimaud, 42 ans couvreurs, père, beau-père et « beau grand père ». J’ai avec quelques collègues couvreurs lancé un appel à la mobilisation de BTP en ce début d’année. Car nous, ouvriers et artisans du BTP sommes les grands oubliés de cette réforme dites « égalitaire et universelle ». Il y a 2 ans l’état a décidé de nous sortir de tous les critères de pénibilité pour le calcul de la retraite, estimant qu’il était normal que nous, bâtisseurs, étant tellement chanceux d’avoir une espérance de vie amoindrie d’au moins 7 ans par rapport au reste de la population, que nous méritions ce privilège d’avoir l’honneur de crever au travail. 64 ans sur un toit, quel privilège !!! Pour notre première « vraie » sortie dans la rue, nous avions décidé comme vous avez pu le voir dans certains médias, de défiler en tête de cortège ce samedi 18/01/20 à Paris. La manifestation était déclarée et le parcours bien défini. Or, un peu avant 15 heure, l’ordre a été donné aux force de l’ordre (que je n’avais jamais vu dans telles proportions) de nous bloquer juste après le passage de la gare de l’est, engendrant des mouvements de foule incontrôlés et du coup une répression de ceux-ci. Des gaz, commencent à pleuvoir, des grenades de dispersion commencent à péter. Et là, des forces de l’ordre surgissent en tous sens la matraque en l’air et commence à taper sur tout ce qui bouge. Nous remontons quelques mètres mais sommes bloqués par une foule compacte, je me retrouve à l’arrière. Sur ma gauche, la foule impénétrable, sur ma droite des gens se font matraquer au sol par des gens haineux en uniforme, j’ai les bras en l’air afin de signifier que je ne représente pas une menace. Je me retourne pour voir si le danger pour moi s’approche ou reste à distance (toujours bras en l’air et en tenu de travail). Une explosion énorme survient un mètre devant moi, je n’ai le temps de rien réaliser, je suis à terre. Je sais que je suis touché au visage. Quelques secondes se passent, milles questions fusent dans ma tête. Que s’est-il passé ? Pourquoi ? Pourquoi moi, pacifiste depuis toujours? Je passe ma main sur mon visage, je n’ai plus de lunettes, je suis en sang, je me cache l’œil du côté qui n’a pas été touché, visiblement, l’autre fonctionne encore à peu près. Je me relève aidé de plusieurs manifestants qui m’aident à trouver des street médics (je remercie d’ailleurs tous ces gens au dévouement sans faille qui pallient aux nombreuses fautes et défaillances de l’état dans sa gestion des manifestations depuis 14 mois maintenant). On m’emmène un peu à l’écart, les médics m’administrent les premiers soins et font en sorte qu’un ami vienne me chercher afin de me conduire à l’hôpital Lariboisière qui se trouve non loin. Les soignants des urgences et du service ORL qui m’ont recousu la pommette ont été très professionnels et compatissants, faisant même un peu « d’humour » en me disant que j’avais eu énormément de chance et que j’étais à deux doigts d’avoir fait une « Rodrigues » (les exactions policières portent un nom maintenant…) Je les remercie aussi du fond du cœur pour leur Humanité malgré les conditions dans lesquelles ils bossent (j’ai pu constater de très près les manques de moyens, tant humains que matériels). Je suis sorti de l’hôpital et suis rentré chez moi avec mon camarade qui a dû conduire seul, puisque je n’ai plus de lunettes, sur la route du retour en Vendée d’où je suis originaire. Aujourd’hui, j’en appelle au peuple français. Celui qui râle dans son canapé sur toutes les mesures iniques et liberticides que nous concocte ce « gouvernement », mais ne sort pas le signifier publiquement dans la rue. Cette tranche de la population qui est majoritaire, au moins vis-à-vis de cette réforme (dans la forme qui nous a été présentée). Il suffirait d’une fois !!! Un jour où nous sortirions tous dans la rue afin de signifier au président des banquiers que ces mesures, nous n’en voulons pas. Du moins, tant qu’il n’aura pas légiférer pour enrayer la très mauvaise répartition des richesses dans notre pays. Il n’est plus acceptable de voir les milliards d’euros générés par les « petits » atterrir dans les poches des rentiers, du moins dans ces proportions. Je souhaite aussi avertir le « président » une nouvelle fois (je l’ai déjà prévenu l’an passé par courrier), les ministres, le parlement et les forces de l’ordre qui défendent tout ce « beau monde », que par leurs actions ils fabriquent des séditieux chaque jour. Et que comme ils le redoutent, une radicalisation des gens soucieux d’une société plus juste est en marche, et que ça risque de leur faire tout « drôle » quand ça va péter. Ceci n’est en rien une menace, mais une réalité qui va éclater prochainement si un vrai virage social n’est pas opéré rapidement par nos « dirigeants ». Nous arrivons à la fin d’un système inique"},
      {role: "user",name:"temoin", content:"Le cortège, rassemblant environ 5000 personnes, a eu lieu pour protester contre la Loi de Sécurité Globale visant à accroître l'impunité policière, dans le cadre de la politique sécuritaire du gouvernement. Valentin Leroux, journaliste, a tweeté pour dénoncer la violence policière envers les manifestants, y compris des enfants et des personnes vulnérables. À la fin de la manifestation, qui s'est déroulée dans un climat calme, le cortège a changé de direction. Qu'il s'agisse d'un acte délibéré ou non, de nombreuses personnes ont suivi le cortège sans se rendre compte qu'ils s'éloignaient de la route prévue. Les organisateurs n'ont pas réussi à rediriger les manifestants, qui se sont retrouvés dans une rue commerçante étroite du centre-ville. La police a alors lancé des gaz lacrymogènes, bloquant tout le cortège dans la rue. Une fois de plus, la police a choisi la violence envers une foule pacifique, comprenant des enfants et des personnes vulnérables. Valentin Le Roux a rapporté qu'un enfant de 4 ans était présent, dans un état de panique, et que des femmes âgées pleuraient"},
      {role: "assistant",name:"Mandataire", content:` c'est très bien monsieur le juge nous avons entendu 2 témoin {role:user,name:temoinS,content:'promptVictime'}`},
      {role: "assistant",name:"Magistrat", content:"je note donc la présence de preuves et de témoins au dossier.([TemoinA]:{Un membre du cortège qui a assisté à la manifestation et a été exposé aux gaz lacrymogènes. Il a affirmé que la police n'a donné aucun avertissement avant d'utiliser les gaz lacrymogènes, et que des personnes vulnérables étaient présentes dans la foule} et le [temoinB]:{Un membre du cortège qui a assisté à la manifestation et a été exposé aux gaz lacrymogènes. Il a affirmé que la police n'a donné aucun avertissement avant d'utiliser les gaz lacrymogènes, et que des personnes vulnérables étaient présentes dans la foule})"},
      {role: "system",name:"[📔.dalloz]", content:"phase[01-1]:[RUN]:[brainstorming(bilan ou  Rapport de commissiont)]"},
      {role: "system",name:"procureurRépublique", content:`groq -l ${affaireEscrow}`},
      //  {role: "user",name:"[🌴.Groq]", content: BorderChars },
  //  {role: "user",name:"[🌴.Groq]", content: "groq`[📔.codex]`+`BorderChars`framWork.response" },rédige-moi un bilan de la faire en fonction du contenu 
  //  {role: "assistant",name:"[💬.cloud]", content:"[start]:Trainning mode}"},
  //  {role: "user",name:"[🌴.Groq]", content: "`groq`" },
  //  {role: "assistant",name:"[📔.codex]", content:"phase[01]:[RUN]:[dial:conversation(message/response)entre(user/assistant))]"},
  //  {
  //    "role": "system",
  //    "content": "[zira]",
  //  },
  //  {
  //    "role": "user",
  //    "content": "[content]:template.response",
  //  },
  //  {
  //    "role": "assistant",
  //    "content": "groq response",
  //  },
  //  {role: "assistant",name:"[📔.codex]", content:"phase[01]:[END]:[brainstorming(session.timestamp)]"},
  //  {role: "system",name:"[📔.codex]", content:"`systemContent` genetation de la documention et traduction de la documentation en lang:Fr, Français:stp!"},
  //  {role: "system",name:"[🌌.systemDream]", content:"groq"},
    ],
    model: "mixtral-8x7b-32768",
    temperature: 0.5,
    max_tokens: 2024,
    top_p: 1,
    stop: null,
    stream: false
}).then((chatCompletion)=>{
    const mdContent = chatCompletion.choices[0]?.message?.content;
    const outputFilePath = "data/CPI-law_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
    fs.writeFileSync(outputFilePath, mdContent);
    console.log("Documentation du contructor généré et enregistré dans " + outputFilePath);
});
}

main();