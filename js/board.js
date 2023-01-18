let loadedBoard = [];


async function initBoard() {
    setURL('https://gruppe-430.developerakademie.net/smallest_backend_ever-master');
    await loadAllTaskForBoard();
    //renderBoard();
}


async function loadAllTaskForBoard() {
    await downloadFromServer();
    loadedBoard = JSON.parse(backend.getItem("all_tasks"));
    if (!loadedBoard) {
        loadedBoard = [];
    };

    console.log('All Tasks', loadedBoard);
}


function openBoardTask() {
    let openPopup = document.getElementById('boardPopupTask');
    openPopup.classList.remove('d-none');
}


function closeBoardTask() {
    let closePopup = document.getElementById('boardPopupTask');
    closePopup.classList.add('d-none');
}