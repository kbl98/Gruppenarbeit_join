let loadedBoard = [];
let loadedContacts = [];
let currentDragElement;



async function initBoard() {
    setURL('https://gruppe-430.developerakademie.net/smallest_backend_ever-master');
    await loadAllTaskForBoard();
    await loadContactsFromBackend();
    await getCurrentUserFromStorage();
    renderBoard();
    setUserImg();
    checkForColor();
}


function dragStart(id) {
    currentDragElement = id;
}


function drop(progress) {
    loadedBoard[currentDragElement]['progress'] = progress;
    renderBoard();
}


function allowDrop(ev) {
    ev.preventDefault();
}


async function boardSaveToBackend() {
    await downloadFromServer();
    let JSONAsText = JSON.stringify(loadedBoard);
    await backend.setItem("all_tasks", JSONAsText);
}


async function loadAllTaskForBoard() {
    await downloadFromServer();
    loadedBoard = JSON.parse(backend.getItem("all_tasks"));
    if (!loadedBoard) {
        loadedBoard = [];
    };

    console.log('All Tasks', loadedBoard);
}


async function loadContactsFromBackend() {
    await downloadFromServer();
    loadedContacts = JSON.parse(backend.getItem("contacts"));
    if (!loadedContacts) {
        loadedContacts = [];
    };

    console.log('Alle Kontakte', loadedContacts);
}


function renderBoard() {
    clearRender();
    for (let i = 0; i < loadedBoard.length; i++) {
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


function renderBoardFiltered(index, id) {
    let progress = document.getElementById(id);
    let task = loadedBoard[index];
    let { color, category, title, description, date, priority, assignedTo, assignedToLength } = getTaskInfos(task);
    progress.innerHTML += renderBoardTemp(color, category, title, description, date, priority, assignedTo, id, index);
    let assignedToId = document.getElementById(`assignedTo${id}${index}`);
    assignedToId.innerHTML = '';
    renderAssignedTo(assignedToLength, assignedTo, assignedToId);
}



function renderAssignedTo(assignedToLength, assignedTo, assignedToId) {
    if (assignedToLength > 3) {
        for (let x = 0; x < 2; x++) {
            let currentName = assignedTo[x];
            let bothFirstLetters = splitName(currentName);
            let color = getContactColor(assignedToLength, assignedTo, x);
            assignedToId.innerHTML += `<div style="background-color: ${color};" class="assigned">${bothFirstLetters}</div>`;
        }
        let numberOf = assignedToLength - 2;
        assignedToId.innerHTML += `<div style="background-color: #000000;" class="assigned">+${numberOf}</div>`;
    } else {
        for (let x = 0; x < assignedToLength; x++) {
            let currentName = assignedTo[x];
            let bothFirstLetters = splitName(currentName);
            let color = getContactColor(assignedToLength, assignedTo, x);
            assignedToId.innerHTML += `<div style="background-color: ${color};" class="assigned">${bothFirstLetters}</div>`;

        }
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


function getContactColor(assignedToLength, assignedTo, j) {
    for (let x = j; x < assignedToLength; x++) {
        let currentName = assignedTo[x];
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
    // let fullName = "David Eisenberg";
    let nameParts = fullName.split(" ");
    let firstName = nameParts[0];
    let lastName = nameParts[nameParts.length - 1];
    let bothFirstLetters = firstName.charAt(0) + lastName.charAt(0);
    return bothFirstLetters
    // console.log(firstName); Output: "David"
    // console.log(lastName); Output: "Eisenberg"
}


function openBoardTask() {
    let openPopup = document.getElementById('boardPopupTask');
    openPopup.classList.remove('d-none');
}


function closeBoardTask() {
    let closePopup = document.getElementById('boardPopupTask');
    closePopup.classList.add('d-none');
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
    <div draggable="true" ondragstart="dragStart(${index})" onclick="openBoardTask('${color}', '${category}', '${title}', '${description}', '${date}', '${priority}', '${assignedTo}', '${progress}')" class="todo-tasks">
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