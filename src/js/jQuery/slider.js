import $ from "jquery";
import slick from "slick-carousel";
$(".feedback-slider").slick({
    arrows: false,
    dots: true,
    speed: 250,
    slidesToShow: 1,
    touchThreshold: 20,
    autoplay: true,
    autoplaySpeed: 5000,
    touchMove: false,
    mobileFirst: true,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                speed: 350,
                draggable: false,
            }
        }

    ]
});