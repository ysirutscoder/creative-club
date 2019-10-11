$("span .slider .round").click(function () {
    $(".main-background").toggleClass("main-background-night");
});

$(document).ready(function ($) {

    // init page


    var circle = $('.all-services__item-circle');
    var allItems = $('.services-circle__item');
    var allImages = $('.services-images__item');

    allItems.each(function () {
        $(this).addClass('ready');
    });

    allItems.on('click', function () {

        if ($(this).hasClass('ready')) {

            var circleColor = $(this).data('color');
            var animationItem = $(allImages).eq($(this).index());

            allImages.hide();
            allItems.removeClass('active-item ready').addClass('animated');
            $(this).addClass('active-item');

            $('.services-images__item-wrapper').css('opacity', 0);
            $('.services-images__item-time').removeClass('show');

            $(animationItem).show();
            $(animationItem).find($('.services-images__item-wrapper')).css('opacity', 1);

            circle.removeClass('pump');
            setTimeout(function () {
                circle.addClass('pump');
                circle.css('background', circleColor);
            }, 300);

            setTimeout(function () {
                $('.services-images__item-time').addClass('show');
                allItems.removeClass('animated').addClass('ready');
            }, 1000);
        }
    });

    setTimeout(function () {
        var rand = Math.floor(Math.random() * 10) + 1; // random number
        $('.services-circle__item').eq(rand).click();
        $('.services-action').addClass('show');
    }, 2000);
});

$('.navbar__hamburger').click(() => {
    $('.navbar__right-side').toggleClass('navbar__right-side--visible');
});