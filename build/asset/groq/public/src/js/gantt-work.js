const phases = [
    phaseConception,
    phaseConfiguration,
    // ... autres phases
];



// Phase de conception
const phaseConception = async (
    ) => {
        // Planifier l'architecture du système
    // Définir les besoins fonctionnels et les spécifications
    // Élaborer les documents de conception
    }
    
    async function processMessages(messages) {
        for (const message of messages) {
            if (message.role === "system" && message.name === "systemDream") {
                const phaseNumber = message.content.split(":")[0].replace("phase", "");
                const phase = phases[phaseNumber];
                if (phase) {
                    const markdown = await generateMarkdown(phase);
                    // Écrivez le Markdown dans un fichier, une base de données ou une API.
    }
            }
        }
    }
    const messages = ['role'='assistant','content'='test'] // Votre JSON de messages
    processMessages(messages);
    

const executeProject = async (
) => {
    await Promise.all(phases.map(phase => phase()));
    console.log("Projet terminé");
};
