var mots = ["apple", "khobz", "salam", "m9ron"];

var indexAleatoire = Math.floor(Math.random() * mots.length); 

var motRandom = mots[indexAleatoire];
function cheak(){

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
            if (guess=="false"){
                alert('le mot que vous aver entre est inferieur a <<< 5 ');
                return;
            }
            veriff(motRandom, guess, row);
        }
    }
}

var lastWord = ""; 

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
            if (guess=="false"){
                alert('le mot que vous aver entre est inferieur a <<< 5 ');
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
    if (guess.length!=5){
        guess = "false"
    }
    return guess;
}

function veriff(word, guess, row) {
    let g = 0 ;
    for (let j = 0; j < 5; j++) {
        if (word[j] === guess[j]) {
            document.getElementById("cell" + row + (j + 1)).style.background = 'green';
            g++;
        } else if (verif(word, guess[j])) {
            document.getElementById("cell" + row + (j + 1)).style.background = 'orange';
        } else {
            document.getElementById("cell" + row + (j + 1)).style.background = 'blue';
        }
    }
    if (g==5){
        window.location.href = 'win.html';
    }
}

function verif(word, ch) {
    for (let j = 0; j < 5; j++) {
        if (word[j] === ch) {
            return true;
        }
    }
    return false;
}
// tbadel il focuus automatique
function moveToNext( nextInputId) {
        var nextInput = document.getElementById(nextInputId);
        nextInput.focus();

}
if (event.keyCode === 13) {
    cheak();
}
