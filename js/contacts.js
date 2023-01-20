let loadedContacts = [];
let letters = [];


/**
 * all funktions for load all contacts from backend and render them from here
 */
async function initContacts() {
    setURL('https://gruppe-430.developerakademie.net/smallest_backend_ever-master');
    await loadContactsFromBackend();
    renderContacts();
    await getCurrentUserFromStorage();
    setUserImg();
}


async function loadContactsFromBackend() {
    await downloadFromServer();
    loadedContacts = JSON.parse(backend.getItem("contacts"));
    if (!loadedContacts) {
        loadedContacts = [];
    };

    console.log('Alle Kontakte', loadedContacts);
    console.log('Alle Anfangsbuchstaben', letters);
}


/**
 * save contact and load to backend
 */
async function saveContactsToBackend() {
    await downloadFromServer();
    let contactAsText = JSON.stringify(loadedContacts);
    await backend.setItem("contacts", contactAsText);
}


/**
 * all funktions for render contacts from here
 */
function renderContacts() {
    filterFirstLetters();
    renderLetterSection();
}


function renderLetterSection() {
    let contContacts = document.getElementById('contAllContacts');
    contContacts.innerHTML = '';
    for (let i = 0; i < letters.length; i++) {
        let smallLetter = letters[i];
        let bigLetter = smallLetter.charAt(0).toUpperCase();
        contContacts.innerHTML += renderLetterSectionLayOut(bigLetter, i);
        renderContactsInSection(smallLetter, i);
    }
}


function renderContactsInSection(currentLetter, x) {
    for (let i = 0; i < loadedContacts.length; i++) {
        let contactId = document.getElementById(`contContactSection${x}`);
        let outerId = x;
        let innerId = i;
        let contactName = loadedContacts[i]['name'];
        let contactMail = loadedContacts[i]['email'];
        let contactPhone = loadedContacts[i]['phone'];
        let randomColor = getRandomColor();
        let bothFirstLetters = splitName(contactName);
        let contactFirstLetter = contactName.charAt(0).toLowerCase();
        if (contactFirstLetter.includes(currentLetter)) {
            contactId.innerHTML += renderContactsInSectionTemp(randomColor, bothFirstLetters, contactName, contactMail, contactPhone, outerId, innerId);
        }
    }
}


function filterFirstLetters() {
    //push`s first letter from all contacts['name'] but only 1 time per letter
    for (let i = 0; i < loadedContacts.length; i++) {
        const contact = loadedContacts[i];
        let firstLetter = contact['name'].charAt(0).toLowerCase();
        if (!letters.includes(firstLetter)) {
            letters.push(firstLetter);
        }
    }

}


function getRandomColor() {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
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


/**
 * all funktions from open contact from here
 * + change background color to dark-blue 
 * + change font color to white
 * 
 * @param {number} i id from outer section
 * @param {number} j id from inner section
 */
function openCloseDetails(randomColor, contact, contactMail, contactPhone, bothFirstLetters, outerId, innerId) {
    checkIfOneOpen(outerId, innerId);
    renderDetails(contact, contactMail, randomColor, contactPhone, bothFirstLetters);
}


function renderDetails(contact, contactMail, randomColor, contactPhone, bothFirstLetters) {
    let openContact = document.getElementById('openContact');
    openContact.innerHTML = renderDetailsTemp(contact, contactMail, randomColor, contactPhone, bothFirstLetters);
}


function checkIfOneOpen(i, j) {
    resetAllBgrColors();
    let openDetails = document.getElementById('openContact');
    let contactBgr = document.getElementById(`contactBgr${i}${j}`);
    let contactNameColor = document.getElementById(`contactNameColor${i}${j}`);
    if (openDetails.classList.contains('d-none')) {
        openDetails.classList.remove('d-none');
        contactBgr.style = "background-color: #2A3647;";
        contactNameColor.style = "color: white;";
    } else {
        openDetails.classList.add('d-none');
    }
}

function closeDetail() {
    let details = document.getElementById('openContact');
    details.classList.add('d-none');
}


function resetAllBgrColors() {
    let bgr = document.getElementsByClassName('contact');
    for (let i = 0; i < bgr.length; i++) {
        if (bgr[i].style.backgroundColor) {
            bgr[i].removeAttribute("style");
        }
    }

    let font = document.getElementsByClassName('contact-name');
    for (let i = 0; i < font.length; i++) {
        if (font[i].style.color) {
            font[i].removeAttribute("style");
        }
    }
}

/**
 * all funktions from edit contact from here
 * 
 * @param {string} contactName contains Name
 * @param {string} contactMail contains Email
 * @param {string} randomColor contains Color
 * @param {string} contactPhone contains Phonenumber
 * @param {string} bothFirstLetters Contains example (AM) for "Anton Mayer"
 */
function openEditContact(contactName, contactMail, randomColor, contactPhone, bothFirstLetters) {
    let editContact = document.getElementById('contEditContact');
    editContact.classList.remove('d-none');
    editContact.innerHTML = openEditContactTemp(contactName, contactMail, randomColor, contactPhone, bothFirstLetters);
}


async function editContactSave(contactName, contactMail, contactPhone) {
    let newName = document.getElementById('editContactNameValue').value;
    let newMail = document.getElementById('editContactMailValue').value;
    let newPhone = document.getElementById('editContactPhoneValue').value;
    let index = findCurrentContact(contactName, contactMail, contactPhone);
    loadedContacts[index].name = newName;
    loadedContacts[index].email = newMail;
    loadedContacts[index].phone = newPhone;
    await saveContactsToBackend();
    closeEditContact();
    closeDetail();
    initContacts();
}


function findCurrentContact(contactName, contactMail, contactPhone) {
    let index = -1;
    for (let i = 0; i < loadedContacts.length; i++) {
        if (loadedContacts[i].name === contactName && loadedContacts[i].email === contactMail && loadedContacts[i].phone === contactPhone) {
            index = i;
            break;
        }
    }
    return index;
}


function closeEditContact() {
    let editContact = document.getElementById('contEditContact');
    editContact.classList.add('d-none');
}


/**
 * all funktions from create new contact from here
 */
function openNewContact() {
    let newContact = document.getElementById('contCreateNewContact');
    newContact.classList.remove('d-none');
    newContact.innerHTML = openNewContactTemp();
}


async function createNewContact() {
    let newName = document.getElementById('newContactNameValue').value;
    let newMail = document.getElementById('newContactMailValue').value;
    let newPhone = document.getElementById('newContactPhoneValue').value;
    let newObjekt = { name: newName, email: newMail, phone: newPhone };
    loadedContacts.push(newObjekt);
    await saveContactsToBackend();
    closeNewContact();
    closeDetail();
    initContacts();
    showDivWithTransition();
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


function closeNewContact() {
    let newContact = document.getElementById('contCreateNewContact');
    newContact.classList.add('d-none');
}


/**
 * all innerHTML returns from here
 */
function openNewContactTemp() {
    return `
    <div class="cont-new-contact-pup">
        <!--close popup-->
        <img onclick="closeNewContact()" class="popup-close" src="./assets/img/board_popup_close.png" alt="">

        <!-- left side from popup create new contact -->
        <div class="cont-left-contact-pup">
            <img src="./assets/img/contacts_logo.png" alt="">
            <h2>Add Contact</h2>
            <span>Tasks are better with a team!</span>
            <div></div>
        </div>

        <!-- right side from popup create new contact -->
        <div class="cont-right-contact-pup">
            <div class="cont-create-contact-infos">
                <img class="create-contact-pp" src="./assets/img/contact_empty_pp.png" alt="">

                <form onsubmit="createNewContact();return false" class="cont-create-contact-input">
                    <input id="newContactNameValue" required placeholder="Name" type="text" />
                    <input id="newContactMailValue" required placeholder="Email" type="email" />
                    <input id="newContactPhoneValue" required placeholder="Phone" type="tel" />
                    <div class="cont-create-contact-buttons">
                        <button type="reset" onclick="closeNewContact()" class="create-new-contact-deny">
                            Cancel <img src="./assets/img/contact_add_task.png" alt="">
                        </button>
                        <button type="submit" class="create-new-contact-check">
                            Create contact <img src="./assets/img/contact_check.png" alt="">
                        </button>
                    </div>
                </form>

            </div>
        </div>
    </div>
    `;
}


function openEditContactTemp(contactName, contactMail, randomColor, contactPhone, bothFirstLetters) {
    return `
    <div class="cont-new-contact-pup">
        <!--close popup-->
        <img onclick="closeEditContact()" class="popup-close" src="./assets/img/board_popup_close.png" alt="">

        <!-- left side from popup edit contact -->
        <div class="cont-left-contact-pup">
            <img src="./assets/img/contacts_logo.png" alt="">
            <h2>Edit Contact</h2>
            <span>Tasks are better with a team!</span>
            <div></div>
        </div>

        <!-- right side from popup edit contact -->
        <div class="cont-right-contact-pup">
            <div class="cont-create-contact-infos">
                <div style="background-color: ${randomColor};" class="edit-contact-img">${bothFirstLetters}</div>
                <form onsubmit="editContactSave('${contactName}', '${contactMail}', '${contactPhone}');return false" class="cont-create-contact-input">
                    <input id="editContactNameValue" required value="${contactName}" placeholder="Name" type="text">
                    <input id="editContactMailValue" required value="${contactMail}" placeholder="Email" type="email">
                    <input id="editContactPhoneValue" required value="${contactPhone}" placeholder="Phone" type="tel">
                    <div class="cont-create-contact-buttons">
                        <button type="submit" class="create-new-contact-check"> Save </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    `;
}


function renderDetailsTemp(contactName, contactMail, randomColor, contactPhone, bothFirstLetters) {
    return `
    <div class="open-contact-head">
        <div style="background-color: ${randomColor};" class="open-contact-img">${bothFirstLetters}</div>
        <div class="open-contact-head-name">
            <h2>${contactName}</h2>
            <span><img src="./assets/img/contact_add_task.png" alt="">Add Task</span>
        </div>
    </div>
    <div class="open-contact-edit">
        <span class="contact-information-text">Contact Information</span>
        <span onclick="openEditContact('${contactName}', '${contactMail}', '${randomColor}', '${contactPhone}', '${bothFirstLetters}')" class="contact-edit-info"><img src="./assets/img/edit_contact.png"
                alt=""> Edit Contact</span>
    </div>
    <div class="open-contact-infos">
        <span class="contact-information">Email</span>
        <a class="contact-mail" href="mailto:${contactMail}">${contactMail}</a>
        <span class="contact-information">Phone</span>
        <a class="contact-tel" href="tel:${contactPhone}">${contactPhone}</a>
    </div>
    `;
}


function renderLetterSectionLayOut(bigLetter, i) {
    return `
    <div class="cont-contact">
        <div class="cont-first-letter">
            <h2 class="first-letter-contact">${bigLetter}</h2>
        </div>
        <div class="parting-line"></div>

        <div class="contact-out" id="contContactSection${i}">

        </div>
    </div>
    `;
}


function renderContactsInSectionTemp(randomColor, bothFirstLetters, contact, contactMail, contactPhone, outerId, innerId) {
    return `
    <div onclick="openCloseDetails('${randomColor}', '${contact}', '${contactMail}', '${contactPhone}', '${bothFirstLetters}', '${outerId}', '${innerId}')" class="contact" id="contactBgr${outerId}${innerId}">
    <div style="background-color: ${randomColor};" class="contact-img">${bothFirstLetters}</div>
    <div class="contact-infos">
        <span id="contactNameColor${outerId}${innerId}" class="contact-name">${contact}</span>
        <a class="contact-mail" href="mailto:${contactMail}">${contactMail}</a>
    </div>
    </div>
    `;
}