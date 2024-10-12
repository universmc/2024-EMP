const Groq = require("groq-sdk");
const readline = require("readline");
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const inquirer = require("inquirer");

// Chargement des rôles à partir des fichiers JSON
const rolesSystem = JSON.parse(fs.readFileSync(path.join(__dirname, 'instance/roles-system.json'), 'utf8'));
const rolesUser = JSON.parse(fs.readFileSync(path.join(__dirname, 'instance/roles-user.json'), 'utf8'));
const rolesAssistant = JSON.parse(fs.readFileSync(path.join(__dirname, 'instance/roles-assistant.json'), 'utf8'));

// Fonction pour interagir avec l'utilisateur et sélectionner un rôle
async function selectRole() {
  const { roleChoice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'roleChoice',
      message: 'Sélectionnez un rôle pour afficher les fonctionnalités:',
      choices: [rolesSystem.name, rolesUser.name, rolesAssistant.name]
    }
  ]);

  const selectedRole = [rolesSystem, rolesUser, rolesAssistant].find(role => role.name === roleChoice);
  
  console.log(`Vous avez choisi le rôle : ${selectedRole.name}`);
  console.log(`Description: ${selectedRole.description}`);
  console.log(`Responsabilités: ${selectedRole.responsibilities.join(', ')}`);
  console.log(`Compétences: ${selectedRole.competences ? selectedRole.competences.map(cmp => cmp.nom).join(', ') : ''}`);
}

selectRole();