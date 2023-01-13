

async function setMainHTML() {
  await getTasks();
  window.location.href = "main.html";
}

async function init() {
  await includeHTML();
  setURL(
    "http://gruppe-430.developerakademie.net/smallest_backend_ever"
  );
 renderSummary();
}

/**function that fetches tasks from backend and creates a Json */
async function getTasks() {
  setURL(
    "http://gruppe-430.developerakademie.net/smallest_backend_ever-master"
  );
  let tasksAsText = await backend.getItem("tasks");
  if(!tasksAsText){
    console.log("Keine Tasks")
  }
  all_tasks = JSON.parse(tasksAsText);
}
/**function to include the template 
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}*/

/**function to render summary with actual tasks */
function renderSummary() {
  let profil_pic = document.getElementById("user-img");
  profil_pic.setAttribute("src", "assets/img/guest_pic.svg");
  let tasks_in_board = document.getElementById("num-board");
}


function getToBoard(){
    window.location.href="board.html"
}

function hover(id,src) {
    document.getElementById(id).setAttribute('src', src);
  }

  function unhover(id,src) {
    document.getElementById(id).setAttribute('src',src);
  }
