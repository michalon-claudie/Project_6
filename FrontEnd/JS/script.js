const urlFetch = fetch ('http://localhost:5678/api/works');
let allProject = [];

let i = 0;

function galleryCreate(data)
{
    for (let i = 0; i < data.length ; i ++); 
    {  
        const worksIndex = data[i];

        const imageWorks = document.createElement("img");
        imageWorks.src = worksIndex.imageUrl;

        const textWorks = document.createElement("figcaption");
        textWorks.innerText = worksIndex.title;

        const gallery = document.querySelector(".gallery");
        gallery.appendChild(imageWorks);
        gallery.appendChild(textWorks);
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
      allProject = data;
      console.log(allProject);

      galleryCreate(allProject);
    }
    )
    .catch ((error) => 
    {
      alert ('Error')
      console.log(error)
    }
    )
}

urlgenerate();

