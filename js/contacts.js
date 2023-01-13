

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
        bgr.style = '';
        color.style = '';
    }
}