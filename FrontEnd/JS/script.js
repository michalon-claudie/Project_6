const urlFetch = fetch ('http://localhost:5678/api/works');
let allProject = [];

function removeAllChildren(node) {
  node.innerHTML=''
}

function galleryCreate(data)
{
  const gallery = document.querySelector(".gallery");

  removeAllChildren(gallery)

    for (let i = 0; i < data.length ; i ++) 
    {  
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

async function urlgenerate()
{
  await urlFetch
    .then ((response) => 
    {
    if (response.ok) return response.json()
    })
    .then ((data) =>
    {
      console.table(data);
      console.log(data);
      allProject = data;
      galleryCreate(data);
    }
    )
    .catch ((error) => 
    {
      alert ('Error')
      console.log('error')
    }
    )
}

urlgenerate();

/***Add category and filters***/

const categoryFetch = fetch ("http://localhost:5678/api/categories");

const allButton = document.createElement("button");
const filters = document.querySelector(".filters")
const buttonText= document.createElement("span");
buttonText.innerHTML = "Tous";

filters.appendChild(allButton)
allButton.appendChild(buttonText)
allButton.addEventListener('click', function ()
{
  galleryCreate(allProject)
});

function FiltersGenerate(data)
{  
  for (let i = 0; i < data.length ; i++)
    { 
      const filters = document.querySelector(".filters");

      const category = data[i];

      const button = document.createElement("button");
      button.id = "filters-"+category.name;

      const buttonText = document.createElement("span");
      buttonText.innerHTML = category.name;

      filters.appendChild(button);
      button.appendChild(buttonText);

      button.addEventListener("click", function()
      {
        const FilteredProject = allProject.filter(
          (project) => project.categoryId === category.id
        )
        console.log(FilteredProject);
        galleryCreate(FilteredProject);
      });
      
    }
}

async function categoryGenerate()
{
  await categoryFetch
  .then ((response) => 
  {
  if (response.ok) return response.json()
  })
  .then ((data) =>
  {
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
const modifyButton =document.querySelector(".modal-button")
modifyButton.innerHTML="Modifier"
const modifyTitle = document.querySelector(".title-modify")
modifyTitle.appendChild(modifyButton)

if (token){
  filters.style.display = "none"
  blackBloc.style.display = "flex"
  login.style.display = "none"
  modifyButton.style.display ="flex"
}
else{
  filters.style.display ="flex"
  blackBloc.style.display = "none"
  logout.style.display = "none"
  login.style.display = "flex"
  modifyButton.style.display = "none";
}

logout.addEventListener('click', function(){
  if (token){
    localStorage.removeItem("token")
    filters.style.display ="flex"
    blackBloc.style.display = "none"
    logout.style.display = "none";
    login.style.display = "flex";
  }
})

/***Creating modal***/

const openModal = document.querySelector(".modifyProject")

const modal1 = document.getElementById('#modal1')

  openModal.addEventListener('click',function (e){
  e.preventDefault()
  modal1.style.display = "flex"
  modal1.removeAttribute("aria-hidden")
  modal1.setAttribute("aria-modal","true")
})

const openModal1 = document.querySelector(".editionMode")

  openModal1.addEventListener('click',function (e){
  e.preventDefault()
  modal1.style.display = "flex"
  modal1.removeAttribute("aria-hidden")
  modal1.setAttribute("aria-modal","true")
})
 