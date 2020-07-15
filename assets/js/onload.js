let map;

$(document).ready(function(){

    let $hamburger = $(".hamburger");
    $hamburger.on("click", function(e) {
      $(".hamburger, #mobile_menu").toggleClass("is-active");
    });
    
    let slider = $("#lightSlider").lightSlider({
        item: 1,
        slideMove: 1,
        slideMargin: 0,
        autoWidth: false,
        controls: false,
        prevHTML: '<a class="prev_btn"></a>',
        nextHTML: '<a class="next_btn"></a>',
    });

    $('.prev_btn').click(function(){
        slider.goToPrevSlide(); 
    });
    $('.next_btn').click(function(){
        slider.goToNextSlide(); 
    });

   let slider2 = $("#lightSlider2").lightSlider({
        item: 3,
        slideMove: 1,
        slideMargin: 30,
        autoWidth: false,
        controls: true,
        prevHTML: '<a class="prev_btn"></a>',
        nextHTML: '<a class="next_btn"></a>',
        responsive : [
            {
                breakpoint:760,
                settings: {
                    item:2,
                    slideMove:1,
                    slideMargin:10,
                  }
            },
            {
                breakpoint:530,
                settings: {
                    item:1,
                }
            }
        ]
            
    });

    $('.prev_btn2').click(function(){
        slider2.goToPrevSlide(); 
    });
    $('.next_btn2').click(function(){
        slider2.goToNextSlide(); 
    });

    map = L.map('map').setView([40.656620, -73.903810], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    let newIcon = new L.Icon ({
        iconUrl: 'assets/plugins/leaflet_map/images/custom-pin.png',
        shadowUrl: 'assets/plugins/leaflet_map/images/custom-shadow.png'
    });

    L.marker([40.672114, -73.920072], {icon: newIcon}).addTo(map);

    map.scrollWheelZoom.disable();

    $("#map").bind('mousewheel DOMMouseScroll', function (event) {
    event.stopPropagation();
        if (event.ctrlKey == true) {
            event.preventDefault();
            map.scrollWheelZoom.enable();
            setTimeout(function(){
                map.scrollWheelZoom.disable();
            }, 1000);
        } else {
            map.scrollWheelZoom.disable();
        }
    });


    $(window).bind('mousewheel DOMMouseScroll', function (event) {
        $('#map').removeClass('map-scroll');
    })
  
    $('.btn3_wrap').click(function(){
        if($(this).hasClass('active')){
            $(this).removeClass('active');
        } else {
            $(this).addClass('active');
        }
    });

    let $menu = $("#sticky_menu");
    $(window).scroll(function(){
        if ( $(this).scrollTop() > 100 && $menu.hasClass("default") ){
        $menu.removeClass("default").addClass("fixed");
        } else if($(this).scrollTop() <= 100 && $menu.hasClass("fixed")) {
        $menu.removeClass("fixed").addClass("default");
        }
    });

    let $page = $('html, body');
    $('a[href*="#"]').click(function() { 
        $page.animate({
        scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
        $(".hamburger, #mobile_menu").removeClass("is-active");
        return false;
    });

    let lazyLoadInstance = new LazyLoad({
        elements_selector: ".lazy"
      });

});

window.onscroll = function() {
    myFunction()
  };
  
  let menu = document.getElementById("sticky_menu");
  let sticky = menu.offsetTop;
  
  function myFunction() {
    if (window.pageYOffset > sticky) {
      menu.classList.add("sticky");
    } else {
      menu.classList.remove("sticky");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    let lazyloadImages;    
  
    if ("IntersectionObserver" in window) {
      lazyloadImages = document.querySelectorAll(".lazy");
      let imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            let image = entry.target;
            image.classList.remove("lazy");
            imageObserver.unobserve(image);
          }
        });
      });
  
      lazyloadImages.forEach(function(image) {
        imageObserver.observe(image);
      });
    } else {  
      var lazyloadThrottleTimeout;
      lazyloadImages = document.querySelectorAll(".lazy");
      
      function lazyload () {
        if(lazyloadThrottleTimeout) {
          clearTimeout(lazyloadThrottleTimeout);
        }    
  
        lazyloadThrottleTimeout = setTimeout(function() {
          var scrollTop = window.pageYOffset;
          lazyloadImages.forEach(function(img) {
              if(img.offsetTop < (window.innerHeight + scrollTop)) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
              }
          });
          if(lazyloadImages.length == 0) { 
            document.removeEventListener("scroll", lazyload);
            window.removeEventListener("resize", lazyload);
            window.removeEventListener("orientationChange", lazyload);
          }
        }, 20);
      }
  
      document.addEventListener("scroll", lazyload);
      window.addEventListener("resize", lazyload);
      window.addEventListener("orientationChange", lazyload);
    }
  })