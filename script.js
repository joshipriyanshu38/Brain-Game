let cardarray = [
    {
        'name': 'HTML',
        'src': 'html.png'
    },
    {
        'name': 'css',
        'src': 'css.png'
    },
    {
        'name': 'js',
        'src': 'js.png'
    },
    {
        'name': 'react',
        'src': 'react.jpg'
    },
    {
        'name': 'mongo',
        'src': 'mongo.png'
    },
    {
        'name': 'node',
        'src': 'node.png'
    }
]

const parentdiv = document.getElementById('card-section');
const gamecard = cardarray.concat(cardarray); 

// Shuffle Algorithm
const mix = (array) => {
    for (i = gamecard.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = gamecard[i];
        gamecard[i] = gamecard[j];
        gamecard[j] = temp;
    }
    return array;
}

const mixcard = mix(gamecard);

// Adding some div and giving them class on the basis of Game Array
for (let i = 0; i < mixcard.length; i++) {
    const childdiv = document.createElement('div');
    childdiv.classList.add('card');
    childdiv.dataset.name = mixcard[i].name;
    parentdiv.appendChild(childdiv);

    const frontdiv = document.createElement('div');
    frontdiv.classList.add('frontdiv');
    const backdiv = document.createElement('div');
    backdiv.classList.add('backdiv');
    childdiv.appendChild(frontdiv);
    childdiv.appendChild(backdiv);
    backdiv.style.backgroundImage = `URL(${mixcard[i].src})`
}

// Giving Matched card another class name
const cardmatch = () => {
    let slectedcard = document.querySelectorAll('.card-selected')

    slectedcard.forEach((elem) => {
        elem.classList.add("card-matched");
    })
}

// Restart if image not match
const resetgame = () => {
    firstclick = "";
    secondclick = "";
    clickcount = 0;

    let slectedcard = document.querySelectorAll('.card-selected')
    slectedcard.forEach((elem) => {
        elem.classList.remove("card-selected");
    })
}

let clickcount = 0;
let firstclick = "";
let secondclick = "";

parentdiv.addEventListener("click", (event) => {
    let currentclick = event.target;
    clickcount++;

    if (currentclick.id === "card-section") { return false }

    if (clickcount < 3) {
        if (clickcount === 1) {
            firstclick = currentclick.parentNode.dataset.name;
            currentclick.parentNode.classList.add("card-selected");
        }
        else {
            secondclick = currentclick.parentNode.dataset.name
            currentclick.parentNode.classList.add("card-selected");
        }

        if (firstclick !== "" && secondclick !== "") {
            if (firstclick === secondclick) {
                setTimeout(() => {
                    cardmatch();
                    resetgame();
                }, 1000);
            }
            else {
                setTimeout(() => {
                    resetgame();
                }, 1000);
            }
        }
    }
})