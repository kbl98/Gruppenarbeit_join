let loadedBoard = [];



async function initBoard() {
    setURL('https://gruppe-430.developerakademie.net/smallest_backend_ever-master');
    await loadAllTaskForBoard();
    renderBoard();
}


//async function testSaveToBackend() {
//    await downloadFromServer();
//    let deinJSONAsText = JSON.stringify(deinJSON);
//    await backend.setItem("all_tasks", deinJSONAsText);
//}



async function loadAllTaskForBoard() {
    await downloadFromServer();
    loadedBoard = JSON.parse(backend.getItem("all_tasks"));
    if (!loadedBoard) {
        loadedBoard = [];
    };

    console.log('All Tasks', loadedBoard);
}


function renderBoard() {
    for (let i = 0; i < loadedBoard.length; i++) {
        const currentProgress = loadedBoard[i]['progress'];
        if (currentProgress.includes('todo')) {
            console.log('Todo true');
            renderBoardTodo(currentProgress);
        } else if (currentProgress.includes('in Process')) {
            //console.log('in Process true');
            //renderBoardInProcess(currentProgress);
        } else if (currentProgress.includes('awaiting Feedback')) {
            //console.log('awaiting Feedback true');
            //renderBoardAwaitingFeedback(currentProgress);
        } else if (currentProgress.includes('done')) {
            //console.log('done true');
            //renderBoardDone(currentProgress);
        } else {
            alert('Failed to load all Tasks - try to reload the page')
        }
    }
}


function renderBoardTodo(currentProgress) {
    let todo = document.getElementById('contTodo');
    todo.innerHTML = '';
    for (let i = 0; i < loadedBoard.length; i++) {
        let task = loadedBoard[i];
        if (currentProgress.includes('todo')) {
            let category = task['category'];
            let titel = task['title'];
            let description = task['description'];
            let date = task['date'];
            let priority = task['prio'];
            let assignedTo = task['contactNames'];
            //todo.innerHTML += renderBoardTemp(category, titel, description, date, priority, assignedTo);
        }
    }
}


function openBoardTask() {
    let openPopup = document.getElementById('boardPopupTask');
    openPopup.classList.remove('d-none');
}


function closeBoardTask() {
    let closePopup = document.getElementById('boardPopupTask');
    closePopup.classList.add('d-none');
}


function renderBoardTemp(category, titel, description, date, priority, assignedTo) {
    return `
    <div onclick="openBoardTask('${category}', '${titel}', '${description}', '${date}', '${priority}', '${assignedTo}')" class="todo-tasks">
        <h2 style="background-color: #FF7A00;" class="task-head">Design</h2>
        <span class="task-titel">Website redesign</span> <br><br>
        <span class="task-description">Modify the contents of the main website...</span>
        <div class="cont-progress">
            <div class="progress">
                <div style="width: 50% !important;" class="progress-bar">
                </div>
            </div>
            <span>1/2 Done</span>
        </div>
        <div class="task-footer">
            <div class="cont-assigned">
                <div style="background-color: #0190E0;" class="assigned">SM</div>
                <div style="background-color: #EE00D6;" class="assigned">MV</div>
                <div style="background-color: #02CF2F;" class="assigned">EF</div>
            </div>
            <img class="board-priority" src="./assets/img/priority_low.png" alt="">
        </div>
    </div>
    `;
}