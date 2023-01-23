let urgent_tasks = [];
let mediaQuery = window.matchMedia('(max-width: 800px)');


/**
 * functions for getting Items from server and include templates from here
 */


/**function that fetches tasks from backend and creates a Json */
async function initSum() {
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
  await getCurrentUserFromStorage();
  setUserImg();
  renderSummary();
  handleMediaSize();
  storeSession();
  console.log(all_tasks)
}

function storeSession(){
  sessionStorage.setItem("session",true)
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


/**
 * functions to render task properties from here
 */

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


/**function to count all tasks on board */
function countTasksOnBoard() {
  let onBoard = all_tasks.length;
  return onBoard;
}


/**function to find urgent tasks */
function getAllUrgentTasks() {
  for (let i = 0; i < all_tasks.length; i++) {
    if (all_tasks[i]["prio"] == "urgent") {
      urgent_tasks.push(all_tasks[i]);
    }
  }
  sortAllUrgentTasks();
}


/**function to count tasks that are in process */
function countTasksInProcess() {
  let in_process = 0;
  for (let i = 0; i < all_tasks.length; i++) {
    if (all_tasks[i]["progress"] == "in Process") {
      in_process++;
    }
  }
  return in_process;
}


/**function to count tasks that are awaiting feedback */
function countTasksAwaitingFeedback() {
  let awaiting_feedback = 0;
  for (let i = 0; i < all_tasks.length; i++) {
    if (all_tasks[i]["progress"] == "awaiting Feedback") {
      awaiting_feedback++;
    }
  }
  return awaiting_feedback;
}


/**function to count tasks that are done */
function countTasksDone() {
  let done = 0;
  for (let i = 0; i < all_tasks.length; i++) {
    if (all_tasks[i]["progress"] == "done") {
      done++;
    }
  }
  return done;
}


/**function to count tasks that are done */
function countTasksTodo() {
  let todo = 0;
  for (let i = 0; i < all_tasks.length; i++) {
    if (all_tasks[i]["progress"] == "todo") {
      todo++;
    }
  }
  return todo;
}


/**
 * functions for creating urgent tasks from here
 */

/**function to render all urgent tasks on summary*/
function createUrgentBox() {
  let urgenttasks_container = document.getElementById("deadline-container-box");
  urgenttasks_container.innerHTML = "";
  if(urgent_tasks.length==0){
    urgenttasks_container.innerHTML = generateUrgentNullHTML();
  }else{
  for (let i = 0; i < urgent_tasks.length; i++) {
    let isOver=compareIfOver(urgent_tasks[i]["date"]);
    console.log(urgent_tasks[i]["date"]);
    if(!isOver){
    let taskdate = constructDate(urgent_tasks[i]["date"]);
    console.log(taskdate);
    urgenttasks_container.innerHTML += generateUrgentHTML(i, taskdate);
    break
    }
  }
}
}


/**function to sort the tasks referring to their date */
function sortAllUrgentTasks() {
  let dates = [];
  for (let i = 0; i < urgent_tasks.length; i++) {
    dates.push(urgent_tasks[i]["date"]);
  }
  dates.sort(compareDate);
  let urgentSorted = [];
  for (let i = 0; i < dates.length; i++) {
    urgentSorted.push(urgent_tasks.find((t) => t["date"] == dates[i]));
  }
  urgent_tasks = urgentSorted;
  console.log(urgent_tasks)
}


/**
 * function to check if urgent task is already over
 * @param {date} date -Parameter is date to be checked against actual time
 * @returns {boolean}-Returns true if date is over
  */
function compareIfOver(date){
  let isOver=false;
  console.log(date);
  let today=new Date();
  if ((date.getTime()-today.getTime())<0 ){
   isOver=true;
  }
  return isOver;
}


/**function that writes HTML for rendering one urgent Task on summary */
function generateUrgentHTML(i, taskdate) {
  return `<div id="deadline-container${i}" class="deadline-container" onclick="getToBoard()">
  <span id="deadline${i}" class="deadline">${taskdate}</span>
  <p>Upcoming Deadline</p>
</div>`;
}

function generateUrgentNullHTML(){
  return `<div class="deadline-container" onclick="getToBoard()">
  <span class="deadline"></span>
  <p><b>No urgent-deadline</b></p>
</div>`;
}


/**
 * functions for date formate from here
 */


/**
 * function to formate the taskdate to regular form
 * @param {JSON} tasks -Parameter is JSON of several tasks including dates
 */
function formateDate(tasks) {
  for (let i = 0; i < all_tasks.length; i++) {
    let [day, mo, ye] = tasks[i]["date"].split("/");
    let d = new Date(+ye, +mo-1, +day);
    tasks[i]["date"] = d;
  }
}


/**
 * function to compare  two dates 
 * @param {date} date1 - first date in row
 * @param {date} date2 -second date in row
 * @returns {number}-positiv oder negativ number
 */
function compareDate(date1, date2) {
  return date1.getTime() - date2.getTime();
}


/**
 * function to get the output-formate of the dates that are rendered on summary
 * @param {date} date -Parameter is a date
 * @returns {string}-Return is the rendered date with day,month as word and year
 */
function constructDate(date) {
  let weekday = date.getDay();
  let time=date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
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
    "Sunday",
  ];
  let taskdate =
    days[weekday] +
    ", " +
    date.getDate() +
    "." +
    m[date.getMonth()] +
    " " +
    date.getFullYear();
  return taskdate;
}


/**
 * functions for user-greeting from here
 */


/**function to get the user, who is logged in */
async function getCurrentUserFromStorage() {
  let currentUserAsText = localStorage.getItem("current_user");
  if (!currentUserAsText) {
    window.location.href = "login.html";
  } else {
    current_user = JSON.parse(currentUserAsText);
  }
}


/**function that fix the greeting according time of day */
function getPartOfDay() {
  let greet;
  let date = new Date();
  let time = date.getHours();
  console.log(time)
  if (time < 11 && time > 0) {
    greet = "Good Morning,";
  }
  else if (time >= 11 && time < 17) {
    greet = "Hello,";
  } 
  else {
    greet = "Good Evening,";
  }
  return greet;
}


/**function to set the logged user name on summary-greeting */
function greetCurrentUser() {
  let greet = document.getElementById("greeting");
  greet.innerHTML = getPartOfDay();
  let greetname = document.getElementById("greet-name");
  greetname.innerHTML = current_user["username"];
}


/**
 * common functions from here
 */


/**function to get on to Board-Window */
function getToBoard() {
  window.location.href = "board.html";
}


/**functions to change the attribute (img) on hovering the done/todo containers on summary */

/**
 * function to change img-src on hover
 * @param {string} id -Parameter is id of img where source changes
 * @param {string} src-Parameter is path of img-source
 */
function hover(id, src) {
  document.getElementById(id).setAttribute("src", src);
}

/**
 * function to change img-src on unhover
 * @param {string} id -Parameter is id of img where source changes
 * @param {string} src-Parameter is path of img-source
 */
function unhover(id, src) {
  document.getElementById(id).setAttribute("src", src);
}


/**
 * functions for greet on media query 
*/

function showGreet(){
  let greetcontainer=document.getElementById("greet-container");
  greetcontainer.classList.remove("d-none");
}


function closeGreetOnMobil(){
  let greetcontainer=document.getElementById("greet-container");
  greetcontainer.classList.add("d-none");
}


function timeGreet(){
  setTimeout(showGreetOnMobil,2000)
}


function handleMediaSize(){
  let session=sessionStorage.getItem("session");
  if (window.innerWidth < 850){
    if(!session){
  showGreet()
  setTimeout(resizeElements,2000)
}
  else{
    resizeElements()
  }
  }
  else{
    showGreet()
  }
}


function resizeElements(){
  let greetcontainer=document.getElementById("greet-container");
  if(greetcontainer.classList.contains("d-none") && window.innerWidth>850){
      greetcontainer.classList.remove("d-none")
    }
    if(!greetcontainer.classList.contains("d-none") && window.innerWidth<=850){
      greetcontainer.classList.add("d-none")
  }
}

