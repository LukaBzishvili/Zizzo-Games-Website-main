const currentUserData = sessionStorage.getItem('current_user_data');
const currentAdminData = sessionStorage.getItem('current_admin_data');
const token = sessionStorage.getItem('token');
const cards = getArrayFromFirebase('posts');
const signOut = document.getElementById("secretContent");
const singInMenu = document.getElementById("menu-signIn");
const regSection = document.getElementById("reg");
const pfpsettings = document.getElementById("menu-profile");
const indexMenu = document.getElementById("menu-admin");
const path = location.href.split("/").pop().split(".")[0];

if(path === "index"){
  if (currentUserData && token || currentAdminData && token) {
    signOut.style.display = "block";
    singInMenu.style.display = "none";
    regSection.style.display = "none";
    pfpsettings.style.display = "block";
  }
  else {
    sessionStorage.removeItem('current_user_data');
    sessionStorage.removeItem('token');
    signOut.style.display = "none";
    pfpsettings.style.display = "none"; 
  }
}
else{
  if (currentUserData && token || currentAdminData && token) {
    signOut.style.display = "block";
    singInMenu.style.display = "none";
    // regSection.style.display = "none";
    pfpsettings.style.display = "block";
  }
  else {
    sessionStorage.removeItem('current_admin_data');
    sessionStorage.removeItem('token');
    signOut.style.display = "none";
    pfpsettings.style.display = "none";
  }
}

  
function logOut() {
  sessionStorage.removeItem('current_admin_data');
  sessionStorage.removeItem('current_user_data');
  sessionStorage.removeItem('token');
  location.reload();
}

signOut.addEventListener('click', () =>{
  logOut();
});

if(path === "index" && currentAdminData && token){
  indexMenu.style.display ="block";
  indexMenu.innerHTML += `<a href="admin.html" class="menu-link">Appliances</a>`
}



