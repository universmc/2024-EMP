Voici un exemple de fichier PHP de base pour gérer les requêtes API d'un sujet de gestion de données backend :

```php
<?php

// Fichier de configuration avec les informations de connexion à la base de données
require_once 'config.php';

// Fonction pour récupérer toutes les données d'une table
function getAllData($table) {
    global $conn;
    $query = "SELECT * FROM $table";
    $result = mysqli_query($conn, $query);
    $data = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }
    return $data;
}

// Fonction pour récupérer une donnée spécifique par son ID
function getDataById($table, $id) {
    global $conn;
    $query = "SELECT * FROM $table WHERE id=$id";
    $result = mysqli_query($conn, $query);
    return mysqli_fetch_assoc($result);
}

// Fonction pour ajouter une nouvelle donnée
function addData($table, $data) {
    global $conn;
    $keys = implode(',', array_keys($data));
    $values = implode(',', array_values($data));
    $query = "INSERT INTO $table ($keys) VALUES ($values)";
    return mysqli_query($conn, $query);
}

// Fonction pour mettre à jour une donnée existante
function updateData($table, $data, $id) {
    global $conn;
    $fields = [];
    foreach ($data as $key => $value) {
        $fields[] = "$key=$value";
    }
    $query = "UPDATE $table SET " . implode(',', $fields) . " WHERE id=$id";
    return mysqli_query($conn, $query);
}

// Fonction pour supprimer une donnée
function deleteData($table, $id) {
    global $conn;
    $query = "DELETE FROM $table WHERE id=$id";
    return mysqli_query($conn, $query);
}

?>
```

Ce fichier PHP contient des fonctions pour gérer les requêtes CRUD (Create, Read, Update, Delete) de base pour une table donnée. Il est important de noter que ce code est un exemple de base et doit être adapté aux besoins spécifiques de votre application. De plus, il est essentiel de mettre en place des mesures de sécurité adéquates, telles que la validation des données et la protection contre les injections SQL.