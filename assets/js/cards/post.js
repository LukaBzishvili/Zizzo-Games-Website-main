// const titleInput = document.querySelector("#titleInput");
const descriptionInput = document.querySelector("#descriptionInput");
const imageInput = document.querySelector("#imageInput");
const submitBtn = document.querySelector("#submitBtn");
const displayCard = document.querySelector("#displayCard");
const select = document.querySelector(".select");
const DEFAULT_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png";
initDisplay(select.value, descriptionInput.value);
const img = document.querySelector("img");
const loader = document.querySelector(".loader");
document.body.removeChild(loader);

if(token === null){
  window.location.href = 'index.html#reg';
}

if (path === "update-post") {
  loadPreviousData();
}

descriptionInput.addEventListener('keyup', () => {
  document.getElementById('descriptionDisplay').textContent = descriptionInput.value;
});

imageInput.addEventListener('change', () => {
  const fileReader = new FileReader();
  if (imageInput.files[0]) {
    fileReader.readAsDataURL(imageInput.files[0]);
    fileReader.onload = () => {
      img.src = fileReader.result;
    }
  } else {
    img.src = DEFAULT_IMAGE;
  }
});

function initDisplay(title, description) {
  displayCard.innerHTML = `
    <div class="card" style="width: 18rem;">
      <img id="post-image" src="${DEFAULT_IMAGE}" class="card-img-top" alt="post image">
      <div class="card-body">
        <h5 id="titleDisplay" class="card-title">${title}</h5>
        <p id="descriptionDisplay" class="card-text">${description}</p>
      </div>
    </div>
  `;
}

submitBtn.addEventListener('click', () => {
  document.body.appendChild(loader);
  let title = select.value;
  let description = descriptionInput.value;
  let imgSrc = document.querySelector('img').src;

  if (title && description) {
    submitBtn.disabled = true;
    const card = {
      title,
      description,
      imgSrc,
      createdAt: new Date().toString(),
      uploaderID: sessionStorage.getItem('token'),
      approved: "Unknown"
    };
    if (path === 'update-post') {
      updateElementFirebase('posts', sessionStorage.getItem('last_updated_card'), card);
      showAlert('Congratz', 'Card updated', 'success');
    } else {
      addElementInFirebase('posts', card);
      showAlert('Congratz', 'Card uploaded', 'success');
    }
    setTimeout(() => {
      location.href = "index.html";
    }, 2000);
  } else {
    showAlert('Fill data', 'fill title and description', 'error');
  }
});

function loadPreviousData() {
  const cardId = sessionStorage.getItem('last_updated_card');
  if (cardId) {
    getElementFromFirebase('posts', cardId).then(res => {
      select.value = res.data.title;
      descriptionInput.value = res.data.description;
      document.querySelector('img').src = res.data.imgSrc;
      document.getElementById('titleDisplay').textContent = titleInput.value;
      document.getElementById('descriptionDisplay').textContent = descriptionInput.value;
    }).catch(err => {
      location.href = "index.html";
    });
  } else {
    location.href = "index.html";
  }
}

// Function to check the previous path
function checkPreviousPath() {
  var previousPath = document.referrer;
  
  if (previousPath) {
    console.log('Previous path: ' + previousPath);
    // Perform any desired actions based on the previous path

    // return previousPath;
  } else {
    console.log('No previous path found.');
    // Handle the case when there is no previous path
  }
}


