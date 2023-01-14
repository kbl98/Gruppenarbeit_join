/**function to go to login-window */
function logout(){
    document.getElementById("popup-logout").classList.add("d-none");
    resetUser();
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

function resetUser(){
     all_tasks=[];
 current_img="./assets/img/user_prototype.png";
 users=[];
 current_task=[];
 current_user=[];
 current_user=[];
 localStorage.removeItem("current_user");
}



