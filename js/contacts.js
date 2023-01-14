let currentContacts = [];

async function initContacts() {
    setURL('https://gruppe-430.developerakademie.net/smallest_backend_ever-master');
    loadContactsFromBackend();
}


async function loadContactsFromBackend() {
    await downloadFromServer();
    currentContacts = JSON.parse(backend.getItem("contacts"));
    if(!currentContacts){
        currentContacts=[];
    };

    console.log(currentContacts);
}


async function saveContactsToBackend() {
    let contactAsText=JSON.stringify(contacts);
    console.log(contactAsText);
    await downloadFromServer();
    await backend.setItem("contacts",contactAsText);
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