const map = document.querySelector('#map');
const character = document.querySelector('#character');
const talk = document.querySelector('#talk');

/* move character */

let characterPositionX = 0;
let characterPositionY = 0;

function reachedLimit() {
    talk.textContent = "Halt!";
    talk.style.display = 'block';
    character.removeAttribute('class');
}

document.addEventListener('keydown', function (event) {
    // console.log("You've pressed the key:", event.key);

    talk.style.display = 'none'; // så pratbubblan inte fastnar ifall man trycker på en knapp innan animationen (t.ex. jump) är klar

    if (event.key === 'ArrowRight' ||
        event.key === 'ArrowLeft' ||
        event.key === 'ArrowDown' ||
        event.key === 'ArrowUp') {
            event.preventDefault();
    }

    // tangenterna fungerar så länge positionen är inom kartans gränser
    if (characterPositionX < ((900/2)-10) && characterPositionX > -(900/2)) {
        if (event.key === 'd' || event.key === 'ArrowRight') {
            // höger
            characterPositionX += 10;
            character.removeAttribute('class');
            character.classList.add('go-right');
        }
    }
    
    if (characterPositionX < (900/2) && characterPositionX > -((900/2)-10)) {
        if (event.key === 'a' || event.key === 'ArrowLeft') {
            // vänster
            characterPositionX -= 10;
            character.removeAttribute('class');
            character.classList.add('go-left');
        }
    }
    
    if (characterPositionY < ((600/2)-10) && characterPositionY > -(600/2)) {
        if (event.key === 's' || event.key === 'ArrowDown') {
            // ner
            characterPositionY += 10;
            character.removeAttribute('class');
        }
    }

    if (characterPositionY < (600/2) && characterPositionY > -((600/2)-10)) {
        if (event.key === 'w' || event.key === 'ArrowUp') {
            // upp
            characterPositionY -= 10;
            character.removeAttribute('class');
            character.classList.add('go-up');
        }
    }

    // om spöket når kartans gränser
    if (characterPositionX === ((900/2)-10) ||
        characterPositionX === -((900/2)-10) ||
        characterPositionY === ((600/2)-10) ||
        characterPositionY === -((600/2)-10)) {
            reachedLimit();
    }

    character.style.left = characterPositionX + 'px';
    character.style.top = characterPositionY + 'px';

    // loggar positionerna för att kunna sätta ut citaten
    console.log("X: " + characterPositionX);
    console.log("Y: " + characterPositionY);

});

/* character animations */

document.addEventListener('keydown', function(event) {

    if (event.code === 'Space') {
        event.preventDefault(); // så sidan inte rullar ner av mellanslag

        if (!character.classList.contains('jump')) {
        character.classList.add('jump');
        talk.textContent = "Buh!";
        talk.style.display = 'block';

            character.addEventListener('animationend', () => {
                character.classList.remove('jump');
                talk.textContent = "";
                talk.style.display = 'none';
            });
        }
    }
});

character.addEventListener('mouseover', function() {
    talk.textContent = "?";
    talk.style.display = 'block';

    onmouseout = () => {
        talk.textContent = "";
        talk.style.display = 'none';
    };
});

let clicksOnCharacter = 0;
character.addEventListener('click', function(event) {

    talk.style.display = 'block';
    character.removeAttribute('class');
    clicksOnCharacter += 1;

    if (clicksOnCharacter === 1) {
        talk.textContent = "Ahh!";
    } else if (clicksOnCharacter === 2) {
        talk.textContent = "Nein!";
    } else if (clicksOnCharacter === 3 ) {
        talk.textContent = "Bitte nicht!";
    } else if (clicksOnCharacter === 4) {
        talk.textContent = "Hör auf!";
        clicksOnCharacter = 0;
    }

    if (!character.classList.contains('tickle')) {
        character.classList.add('tickle');

            character.addEventListener('animationend', () => {
                character.classList.remove('tickle');
            });
        }

});

function hover() {

    if (!character.classList.contains('jump')) {
        character.classList.add('jump');
        talk.textContent = "Woho!";
        talk.style.display = 'block';

        character.addEventListener('animationend', () => {
            character.classList.remove('jump');
            talk.textContent = "";
            talk.style.display = 'none';
        });
    }
}


/* interactions with surroundings */

// function interact(X, Y) {
//     talk.textContent = "?";
//     talk.style.display = 'block';
// }

// document.addEventListener('keydown', function(event) {
//     event.preventDefault();

//     if (characterPositionX === -30 && characterPositionY === -10) {
//         interact();

//         if (event.code === 'Enter') {
//             talk.textContent = "Das ist eine besondere Blume!";
//             character.classList.add('go-up');
//         }
//     }
//     if (characterPositionX === -380 && characterPositionY === -140) {
//         interact();

//         if (event.code === 'Enter') {
//             talk.textContent = "Hallo Stein! Hast du Rammstein gehört?";
//             character.classList.add('go-left');
//         }
//     }
//     if (characterPositionX === -300 && characterPositionY === -100) {
//         interact();

//         if (event.code === 'Enter') {
//             talk.textContent = "Hallo Baum! Wie viel Äpfel hast du?";
//             character.classList.add('go-left');
//         }
//     }
//     if (characterPositionX === -210 && characterPositionY === 220) {
//         interact();

//         if (event.code === 'Enter') {
//             talk.textContent = "Ich fliege ganz hoch!";
//             character.removeAttribute('class');
//         }
//     }
//     if (characterPositionX === -70 && characterPositionY === -50) {
//         interact();

//         if (event.code === 'Enter') {
//             talk.textContent = "Ich küsse früh mein Spiegelbild...";
//             character.classList.add('go-up');
//         }
//     }
//     if (characterPositionX === 170 && characterPositionY === 130) {
//         interact();

//         if (event.code === 'Enter') {
//             talk.textContent = "Ich küsse früh mein Spiegelbild...";
//             character.classList.add('go-up');
//         }
//     }
// });



const interactions = [
    { 
        x: -30, y: -10, 
        message: "Rosenrot, oh rosenrot... 🌹", 
        translation: "Rosenröd, åh rosenröd... 🌹",
        classToAdd: 'go-up' 
    },
    { 
        x: -380, y: -140, 
        message: "Hallo Stein! 🗿 Hast du Ramm-stein gehört?", 
        translation: "Hej Sten! Har du lyssnat på Rammstein?",
        classToAdd: 'go-up' 
    },
    { 
        x: -380, y: 150, 
        message: "Ich bin der Schatten aller Bäume... 🌳", 
        translation: "Jag är alla träds skugga... 🌳",
        classToAdd: 'go-right' 
    },
    { 
        x: -210, y: 220, 
        message: "Der Mensch gehört nicht in die Luft...", 
        translation: "Människan hör inte hemma i luften...",
        classToAdd: null // default/go-down
    },
    { 
        x: -70, y: -50, 
        message: "Ich küsse früh mein Spiegelbild... 💋", 
        translation: "Jag kysser tidigt min spegelbild... 💋",
        classToAdd: 'go-up' 
    },
    { 
        x: 320, y: 270, 
        message: "Sie schwimmt vorbei, bemerkt mich nicht...", 
        translation: "Hon simmar förbi, märker mig inte...",
        classToAdd: null
    },
    { 
        x: 310, y: -140, 
        message: "Du bist giftig, ach so giftig! 🐍", 
        translation: "Du är giftig, ack så giftig! 🐍",
        classToAdd: 'go-up' 
    },
    { 
        x: 240, y: 80, 
        message: "Ist nur eine schmale Brücke...", 
        translation: "Det är bara en smal bro...",
        classToAdd: 'go-right' 
    },
    { 
        x: 250, y: 80, 
        message: "... die Ufer sind Vernunft und trieb.", 
        translation: "... ändarna är förnuft och drift.",
        classToAdd: 'go-left' 
    },
    { 
        x: -230, y: 280, 
        message: "Stein um Stein... mauer ich dich ein... 🪨", 
        translation: "Sten för sten... murar jag in dig... 🪨",
        classToAdd: 'go-up' 
    },
    { 
        x: 290, y: -210, 
        message: "Wooo bist du? Wooo bist du?", 
        translation: "Vaaar är du? Vaaar är du?",
        classToAdd: 'go-right' 
    },
    { 
        x: -260, y: 80, 
        message: "Du bist schön, wie ein Diamant. 💎", 
        translation: "Du är vacker, som en diamant. 💎",
        classToAdd: null
    },
    { 
        x: 430, y: 200, 
        message: "So uferlos, die kalte See... 🌊", 
        translation: "Så gränslöst, det kalla havet... 🌊",
        classToAdd: 'go-right'
    },
    { 
        x: 150, y: 170, 
        message: "Herzeleid... Herzeleid... 💔", 
        translation: "Hjärtesorg... Hjärtesorg... 💔",
        classToAdd: 'go-up'
    },
    { 
        x: -290, y: -240, 
        message: "Am Himmel dunkle Wolken ziehen... ☁", 
        translation: "Mörka moln på himlen... ☁",
        classToAdd: 'go-left'
    },
    { 
        x: 350, y: -160, 
        message: "Zeig dich! Versteck dich nicht...", 
        translation: "Visa dig! Gömd dig inte...",
        classToAdd: 'go-up'
    },
    { 
        x: -160, y: -230, 
        message: "Ein Schrei wird zum Himmel fahren...", 
        translation: "Ett skrik kommer att stiga till himlen...",
        classToAdd: 'go-up'
    },
    { 
        x: -80, y: -160, 
        message: "Tiefe Wasser sind nicht still... 💧",
        translation: "Djupt vatten är inte stilla... 💧",
        classToAdd: null
    },
    { 
        x: 370, y: 140, 
        message: "Mein Land... 🇩🇪", 
        translation: "Mitt land... 🇩🇪",
        classToAdd: null
    }
];

function interact(X, Y, event) {
    talk.textContent = "?";
    talk.style.display = 'block';

    // Skapar en ny variabel "interaction" typ som i en foreach-loop där man går från array till string?
    const interaction = interactions.find(i => i.x === X && i.y === Y);
    
    if (interaction) {
        if (event.key === 'Enter') {
            talk.textContent = interaction.message;
            character.removeAttribute('class');
            if (interaction.classToAdd) {
                character.classList.add(interaction.classToAdd);
            }
        } else if (event.key === 't') {
            talk.textContent = interaction.translation;
            character.removeAttribute('class');
            if (interaction.classToAdd) {
                character.classList.add(interaction.classToAdd);
            }
        }
    }
}

document.addEventListener('keydown', function(event) {
    // .some() är en inbyggd funktion i JS som används för att testa om något element i en array (i detta fall interactions) uppfyller ett specifikt villkor
    if (interactions.some(i => i.x === characterPositionX && i.y === characterPositionY)) {
        interact(characterPositionX, characterPositionY, event); // skickar enligt chatGPT event till interact-funktionen, men jag fattar inte riktigt hur
    }
});


