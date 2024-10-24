Voici un exemple de fichier SQL pour créer une base de données et des tables pour le sujet City Game & Pixel Art :

```sql
-- Création de la base de données
CREATE DATABASE City_Game_Pixel_Art;

-- Utilisation de la base de données
USE City_Game_Pixel_Art;

-- Création de la table "Cities"
CREATE TABLE Cities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  population INT NOT NULL,
  description TEXT
);

-- Création de la table "PixelArt"
CREATE TABLE PixelArt (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  width INT NOT NULL,
  height INT NOT NULL,
  image LONGBLOB NOT NULL,
  city_id INT,
  FOREIGN KEY (city_id) REFERENCES Cities(id)
);

-- Création de la table "Users"
CREATE TABLE Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') NOT NULL DEFAULT 'user'
);

-- Création de la table "Likes"
CREATE TABLE Likes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  pixel_art_id INT,
  FOREIGN KEY (user_id) REFERENCES Users(id),
  FOREIGN KEY (pixel_art_id) REFERENCES PixelArt(id)
);

-- Création de la table "Comments"
CREATE TABLE Comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  pixel_art_id INT,
  comment TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(id),
  FOREIGN KEY (pixel_art_id) REFERENCES PixelArt(id)
);
```

Cette base de données contient 5 tables :

* Cities : pour stocker les informations sur les villes du jeu.
* PixelArt : pour stocker les images de pixel art créées par les utilisateurs, avec une référence possible à une ville.
* Users : pour stocker les informations sur les utilisateurs du jeu.
* Likes : pour stocker les likes donnés par les utilisateurs sur les images de pixel art.
* Comments : pour stocker les commentaires laissés par les utilisateurs sur les images de pixel art.

Notez que cette structure de base de données peut être adaptée à vos besoins spécifiques.