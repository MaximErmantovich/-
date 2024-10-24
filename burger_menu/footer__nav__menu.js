const nav = document.querySelector('.footer__nav')
const buttonNav = document.querySelector('.nav__arrow')

const products = document.querySelector('.footer__products')
const buttonProducts = document.querySelector('.products__arrow')

const contacts = document.querySelector('.footer__contacts')
const buttonContacts = document.querySelector('.contacts__arrow')

if (nav && buttonNav) {

    buttonNav.addEventListener('click', () => {

        nav.classList.toggle('active')
        buttonNav.classList.toggle('active')

    } )

    menu.querySelectorAll('.list__link').forEach(link => {

        link.addEventListener('click', () => {

            nav.classList.remove('active')
            buttonNav.classList.remove('active')

        })

    })


}

if (products && buttonProducts) {

    buttonProducts.addEventListener('click', () => {

        products.classList.toggle('active')
        buttonProducts.classList.toggle('active')

    } )

    menu.querySelectorAll('.list__link').forEach(link => {

        link.addEventListener('click', () => {

            products.classList.remove('active')
            buttonProducts.classList.remove('active')

        })

    })


}

if (contacts && buttonContacts) {

    buttonContacts.addEventListener('click', () => {

        contacts.classList.toggle('active')
        buttonContacts.classList.toggle('active')

    } )

    menu.querySelectorAll('.list__link').forEach(link => {

        link.addEventListener('click', () => {

            contacts.classList.remove('active')
            buttonContacts.classList.remove('active')

        })

    })


}
