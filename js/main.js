"use strict";

let signUpOverlayBtn = document.getElementById("sign-up-btn-overlay");
let signInOverlayBtn = document.getElementById("sign-in-btn-overlay");
let signUpBtn = document.querySelector(".sign-up-btn");
let signInBtn = document.querySelector(".sign-in-btn");
let signUpLayer = document.querySelector(".sign-up");
let signInLayer = document.querySelector(".sign-in");
let signUpOverlay = document.querySelector(".sign-up-overlay");
let signInOverlay = document.querySelector(".sign-in-overlay");

let signUpName = document.querySelector(".sign-up-name");
let signUpEmail = document.querySelector(".sign-up-email");
let signUpPass = document.querySelector(".sign-up-pass");

let signInEmail = document.querySelector(".sign-in-email");
let signInPass = document.querySelector(".sign-in-pass");

let error = document.querySelector(".error");
let error2=document.querySelector('.error2')

let overlayFull =document.querySelector('.overlay-col')
let formFull =document.querySelector('.form-col')

let row=document.querySelector('.row')
let logOutBtn=document.querySelector('.logout')

signUpOverlayBtn.addEventListener("click", () => {
  signUpLayer.classList.add("show-sign-up");
  signInLayer.classList.add("show-sign-up");

  signUpLayer.style.zIndex = 100;

  signInOverlay.classList.add("show-welcome-back");
  signUpOverlay.classList.add("show-welcome-back");

  signInOverlay.style.zIndex = 100;
});

signInOverlayBtn.addEventListener("click", () => {
  signUpLayer.classList.replace("show-sign-up", "show-sign-in");
  signInLayer.classList.replace("show-sign-up", "show-sign-in");

  signUpLayer.style.zIndex = 0;

  signInOverlay.classList.replace("show-welcome-back", "show-hello");
  signUpOverlay.classList.replace("show-welcome-back", "show-hello");

  signInOverlay.style.zIndex = 0;
});

let signUpArr = [];

if(localStorage.getItem('sessionUser')){
    let userName=JSON.parse(localStorage.getItem('sessionUser'))
    row.innerHTML+=`<div class="welcome-page position-absolute">
          <h1>Welcome ${userName}</h1>
          <button class="btn rounded-pill logout"onclick='logout()'>Logout</button>
        </div>`
}


if(localStorage.getItem('users')){
    signUpArr=JSON.parse(localStorage.getItem('users'))
}

function signUp() {
    if (isEmpty()==false) {
        error.innerHTML = `<p class='text-danger text-center'>
        All inputs is required
        </p>`;
        return;
      }
      if(emailValidation(signUpEmail.value)==false){
        error.innerHTML = `<p class='text-danger text-center'>
        email entered is not correct
        </p>`;
        return
      }
      if(passValidation(signUpPass.value)==false){
        error.innerHTML = `<p class='text-danger text-center'>
        password must contain 8 characters or more
        </p>`;
        return
      }
      if (isEmailExist() == false) {
        error.innerHTML = `<p class='text-danger text-center'>
            email already exists
            </p>`;
            return
      }
      
      else{

          let user = {
              name: signUpName.value,
              email: signUpEmail.value,
              password: signUpPass.value,
            };
            
            signUpArr.push(user);
            saveLocalStorage ()
            
            error.innerHTML = `<p class='text-success text-center'>
        Success
        </p>`;
        }
}

function emailValidation(email){
    let regex=/[^\s]*@[a-z0-9.-]*/i;
    let res=regex.test(email)
    return res;
 }

 function passValidation(pass) {
    let regex=/[^\s]{8,}/;
    let res=regex.test(pass)
    return res;
 }
 console.log(passValidation(12322456))
signUpBtn.addEventListener("click", (e) => {
  e.preventDefault();
  
    signUp();
    
  
});

function isEmailExist() {
  for (let i = 0; i < signUpArr.length; i++) {
    if (signUpArr[i].email == signUpEmail.value) {
      return false;
    }
  }
}

function isEmpty() {
  if (
    signUpName.value == "" ||
    signUpEmail.value == "" ||
    signUpPass.value == ""
  ) {
    return false;
  } else {
    return true;
  }
}

function saveLocalStorage (){
    localStorage.setItem('users', JSON.stringify(signUpArr))
}


 

console.log(signUpArr);
function isEmpty2() {
    if (
      signInEmail.value == "" ||
      signInPass.value == ""
    ) {
      return false;
    } else {
      return true;
    }
  }


function signIn(){

    if(isEmpty2()==false){
        error2.innerHTML = `<p class='text-danger text-center'>
        All inputs is required
        </p>`;
        return;
    }

    for (let i = 0; i < signUpArr.length; i++) {
        if(signInEmail.value == signUpArr[i].email && signInPass.value == signUpArr[i].password ){
            localStorage.setItem('sessionUser',JSON.stringify(signUpArr[i].name))
          row.innerHTML+=`<div class="welcome-page position-absolute unfoldin">
          <h1>Welcome ${signUpArr[i].name}</h1>
          <button class="btn rounded-pill logout" onclick='logout()'>Logout</button>
        </div>`
          break 
        }
    }
    error2.innerHTML = `<p class='text-danger text-center'>
inncorrect email or password
</p>`;
// let res =signUpArr.map((user)=>{
//     if(signInEmail.value != user.email ||  signInPass.value != user.password) {
//         return false
//     }
// })
// if(res==false){
    
// }

}

signInBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    signIn();
})


function logout (){
    localStorage.removeItem('sessionUser')
    location.reload();
}