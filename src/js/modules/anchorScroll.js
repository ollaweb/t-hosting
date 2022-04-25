import $ from "jquery";
$(function () {
    $("[data-scroll]").on("click", function (e) {
        e.preventDefault();

        let elementId = $(this).data("scroll");
        let elementOffset = $(elementId).offset().top;

        $("html, body").animate({
            scrollTop: elementOffset
        });
        console.log(elementId);
        console.log(elementOffset);
    });
});