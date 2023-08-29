const url = fetch ('http://localhost:5678/api/works')

fetch ('http://localhost:5678/api/works')
    .then (response => console.log(response))
    .then (response => ProjectWorks(works))

let works = 0;

const imageWorks = document.createElement("img");
imageWorks.src = works.imageUrl;

const textWorks = document.createElement("p");
textWorks.innerHTML = works.title;

/***Child***/

const sectionWorks = document.querySelector(".gallery")
sectionWorks.appendChild(imageWorks);
sectionWorks.appendChild(textWorks);

function ProjectWorks(works)
    {
        if (response.ok === true)
        {
            (console.log('http://localhost:5678/api/works/imageUrl'))
        }
        else 
        {
            (console.log("erreur"))
        }
    }