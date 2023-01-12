/**function to go to login-window */
function logout(){
    document.getElementById("popup-logout").classList.add("d-none");
    window.location.href="login.html"
}

/**function that toogles the display of logout-opportunity*/
function showLogout(){
    let logout=document.getElementById("popup-logout");
    if(logout.classList.contains("d-none")){
    logout.classList.remove("d-none");}
    else{
        logout.classList.add("d-none");}
    }



