/**Variables and constants*/
const gallery = document.querySelector(".gallery");
const rawData = []; 
let categories =[];
 
/***category and filters***/
const allButton = document.createElement("button");
const filters = document.querySelector(".filters");
 
/***Manage connection User***/
const token = localStorage.getItem("token");
const editionBanner = document.getElementById("editionBanner");
const logoutButton = document.getElementById("logoutButton");
const loginButton = document.getElementById("loginButton");
const modifyButton = document.querySelector(".modifyProject");
 
/***Creating modal***/
const modalGallery = document.querySelector(".modalGallery");
 
/***make the modal appear on click*/
const openModal = document.querySelectorAll('[data-action="openModal"]');
const modale = document.querySelector(".modale");
 
/**Close Modal*/
const closeCross = document.querySelectorAll(".closeModal");
const overlay = document.querySelector(".overlayModal");
 
/***go back in addProjectModal*/
const goBackButton = document.querySelector(".fa-arrow-left");
 
/**Open addProjectModal*/
const addProjectButton = document.querySelector(".addProjectButton");
const modalContent = document.querySelector(".modalContent");
const addProjectModal= document.querySelector(".addProjectModal");
 
/***Upload-img***/
const addNewPictureButton = document.getElementById("addNewPictureButton");
const fileImg = document.getElementById("image");
const addPictureForm = document.querySelector(".addPicture");
 
/***FormPostWorks***/
const worksForm = document.querySelector(".worksForm");
 
/***Function***/
 
/***To create gallery***/
function removeAllChildren(node) {
  node.innerHTML = ''
}
 
function clearGallery() {
  removeAllChildren(gallery);
}

function clearModalGallery() {
  removeAllChildren(modalGallery);
}

async function getWorks() {
  try {
    const galleryResponse = (await fetch('http://localhost:5678/api/works')).json();
    return galleryResponse;
  } catch (err) {
    console.log("An error occurred when fetching pictures.");
    return []; 
  }
}

async function getCategories (){
  const categoriesResponse = await fetch("http://localhost:5678/api/categories");
  return categoriesResponse.json();
}
function createGallery(data) {
 
  clearGallery();
 
  for (let i = 0; i < data.length; i++) {
    const worksIndex = data[i];
 
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
 
function createModal(data) {

  clearModalGallery();
 
  for (let i = 0; i < data.length; i++) {
    const worksIndex = data[i];
 
    const figure = document.createElement("figure");
 
    const imageWorks = document.createElement("img");
    imageWorks.src = worksIndex.imageUrl;
 
    const trash = document.createElement("button");
    trash.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
    trash.classList.add("trash");
    trash.setAttribute("data-id", worksIndex.id)
    trash.addEventListener('click', function () {
      deletePicturesById(worksIndex.id)
    })
    modalGallery.appendChild(figure);
    figure.append(imageWorks, trash);
  }
}
 
/**Function - add filters***/
 
function createFilterButtons() {
  const buttonText = document.createElement("span");
  buttonText.innerHTML = "Tous"; 
  filters.appendChild(allButton)
  allButton.appendChild(buttonText)
  allButton.addEventListener('click', function () {
    createGallery(rawData);
  });
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
      const filteredPictures = rawData.filter((project) => {
        return project.categoryId === category.id;
      });
      createGallery(filteredPictures);
    });
  }
}
 
/***add-category on menu modal***/
function addCategoryOptions() {
  for (let i = 0; i < categories.length; i++) {
    const selectCategory = document.getElementById("category");

    const category = categories[i];

    const addOption = document.createElement("option");
    addOption.id = "choose-" + category.id;

    addOption.value = category.id;

    const addOptionText = document.createElement("span");
    addOptionText.innerHTML = category.name;

    selectCategory.appendChild(addOption);
    addOption.appendChild(addOptionText);
  }
}
 
async function init(){
  rawData.length = 0; // Before a new fetch, we empty the raw data array.
  const data = await getWorks();
  rawData.push(...data);
 
  createGallery(rawData);
  createModal(rawData);
  categories = await getCategories();
  createFilterButtons();
  addCategoryOptions();
}
 
init();

 /***make the modal appear on click*/
 
openModal.forEach(button => button.addEventListener('click', toggleModal))
 
function toggleModal() {
  modale.style.display = "flex";
  modalContent.style.display="flex";
  addProjectModal.style.display="none";
 getWorks();
}
 
/**Close Modal*/
 
closeCross.forEach(close =>close.addEventListener('click', closeModal))
overlay.addEventListener('click', closeModal)
 
function closeModal() {
  modale.style.display = "none";
}
 
/***delete projects***/
 
async function deletePicturesById(id) {
  const token = localStorage.getItem("token")
  const response = await fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    },
  })
  if (response.ok) {
    const updatedProjects = rawData.filter((project) => project.id !== id);
    createGallery(updatedProjects);
    createModal(updatedProjects);
    console.log("Image supprimée avec succès");
  } else {
    alert("Erreur lors de la suppression de l'image");
  }
}
 
/***addProjectModal***/
 
goBackButton.addEventListener('click',goback)
 
function goback(){
  modalContent.style.display="flex";
  addProjectModal.style.display = "none";
}
 
/***PostWorks-openaddProjectModal***/
 
addProjectButton.addEventListener('click', openAddProjectModal)
 
function openAddProjectModal() {
  modalContent.style.display ="none";
  addProjectModal.style.display ="flex";
}
 
/***Upload-img***/
addNewPictureButton.addEventListener("click",
(e)=>{
  if(fileImg){
    fileImg.click();
    const picture = document.createElement("img");
    addPictureForm.appendChild(picture);
  }
  e.preventDefault();
}
);
/**controls parameters IMG */
const imagePreview = document.getElementById("imagePreview");
const imageInput = document.getElementById("image");
let file = imageInput.files[0];
const allowedTypesImg = ["image/jpg", "image/png"];
const maxSizeImg = 4 * 1024 * 1024;

/**if parameters are not allowed*/
function handleFileTooLarge(){
  console.log("fichier trop volumineux")
}
function handleUnauthorizedFileType(){
  console.log("le format du fichier n'est pas respecté")
}
/***/

function isFileTypeAuthorized(file){
  return allowedTypesImg.includes(file.type);
}
function processFile(file){
  if(file.size>maxSizeImg){
    handleFileTooLarge();
  }
  else if(!isFileTypeAuthorized(file)){
    handleUnauthorizedFileType();
  }
  else{
    readAndStoreFile(file)
  }
}

imageInput.addEventListener('change', function(event) {
  processFile(event.target.files[0])
})
function readAndStoreFile(file){
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      imagePreview.src = event.target.result;
    };
    reader.readAsDataURL(file);
    const imgIcone = document.querySelector(".fa-image");
    imgIcone.style.display = "none";
    const addNewPictureButton = document.getElementById("addNewPictureButton");
    addNewPictureButton.style.display ="none";
    const imgParagrapheDetails = document.querySelector(".details");
    imgParagrapheDetails.style.display = "none";
    imagePreview.style.display ="flex";
  }else {
    imagePreview.src = '#';
  }
};

/***FormPostWorks***/
worksForm.addEventListener('submit',async function addNewProject(e){
  e.preventDefault();
  const formData= new FormData();
  let imageUrl = document.getElementById("image").files[0];
  let title = document.getElementById("title").value;
  let categoryId = document.getElementById("category").value;
  formData.append("category",categoryId);
  formData.append("title",title);
  formData.append("image",imageUrl);
  console.log(formData)
  if(imageUrl == undefined){
    alert("Veuillez choisir un image")
    return; 
  }
  if(title == ""){
    alert("Veuillez choisir un titre")
    return;
  }
  if(categoryId == undefined){
    alert("Veuillez choisir une categorie")
    return;
  }
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      //"Content-type":"multipart/form-data"
    },
    body: formData
  })
  if (response.ok){
    closeModal();
    alert("projet ajouté avec succès");
    init();
  }
  else{
    alert("alerte,impossible d'ajouter ce projet");
  }
  }
);
  
/**Function connectionUser managment*/
 
if (token) {
  filters.style.display = "none";
  editionBanner.style.display = "flex";
  loginButton.style.display = "none";
  modifyButton.style.display = "flex";
}
else {
  filters.style.display = "flex";
  editionBanner.style.display = "none";
  logoutButton.style.display = "none";
  loginButton.style.display = "flex";
  modifyButton.style.display = "none";
}
 
logoutButton.addEventListener('click', function () {
  if (token) {
    localStorage.removeItem("token");
    filters.style.display = "flex";
    editionBanner.style.display = "none";
    logoutButton.style.display = "none";
    loginButton.style.display = "flex";
    modifyButton.style.display = "none";
  }
})

