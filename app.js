const hint = document.querySelector("#hint");
const unknownWord = document.querySelector("#unknownWord");
const letters = document.querySelector("#letters");
const rLives = document.querySelector("#rLives");
const rLives_count = document.querySelector("#rLives_count");
const messageBox = document.querySelector("#messageBox");

const letters_string = "abcdefghijklmnopqrstuvwxyz";

console.log(letters_string.split(""))

let lives = 5;
let gameOver = false;
let filled = 0;

const hidden_word = "Manjaro";
const hint_word = "Arch";
const total_letters = hidden_word
  .split(" ")
  .map((word) => word.length)
  .reduce((acc, curr) => acc + curr);

rLives_count.textContent = lives;

hint.textContent = hint_word;
hidden_word.split("").forEach((letter) => {
  letter === " "
    ? (unknownWord.innerHTML += `<div class="empty-letter-box empty"></div>`)
    : (unknownWord.innerHTML += `
          <div class="empty-letter-box"></div>
      `);
});

letters_string.split("").forEach((letter) => {
  letters.innerHTML += `
        <div class="letter-box">
            ${letter}
        </div>
    `;
});

letters.addEventListener("click", ({target}) => {
  const clicked_letter = target.textContent.trim();
  const empty_boxes = unknownWord.querySelectorAll(".empty-letter-box");

  if (
    !target.classList.contains("clicked") &&
    !target.classList.contains("letters") &&
    !gameOver
  ) {
    target.classList.add("clicked");

    hidden_word.toLowerCase().includes(clicked_letter)
      ? hidden_word.split("").forEach((letter, index) => {
          if (letter.toLowerCase() == clicked_letter) {
            empty_boxes[index].textContent = letter;
            filled += 1;
          }
        })
      : (lives -= 1);

    rLives_count.textContent = lives;

    if (filled == total_letters) {
      messageBox.textContent = "Congrats.. You won!!";
      gameOver = true;
    }

    if (lives == 0) {
      messageBox.textContent = "Sorry! You lost..";
      gameOver = true;
    }

    if (gameOver) {
      letters.style.display = rLives.style.display = "none";
      hidden_word.split("").forEach((letter, index) => {
        empty_boxes[index].textContent = letter;
      });
    }
  }
});
