/**Variables and constants*/
const gallery = document.querySelector(".gallery");
const rawData = []; 
let categories =[];
 
/***category and filters***/
const allButton = document.createElement("button");
const filters = document.querySelector(".filters");
const buttonText = document.createElement("span");
buttonText.innerHTML = "Tous";
 
filters.appendChild(allButton)
allButton.appendChild(buttonText)
 
/***Manage connection User***/
const token = localStorage.getItem("token");
const blackBloc = document.getElementById("blackBloc");
const logout = document.getElementById("logout");
const login = document.getElementById("login");
const modifyButton = document.querySelector(".modifyProject");
const modalButton = document.querySelector(".modal-button");
modalButton.innerHTML = "Modifier";
const modifyTitle = document.querySelector(".title-modify");
modifyTitle.appendChild(modifyButton)
modifyButton.appendChild(modalButton)
 
/***Creating modal***/
const modalGallery = document.querySelector(".modalGallery");
 
/***make the modal appear on click*/
const openModal = document.querySelectorAll('[data-action="openModal"]');
const modal1 = document.querySelector(".modal");
 
/**Close Modal*/
const closeCross = document.querySelectorAll(".closeModal");
const overlay = document.querySelector(".overlayModal");
 
/***go back in modal2*/
const arrow = document.querySelector(".fa-arrow-left");
 
/**Open Modal2*/
const addProject = document.querySelector(".addButton");
const modalContent = document.querySelector(".modalContent");
const modal2= document.querySelector(".modal2");
 
/***Upload-img***/
const buttonImg = document.getElementById("addImgButton");
const fileImg = document.getElementById("file");
const addPictureForm = document.querySelector(".addPicture");
 
/***FormPostWorks***/
const worksForm = document.querySelector(".worksForm");
 
/***Function***/
 
/***To create gallery***/
function removeAllChildren(node) {
  node.innerHTML = ''
}
 
function deleteGallery() {
  removeAllChildren(gallery);
}
 
/**
 * Creates and populates a gallery of works using the provided data.
 * This function removes any existing content from the gallery before adding new items.
 * @param {Array} data - An array of objects containing work information.
 * @returns {void}
 */
function createGallery(data) {
 
  deleteGallery();
 
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
      fetchDelete(worksIndex.id)
    })
    modalGallery.appendChild(figure);
    figure.append(imageWorks, trash);
  }
}
 
async function getPictures() {
  try {
    const galleryResponse = (await fetch('http://localhost:5678/api/works')).json();
    return galleryResponse;
  } catch (err) {
    console.log("An error occurred when fetching pictures.");
    return []; 
  }
}
 
/**Function - add filters***/
 
allButton.addEventListener('click', function () {
  createGallery(rawData);
});
 
function createFilterButtons() {
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
 
async function getCategories (){
  const categoriesResponse = await fetch("http://localhost:5678/api/categories");
  return categoriesResponse.json();
}
 
/***add-category on menu modal***/
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
 
async function init(){
  rawData.length = 0; // Before a new fetch, we empty the raw data array.
  const data = await getPictures();
  rawData.push(...data);
 
  createGallery(rawData);
  createModal(rawData);
  categories = await getCategories();
  createFilterButtons();
  addCategoryOptions();
}
 
init();
/***Button-filters generated***/
 
/**Function connectionUser managment*/
 
if (token) {
  filters.style.display = "none";
  blackBloc.style.display = "flex";
  login.style.display = "none";
  modifyButton.style.display = "flex";
}
else {
  filters.style.display = "flex";
  blackBloc.style.display = "none";
  logout.style.display = "none";
  login.style.display = "flex";
  modifyButton.style.display = "none";
}
 
logout.addEventListener('click', function () {
  if (token) {
    localStorage.removeItem("token");
    filters.style.display = "flex";
    blackBloc.style.display = "none";
    logout.style.display = "none";
    login.style.display = "flex";
    modifyButton.style.display = "none";
  }
})
 
 
 
/***make the modal appear on click*/
 
openModal.forEach(button => button.addEventListener('click', toggleModal))
 
function toggleModal() {
  modal1.style.display = "flex";
  modalContent.style.display="flex";
  modal2.style.display="none";
 getPictures();
}
 
/**Close Modal*/
 
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
    const updatedProjects = rawData.filter((project) => project.id !== id);
    removeAllChildren(updatedProjects);
    getPictures(updatedProjects);
    console.log("Image supprimée avec succès");
  } else {
    alert("Erreur lors de la suppression de l'image");
  }
}
 
/***Modal2***/
 
arrow.addEventListener('click',goback)
 
function goback(){
  modalContent.style.display="flex";
  modal2.style.display = "none";
}
 
/***PostWorks-openModal2***/
 
addProject.addEventListener('click', openModalAdd)
 
function openModalAdd() {
  modalContent.style.display ="none";
  modal2.style.display ="flex";
}
 
/***Upload-img***/
 
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
 
worksForm.addEventListener('submit', async function fetchAdd(e){
  const token = localStorage.getItem("token");
  e.preventDefault();
  const formData= new FormData(worksForm);
  formData.get("categoryId");
  formData.get("title");
  formData.get("imageUrl");
  console.log(formData.get("title"));
  const response = await fetch(`http://localhost:5678/api/works`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData,
  })
  if (response.ok){
    createGallery(worksForm);
    createModal(worksForm);
    getPictures(worksForm);
  }
  else{
    alert("alerte,impossible d'ajouter ce projet");
  }
});