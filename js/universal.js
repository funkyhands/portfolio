const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar')[0]

toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active')
})

const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () =>{
    if (window.pageYOffset > 100){
        toTop.classList.add("active");
    } else {
        toTop.classList.remove("active");
    }
})