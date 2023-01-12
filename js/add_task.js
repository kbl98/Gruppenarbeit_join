let newTitle = [];
let newDescription = [];
let newCategory = [];
let newContacts = [];

//Title
function addTitle() {
  let title = document.getElementById('titleInput');
  newTitle = [];
  newTitle.push(title.value);
}

//Description
function addDescription() {
  let description = document.getElementById('descriptionTextarea');
  newDescription = [];
  newDescription.push(description.value);
}


//Category
function addCategory(i) {
  let categoryName = document.getElementById('category');
  let categoryColor = document.getElementById('categoryColor');
  document.getElementById('category').innerHTML= document.getElementById('category'+i).innerHTML;
  document.getElementById('categoryColor').innerHTML= document.getElementById('imageCat'+i).innerHTML;
  document.getElementById('categoryImage').innerHTML = `<img src="assets/img/arrow_drop.svg">`;
  openCloseCategories();
  newCategory = [];
  newCategory.push({
    "name": categoryName.innerHTML,
    "color": categoryColor.innerHTML
  });
}


function addNewCategory() {
  let category = document.getElementById('category');
  category.contentEditable="true";
  openCloseCategories();
  category.innerHTML='';
  document.getElementById('categoryImage').innerHTML = `<div  onclick="notOpenCloseCategories(event)"><img src="assets/img/cross.svg" onclick="cancelNewCategory()"> <img src="assets/img/finish.svg" onclick="acceptNewCategory()"></div>`;
  document.getElementById('categoryColors').classList.remove('d-none');
  document.getElementById('selectField').removeAttribute('onclick');
  document.getElementById('categoryColor').innerHTML = '';
  category.focus();
}


function changeColor(i) {
  document.getElementById('categoryColor').innerHTML = document.getElementById('changeColor'+i).innerHTML;
  document.getElementById('category').focus();
}


function cancelNewCategory () {
  let category = document.getElementById('category');
  category.innerHTML='Select task category';
  category.contentEditable="false";
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
    newCategory = [];
    newCategory.push({
      "name": categoryName.innerHTML,
      "color": categoryColor.innerHTML
    });
  }
}


function openCloseCategories() {
  if (document.getElementById('selectField').style.height == '192px') {
    document.getElementById('selectField').style.height = '49px';
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
  let contactName = document.getElementById('contact'+i);
  document.getElementById('contactButton'+i).innerHTML=`<img src="assets/img/button_rectangle.svg">`;
  newContacts.push({
    "name": contactName.innerHTML,
  });
}




function addNewCategory() {
  let category = document.getElementById('category');
  category.contentEditable="true";
  openCloseCategories();
  category.innerHTML='';
  document.getElementById('categoryImage').innerHTML = `<div  onclick="notOpenCloseCategories(event)"><img src="assets/img/cross.svg" onclick="cancelNewCategory()"> <img src="assets/img/finish.svg" onclick="acceptNewCategory()"></div>`;
  document.getElementById('categoryColors').classList.remove('d-none');
  document.getElementById('selectField').removeAttribute('onclick');
  document.getElementById('categoryColor').innerHTML = '';
  category.focus();
}


function changeColor(i) {
  document.getElementById('categoryColor').innerHTML = document.getElementById('changeColor'+i).innerHTML;
  document.getElementById('category').focus();
}


function cancelNewCategory () {
  let category = document.getElementById('category');
  category.innerHTML='Select task category';
  category.contentEditable="false";
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
    newCategory = [];
    newCategory.push({
      "name": categoryName.innerHTML,
      "color": categoryColor.innerHTML
    });
  }
}


//fertig
function openCloseContacts() {
  if (document.getElementById('selectFieldContact').style.height == '192px') {
    document.getElementById('selectFieldContact').style.height = '49px';
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


