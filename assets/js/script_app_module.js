import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, signOut, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js"

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

//Verificando status de login
const auth = getAuth();
onAuthStateChanged(auth, (user) => { //Validando se o usuário está logado oou não
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log(user)
        //alert("ainda esta logado")
        //document.querySelector(".container-login").style.display =  "block"
        //document.querySelector(".login").style.display =  "none"
        // ...
    } else {
        //alert("Usuario não logado")
        window.location.href = "index.html"

        // User is signed out
        // ...
    }
});


//Encerrando login
const btnLogout = document.querySelector(".btn-logout")

btnLogout.addEventListener("click", ()=>{
    const auth = getAuth();
    signOut(auth).then(() => {
        //document.querySelector(".container-login").style.display =  "none"
        //document.querySelector(".login").style.display =  "block"
        //ormLogin.reset()
        //alert("Deslogado")
    }).catch((error) => {
        alert("Erro ao sair")
    });
})