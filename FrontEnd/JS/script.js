fetch ('http://localhost:5678/api/works')
    .then (r=> console.log(r))
    .then (r=> listworks.json)

const listworks = works[0];

const imageWorks = document.createElement("img");
imageWorks.src = listworks.image;

const textWorks = document.createElement("p");
textWorks.innerHTML = listworks.text;