/**
* Template Name: Bootslander
* Updated: Mar 10 2023 with Bootstrap v5.2.3
* Template URL: https://bootstrapmade.com/bootslander-free-bootstrap-landing-page-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 20
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate gallery lightbox 
   */
  const galleryLightbox = GLightbox({
    selector: '.gallery-lightbox'
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

  /**
   * Query Placa
   */
  on('click', '#buy-soat-id', function (e) {
    let placaInput = select("#placa-id");
    if (placaInput) {
      let placaValue = placaInput.value;
      console.log("Placa:", placaValue);

      var settings = {
        "url": "http://localhost:8069/api/soat/car/" + placaValue,
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Cookie": "frontend_lang=es; session_id=df9e04a9019a2c0d1107c1e3586cfcf8f87cd04a"
        },
      };

      $.ajax(settings).done(function (response) {
        if (response.success !== true) {
          console.log(response);
          let modal = new bootstrap.Modal(document.getElementById('modal-message-id'));
          let title = select("#modal-title-id");
          let body = select("#modal-body-id");
          title.innerHTML = response.title;
          body.innerHTML = response.message;
          modal.show()
        } else {
          const url = "/soat_seguros_del_estado/precio/index.html?" + new URLSearchParams(response.data).toString();
          window.location.href = url;
        }
      });
    }
  }, true)

  /**
   * Get Data from Form
   */
  const params = new URLSearchParams(window.location.search);
  if (params.get('id') !== false) {
    let fVehicleRegistration = select("#fVehicleRegistrationId");
    let originalPrice = select("#originalPriceId");
    let expirationDate = select("#expirationDateId");
    let validityFrom = select("#validityFromId");
    let vehicleRegistration = select("#vehicleRegistrationId");
    let vehicleBrandName = select("#vehicleBrandNameId");
    let vehicleModel = select("#vehicleModelId");
    let vehicleLineName = select("#vehicleLineNameId");
    let vehicleEngine = select("#vehicleEngineId");
    let wpNumber = select(".write-wp");

    const formattedPrice = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(params.get('originalPrice'));

    fVehicleRegistration.innerHTML = params.get('vehicleRegistration');
    originalPrice.innerHTML = formattedPrice;
    vehicleRegistration.innerHTML = params.get('vehicleRegistration');
    vehicleBrandName.innerHTML = params.get('vehicleBrandName');
    vehicleModel.innerHTML = params.get('vehicleModel');
    vehicleLineName.innerHTML = params.get('vehicleLineName');
    vehicleEngine.innerHTML = params.get('vehicleEngine');
    expirationDate.innerHTML = params.get('expirationDate');
    validityFrom.innerHTML = params.get('validityFrom');
    var message = "Hola, ¿cómo estás?%0AEstoy interesado(a) en el SOAT mi vehículo " + params.get('vehicleRegistration') + ".%0A¿Me puedes ayudar?%0AGracias.";
    wpNumber.href = "https://api.whatsapp.com/send?phone=57" + params.get('wpNumber') + "&text=" + message;
  }


})()

