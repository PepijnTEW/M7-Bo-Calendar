class Kaart {
  constructor(symbool, waarde) {
    this.symbool = symbool;
    this.waarde = waarde;
  }

  kaartHtml() {
    const kaartDiv = document.createElement("div");
    kaartDiv.className("kaart");
    kaartDiv.textContent("${this.waarde}${this.symbool}");
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
    symbolen.forEach((symbolen) => {
      waarden.forEach((waarde) => {
        this.kaarten.push(new Kaart(waarde, symbolen));
      });
    });
  }
}
function schudden(stapel) {
  for (let i = stapel.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = stapel[i];
    stapel[i] = stapel[j];
    stapel[j] = temp;
    console.log("changed order");
  }
  return stapel;
}
const stapel = new Stapel();
console.log([...stapel.kaarten]);

const geschuddeKaarten = schudden([...stapel.kaarten]);
console.log(geschuddeKaarten);
