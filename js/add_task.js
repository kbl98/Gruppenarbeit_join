let selectedTitle = [];
let selectedDescription = [];
let selectedCategory = [];
let selectedContactNames = [];
let invitedContacts = [];
let selectedDate;
let selectedPrio;
let allSubtasks = [];


//Title
function addTitle() {
  let title = document.getElementById('titleInput');
  selectedTitle = [];
  selectedTitle.push(title.value);
}

//Description
function addDescription() {
  let description = document.getElementById('descriptionTextarea');
  selectedDescription = [];
  selectedDescription.push(description.value);
}


//Category
function addCategory(i) {
  let categoryName = document.getElementById('category');
  let categoryColor = document.getElementById('categoryColor');
  categoryName.style.color='black';
  document.getElementById('category').innerHTML= document.getElementById('category'+i).innerHTML;
  document.getElementById('categoryColor').innerHTML= document.getElementById('imageCat'+i).innerHTML;
  document.getElementById('categoryImage').innerHTML = `<img src="assets/img/arrow_drop.svg">`;
  openCloseCategories();
  selectedCategory = [];
  selectedCategory.push({
    "name": categoryName.innerHTML,
    "color": categoryColor.innerHTML
  });
}


function addNewCategory() {
  let categoryName = document.getElementById('category');
  categoryName.contentEditable="true";
  openCloseCategories();
  categoryName.innerHTML='';
  categoryName.style.color='black';
  document.getElementById('categoryImage').innerHTML = `<div  onclick="notOpenCloseCategories(event)"><img src="assets/img/cross.svg" onclick="cancelNewCategory()"> <img src="assets/img/finish.svg" onclick="acceptNewCategory()"></div>`;
  document.getElementById('categoryColors').classList.remove('d-none');
  document.getElementById('selectField').removeAttribute('onclick');
  document.getElementById('categoryColor').innerHTML = '';
  categoryName.focus();
}


function changeColor(i) {
  document.getElementById('categoryColor').innerHTML = document.getElementById('changeColor'+i).innerHTML;
  document.getElementById('category').focus();
}


function cancelNewCategory () {
  let categoryName = document.getElementById('category');
  categoryName.innerHTML='Select task category';
  categoryName.contentEditable="false";
  categoryName.style.color= '#dcdcdc';
  document.getElementById('categoryImage').innerHTML = `<img src="assets/img/arrow_drop.svg">`;
  document.getElementById('categoryColors').classList.add('d-none');
  document.getElementById('selectField').setAttribute('onclick','openCloseCategories()');
  document.getElementById('categoryColor').innerHTML = '';
}


function acceptNewCategory (){
  if (!document.getElementById('category').innerHTML=='' && !document.getElementById('categoryColor').innerHTML=='') {
    let categoryName = document.getElementById('category');
    let categoryColor = document.getElementById('categoryColor');
    document.getElementById('category').contentEditable="false";
    document.getElementById('categoryImage').innerHTML = `<img src="assets/img/arrow_drop.svg">`;
    document.getElementById('selectField').setAttribute('onclick','openCloseCategories()');
    document.getElementById('categoryColors').classList.add('d-none');
    selectedCategory = [];
    selectedCategory.push({
      "name": categoryName.innerHTML,
      "color": categoryColor.innerHTML
    });
  }
}


function openCloseCategories() {
  if (document.getElementById('selectField').style.height == '192px') {
    document.getElementById('selectField').style.height = '51px';
    document.getElementById('openedCategories').classList.add('d-none');
  } else {
  document.getElementById('selectField').style.height = '192px';
  setTimeout(function(){
    document.getElementById('openedCategories').classList.remove('d-none');},150)
  }
}


function notOpenCloseCategories(event) {
event.stopPropagation();
}


//ASSIGNED TO
function addContact(i) {
  let contactID = document.getElementById('contact'+i);
  let index = selectedContactNames.indexOf(contactID.innerHTML);
  if (index>-1) { //wenn Name bereits enthalten dann...
    document.getElementById('contactButton'+i).innerHTML=''; //... entferne Bild im Button
    selectedContactNames.splice(index,1); //entferne Name
  } else { //wenn Name noch nicht enthalten dann...
  document.getElementById('contactButton'+i).innerHTML=`<img src="assets/img/button_rectangle.svg">`; //... füge Bild im Button hinzu
  selectedContactNames.push(contactID.innerHTML); //füge Name hinzu
  }
}


function addNewContact() {
  let contact = document.getElementById('contact');
  openCloseContacts();
  contact.placeholder='Contact E-Mail';
  contact.disabled = false;
  document.getElementById('contactImage').innerHTML = `<div onclick="notOpenCloseContacts(event)" class="paddingRight"><img src="assets/img/cross.svg" onclick="cancelNewContact()"> <img src="assets/img/finish.svg" onclick="acceptNewContact()"></div>`;
  document.getElementById('selectFieldContact').removeAttribute('onclick');
}


function cancelNewContact () {
  let contact = document.getElementById('contact');
  contact.placeholder='Select contacts to assign';
  contact.disabled = true;
  document.getElementById('contactImage').innerHTML = `<img class="paddingRight" src="assets/img/arrow_drop.svg">`;
  document.getElementById('selectFieldContact').setAttribute('onclick','openCloseContacts()');
}


function acceptNewContact (){
    let contact = document.getElementById('contact');
    invitedContacts.push(contact.value);
    contact.value = '';
    contact.placeholder='Select contacts to assign';
    contact.disabled = true;
    document.getElementById('contactImage').innerHTML = `<img class="paddingRight" src="assets/img/arrow_drop.svg">`;
    document.getElementById('selectFieldContact').setAttribute('onclick','openCloseContacts()');
}


function openCloseContacts() {
  if (document.getElementById('selectFieldContact').style.height == '192px') {
    document.getElementById('selectFieldContact').style.height = '51px';
    document.getElementById('openedContacts').classList.add('d-none');
  } else {
  document.getElementById('selectFieldContact').style.height = '192px';
  setTimeout(function(){
    document.getElementById('openedContacts').classList.remove('d-none');},150)
  }
}


function notOpenCloseContacts(event) {
event.stopPropagation();
}


//DUE DATE
    $( function() {
      $( "#datepicker" ).datepicker( {dateFormat: "dd/mm/yy"});
    } )
    ;


function addDate() {
  let date = document.getElementById('datepicker');
  selectedDate = date.value;
}


//PRIO
function addPrio(i) {
  let id = document.getElementById('prioButton'+i);
  let colors = ['#ff3d00','#ffa800','#7ae229'];
  let prios = ['urgent', 'medium','low'];
  for (let x = 0; x < 3; x++) {
    if (i==x && id.style.backgroundColor == 'white') {
      for (let y = 0; y < 3; y++) {
        document.getElementById('prioButton'+y).style.backgroundColor = 'white';
        document.getElementById('prioButton'+y).style.color = 'black';
      };
      id.style.backgroundColor = colors[x];
      id.style.color = 'white';
      selectedPrio = prios[x];
    }
  }
}


//SUBTASKS
function addNewSubtask(){
  let newSubtaskInput = document.getElementById('newSubtaskInput');
  allSubtasks.push(newSubtaskInput.value);
  document.getElementById('newSubtasks').innerHTML = '';
  for (let i = 0; i < allSubtasks.length; i++) {
    const newSubtask = allSubtasks[i];
  document.getElementById('newSubtasks').innerHTML += `
  <div class="newSubtasks">
    <img src="assets/img/subtask_rectangle.svg" class="paddingRight" id="checkbox${i}" onclick="checkmark(${i})"><span class="newSubtask">${newSubtask}</span>
  </div>
  `;

}
}
//NICHT FERTIG
function checkmark(i) {
  document.getElementById('checkbox'+i).src='assets/img/subtask_ok.svg';
}



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
  document.getElementById('contactButton0').innerHTML='';
  document.getElementById('contactButton1').innerHTML='';
  document.getElementById('datepicker').value='';
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
    document.getElementById('prioButton'+i).style.backgroundColor = 'white';
    document.getElementById('prioButton'+i).style.color = 'black';
  };
}


function createTask() {
  addDate();
}