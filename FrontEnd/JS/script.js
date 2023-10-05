const urlFetch = fetch('http://localhost:5678/api/works');
let allProject = [];

let categories =[];

function removeAllChildren(node) {
  node.innerHTML = ''
}

const gallery = document.querySelector(".gallery");
function galleryCreate() {

  removeAllChildren(galleryPictures)

  for (let i = 0; i < galleryPictures.length; i++) {
    const worksIndex = galleryPictures[i];

    const divProject = document.createElement("figure");

    const imageWorks = document.createElement("img");
    imageWorks.src = worksIndex.imageUrl;

    const textWorks = document.createElement("figcaption");
    textWorks.innerText = worksIndex.title;

    gallery.appendChild(divProject);
    divProject.appendChild(imageWorks);
    divProject.appendChild(textWorks);
  }
}
async function galleryGenerate (){
  const galleryResponse = await fetch('http://localhost:5678/api/works');
  galleryPictures = await galleryResponse.json();
  console.log(galleryPictures);
}
galleryGenerate()
.then(()=>{
  galleryCreate();
  CreateModal();
})

/***Add category and filters***/

const categoryFetch = fetch("http://localhost:5678/api/categories");

const allButton = document.createElement("button");
const filters = document.querySelector(".filters")
const buttonText = document.createElement("span");
buttonText.innerHTML = "Tous";

filters.appendChild(allButton)
allButton.appendChild(buttonText)
allButton.addEventListener('click', function () {
  galleryCreate(allProject)
});

function filtersGenerate() {
  for (let i = 0; i < categories.length; i++) {
    const filters = document.querySelector(".filters");

    const category = categories[i];

    const button = document.createElement("button");
    button.id = "filters-" + category.name;

    const buttonText = document.createElement("span");
    buttonText.innerHTML = category.name;

    filters.appendChild(button);
    button.appendChild(buttonText);

    button.addEventListener("click", function () {
      const FilteredProject = allProject.filter(
        (project) => project.categoryId === category.id
      )
      console.log(FilteredProject);
      galleryCreate(FilteredProject);
    });
  }
}
async function getCategories (){
  const categoriesResponse = await fetch("http://localhost:5678/api/categories");
  categories = await categoriesResponse.json();
  console.log(categories);
}

/***add-category on menu***/
function addCategoryOptions() {
  for (let i = 0; i < categories.length; i++) {
    const selectCategory = document.getElementById("category");

    const category = categories[i];

    const addOption = document.createElement("option");
    addOption.id = "choose-" + category.name;

    const addOptionText = document.createElement("span");
    addOptionText.innerHTML = category.name;

    selectCategory.appendChild(addOption);
    addOption.appendChild(addOptionText);
  }
}
addCategoryOptions();

getCategories()
.then(()=>{
  filtersGenerate();
  addCategoryOptions();
})


/***Button-filters generated***/

const token = localStorage.getItem("token")
const blackBloc = document.getElementById("blackBloc")
const logout = document.getElementById("logout")
const login = document.getElementById("login")
const modifyButton = document.querySelector(".modifyProject")
const modalButton = document.querySelector(".modal-button")
modalButton.innerHTML = "Modifier"
const modifyTitle = document.querySelector(".title-modify")
modifyTitle.appendChild(modifyButton)
modifyButton.appendChild(modalButton)

if (token) {
  filters.style.display = "none"
  blackBloc.style.display = "flex"
  login.style.display = "none"
  modifyButton.style.display = "flex"
}
else {
  filters.style.display = "flex"
  blackBloc.style.display = "none"
  logout.style.display = "none"
  login.style.display = "flex"
  modifyButton.style.display = "none";
}

logout.addEventListener('click', function () {
  if (token) {
    localStorage.removeItem("token")
    filters.style.display = "flex"
    blackBloc.style.display = "none"
    logout.style.display = "none"
    login.style.display = "flex"
    modifyButton.style.display = "none"
  }
})

/***Creating modal***/
const modalGallery = document.querySelector(".modalGallery");

function CreateModal() {

  for (let i = 0; i < galleryPictures.length; i++) {
    const worksIndex = galleryPictures[i];

    const figure = document.createElement("figure");

    const imageWorks = document.createElement("img");
    imageWorks.src = worksIndex.imageUrl;

    const trash = document.createElement("button");
    trash.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
    trash.classList.add("trash");
    trash.setAttribute("data-id", worksIndex.id)
    trash.addEventListener('click', function () {
      fetchDelete(worksIndex.id)
    })
    modalGallery.appendChild(figure);
    figure.append(imageWorks, trash);
  }
}

/***make the modal appear on click*/
const openModal = document.querySelectorAll('[data-action="openModal"]');

const modal1 = document.querySelector(".modal")

openModal.forEach(button => button.addEventListener('click', toggleModal))

function toggleModal() {
  modal1.style.display = "flex";
  modalContent.style.display="flex";
  modal2.style.display="none";
  galleryGenerate();
}

const closeCross = document.querySelectorAll(".closeModal")
const overlay = document.querySelector(".overlayModal")

closeCross.forEach(close =>close.addEventListener('click', closeModal))
overlay.addEventListener('click', closeModal)

function closeModal() {
  modal1.style.display = "none";
}

/***delete projects***/

async function fetchDelete(id) {
  const token = localStorage.getItem("token")
  const response = await fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    },
  })
  if (response.ok) {
    const updatedProjects = allProject.filter((project) => project.id !== id);
    galleryCreate(updatedProjects);
    modalGenerate()
    console.log("Image supprimée avec succès");
  } else {
    alert("Erreur lors de la suppression de l'image");
  }
}

/***Modal2 opened*/

const arrow = document.querySelector(".fa-arrow-left")
arrow.addEventListener('click',goback)

function goback(){
  modalContent.style.display="flex";
  modal2.style.display = "none";
}

/***PostWorks-openModal2***/

const addProject = document.querySelector(".addButton")
const modalContent = document.querySelector(".modalContent")
const modal2= document.querySelector(".modal2")

addProject.addEventListener('click', openModalAdd)

function openModalAdd() {
  modalContent.style.display ="none";
  modal2.style.display ="flex";
}


/***Upload-img***/
const buttonImg = document.getElementById("addImgButton");
const fileImg = document.getElementById("file");
const addPictureForm = document.querySelector(".addPicture");

buttonImg.addEventListener("click",
(e)=>{
  if(fileImg){
    fileImg.click();
    const picture = document.createElement("img");
    addPictureForm.appendChild(picture);
  }
  e.preventDefault();
}
);
/***FormPostWorks***/
const worksForm = document.querySelector(".worksForm");
worksForm.addEventListener('submit', (e)=>fetchAdd(e));

async function fetchAdd(e) {
  const token = localStorage.getItem("token");
  e.preventDefault();
  const formData= new FormData(worksForm);
  formData.add("category");
  formData.add("title");
  formData.add("image");
  console.log(formData.get("title"));
  const response = await fetch(`http://localhost:5678/api/works`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  })
  if (response.ok){
    modalGenerate(worksForm);
    urlgenerate(worksForm);
  }
  else{
    alert("alerte,impossible d'ajouter ce projet");
  }
}