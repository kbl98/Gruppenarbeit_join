let user=[];
let current_user=[];
let tasks=[];

/**function for moving the start-logo from center to left corner */
function moveLogo(){
    let logo=document.getElementById("start-pic");
    logo.classList.remove("logo-big");
    logo.classList.add("logo-small");
    setTimeout(showLogin,3000);
}

/**function for showing the login-box and sign-in */
function showLogin(){
    /*setURL('http://dr-katja-becker-lindhorst.developerakademie.net/smallest_backend_ever-master');*/
    document.getElementById("login-container").classList.remove("d-none");
    document.getElementById("newuser-container").classList.remove("d-none")
}

/**function to wait some time before moving logo and getting login-box */
function getLogin(){
    setTimeout(moveLogo,500);
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
    let logname=document.getElementById("mail-login");
    let logpassword=document.getElementById("password-login");
    await getUsers();
    current_user=users.find(u=>u.password==logpassword.value && u.email==logname.value);
    if (!current_user){
        window.location.href='registration.html'
    }else{
    setMainHTML()}
}

function guestLogin(){
    current_user={
        "img":"assets/img/guest_pic.svg",
        "name":"guest",
        "email":"guest@guest.de",
    };
    getDemoSummary();
}

function getDemoSummary(){
    window.location.href = 'summary.html';
    
}



async function sign(){
   /*await getUsers();
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
   saveUser(newUser);
    username="";
    email="";
    password="";
}


async function setBackend(){
    
    setURL('http://dr-katja-becker-lindhorst.developerakademie.net/smallest_backend_ever-master');
    await getUsers();
}

async function getUsers(){
    setURL('http://dr-katja-becker-lindhorst.developerakademie.net/smallest_backend_ever-master');
    let usersAsText= await backend.getItem("users");
    console.log(usersAsText);
    users=JSON.parse(usersAsText);
    /*if (!users){
        users=[];
    }*/
    console.log(users);
}

function saveUser(newUser){
    setURL('http://dr-katja-becker-lindhorst.developerakademie.net/smallest_backend_ever-master');
    users.push(newUser);
    
    let usersAsText=JSON.stringify(users);
    backend.setItem("users",usersAsText);
    console.log(users);

    getUsers();
}