let currentContacts = [];
let letters = [];


async function initContacts() {
    setURL('https://gruppe-430.developerakademie.net/smallest_backend_ever-master');
    await loadContactsFromBackend();
    renderContacts();
}


async function loadContactsFromBackend() {
    await downloadFromServer();
    currentContacts = JSON.parse(backend.getItem("contacts"));
    if (!currentContacts) {
        currentContacts = [];
    };

    console.log('Alle Kontakte', currentContacts);
    console.log('Alle Anfangsbuchstaben', letters);
}


async function saveContactsToBackend() {
    let contactAsText = JSON.stringify(contacts);
    await downloadFromServer();
    await backend.setItem("contacts", contactAsText);
}


function renderContacts() {
    filterFirstLetters();
    renderLetterSection();
    renderContactsInSection();
}


function renderLetterSection() {
    let contContacts = document.getElementById('contAllContacts');
    for (let i = 0; i < letters.length; i++) {
        let smallLetter = letters[i];
        let bigLetter = smallLetter.charAt(0).toUpperCase();
        contContacts.innerHTML += renderLetterSectionLayOut(bigLetter, i);
    }
}


function renderContactsInSection() {
    for (let i = 0; i < letters.length; i++) {
        let contact = document.getElementById(`contContactSection${i}`);
        let currentLetter = letters.at(i);
        for (let j = 0; j < currentContacts.length; j++) {
            let randomColor = getRandomColor();
            const currentContact = currentContacts[j]['name'];
            const currentContactMail = currentContacts[j]['email'];
            let bothFirstLetters = splitName(currentContact);
            let contactFirstLetterSmall = currentContact.charAt(0).toLowerCase();
            if (contactFirstLetterSmall.includes(currentLetter)) {
                contact.innerHTML += renderContactsInSectionLayOut(randomColor, bothFirstLetters, currentContact, currentContactMail);
            }
        }
    }
}


function filterFirstLetters() {
    //push`s first letter from all contacts['name'] but only 1 time per letter
    for (let i = 0; i < currentContacts.length; i++) {
        const contact = currentContacts[i];
        let firstLetter = contact['name'].charAt(0).toLowerCase();
        if (!letters.includes(firstLetter)) {
            letters.push(firstLetter);
        }
    }

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


function getRandomColor() {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}



function openCloseDetails() {
    let openDetails = document.getElementById('openContact');
    let bgr = document.getElementById('contactBgr');
    let color = document.getElementById('contactNameColor');
    if (openDetails.classList.contains('d-none')) {
        openDetails.classList.remove('d-none');
        bgr.style = 'background-color: #2A3647;';
        color.style = 'color: white;';
    } else {
        openDetails.classList.add('d-none');
        bgr.style = 'background-color: none;';
        color.style = 'color: unset;';
    }
}


function openNewContact() {
    let newContact = document.getElementById('contCreateNewContact');
    newContact.classList.remove('d-none');
}


function closeNewContact() {
    let newContact = document.getElementById('contCreateNewContact');
    newContact.classList.add('d-none');
}


function openEditContact() {
    let editContact = document.getElementById('contEditContact');
    editContact.classList.remove('d-none');
}


function closeEditContact() {
    let editContact = document.getElementById('contEditContact');
    editContact.classList.add('d-none');
}


function renderLetterSectionLayOut(bigLetter, i) {
    return `
    <div class="cont-contact">
        <div class="cont-first-letter">
            <h2 class="first-letter-contact">${bigLetter}</h2>
        </div>
        <div class="parting-line"></div>

        <div id="contContactSection${i}" class="contact">

        </div>
    </div>
    `;
}


function renderContactsInSectionLayOut(randomColor, bothFirstLetters, currentContact, currentContactMail) {
    return `
    <div style="background-color: ${randomColor};" class="contact-img">${bothFirstLetters}</div>
    <div class="contact-infos">
        <span class="contact-name">${currentContact}</span>
        <a class="contact-mail" href="mailto:${currentContactMail}">${currentContactMail}</a>
    </div>
    `;
}