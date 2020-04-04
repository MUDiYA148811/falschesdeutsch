var list;
var translate;
var lifes = 3;
var score = 0;
var i = 0;
var words = [];
var j = 0;
words.length = 1;

function writeWord() {
    document.getElementById('buttonTrue').hidden = false;
    document.getElementById('buttonFalse').hidden = false;
    document.getElementById('buttonNext').hidden = true;
    let currentWord;
    let currentList;
    let chance = 0.5;
    let listPrev;
    list = Math.random();
    if(list < chance) {
        if(listPrev == 1) {
            chance = 0.5;
        }
        list = 0;
        chance -= 0.1;
        listPrev = list;
        var request = new XMLHttpRequest;
        request.open('GET', 'words.txt', true);
        request.onload = function() {
            var content = request.response;
            content = content.split(';');
            while(i < content.length - 1) {
                content[i] = content[i].split('-');
                i++;
            }
            word = Math.floor(Math.random()*content.length);
            document.getElementById('word').textContent = content[word][0];
            console.log('length: ' + content.length);
            console.log('word: ' + word);
            translate = content[word][1];
        };
        i = 0;
        request.send(null);
    }
    else {
        if(listPrev == 0) {
            chance = 0.5;
        }
        list = 1;
        chance += 0.1;
        listPrev = list;
        var request = new XMLHttpRequest;
        request.open('GET', 'fakewords.txt', true);
        request.onload = function() {
            var content = request.response;
            content = content.split(';');
            word = Math.round(Math.random()*(content.length - 1));
            words.length = content.length;
            while(words[word] == content[word]) {
                word = Math.round(Math.random()*(content.length - 1));
                if(j == words.length) {
                    break;
                }
            }
            words[word] = content[word];
            j += 1;
            document.getElementById('word').textContent = content[word];
            console.log(content[word]);
        };
        request.send(null);
    }
}

function act(answer) {
    document.getElementById('buttonTrue').hidden = true;
    document.getElementById('buttonFalse').hidden = true;
    if(answer == list) {
        score += 1;
        document.getElementById('buttonNext').hidden = false;
        document.getElementById('score').textContent = score;
        document.getElementById('word').textContent = 'Richtige Antwort';
        if(j == words.length) endGame();
    } else {
        lifes -= 1;
        if(lifes == 0) {
            document.getElementById('word').textContent = 'Spiel ist aus';
            document.getElementById('lifes').textContent = lifes;
            document.getElementById('buttonNew').hidden = false;
        } else {
            document.getElementById('buttonNext').hidden = false;
            document.getElementById('lifes').textContent = lifes;
            document.getElementById('word').textContent = 'Falsche Antwort';
        }
    }
    if(answer == 1 & list == 0) {
        document.getElementById('word').textContent = 'Falsche Antwort, Übersetzung: ' + translate;
    }
}

function newGame() {
    document.getElementById('score').textContent = 0;
    document.getElementById('lifes').textContent = 3;
    document.getElementById('buttonNew').hidden = true;
    lifes = 3;
    score = 0;
    j = 0;
    words = [];
    writeWord();
}

function endGame() {
    document.getElementById('buttonTrue').hidden = true;
    document.getElementById('buttonFalse').hidden = true;
    document.getElementById('buttonNext').hidden = true;
    document.getElementById('word').textContent = 'Sie gewinnen!';
    document.getElementById('lifes').textContent = lifes;
    document.getElementById('buttonNew').hidden = false;
}
