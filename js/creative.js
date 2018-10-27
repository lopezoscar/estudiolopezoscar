(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 56)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 57
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top >= 0) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Scroll reveal calls
  window.sr = ScrollReveal();

  sr.reveal('.sr-icon-1', {
    delay: 200,
    scale: 0
  });
  sr.reveal('.sr-icon-2', {
    delay: 400,
    scale: 0
  });
  sr.reveal('.sr-icon-3', {
    delay: 600,
    scale: 0
  });
  sr.reveal('.sr-icon-4', {
    delay: 800,
    scale: 0
  });
  sr.reveal('.sr-button', {
    delay: 200,
    distance: '15px',
    origin: 'bottom',
    scale: 0.8
  });
  sr.reveal('.sr-contact-1', {
    delay: 200,
    scale: 0
  });
  sr.reveal('.sr-contact-2', {
    delay: 400,
    scale: 0
  });

  // Magnific popup calls
  $('.popup-gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1]
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
    }
  });

})(jQuery); // End of use strict


var $form = $('form#contactForm')
var url = 'https://script.google.com/macros/s/AKfycbzN1glHFsWEauliA3Skb5Ll5vf2vwYYjil2ra8o2vHOW2xnIUfO/exec'

$form.validate({
  errorClass: "invalid-feedback",
  highlight: function(element, errorClass) {
    $(element).removeClass(errorClass)
  },
  errorElement: "div",
  onsubmit: false,
  rules: {
    // simple rule, converted to {required:true}
    Nombre: {
      required: true,
      minlength: 3
    },
    Tel: {
      required: true,
      minlength: 8
    },
    Email: {
      email: true
    },
    Asunto: {
      required: true,
      minlength: 3,
      maxlength: 100
    },
    Mensaje: {
      required: true,
      minlength: 3,
      maxlength: 5000
    }
  },
  messages: {
    Nombre: {
      required: "Por favor ingresa un nombre",
      minlength: jQuery.validator.format("Por favor ingresa un nombre. Mínimo {0} caracteres")
    },
    Tel: {
      required: "Por favor ingresa un número de teléfono o celular",
      minlength: jQuery.validator.format("Por favor ingresa un número de teléfono o celular. Mínimo {0} caracteres")
    },
    Email: {
      email: "Por favor ingresa email válido"
    },
    Asunto: {
      required: "Por favor ingresa un asunto",
      minlength: jQuery.validator.format("Por favor ingresa un asunto. Mínimo {0} caracteres"),
      maxlength: "Máximo {0} caracteres"
    },
    Mensaje: {
      required: "Por favor ingresa un mensaje",
      minlength: jQuery.validator.format("Por favor ingresa un mensaje. Mínimo {0} caracteres"),
      maxlength: "Máximo {0} caracteres"
    }
  }
});

var submitBtn = $('#submitForm')
var okMessageComponent = $("#okMessage")
var errorMessageComponent = $("#errorMessage")

submitBtn.on('click', function(e) {
  e.preventDefault();
  if($form.valid()){
    submitBtn.addClass("d-none");
    $("#loadingForm").addClass("d-block").removeClass('d-none');
    var jqxhr = $.ajax({
      url: url,
      method: "GET",
      dataType: "json",
      data: $form.serializeObject()
    }).done(function(response){
      console.log('result', response);
      if(response.result === "success"){
        $("#loadingForm").addClass("d-none").removeClass('d-block');
        submitBtn.addClass("d-block");  
        okMessageComponent.addClass('d-block');
        // errorMessageComponent.addClass('d-block');
        $form.addClass('d-none')
      }
    }).fail(function(err){
      console.log('err', err)
      $("#loadingForm").addClass("d-none").removeClass('d-block');
      submitBtn.addClass("d-block");
      errorMessageComponent.addClass('d-block');
    });
  }
})

function initMap(){
    var map;

    var style = [
        {
        stylers: [
            { saturation: "-100" },
            { lightness: "20" }
        ]
        },{
        featureType: "poi",
        stylers: [
            { visibility: "off" }
        ]
        },{
        featureType: "transit",
        stylers: [
            { visibility: "off" }
        ]
        },{
        featureType: "road",
        stylers: [
            { lightness: "50" },
            { visibility: "on" }
        ]
        },{
        featureType: "landscape",
        stylers: [
            { lightness: "50" }
        ]
        }
    ]

    var options = {
        zoom: 7,
        center:  new google.maps.LatLng(45.50867, -73.553992),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
    };

    map = new google.maps.Map($('#map')[0], options);
    map.setOptions({
        styles: style
    });
}

