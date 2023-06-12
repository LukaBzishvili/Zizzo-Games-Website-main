const jobCards = document.querySelector(".job-cards");
const users = getArrayFromFirebase("user");
const admins = getArrayFromFirebase("admin");
const posts = getArrayFromFirebase("posts");
const loader = document.querySelector(".loader");


// firebase.database().ref('posts').on('child_added', (snapshot) => {
//   const snap = snapshot.val();
//   const loaderParent = loader.parentNode;


  if(token === null){
    window.location.href = 'index.html';
  }
  setTimeout(() => {
    if (path === "admin" && currentAdminData && token) {
      cards.forEach(card => {
        const actionsButtons = `
          <div class='button-actions'>
            <button class="btn btn-danger" onclick="declineCard('${card.id}')">Decline</button>
            <button class="btn btn-primary" onclick="approveCard('${card.id}')">Approve</button>
          </div>
        `;
  
        const cardConditionClass = card.data.approved === "Declined" ? "card-condition-red" : "card-condition";
  
        jobCards.innerHTML += `
          <div class="card" style="width: 18rem;">
            <img id="post-image" src="${card.data.imgSrc}" class="card-img-top" alt="post image">
            <div class="card-body">
              <h5 id="titleDisplay" class="card-title">${card.data.title}</h5>
              <p id="descriptionDisplay" class="card-text">${card.data.description}</p>
              <p class="card-text">${card.data.createdAt.split(" ").splice(0, 5).join(" ")}</p>
              <p class="${cardConditionClass}">${card.data.approved === "Unknown" ? actionsButtons : card.data.approved}</p>
            </div>
          </div>
        `;
      });
    }  document.body.removeChild(loader);
    // loaderParent.removeChild(loader);

  }, 5000);


  function cardApprove(id, type) {
    var confirmButtonText = `Yes, ${type.slice(0, -1)} it!`;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          `${type}!`,
          `File has been ${type}.`,
          'success'
        );
        let approved;
        let createdAt;
        let description;
        let imgSrc;
        let title;
        let uploaderID;
  
        cards.forEach(card => {
          if(card.id === id){
          approved = type;
          //Type is used as value of the approved column
          createdAt = card.data.createdAt;
          description = card.data.description;
          imgSrc = card.data.imgSrc;
          title = card.data.title;
          uploaderID = card.data.uploaderID;
          const updatedData = {
            approved: approved,
            createdAt:  createdAt,
            description: description,
            imgSrc: imgSrc,
            title: title,
            uploaderID: uploaderID
          }
          updateElementFirebase("posts", card.id, updatedData);
          
        }
          console.log(approved);
          console.log(createdAt);
          setTimeout(() => {
            location.reload();
          }, 2000);
        });
      } 
    });
    
  }
  
  
  function declineCard(id){
    cardApprove(id, "Declined");
  }
  
  function approveCard(id){
    cardApprove(id, "Approved");
  }
  
  
//})




// if(token === null){
//   window.location.href = 'index.html';
// }
// setTimeout(() => {
//   if (path === "admin" && currentAdminData && token) {
//     cards.forEach(card => {
//       const actionsButtons = `
//         <div class='button-actions'>
//           <button class="btn btn-danger" onclick="declineCard('${card.id}')">Decline</button>
//           <button class="btn btn-primary" onclick="approveCard('${card.id}')">Approve</button>
//         </div>
//       `;

//       const cardConditionClass = card.data.approved === "Declined" ? "card-condition-red" : "card-condition";

//       jobCards.innerHTML += `
//         <div class="card" style="width: 18rem;">
//           <img id="post-image" src="${card.data.imgSrc}" class="card-img-top" alt="post image">
//           <div class="card-body">
//             <h5 id="titleDisplay" class="card-title">${card.data.title}</h5>
//             <p id="descriptionDisplay" class="card-text">${card.data.description}</p>
//             <p class="card-text">${card.data.createdAt.split(" ").splice(0, 5).join(" ")}</p>
//             <p class="${cardConditionClass}">${card.data.approved === "Unknown" ? actionsButtons : card.data.approved}</p>
//           </div>
//         </div>
//       `;
//     });
//     document.body.removeChild(loader);
//   }
// }, 2000);


// function cardApprove(id, type) {
//   var confirmButtonText = `Yes, ${type.slice(0, -1)} it!`;
//   Swal.fire({
//     title: 'Are you sure?',
//     text: "You won't be able to revert this!",
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#3085d6',
//     cancelButtonColor: '#d33',
//     confirmButtonText
//   }).then((result) => {
//     if (result.isConfirmed) {
//       Swal.fire(
//         `${type}!`,
//         `File has been ${type}.`,
//         'success'
//       );
//       let approved;
//       let createdAt;
//       let description;
//       let imgSrc;
//       let title;
//       let uploaderID;

//       cards.forEach(card => {
//         if(card.id === id){
//         approved = type;
//         //Type is used as value of the approved column
//         createdAt = card.data.createdAt;
//         description = card.data.description;
//         imgSrc = card.data.imgSrc;
//         title = card.data.title;
//         uploaderID = card.data.uploaderID;
//         const updatedData = {
//           approved: approved,
//           createdAt:  createdAt,
//           description: description,
//           imgSrc: imgSrc,
//           title: title,
//           uploaderID: uploaderID
//         }
//         updateElementFirebase("posts", card.id, updatedData);
        
//       }
//         console.log(approved);
//         console.log(createdAt);
//         setTimeout(() => {
//           location.reload();
//         }, 2000);
//       });
//     } 
//   });
  
// }


// function declineCard(id){
//   cardApprove(id, "Declined");
// }

// function approveCard(id){
//   cardApprove(id, "Approved");
// }

