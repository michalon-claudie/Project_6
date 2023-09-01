const urlFetch = fetch ('http://localhost:5678/api/works');

function galleryCreate(data)
{
    for (let i = 0; i < data.length ; i ++) 
    {  
        const worksIndex = data[i];

        const gallery = document.querySelector(".gallery");

        const divProject = document.createElement("figure");
        divProject.innerHTML = gallery.div;

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

async function categoryGenerate()
 {
    await categoryFetch
    .then ((response) =>
    {
      if (response.ok) return (response.json())
    })
    .then ((data) =>
    {
    console.log(data)
    })
    .catch ((error) =>
    {
    alert ('Error')
    console.log('error')
    });
 }
 
 const filters = document.querySelector(".filters");

 const btnFilterObject = document.createElement(".btn FilterObject");
 btnFilterObject.innerHTML = filters.btn;

 filters.appendChild(btnFilterObject);
 