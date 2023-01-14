async function setMainHTML() {
  await getTasks();
  window.location.href = "main.html";
}

async function init() {
  await includeHTML();

  setURL(
    "https://gruppe-430.developerakademie.net/smallest_backend_ever-master"
  );
  await downloadFromServer();
  all_tasks = JSON.parse(backend.getItem("all_tasks"));
  if (!all_tasks) {
    all_tasks = [];
  }
  console.log(all_tasks);
  renderSummary();
}

/**function that fetches tasks from backend and creates a Json */
/*async function getTasks() {
  setURL(
    "http://gruppe-430.developerakademie.net/smallest_backend_ever-master"
  );
  let tasksAsText = await backend.getItem("tasks");
  if(!tasksAsText){
    console.log("Keine Tasks")
  }
  all_tasks = JSON.parse(tasksAsText);
}*/

/**function to include the template */
async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html"); // "includes/header.html"
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}

/**function to render summary with actual tasks */
function renderSummary() {
  let profil_pic = document.getElementById("user-img");
  profil_pic.setAttribute("src", "assets/img/guest_pic.svg");
  let num_Board = document.getElementById("num-board");
  num_Board.innerHTML = countTasksOnBoard();
  let num_Process = document.getElementById("in-process");
  /*num_Process.innerHTML=countInProcess();*/
  let num_Feedback = document.getElementById("at-feedback");
  /*num_Feedback.innerHTML=countAtFeedback();*/
  let num_Urgent = document.getElementById("num-urgent");
  num_Urgent = countUrgentTasks();
}

function countTasksOnBoard() {
  let onBoard = all_tasks.length;
  return onBoard;
}

function countUrgentTasks() {
  let urgent = 0;
  for (let i = 0; i < all_tasks.length; i++) {
    if (all_tasks[i]["prio"] == "urgent") {
      urgent++;
    }
  }
  return urgent;
}

function getToBoard() {
  window.location.href = "board.html";
}

function hover(id, src) {
  document.getElementById(id).setAttribute("src", src);
}

function unhover(id, src) {
  document.getElementById(id).setAttribute("src", src);
}
