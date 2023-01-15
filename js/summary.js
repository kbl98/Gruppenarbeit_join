let urgent_tasks = [];

async function setMainHTML() {
  await getTasks();
  window.location.href = "main.html";
}

/**function that fetches tasks from backend and creates a Json */
async function init() {
  await includeHTML();
  setURL(
    "https://gruppe-430.developerakademie.net/smallest_backend_ever-master"
  );
  await downloadFromServer();
  all_tasks = JSON.parse(backend.getItem("all_tasks"));
  if (!all_tasks) {
    all_tasks = [];
  } else {
    formateDate(all_tasks);
  }
  console.log(all_tasks);
  await getCurrentUserFromStorage();
  renderSummary();
}

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
  let num_board = document.getElementById("num-board");
  num_board.innerHTML = countTasksOnBoard();
  let num_process = document.getElementById("num-progress");
  num_process.innerHTML = countTasksInProcess();
  let num_Feedback = document.getElementById("num-feedback");
  num_Feedback.innerHTML = countTasksAwaitingFeedback();
  let num_done = document.getElementById("num-done");
  num_done.innerHTML = countTasksDone();
  let num_todo = document.getElementById("num-do");
  num_todo.innerHTML = countTasksTodo();
  let num_Urgent = document.getElementById("num-urgent");
  getAllUrgentTasks();
  num_Urgent.innerHTML = urgent_tasks.length;
  createUrgentBox();
  greetCurrentUser();
}

function countTasksOnBoard() {
  let onBoard = all_tasks.length;
  return onBoard;
}

function formateDate(tasks) {
  for (let i = 0; i < all_tasks.length; i++) {
    let [day, mo, ye] = tasks[i]["date"].split("/");
    let d = new Date(+ye, +mo, +day);
    tasks[i]["date"] = d;
    console.log(d);
  }
}

function getAllUrgentTasks() {
  for (let i = 0; i < all_tasks.length; i++) {
    if (all_tasks[i]["prio"] == "urgent") {
      urgent_tasks.push(all_tasks[i]);
    }
  }
  sortAllUrgentTasks();
}

function sortAllUrgentTasks() {
  let dates = [];
  for (let i = 0; i < urgent_tasks.length; i++) {
    dates.push(urgent_tasks[i]["date"]);
    dates.sort(function (u, v) {
      return new Date(v.date) - new Date(u.date);
    });
  }
  let urgentSorted = [];
  for (let i = 0; i < dates.length; i++) {
    urgentSorted.push(urgent_tasks.find((t) => t["date"] == dates[i]));
  }
  urgent_tasks = urgentSorted;
  console.log(urgent_tasks);
}

function countTasksInProcess() {
  let in_process = 0;
  for (let i = 0; i < all_tasks.length; i++) {
    if (all_tasks[i]["progress"] == "in Process") {
      in_process++;
    }
  }
  return in_process;
}

function countTasksAwaitingFeedback() {
  let awaiting_feedback = 0;
  for (let i = 0; i < all_tasks.length; i++) {
    if (all_tasks[i]["progress"] == "awaiting Feedback") {
      awaiting_feedback++;
    }
  }
  return awaiting_feedback;
}

function countTasksDone() {
  let done = 0;
  for (let i = 0; i < all_tasks.length; i++) {
    if (all_tasks[i]["progress"] == "done") {
      done++;
    }
  }
  return done;
}

function countTasksTodo() {
  let todo = 0;
  for (let i = 0; i < all_tasks.length; i++) {
    if (all_tasks[i]["progress"] == "todo") {
      todo++;
    }
  }
  return todo;
}

function createUrgentBox() {
  let urgenttasks_container = document.getElementById("deadline-container-box");
  urgenttasks_container.innerHTML = "";
  for (let i = 0; i < urgent_tasks.length; i++) {
    let taskdate = constructDate(urgent_tasks[i]["date"]);
    console.log(taskdate);
    urgenttasks_container.innerHTML += generateUrgentHTML(i, taskdate);
  }
}

function generateUrgentHTML(i, taskdate) {
  return `<div id="deadline-container${i}" class="deadline-container" onclick="getToBoard()">
  <span id="deadline${i}" class="deadline">${taskdate}</span>
  <p>Upcoming Deadline</p>
</div>`;
}

function constructDate(date) {
  let d = new Date(date);
  let weekday = d.getDay();
  let m = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let taskdate =
    days[weekday - 1] +
    ", " +
    d.getDay() +
    "." +
    m[d.getMonth() - 1] +
    " " +
    d.getFullYear();
  return taskdate;
}

async function getCurrentUserFromStorage() {
  let currentUserAsText = localStorage.getItem("current_user");
  if (!currentUserAsText) {
    window.location.href = "login.html";
  } else {
    current_user = JSON.parse(currentUserAsText);
  }
}

function greetCurrentUser() {
  let greetname = document.getElementById("greet-name");
  greetname.innerHTML = current_user["username"];
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
