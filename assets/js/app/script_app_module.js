import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js"

import { doc, addDoc,  getDoc, getDocs, onSnapshot, getFirestore, deleteDoc, collection ,where, query } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js"

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

async function get_user_infos (user) {

    const db = getFirestore(app) //Configurando o fire store

    const colectionnn = collection(db, "User_info"); // Acessando a minha coleção de documentos
    const q = query(colectionnn, where("User_ID", "==", user.uid)); // Create a query against the collection.
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {

        var User_info = doc.data()
        const User_name = User_info.Nome
        const Sobre_nome = User_info.Sobrenome

        console.log(User_name)

        const name_user = document.querySelector(".user-name")
        name_user.innerHTML = User_name + " " + Sobre_nome

    });
}

function cuurrent_user_app () {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
        const uid = user.uid;
        return uid
    } else {
        return false
    }
}

async function get_infos_app_tarefas (uid) {

    const db = getFirestore(app) //Configurando o fire store

    const colectionnn = collection(db, "Tarefa"); // Create a reference to the cities collection
    const q = query(colectionnn, where("User_ID", "==", uid)); // Create a query against the collection.
    const querySnapshot = await getDocs(q);

    var i = 0

    const lista_tarefas = document.querySelector(".lista-tarefas")
    lista_tarefas.innerHTML = ""

    querySnapshot.forEach((doc) => {

        var tarefa = doc.data()
        console.log(tarefa)
        console.log(doc)

        var card_user = `
            <div class="card-tarefa" id="card-tarefa-`+ i +`">
                <div id="card-tarefa-id-`+ i +`" style="display: none;">`+ doc.id +`</div>
                <div class="container-resumo-tarefa">
                    <div class="card-infos">
                        <div class="icones-img">
                            <div>
                                <img src="../assets/imgs/app_page/card_buttons/edit.png" alt="Editar">
                            </div>
                            <div class="expandir-tarefa">
                                <div class="index-btns" style="display:none;">`+i+`</div>	
                                <img src="../assets/imgs/app_page/card_buttons/expandir.png" alt="Expandir card">
                            </div>
                            <div>
                                <img src="../assets/imgs/app_page/card_buttons/check.png" alt="Concluir">	
                            </div>
                        </div>
                        <div class="infos-tarefa">
                            <h3>`+ tarefa.Titulo + i +`</h3>
                            <h6>Tarefa agendada para o dia `+ tarefa.Data_planejada +`</h6>
                        </div>
                    </div>
                    <div class="btn-deleta-tarefa">
                        <div class="index-btn-deletar" style="display:none;">`+ i +`</div>
                        <img src="../assets/imgs/app_page/card_buttons/delete.png" alt="">
                    </div>
                </div>
                <div class="container-detalhes-tarefa" id="container-detalhes-tarefa-`+ i +`" style="display: none">
                    <div class="content-descricao-tarefa">
                        <p>
                            `+ tarefa.Descricao +`
                        </p>
                    </div>
                    <div class="detalhe-tarefa ">
                        <div>Categoria: `+ tarefa.Categoria +`</div>
                        <div>Prioridade: `+ tarefa.Prioridade +`</div>
                        <div>Status: `+ "Tratar a informação" +`</div>
                        <div>Data fim: `+ tarefa.Data_fim +`</div>
                    </div>
                </div>
            </div>
        `
        lista_tarefas.innerHTML += card_user

        i = i + 1

    });
}

function initialize_events_listeners () {

    var expandir = document.querySelectorAll(".expandir-tarefa");
    var deletar  = document.querySelectorAll(".btn-deleta-tarefa")
    console.log('executado');
    console.log(expandir.length);

    async function detar_card_by_id (card_id) {
        const db = getFirestore(app) //Configurando o fire store
        await deleteDoc(doc(db, "Tarefa", card_id));
    }

    for (var i = 0; i < expandir.length; i++) {
        expandir[i].addEventListener('click', function(t) {

            var index_btn = t.currentTarget.querySelector('.index-btns').innerHTML;
            console.log(index_btn)

            const card_detalhe = document.getElementById('container-detalhes-tarefa-'+ index_btn);
            const card_tarefa =  document.getElementById('card-tarefa-'+ index_btn);

            if(card_detalhe.style.display == 'none') {
                card_detalhe.style.display =  "flex";
                card_tarefa.style.height = "150px"
            }else {
                card_detalhe.style.display =  "none";
                card_tarefa.style.height = "60px"
            }

        })
    }

    for (var i = 0; i < deletar.length; i++) { //Escuta para o botão de excluir o card

        deletar[i].addEventListener('click', async function(t) {

            var index_btn = t.currentTarget.querySelector('.index-btn-deletar').innerHTML;
            const card_id = document.getElementById('card-tarefa-id-'+ index_btn).innerHTML;
            await detar_card_by_id(card_id)
        })
    }
}
      
//Verificando status de login e realizando o carregamento das informações do app
const auth = getAuth();
onAuthStateChanged(auth, async (user) => { //Validando se o usuário está logado oou não
    if (user) {

        await get_user_infos(user)

        await get_infos_app_tarefas(user.uid)

        initialize_events_listeners()

    } else {
        window.location.href = "../index.html"
    }
});


async function show_tarefa_forms () {

    const container_form_nova_tarefa = document.querySelector(".container-form-nova-tarefa")
    const lista_tarefas = document.querySelector(".lista-tarefas")


    if(container_form_nova_tarefa.style.display == 'none') {
        container_form_nova_tarefa.style.display =  "flex";
        lista_tarefas.style.height = "70%"
    }else {
        container_form_nova_tarefa.style.display =  "none";
        lista_tarefas.style.height = "100%"

    }  
}
const btn_nova_tarefa = document.querySelector(".btn-nova-tarefa")
btn_nova_tarefa.addEventListener("click", async () => {
    await show_tarefa_forms()
    await get_infos_app_tarefas(cuurrent_user_app())
    initialize_events_listeners()
})

const btn_cadastrar_tarefa = document.querySelector(".btn-cadastrar-tarefa")
btn_cadastrar_tarefa.addEventListener("click", async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user !== null) {
        
        const uid = user.uid;
        console.log(uid)

        try {

            const db = getFirestore(app) //Configurando o fire store
            const docRef = await addDoc(collection(db, "Tarefa"), {
                Categoria: "Minha categoria",
                Cor: "#W4WFAD16DA",
                Data_fim: "",
                Data_inicio: "09/05/2023",
                Data_planejada: "18/05/2023",
                Descricao: "O texto da minha descriçã aqui.",
                Prioridade: "ALta, Média, Baixa",
                Titulo: "Configurar interface do usuário",
                User_ID: uid
            });

            console.log("Document written with ID: ", docRef.id);

        }
    
        catch (e) {
            console.error("Error adding document: ", e);
        }
    }
})

const db = getFirestore(app) //Configurando o fire store
onSnapshot(collection(db, "Tarefa"), async () => {
    console.log("Alteração detectada");
    await get_infos_app_tarefas(cuurrent_user_app()) //Tem que esperar os elementos do app carregarem para rodar o add event listenner
    initialize_events_listeners()
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