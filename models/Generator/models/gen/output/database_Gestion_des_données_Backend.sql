Voici un exemple de fichier SQL pour créer une base de données et des tables pour la gestion de données backend :

-- Création de la base de données
CREATE DATABASE Gestion\_des\_donnees\_Backend;

-- Utilisation de la base de données
USE Gestion\_des\_donnees\_Backend;

-- Création de la table utilisateurs
CREATE TABLE Utilisateurs (
id INT AUTO\_INCREMENT PRIMARY KEY,
nom VARCHAR(50) NOT NULL,
prenom VARCHAR(50) NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
mot\_de\_passe VARCHAR(100) NOT NULL
);

-- Création de la table données
CREATE TABLE Donnees (
id INT AUTO\_INCREMENT PRIMARY KEY,
titre VARCHAR(100) NOT NULL,
description TEXT,
date\_creation DATETIME NOT NULL,
utilisateur\_id INT,
FOREIGN KEY (utilisateur\_id) REFERENCES Utilisateurs(id)
);

-- Création de la table types\_de\_donnees
CREATE TABLE Types\_de\_donnees (
id INT AUTO\_INCREMENT PRIMARY KEY,
nom VARCHAR(50) NOT NULL
);

-- Création de la table donnees\_types
CREATE TABLE Donnees\_Types (
donnee\_id INT,
type\_id INT,
FOREIGN KEY (donnee\_id) REFERENCES Donnees(id),
FOREIGN KEY (type\_id) REFERENCES Types\_de\_donnees(id)
);

Cette base de données contient une table pour les utilisateurs, une table pour les données et une table pour les types de données. La table données est reliée à la table utilisateurs grâce à une clé étrangère, de même que la table données\_types est reliée aux tables données et types\_de\_donnees grâce à des clés étrangères.