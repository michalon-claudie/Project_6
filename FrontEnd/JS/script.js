const url = fetch ('http://localhost:5678/api/works')

const gallery = document.querySelector(".gallery")

let i = 0;



function galleryCreate(data)
{
    for (let i = 0; i < data.length ; i ++);   

        const worksIndex = data[i];

        const imageWorks = document.createElement("img");
        imageWorks.src = worksIndex.imageUrl;

        const textWorks = document.createElement("p");
        textWorks.innerHTML = worksIndex.title;

        /***Child***/

        sectiondiv.appendChild(gallery);
        gallery.appendChild(imageWorks);
        gallery.appendChild(textWorks);
}
