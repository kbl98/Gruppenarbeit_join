

function openCloseDetails() {
    let openDetails = document.getElementById('openContact');
    let bgr = document.getElementById('contactBgr');
    let color = document.getElementById('contactNameColor');
    openDetails.classList.remove('d-none');
    bgr.style = 'background-color: #2A3647;';
    color.style = 'color: white;';
}