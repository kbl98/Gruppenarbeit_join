let urgent_tasks=[];

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
  }
  console.log(all_tasks);
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
  let num_Board = document.getElementById("num-board");
  num_Board.innerHTML = countTasksOnBoard();
  let num_Process = document.getElementById("in-process");
  /*num_Process.innerHTML=countInProcess();*/
  let num_Feedback = document.getElementById("at-feedback");
  /*num_Feedback.innerHTML=countAtFeedback();*/
  let num_Urgent = document.getElementById("num-urgent");
  getAllUrgentTasks();
  num_Urgent.innerHTML=urgent_tasks.length;
  createUrgentBox()
}

function countTasksOnBoard() {
  let onBoard = all_tasks.length;
  return onBoard;
}


function getAllUrgentTasks(){
  for (let i = 0; i < all_tasks.length; i++) {
    if (all_tasks[i]["prio"] == "urgent") {
      urgent_tasks.push(all_tasks[i]);
      
    }
  }
}

function createUrgentBox(){
  let urgenttasks_container=document.getElementById("deadline-container-box");
    urgenttasks_container.innerHTML="";
  for(let i=0;i<urgent_tasks.length;i++){
    let taskdate=constructDate(urgent_tasks[i]["date"]);
    console.log(taskdate);
    
    urgenttasks_container.innerHTML+=generateUrgentHTML(i,taskdate);
  }
}

function generateUrgentHTML(i,taskdate){
  return `<div id="deadline-container${i}" class="deadline-container" onclick="getToBoard()">
  <span id="deadline${i}" class="deadline">${taskdate}</span>
  <p>Upcoming Deadline</p>
</div>`
}


function constructDate(date){
  console.log(date);
  let [day,mo,ye]=date.split('/');
    let d=new Date(+ye, +mo, + day);
    let weekday=d.getDay();
    let m=["January","February","March","April","May","June","July","August","September","October","November","December"]
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let taskdate=days[weekday-1]+", "+d.getDay()+"."+ m[d.getMonth()-1]+" "+d.getFullYear();
    return taskdate;
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
