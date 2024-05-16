<?php
// Récupérer le score actuel du fichier XML
$xml = simplexml_load_file('joueurs.xml');
$score = intval($xml->score);

// Mettre à jour le score en fonction de l'action reçue
if ($_GET['action'] == 'add') {
    $score += 10;
} elseif ($_GET['action'] == 'subtract') {
    $score -= 10;
}

// Mettre à jour le score dans le fichier XML
$xml->score = $score;
$xml->asXML('joueurs.xml');

// Retourner le nouveau score
echo $score;
?>
