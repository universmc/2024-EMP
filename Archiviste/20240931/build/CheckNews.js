const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

async function main() {
  //
  const ElectoralFraudInvestigation =`"Je vous parle aujourd'hui pour exposer une affaire de fraude financière en bande organisée et de scandale politique impliquant le financement de la répression armée du trafic d'armes par de hauts fonctionnaires installés au Faubourg Saint-Honoré. Le dictateur économique honoré, M. Emmanuel Macron, actuellement élu Président de la République française, est accusé de fraude dans ses comptes de campagne électorale.\n\nLes éléments, 
  les faits et les preuves juridiques qui soutiennent notre cas sont les suivants : Commençons par le Livre II du Code pénal, qui sanctionne les violations du consentement via l'article 226. Cette disposition protège toutes les victimes de l'utilisation abusive répétée de l'article 49, paragraphe 3 de la Constitution française, mise en œuvre par des fonctionnaires publics. Dans ce cas, ces dispositions s'appliquent dans le contexte des projets de réforme correctrice liés aux finances et à l'économie en France, 
  couvrant la période de 2008 à 2024.\n\nJe tiens à souligner que nous disposons de tous les éléments nécessaires pour étayer notre mémoire. D'un point de vue comptable, nous avons en notre possession des documents relatifs à la fraude financière avec les partis politiques 'En Marche', 'La République En Marche' et 'La France En Marche'/'Renaissance'. Ces éléments comptables sont soutenus par des témoignages vidéo de nombreuses victimes lors de manifestations, y compris les Gilets jaunes, des enfants et des journalistes. Nous avons également des preuves de répression physique lors de manifestations, attestant de graves violations des droits fondamentaux des citoyens français.\n\nIl est important de noter que ces faits et éléments présentés sont d'une importance cruciale pour la défense de nos droits constitutionnels et de notre démocratie. C'est pourquoi nous insistons, avec la plus grande détermination, 
  sur la responsabilité de ces actes qui, sans aucun doute, méritent l'attention et l'action de ce tribunal.\n\nLes suspicions de fraude aux comptes de campagne selon l'article L52 du groupement politique EMP (ENSEMBLE ! (MAJORITÉ PRÉSIDENTIELLE), code 1378) de la CNCCFP sont particulièrement pertinentes dans cette affaire. Les documents indiquent des irrégularités majeures dans la gestion des finances de campagne pour l'élection européenne du 9 juin 2024. Tous les éléments de preuve ont été indexés par l'ADOPI, et l'instruction a été menée avec rigueur pour garantir la véracité des informations.\n\nNous croyons que la gravité de ces faits justifie pleinement l'application des articles 313 à 341 du code pénal, visant à réprimer la fraude et la corruption financière. Ces articles sont conçus pour assurer la protection de nos institutions et de notre pays contre la fraude et le détournement de fonds.\n\nDe plus, l'article 431 du Code pénal international, qui sanctionne les actes de violence, est ajouté à notre appel en raison de la répression exercée par M. Emmanuel Macron, ayant conduit à de graves violations des droits de l'homme.
  \n\nDans le cadre de notre approche juridique, nous avons utilisé les dispositions de l'article 41, paragraphe 1 du Code de procédure pénale pour établir cette composition pénale et les négociations ont commencé en 2017 et se poursuivent encore en 2023. Des lettres ont été envoyées au procureur de la République, ainsi que des rapports et des informations concernant cette procédure juridique, transmises aux membres dans le cadre de l'affaire 910.\n\nLes agents numéros 1113 et 974 de la CNCCFP ont assuré l'enquête et la transmission de ces informations au procureur afin de garantir un traitement approprié de cette question d'importance nationale.\n\nEn conclusion, nous vous exhortons à prendre en compte tous les éléments présentés et à assurer la justice et le respect des principes fondamentaux qui régissent notre société. Nous espérons que cette audience marquera un tournant dans la protection de nos droits et de la démocratie en France."`
  roleSystem = "gen -DevOps";
  roleAssistant = "Professor";
  roleUser = "Generator";

  const chatCompletion = await groq.chat.completions.create({
    "messages": [
        
      {role: "system",name:"[🌌_system", content:"welcom "},
      {role: "system",name:"[🌌_system", content:`"${ElectoralFraudInvestigation}"`},
      {role: "assistant",name:"[📔_codex]", content:"[📔.codex]_Phase[01]:[RUN]:[brainstorming[.Generator.]]"},
      {role: "user",name:"[🌴_Groq]", content: "[🌴_Groq]+[promptmodel]+[🤖_emojis.sh]+[[💬emojispicker]!" },
    
      {role: "system", content:"Phase 1: Initialisation de l'instance"},
      {
        "role": "assistant",
        "name":"JugeElection",
        "content": "vous incarnerez le rôle de jugeElection (role:system,name,JugeElection,content:[mission]) Vous êtes l'intelligence artificielle centrale créer votre role dans le context de la créer d'une instance groq-sdk dans le cadre une enquête sur la campagne electoral du 09-12-2024 au coeur du code source et d'un scandale politico finicier et de Suspicion de fraude aux comptes de campagne [mission] \" Juge des elections Campagne Electoral européenes\". Voici ## votre contexte, ## vos rôles, ## vos compétences, ## vos tâches, ## votre processus, et ## les caractéristiques recherchées, ## Actions Immédiates :"
      },
      {
        "role": "assistant",
        "name": "Journaliste",
        "content": "vous incarnerez le rôle de journaliste votre 1er Mission rédigez un plan de développement optimisé avec un modèle de gantt Pour présentater le concept et Et de commencer l'enquête demandée par le juge des élections dans cette instance"
      },
      {role: "system", content:"Phase 2: Collect des données sur cette enquête dadite fraude aux compte de campagne du 9 juin 2024"},
      {role: "user", content:"présentation du rôle de juge des élections Campagne Européene en France Juin 2024 et de l'enquête en cours du role:journaliste dans cette instance"},
      {role: "assistant", content:"rédigez une checkNew.html bien Style épuré Convention légale gouvernementale et parlementaire lang:Fr Français sur le groupement politique EMP(EN+RE+LREM+EM!), 'Ensemble majorité présidentielle' indexé au numéro 1378 de la commission nationale des comptes de campagne et des formations politiquesen avant en lumière les arguments développés sur ${ElectoralFraudInvestigation} et en fonction du bilan pour commencer les Investigation optimisé avec un modèle de gantt Pour la présentation du concept et du projet précédemment cités, Ta réponse devrait être rédigé au format HTML et le plan de développement présenté section par section selon norme du sémantique W3C"}

    ],
    model: "mixtral-8x7b-32768",
    temperature: 0.6,
    max_tokens: 2048,
    top_p: 1,
    stop: null,
    stream: false
}).then((chatCompletion)=>{
    const htmlContent = chatCompletion.choices[0]?.message?.content;
    const outputFilePath = "CheckNews-🤖_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".html";
    fs.writeFileSync(outputFilePath, htmlContent);
    console.log("Documentation du contructor généré et enregistré dans " + outputFilePath);
});
}

main();