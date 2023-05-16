import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js"

import { doc, updateDoc, addDoc,  getDoc, getDocs, onSnapshot, getFirestore, deleteDoc, collection ,where, query } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js"

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

//Carregar as informações do usuário
//Carregar as minhas categorias

async function get_infos_app_tarefas (uid, type, order, categoria) { //Rodar função de acordo com cada tipo de filtro ou carregamento

    //parametros aceitos pela função:
    //type > "init" e "search"
    //para init, só é aceito exe
    //para search, são aceitos "todos", "incompletos", "feitos" e "prioritarios"

    const db = getFirestore(app) //Configurando o fire store

    const lista_tarefas = document.querySelector(".lista-tarefas")  //Referenciando o objeto "lista de tarefas"

    function renderizar_elemento (i, tarefa ,doc_id) {
        return `
            <div class="card-tarefa" id="card-tarefa-`+ i +`">
                <div id="card-tarefa-id-`+ i +`" style="display: none;">`+ doc_id +`</div>
                <div class="container-resumo-tarefa">
                    <div class="card-infos">
                        <div class="icones-img">

                            <div class="editar-tarefa">
                                <div class="index-btn-editar" style="display:none;">`+ i +`</div>	
                                <img src="https://i.ibb.co/c3YsDkG/edit.png" alt="Editar">
                            </div>

                            <div class="expandir-tarefa">
                                <div class="index-btn-expandir" style="display:none;">`+ i +`</div>	
                                <img src="https://i.ibb.co/D72bzz9/expandir.png" alt="Expandir card">
                            </div>

                            <div class="concluir-tarefa">
                                <div class="index-btn-concluir" style="display:none;">`+ i +`</div>	
                                <img src="https://i.ibb.co/y0gZYP2/btn-check-selected.png" alt="Concluir">	
                            </div>

                        </div>
                        <div class="infos-tarefa">
                            <h3>`+ tarefa.Titulo + `</h3>
                            <h6>Tarefa agendada para o dia `+ tarefa.Data_planejada +`</h6>
                        </div>
                    </div>
                    <div class="btn-deleta-tarefa">
                        <div class="index-btn-deletar" style="display:none;">`+ i +`</div>
                        <img src="https://i.ibb.co/pbMLtv2/delete.png" alt="botão de deletar">
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
    }

    async function carregar_todos_os_cards () {
        const colectionnn = collection(db, "Tarefa"); // Create a reference to the cities collection
        const q = query(colectionnn, where("User_ID", "==", uid)); // Create a query against the collection.
        const querySnapshot = await getDocs(q);

        var i = 0   //iniciando o contador
        lista_tarefas.innerHTML = ""    //Limpando a lista de tarefas

        querySnapshot.forEach((doc) => {

            var tarefa = doc.data()
            var card_user = renderizar_elemento(i, tarefa, doc.id)

            lista_tarefas.innerHTML += card_user
    
            i = i + 1
    
        });
    }

    if (type == "init" && order == "exe") {
        await carregar_todos_os_cards()
    } else if (type == "search" && order == "todos") {
        await carregar_todos_os_cards()
    } else if (type == "search" && order == "incompletos") {

        const colectionnn = collection(db, "Tarefa"); // Create a reference to the cities collection
        const q = query(colectionnn, where("User_ID", "==", cuurrent_user_app()), where("Feito", "==", false)); // Create a query against the collection.
        const querySnapshot = await getDocs(q);

        var i = 0   //iniciando o contador
        lista_tarefas.innerHTML = ""    //Limpando a lista de tarefas

        querySnapshot.forEach((doc) => {

            var tarefa = doc.data()
            var card_user = renderizar_elemento(i, tarefa, doc.id)

            lista_tarefas.innerHTML += card_user
    
            i = i + 1
    
        });

    } else if (type == "search" && order == "feitos") {

        const colectionnn = collection(db, "Tarefa"); // Create a reference to the cities collection
        const q = query(colectionnn, where("User_ID", "==", cuurrent_user_app()), where("Feito", "==", true)); // Create a query against the collection.
        const querySnapshot = await getDocs(q);

        var i = 0   //iniciando o contador
        lista_tarefas.innerHTML = ""    //Limpando a lista de tarefas

        querySnapshot.forEach((doc) => {

            var tarefa = doc.data()
            var card_user = renderizar_elemento(i, tarefa, doc.id)

            lista_tarefas.innerHTML += card_user
    
            i = i + 1
    
        });

    } else if (type == "search" && order == "prioritarios") {

        const colectionnn = collection(db, "Tarefa"); // Create a reference to the cities collection
        const q = query(colectionnn, where("User_ID", "==", cuurrent_user_app()), where("Prioridade", "==", "alta")); // Create a query against the collection.
        const querySnapshot = await getDocs(q);

        var i = 0   //iniciando o contador
        lista_tarefas.innerHTML = ""    //Limpando a lista de tarefas

        querySnapshot.forEach((doc) => {

            var tarefa = doc.data()
            var card_user = renderizar_elemento(i, tarefa, doc.id)

            lista_tarefas.innerHTML += card_user
    
            i = i + 1
    
        });

    } else if (type == "search" && order == "categoria") {

        const colectionnn = collection(db, "Tarefa"); // Create a reference to the cities collection
        const q = query(colectionnn, where("User_ID", "==", cuurrent_user_app()), where("Categoria", "==", categoria)); // Create a query against the collection.
        const querySnapshot = await getDocs(q);

        var i = 0   //iniciando o contador
        lista_tarefas.innerHTML = ""    //Limpando a lista de tarefas

        querySnapshot.forEach((doc) => {

            var tarefa = doc.data()
            var card_user = renderizar_elemento(i, tarefa, doc.id)

            lista_tarefas.innerHTML += card_user
    
            i = i + 1
    
        });

    }

}

async function get_app_info_categorias (escopo) {

    const db = getFirestore(app)

    const colectionnn = collection(db, "Categorias"); // Create a reference to the cities collection
    const q = query(colectionnn, where("User_ID", "==", cuurrent_user_app())); // Create a query against the collection.
    const querySnapshot = await getDocs(q);

    if (escopo == "drop") {

        const dropdown_lista_categorias = document.querySelector(".dropdown-categorias")
        dropdown_lista_categorias.innerHTML = `<option value="Selecione">Selecione...</option>`
        
        querySnapshot.forEach((doc) => {
    
            var categoria = doc.data()
    
            let dropdown_option = `
                <option value="`+ categoria.Nome_categoria +`">`+ categoria.Nome_categoria +`</option>
            `

            dropdown_lista_categorias.innerHTML += dropdown_option

        });

    } else if (escopo == "list-user") {

        const lista_categorias = document.querySelector(".categories-list")
        lista_categorias.innerHTML = ""

        querySnapshot.forEach((doc) => {
    
            var categoria = doc.data()
    
            var objeto_categoria = `
                <li class="select-categoria">
                    <div class="categorie-color" style="background-color: `+ categoria.Cor +`;"></div>
                    <strong class="nome-categoria">`+ categoria.Nome_categoria +`</strong>
                </li>
            `

            lista_categorias.innerHTML += objeto_categoria
            
        });

    } else if (escopo == "list-form") {

        const lista_categorias_form = document.querySelector(".categorias-input-form")
        lista_categorias_form.innerHTML = ""

        querySnapshot.forEach((doc) => {
    
            var categoria = doc.data()

            let form_dropdown_option = `
                <option value="`+ categoria.Nome_categoria +`">`+ categoria.Nome_categoria +`</option>
            `
            

            lista_categorias_form.innerHTML += form_dropdown_option
            
        });

    }

}

async function initialize_events_listeners () {

    //Funções para os botôes dos cards
    async function detar_card_by_id (card_id) {
        const db = getFirestore(app) //Configurando o fire store
        await deleteDoc(doc(db, "Tarefa", card_id));
    }

    async function concluir_card_by_id (card_id) { //Melhorar a interface do usuário

        const db = getFirestore(app) //Configurando o fire store
        const doc_referencia = doc(db, "Tarefa", card_id);

        var dataAtual = new Date();
        var dia = dataAtual.getDate();
        var mes = dataAtual.getMonth() + 1;
        var ano = dataAtual.getFullYear()

        if (mes < 10 ) { //Formatando o valor do mês
            mes = "0" + mes
        }

        var data_completa = (dia + "/" + mes + "/" + ano)

        // Set the "capital" field of the city 'DC'
        await updateDoc(doc_referencia, {
            Data_fim: data_completa,
            Feito: true
        });

        alert("Tarefa concluida")
    }

    async function editar_card_by_id (card_id) {
        //Função para edição do card aqui
    }
    
    
    {   //Eventos de escuta do card
        var expandir = document.querySelectorAll(".expandir-tarefa");
        for (var i = 0; i < expandir.length; i++) {
            
            expandir[i].addEventListener('click', function(t) {
                
                var index_btn_expandir = t.currentTarget.querySelector('.index-btn-expandir').innerHTML;
                
                const card_detalhe = document.getElementById('container-detalhes-tarefa-'+ index_btn_expandir);
                const card_tarefa =  document.getElementById('card-tarefa-'+ index_btn_expandir);
                
                if(card_detalhe.style.display == 'none') {
                    card_detalhe.style.display =  "flex";
                    card_tarefa.style.height = "150px"
                }else {
                    card_detalhe.style.display =  "none";
                    card_tarefa.style.height = "60px"
                }
                
            })
        }
        
        var deletar  = document.querySelectorAll(".btn-deleta-tarefa");
        for (var j = 0; j < deletar.length; j++) { //Escuta para o botão de excluir o card
    
            deletar[j].addEventListener('click', async function(t) {
    
                var index_btn_deletar = t.currentTarget.querySelector('.index-btn-deletar').innerHTML;
                const card_id = document.getElementById('card-tarefa-id-'+ index_btn_deletar).innerHTML;
                await detar_card_by_id(card_id)
            })
        }
    
        var concluir = document.querySelectorAll(".concluir-tarefa");
        console.log("index concluir " + concluir.length);
        for (var k = 0; k < concluir.length; k++) { //Escuta para o botão de excluir o card
    
            concluir[k].addEventListener('click', async function(t) {
                var index_btn_concluir = t.currentTarget.querySelector('.index-btn-concluir').innerHTML;
                const card_id = document.getElementById('card-tarefa-id-'+ index_btn_concluir).innerHTML;
                console.log(card_id)
                concluir_card_by_id(card_id)
            })
        }
    
        var editar = document.querySelectorAll(".editar-tarefa");
        console.log("index editar " + editar.length);
        for (var l = 0; l < editar.length; l++) { //Escuta para o botão de excluir o card
    
            editar[l].addEventListener('click', async function(t) {
                var index_btn_editar = t.currentTarget.querySelector('.index-btn-editar').innerHTML;
                const card_id = document.getElementById('card-tarefa-id-'+ index_btn_editar).innerHTML;
                console.log(card_id)
            })
        }
    }

    {   //Eventos de escuta na lista de categorias
        let categoria = document.querySelectorAll(".select-categoria");
        console.log("qtde categoria " + categoria.length);

        for (var k = 0; k < categoria.length; k++) { //Escuta para o botão de excluir o card
    
            categoria[k].addEventListener('click', async function(t) {
                let nome_categoria  = t.currentTarget.querySelector('.nome-categoria').innerHTML;
                console.log(nome_categoria)

                await get_infos_app_tarefas(cuurrent_user_app(), "search", "categoria", nome_categoria)
            })
        }
    }
}
      
//Verificando status de login e iniciando a interface visual parra o usuário
const auth = getAuth();
onAuthStateChanged(auth, async (user) => { //Validando se o usuário está logado oou não
    if (user) {

        await get_user_infos(user)
        await get_infos_app_tarefas(user.uid, "init", "exe", "")
        await get_app_info_categorias("drop")
        await get_app_info_categorias("list-user")
        await get_app_info_categorias("list-form")
        await initialize_events_listeners()

    } else {
        window.location.href = "index.html"
    }
});


async function show_tarefa_forms () {

    const container_form_nova_tarefa = document.querySelector(".container-form-nova-tarefa")
    const btn_nova_tarefa_2 = document.querySelector(".btn-nova-tarefa")


    if(container_form_nova_tarefa.style.display == 'none') {
        container_form_nova_tarefa.style.display =  "flex";
        btn_nova_tarefa_2.innerHTML =  "FECHAR FORMS";
    }else {
        container_form_nova_tarefa.style.display =  "none";
        btn_nova_tarefa_2.innerHTML =  "NOVA TAREFA";

    }

    await initialize_events_listeners()
}

const btn_nova_tarefa = document.querySelector(".btn-nova-tarefa")
btn_nova_tarefa.addEventListener("click", async () => {
    await show_tarefa_forms()
    await get_infos_app_tarefas(cuurrent_user_app(), "init", "exe", "")
    await initialize_events_listeners()
})

async function cadastrar_tarefa (titulo, prioridade, desc, data_planejada, categoria) {

    console.log(titulo, prioridade, desc, data_planejada)


    try {

        const db = getFirestore(app) //Configurando o fire store
        const docRef = await addDoc(collection(db, "Tarefa"), {
            Categoria: categoria,
            Cor: "#W4WFAD16DA",
            Data_fim: "",
            Data_inicio: "09/05/2023",
            Data_planejada: data_planejada,
            Descricao: desc,
            Prioridade: prioridade,
            Titulo: titulo,
            Feito: false,
            User_ID: cuurrent_user_app()
        });

        console.log("Document written with ID: ", docRef.id);

    }

    catch (e) {
        console.error("Error adding document: ", e);
    }

}

const btn_cadastrar_tarefa = document.querySelector(".btn-cadastrar-tarefa")
btn_cadastrar_tarefa.addEventListener("click",  async () => {

    var my_titulo = document.getElementById("titulo").value
    var my_prioridade = document.getElementById("prioridade").value
    var my_desc = document.getElementById("descricao").value
    var my_data_planejada = document.getElementById("data_planejada").value
    var my_categoria = document.getElementById("categoria").value

    await cadastrar_tarefa(my_titulo, my_prioridade, my_desc, my_data_planejada, my_categoria)
})


{   //Filtros do usuário (menu bar)
    const btn_todos = document.querySelector(".todos-cards")//todos as tarefas
    btn_todos.addEventListener("click", async () => {
        await get_infos_app_tarefas(cuurrent_user_app(), "init", "exe", "")
        await initialize_events_listeners()
    })

    const btn_incompletos = document.querySelector(".cards-incompletos")// tarefas incompletas
    btn_incompletos.addEventListener("click", async () => {
        await get_infos_app_tarefas(cuurrent_user_app(), "search", "incompletos", "")
        await initialize_events_listeners()
    })

    const btn_feitos = document.querySelector(".cards-feitos")// tarefas feitas
    btn_feitos.addEventListener("click", async () => {
        await get_infos_app_tarefas(cuurrent_user_app(), "search", "feitos", "")
        await initialize_events_listeners()
    })

    const btn_prioritarios = document.querySelector(".cards-prioritarios")//tarefas prioritarias
    btn_prioritarios.addEventListener("click", async () => {
        await get_infos_app_tarefas(cuurrent_user_app(), "search", "prioritarios", "")
        await initialize_events_listeners()
    })
}

{   // Lista de categorias e cadastro de categorias
    const btn_nova_categoria = document.querySelector(".img-btn-mais-categorias")
    btn_nova_categoria.addEventListener("click", () => {

        const btn_fechar = document.querySelector(".img-btn-fechar-mais-categorias")
        const btn_mais = document.querySelector(".img-btn-mais-categorias")
        const lista_categorias = document.querySelector(".categories-list")
        const form_nova_categoria = document.querySelector(".form-nova-categoria")
        
     
        btn_fechar.style.display =  "block";
        form_nova_categoria.style.display =  "block";
        btn_mais.style.display =  "none";
        lista_categorias.style.display =  "none";
    })

    const btn_fechar_categoria = document.querySelector(".img-btn-fechar-mais-categorias")
    btn_fechar_categoria.addEventListener("click", async () => {

        const btn_fechar = document.querySelector(".img-btn-fechar-mais-categorias")
        const btn_mais = document.querySelector(".img-btn-mais-categorias")
        const lista_categorias = document.querySelector(".categories-list")
        const form_nova_categoria = document.querySelector(".form-nova-categoria")
        
     
        btn_fechar.style.display =  "none";
        form_nova_categoria.style.display =  "none";
        btn_mais.style.display =  "block";
        lista_categorias.style.display =  "block";

        await initialize_events_listeners()

    })

    const btn_salvar_categoria = document.querySelector(".adicionar-categoria")
    btn_salvar_categoria.addEventListener("click", async () => {

        var categoria = document.getElementById("nome_da_categoria").value
        var cor = document.getElementById("cor_da_categoria").value

        try {

            const db = getFirestore(app) //Configurando o fire store
            const docRef = await addDoc(collection(db, "Categorias"), {
                Nome_categoria: categoria,
                Cor: cor,
                User_ID: cuurrent_user_app()
            });
    
            console.log("Document written with ID: ", docRef.id);
    
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        var categoria = document.getElementById("nome_da_categoria").value = ""
        var cor = document.getElementById("cor_da_categoria").value = ""

        //Colocar um span para informar o cadastro da categoria

        alert("Categoria cadastrada!")

        get_app_info_categorias("list-user")
        get_app_info_categorias("list-form")
        get_app_info_categorias("drop")
    })
}

//Monitorando alterações no banco de dados
const db = getFirestore(app)
onSnapshot(collection(db, "Tarefa"), async () => {
    console.log("Alteração detectada");
    await get_infos_app_tarefas(cuurrent_user_app(), "init", "exe", "") //Tem que esperar os elementos do app carregarem para rodar o add event listenner
    await initialize_events_listeners ()
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



// testando seleção do dropdown

const filtro_categorias_drop = document.querySelector(".dropdown-categorias")
filtro_categorias_drop.addEventListener("change", async () => {
    var valor_selecionado = document.querySelector(".dropdown-categorias").value
    await get_infos_app_tarefas(cuurrent_user_app(), "search", "categoria", valor_selecionado)
    await initialize_events_listeners()
})

//Tela para a configuração do usuário


const btn_user = document.querySelector(".btn-user")
btn_user.addEventListener("click", async () => {

    const app_crenn_lista_tarefas = document.querySelector(".container-list-e-forms")
    const app_screen_user = document.querySelector(".app-screnn-user")
 
    app_crenn_lista_tarefas.style.display =  "none";
    app_screen_user.style.display =  "flex";
    
})
