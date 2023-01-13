

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