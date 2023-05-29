const firebaseConfig = {
  apiKey: "AIzaSyCttI7l2dFDpptPrYlLxc43b4xmkY2Ml3E",
  authDomain: "gameshop-93b8e.firebaseapp.com",
  projectId: "gameshop-93b8e",
  databaseURL: "https://gameshop-93b8e-default-rtdb.firebaseio.com",
  storageBucket: "gameshop-93b8e.appspot.com",
  messagingSenderId: "723179806970",
  appId: "1:723179806970:web:ccc00327af2224b421e943",
  measurementId: "G-S5C5XQ4G7Q"
};

firebase.initializeApp(firebaseConfig);

function randomID() { // UUID-4
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0;
    let v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function generateFirebaseItem(ID, value) {
  return {
    id: ID,
    data: value
  }
}

function addElementInFirebase(REF, data) {
  firebase.database().ref(`${REF}/${randomID()}`).set(data);
}

function getArrayFromFirebase(REF) {
  const array = [];
  firebase.database().ref(REF).on("value", response => {
    response.forEach(element => {
      array.push(generateFirebaseItem(element.key, element.val()));
    });
  });
  return array;
}

function getElementFromFirebase(REF, id) {
  const array = getArrayFromFirebase(REF);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      array.forEach(element => {
        if (element.id === id) {
          resolve(element);
        }
      });
      reject('404');
    }, 2000);
  });
}

function updateElementFirebase(REF, id, data) {
  firebase.database().ref(`${REF}/${id}`).set(data);
}

function removeElementFromFirebase(REF, id) {
  firebase.database().ref(`${REF}/${id}`).remove();
}

function removeRefFromFirebase(REF) {
  firebase.database().ref(REF).remove();
}


///alert
// Function to show alert with animation
function showAlert(title, message, type) {
  const alertContainer = document.createElement("div");
  alertContainer.classList.add("alert-container");
  alertContainer.classList.add(type);

  const alertTitle = document.createElement("h3");
  alertTitle.textContent = title;

  const alertMessage = document.createElement("p");
  alertMessage.textContent = message;

  alertContainer.appendChild(alertTitle);
  alertContainer.appendChild(alertMessage);

  document.body.appendChild(alertContainer);

  // Animation to show alert
  alertContainer.animate(
    [
      { opacity: 0, transform: "translateY(-50%)" },
      { opacity: 1, transform: "translateY(0)" },
    ],
    {
      duration: 500,
      easing: "ease-in-out",
      fill: "forwards",
    }
  );

  if (type === "success") {
    // Animation to hide success alert after 2 seconds
    setTimeout(() => {
      alertContainer.animate(
        [
          { opacity: 1, transform: "translateY(0)" },
          { opacity: 0, transform: "translateY(-50%)" },
        ],
        {
          duration: 500,
          easing: "ease-in-out",
          fill: "forwards",
        }
      );
    }, 2000);

    // Remove success alert from DOM after animation
    setTimeout(() => {
      alertContainer.remove();
    }, 2500);
  } else {
    // Animation to hide error alert
    setTimeout(() => {
      alertContainer.animate(
        [
          { opacity: 1, transform: "translateY(0)" },
          { opacity: 0, transform: "translateY(-50%)" },
        ],
        {
          duration: 500,
          easing: "ease-in-out",
          fill: "forwards",
        }
      );
    }, 2000);

    // Remove error alert from DOM after animation
    setTimeout(() => {
      alertContainer.remove();
    }, 2500);
  }
}