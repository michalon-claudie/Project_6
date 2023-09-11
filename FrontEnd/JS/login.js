async function userConnection (){
    await fetch ("http://localhost:5678/api/users/login",{
        method : "POST",
        headers:{"Content-Type":"application/json"}
    },
    body = JSON.stringify({
        mail : emailValue,
        pass : passwordValue
    })
    )
}

const form = document.querySelector(".login")
const email = document.querySelector('input[type="email"]')
const pword = document.querySelector('input[type="password"]')
const validButton = document.querySelector('input[type="submit"]')

const emailValue = email.value
const passwordValue = pword.value

validButton.addEventListener("click", function(event)
{
    event.preventDefault()
    const emailValue = email.value
    const passwordValue = pword.value
    console.log(emailValue)
    console.log(passwordValue)
    userConnection()
    .then((response) => response.json())
    .then(form => {
        if (form.token) {
            localStorage.setItem('token', form.token);
            window.location.href = "./index.html";
        } else {
            console.error("Le token n'a pas été trouvé");
            alert("Erreur")
        }
        })
    })
