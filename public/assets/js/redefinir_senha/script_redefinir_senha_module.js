import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js"


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyALQDf28nocTbr9e-QrzCX58xj64OdTIis",
    authDomain: "todolist-5e335.firebaseapp.com",
    projectId: "todolist-5e335",
    storageBucket: "todolist-5e335.appspot.com",
    messagingSenderId: "189298719165",
    appId: "1:189298719165:web:a60a2a6fb6d1176276bad4"
};
    
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const form_redefinir = document.querySelector(".form-redefinir")
form_redefinir.addEventListener("submit", (e) => {

    e.preventDefault()

    const email = document.querySelector(".email").value
    const auth = getAuth(app);

    const loader = document.querySelector(".loader-content")
    loader.style.display =  "flex"



    sendPasswordResetEmail(auth, email)
    .then(() => {
        loader.style.display =  "none"
        alert("Email para redefinição de senha enviado!")
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        
        console.log(errorCode)
        console.log(errorMessage)

        if (errorCode == "auth/missing-email") {
            document.querySelector(".warning").style.display =  "none"
            document.querySelector(".erro").style.display =  "flex"
            loader.style.display =  "none"

        }
        if (errorCode == "auth/invalid-email") {
            document.querySelector(".erro").style.display =  "none"
            document.querySelector(".warning").style.display =  "flex"
            loader.style.display =  "none"

        } if (errorCode == "auth/user-not-found") {
            alert("Email não cadastrado neste app")
            loader.style.display =  "none"
        }
    });
})

