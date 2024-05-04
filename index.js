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
    "APPLE", "ANDRO", "BELLE", "SMILE", "MYSQL", "HTML5"
];
var randomIndex = Math.floor(Math.random() * guess.length);
var randomGuess = guess[randomIndex];

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


function moveToNext(row,prevInputId, currentInputId, nextInputId) {
    
    document.getElementById(currentInputId).value = document.getElementById(currentInputId).value.toUpperCase();
    document.getElementById(currentInputId).disabled = true;
    if (document.getElementById(currentInputId).value.length === 1) {
        if (nextInputId !== '') {
            document.getElementById(nextInputId).disabled = false;
            document.getElementById(nextInputId).focus();
        } else {
            cheak()
            var nextRow = row + 1;
            if (nextRow <= 6) {
                document.getElementById("cell" + nextRow + "1").disabled = false;
                document.getElementById("cell" + nextRow + "1").focus();
            }
            if (currentInputId == "cell65"){
                const guess = jibilkelma(6);
                console.log(guess);
                if (guess !== randomGuess){
                    window.location.href = "lose.html";
                }  
            }
        }
    }
    
    if (event.keyCode === 8) {
        if ( prevInputId !== ""){
            document.getElementById(currentInputId).disabled = true;
            document.getElementById(prevInputId).value = "";
            document.getElementById(prevInputId).disabled = false;
            document.getElementById(prevInputId).focus();
        }
        else
        {
            document.getElementById(currentInputId).value = "";
            document.getElementById(currentInputId).disabled = false;
            document.getElementById(currentInputId).focus();
        }
    }
    
    
}

