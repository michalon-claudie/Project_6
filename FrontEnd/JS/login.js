const form = document.querySelector(".login");
const email = document.querySelector('input[type="email"]');
const pword = document.querySelector('input[type="password"]');
const validButton = document.querySelector('input[type="submit"]');
const emailValue = email.value;
const passwordValue = pword.value;


async function connectUser (email,password){
    const response = await fetch ("http://localhost:5678/api/users/login",{
        method : "POST",
        headers: {"Content-Type":"application/json"},
        body : JSON.stringify
            ({
                email,
                password
            })
        }
    )
    const responseData = await response.json()
    if (responseData.token) {
        localStorage.setItem('token', responseData.token)
        window.location.href = "./index.html"
        console.log("ok")
    } 
}


validButton.addEventListener("click", function(event)
{
    event.preventDefault()
    const isValid = form.checkValidity()
    if(!isValid){
        alert("Les champs renseignés sont incorrectes")
        return false
    }
    const emailValue = email.value
    const passwordValue = pword.value
    console.log(emailValue)
    console.log(passwordValue)
    connectUser(emailValue,passwordValue)
})

/***User-connected***/
