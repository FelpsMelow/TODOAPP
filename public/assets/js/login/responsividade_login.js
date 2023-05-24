{   //Funções de estilo
    function estilo_card_login() {
        const card_login = document.querySelector('.card-login');
        const submit_form_login = document.querySelector('.submit-form-login')
        const btn_entrar = document.querySelector(".btn-login")
        if (card_login.offsetWidth <= 275) {
            //submit_form_login.style.display = "flex"
            //submit_form_login.style.flexDirection = "column"
        } else {
            //submit_form_login.style.flexDirection = "row"
            //btn_entrar.style.margin = "0"
        }
    }
}



window.addEventListener('DOMContentLoaded', ()=> {

})


window.addEventListener('resize', function() {
    estilo_card_login()
});