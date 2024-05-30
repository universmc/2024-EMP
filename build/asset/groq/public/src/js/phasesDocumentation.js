// phasesDocumentation.js
import { writeFile } from 'fs/promises';
import ganttWork from './gantt-work.json' assert { type: 'json' };

export async function createDocumentationForPhases(
) {
    try {
        const promises = ganttWork.phases.map(createMarkdownFileForPhase);
        const filePaths = await Promise.all(promises);
        console.log(`Les documents de phase ont été créés à ces emplacements : ${filePaths.join(', ')}`);
    } catch (error) {
        console.error(`Une erreur est survenue : ${error.message}`);
    }
}

export async function createMarkdownFileForPhase(phase) {
    const fileContent = `# ${phase.name}
    Durée : ${phase.duration}
    Étapes :
    - ${phase.steps.join('\n- ')}
    `;
    const fileName = `Phase_${getFileName(phase.name)}.md`;
    const filePath = `./doc/${fileName}`;
    await writeFile(filePath, fileContent);
    return filePath;
}

export function getFileName(name) {
    return `Phase${name
        .replace(/ /g, '_')
        .replace(/[-_]+/g, '_')
        .replace(/[_]{2,}/g, '_')}`;
}


