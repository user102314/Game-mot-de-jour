window.onload = function() {
    
    for (let i = 1; i <= 6; i++) {
        for (let j = 1; j <= 5; j++) {
            document.getElementById("cell" + i + j).disabled = true;
        }
    }
    document.getElementById("cell11").disabled = false;
    document.getElementById("cell11").focus();
    
};
var guess = [
    "APPLE", "ANDRO", "BELLE", "SMILE", "MYSQL", "HTML5" ,"BOOT5","PHP70",
];
var randomIndex = Math.floor(Math.random() * guess.length);
var randomGuess = guess[randomIndex];
console.log(randomGuess)

function cheak() {
    let i = null;
    for (let row = 1; row <= 6; row++) {
        if (document.getElementById("cell" + row + "1").value !== "") {
            i = row;
            break;
        }
    }
    if (i == null) {
        return;
    }
    for (let row = 1; row <= 6; row++) {
        if (document.getElementById("cell" + row + "1").value !== "") {
            const guess = jibilkelma(row);
            if (guess == "false") {
                alert('le mot que vous avez entré est inférieur à 5 lettres.');
                return;
            }
            veriff(randomGuess, guess, row);
        }
    }
}

function vs1() {
    lastWord = document.getElementById("mot").value;
    document.getElementById("mot").value = "";
}

function cheak1() {
    const word = lastWord;
    let i = null;
    for (let row = 1; row <= 6; row++) {
        if (document.getElementById("cell" + row + "1").value !== "") {
            i = row;
            break;
        }
    }
    console.log(i)
    if (i === null) {
        return;
    }
    for (let row = 1; row <= 6; row++) {
        if (document.getElementById("cell" + row + "1").value !== "") {
            const guess = jibilkelma(row);
            if (guess == "false") {
                alert('le mot que vous avez entré est inférieur à 5 lettres.');
                return;
            }
            veriff(word, guess, row);
        }
    }
}

function jibilkelma(row) {
    let guess = "";
    for (let j = 1; j <= 5; j++) {
        const cell = document.getElementById("cell" + row + j);
        guess += cell.value;
    }
    if (guess.length != 5) {
        guess = "false"
    }
    return guess;
}

function veriff(word, guess, row) {
    let g = 0;
    for (let j = 0; j < 5; j++) {
        if (word[j] === guess[j]) {
            changeCellColor(row, j + 1, 'green');
            g++;
        } else if (verif(word, guess[j])) {
            changeCellColor(row, j + 1, '#ffae00');
        } else {
            changeCellColor(row, j + 1, '#080052');
        }
    }
    if (g === 5) {
        addScore();
        window.location.reload()
        window.location.href = 'win.html';
        
        
        
    }
}

function changeCellColor(row, cell, color) {
    let cellElement = document.getElementById("cell" + row + cell);
    cellElement.style.background = color;
    cellElement.classList.add(color + '-background');
    setTimeout(function() {
        cellElement.classList.remove(color + '-background');
    }, 1550);
}
function verif(word, ch) {
    for (let j = 0; j < 5; j++) {
        if (word[j] === ch) {
            return true;
        }
    }
    return false;
}

document.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
        cheak();
    }
});

var nextRow = 0 ;

function moveToNext(row, prevInputId, currentInputId, nextInputId) {
    document.getElementById(currentInputId).value = document.getElementById(currentInputId).value.toUpperCase();
    document.getElementById(currentInputId).disabled = true;

    if (document.getElementById(currentInputId).value.length === 1) {

        if (nextInputId !== '' && event.keyCode !== 13) { 
            document.getElementById(nextInputId).disabled = false;
            document.getElementById(nextInputId).focus();
            console.log("passs");
        } else if(nextInputId == '' && event.keyCode !== 13){
            console.log("Test here");
            document.getElementById(currentInputId).disabled = false;
            document.getElementById(currentInputId).focus();
        }
        if (event.keyCode === 13) { 
            console.log(nextRow);
            console.log("Test here also");
            nextRow = row + 1;
            cheak();
            console.log("paasse lg 1");
            if (nextRow <= 6) {
                document.getElementById("cell" + nextRow + "1").disabled = false;
                document.getElementById("cell" + nextRow + "1").focus();
            }
            if (currentInputId == "cell65") {
                const guess = jibilkelma(6);
                console.log(guess);
                if (guess !== randomGuess) {
                    window.location.reload()
                    window.location.href = "lose.html";
                    
                    moinScore();
                    
                }
            }
        }
    }
    if (event.keyCode === 8){
        if(prevInputId !== "" ) {
            console.log("haya dakhlin khtr li 9bal mahich fer8a")
            if (nextInputId === '' ) {
                console.log("haya dakhlin khtr li ba3dha fer8a") 
                if (document.getElementById(currentInputId).value.length === 1) {
                    console.log("haya dakhlin khtr li ba3dha fer8a w hiya fiha hkaya") 
                    document.getElementById(currentInputId).value = "";
                    document.getElementById(currentInputId).disabled = false;
                    document.getElementById(currentInputId).focus();
                }
                else {
                    console.log("haya dakhlin khtr li ba3dha fer8a w hiya fihach hkaya") 
                    document.getElementById(currentInputId).value = "";
                    document.getElementById(currentInputId).disabled = true;
                    document.getElementById(prevInputId).disabled = false;
                    document.getElementById(prevInputId).focus();
                }
            }
            else {
                document.getElementById(prevInputId).value = "";
                document.getElementById(currentInputId).disabled = true;
                document.getElementById(prevInputId).disabled = false;
                document.getElementById(prevInputId).focus();
            }
            
        }
        else{
                document.getElementById(currentInputId).value = "";
                document.getElementById(currentInputId).disabled = false;
                document.getElementById(currentInputId).focus();
            }
    }
}
document.addEventListener("DOMContentLoaded", function() {
    // Vérifier si le score est déjà stocké localement
    var storedScore = localStorage.getItem('score');
    if(storedScore) {
        document.getElementById("demo").innerHTML = storedScore + " Pt";
    } else {
        // Récupérer le score depuis le serveur
        fetchScoreFromServer();
    }
});

function fetchScoreFromServer() {
    var requete = new XMLHttpRequest();
    requete.open('GET', 'joueurs.xml', true);
    requete.onreadystatechange = function() {
        if (requete.readyState == 4 && requete.status == 200) {
            var xmldoc = requete.responseXML;
            var score = xmldoc.getElementsByTagName("score")[0].textContent;
            document.getElementById("demo").innerHTML = score + " Pt";
            // Stocker le score dans le stockage local pour une utilisation ultérieure
            localStorage.setItem('score', score);
        }
    };
    requete.send();
}

function updateScoreOnServer(newScore) {
    var requete = new XMLHttpRequest();
    requete.open('GET', 'update_scores.php?score=' + newScore, true);
    requete.send();
}

function addScore() {
    var currentScore = parseInt(localStorage.getItem('score'));
    var newScore = currentScore + 10;
    document.getElementById("demo").innerHTML = newScore + " Pt";
    localStorage.setItem('score', newScore);
    
    // Mettre à jour le score sur le serveur
    updateScoreOnServer(newScore);
}

function moinScore() {
    var currentScore = parseInt(localStorage.getItem('score'));
    var newScore = currentScore - 10;
    document.getElementById("demo").innerHTML = newScore + " Pt";
    localStorage.setItem('score', newScore);
    
    // Mettre à jour le score sur le serveur
    updateScoreOnServer(newScore);
}

