// Elementen uit de HTML
const pakButton = document.getElementById("pakken-button");
const spelerDecks = document.getElementsByClassName("hand");
const aflegstapel = document.getElementById("aflegstapel");
const gameTitle = document.getElementById("gameTitle");

let huidigeSpeler = Math.floor(Math.random() * 4);
let jokerVrijheidActief = false;
let richting = 1;

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

class Stapel {
  constructor() {
    this.kaarten = [];
    this.vulKaarten();
  }

  vulKaarten() {
    const symbolen = ["♣", "♠", "♡", "♢"];
    const waarden = [2, 3, 4, 5, 6, 7, 8, 9, 10, "B", "V", "H", "A"];
    symbolen.forEach((symbool) => {
      waarden.forEach((waarde) => {
        this.kaarten.push(new Kaart(symbool, waarde));
      });
    });
    for (let i = 0; i < 2; i++) {
      this.kaarten.push(new Kaart("", "Joker"));
    }
  }
}

function schudden(stapel) {
  for (let i = stapel.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [stapel[i], stapel[j]] = [stapel[j], stapel[i]];
  }
  return stapel;
}

function startUitdelen(aantalSpelers) {
  let decks = [];
  for (let i = 0; i < aantalSpelers; i++) {
    let deck = geschuddeKaarten.splice(0, 7);
    decks.push(deck);
  }
  return decks;
}

function toonDecks(decks, location) {
  decks.forEach((deck, i) => {
    const spelerDiv = location[i];
    spelerDiv.innerHTML = "";
    deck.forEach((kaart, kaartIndex) => {
      const kaartElement = kaart.kaartHtml();
      if (i === huidigeSpeler) {
        kaartElement.style.cursor = "pointer";
        kaartElement.addEventListener("click", () => {
          probeerKaartTeSpelen(kaart, kaartIndex);
        });
      }
      spelerDiv.appendChild(kaartElement);
    });
  });
}

function parseKaartText(kaartText) {
  const symbolen = ["♣", "♠", "♡", "♢"];
  const symbool = symbolen.find((s) => kaartText.includes(s)) || "";
  const waarde = kaartText.replace(symbool, "");
  return { waarde, symbool };
}

function eersteKaart(location) {
  let eenKaart = geschuddeKaarten.splice(0, 1)[0];
  location.innerHTML = "";
  location.appendChild(eenKaart.kaartHtml());
}

function titleChanger(title) {
  const spelerCounter = huidigeSpeler + 1;
  title.innerText = `Speler ${spelerCounter} is aan de beurt...`;
}

pakButton.addEventListener("click", () => {
  if (geschuddeKaarten.length === 0) {
    vernieuwTrekstapelAlsLeeg();
    if (geschuddeKaarten.length === 0) {
      alert("Geen kaarten meer in de stapel!");
      return;
    }
  }
  const kaart = geschuddeKaarten.splice(0, 1)[0];
  decks[huidigeSpeler].push(kaart);
  huidigeSpeler = (huidigeSpeler + richting + decks.length) % decks.length;
  toonDecks(decks, spelerDecks);
  titleChanger(gameTitle);
});

function probeerKaartTeSpelen(kaart, kaartIndex) {
  const bovensteKaartDiv = aflegstapel.querySelector(".kaart");
  const bovensteKaartText = bovensteKaartDiv
    ? bovensteKaartDiv.textContent
    : "";
  const { waarde: bovensteWaarde, symbool: bovensteSymbool } =
    parseKaartText(bovensteKaartText);

  if (
    kaart.waarde === "Joker" ||
    jokerVrijheidActief ||
    String(kaart.waarde) === bovensteWaarde ||
    kaart.symbool === bovensteSymbool
  ) {
    jokerVrijheidActief = false;
    aflegstapel.innerHTML = "";
    aflegstapel.appendChild(kaart.kaartHtml());
    decks[huidigeSpeler].splice(kaartIndex, 1);
    toonDecks(decks, spelerDecks);
    speciaalKaarten(kaart);
    huidigeSpeler = (huidigeSpeler + richting + decks.length) % decks.length;
    titleChanger(gameTitle);
    toonDecks(decks, spelerDecks);
  } else {
    alert("Je mag deze kaart niet spelen!");
  }
}

function speciaalKaarten(kaart) {
  const volgendeSpeler =
    (huidigeSpeler + richting + decks.length) % decks.length;

  if (kaart.waarde === "Joker") {
    const nieuweKaarten = geschuddeKaarten.splice(0, 5);
    decks[volgendeSpeler].push(...nieuweKaarten);
    jokerVrijheidActief = true;
  }

  if (kaart.waarde === "A") {
    richting *= -1;
    alert("De richting is omgedraaid!");
  }

  if (kaart.waarde === "7") {
    huidigeSpeler = (huidigeSpeler - richting + decks.length) % decks.length;
    alert("Je hebt een 7 gespeeld! Jij bent nog een keer aan de beurt.");
  }

  if (kaart.waarde === "2") {
    const nieuweKaarten = geschuddeKaarten.splice(0, 2);
    decks[volgendeSpeler].push(...nieuweKaarten);
    alert("Volgende speler moet 2 kaarten pakken!");
  }
}

function vernieuwTrekstapelAlsLeeg() {
  if (geschuddeKaarten.length === 0) {
    const kaartenOpAflegstapel = aflegstapel.querySelectorAll(".kaart");
    if (kaartenOpAflegstapel.length <= 1) return;
    const nieuweStapel = [];
    for (let i = 0; i < kaartenOpAflegstapel.length - 1; i++) {
      const kaartText = kaartenOpAflegstapel[i].textContent;
      const { waarde, symbool } = parseKaartText(kaartText);
      nieuweStapel.push(new Kaart(symbool, waarde));
    }
    geschuddeKaarten.push(...schudden(nieuweStapel));
  }
}

function startGame() {
  toonDecks(decks, spelerDecks);
  eersteKaart(aflegstapel);
  titleChanger(gameTitle);
}

const stapel = new Stapel();
const geschuddeKaarten = schudden([...stapel.kaarten]);
let decks = startUitdelen(4);
startGame();
