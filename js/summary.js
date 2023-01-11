let tasks=[];

async function setMainHTML(){
    await getTasks();
    window.location.href='main.html';
    
}

async function init(){
    await includeHTML();
    renderSummary();
}

/**function that fetches tasks from backend and creates a Json */
async function getTasks(){
    setURL('http://dr-katja-becker-lindhorst.developerakademie.net/smallest_backend_ever-master');
    let tasksAsText=await backend.getItem("tasks");
    tasks=JSON.parse(tasksAsText);
   
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

function renderSummary(){
    let profil_pic=document.getElementById("user-img");
    profil_pic.setAttribute("src","assets/img/guest_pic.svg");
    let tasks_in_board=document.getElementById("num-board");
}