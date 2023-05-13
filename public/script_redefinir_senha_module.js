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

const btn_enviar = document.querySelector(".btn-redefinir-senha")
btn_enviar.addEventListener("click", () => {

    const email = document.querySelector(".email").value
    const auth = getAuth(app);

    sendPasswordResetEmail(auth, email)
    .then(() => {
        // Password reset email sent!
        alert("Email para redefinição de senha enviado!")
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        
        console.log(errorCode)
        console.log(errorMessage)

        if (errorCode == "auth/missing-email") {
            //console.log("Preencha todos os campos")
            //loader.style.display =  "none"

            document.querySelector(".warning").style.display =  "none"
            document.querySelector(".erro").style.display =  "flex"

        }
        if (errorCode == "auth/invalid-email") {
            //console.log("Email ou senha incorreto!")
            //loader.style.display =  "none"

            document.querySelector(".erro").style.display =  "none"
            document.querySelector(".warning").style.display =  "flex"
        } if (errorCode == "auth/user-not-found") {

            //loader.style.display =  "none"
            alert("Email não cadastrado neste app")
        }
    });
})

