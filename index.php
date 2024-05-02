<?php
// Connexion à la base de données
$servername = "localhost";
$username = "game";
$password = "root";
$dbname = "jeu_de_mots";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nom_utilisateur = $_POST['nom_utilisateur'];
    $mot_de_passe = $_POST['mot_de_passe'];

    $sql = "SELECT * FROM joueurs WHERE nom='$nom_utilisateur' AND mot_de_passe='$mot_de_passe'";
    $result = $conn->query($sql);

    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();
        $nouveaux_points = $row['points'] + 1;
        $sql_update = "UPDATE joueurs SET points=$nouveaux_points WHERE id=" . $row['id'];
        if ($conn->query($sql_update) === TRUE) {
            echo "Points mis à jour avec succès.";
        } else {
            echo "Erreur lors de la mise à jour des points: " . $conn->error;
        }
        header("Location: win.php");
        exit;
    } else {
        echo "Nom d'utilisateur ou mot de passe incorrect.";
    }
}

$conn->close();
?>
