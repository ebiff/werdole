// import ConfettiGenerator from "confetti-js";

// Variables (0=0) //
var dictionURL = "https://api.dictionaryapi.dev/api/v2/entries/en/"
var randWerd = wirdnird[Math.floor(Math.random() * wirdnird.length)];
var curLet = 0
var curRow = 0
var WeHaveANguyener = false
var confetti = null

console.log("Hello Werdole");
// console.log(randWerd); //

// uncomment below for a surprise ;;;;)))))
// window.alert("PLAY THIS GAME FOR NEW MANSION AND LAMBO!!! (NO SCAMS, PRESS OK TO WIN ;)"); //


// Returns Random Word From WirdNirdListird (O-O) //
function CreepyRando () {
    return wirdnird[Math.floor(Math.random() * wirdnird.length)];
}

// Typing Functionality (UwU) //
// Clickables (~^~) //


function LettGet (letter) {
    if (WeHaveANguyener) {
        return;
    }
    if (curLet <= 6) {
        document.getElementById("TheWholeThing")
                .children[curRow]
                .children[curLet]
                .innerHTML = `${letter}`;
        curLet++;
    }
    
    if (curLet == 7) {
        SpellChecker(curRow)
    }
}
function Back () {
    if (curLet > 0) {
        curLet--;
        document.getElementById("TheWholeThing")
                .children[curRow]
                .children[curLet]
                .innerHTML = "&nbsp;";
        document.getElementById("TheWholeThing")
                .children[curRow]
                .classList
                .remove('not-valid');
    }
}
function Enterer () {
    if (curLet == 7) {
        var wordGuess = CurWurd(curRow);
        ValidWird(wordGuess).then(valid => {
            if (valid) {
                GuessVsCorrect (wordGuess, randWerd)
                if (curRow < 6) {
                    curRow++;
                    curLet -= 7;
                }
            }
        })
        
    }
}
function ButtLett (e) {
    let pie = e.currentTarget
    if (pie.id == "backspace") {
        Back ();
    }
    else if (pie.id == "enter") {
        Enterer ();
    }
    else {
        LettGet (pie.innerHTML)
    }
}

// kolor the keys (UuU) //
function KeyKolor (ledr, className) {
    document.getElementById(ledr).className += className
}

window.addEventListener("load", function(event) {
    var clickeronies = document.getElementsByClassName("key");
    var confettiElement = document.getElementById('my-canvas');
    var confettiSettings = { target: confettiElement,
                             size: 1.5,
                             max: 500,
                             colors: [[255, 183, 74],
                                     [146, 199, 255],
                                     [118, 182, 249],
                                     [207, 156, 249],
                                     [255, 243, 159],
                                     [227, 216, 140],
                                     [142, 235, 175],
                                     [255, 207, 234],
                                     [255, 178, 221]]};
    confetti = new ConfettiGenerator(confettiSettings);

    // get reference to button
    for (var i = 0; i < clickeronies.length; i++) {
        clickeronies[i].addEventListener("click", ButtLett);
    }
});

    

window.addEventListener('keydown', function (e) {
    if (WeHaveANguyener) {
        return;
    }

    // Only Allows Letters To Be Displayed //
    if (e.which >= 65 && e.which <= 90) {
        LettGet (e.key);
    }
    if (e.key == "Backspace") {
       Back ();
    }
    if (e.key == "Enter") {
        Enterer ();
    }
}, false);
 
// Get Submitted Word //
// input: row to get word from
// output: word retrieved from row
function CurWurd (row) {
    var werdscape = ""
    for (var i = 0; i < 7; i++) {
        var ladder = document.getElementById("TheWholeThing")
                .children[curRow]
                .children[i]
                .innerHTML;
        werdscape += ladder;
    }
    return werdscape;
}

// Checks Word When Spaces Are Filled //
function SpellChecker (checkRow) {
    var wordGuess = CurWurd(checkRow);
    
    ValidWird(wordGuess).then(result => {
        var isValid = result
        if (!isValid) {
            var invalidWord= document.getElementById("TheWholeThing")
                            .children[checkRow];
            invalidWord.className += " not-valid";
        }
    })
}

// Word Check Against Dictionary ( @ ~ @ ) //
async function ValidWird (word) {
    const response = await fetch(dictionURL+word)
    if (response.status == 200) {
        return true;
    }
    else {
        return false;
    }  
    
}

// Checks Guess Against Correct Word //
function GuessVsCorrect (Guess, Correct) {
    for (var i=0; i<7; i++) {
        if(Correct[i] == Guess[i]) {
            document.getElementById("TheWholeThing")
                    .children[curRow]
                    .children[i]
                    .className += " correct"
            KeyKolor(Guess[i], " key_correct")
            Guess = Guess.substring(0, i) + '-' + Guess.substring(i + 1);
            Correct = Correct.substring(0, i) + '/' + Correct.substring(i + 1);
        }
    }
    for (var i=0; i<7; i++) {
        if (Correct.includes(Guess[i])) {
            const indcorlet = Correct.indexOf(Guess[i]);
            document.getElementById("TheWholeThing")
                    .children[curRow]
                    .children[i]
                    .className += " wrong-place"     
                    KeyKolor(Guess[i], " key_wrong_place")  
            Correct = Correct.substring(0, indcorlet) + '/' + Correct.substring(indcorlet + 1);    
        }
        else if (Guess[i] != "-") {
            KeyKolor(Guess[i], " key_not_found")  
        }
    }
    // Checks If All Letters In Guess Are Correct And Have Been Changed To - //
    if (Guess == "-------") {
        WeHaveANguyener = true
        document.getElementById("my-canvas").className = "show_canvas"
        confetti.render();
    }
}
