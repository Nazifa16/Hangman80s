const data = {
  genesis: {
    picture: "genesis.jpg",
    song: "Illegal Alien",
    artist: "Genesis",
    hint: "A progressive rock band with hits like 'Invisible Touch.' A key member of this band later became a highly successful solo artist.",
    preview:
      "https://p.scdn.co/mp3-preview/b29a2b925b9654e0efaaff37504fd234307e0ad8",
  },
  madonna: {
    picture: "madonna.jpg",
    song: "Material Girl",
    artist: "Madonna",
    hint: "An iconic pop queen known for her 'Material Girl' image. Often referred to as the 'Queen of Pop,' she has had a career spanning decades and is known for her reinventions.",
    preview:
      "https://p.scdn.co/mp3-preview/5ff7f7b7d2af1a747da275bed3c49054c01b5b1c",
  },
  toto: {
    picture: "toto.jpg",
    song: "Rosanna",
    artist: "Toto",
    hint: "A Grammy-winning band with the classic album 'Toto IV.' This band gained widespread recognition with their hit song 'Africa.'",
    preview:
      "https://p.scdn.co/mp3-preview/7cef811eaeb7c7b98245750e73d9d68e9008f317",
  },
  queen: {
    picture: "queen.jpg",
    song: "Princes of the Universe",
    artist: "Queen",
    hint: "A legendary rock band featured in the movie 'Highlander.' Fronted by a legendary vocalist, this band produced anthems like 'Bohemian Rhapsody.'",
    preview:
      "https://p.scdn.co/mp3-preview/b84f24300476f3d3f20056d2388cc51db2e3891f",
  },
  u2: {
    picture: "u2.jpg",
    song: "With or Without You",
    artist: "U2",
    hint: "One of U2's signature songs from the album 'The Joshua Tree.' Bono is the lead vocalist of this Irish rock band, known for their socially conscious lyrics.",
    preview:
      "https://p.scdn.co/mp3-preview/28365dff1890075c1371628371cd0e5bbff9a3a3",
  },
  metallica: {
    picture: "metallica.jpg",
    song: "Master of Puppets",
    artist: "Metallica",
    hint: "A pioneering heavy metal band known for their intense sound. Their drummer is also known for his work in film and philanthropy.",
    preview:
      "https://p.scdn.co/mp3-preview/60e6f8dab43f176dd9fb5e795d4e6459bad52e9e",
  },
  journey: {
    picture: "journey.jpg",
    song: "Don't Stop Believin'",
    artist: "Journey",
    hint: "Classic rock band with hits often used in TV and movies. 'Don't Stop Believin'' is one of their most famous songs, and they've had several lead singers over the years.",
    preview:
      "https://p.scdn.co/mp3-preview/21b9abd3cd2eea634e17a917196fdd5ba2e82670",
  },
  inxs: {
    picture: "inxs.jpg",
    song: "Need You Tonight",
    artist: "INXS",
    hint: "Australian rock band with a hit single from the album 'Kick.' Their charismatic lead singer contributed significantly to their success in the '80s and '90s.",
    preview:
      "https://p.scdn.co/mp3-preview/61b17a335d5afc1c4086b1b08e2400f0da147977",
  },
  poison: {
    picture: "poison.jpg",
    song: "Fallen Angel",
    artist: "Poison",
    hint: "Glam metal band with a charismatic frontman known for his stage presence. A glam metal band with a charismatic frontman known for his stage presence.",
    preview:
      "https://p.scdn.co/mp3-preview/0365ad1f152f1834b42b857c4625191cebf9f987",
  },
  rush: {
    picture: "rush.jpg",
    song: "Limelight",
    artist: "Rush",
    hint: "Canadian rock band with a song about the experience of fame. Known for their complex musical compositions, this band's drummer is considered one of the greatest.",
    preview:
      "https://p.scdn.co/mp3-preview/154987dfb07f2fc5ed7aa4d76b80c5dc08ff4d6b",
  },
  blondie: {
    picture: "blondie.jpg",
    song: "Call Me",
    artist: "Blondie",
    hint: "New wave and punk band with a theme song for 'American Gigolo.' The lead singer of this band became an iconic figure in the punk and new wave music scenes.",
    preview:
      "https://p.scdn.co/mp3-preview/ed5a443bc86176135ebca8a114f66f4d814d4c90",
  },
};

const wordDisplay = document.getElementById("word");
const wrongLettersDisplay = document.getElementById("wrong-letters");
const playAgainButton = document.getElementById("play-again-button");
const popupContainer = document.getElementById("popup-container");
const winMessage = document.getElementById("win-message");
const hintDisplay = document.getElementById("hint");
const audio = document.getElementById("audio");
const artistImage = document.getElementById("artist-image");
const figureParts = document.querySelectorAll(".figure-parts");

const correctLetters = [];
const wrongLettersArr = [];
let selectedWord = getRandomWord();

//  Function to get a random word from the data object
function getRandomWord() {
  const words = Object.keys(data);
  const randomWord = words[Math.floor(Math.random() * words.length)];
  return randomWord;
}

// Function to display the word on the screen
function showWord() {
  wordDisplay.innerHTML = selectedWord
    .split("")
    .map(
      (letter) =>
        `<div class="letter">${
          correctLetters.includes(letter) ? letter : ""
        }</div>`
    )
    .join("");

  // Check if the displayed word matches the selected word
  const innerWord = wordDisplay.innerText.replace(/\n/g, "");
  if (innerWord === selectedWord) {
    showPopup(true);
  }
}

// Function to play the preview of the selected song
function playPreview() {
  const previewURL = data[selectedWord].preview;
  audio.src = previewURL;
  audio.play();
}

// show popup container
function showPopup(isWin) {
  if (isWin) {
    winMessage.innerText = "Congratulations! You guessed the artist!";
    playPreview();
  } else {
    winMessage.innerText = `Sorry, you lost. Try again!\nThe correct word was ${data[selectedWord].artist}`;
  }
  artistImage.src = "./assets/img/" + data[selectedWord].picture;
  popupContainer.style.display = "block";
}

// Function to update the display of wrong letters and hangman parts
function updateWrongLetters() {
  wrongLettersDisplay.innerHTML = `
      ${wrongLettersArr.length > 0 ? "<h3>Wrong Letters:</h3>" : ""}
      ${wrongLettersArr.map((letter) => `<span>${letter}</span>`).join("")}
    `;

  // need to replace figureParts with the correct variable that represents hangman parts.
  // it corresponds to the correct number of parts in hangman SVG code.
  figureParts.forEach((item, index) => {
    const wrongLettersCount = wrongLettersArr.length;
    if (index < wrongLettersCount) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
  // Check if the maximum number of wrong letters is reached
  if (wrongLettersArr.length === figureParts.length) {
    showPopup(false);
  }
}

// Function to display the hint
function showHint() {
  hintDisplay.innerText = `Hint: ${data[selectedWord].hint}`;
}

// Event listener for the "Play Again" button
playAgainButton.addEventListener("click", function () {
  // Reset arrays and get a new random word
  correctLetters.splice(0);
  wrongLettersArr.splice(0);
  selectedWord = getRandomWord();

  // Update displays and hide the popup container
  showWord();
  updateWrongLetters();
  showHint();
  popupContainer.style.display = "none";
});

// Event listener for keyboard input
window.addEventListener("keydown", function (e) {
  if (popupContainer.style.display === "block") {
    // If the game is over, do not allow key presses
    return;
  }

  // Checking if the key is a valid letter (A-Z) or number (0-9)
  if (
    (e.keyCode >= 65 && e.keyCode <= 90) ||
    (e.keyCode >= 48 && e.keyCode <= 57)
  ) {
    const letter = e.key.toLowerCase();
    // Checking if the letter is in the selected word
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        showWord();
      } else {
        alert("You already guessed this letter.");
      }
    } else {
      // Checking if the letter is not in the wrong letters array and is a letter (not a number)
      if (
        !wrongLettersArr.includes(letter) &&
        e.keyCode >= 65 &&
        e.keyCode <= 90
      ) {
        wrongLettersArr.push(letter);
        updateWrongLetters();
      }
    }
  }
});

// setup
showWord();
showHint();
