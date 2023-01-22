let allContacts =[];
let selectedContactNames = [];
let firstLetters = [];
let selectedLetters = [];


async function loadContacts() {
  await downloadFromServer();
  allContacts = JSON.parse(backend.getItem("contacts")) || [];
  sortAllContacts();
  getFirstLetters();
  
}


function sortAllContacts() {
  allContacts = allContacts.sort((a,b) => {
    if (a.name < b.name) {
      return -1;
    }
  });
}


function getFirstLetters() {
  for (let i = 0; i < allContacts.length; i++) {
    let contact = allContacts[i]['name'];
    let color = allContacts[i]['color'];
    let splitNames = contact.split(' ');
    let bothLetters = splitNames[0].charAt(0)+splitNames[1].charAt(0);
    firstLetters.push({bothLetters, color});
  }
}


function renderAllContacts() {
  for (let i = 0; i < allContacts.length; i++) {
    const contact = allContacts[i]['name'];
    document.getElementById('openedContacts').innerHTML += `
    <div class="oneContact" onclick="addContact(${i})">
      <div id="contact${i}">${contact}</div>
      <div class="contactButton" id="contactButton${i}"></div>
    </div>
    `;
  }
}


/**
 * function to add/delete a existing contact to/from the array ""selectedContactNames"
 * 
 * @param {number} i - number to get the correct contact
 */
function addContact(i) {
  let contactID = document.getElementById('contact' + i);
  let index = selectedContactNames.indexOf(contactID.innerHTML);
  let index2 = selectedLetters['bothLetters'].indexOf(firstLetters[i]);
  if (index > -1) { //wenn Name bereits enthalten dann...
    resetSelect(index, index2,i);
  } else { //wenn Name noch nicht enthalten dann...
    select(contactID, i);
  };
  if (!(selectedContactNames == '')) {
    document.getElementById('contact').value = 'Contacts selected';
  } else {
    document.getElementById('contact').value = '';
  }
}


function resetSelect(index, index2, i) {
  document.getElementById('contactButton' + i).innerHTML = ''; //... entferne Punkt im Button
  selectedContactNames.splice(index, 1); //entferne Name
  selectedLetters['bothLetters'].splice(index2,1); //
  document.getElementById('addedContacts').innerHTML = '';
  for (let x = 0; x < selectedLetters['bothLetters'].length; x++) {
    const selectedLetter = selectedLetters['bothLetters'][x];
    document.getElementById('addedContacts').innerHTML += `<div class="firstLetters">${selectedLetter}</div>`;
  }
}


function select(contactID, i) {
  document.getElementById('contactButton' + i).innerHTML = `<img src="assets/img/button_rectangle.svg">`; //... füge Punkt im Button hinzu
  selectedContactNames.push(contactID.innerHTML); //füge Name hinzu
  selectedLetters['bothLetters'].push(firstLetters[i]);
  document.getElementById('addedContacts').innerHTML = '';
  for (let x = 0; x < selectedLetters['bothLetters'].length; x++) {
    const selectedLetter = selectedLetters['bothLetters'][x];
    document.getElementById('addedContacts').innerHTML += `<div class="firstLetters">${selectedLetter}</div>`;
  }
}


/**
 * function to open or close the contacts-field by clicking on it
 */
function openCloseContacts() {
  if (document.getElementById('selectFieldContact').style.height == '147px') {
    document.getElementById('selectFieldContact').style.height = '51px';
    document.getElementById('openedContacts').classList.add('d-none');
  } else {
    document.getElementById('selectFieldContact').style.height = '147px';
    setTimeout(function () {
      document.getElementById('openedContacts').classList.remove('d-none');
    }, 150)
  }
  disableInputContact()
}


function disableInputContact () {
  if (document.getElementById('contact').disabled = true) {
    document.getElementById('contact').disabled = false;
  } else {
    document.getElementById('contact').disabled = true;
  }
}

/**
 * function to prevent to open or close the category-field
 */
function notOpenCloseContacts(event) {
  event.stopPropagation();
}


/**
 * function to make the container editable that you can write in an e-mail adress of the contact you want to invite
 */
// function addNewContact() {
//   let contact = document.getElementById('contact');
//   openCloseContacts();
//   contact.placeholder = 'Contact E-Mail';
//   contact.disabled = false;
//   document.getElementById('contactImage').innerHTML = `<div onclick="notOpenCloseContacts(event)" class="paddingRight"><img src="assets/img/cross.svg" onclick="cancelNewContact()"><img src="assets/img/finish.svg" onclick="acceptNewContact()"></div>`;
//   document.getElementById('selectFieldContact').removeAttribute('onclick');
// }


/**
 * function to delete the e-mail adress and reset the contact-field
 */
// function cancelNewContact() {
//   let contact = document.getElementById('contact');
//   contact.placeholder = 'Select contacts to assign';
//   contact.disabled = true;
//   document.getElementById('contactImage').innerHTML = `<img class="paddingRight" src="assets/img/arrow_drop.svg">`;
//   document.getElementById('selectFieldContact').setAttribute('onclick', 'openCloseContacts()');
// }


/**
 * function to add the e-mail adress to the array "invitedContacts"
 */
// function acceptNewContact() {
//   let contact = document.getElementById('contact');
//   invitedContacts.push(contact.value);
//   contact.value = '';
//   contact.placeholder = 'Select contacts to assign';
//   contact.disabled = true;
//   document.getElementById('contactImage').innerHTML = `<img class="paddingRight" src="assets/img/arrow_drop.svg">`;
//   document.getElementById('selectFieldContact').setAttribute('onclick', 'openCloseContacts()');
// }