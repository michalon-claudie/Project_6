async function getCorrectUser(correctEmail,correctPassword)
{
    let correctUser = 
    {
        email: correctEmail,
        password: correctPassword
    };
    const response = await fetch("http://localhost:5678/users/login",
    {
        method:"post",
        headers: {
            "Accept":"application/json",
            'Content-Type':"application/json"
        },
        body: JSON.stringify(user)
    })
    return await response.json();
}

const loginForm = document.querySelector("form");
let email = document.getElementById("#email");
let password = document.getElementById("#password");
const validButton = document.querySelector("submit");

validButton.addEventListener("click", function(event)
{
    event.defaultPrevented();
    let userMail = mail.value;
    let userPassword = password.value;
    let data = getCorrectUser(userMail,userPassword);

    if (data != null)
    {
        console.log("ok")
        console.log(data);
    }
    else
    {
        console.log("erreur")
        alert("Erreur dans l'identification")
    }
})