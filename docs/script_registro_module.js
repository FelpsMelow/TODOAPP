// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js"

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

const btn_registro = document.querySelector(".btn-criar-conta")

function cadastrar_usuario(email) {

    var access_key = '5IlLXXqdhTQXA9V9U5bvmShcRA6Ziu6C';
    var email_address = email
  
    var myHeaders = new Headers();
    myHeaders.append("apikey", access_key);
    
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders
    };
    

    fetch("https://api.apilayer.com/email_verification/check?email=" + email_address, requestOptions)
    .then(response => response.json())
    .then(result => {

        if (result.smtp_check == true) {

            console.log("email valido, cadastrando")
            
            const password = document.querySelector(".password").value
            const password_1 = document.querySelector(".password-confirm").value
    

            let status_password = password_confirm(password, password_1)

            if (status_password == false) {

                const auth = getAuth();
                createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    console.log(user)
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    console.log(errorCode)

                    if (errorCode == "auth/email-already-in-use") {
                        alert("O E-Mail informado já está em uso!")
                    } if (errorCode == "auth/missing-password") {
                        alert("Senha não atende os requisitos")
                    } if (errorCode == "auth/weak-password") {
                        alert("Senha não atende os requisitos")
                    }
                    // ..
                });
            } if (status_password == true) {
                console.log("Senhas diferentes")
                return
            }


        }
        else{
            alert("email invalido")
            console.log("email invalido")
        }

    })
    .catch(error => {
        console.log(error)
    }); //error.error > "no_email_address_spplied"

}

function password_confirm(pass, pass_1) {

    if (pass != pass_1) {
        return true
    } else {
        return false
    }
}

btn_registro.addEventListener("click", () => {
    const email = document.querySelector(".email").value
    cadastrar_usuario(email)
})