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
      preloader.classList.add("d-none");
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

      let preloader = select('#preloader');
      if (preloader) {
        preloader.classList.remove("d-none");
      }

      var settings = {
        // "url": "https://7x24.konethub.com/api/soat/car/" + placaValue,
        "url": "http://localhost:8069/api/soat/car/" + placaValue + "/soat-sde/g-adds",
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Cookie": "frontend_lang=es; session_id=df9e04a9019a2c0d1107c1e3586cfcf8f87cd04a"
        },
      };

      $.ajax(settings).done(function (response) {
        if (preloader) {
          preloader.classList.add("d-none");
        }
        if (response.success !== true) {
          console.log(response);
          let modal = new bootstrap.Modal(document.getElementById('modal-message-id'));
          let title = select("#modal-title-id");
          let body = select("#modal-body-id");
          title.innerHTML = response.title;
          body.innerHTML = response.message;
          modal.show()
        } else {
          let url = "/soat_seguros_del_estado/precio/index.html?"
          if (window.location.hostname === "varuna7x24.github.io") {
            url = "/tusoatya/soat_seguros_del_estado/precio/index.html?" + new URLSearchParams(response.data).toString();
          } else {
            url = "/soat_seguros_del_estado/precio/index.html?" + new URLSearchParams(response.data).toString();
          }
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
    let preloader = select('#preloader');
    if (preloader) {
      preloader.classList.remove("d-none");
    }
    let VehicleRegistrationElements = document.querySelectorAll('.vehicleRegistration');
    let originalPriceElements = document.querySelectorAll('.originalPrice');
    let expirationDate = select("#expirationDateId");
    let validityFrom = select("#validityFromId");
    let vehicleBrandNameElements = document.querySelectorAll('.vehicleBrandName');
    let vehicleModelElements = document.querySelectorAll('.vehicleModel');
    let vehicleLineNameElements = document.querySelectorAll('.vehicleLineName');
    let vehicleEngineElements = document.querySelectorAll('.vehicleEngine');
    let wpNumber = select(".write-wp");
    let btnSpport = select("#btnSpportId");

    const formattedPrice = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(params.get('originalPrice'));

    // VehicleRegistrationElements.innerHTML = params.get('vehicleRegistration');
    VehicleRegistrationElements.forEach(function (elemento) {
      elemento.innerHTML = params.get('vehicleRegistration');
    });
    originalPriceElements.forEach(function (elemento) {
      elemento.innerHTML = formattedPrice;
    });
    vehicleBrandNameElements.forEach(function (elemento) {
      elemento.innerHTML = params.get('vehicleBrandName');
    });
    vehicleModelElements.forEach(function (elemento) {
      elemento.innerHTML = params.get('vehicleModel');
    });
    vehicleLineNameElements.forEach(function (elemento) {
      elemento.innerHTML = params.get('vehicleLineName');
    });
    vehicleEngineElements.forEach(function (elemento) {
      elemento.innerHTML = params.get('vehicleEngine');
    });
    expirationDate.innerHTML = params.get('expirationDate');
    validityFrom.innerHTML = params.get('validityFrom');
    var message = "Hola, ¿cómo estás? Estoy interesado(a) en el SOAT mi vehículo " + params.get('vehicleRegistration') + ".¿Me puedes ayudar? Gracias.";
    wpNumber.href = "https://api.whatsapp.com/send?phone=57" + params.get('wpNumber') + "&text=" + message;

    var settings = {
      // "url": "https://7x24.konethub.com/api/soat/car/" + placaValue,
      "url": "http://localhost:8069/api/soat/cities",
      "method": "GET",
      "timeout": 0,
      "headers": {
        "Cookie": "frontend_lang=es; session_id=df9e04a9019a2c0d1107c1e3586cfcf8f87cd04a"
      },
    };

    $.ajax(settings).done(function (response) {
      if (preloader) {
        preloader.classList.add("d-none");
      }
      if (response.success !== true) {
        console.log(response);
      } else {
        let cities = response.data;
        let citiesSelect = select("#cityId");
        cities.forEach(element => {
          let option = document.createElement("option");
          option.value = element.name + " - " + element.state;
          option.text = element.name + " - " + element.state;
          citiesSelect.appendChild(option);
        });

      }
    });

    var settings = {
      // "url": "https://7x24.konethub.com/api/soat/car/" + placaValue,
      "url": "http://localhost:8069/api/soat/banks",
      "method": "GET",
      "timeout": 0,
      "headers": {
        "Cookie": "frontend_lang=es; session_id=df9e04a9019a2c0d1107c1e3586cfcf8f87cd04a"
      },
    };

    $.ajax(settings).done(function (response) {
      if (preloader) {
        preloader.classList.add("d-none");
      }
      if (response.success !== true) {
        console.log(response);
      } else {
        let banks = response.data;
        let banksSelect = select("#bankId");
        banks.forEach(element => {
          let option = document.createElement("option");
          option.value = element.code;
          option.text = element.name;
          banksSelect.appendChild(option);
        });

      }
    });

  }

  /**
 * Send Form Data
 * */

  on('click', '#send-form-id', function (e) {
    let preloader = select('#preloader');
    if (preloader) {
      preloader.classList.remove("d-none");
    }
    let typeDocument = select("#typeDocumentId").value;
    let numberDocument = select("#numberDocumentId").value;
    let email = select("#emailId").value;
    let phone = select("#phoneId").value;
    let address = select("#addressId").value;
    let city = select("#cityId").value;
    let sexRadio = document.querySelector('input[name="sexRadio"]:checked').value;
    let placaValue = params.get('vehicleRegistration');
    let leadId = params.get('leadId');
    let checkoutStep1Elements = document.querySelectorAll('.checkout-step1');
    let checkoutStep2Elements = document.querySelectorAll('.checkout-step2');
    let soatCompany = document.getElementById("soatCompanyId");
    let namePartner = document.getElementById("namePartnerId");

    var settings = {
      // "url": "https://7x24.konethub.com/api/soat/car/" + placaValue,
      "url": "http://localhost:8069/api/soat/partner",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Cookie": "frontend_lang=es; session_id=df9e04a9019a2c0d1107c1e3586cfcf8f87cd04a"
      },
      "data": JSON.stringify({
        identification_type: typeDocument,
        identification: numberDocument,
        email_address: email,
        mobile_phone: phone,
        address: address,
        vehicle_circulation_city: city,
        gender: sexRadio,
        placa: placaValue,
        lead_id: leadId
      })
    };

    $.ajax(settings).done(function (response) {
      if (preloader) {
        preloader.classList.add("d-none");
      }
      if (response.success !== true) {
        console.log(response);
      } else {
        checkoutStep1Elements.forEach(function (elemento) {
          elemento.classList.add("d-none");
        });
        checkoutStep2Elements.forEach(function (elemento) {
          elemento.classList.remove("d-none");
        });
        soatCompany.innerHTML = response.data.soat_company;
        namePartner.innerHTML = response.data.name;
        console.log(response.data)
      }
    });
  });


  /**
   * Select method payment
   * */

  document.querySelectorAll('.card-method').forEach(function (card) {
    card.addEventListener('click', function (e) {
      let cardMethodPse = document.getElementById("card-method-pse");
      let circlBlankPse = cardMethodPse.querySelector("i.ri-checkbox-blank-circle-line");
      let circlePse = cardMethodPse.querySelector("i.ri-checkbox-circle-line");
      let cardMethodTc = document.getElementById("card-method-tc");
      let circlBlankTC = cardMethodTc.querySelector("i.ri-checkbox-blank-circle-line");
      let circleTc = cardMethodTc.querySelector("i.ri-checkbox-circle-line");
      let payMethod = document.getElementById("payMethodId");
      let modalPaymentTitle = document.getElementById("modal-title-id");


      if (this.id === "card-method-pse") {
        cardMethodPse.classList.add("select");
        cardMethodTc.classList.remove("select");
        circlBlankPse.classList.add("d-none");
        circlePse.classList.remove("d-none");
        circlBlankTC.classList.remove("d-none");
        circleTc.classList.add("d-none");
        payMethod.innerHTML = "PSE";
        modalPaymentTitle.innerHTML = "PSE";

      }
      if (this.id === "card-method-tc") {
        cardMethodTc.classList.add("select");
        cardMethodPse.classList.remove("select");
        circlBlankPse.classList.remove("d-none");
        circlePse.classList.add("d-none");
        circlBlankTC.classList.add("d-none");
        circleTc.classList.remove("d-none");
        payMethod.innerHTML = "Tarjeta de crédito";
        modalPaymentTitle.innerHTML = "Tarjeta de Crédito/Debito";

      }
    });
  });

  function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  /**
 * Payment
 * */

  on('click', '#actionPayId', function (e) {
    let modal = new bootstrap.Modal(document.getElementById('modalPayId'));
    let modalPaymentBody = select("#modalBodyPayId");
    let modalSnipperPay = select("#modalSnipperPayId");
    modal.show();
    console.log(modalPaymentBody);
    setTimeout(function () {
      modalPaymentBody.innerHTML = "¡Ocurrió un error!, pronto un asesor te contactará para terminar el proceso de compra.";
      modalSnipperPay.classList.add("d-none");
    }, 2000);


  });


})()


