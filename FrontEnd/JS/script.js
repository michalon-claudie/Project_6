const urlFetch = fetch('http://localhost:5678/api/works');
let allProject = [];

function removeAllChildren(node) {
  node.innerHTML = ''
}

const gallery = document.querySelector(".gallery");
function galleryCreate(data) {

  removeAllChildren(gallery)

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

async function urlgenerate() {
  await urlFetch
    .then((response) => {
      if (response.ok) return response.json()
    })
    .then((data) => {
      console.table(data);
      console.log(data);
      allProject = data;
      galleryCreate(data);
    }
    )
    .catch((error) => {
      alert('Error')
      console.log('error')
    }
    )
}

urlgenerate();

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

function FiltersGenerate(data) {
  for (let i = 0; i < data.length; i++) {
    const filters = document.querySelector(".filters");

    const category = data[i];

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

async function categoryGenerate() {
  await categoryFetch
    .then((response) => {
      if (response.ok) return response.json()
    })
    .then((data) => {
      console.log(data);
      FiltersGenerate(data);
    })
};

categoryGenerate();

/***Button generated***/

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

function CreateModal(data) {

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

async function modalGenerate() {
  const response = await fetch("http://localhost:5678/api/works")
  const worksList = await response.json();
  if (response.ok) {
    removeAllChildren(modalGallery);
    CreateModal(worksList);
  } else {
    alert("Error");
    console.log("error");
  }
}

/***make the modal appear on click*/
const openModal = document.querySelectorAll("#openModal")

const modal1 = document.querySelector(".modal")

openModal.forEach(open => open.addEventListener('click', toggleModal))

function toggleModal() {
  modal1.style.display = "flex";
  modalContent.style.display="flex";
  modal2.style.display="none";
  modalGenerate();
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

/***FormPostWorks***/
const worksForm = document.querySelector(".worksForm")
worksForm.addEventListener('submit', fetchAdd)

async function fetchAdd(e) {
  e.preventDefault();
  const token = localStorage.getItem("token")
  const formData= new FormData(worksForm);
  formData.get("category");
  formData.get("title");
  formData.get("image");
  console.log(formData.get("title"));
  const response = await fetch(`http://localhost:5678/api/works`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  })
  if (response.ok){
    modalGenerate(newProject);
    urlgenerate(newProject);
  }
  else{
    alert("alerte,impossible d'ajouter ce projet");
  }
}