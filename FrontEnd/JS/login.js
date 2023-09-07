let correctUser = {
 userEmail : document.querySelector("#email").value,
 userPassword : document.querySelector("#password").value
}

function getUser(userEmail,userPassword)
{
    const loginForm = document.querySelector("form");
    loginForm.addEventListener("submit",function(event){

    event.defaultPrevented()
    
    const chargeUtile = JSON.stringify(user)
    fetch("http://localhost:5678/users/login",
    {
        method:"POST",
        body: chargeUtile,
        headers:{"Content-Type":"application/json"}
    });
    }
    )
    console.log(userEmail)
    console.log(userPassword)
}

const validButton = document.querySelector("#submit");

validButton.addEventListener("submit", function(event)
{
    event.defaultPrevented()
    let data = getUser(userMail,userPassword)

    if (data === CorrectUser)
    {
        console.log("ok")
        window.location("index.html");
    }
    else
    {
        console.log("erreur")
        alert("Erreur dans l'identification")
    }
})