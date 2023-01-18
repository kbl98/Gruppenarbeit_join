let selectedTitle;
let selectedDescription;
let selectedCategory = [];
let selectedContactNames = [];
let invitedContacts = [];
let selectedDate;
let selectedPrio;
let allSubtasks = [];
let selectedSubtasks = [];
let subtaskImageSrc = [];


async function init() {
  await includeHTML();
  loadTasks();
  $( function() {
    $( "#datepicker" ).datepicker();
  } );
}


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


//Category
/**
 * function to disable and enable the category-inputfield
 */
function disableInput () {
  if (document.getElementById('category').disabled = true) {
    document.getElementById('category').disabled = false;
  } else {
    document.getElementById('category').disabled = true;
  }
}


/**
 * function to add a existing category and its color to the array "selectedCategory"
 *
 * @param {number} i - number to get the correct ID
 */
function addCategory(i) {
  let categoryName = document.getElementById('category');
  let categoryColor = document.getElementById('categoryColor');
  categoryName.style.color = 'black';
  document.getElementById('category').value = document.getElementById('category' + i).innerHTML;
  document.getElementById('categoryColor').innerHTML = document.getElementById('imageCat' + i).innerHTML;
  document.getElementById('categoryImage').innerHTML = `<img src="assets/img/arrow_drop.svg">`;
  openCloseCategories();
  selectedCategory = [];
  let categoryColorCut = categoryColor.innerHTML.substring(28).slice(0,-6);
  selectedCategory.push({
    "name": categoryName.value,
    "color": categoryColorCut
  });
}


/**
 * function to make the container editable that you can write in your own category and select a color
 */
function addNewCategory() {
  let categoryName = document.getElementById('category');
  openCloseCategories();
  categoryName.value = '';
  categoryName.style.color = 'black';
  document.getElementById('categoryImage').innerHTML = `<div  onclick="notOpenCloseCategories(event)"><img src="assets/img/cross.svg" onclick="cancelNewCategory()"> <img src="assets/img/finish.svg" onclick="acceptNewCategory()"></div>`;
  document.getElementById('categoryColors').classList.remove('d-none');
  document.getElementById('selectField').removeAttribute('onclick');
  document.getElementById('categoryColor').innerHTML = '';
  categoryName.focus();
}

/**
 * function to add the selected color to the new category
 * 
 * @param {number} i - number to get the correct color
 */
function changeColor(i) {
  document.getElementById('categoryColor').innerHTML = document.getElementById('changeColor' + i).innerHTML;
  document.getElementById('category').focus();
}

/**
 * function to delete the new category and reset the category-field
 */
function cancelNewCategory() {
  let categoryName = document.getElementById('category');
  categoryName.value = '';
  categoryName.placholder = 'Select task category';
  categoryName.style.color = '#dcdcdc';
  document.getElementById('categoryImage').innerHTML = `<img src="assets/img/arrow_drop.svg">`;
  document.getElementById('categoryColors').classList.add('d-none');
  document.getElementById('selectField').setAttribute('onclick', 'openCloseCategories()');
  document.getElementById('categoryColor').innerHTML = '';
}

/**
 * function to add the new category and its color to the array "selectedCategory"
 */
function acceptNewCategory() {
  if (!document.getElementById('category').value == '' && !document.getElementById('categoryColor').innerHTML == '') {
    let categoryName = document.getElementById('category');
    let categoryColor = document.getElementById('categoryColor');
    document.getElementById('categoryImage').innerHTML = `<img src="assets/img/arrow_drop.svg">`;
    document.getElementById('selectField').setAttribute('onclick', 'openCloseCategories()');
    document.getElementById('categoryColors').classList.add('d-none');
    selectedCategory = [];
    let categoryColorCut = categoryColor.innerHTML.substring(28).slice(0,-6);
    selectedCategory.push({
      "name": categoryName.value,
      "color": categoryColorCut
    });
  }
}

/**
 * function to open or close the category-field by clicking on it
 */
function openCloseCategories() {
  if (document.getElementById('selectField').style.height == '192px') {
    document.getElementById('selectField').style.height = '51px';
    document.getElementById('openedCategories').classList.add('d-none');
  } else {
    document.getElementById('selectField').style.height = '192px';
    setTimeout(function () {
      document.getElementById('openedCategories').classList.remove('d-none');
    }, 150)
  }
  disableInput();
}

/**
 * function to prevent to open or close the category-field
 */
function notOpenCloseCategories(event) {
  event.stopPropagation();
}


//ASSIGNED TO
/**
 * function to add/delete a existing contact to/from the array ""selectedContactNames"
 * 
 * @param {number} i - number to get the correct contact
 */
function addContact(i) {
  let contactID = document.getElementById('contact' + i);
  let index = selectedContactNames.indexOf(contactID.innerHTML);
  if (index > -1) { //wenn Name bereits enthalten dann...
    document.getElementById('contactButton' + i).innerHTML = ''; //... entferne Bild im Button
    selectedContactNames.splice(index, 1); //entferne Name
  } else { //wenn Name noch nicht enthalten dann...
    document.getElementById('contactButton' + i).innerHTML = `<img src="assets/img/button_rectangle.svg">`; //... füge Bild im Button hinzu
    selectedContactNames.push(contactID.innerHTML); //füge Name hinzu
  }
}

/**
 * function to make the container editable that you can write in an e-mail adress of the contact you want to invite
 */
function addNewContact() {
  let contact = document.getElementById('contact');
  openCloseContacts();
  contact.placeholder = 'Contact E-Mail';
  contact.disabled = false;
  document.getElementById('contactImage').innerHTML = `<div onclick="notOpenCloseContacts(event)" class="paddingRight"><img src="assets/img/cross.svg" onclick="cancelNewContact()"><img src="assets/img/finish.svg" onclick="acceptNewContact()"></div>`;
  document.getElementById('selectFieldContact').removeAttribute('onclick');
}

/**
 * function to delete the e-mail adress and reset the contact-field
 */
function cancelNewContact() {
  let contact = document.getElementById('contact');
  contact.placeholder = 'Select contacts to assign';
  contact.disabled = true;
  document.getElementById('contactImage').innerHTML = `<img class="paddingRight" src="assets/img/arrow_drop.svg">`;
  document.getElementById('selectFieldContact').setAttribute('onclick', 'openCloseContacts()');
}

/**
 * function to add the e-mail adress to the array "invitedContacts"
 */
function acceptNewContact() {
  let contact = document.getElementById('contact');
  invitedContacts.push(contact.value);
  contact.value = '';
  contact.placeholder = 'Select contacts to assign';
  contact.disabled = true;
  document.getElementById('contactImage').innerHTML = `<img class="paddingRight" src="assets/img/arrow_drop.svg">`;
  document.getElementById('selectFieldContact').setAttribute('onclick', 'openCloseContacts()');
}

/**
 * function to open or close the contacts-field by clicking on it
 */
function openCloseContacts() {
  if (document.getElementById('selectFieldContact').style.height == '192px') {
    document.getElementById('selectFieldContact').style.height = '51px';
    document.getElementById('openedContacts').classList.add('d-none');
  } else {
    document.getElementById('selectFieldContact').style.height = '192px';
    setTimeout(function () {
      document.getElementById('openedContacts').classList.remove('d-none');
    }, 150)
  }
}

/**
 * function to prevent to open or close the category-field
 */
function notOpenCloseContacts(event) {
  event.stopPropagation();
}


//DUE DATE
/**
 * function to open the jquery-datepicker 
 */



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
    if (selectedPrio == prios[i]) {
      changePrioColors();
      selectedPrio = '';
    } else {
    id.style.backgroundColor = colors[i];
    id.style.color = 'white';
    document.getElementById('prioImage' + i).style.filter = 'brightness(0) invert(1)';
    selectedPrio = prios[i];
    };
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
function createTask() {
  addDate();
  let task = {
    title: selectedTitle,
    description: selectedDescription,
    category: selectedCategory,
    contactNames: selectedContactNames,
    invitedContacts: invitedContacts,
    date: selectedDate,
    prio: selectedPrio,
    subtasks: selectedSubtasks,
    progress: 'todo'
  };
  saveAllTasks(task);
  clearTask();
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



