import $ from "jquery";
$(function () {
    $("[data-scroll]").on("click", function (e) {
        e.preventDefault();

        let elementId = $(this).data("scroll");
        let elementOffset = $(elementId).offset().top;

        if ($(window).width() < "768") {
            $("html, body").animate({
                scrollTop: elementOffset - 50
            }, 700);
        } else {
            $("html, body").animate({
                scrollTop: elementOffset
            }, 700);
        }
    });
});