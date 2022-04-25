export default function useBurger() {
    const body = document.body;
    const burger = document.querySelector(".burger");
    const headerBlock = document.querySelector(".header__block");
    const headerNav = document.querySelector(".header__nav");
    const headerOverlay = document.querySelector(".header-overlay");
    const headerItemLinks = document.querySelectorAll(".header__link a");

    function openBurgerMenu() {
        burger.classList.add("active");
        headerBlock.classList.add("active");
        headerNav.classList.add("active");
        body.classList.add("locked");
        headerOverlay.classList.add("active");
    }
    function closeBurgerMenu() {
        burger.classList.remove("active");
        headerBlock.classList.remove("active");
        headerNav.classList.remove("active");
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
        headerNav.addEventListener("click", (event) => {
            event.stopPropagation();
            headerItemLinks.forEach(item => {
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