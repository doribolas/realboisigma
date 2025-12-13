// MINI-GAME LOGIC
let taskStep = 0,
  level = 0,
  sequence = [],
  animating = false,
  complete = false;

const displayBoxes = Array.from(document.querySelectorAll(".image-box .valid"));
const keypadButtons = Array.from(
  document.querySelectorAll(".image-box2 .hover")
);
const box = document.getElementById("imageBox");

function showModal() {
  if (!complete) {
    document.getElementById("myModal").style.display = "flex";
    startTask();
  }
}

function hideModal() {
  document.getElementById("startup").classList.remove("hover", "blue");
  document.getElementById("myModal").style.display = "none";
  complete = true;
}

function startTask() {
  taskStep = 0;
  level = 0;
  sequence = [];
  generateNextInSequence();
}

function generateNextInSequence() {
  const next = Math.floor(Math.random() * displayBoxes.length);
  sequence.push(next);
  taskStep = 0;
  playSequence();
}

function getFlashSpeed() {
  return Math.max(200, 500 * (1 - (level - 1) * 0.12));
}

function playSequence() {
  animating = true;
  let delay = 500;
  const flashSpeed = getFlashSpeed();
  sequence.forEach((idx) => {
    const box = displayBoxes[idx];
    setTimeout(() => {
      box.classList.add("blue");
      setTimeout(() => box.classList.remove("blue"), flashSpeed * 0.6);
    }, delay);
    delay += flashSpeed;
  });
  setTimeout(() => (animating = false), delay);
}

function buttonPress(e) {
  if (animating) return;
  const num = Number(e.id) - 1;
  if (num === sequence[taskStep]) {
    e.classList.add("green");
    setTimeout(() => e.classList.remove("green"), 300);
    taskStep++;
    if (taskStep === sequence.length) {
      if (level === 5) {
        hideModal();
        showTaskCompleteText(); // <-- shows text on screen
      } else {
        level++;
        generateNextInSequence();
        updateFortImage();
      }
    }
  } else {
    e.classList.add("red");
    setTimeout(() => e.classList.remove("red"), 300);
    taskStep = 0;
    setTimeout(() => playSequence(), 600);
  }
}

function updateFortImage() {
  box.style.backgroundImage = `url("images/fort${level}.png")`;
}

// MAP LOGIC
document.getElementById("mapButton").addEventListener("click", () => {
  document.getElementById("myMap").style.display = "flex";
});

function hideMap() {
  document.getElementById("myMap").style.display = "none";
}

function goToWeapons() {
  window.location.href = "https://wsy38n.csb.app/";
}

// TASK COMPLETE TEXT LOGIC
function showTaskCompleteText() {
  const textDiv = document.getElementById("taskCompleteText");

  // Step 1: Show "Task Complete"
  textDiv.textContent = "Task Complete";
  textDiv.style.display = "block";
  document.getElementById("completionSound").play();

  // Step 2: After 3 seconds, change to "Go to Weapons next"
  setTimeout(() => {
    textDiv.textContent = "Go to Weapons next";
  }, 3000);

  // Step 3: Auto-hide after 8 seconds total
  setTimeout(() => {
    textDiv.style.display = "none";
  }, 8000);
}
