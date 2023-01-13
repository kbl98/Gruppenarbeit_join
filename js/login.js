


/**function for moving the start-logo from center to left corner */
function moveLogo(){
    let logo=document.getElementById("start-pic");
    logo.classList.remove("logo-big");
    logo.classList.add("logo-small");
    setTimeout(showLogin,3000);
}

/**function for showing the login-box and sign-in */
function showLogin(){
    /*setURL('"https://gruppe-430.developerakademie.net/smallest_backend_ever-master"');*/
    document.getElementById("login-container").classList.remove("d-none");
    document.getElementById("newuser-container").classList.remove("d-none")
}

/**function to get all registrated Users from storage */
async function getUsers(){
    setURL("https://gruppe-430.developerakademie.net/smallest_backend_ever-master");
    await downloadFromServer();
    users = JSON.parse(backend.getItem("users"));
    if(!users){
        users=[];
    };
    
    console.log(users);
}

/**function to wait some time before moving logo and getting login-box */
async function getLogin(){
    setTimeout(moveLogo,500);
    setURL("https://gruppe-430.developerakademie.net/smallest_backend_ever-master");
    await downloadFromServer();
    users=JSON.parse(backend.getItem("users")) || [];
    /*users=JSON.parse(backend.getItem("users")) || [];*/
    console.log(users);
    }





/**function to show/hide the password by changing type of input */
function togglePassword(id,id2){
let input_password=document.getElementById(id);
let type=input_password.getAttribute("type");
let text=document.getElementById(id2);
if (type=="password"){
    input_password.setAttribute("type","text");
    text.innerHTML=`Passwort verbergen`;

}else{
    input_password.setAttribute("type","password");
    text.innerHTML=`Passwort zeigen`;
}
}

/**function to find the logged User */
async function getCurrentUser(){
    /*setURL('https://gruppe-430.developerakademie.net/smallest_backend_ever-master');*/
    let logname=document.getElementById("mail-login");
    let logpassword=document.getElementById("password-login");
    /*await getUsers();*/
    current_user=users.find(u=>u.password==logpassword.value && u.email==logname.value);
    if (!current_user){
        window.location.href='registration.html'
    }else{
    window.location.href="summary.html";
    setUserImg()}
}

function setUserImg(){
    document.getElementById("user-img").setAttribute("src",current_img);
}

/**function to login a guestUser */
function guestLogin(){
    current_user={
        "img":"assets/img/guest_pic.svg",
        "name":"guest",
        "email":"guest@guest.de",
    };
    getDemoSummary();
}

/**function to get the summary as guest */
function getDemoSummary(){
    window.location.href = 'summary.html';
    
}


/**function to registrate as new User */
async function sign(){
    /*setURL('https://gruppe-430.developerakademie.net/smallest_backend_ever-master');
   await getUsers();
   console.log(users);*/
   let username=document.getElementById("name-registration").value;
   console.log(username);
   let email=document.getElementById("mail-registration").value;
   console.log(email);
   let password=document.getElementById("password-registration").value;
   console.log(password);
   let newUser={
    "username":username,
    "email":email,
    "password":password
   };
   console.log(newUser);
   
    await saveUser(newUser);
    username="";
    email="";
    password="";
    window.location.href="login.html"
}

/*function checknewUser(newUser){
    for(let i=0;i<users.length;i++){
        console.log(newUser["email"])
        if(newUser["email"]==users[i]["email"]){
            openPopup()
            
        }
    }
}*/

/**funtion to set Location of Storage */
async function setBackend(){
    setURL('https://gruppe-430.developerakademie.net/smallest_backend_ever-master');
    /*await getUsers();*/
}


async function saveUsers(){
    let usersAsText=JSON.stringify(users);
    console.log(usersAsText);
    await downloadFromServer();
    await backend.setItem("users",usersAsText);
  }
  


/**function to save Users at Storage */
async function saveUser(newUser){
    
    console.log(users);
    console.log(newUser);

   users.push(newUser);
   console.log(users);
   
    let usersAsText=JSON.stringify(users);
    console.log(usersAsText);
    await downloadFromServer();
    await backend.setItem("users",usersAsText);
  
}

/**function for opening popup-mail */

function openPopupMail(){
    let currentmail=document.getElementById("mail-registration").value;
    current_user=users.find(u=>u.email==currentmail);
    if(!current_user){
        window.location.href="registration.html"
    }else{
    let popup=document.getElementById("popup-mail");
    popup.classList.remove("d-none");
    setTimeout(changeClass,100);
}
}


/**function to change classname of popup */
function changeClass(){
    let popup_p=document.getElementById("popup-mail-p");
    popup_p.classList.remove("bottom");
    popup_p.classList.add("center");
    setTimeout(newPassword,3000);
}

/** function to get to site for resetting password*/
function newPassword(){
    let password_content=document.getElementById("login-container");
    password_content.innerHTML='';
    password_content.innerHTML=generateResetPassword();

    /*window.location.href="reset_password.html";*/
    document.getElementById("popup-mail").classList.add("d-none");
}

function generateResetPassword(){
    return `
    <h1>Reset your password</h1>
    <div id="blue-line"></div>
    <p>Change your account password</p>

    <form onsubmit="set_new_password();return false">
      <input
        id="reseted-password"
        class="password-input"
        required
        type="password"
        placeholder="Passwort"
      />
      <input
        id="reseted-password2"
        class="password-input"
        required
        type="password"
        placeholder="Passwort"
      />
      <div class="help-container">
        <p
          id="passwordreg-toggle"
          onclick="togglePassword('reseted-password','passwordreg-toggle');togglePassword('reseted-password2','passwordreg-toggle')"
        >
          Passwort zeigen
        </p>
      </div>
      <div id="btn-box">
        <button id="sign-btn" class="login-btn">Continue</button>
      </div>
    </form>`
}

/**function for setting the new password */
async function set_new_password(){
    let password1=document.getElementById("reseted-password").value;
    let password2=document.getElementById("reseted-password2").value;

    if(password1==password2){
    current_user["password"]=password1;
    for(let i=0;i<users.length;i++){
        if(users[i]["username"]==current_user["username"]){
            users[i]["password"]=current_user["password"];
        }
    }
    await saveUsers();
    window.location.href="login.html";
}
}

/*function openPopup(){
    let popup=document.getElementById("popup-user");
    popup.classList.remove("d-none");
    setTimeout(changeClass2,100);
}

function changeClass2(){
    let popup_p=document.getElementById("popup-user-p");
    popup_p.classList.remove("bottom");
    popup_p.classList.add("center");
    setTimeout(userKnowen,3000);
}

function userKnowen(){
    window.location.href="login.html";
    document.getElementById("popup-user").classList.add("d-none");
}*/




