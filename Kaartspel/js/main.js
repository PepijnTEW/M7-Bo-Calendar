let pakButton = document.getElementById("pakken-button");
let spelerDecks = document.getElementsByClassName("hand");

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

function uitdelen(aantalSpelers) {
  let decks = [];
  for (let i = 0; i < aantalSpelers; i++) {
    let deck = geschuddeKaarten.splice(0, 7);
    decks.push(deck);
  }
  console.log(decks);
  return decks;
}
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
const stapel = new Stapel();
const geschuddeKaarten = schudden([...stapel.kaarten]);
console.log(geschuddeKaarten);
let decks = uitdelen(4);
toonDecks(decks, spelerDecks);
console.log(spelerDecks);
