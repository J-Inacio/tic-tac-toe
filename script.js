const sequenciaGanhadora = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let arrayJogador1 = [];
let arrayJogador2 = [];
let contadorVitórias1 = 0;
let contadorVitórias2 = 0;
const hashtag = document.querySelectorAll(".quadrados");
const rodada = document.querySelector("#rodada h1");
const displayPlayer1 = document.getElementById("jogador1");
const displayPlayer2 = document.getElementById("jogador2");
const displayPlacar1 = document.getElementById("placar1");
const displayPlacar2 = document.getElementById("placar2");
let jogador = "x";
let jogoEncerrado = false;

function checarVitoria(jogadorAtual) {
  const sequenciaVencedora = sequenciaGanhadora.find((sequencia) =>
    sequencia.every((posicao) => jogadorAtual.includes(posicao))
  );

  if (sequenciaVencedora) {
    sequenciaVencedora.forEach((posicao) => {
      document.getElementById(posicao).classList.add("sequencia-vencedora");
    });

    return true;
  }

  return false;
}

function atualizarRodada() {
  rodada.innerText =
    jogador === "x" ? "Vez do Jogador: 1 - X" : "Vez do Jogador: 2 - O";

  if (jogador === "x" || jogoEncerrado) {
    displayPlayer2.classList.remove("sequencia-vencedora");
    rodada.innerText = "Vez do Jogador: 1 - X";
    displayPlayer1.classList.add("sequencia-vencedora");
  } else {
    displayPlayer1.classList.remove("sequencia-vencedora");
    rodada.innerText = "Vez do Jogador: 2 - O";
    displayPlayer2.classList.add("sequencia-vencedora");
  }
}

function jogar(quadrado) {
  if (quadrado.innerText !== "" || jogoEncerrado) return;

  const jogadorAtual = jogador === "x" ? arrayJogador1 : arrayJogador2;
  const simbolo = jogador === "x" ? "X" : "O";

  quadrado.innerText = simbolo;
  jogadorAtual.push(parseInt(quadrado.id));
  jogadorAtual.sort((a, b) => a - b);

  if (checarVitoria(jogadorAtual)) {
    rodada.innerText = `Jogador ${jogador === "x" ? 1 : 2} venceu!`;
    if (jogador === "x") {
      contadorVitórias1++;
      displayPlacar1.innerText = contadorVitórias1;
    } else {
      contadorVitórias2++;
      displayPlacar2.innerText = contadorVitórias2;
    }
    jogoEncerrado = true;
    return;
  }

  if (Array.from(hashtag).every((quadrado) => quadrado.innerText !== "")) {
    rodada.innerText = "Empate!";
    jogoEncerrado = true;
    return;
  }

  jogador = jogador === "x" ? "o" : "x";
  atualizarRodada();
}

hashtag.forEach((quadrado) => {
  quadrado.addEventListener("click", () => jogar(quadrado));
});

document.getElementById("reset-btn").addEventListener("click", () => {
  arrayJogador1 = [];
  arrayJogador2 = [];
  jogador = "x";
  rodada.innerHTML = "Vez do Jogador: 1 - X";
  displayPlayer2.classList.remove("sequencia-vencedora");
  displayPlayer1.classList.add("sequencia-vencedora");
  hashtag.forEach((quadrado) => {
    quadrado.innerText = "";
    jogoEncerrado = false;
    quadrado.classList.remove("sequencia-vencedora");
  });
});
