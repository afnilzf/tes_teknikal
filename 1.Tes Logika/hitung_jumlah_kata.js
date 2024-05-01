function realWordCount(input) {
    let arr = input.trim().split(" ");
    let wordCounter = 0;
    let textOnly = "abcdefghijklmnopqrstuvwxyz";
    let lastText = "?,.!";
    arr.forEach(data => {
        if (checkText(data, "-")) {
            let sameWord = data.split("-");
            if (sameWord.length === 2 && sameWord[0].toLowerCase() === sameWord[1].toLowerCase()) {
                wordCounter++;
            }
        } else {
            let newWord = data.split("");
            let len = newWord.length;
            let alpCounter = 0;
            if (checkText(lastText, newWord[len - 1])) {
                alpCounter++;
            }
            newWord.forEach(newData => {
                if (checkText(textOnly, newData.toLowerCase())) {
                    alpCounter++;
                }
            });
            if (len === alpCounter) {
                wordCounter++;
            }
        }
    });
    return wordCounter;
}

function checkText(baseText, textToCheck) {
    return baseText.toLowerCase().includes(textToCheck.toLowerCase());
}

let input1 = "Saat meng*ecat tembok, Agung dib_antu oleh Raihan.";
console.log("output: " + realWordCount(input1));

let input2 = "Berapa u(mur minimal[ untuk !mengurus ktp?";
console.log("output: " + realWordCount(input2));

let input3 = "Masing-masing anak mendap(atkan uang jajan ya=ng be&rbeda.";
console.log("output: " + realWordCount(input3));
