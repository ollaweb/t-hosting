export default function useBurger() {
    const body = document.body;
    const burger = document.querySelector(".burger");
    const burgerStrips = document.querySelector(".burger__items");
    const menu = document.querySelector(".menu");
    const headerOverlay = document.querySelector(".header-overlay");
    const menuItemLinks = document.querySelectorAll(".menu__item a");

    function openBurgerMenu() {
        burgerStrips.classList.add("active");
        menu.classList.add("active");
        body.classList.add("locked");
        headerOverlay.classList.add("active");
    }
    function closeBurgerMenu() {
        burgerStrips.classList.remove("active");
        menu.classList.remove("active");
        body.classList.remove("locked");
        headerOverlay.classList.remove("active");
    }
    function closeByClickOnOverlay() {
        headerOverlay.addEventListener("click", (event) => {
            event.stopPropagation();
            if (event.target === headerOverlay) {
                closeBurgerMenu();
            }
        });
    }
    function closeByClickOnMenuItem() {
        menu.addEventListener("click", (event) => {
            event.stopPropagation();
            menuItemLinks.forEach(item => {
                if ((event.target === item)) {
                    closeBurgerMenu();
                }
            });

        });
    }
    function clickOnBurger() {
        burger.addEventListener("click", (event) => {
            event.stopPropagation();
            if (!burger.classList.contains("active")) {
                openBurgerMenu();
                closeByClickOnOverlay();
                closeByClickOnMenuItem();
            } else {
                closeBurgerMenu();
            }
        });
    }
    clickOnBurger();
}