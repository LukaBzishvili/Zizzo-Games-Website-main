
//age
const ageInput = document.getElementById('age');

//userNames
const nameInputSignUp = document.querySelector("#nameInput-SU");
const nameInputLogIn = document.querySelector("#nameInput-LI");


//emails
const emailInputSignUp = document.querySelector("#emailInput-SU");
const nameOrEmail = document.getElementById("nameOrEmailInput-LI");

//passwords
const passwordInputLogIn = document.querySelector("#passwordInput-LI");
const passwordInputSignUp = document.querySelector("#passwordInput-SU");


//buttons
const CreateAccountBtn = document.querySelector("#reg-btn");
const logInBtn = document.querySelector("#log-btn");


ageInput.addEventListener('input', function() {
  if (ageInput.value < 0) {
    ageInput.value = '';
  }
});

//Animation
function toggleSignup(){
    document.getElementById("login-toggle").style.backgroundColor="#fff";
     document.getElementById("login-toggle").style.color="#222";
     document.getElementById("signup-toggle").style.backgroundColor="#b61cdd";
     document.getElementById("signup-toggle").style.color="#fff";
     document.getElementById("login-form").style.display="none";
     document.getElementById("signup-form").style.display="block";
 }
 
 function toggleLogin(){
     document.getElementById("login-toggle").style.backgroundColor="#b61cdd";
     document.getElementById("login-toggle").style.color="#fff";
     document.getElementById("signup-toggle").style.backgroundColor="#fff";
     document.getElementById("signup-toggle").style.color="#222";
     document.getElementById("signup-form").style.display="none";
     document.getElementById("login-form").style.display="block";
 }


// log in და sign in ფორმატების ტექსტისგან გაწმენდა სხვა ფანჯერაზე გადასვლის შემთხვევაში
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

document.getElementById("login-toggle").addEventListener("click", () => {
  clearForm(signupForm);
});

document.getElementById("signup-toggle").addEventListener("click", () => {
  clearForm(loginForm);
});

function clearForm(form) {
  const inputs = form.querySelectorAll("input");
  inputs.forEach(input => {
    if(input.id !== "reg-btn" && input.id !== "log-btn"){
      input.value = "";
    }
  });
}



///////////////////////////////////////////////////////////////////////////////////


const loginFormDiv = document.querySelector('#login-form');
const nameOrEmailInputLI = document.querySelector('#nameOrEmailInput-LI');
const passwordInputLI = document.querySelector('#passwordInput-LI');


const signupFormDiv = document.querySelector('#signup-form');
const emailInputSU = document.querySelector('#email-SU');
const nameInputSU = document.querySelector('#nameInput-SU');
const passwordInputSU = document.querySelector('#passwordInput-SU');

const logBtn = document.querySelector('#log-btn');
const regBtn = document.querySelector('#reg-btn');

const users = getArrayFromFirebase("user");
const admins = getArrayFromFirebase("admin");



regBtn.addEventListener('click', () =>{
  console.log(emailInputSU.value);
  console.log(nameInputSU.value);
  console.log(passwordInputSU.value);
  let SUEmail = emailInputSU.value;
  let SUUsername = nameInputSU.value;
  let SUPassword = passwordInputSU.value;
  let age = ageInput.value;
  if(SUEmail && SUUsername && SUPassword){
    const currentUser = users.find(user => user.data.email === SUEmail);
    const currentAdmin = admins.find(admin => admin.data.email === SUEmail);
    if(currentUser || currentAdmin){
      showAlert("Email already used!");
    }
    else{
      regBtn.disabled = true;
      addElementInFirebase("user", {
        name: SUUsername,
        email: SUEmail,
        password: SUPassword,
        age: age,
        experience: 0,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"
      });
      showAlert('congratz', `user ${SUEmail} registered`, 'success');
      const updatedFirebase = getArrayFromFirebase("user");
      setTimeout(() => {
        let currentUserData;
        updatedFirebase.forEach(user => {
          if (user.data.email === SUEmail) {
            currentUserData = user;
            return;
          }
        });
        sessionStorage.setItem('token', currentUserData.id);
        sessionStorage.setItem('current_user_data', JSON.stringify({
          name: currentUserData.data.name,
          lastName: currentUserData.data.lastName,
        }));
        location.href = "index.html";
      }, 2000);
    }
  } else {
    showAlert('Incorrect', 'Fill all data', 'error');
  }
});



logBtn.addEventListener('click', () =>{
  const currentUser = users.find(user => (user.data.email === nameOrEmailInputLI.value || user.data.name === nameOrEmailInputLI.value) && user.data.password === passwordInputLI.value);
  const currentAdmin = admins.find(admin => (admin.data.email === nameOrEmailInputLI.value || admin.data.name === nameOrEmailInputLI.value) && admin.data.password === passwordInputLI.value);

  if (currentUser) {
    showAlert('Correct', 'Authorized', 'success');
      logBtn.disabled = true;
      sessionStorage.setItem('token', currentUser.id);
      sessionStorage.setItem('current_user_data', JSON.stringify({
        name: currentUser.data.name,
      }));
      setTimeout(() => {
        location.href = "index.html";
      }, 800);
    }
    else if(currentAdmin){
      showAlert('Correct', 'Authorized', 'success');
      logBtn.disabled = true;
      sessionStorage.setItem('token', currentAdmin.id);
      sessionStorage.setItem('current_admin_data', JSON.stringify({
        name: currentAdmin.data.name,
      }));
      setTimeout(() => {
        location.href = "index.html";
      }, 100);
    } 
    else {
      showAlert('Incorrect', 'Wrong data', 'error');
    }
});
