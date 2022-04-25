export default function dropdown() {
    const dropdown = document.getElementById("dropdown");
    const dropdownHeader = dropdown.querySelector(".dropdown");
    const dropdownWrapper = dropdown.querySelector(".dropdown__wrapper");
    dropdown.addEventListener("click", (e) => {
        console.log(e.target)
        dropdownHeader.classList.toggle("active");
        dropdownWrapper.classList.toggle("active");
        if (dropdownHeader.classList.contains("active")) {
            window.addEventListener("click", (e) => {
                if (!e.target.closest(".dropdown__wrapper") && !e.target.closest(".dropdown")) {
                    dropdownHeader.classList.remove("active");
                    dropdownWrapper.classList.remove("active");
                }
            });
        }
    });
}