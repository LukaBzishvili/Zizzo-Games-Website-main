const currentUserData = sessionStorage.getItem('current_user_data');
const currentAdminData = sessionStorage.getItem('current_admin_data');

const token = sessionStorage.getItem('token');
const pfCard = document.querySelector(".body");
const user = getElementFromFirebase("user", token);
const admin = getElementFromFirebase("admin", token);

const DEFAULT_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png";


if(token === null){
    window.location.href = 'index.html';
}

let current;

if(currentAdminData && token){
    current = admin;
}
else if(currentUserData && token){
    current = user;
}

let name;
let email;
let age;
let experience;
let img;
current.then(value => {
    name = value.data.name;
    email = value.data.email;
    age = value.data.age;
    experience = value.data.experience;
    img = value.data.image;
    pfCard.innerHTML = `<div class="card">
                        <div class="card__header">
                        <div class="card__profile">
                        <img
                            src="${img}"
                            alt="A man smiling"
                        />
                        </div>
                        <div class="card__name">
                        <h2>${name}</h2>
                        </div>
                        <div class="card__button">
                        <a href="pfpEdit.html"><button><span class="span-edit">Edit</span></button></a>
                        </div>
                    </div>
                    <hr class="border" />
                    <div class="card__insights">
                        <div class="card__heading">
                        <div class="heading">Insights</div>
                        <div class="date">
                            May 24 - June 24
                        </div>
                        </div>
                        <div class="insights">
                        <div class="insight">
                            <div class="heading">
                                Email:
                            </div>
                            <div class="number">
                                ${email}
                            </div>
                        </div>
                        <div class="insight">
                            <div class="heading">
                                Age:
                            </div>
                            <div class="number">
                                ${age}
                            </div>
                        </div>
                        <div class="insight">
                            <div class="heading">
                                Years of Experience
                            </div>
                            <div class="number">
                                ${experience}    
                            </div>
                        </div>
                        </div>
                    </div>
                    <a href="index.html">Go Back</a>
                </div>
                    
                    `;
                    
}).catch(err => {
    console.log(err);
});


{/* <section class="jobs-appied">
<figure class="applied">
    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample87.jpg" alt="background" />
        <figcaption>
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample4.jpg" alt="profile" class="profile" />
            <h2>Hans Down<span>(Hans@gmail.com)</span><span>Engineer</span><span>Age: 18</span></h2>
            <p>I'm looking for something that can deliver a 50-pound payload of snow on a small feminine target. Can you suggest something? Hello...? </p>
            <!-- <a href="#" class="follow">Follow</a>
            <a href="#" class="info">More Info</a> -->
    </figcaption>
</figure>
</section> */}