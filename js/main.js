(function(html) {
  "use strict";

  html.className = html.className.replace(/\bno-js\b/g, "") + "js";


  /*   ANIMATIONS    */

  const tl = anime
    .timeline({
      easing: "easeInOutCubic",
      duration: 800,
      autoplay: false,
    })
    .add({
      targets: "#loader",
      opacity: 0,
      duration: 1000,
      begin: function(anim) {
        window.scrollTo(0, 0);
      },
    })
    .add({
      targets: "#preloader",
      opacity: 0,
      complete: function(anim) {
        document.querySelector("#preloader").style.visibility = "hidden";
        document.querySelector("#preloader").style.display = "none";
      },
    })
    .add(
      {
        targets: ".header",
        translateY: [-100, 0],
        opacity: [0, 1],
      },
      "-=200"
    )
    .add({
      targets: [".intro .text-pretitle", ".intro .text-huge-title"],
      translateX: [100, 0],
      opacity: [0, 1],
      delay: anime.stagger(400),
    })
    .add({
      targets: [".hexagon", ".hexagon2"],
      keyframes: [
        { opacity: [0, 0.3] },
        {
          opacity: [0.3, 0.1],
          delay: anime.stagger(100, { direction: "reverse" }),
        },
      ],
      delay: anime.stagger(100, { direction: "reverse" }),
    })
    .add({
      targets: ".intro-services li",
      translateX: [-50, 0],
      opacity: [0, 1],
      delay: anime.stagger(100, { direction: "reverse" }),
    })
    .add(
      {
        targets: ".scrolldown",
        translateY: [100, 0],
        opacity: [0, 1],
      },
      "-=800"
    );


  /*   PRELOADER    */

  const caPreloader = function() {
    const preloader = document.querySelector("#preloader");
    if (!preloader) return;

    window.addEventListener("load", function() {
      document.querySelector("html").classList.remove("preload");
      document.querySelector("html").classList.add("loaded");

      document.querySelectorAll(".animated").forEach(function(item) {
        item.classList.remove("animated");
      });

      tl.play();
    });
  };


  /*   MOBILE MENU    */

  const caMobileMenu = function() {
    const toggleButton = document.querySelector(".mobile-menu-toggle");
    const mainNavWrap = document.querySelector(".main-nav-wrap");
    const siteBody = document.querySelector("body");

    if (!(toggleButton && mainNavWrap)) return;

    toggleButton.addEventListener("click", function(event) {
      event.preventDefault();
      toggleButton.classList.toggle("is-clicked");
      siteBody.classList.toggle("menu-is-open");
    });

    mainNavWrap.querySelectorAll(".main-nav a").forEach(function(link) {
      link.addEventListener("click", function(event) {
        if (window.matchMedia("(max-width: 800px)").matches) {
          toggleButton.classList.toggle("is-clicked");
          siteBody.classList.toggle("menu-is-open");
        }
      });
    });

    window.addEventListener("resize", function() {
      if (window.matchMedia("(min-width: 801px)").matches) {
        if (siteBody.classList.contains("menu-is-open"))
          siteBody.classList.remove("menu-is-open");
        if (toggleButton.classList.contains("is-clicked"))
          toggleButton.classList.remove("is-clicked");
      }
    });
  };


  /*   ACTIVE MENU LINKS AT PAGESCROLL   */

  const caScrollSpy = function() {
    const sections = document.querySelectorAll(".target");

    window.addEventListener("scroll", navHighlight);

    function navHighlight() {
      let scrollY = window.pageYOffset;

      sections.forEach(function(current) {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute("id");

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          document
            .querySelector(".main-nav a[href*=" + sectionId + "]")
            .parentNode.classList.add("current");
        } else {
          document
            .querySelector(".main-nav a[href*=" + sectionId + "]")
            .parentNode.classList.remove("current");
        }
      });
    }
  };


  /*   VIEWPORT ANIMATIONS    */

  const caViewAnimate = function() {
    const blocks = document.querySelectorAll("[data-animate-block]");

    window.addEventListener("scroll", viewportAnimation);

    function viewportAnimation() {
      let scrollY = window.pageYOffset;

      blocks.forEach(function(current) {
        const viewportHeight = window.innerHeight;
        const triggerTop =
          current.offsetTop + viewportHeight * 0.2 - viewportHeight;
        const blockHeight = current.offsetHeight;
        const blockSpace = triggerTop + blockHeight;
        const inView = scrollY > triggerTop && scrollY <= blockSpace;
        const isAnimated = current.classList.contains("animated");

        if (inView && !isAnimated) {
          anime({
            targets: current.querySelectorAll("[data-animate-el]"),
            opacity: [0, 1],
            translateY: [100, 0],
            delay: anime.stagger(400, { start: 200 }),
            duration: 800,
            easing: "easeInOutCubic",
            begin: function(anim) {
              current.classList.add("animated");
            },
          });
        }
      });
    }
  };


  /*   SWIPER    */

  const caSwiper = function() {
    const mySwiper = new Swiper(".swiper-container", {
      slidesPerView: 1,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        401: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        801: {
          slidesPerView: 2,
          spaceBetween: 32,
        },
        1201: {
          slidesPerView: 2,
          spaceBetween: 80,
        },
      },
    });
  };


  /*   LIGHTBOX    */

  const caLightbox = function() {
    const folioLinks = document.querySelectorAll(".portfolio-list-item-link");
    const modals = [];

    folioLinks.forEach(function(link) {
      let modalbox = link.getAttribute('href');
      let instance = basicLightbox.create(
          document.querySelector(modalbox),
          {
              onShow: function(instance) {
                  document.addEventListener("keydown", function(event) {
                      event = event || window.event;
                      if (event.keyCode === 27) {
                          instance.close();
                      }
                  });
              }
          }
      )
      modals.push(instance);
  });

  folioLinks.forEach(function(link, index) {
      link.addEventListener("click", function(event) {
          event.preventDefault();
          modals[index].show();
      });
  });

};


  /*   ALERT BOXES    */

  const ssAlertBoxes = function() {
    const boxes = document.querySelectorAll('.alert-box');

    boxes.forEach(function(box){
        box.addEventListener('click', function(event) {
        if (event.target.matches(".alert-box-close")) {
          eevent.stopPropagation();
          event.target.parentElement.classList.add("hideit");

          setTimeout(function(){
              box.style.display = "none";
          }, 500)
      }    
  });
})
}; 


  /*   SMOOTH SCROLL    */

  const caMoveTo = function() {
    const easeFunctions = {
      easeInQuad: function(t, b, c, d) {
        t /= d;
        return c * t * t + b;
      },
      easeOutQuad: function(t, b, c, d) {
        t /= d;
        return -c * t * (t - 2) + b;
      },
      easeInOutQuad: function(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      },
      easeInOutCubic: function(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t * t + b;
        t -= 2;
        return (c / 2) * (t * t * t + 2) + b;
      },
    };

    const triggers = document.querySelectorAll(".smoothscroll");

    const moveTo = new MoveTo(
      {
        tolerance: 0,
        duration: 1000,
        easing: "easeInOutCubic",
        container: window,
      },
      easeFunctions
    );

    triggers.forEach(function(trigger) {
      moveTo.registerTrigger(trigger);
    });
  };

  
  /*   INITIALIZE    */

  (function caInit() {
    caPreloader();
    caMobileMenu();
    caScrollSpy();
    caViewAnimate();
    caSwiper();
    caLightbox();
    caAlertBoxes();
    caMoveTo();
  })();
})(document.documentElement);
