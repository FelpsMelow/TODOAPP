import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, signOut, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js"

import { doc, getDoc, getDocs, getFirestore, collection ,where, query } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js"

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
onAuthStateChanged(auth, async (user) => { //Validando se o usuário está logado oou não
    if (user) {

        const db = getFirestore(app) //Configurando o fire store

        const colectionnn = collection(db, "User_info"); // Create a reference to the cities collection
        const q = query(colectionnn, where("User_ID", "==", user.uid)); // Create a query against the collection.
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {

            var User_info = doc.data()
            const User_name = User_info.Nome

            console.log(User_name)

            const name_user = document.querySelector(".user-name")
            name_user.innerHTML = User_name
        });

    } else {
        window.location.href = "../index.html"
    }
});


//Encerrando login
const btnLogout = document.querySelector(".btn-logout")
btnLogout.addEventListener("click", ()=>{
    const auth = getAuth();
    signOut(auth).then(() => {

    }).catch((error) => {
        alert("Erro ao sair")
    });
    
})