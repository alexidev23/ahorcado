const words = ["javascript", "html", "css", "developer", "programacion", "openai"];

// Seleccionar una palabra
let selectedWord = words[Math.floor(Math.random() * words.length)];

let vidas = 6;
let wordSelected = selectedWord.toUpperCase().split('');
let correctWord = Array(wordSelected.length).fill(false); // Array para rastrear letras correctas adivinadas
let incorrectLetters = []; // Array para rastrear letras incorrectas adivinadas

function updateDisplayWord() {
  const displayWordContainer = document.getElementById('palabra');
  displayWordContainer.innerHTML = wordSelected.map((char, index) =>
    correctWord[index] ? `<span class="letra">${char}</span>` : '<span class="linea"></span>'
  ).join('');

  const incorrectLettersContainer = document.getElementById('letras');
  incorrectLettersContainer.innerHTML = `<span class="letra">${incorrectLetters.join(', ')}</span>`;
}

function updateGame() {
  updateDisplayWord();
  document.addEventListener('keydown', handleKeyDown);
}

function handleKeyDown(event) {
  const keyPressed = event.key.toUpperCase();
  // Verifica si la tecla presionada es una letra del alfabeto
  if (/^[A-Z]$/.test(keyPressed)&& !incorrectLetters.includes(keyPressed)) {
    guessLetter(keyPressed);
  }
}

function modal(resultado, palabra) {
  const tablero = document.getElementById('tablero');
  if (resultado === 'ganador') {
    tablero.innerHTML += 
    `<div class="finishGame">
      <div>
        <p class="title">Has Ganado</p>
      </div>
      <a class="resetGame" href="./juego.html">Jugar de Nuevo</a>
    </div>`
  } else {
    const word = palabra.toUpperCase()
    tablero.innerHTML += 
    `<div class="finishGame">
      <div>
        <p class="title">Has Perdido</p>
        <p class='subtitle'>La palabra era: ${word}</p>
      </div>
      <a class="resetGame" href="./juego.html">Jugar de Nuevo</a>
    </div>`
  }
}

function guessLetter(letra) {
  if (wordSelected.includes(letra)) {
    wordSelected.forEach((char, index) => {
      if (char === letra) {
        correctWord[index] = true;
      }
    });

    // Verifica si todas las letras han sido adivinadas
    if (correctWord.every((value) => value)) {
      modal("ganador")
    }
  } else {
    const figura = document.getElementById('figura')
    // Manejar lógica cuando la letra no está en la palabra
    vidas--;
    incorrectLetters.push(letra);
    console.log('Vidas restantes:', vidas);
    // Puedes agregar más lógica para verificar si se han agotado las vidas y el juego ha terminado
    switch (vidas) {
      case 5:
        figura.innerHTML += `<span class="cabeza"></span>`;
        break;
      case 4:
        figura.innerHTML += `<span class="torso"></span>`;
        break;
      case 3:
        figura.innerHTML += `<span class="brazo1"></span>`;
        break;
      case 2:
        figura.innerHTML += `<span class="brazo2"></span>`;
        break;
      case 1:
        figura.innerHTML += `<span class="pierna1"></span>`;
        break;
      case 0:
        figura.innerHTML += `<span class="pierna2"></span>`;
        break;
      default:
        break;
    }
    if (vidas === 0) {
      modal('perdedor',selectedWord)
    }
  }

  // Actualiza las letras incorrectas después de cada intento
  updateDisplayWord();
}

// Llama a la función para inicializar el juego al cargar la página
updateGame();
console.log(selectedWord)

