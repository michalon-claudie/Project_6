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

if (token){
  filters.style.display = "none"
  blackBloc.style.display = "flex"
  connectingUser()
  login.style.display = "none";
}
else{
  filters.style.display ="flex"
  blackBloc.style.display = "none"
  logout.style.display = "none";
  login.style.display = "flex";
}

function connectingUser (){
  const modifyButton =document.querySelector(".modal-button")
  modifyButton.innerHTML="Modifier"
  const modifyTitle = document.querySelector(".title-modify")

  modifyTitle.appendChild(modifyButton)
}

/***Creating modal***/


 