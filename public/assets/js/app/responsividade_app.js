{   //Funções de estilo
    function estilo_app() {
        const my_body_app = document.getElementsByTagName("body")
        const side_bar = document.querySelector(".sidebar")
        const app_screnn = document.querySelector(".app-screnn")

        let btn_menu = document.querySelector(".menu-side-bar")

        if (my_body_app[0].offsetWidth <= 1200) {
            //alert("menor que 1200")
            btn_menu.style.display = "flex"
            side_bar.style.display = "none"
            app_screnn.style.width = "100%"
        } else {
            side_bar.style.display = "flex"
            btn_menu.style.display = "none"
            
        }
    }
}



window.addEventListener('DOMContentLoaded', ()=> {
    //Eventos
    const btn_menu_event = document.getElementById("btn-menu")
    console.log(btn_menu_event)
    btn_menu_event.addEventListener("click", ()=> {
        alert("Botão apertado")
    })
    estilo_app()
})


window.addEventListener('resize', function() {
    estilo_app()
});