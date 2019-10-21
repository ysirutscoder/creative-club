// $("span .slider .round").click(function () {
//     $(".main-background").toggleClass("main-background-night")
// });

$(document).ready(function ($) {

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

$('.navbar__hamburger').click(e => {
    e.preventDefault();
    $('.navbar__right-side').toggleClass('navbar__right-side--visible');
    $('.navbar__hamburger').toggleClass('navbar__hamburger--close');
});

$('.navbar__item').click(e => {
    e.preventDefault();
    $('.navbar__right-side').removeClass('navbar__right-side--visible');
    $('.navbar__hamburger').removeClass('navbar__hamburger--close');
});

if (window.screen.width > 1199) {
    let mySlider = slider('.slides');
    let navItems = document.querySelectorAll('.navbar__item');

    for (let id = 0; id < navItems.length; id++) {
        document.querySelectorAll('.navbar__item')[id].addEventListener('click', () => {
            mySlider.gotoSlide('#slide' + id);
        }, { passive: false });
    }

    document.querySelector('.navbar__logo').addEventListener('click', e => {
        mySlider.gotoSlide('#slide0');
    }, { passive: false });
} else {
    document.body.style.overflowY = 'scroll';
    document.body.style.backgroundColor = '#fbf9ed';
}

// $(document).ready(function(){ $('.slider').bxSlider(); });