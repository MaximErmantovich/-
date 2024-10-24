const menu = document.querySelector('.header__nav')
const menuBurger = document.querySelector('.header__burger-btn')
const body = document.body

if (menu && menuBurger) {

    menuBurger.addEventListener('click', () => {

        menu.classList.toggle('active')
        menuBurger.classList.toggle('active')
        body.classList.toggle('lock')

    } )

    menu.querySelectorAll('.header__link').forEach(link => {

        link.addEventListener('click', () => {

            menu.classList.remove('active')
            menuBurger.classList.remove('active')
            body.classList.remove('lock')

        })

    })


}
