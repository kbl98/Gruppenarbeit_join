let loadedBoard = [];
let loadedContacts = [];
let currentDragElement;



async function initBoard() {
    setURL('https://gruppe-430.developerakademie.net/smallest_backend_ever-master');
    await loadAllTaskFromBackend();
    await loadContactsFromBackend();
    await getCurrentUserFromStorage();
    await loadTasks();
    await loadContacts();
    renderAllContacts()
    renderBoard();
    setUserImg();
    checkForColor();
    addPrio(0);
    datepicker();
}


// drag and drop funktion
function dragStart(id) {
    currentDragElement = id;
}


async function drop(progress) {
    loadedBoard[currentDragElement]['progress'] = progress;
    renderBoard();
    await boardSaveToBackend()
}


function allowDrop(ev) {
    ev.preventDefault();
}
// -----


// load and upload to backend
async function boardSaveToBackend() {
    await downloadFromServer();
    let JSONAsText = JSON.stringify(loadedBoard);
    await backend.setItem("all_tasks", JSONAsText);
}


async function loadAllTaskFromBackend() {
    await downloadFromServer();
    loadedBoard = JSON.parse(backend.getItem("all_tasks"));
    if (!loadedBoard) {
        loadedBoard = [];
    };
}


async function loadContactsFromBackend() {
    await downloadFromServer();
    loadedContacts = JSON.parse(backend.getItem("contacts"));
    if (!loadedContacts) {
        loadedContacts = [];
    };
}
// -----


/**
 * filter all task with searchBar
 * 
 */
function filterTasks() {
    let search = document.getElementById('filterTasks').value;
    search = search.toLowerCase();
    clearRender();
    for (let i = 0; i < loadedBoard.length; i++) {
        let contact = loadedBoard[i];
        let contactTitel = contact['title'].toLowerCase();
        let contactDescription = contact['description'].toLowerCase();
        let contactProgress = contact.progress;
        let progressId = getProgressWithoutSpace(contactProgress);
        if (search == "") {
            renderBoard();
        }
        else if (contactTitel.includes(search) || contactDescription.includes(search)) {
            renderSearchedTasks(contactProgress, progressId, search);
        }
    }
}


/**
 * Render all filtered tasks
 * 
 * @param {string} contactProgress includes progress of task
 * @param {string} progressId includes progress of task without space between 2 words
 */
function renderSearchedTasks(contactProgress, progressId, search) {
    let length = loadedBoard.length - 1;
    for (let i = length; i >= 0; i--) {
        const currentProgress = loadedBoard[i]['progress'];
        let contactTitel = loadedBoard[i]['title'];
        let contactDescription = loadedBoard[i]['description'];
        if (currentProgress.includes(contactProgress) && contactTitel.includes(search) || contactDescription.includes(search)) {
            renderBoardFiltered(i, progressId);
        }
    }
}


/**
 * Render all tasks
 * 
 */
function renderBoard() {
    clearRender();
    let length = loadedBoard.length - 1;
    for (let i = length; i >= 0; i--) {
        const currentProgress = loadedBoard[i]['progress'];
        if (currentProgress.includes('todo')) {
            renderBoardFiltered(i, 'todo');
        } else if (currentProgress.includes('in Process')) {
            renderBoardFiltered(i, 'inProcess');
        } else if (currentProgress.includes('awaiting Feedback')) {
            renderBoardFiltered(i, 'awaitingFeedback');
        } else if (currentProgress.includes('done')) {
            renderBoardFiltered(i, 'done');
        } else {
            alert('Failed to load all Tasks - try to reload the page')
        }
    }
}


/**
 * clear entire area
 * 
 */
function clearRender() {
    let todo = document.getElementById('todo');
    let inProcess = document.getElementById('inProcess');
    let awaitingFeedback = document.getElementById('awaitingFeedback');
    let done = document.getElementById('done');
    todo.innerHTML = '';
    inProcess.innerHTML = '';
    awaitingFeedback.innerHTML = '';
    done.innerHTML = '';
}


/**
 * Render funktion
 * 
 * @param {string} index includes progress of task
 * @param {string} id includes progress of task without space between 2 words
 */
function renderBoardFiltered(index, id) {
    let progress = document.getElementById(id);
    let task = loadedBoard[index];
    let { color, category, title, description, date, priority, assignedTo, assignedToLength } = getTaskInfos(task);
    progress.innerHTML += renderBoardTemp(color, category, title, description, date, priority, assignedTo, id, index);
    let assignedToId = document.getElementById(`assignedTo${id}${index}`);
    assignedToId.innerHTML = '';
    renderAssignedTo(assignedToLength, assignedTo, assignedToId);
}


/**
 * render assigned to names
 * 
 * @param {number} assignedToLength includes count of names
 * @param {string} assignedTo includes names
 * @param {string} assignedToId id for innerHTML
 */
function renderAssignedTo(assignedToLength, assignedTo, assignedToId) {
    if (assignedToLength > 3) {
        for (let x = 0; x < 2; x++) {
            let currentName = assignedTo[x];
            let bothFirstLetters = splitName(currentName);
            let color = getContactColor(currentName);
            assignedToId.innerHTML += `<div style="background-color: ${color};" class="assigned">${bothFirstLetters}</div>`;
        }
        let numberOf = assignedToLength - 2;
        assignedToId.innerHTML += `<div style="background-color: #000000;" class="assigned">+${numberOf}</div>`;
    } else {
        for (let x = 0; x < assignedToLength; x++) {
            let currentName = assignedTo[x];
            let bothFirstLetters = splitName(currentName);
            let color = getContactColor(currentName);
            assignedToId.innerHTML += `<div style="background-color: ${color};" class="assigned">${bothFirstLetters}</div>`;

        }
    }
}


/**
 * opens and render current task by clicking on it
 * 
 * @param {number} color includes #code
 * @param {string} category includes task category
 * @param {string} title includes task title
 * @param {string} description includes task description
 * @param {string} date includes task date
 * @param {string} priority includes task priority
 * @param {string} assignedTo includes task assigned to names
 */
function openBoardTask(color, category, title, description, date, priority, assignedTo, progress, index) {
    let openPopup = document.getElementById('boardPopupTask');
    let priorityColor = getPriorityColor(priority);
    let assignedToArray = stringToArray(assignedTo)
    openPopup.classList.remove('d-none');

    openPopup.innerHTML = openBoardTaskTemp(color, category, title, description, date, priority, priorityColor, progress, index);
    openTaskAssignedTo(assignedToArray);
}


/**
 * render assigned to names in openBoardTask()
 * 
 * @param {string} assignedTo includes task assigned to names
 */
function openTaskAssignedTo(assignedTo) {
    let openTaskAssignedTo = document.getElementById('openTaskAssignedTo');
    for (let i = 0; i < assignedTo.length; i++) {
        let contact = assignedTo[i];
        let bothFirstLetters = splitName(contact);
        let nameColor = getContactColor(contact);
        openTaskAssignedTo.innerHTML += openTaskAssignedToTemp(contact, bothFirstLetters, nameColor);
    }
}


function closeBoardTask() {
    let closePopup = document.getElementById('boardPopupTask');
    closePopup.classList.add('d-none');
}


function editPopupTask(color, category, title, description, date, priority, priorityColor, progress, index) {
    let openPopup = document.getElementById('boardPopupTask');
    let currentTask = loadedBoard[index];
    let prioIndex = getPrioIndexEdit(currentTask);
    openPopup.innerHTML = editPopupTaskTemp(color, category, title, description, date, priority, priorityColor, progress, index);
    datepicker();
    addPrio(prioIndex);
}


function closeEditTaskBoard() {
    let closePopup = document.getElementById('boardPopupTask');
    closePopup.classList.add('d-none');
}


function addTaskBoard(param) {
    let addTaskId = document.getElementById('popupAddTaskBoard');
    let formId = document.getElementById('popupAddTastBoardForm');
    addTaskId.classList.remove('d-none');
    formId.setAttribute("onsubmit", "createTaskBoard('"+ param +"');return false;");
}



function closeAddTaskBoard() {
    let addTaskId = document.getElementById('popupAddTaskBoard');
    addTaskId.classList.add('d-none');
}


function getPrioIndexEdit(currentTask) {
    let prio = currentTask['prio'];
    let prioIndex;
    if (prio.includes('urgent')) {
        prioIndex = 0
    }
    if (prio.includes('medium')) {
        prioIndex = 1
    }
    if (prio.includes('low')) {
        prioIndex = 2
    }
    return prioIndex;
}


async function createTaskBoard(param) {
    if (param == 'undefined') {
        param = 'todo'
    }
    addDate();
    let jsonObj = {
        title: selectedTitle,
        description: selectedDescription,
        category: selectedCategory,
        color: selectedColor,
        contactNames: selectedContactNames,
        date: selectedDate,
        prio: selectedPrio,
        subtasks: selectedSubtasks,
        progress: param
    };
    loadedBoard.push(jsonObj);
    await boardSaveToBackend();
    clearTask();
    closeAddTaskBoard();
    showDivWithTransition();
    initBoard();
}


function showDivWithTransition() {
    setTimeout(function () {
        var div = document.querySelector('.cont-success-message');
        div.style.display = "flex";
        setTimeout(function () {
            div.style.transform = "translateY(0)";
            setTimeout(function () {
                div.style.transform = "translateY(200%)";
                setTimeout(function () {
                    div.style.display = "none";
                }, 1000);
            }, 5000);
        }, 1000);
    }, 1000);
}


function getProgressWithoutSpace(contactProgress) {
    let str = contactProgress;
    str = str.replace(/\s+/g, '');
    return str;
}


function stringToArray(string) {
    return string.split(",").map(function (name) {
        return name.trim();
    });
}


function getPriorityColor(priority) {
    if (priority == 'low') {
        return '#7AE229';
    }
    else if (priority == 'medium') {
        return '#FFA800';
    }
    else if (priority == 'urgent') {
        return '#FF3D00';
    }
}


function getTaskLength(progress) {
    let length = 0;
    for (let i = 0; i < loadedBoard.length; i++) {
        const currentProgress = loadedBoard[i]['progress'];
        if (currentProgress.includes(progress)) {
            length++;
        }
    }
    return length;
}


function getContactColor(currentName) {
    for (let i = 0; i < loadedContacts.length; i++) {
        let contact = loadedContacts[i].name;
        if (currentName.toLowerCase().includes("you")) {
            currentName = current_user.username;
        }
        if (contact.includes(currentName)) {
            return loadedContacts[i].color;
        }
    }
}



function getTaskInfos(task) {
    let color = task['color']
    let category = task['category'];
    let title = task['title'];
    let description = task['description'];
    let date = task['date'];
    let priority = task['prio'];
    let assignedTo = task['contactNames'];
    let assignedToLength = task['contactNames'].length;
    return { color, category, title, description, date, priority, assignedTo, assignedToLength };
}


function splitName(fullName) {
    let nameParts = fullName.split(" ");
    let firstName = nameParts[0];
    let lastName = nameParts[nameParts.length - 1];
    let bothFirstLetters = firstName.charAt(0) + lastName.charAt(0);
    return bothFirstLetters
}


async function getCurrentUserFromStorage() {
    let currentUserAsText = localStorage.getItem("current_user");
    if (!currentUserAsText) {
        window.location.href = "login.html";
    } else {
        current_user = JSON.parse(currentUserAsText);
    }
}


function checkForColor() {
    for (let i = 0; i < loadedContacts.length; i++) {
        let currentContact = loadedContacts[i];
        if (!currentContact.color) {
            let name = currentContact.name;
            let email = currentContact.email;
            let phone = currentContact.phone;
            let randomColor = getRandomColor();
            let newObjekt = { name: name, email: email, phone: phone, color: randomColor };
            loadedContacts.splice(i, 1, newObjekt);
        }
    }
}


function renderBoardTemp(color, category, title, description, date, priority, assignedTo, progress, index) {
    return `
    <div draggable="true" ondragstart="dragStart(${index})" onclick="openBoardTask('${color}', '${category}', '${title}', '${description}', '${date}', '${priority}', '${assignedTo}', '${progress}', '${index}')" class="todo-tasks">
        <h2 style="background-color: ${color};" class="task-head">${category}</h2>
        <span class="task-titel">${title}</span> <br><br>
        <span class="task-description">${description}</span>
        <div class="task-footer">
            <div id="assignedTo${progress}${index}" class="cont-assigned">

            </div>
            <img class="board-priority" src="./assets/img/priority_${priority}.png" alt="">
        </div>
    </div>
    `;
}


function openBoardTaskTemp(color, category, title, description, date, priority, priorityColor, progress, index) {
    return `
    <div class="cont-popup-board-task">
        <!--buttons-->
        <img onclick="closeBoardTask()" class="popup-close" src="./assets/img/board_popup_close.png" alt="">
        <button onclick="editPopupTask('${color}', '${category}', '${title}', '${description}', '${date}', '${priority}', '${priorityColor}', '${progress}', '${index}')" class="popup-edit-button"><img src="./assets/img/board_popup_edit.png"
                alt=""></button>
        <!--Head area-->
        <h2 style="background-color: ${color};" class="task-head">${category}</h2>
        <span class="popup-task-titel">${title}n</span>
        <span class="popup-task-description">${description}</span>
        <!--Date-->
        <div class="cont-popup-details">
            <span class="popup-details">Due date:</span>
            <span class="popup-date">${date}</span>
        </div>
        <!--Priority-->
        <div class="cont-popup-details">
            <span class="popup-details">Priority:</span>
            <h2 style="background-color: ${priorityColor};" class="popup-priority">
            ${priority}
                <img class="board-priority" src="./assets/img/priority_${priority}.png" alt="">
            </h2>
        </div>
        <!--Assigned To-->
        <span id="openTaskAssignedTo" class="popup-details">Assigned To:</span>

    </div>
    `;
}

function openTaskAssignedToTemp(contact, bothFirstLetters, nameColor) {
    return `
    <div class="popup-assigned-to-contacts">
        <div style="background-color: ${nameColor};" class="popup-assigned">${bothFirstLetters}</div>
        <span>${contact}</span>
    </div>
    `;
}


function editPopupTaskTemp(color, category, title, description, date, priority, assignedTo, progress, index, urgent, medium, low) {
    return `
    <form onsubmit="openBoardTask('${color}', '${category}', '${title}', '${description}', '${date}', '${priority}', '${assignedTo}', '${progress}', '${index}')" class="contPopupEditTaskBoard" style="overflow: hidden;">
        <!-- title -->
        <div class="column title">
            <span>Title</span>
            <input value="${title}" required placeholder="Enter a title" type="text" onkeyup="addTitle()" id="titleInput">
        </div>
        <!-- description -->
        <div class="column description">
            <span>Description</span>
            <textarea required placeholder="Enter a Description" type="text" onkeyup="addDescription()"
                id="descriptionTextarea">${description}</textarea>
        </div>
        <!-- due date -->
        <div class="column">
            <span>Due date</span>
            <input value="${date}" type="text" required placeholder="dd/mm/yyyy" id="datepicker"
                pattern="\d{1,2}\/\d{1,2}\/\d{4}"
                style="background: url('assets/img/calendar.svg') no-repeat 95%; background-color: white;">
        </div>
        <!-- prio -->
        <div class="column">
            <span>Prio</span>
            <div class="prioButtons">
                <div onclick="addPrio(0)" id="prioButton0" style="background-color:white;">Urgent <img
                        id="prioImage0" src="assets/img/urgent_newTask.svg"></div>
                <div onclick="addPrio(1)" id="prioButton1" style="background-color:white;">Medium <img
                        id="prioImage1" src="assets/img/medium_newTask.svg"></div>
                <div onclick="addPrio(2)" id="prioButton2" style="background-color:white;">Low <img
                        id="prioImage2" src="assets/img/low_newTask.svg"></div>
            </div>
        </div>
        <div class="column contacts">
            <span>Assigned to</span>
            <div class="selectField" id="selectFieldContact" onclick="openCloseContacts()">
                <div class="selectContact" id="selectContact">
                    <input id="contact" required placeholder="Select contacts to assign">
                    <div id="contactImage"><img class="paddingRight" src="assets/img/arrow_drop.svg"></div>
                </div>
                <div class="d-none" id="openedContacts" onclick="notOpenCloseContacts(event)">
                </div>
            </div>
            <div id="addedContacts"></div>
        </div>
        <button type="submit" class="create-new-contact-check">
            OK <img src="./assets/img/contact_check.png" alt="">
        </button>
        <img onclick="closeEditTaskBoard()" class="popup-close" src="./assets/img/board_popup_close.png" alt="">
    </form>
    `;
}