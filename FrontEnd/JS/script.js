const urlFetch = fetch ('http://localhost:5678/api/works');

function galleryCreate(data)
{
    for (let i = 0; i < data.length ; i ++) 
    {  
        const worksIndex = data[i];

        const gallery = document.querySelector(".gallery");

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

function FiltersGenerate(data)
{  
  for (let i = 0; i < data.length ; i++)
    { 
      const filters = document.querySelector(".filters");

      const CategoryIndex = data[i];

      const button = document.createElement("button");

      const buttonText = document.createElement("span");
      buttonText.innerHTML = CategoryIndex.name;

      filters.appendChild(button);
      button.appendChild(buttonText);
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

function arrayFilters ()
{
  Array.filter(obj => obj.categoryId = 1)
};

const button = document.createElement("button");
button.addEventListener("click", function()
{
  FilteredCategory.filter(function (data)
  {
    return data.id = 1;
  })
  console.log(FilteredCategory);
}
);

categoryGenerate();
 