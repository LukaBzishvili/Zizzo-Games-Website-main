
const users = getArrayFromFirebase("user");
const admins = getArrayFromFirebase("admin");
const currentUserData = sessionStorage.getItem('current_user_data');
const currentAdminData = sessionStorage.getItem('current_admin_data');
const token = sessionStorage.getItem('token');
const pfCard = document.querySelector(".body");
const user = getElementFromFirebase("user", token);
const admin = getElementFromFirebase("admin", token);
const path = location.href.split("/").pop().split(".")[0];

const imageInput = document.querySelector('#imageInput');
const profilePicture = document.querySelector('#pfp');
const emailInput = document.querySelector('.email');
const ageInputt = document.querySelector('.age');
const experienceInput = document.querySelector('.experience');
const nameInput = document.querySelector(".name");
const imageShow = document.querySelector(".pfp");
const saveButton = document.querySelector('.save-btn');
const DEFAULT_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png";
let img = document.querySelector("img");
const loader = document.querySelector(".loader");


if(token === null){
  window.location.href = 'index.html';
}

ageInputt.addEventListener('input', function() {
  if (ageInputt.value < 0) {
    ageInputt.value = '';
  }
});

imageInput.addEventListener('change', () => {
  const fileReader = new FileReader();
  if (imageInput.files[0]) {
    fileReader.readAsDataURL(imageInput.files[0]);
    fileReader.onload = () => {
      img.src = fileReader.result;
    };
  } else {
    img.src = DEFAULT_IMAGE;
  }
});

if(currentUserData && token){
  user.then(value => {
    name = value.data.name;
    email = value.data.email;
    age = value.data.age;
    img.src = value.data.image;
    password = value.data.password;
    emailInput.value = email;
    ageInputt.value = age;
    nameInput.value = name;
    experienceInput.value = value.data.experience;
    // imageShow.src = img;
    document.body.removeChild(loader);
  }).catch(err => {
    console.log(err);
  });
  
  
  
  saveButton.addEventListener('click', () => {
    const updatedData = {
      name: name,
      email: emailInput.value,
      age: ageInputt.value,
      experience: experienceInput.value,
      image: img.src,
      password: password // Preserve the existing password
    };
    // const { password, ...originalData } = value.data;
  
    const originalData = {
      name: name,
      email: email,
      age: age,
      password: password
      // experience: experience
    };
  
  
  
    if (JSON.stringify(updatedData) === JSON.stringify(originalData)) {
      showAlert("No changes made. Data is already up to date.");
    } else {
      updateElementFirebase("user", token, updatedData);
      showAlert("Data successfully updated.");
    }
  });
}




else if(currentAdminData && token){
  admin.then(value => {
    name = value.data.name;
    email = value.data.email;
    age = value.data.age;
    img.src = value.data.image;
    password = value.data.password;
    emailInput.value = email;
    ageInputt.value = age;
    nameInput.value = name;
    experienceInput.value = value.data.experience;
    document.body.removeChild(loader);
  }).catch(err => {
    console.log(err);
  });
  
  
  
  saveButton.addEventListener('click', () => {
    const updatedData = {
      name: name,
      email: emailInput.value,
      age: ageInputt.value,
      experience: experienceInput.value,
      image: img.src,
      password: password // Preserve the existing password
    };
    // const { password, ...originalData } = value.data;
  
    const originalData = {
      name: name,
      email: email,
      age: age,
      password: password
      // experience: experience
    };
  
  
  
    if (JSON.stringify(updatedData) === JSON.stringify(originalData)) {
      showAlert("No changes made. Data is already up to date.");
    } else {
      updateElementFirebase("admin", token, updatedData);
      showAlert("Data successfully updated.");
    }
  });
}