export default function accordion() {
    const accordions = document.querySelectorAll(".accordion__item");
    accordions.forEach(accordion => {
        accordion.addEventListener("click", () => {
            accordion.classList.toggle("active");
        });
    });
}