let selectedTitle;
let selectedDescription;
let selectedDate;
let selectedPrio;
let allSubtasks = [];
let selectedSubtasks = [];
let subtaskImageSrc = [];



// let jsontest= [
//     {
//       "title": "das ist ein Titel",
//       "description": "das ist eine Beschreibung",
//       "category": "das ist eine Kategorie",
//       "color": "#ffffff",
//       "contactNames": ["You","Max Wolfberg"],
//       "date": "22/03/2023",
//       "prio": "urgent",
//       "subtasks": ["subtask1","subtask2"],
//       "progress":"todo"
//      },
//   ];

  
async function init() {
  await includeHTML();
  await loadTasks();
  await loadContacts();
  getLocalCurrentUser();
  await renderAllContacts();
  addPrio(0);
  datepicker();
  setUserImg();
}

function getLocalCurrentUser() {
  let currentUserAsText = localStorage.getItem('current_user');
  if (currentUserAsText) {
    current_user = JSON.parse(currentUserAsText);
  }
}


/**
 * function to load all tasks which are saved on the server
 */
async function loadTasks() {
  setURL('https://gruppe-430.developerakademie.net/smallest_backend_ever-master');
  await downloadFromServer();
  all_tasks = JSON.parse(backend.getItem('all_tasks')) || [];
  console.log('Alle Aufgaben:', all_tasks);
}


/**
 * function to add a task to the array "all_tasks" and save it on the server
 * 
 * @param {JSON} task - contains all informations for a task
 */
async function saveAllTasks(task) {
  all_tasks.push(task);
  await backend.setItem('all_tasks', JSON.stringify(all_tasks));
  loadTasks();
}


// async function testjson() {
// await downloadFromServer();
// let testjsonText = JSON.stringify(jsontest);
// await backend.setItem('all_tasks', testjsonText);
// }


//Title
/**
 * function to add the entered title from the inputfield to the variable called "selectedTitle"
 */
function addTitle() {
  let title = document.getElementById('titleInput');
  selectedTitle = '';
  selectedTitle = title.value;
}


//Description
/**
 * function to add the entered description from the textarea to the variable called "selecteddescription"
 */
function addDescription() {
  let description = document.getElementById('descriptionTextarea');
  selectedDescription = '';
  selectedDescription = description.value;
}


//DUE DATE
/**
 * function to open the jquery-datepicker 
 */
function datepicker() {
  $( function() {
    $( "#datepicker" ).datepicker({dateFormat: 'dd/mm/yy'});
  } );
}

/**
 * function to add the selected date to the array "selectedDate"
 */
function addDate() {
  selectedDate = document.getElementById('datepicker').value;
}


//PRIO
/**
 * function to change the colors of all prio-buttons and add its priority to the array "selectedPriod"
 * 
 * @param {number} i - number to get the correct Button
 */
function addPrio(i) {
  let id = document.getElementById('prioButton' + i);
  let colors = ['#ff3d00', '#ffa800', '#7ae229'];
  let prios = ['urgent', 'medium', 'low'];
    changePrioColors();
    id.style.backgroundColor = colors[i];
    id.style.color = 'white';
    document.getElementById('prioImage' + i).style.filter = 'brightness(0) invert(1)';
    selectedPrio = prios[i];

}


/**
 * function to change the colors of all buttons
 */
function changePrioColors() {
  for (let y = 0; y < 3; y++) {
    document.getElementById('prioButton' + y).style.backgroundColor = 'white';
    document.getElementById('prioButton' + y).style.color = 'black';
    document.getElementById('prioImage' + y).style.filter = 'brightness(1) invert(0)';
  };
}


//SUBTASKS
/**
 * function to add a new subtask to the container under the inputfield
 */
function addNewSubtask() {
  let newSubtaskInput = document.getElementById('newSubtaskInput');
  document.getElementById('newSubtasks').innerHTML = ''; //alle subtasks löschen
  if (!newSubtaskInput.value == '') { //wenn inputfeld nicht leer dann ....
    allSubtasks.push(newSubtaskInput.value); //... füge das vom input in allsubtasks ein
    for (let i = 0; i < allSubtasks.length; i++) {
      let newSubtask = allSubtasks[i];
      changeImage(newSubtask);
      document.getElementById('newSubtasks').innerHTML += showSubtask(i, newSubtask);
    }
  }
  newSubtaskInput.value = '';
}


/**
 * function to load the correct Image left to the subtasks (rectangle with or without a checkmark)
 * 
 * @param {String} newSubtask - a subtask in the array "allSubtasks"
 */
function changeImage (newSubtask) {
  subtaskImageSrc = "assets/img/subtask_rectangle.svg";
  if (selectedSubtasks.includes(newSubtask)) {
    subtaskImageSrc = "assets/img/subtask_ok.png";
  }
}


/**
 * function to show the new subtask and the correct image left to it (rectangle with or without a checkmark)
 * 
 * @param {number} i - number to checkmark the correct subtask
 * @param {String} newSubtask - subtask which was written in the inputfield
 */
function showSubtask (i, newSubtask) {
 return `
  <div class="newSubtasks">
    <img src=${subtaskImageSrc} class="paddingRight" id="checkbox${i}" onclick="checkmark(${i})"><span class="newSubtask">${newSubtask}</span>
  </div>
  `;
}

/**
 * function to add or remove the checkmark next to the subtask
 * 
 * @param {number} i - number to checkmark the correct subtask 
 */
function checkmark(i) {
  let newSubtask = allSubtasks[i];
  let index = selectedSubtasks.indexOf(newSubtask);
  if (index == -1) {
    document.getElementById('checkbox' + i).src = 'assets/img/subtask_ok.png';
    selectedSubtasks.push(newSubtask);
  } else {
    document.getElementById('checkbox' + i).src = 'assets/img/subtask_rectangle.svg';
    selectedSubtasks.splice(index, 1);
  };
}


//CLEAR BUTTON
/**
 * function to reset the page by clicking on the clear-button
 */
function clearTask() {
  resetVariables();
  resetContent();
}

/**
 * function to reset all variables
 */
function resetVariables() {
  selectedTitle = '';
  selectedDescription = '';
  selectedCategory = [];
  selectedContactNames = [];
  invitedContacts = [];
  selectedDate = '';
  selectedPrio = '';
  allSubtasks = [];
  selectedSubtasks = [];
}

/**
 * function to reset the content of the page
 */
function resetContent() {
  document.getElementById('titleInput').value = '';
  document.getElementById('descriptionTextarea').value = '';
  cancelNewCategory();
  closeCategories();
  closeContacts();
  document.getElementById('contactButton0').innerHTML = '';
  document.getElementById('contactButton1').innerHTML = '';
  document.getElementById('datepicker').value = '';
  resetPrioButtons();
  document.getElementById('newSubtasks').innerHTML = '';
  document.getElementById('newSubtaskInput').value = '';

}

/**
 * function to close the opened-categories-field
 */
function closeCategories() {
  document.getElementById('selectField').style.height = '51px';
  document.getElementById('openedCategories').classList.add('d-none');
}

/**
 * function to close the opened-contacts-field
 */
function closeContacts() {
  document.getElementById('selectFieldContact').style.height = '51px';
  document.getElementById('openedContacts').classList.add('d-none');
}

/**
 * function to change the color of the prio-buttons to white
 */
function resetPrioButtons() {
  for (let i = 0; i < 3; i++) {
    document.getElementById('prioButton' + i).style.backgroundColor = 'white';
    document.getElementById('prioButton' + i).style.color = 'black';
  };
}


//CREATE BUTTON
/**
 * function to create a new task
 */
async function createTask() {
  addDate();
  let task = {
    title: selectedTitle,
    description: selectedDescription,
    category: selectedCategory,
    color: selectedColor,
    contactNames: selectedContactNames,
    date: selectedDate,
    prio: selectedPrio,
    subtasks: selectedSubtasks,
    progress: 'todo'
  };
  await saveAllTasks(task);
  clearTask();
}



