{   //left responsive sidebar

    const btn_menu_side_bar = document.getElementById('btn-menu')
    btn_menu_side_bar.addEventListener('click', () => {
        let side_bar = document.getElementById('sidebar')
        side_bar.style.display = "flex"
    })

    const btn_fechar_menu_seidebar = document.getElementById('btn_fechar_menu_side_bar')
    btn_fechar_menu_seidebar.addEventListener('click', () => {
        let side_bar = document.getElementById('sidebar')
        side_bar.style.display = "none"
    })

}

 //right responsive menu

const btn_filter = document.getElementById('btn_filter_menu')
btn_filter.addEventListener('click', () => {
    let filter_menu = document.getElementById('right_responsive_filter')
    filter_menu.style.display = "flex"
})

const btn_fechar_filter_menu = document.getElementById('btn_fechar_responsive_menu')
btn_fechar_filter_menu.addEventListener('click', () => {
    let filter_menu = document.getElementById('right_responsive_filter')
    filter_menu.style.display = "none"
})

