// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js"

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
const app = initializeApp(firebaseConfig);  // ------------------------------

const forms = document.querySelector(".form-login")

//Logando
forms.addEventListener("submit", async (e) => {
    
    e.preventDefault() // impedindoo envio padrão do formulário

    const loader = document.querySelector(".loader-content")
    loader.style.display =  "flex"

    let email = document.querySelector(".email").value
    let password = document.querySelector(".password").value

    const auth = getAuth();

    await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => { //Usuário logado
        let user_log = userCredential.user;
        console.log(user_log)

        loader.style.display =  "none" // Tirando a tela de carregamento

        window.location.href = "app.html" // Entrando na aplicação
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode)
        console.log(errorMessage)

        if (errorCode == "auth/invalid-email") {
            loader.style.display =  "none"

            document.querySelector(".warning").style.display =  "none"
            document.querySelector(".erro").style.display =  "flex"

        }
        if (errorCode == "auth/wrong-password") {
            loader.style.display =  "none"

            document.querySelector(".erro").style.display =  "none"
            document.querySelector(".warning").style.display =  "flex"

        } if (errorCode == "auth/user-not-found") {
            loader.style.display =  "none"
            alert("Email não cadastrado!")
        }

    });

})