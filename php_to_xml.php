<?php
$xml = simplexml_load_file('joueurs.xml');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nom_utilisateur = $_POST['nom_utilisateur'];
    $mot_de_passe = $_POST['mot_de_passe'];

    foreach ($xml->joueur as $joueur) {
        if ($joueur->nom == $nom_utilisateur && $joueur->mot_de_passe == $mot_de_passe) {
            $joueur->points = intval($joueur->points) + 1;
            $xml->asXML('joueurs.xml');
            header("Location: win.php");
            exit;
        }
    }
    echo "Nom d'utilisateur ou mot de passe incorrect.";
}
?>
