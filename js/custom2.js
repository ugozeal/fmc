/*================================
| | | | | | Navigation | | | | | |
=====================================*/
// Show and hide white nav bar
$(function() {
  // Show/hide nav on page load
  showHideNav();

  $(window).scroll(function() {
    // Show/hide nav on page scroll
    showHideNav();
  });

  function showHideNav() {
    if ($(window).scrollTop() > 50) {
      // Show white nav bar
      $("nav").addClass("white-nav-top");

      // Show back to top btn
      $("#back-to-top").fadeIn();

      // Show dark logo
      $(".navbar-brand img").attr("src", "img/logo/log_dark.png");
    } else {
      $("nav").removeClass("white-nav-top");

      // Show normal logo
      $(".navbar-brand img").attr("src", "img/logo/logo_light.png");

      // Hide back to top btn
      $("#back-to-top").fadeOut();
    }
  }
});

/*===================================
| | | | | | PreLoader | | | | | |
=====================================*/

$(window).on("load", function() {
  $("#status").fadeOut();
  $("#preloader")
    .delay(350)
    .fadeOut("slow");
});

/*=================================
| | | | | | Testimonial | | | | | |
=====================================*/
$(function() {
  $("#testimonial-slider").owlCarousel({
    items: 1,
    autoplay: true,
    smartSpeed: 700,
    loop: true,
    autoplayHoverPause: true,
    nav: true,
    dots: false,
    navText: [
      '<i class="fa fa-angle-left"></i>',
      '<i class="fa fa-angle-right"></i>'
    ]
  });
});

/*=================================
| | | | | | Partners | | | | | |
=====================================*/
$(function() {
  $("#partners-list").owlCarousel({
    items: 6,
    autoplay: true,
    smartSpeed: 700,
    loop: true,
    autoplayHoverPause: true,
    nav: true,
    dots: false,
    navText: [
      '<i class="fa fa-angle-left"></i>',
      '<i class="fa fa-angle-right"></i>'
    ],
    responsive: {
      // breakpoint from 0 up
      0: {
        items: 2
      },
      // breakpoint from 480 up
      480: {
        items: 3
      },
      // breakpoint from 768 up
      768: {
        items: 6
      }
    }
  });
});

/*=================================
| | | | | | Animation | | | | | |
=====================================*/
// Animate on Scroll
$(function() {
  new WOW().init();
});
// Home Animation
$(window).on("load", function() {
  $("#home-heading-1").addClass("animated fadeInDown");
  $("#home-heading-2").addClass("animated fadeInLeft");
  $("#home-text").addClass("animated zoomIn");
  $("#home-btn").addClass("animated zoomIn");
  $("#arrow-down i").addClass("animated fadeInDown infinite");
});

// Smooth Scrolling
$(function() {
  $("a.smooth-scroll").click(function(event) {
    event.preventDefault();
    // Get Section Id
    var section_id = $(this).attr("href");
    $("html, body").animate(
      {
        scrollTop: $(section_id).offset().top - 64
      },
      1250,
      "easeInOutExpo"
    );
  });
});
