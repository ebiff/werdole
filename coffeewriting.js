

// Variables (0=0) //
var dictionURL = "https://api.dictionaryapi.dev/api/v2/entries/en/"
var randWerd = wirdnird[Math.floor(Math.random() * wirdnird.length)];
var curLet = 0
var curRow = 0
var WeHaveANguyener = false

console.log(randWerd);
window.alert("Hello Werdole");
console.log("Hello Werdole");

// Returns Random Word From WirdNirdListird (O-O) //
function CreepyRando () {
    return wirdnird[Math.floor(Math.random() * wirdnird.length)];
}

// Typing Functionality (UwU) //
window.addEventListener('keydown', function (e) {
    if (WeHaveANguyener) {
        return;
    }

    // Only Allows Letters To Be Displayed //
    if (e.which >= 65 && e.which <= 90) {
        if (curLet <= 6) {
            document.getElementById("TheWholeThing")
                    .children[curRow]
                    .children[curLet]
                    .innerHTML = `${e.key}`;
            curLet++;
        }
        
        if (curLet == 7) {
            SpellChecker(curRow)
        }
    }
    if (e.key == "Backspace") {
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
    if (e.key == "Enter") {
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
    console.log(werdscape);
    return werdscape;
}

// Checks Word When Spaces Are Filled //
function SpellChecker (checkRow) {
    var wordGuess = CurWurd(checkRow);
    
    ValidWird(wordGuess).then(result => {
        var isValid = result
        console.log(isValid)
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
            Guess = Guess.substring(0, i) + '-' + Guess.substring(i + 1);
            Correct = Correct.substring(0, i) + '/' + Correct.substring(i + 1);
            console.log (Guess)
            console.log (Correct)
        }
    }
    for (var i=0; i<7; i++) {
        if (Correct.includes(Guess[i])) {
            const indcorlet = Correct.indexOf(Guess[i]);
            document.getElementById("TheWholeThing")
                    .children[curRow]
                    .children[i]
                    .className += " wrong-place"       
            Correct = Correct.substring(0, indcorlet) + '/' + Correct.substring(indcorlet + 1);    
            console.log (Correct)
        }
    }
    // Checks If All Letters In Guess Are Correct And Have Been Changed To - //
    if (Guess == "-------") {
        WeHaveANguyener = true
    }
}
if (WeHaveANguyener) {
    
}