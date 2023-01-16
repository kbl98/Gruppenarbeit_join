let selectedTitle;
let selectedDescription;
let selectedCategory = [];
let selectedContactNames = [];
let invitedContacts = [];
let selectedDate;
let selectedPrio;
let allSubtasks = [];
let selectedSubtasks = [];


//Title
/**
 * function to add the entered title from the inputfield to the variable called "selectedTitle"
 */
function addTitle() {
  let title = document.getElementById('titleInput');
  selectedTitle = [];
  selectedTitle.push(title.value);
}


//Description
/**
 * function to add the entered description from the textarea to the variable called "selecteddescription"
 */
function addDescription() {
  let description = document.getElementById('descriptionTextarea');
  selectedDescription = [];
  selectedDescription.push(description.value);
}


//Category
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
 * @param {number} i - number to get de correct category-ID
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
  selectedCategory.push({
    "name": categoryName.value,
    "color": categoryColor.innerHTML
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


function changeColor(i) {
  document.getElementById('categoryColor').innerHTML = document.getElementById('changeColor' + i).innerHTML;
  document.getElementById('category').focus();
}


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


function acceptNewCategory() {
  if (!document.getElementById('category').value == '' && !document.getElementById('categoryColor').innerHTML == '') {
    let categoryName = document.getElementById('category');
    let categoryColor = document.getElementById('categoryColor');
    document.getElementById('categoryImage').innerHTML = `<img src="assets/img/arrow_drop.svg">`;
    document.getElementById('selectField').setAttribute('onclick', 'openCloseCategories()');
    document.getElementById('categoryColors').classList.add('d-none');
    selectedCategory = [];
    selectedCategory.push({
      "name": categoryName.value,
      "color": categoryColor.innerHTML
    });
  }
}

/**
 * function to open or close the category-field when click on it
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
 *
 * this function will prevent to open or close the category-field
 */
function notOpenCloseCategories(event) {
  event.stopPropagation();
}


//ASSIGNED TO
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


function addNewContact() {
  let contact = document.getElementById('contact');
  openCloseContacts();
  contact.placeholder = 'Contact E-Mail';
  contact.disabled = false;
  document.getElementById('contactImage').innerHTML = `<div onclick="notOpenCloseContacts(event)" class="paddingRight"><img src="assets/img/cross.svg" onclick="cancelNewContact()"><img src="assets/img/finish.svg" onclick="acceptNewContact()"></div>`;
  document.getElementById('selectFieldContact').removeAttribute('onclick');
}


function cancelNewContact() {
  let contact = document.getElementById('contact');
  contact.placeholder = 'Select contacts to assign';
  contact.disabled = true;
  document.getElementById('contactImage').innerHTML = `<img class="paddingRight" src="assets/img/arrow_drop.svg">`;
  document.getElementById('selectFieldContact').setAttribute('onclick', 'openCloseContacts()');
}


function acceptNewContact() {
  let contact = document.getElementById('contact');
  invitedContacts.push(contact.value);
  contact.value = '';
  contact.placeholder = 'Select contacts to assign';
  contact.disabled = true;
  document.getElementById('contactImage').innerHTML = `<img class="paddingRight" src="assets/img/arrow_drop.svg">`;
  document.getElementById('selectFieldContact').setAttribute('onclick', 'openCloseContacts()');
}


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


function notOpenCloseContacts(event) {
  event.stopPropagation();
}


//DUE DATE
// $( function() {
//   $( "#datepicker" ).datepicker();
// } );


function addDate() {
  let date = document.getElementById('datepicker');
  selectedDate = date.value;
}


//PRIO
function addPrio(i) {
  let id = document.getElementById('prioButton' + i);
  let colors = ['#ff3d00', '#ffa800', '#7ae229'];
  let prios = ['urgent', 'medium', 'low'];
  for (let x = 0; x < 3; x++) {
    if (i == x && id.style.backgroundColor == 'white') {
      for (let y = 0; y < 3; y++) {
        document.getElementById('prioButton' + y).style.backgroundColor = 'white';
        document.getElementById('prioButton' + y).style.color = 'black';
        document.getElementById('prioImage' + y).style.filter = 'brightness(1) invert(0)';
      };
      id.style.backgroundColor = colors[x];
      id.style.color = 'white';
      document.getElementById('prioImage' + i).style.filter = 'brightness(0) invert(1)';
      selectedPrio = prios[x];
    }
  }
}


//SUBTASKS
function addNewSubtask() {
  let newSubtaskInput = document.getElementById('newSubtaskInput');
  document.getElementById('newSubtasks').innerHTML = '';
  if (!newSubtaskInput.value == '') {
    allSubtasks.push(newSubtaskInput.value);
    for (let i = 0; i < allSubtasks.length; i++) {
      let newSubtask = allSubtasks[i];
      let src = "assets/img/subtask_rectangle.svg";
      if (selectedSubtasks.includes(newSubtask)) {
        src = "assets/img/subtask_ok.png";
      }
      document.getElementById('newSubtasks').innerHTML += `
  <div class="newSubtasks">
    <img src=${src} class="paddingRight" id="checkbox${i}" onclick="checkmark(${i})"><span class="newSubtask">${newSubtask}</span>
  </div>
  `;
    }
  }
  newSubtaskInput.value = '';
}


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
function clearTask() {
  resetVariables();
  resetContent();
}


function resetVariables() {
  selectedTitle = [];
  selectedDescription = [];
  selectedCategory = [];
  selectedContactNames = [];
  invitedContacts = [];
  selectedDate = [];
  selectedPrio = [];
  allSubtasks = [];
}


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


function closeCategories() {
  document.getElementById('selectField').style.height = '51px';
  document.getElementById('openedCategories').classList.add('d-none');
}


function closeContacts() {
  document.getElementById('selectFieldContact').style.height = '51px';
  document.getElementById('openedContacts').classList.add('d-none');
}


function resetPrioButtons() {
  for (let i = 0; i < 3; i++) {
    document.getElementById('prioButton' + i).style.backgroundColor = 'white';
    document.getElementById('prioButton' + i).style.color = 'black';
  };
}


//CREATE BUTTON
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
}



async function loadTasks() {
  setURL('https://gruppe-430.developerakademie.net/smallest_backend_ever-master');
  await downloadFromServer();
  all_tasks = JSON.parse(backend.getItem('all_tasks')) || [];
  console.log('Alle Aufgaben:', all_tasks);
}


async function saveAllTasks(task) {
  all_tasks.push(task);
  await backend.setItem('all_tasks', JSON.stringify(all_tasks));
  loadTasks();
}



