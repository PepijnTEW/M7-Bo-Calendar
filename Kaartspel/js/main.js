const pakButton = document.getElementById("pakken-button");
const spelerDecks = document.getElementsByClassName("hand");
const aflegstapel = document.getElementById("aflegstapel");
const gameTitle = document.getElementById("gameTitle");

let huidigeSpeler = Math.floor(Math.random() * 3);

//Maakt de basis structuur voor de kaarten
class Kaart {
  constructor(symbool, waarde) {
    this.symbool = symbool;
    this.waarde = waarde;
  }

  kaartHtml() {
    const kaartDiv = document.createElement("div");
    kaartDiv.className = "kaart";
    kaartDiv.textContent = `${this.waarde}${this.symbool}`;
    return kaartDiv;
  }
}

//Deze class heeft een functie die ervoor zorgt dat alle kaarten in een stapel gaan
class Stapel {
  constructor() {
    this.kaarten = [];
    this.vulKaarten();
  }

  vulKaarten() {
    const symbolen = ["♣", "♠", "♡", "♢"];
    const waarden = [2, 3, 4, 5, 6, 7, 8, 9, 10, "B", "V", "H", "A"];
    symbolen.forEach((symbolen) => {
      waarden.forEach((waarde) => {
        this.kaarten.push(new Kaart(waarde, symbolen));
      });
    });
    for (let i = 0; i < 2; i++) {
      this.kaarten.push(new Kaart("", "Joker"));
    }
  }
}

//Deze functie heeft de Fisher-Yates shuffle die dan het eerlijk schud
function schudden(stapel) {
  for (let i = stapel.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = stapel[i];
    stapel[i] = stapel[j];
    stapel[j] = temp;
  }
  return stapel;
}

//deze functie maakt voor elke speler een array met de 7 eerste kaarten
function startUitdelen(aantalSpelers) {
  let decks = [];
  for (let i = 0; i < aantalSpelers; i++) {
    let deck = geschuddeKaarten.splice(0, 7);
    decks.push(deck);
  }
  console.log(decks);
  return decks;
}

//zorgt ervoor dat de decks worden gelaten zien
function toonDecks(decks, location) {
  decks.forEach((deck, i) => {
    const spelerDiv = location[i];
    spelerDiv.innerHTML = "";
    deck.forEach((kaart) => {
      const kaartElement = kaart.kaartHtml();
      spelerDiv.appendChild(kaartElement);
    });
  });
}

//zorgt ervoor dat de eerste kaart wordt gepakt wanneer het spel start
function eersteKaart(location) {
  let eenKaart = geschuddeKaarten.splice(0, 1)[0];
  location.innerHTML = "";
  const eenKaartElement = eenKaart.kaartHtml();
  location.appendChild(eenKaartElement);
}

//dit update de titel naar welke speler er nu is
function titleChanger(title) {
  spelerCounter = huidigeSpeler + 1;
  title.innerText = "Speler " + spelerCounter + " is aan de beurt...";
}

//dit zorgt ervoor dat er kaarten gepakt kunnen worden
pakButton.addEventListener("click", () => {
  console.log("clicked");
  if (geschuddeKaarten.length === 0) {
    alert("Geen kaarten meer in de stapel!");
    return;
  }

  const kaart = geschuddeKaarten.splice(0, 1)[0];
  decks[huidigeSpeler].push(kaart);

  toonDecks(decks, spelerDecks);

  huidigeSpeler = (huidigeSpeler + 1) % decks.length;
  titleChanger(gameTitle);
});

function startGame() {
  toonDecks(decks, spelerDecks);
  eersteKaart(aflegstapel);
  titleChanger(gameTitle);
}

const stapel = new Stapel();
const geschuddeKaarten = schudden([...stapel.kaarten]);
let decks = startUitdelen(4);

startGame();
