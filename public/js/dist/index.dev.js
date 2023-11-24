"use strict";

var _axios = _interopRequireDefault(require("axios"));

require("@babel/polyfill");

var _login = require("./login");

var _mapbox = require("./mapbox");

var _updateSettings = require("./updateSettings");

var _loadSearchResults = require("./loadSearchResults");

var _searchView = require("./searchView");

var _bookmark = require("./bookmark");

var _stripe = require("./stripe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var cookieStorage = {
  getItem: function getItem(item) {
    var cookies = document.cookie.split(';').map(function (cookie) {
      return cookie.split('=');
    }).reduce(function (acc, _ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];

      return _objectSpread({}, acc, _defineProperty({}, key.trim(), value));
    }, {});
    return cookies[item];
  },
  setItem: function setItem(item, value) {
    document.cookie = "".concat(item, "=").concat(value);
  }
};
var storageType = cookieStorage; // const storageType = localStorage;

var consentPropertyName = 'pop_consent';

var shouldShowPopup = function shouldShowPopup() {
  return !storageType.getItem(consentPropertyName);
};

var saveToStorage = function saveToStorage() {
  return storageType.setItem(consentPropertyName, true);
}; // window.onload = () => {
//   const consentPopup = document.getElementById('consent-popup');
//   const acceptBtn = document.getElementById('accept');
//   const accceptFn = (event) => {
//     saveToStorage(storageType);
//     consentPopup.classList.add('hidden');
//   };
//   acceptBtn.addEventListener('click', accceptFn);
//   if (shouldShowPopup()) {
//     setTimeout(() => {
//       consentPopup.classList.remove('hidden');
//     }, 2000);
//     // const consent = confirm('Agree to the terms and conditions of the sites?');
//     // if (consent) {
//     //   saveToStorage();
//     // }
//   }
// };


window.onload = function () {
  var popupAuto = document.querySelector('.popup-auto');
  var popupAutoClose = document.querySelector('.close-popup-auto');
  var consentPopup = document.getElementById('consent-popup');
  var acceptBtn = document.getElementById('accept');

  var accceptFn = function accceptFn(event) {
    saveToStorage(storageType);
    consentPopup.classList.add('hidden');
  };

  acceptBtn.addEventListener('click', accceptFn);

  if (shouldShowPopup()) {
    setTimeout(function () {
      consentPopup.classList.remove('hidden');
    }, 2000);
  }

  var accceptPopup2 = function accceptPopup2(event) {
    saveToStorage(storageType);
    popupAuto.classList.add('hidden');
  };

  popupAutoClose.addEventListener('click', accceptPopup2);

  if (shouldShowPopup()) {
    setTimeout(function () {
      popupAuto.classList.remove('hidden');
    }, 10000);
  }
};

var mapBox = document.getElementById('map');
/*  Cart Shopping */

var bagIconCart = document.querySelector('.bag__icon__cart');
var shopping = document.querySelector('.shopping');
var bagCartClose = document.querySelector('.bag__close__icon');
var btnCartRemoveOne = document.querySelector('.btn-cart-remove');
var btnBagCartQty = document.querySelector('.descrip-title');
var cartItemsBag = document.querySelector('.shopping-container-middle-item');
var cartItemDesc = document.getElementById('cartItemDesc');
var cartItemPrice = document.getElementById('cartItemPrice');
var cartItemSize = document.getElementById('cartItemSize');
var cartItemQuantity = document.getElementById('cartItemQuantity');
var ProductDom = document.querySelector('.showcase-container-gallery-grid-item-img'); // This is where I will be getting Info and place Info

/* const bookmarkHeart = document.querySelector('.icon-page-increase');
const svgHeart = document.querySelector('.icon-close__menu');
bookmarkHeart.addEventListener('click', function (e) {
  //  e.target.classList.replace('icon-close', 'heart');
  // playBtn.classList.replace('fa-pause', 'fa-play');
  console.log('hey');
}); */
// document
//   .querySelector('.text-main-hidden')
//   .addEventListener('click', loadSearchResults('Knitwear'));
//NOTE LOGIN  USER

var form1 = document.querySelector('#form1');
if (form1) form1.addEventListener('submit', function (e) {
  e.preventDefault();
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  (0, _login.login)(email, password);
}); //NOTE CREATE NEW USER

var formCreate = document.querySelector('#formCreate');
if (formCreate) formCreate.addEventListener('submit', function (e) {
  e.preventDefault();
  var name = document.getElementById('name').value;
  var email = document.getElementById('create_email').value;
  var password = document.getElementById('create_password').value;
  var passwordConfirm = document.getElementById('create_password_confirm').value;
  (0, _login.signup)(name, email, password, passwordConfirm);
});
var userDataform = document.getElementById('form-user-data');
if (userDataform) userDataform.addEventListener('submit', function (e) {
  e.preventDefault(); // const form = new FormData();

  var name = document.getElementById('name').value;
  var email = document.getElementById('emailToBe').value;
  var country = document.getElementById('countryToBe').value;
  var home_tel = document.getElementById('home_telToBe').value;
  var mobile_tel = document.getElementById('mobile_telToBe').value; // form.append('name', document.getElementById('name').value);
  // form.append('email', document.getElementById('email').value);
  // form.append('country', document.getElementById('country').value);
  // form.append('home_tel', document.getElementById('home_tel').value);
  // form.append('mobile_tel', document.getElementById('mobile_tel').value);

  (0, _updateSettings.updateSettings)(name, email, country, home_tel, mobile_tel); // updateSettings({ form }, 'data');
  // console.log(form);
}); //NOTE this is update Password which is not working now

/* if (userDataform)
  userDataform.addEventListener('submit', (e) => {
    e.preventDefault();
    const passwordCurrent = document.getElementById('passwordCurrent').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    updateSettings({ passwordCurrent, password, passwordConfirm }, 'data');
  }); */

/* eslint-disable */
//NOTE All working close not working

/*******************************************/

var btnAddWhishlist = document.querySelector('.btn-add-all-to-bag');
var gridWhishlist = document.querySelector('.whishlist-container-title-grid');
var logo = document.querySelector('.header__logo');
var popupKlarna = document.querySelector('.popupKlarna');
var popup = document.querySelector('.checkout-page-2-popup');
var bagMobile = document.querySelector('.icon_bag__icon__small');
var heartMobile = document.querySelector('.icon__heart__whishlist'); // const whishlist = document.querySelector('.whishlist');//BUG
// const whishlistMenu = document.querySelector('.whishlist__form');//BUG

var signinAccount = document.querySelector('.signin-account');
var signin = document.querySelector('.sign__In ');
var signinClose = document.querySelector('.icon-close-signin');
var language = document.querySelector('.language'); // const currency = document.querySelector('.currency');
// const iconCurrencyClose = document.querySelector('.iconCurrency');

var overlayer2 = document.querySelector('.overlayer-2 '); // popupKlarna.addEventListener('click', function () {
//   popup.style.visibility = 'visible';
//   popup.style.opacity = '1';
// });
// const iconBarMenu = document.querySelector('.menu-bar-icon');

var menuBarIcon = document.querySelector('.menu-bar-icon');
var selectTarget = document.querySelector('.select-target');
var navBarIconMenuOpen = document.querySelector('.nav__bar__icon');
navBarIconMenuOpen.addEventListener('click', function (e) {
  menuBarIcon.classList.add('menu-bar-icon-active');
  e.stopImmediatePropagation();
}, true);
var navBarIconClose = document.querySelector('#icon-close__menu');
navBarIconClose.addEventListener('click', function () {
  menuBarIcon.classList.remove('menu-bar-icon-active');
}); // const navBarMenu = document.querySelector('.nav__bar__icon');
// const navBarMenuClose = navBarMenu.closest('.nav__item');
//

/* navBarMenuClose.addEventListener('click', function () {
  menuBarIcon.classList.remove('active');
  menuBarIcon.style.transform = 'scale(1,1)';
});

navBarIconClose.addEventListener('click', function () {
  menuBarIcon.classList.add('active');
  menuBarIcon.style.transform = 'scale(0,1)';
}); */

var bagOpen = bagIconCart.closest('button');
bagOpen.addEventListener('click', function () {
  shopping.classList.remove('active');
}); //NOTE IMPORTANT

var bagOpenMobile = bagMobile.closest('button');
bagOpenMobile.addEventListener('click', function () {
  shopping.classList.remove('active');
});
bagCartClose.addEventListener('click', function () {
  shopping.classList.add('active');
});
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    shopping.classList.add('active');
  }
});
/* whishlistMenu.addEventListener('click', function () {
  whishlist.classList.remove('active');

});
const closeWhisHeart = whishlistMenu.closest('button');
closeWhisHeart.addEventListener('click', function () {
  whishlist.classList.add('activation');
}); */

if (signin) signin.addEventListener('click', function () {
  signinAccount.classList.add('signin-account-active');
  overlayer2.style.opacity = 1;
  overlayer2.style.visibility = 'visible';
  overlayer2.style.display = 'inline';
});

var signInCloseModal = function signInCloseModal() {
  signinClose.addEventListener('click', function () {
    signinAccount.classList.remove('signin-account-active');
    overlayer2.style.opacity = 0;
    overlayer2.style.visibility = 'invisible';
    overlayer2.style.display = 'none';
  });
};

signInCloseModal();
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    signinAccount.classList.remove('signin-account-active');
    overlayer2.style.opacity = 0;
    overlayer2.style.visibility = 'invisible';
    overlayer2.style.display = 'none';
  }
}); // NOTE Language

/* currency.addEventListener('click', function () {
  language.classList.remove('active');
});

iconCurrencyClose.addEventListener('click', function () {
  language.classList.add('active');
});

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    language.classList.add('active');
  }
}); */
// FOOTER NAV DROPDOWN

var footerUp1 = document.querySelector('.footer-first');
var footerUp2 = document.querySelector('.footer-second');
var footerUp3 = document.querySelector('.footer-third'); // const footerUp4 = document.querySelector('.footer-fouth');
// const footerUp5 = document.querySelector('.footer-five');
// const footerUp6 = document.querySelector('.footer-six');

var footerUp_1 = document.querySelector('#footerUp_1');
var footerUp_2 = document.querySelector('#footerUp_2');
var footerUp_11 = document.querySelector('#footerUp_11');
var footerUp_4 = document.querySelector('#footerUp_4');
var footerUp_5 = document.querySelector('#footerUp_5');
var footerUp_6 = document.querySelector('#footerUp_6');
var footerUp_44 = document.querySelector('#footerUp_44');
footerUp1.addEventListener('click', function (e) {
  e.target.classList.toggle('icon-footer-rotation');
  footerUp_1.classList.toggle('active-link');
  footerUp_11.classList.toggle('active-link');
});
footerUp2.addEventListener('click', function (e) {
  e.target.classList.toggle('icon-footer-rotation');
  footerUp_2.classList.toggle('active-link');
});
footerUp3.addEventListener('click', function (e) {
  e.target.classList.toggle('icon-footer-rotation');
  footerUp_3.classList.toggle('active-link');
}); // footerUp4.addEventListener('click', function (e) {
//   e.target.classList.toggle('icon-footer-rotation');
//   footerUp_4.classList.toggle('active-link');
//   footerUp_44.classList.toggle('active-link');
// });
// footerUp5.addEventListener('click', function (e) {
//   e.target.classList.toggle('icon-footer-rotation');
//   footerUp_5.classList.toggle('active-link');
// });
// footerUp6.addEventListener('click', function (e) {
//   e.target.classList.toggle('icon-footer-rotation');
//   footerUp_6.classList.toggle('active-link');
// });
// FOOTER NAV DROPDOWN END ///

var selected = document.querySelector('.selected');
var optionsContainer = document.querySelector('.options-container');
var optionsList = document.querySelectorAll('.option');
var sameSize = document.querySelector('.same-size');
var sizeGuide = document.querySelector('.size-guide');
var btnNotClear = document.querySelector('.btn-not-clear');
var btnReset = document.querySelector('.reset-size-details');
var whishlistImgSingle = document.querySelector('.whishlist-img');
var whishlistImgClose = document.querySelector('.whishlist-img-stock-close'); // const closeWishListSelect = document.querySelector('#icon-close');
//LECTURE

/* whishlistImgClose.addEventListener('click', function () {
  console.log('hey');
  whishlistImgSingle.style.display = 'none';
  // whishlistImgSingle.style.opacity = 0;
  // whishlistImgSingle.style.visibility = 'hidden';
}); */
//LECTURE

/* selected.addEventListener('click', function () {
  console.log('heu');
  optionsContainer.classList.toggle('active');
  sizeGuide.innerHTML = '';
  btnNotClear.style.display = 'none';
});

optionsList.forEach((el) => {
  el.addEventListener('click', () => {
    selected.innerHTML = el.querySelector('label').innerHTML;
    optionsContainer.classList.remove('active');
    sameSize.innerHTML = '';
    sameSize.innerHTML = selected.innerHTML;
    btnNotClear.style.display = 'inline';
    btnNotClear.style.cursor = 'pointer';
    btnNotClear.style.backgroundColor = 'black';
  });
}); */
// btnReset.addEventListener('click', function () {
//   selected.innerHTML = '-';
//   sameSize.innerHTML = '';
//   btnReset.innerHTML = 'EDIT DETAILS';
//   btnNotClear.style.display = 'inline';
//   btnNotClear.style.cursor = 'not-allowed';
//   btnNotClear.style.backgroundColor = '#ddd';
// });

var saleTab1 = document.querySelector('.sale__tab_1');
var saleTab2 = document.querySelector('.sale__tab_2');
var saleTab3 = document.querySelector('.sale__tab_3');
var saleTabBox = document.querySelector('.sale__tab_1_box');
var saleTabBox2 = document.querySelector('.sale__tab_2_box');
var saleTabBox3 = document.querySelector('.sale__tab_3_box');

if (saleTab1) {
  saleTab1.addEventListener('mouseover', function () {
    saleTabBox.style.transition = 'all 0.1s;';
    saleTabBox.classList.remove('hidden');
  });
  saleTab1.addEventListener('mouseleave', function () {
    saleTabBox.classList.add('hidden');
  });
}

if (saleTab2) {
  saleTab2.addEventListener('mouseenter', function () {
    saleTabBox2.style.transition = 'all 0.1s;';
    saleTabBox2.classList.remove('hidden');
  });
  saleTab2.addEventListener('mouseleave', function () {
    saleTabBox2.classList.add('hidden');
  });
} // saleTab3.addEventListener('mouseenter', function () {
//   saleTabBox3.style.transition = 'all 0.1s;';
//   console.log('enter3');
//   // saleTabBox3.classList.remove('hidden');
// });
// saleTab3.addEventListener('mouseleave', function () {
//   saleTabBox3.classList.add('hidden');
//     console.log('leave3');
// });
// MENU  MOUSE HOVER ( women and men)


var tabsContent = document.querySelectorAll('.hero__tab__hidden');
var navContainer = document.querySelector('.nav__container');
var dropSelect = document.querySelectorAll('.drop-select'); // LECTURE

/* navContainer.addEventListener('mouseover', function (e) {
  //const clickedIt = e.target.parentElement;
  const clickedIt = e.target.closest('.nav__btn');
  // console.log(clickedIt);
  // Guard Close -> if there is nothing clicked returns immediatly
  if (!clickedIt) return;

  // Remove Active
  tabsContent.forEach((t) => t.classList.remove('hidden'));

  document
    .querySelector(`.hero-sale__content--${clickedIt.dataset.tab} `)
    .classList.add('hidden');
});
navContainer.addEventListener('mouseleave', function () {
  // Remove Active
  tabsContent.forEach((t) => t.classList.add('hidden'));

  document
    .querySelector(`.hero-sale__content--${clickedIt.dataset.tab} `)
    .classList.remove('hidden');
}); */

/* dropSelect.forEach(el =>
  el.addEventListener('mouseover', function (e) {
    //const clickedIt = e.target.parentElement;
    const clickedIt = e.target.closest('.nav__btn');
    console.log(clickedIt);
    // Guard Close -> if there is nothing clicked returns immediatly
    if (!clickedIt) return;

    // Remove Active
    tabsContent.forEach(t => t.classList.remove('hidden'));

    document
      .querySelector(`.hero-sale__content--${clickedIt.dataset.tab} `)
      .classList.add('hidden');
  })
);

dropSelect.forEach(el =>
  el.addEventListener('mouseleave', function (e) {
    //const clickedIt = e.target.parentElement;
    const clickedIt = e.target.closest('.nav__btn');
    console.log(clickedIt);
    // Guard Close -> if there is nothing clicked returns immediatly
    if (!clickedIt) return;

    // Remove Active
    tabsContent.forEach(t => t.classList.add('hidden'));
    tabsContent.forEach(t => (t.classList.style.display = 'none'));
  })
); */
// SEARCH

var searchIcon = document.querySelector('.icon-test_space ');
var search = document.querySelector('.search ');
var searchClose = document.querySelector('.closeX ');
var searchMenu = document.getElementById('newSearch');
var openNewSeacrh = searchMenu.closest('nav__item');

if (searchMenu) {
  searchMenu.addEventListener('click', function () {
    search.style.opacity = 1, search.style.visibility = 'visible';
  });
}

if (searchIcon) searchIcon.addEventListener('click', function () {
  search.style.opacity = 1, search.style.visibility = 'visible';
});

if (searchClose) {
  searchClose.addEventListener('click', function () {
    search.style.opacity = 0, search.style.visibility = 'invisible';
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      search.style.opacity = 0, search.style.visibility = 'invisible';
    }
  });
} // Slider


var slider = function slider() {
  var slides = document.querySelectorAll('.slide');
  var btnLeft = document.querySelector('.slider-spring__btn__btn--left');
  var btnRight = document.querySelector('.slider-spring__btn__btn--right');
  var curSlide = 0;
  var maxSlide = slides.length;

  var goToSlide = function goToSlide(slide) {
    slides.forEach(function (s, i) {
      return s.style.transform = "translateX(".concat(100 * (i - slide), "%)");
    });
  }; // Next slide


  var nextSlide = function nextSlide() {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide); // activateDot(curSlide);
  };

  var prevSlide = function prevSlide() {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }

    goToSlide(curSlide); // activateDot(curSlide);
  };

  var init = function init() {
    goToSlide(0); // createDots();
    // activateDot(0);
  };

  init(); // Event handlers

  if (btnRight) btnRight.addEventListener('click', nextSlide);
  if (btnLeft) btnLeft.addEventListener('click', prevSlide);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });
};

slider();
var swicthSingle = document.querySelector('.switch-single-page');
var swicthDouble = document.querySelector('.switch-double-page');
var colorDisplay = document.querySelector('.colorDisplay');
var showcaseItem = document.querySelector('.showcase-container-gallery-grid');
var gridImage = document.querySelectorAll('.showcase-container-gallery-grid-item');
var sizeSlider = document.querySelector('.size-slider');
var galleryGrid = document.querySelectorAll('.showcase-container-gallery-grid');
galleryGrid.forEach(function (el) {
  swicthDouble.addEventListener('click', function () {
    el.classList.add('change-to-double-view');
  }); //showcaseItem.style.gridTemplateRows = 'minmax(25rem, auto)'
  // grid-auto-rows: minmax(50rem, auto)
});
galleryGrid.forEach(function (el) {
  swicthSingle.addEventListener('click', function () {
    el.classList.remove('change-to-double-view');
  });
}); // Player

var player = document.querySelector('.player');
var video = document.querySelector('video');
var progressRange = document.querySelector('.progress-range');
var progressBar = document.querySelector('.progress-bar');
var playBtn = document.querySelector('#play-btn');
var volumeIcon = document.querySelector('#volume-icon');
var volumeRange = document.querySelector('.volume-range');
var volumeBar = document.querySelector('.volume-bar');
var currentTime = document.querySelector('.time-elapsed');
var duration = document.querySelector('.time-duration');
var fullscreenBtn = document.querySelector('.fullscreen');
var btnInpicture = document.querySelector('.fa-ellipsis-v');

if (player) {
  var changeVolume = function changeVolume(e) {
    var volume = e.offsetX / volumeRange.offsetWidth;

    if (volume < 0.1) {
      volume = 0;
    }

    if (volume > 0.9) {
      volume = 1;
    }

    volumeBar.style.width = " ".concat(volume * 100, "%");
    video.volume = volume;
    volumeIcon.className = ''; // no icon

    if (volume > 0.7) {
      volumeIcon.classList.add('fas', 'fa-volume-up');
    } else if (volume < 0.7 && volume > 0) {
      volumeIcon.classList.add('fas', 'fa-volume-down');
    } else if (volume === 0) {
      volumeIcon.classList.add('fas', 'fa-volume-off');
    }

    lastVolume = volume;
  };

  var toggleMute = function toggleMute() {
    volumeIcon.className = '';

    if (video.volume) {
      lastVolume = video.volume;
      video.volume = 0;
      volumeBar.style.width = 0;
      volumeIcon.classList.add('fas', 'fa-volume-mute');
      volumeIcon.setAttribute('title', 'Unmute');
    } else {
      video.volume = lastVolume;
      volumeBar.style.width = "".concat(lastVolume * 100, "%");
      volumeIcon.classList.add('fas', 'fa-volume-up');
      volumeIcon.setAttribute('title', 'Mute');
    }
  };

  var calcDisplayTime = function calcDisplayTime(time) {
    var minutes = Math.floor(time / 60);
    var seconds = Math.floor(time % 60);
    seconds = seconds > 9 ? seconds : "0".concat(seconds);
    return " ".concat(minutes, ":").concat(seconds);
  };

  var updateProgress = function updateProgress() {
    //console.log('currentTime', video.currentTime, 'duartion', video.duration);
    progressBar.style.width = "".concat(video.currentTime / video.duration * 100, "%");
    currentTime.textContent = "".concat(calcDisplayTime(video.currentTime), " / ");
    duration.textContent = "".concat(calcDisplayTime(video.duration), "  ");
  };

  var showPlayIcon = function showPlayIcon() {
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
  };

  var togglePlay = function togglePlay() {
    if (video.paused) {
      video.play();
      playBtn.classList.replace('fa-play', 'fa-pause');
      playBtn.setAttribute('title', 'Pause');
    } else {
      video.pause();
      showPlayIcon();
    }
  }; // View in fullscreen


  var openFullscreen = function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      // Safari
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      // IE11
      elem.msRequestFullscreen();
    }

    video.classList.add('video-fullscreen');
  }; // Close fullscreen


  var closeFullscreen = function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      // Safari
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      // IE11
      document.msExitFullscreen();
    }

    video.classList.remove('video-fullscreen');
  };

  var toggleFullscreen = function toggleFullscreen() {
    if (!fullscreen) {
      openFullscreen(player);
    } else {
      closeFullscreen();
    }

    fullscreen = !fullscreen;
  };

  var lastVolume = 1;
  var fullscreen = false;
  playBtn.addEventListener('click', togglePlay);
  video.addEventListener('click', togglePlay);
  video.addEventListener('ended', showPlayIcon);
  video.addEventListener('timeupdate', updateProgress);
  video.addEventListener('canplay', updateProgress);
  volumeRange.addEventListener('click', changeVolume);
  volumeIcon.addEventListener('click', toggleMute);
  fullscreenBtn.addEventListener('click', toggleFullscreen);
}
/* if (btnInpicture) {
  async function selectMediaStream() {
    try {
      const mediaStream = await navigator.mediaDevices.getDisplayMedia();
      video.srcObject = mediaStream;
      video.onloadedmetadata = () => {
        video.play();
      };
    } catch (error) {
      console.log('Oops!', error);
    }
  }
  btnInpicture.addEventListener('click', async () => {
    btnInpicture.disabled = true;
    await video.requestPictureInPicture();
    btnInpicture.disabled = false;
  });

  selectMediaStream();
} */

/* whishlistImgClose.forEach(el =>
  el.addEventListener('click', function () {
    console.log('removed');

    whishlistImgSingle.forEach( el => el.style.opacity = 0 )
    whishlistImgSingle.forEach( el => el.style.visibility = 'hidden' )
    // whishlistImgSingle.style.opacity = 0;
    // whishlistImgSingle.style.visibility = 'hidden';
  })
);
whishlistImgSingle.addEventListener('click', function(){

})

whishlistImgSingle */


var types = []; // myFunction(x)
//BUG SCROLLING with scrol event (Bad Performance)

/* const scroolSectionFilter = document.querySelector('.showcase-container-filter');
 const initialCoords = scroolSectionFilter.getBoundingClientRect()
 console.log(initialCoords);
window.addEventListener('scroll', function () {
  console.log(window.scrollY);
  if(window.scrollY > initialCoords.top) scroolSectionFilter.classList.add('sticky')
   else
  scroolSectionFilter.classList.remove('sticky') 
}); */

/********************* Intersection Observer **********************/
// IMPORTANT desactive for now  IMPORTANT

var headerTopObserver = document.querySelector('.showcase-container-title-category');
var scroolSectionFilter = document.querySelector('.showcase-container-filter');

if (headerTopObserver) {
  var navHeight = scroolSectionFilter.getBoundingClientRect().height; // console.log(navHeight);

  var stickyNav = function stickyNav(entries) {
    var _entries = _slicedToArray(entries, 1),
        entry = _entries[0]; // console.log(entry);


    if (!entry.isIntersecting) scroolSectionFilter.classList.add('sticky');else scroolSectionFilter.classList.remove('sticky');
  };

  var headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: "-".concat(navHeight, "px")
  });
  headerObserver.observe(headerTopObserver);
}
/********************* Intersection Observer  END **********************/


var sliderer = function sliderer() {
  var allSlides = document.querySelectorAll('.slidex');
  var btnLeft = document.querySelector('.slider__btn--left');
  var btnRight = document.querySelector('.slider__btn--right');
  var curSlide = 0;
  var maxSlide = allSlides.length; // Functions

  var goToSlide = function goToSlide(slide) {
    allSlides.forEach(function (s, i) {
      return s.style.transform = "translateX(".concat(100 * (i - slide), "%)");
    });
  }; // Next slide


  var nextSlide = function nextSlide() {
    if (curSlide === maxSlide - 5) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
  };

  var prevSlide = function prevSlide() {
    if (curSlide === 0) {
      curSlide = maxSlide - 5;
    } else {
      curSlide--;
    }

    goToSlide(curSlide);
  };

  var init = function init() {
    goToSlide(0);
  };

  init(); // Event handlers

  if (btnRight) btnRight.addEventListener('click', nextSlide);
  if (btnLeft) btnLeft.addEventListener('click', prevSlide);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });
};

sliderer();
var addNewAddress = document.querySelector('#addNewAddress');
var openFormAddress = document.querySelector('.form-address-wrapper');
var closeFormAddress = document.querySelector('.close-x ');

if (addNewAddress) {
  addNewAddress.addEventListener('click', function () {
    openFormAddress.classList.remove('hidden');
    openFormAddress.style.transform = 'scaleX(1, 1)';
  });
  closeFormAddress.addEventListener('click', function () {
    openFormAddress.classList.add('hidden');
  });
} // search.addEventListener('submit', function (e) {
//   e.preventDefault();
//   handlerSearch(controlSearchResults);
// });

/* 
const getQuery = document.querySelector('.search-overlay-content__field').value;
handlerSearch = () => {
  search.addEventListener('submit', function (e) {
    e.preventDefault();
    // controlSearchResults()
  });
};

handlerSearch(controlSearchResults); */
// const getQuery = document.querySelector('.search-overlay-content__field').value;

/*  OPEN product details */


var slideBoxNotes = document.querySelector('.slide-box');
var slideBoxNotes1 = document.querySelector('.slide-box1');
var iconNotes = document.querySelector('.showcase-loads-container-gallery-right-notes-box-icon');

if (iconNotes) {
  iconNotes.addEventListener('click', function () {
    slideBoxNotes.classList.toggle('showMe');
  });
}

var detailsNotes = document.querySelector('#details');

if (detailsNotes) {
  detailsNotes.addEventListener('click', function () {
    slideBoxNotes1.classList.toggle('showMe');
  });
}

var checkoutBtn = document.querySelector('#book-men');
if (checkoutBtn) checkoutBtn.addEventListener('click', function (e) {
  e.target.textContent = 'Proccessing...'; //const menId = e.target.dataset.menId; using distrating

  var menId = e.target.dataset.menId;
  (0, _stripe.buyProduct)(menId); //   const menId = document.querySelectorAll('#cartIds[data-men-id]');
  //    buyProduct(menId);
});
var viewOrder = document.querySelector('.view-order');
var wrapRepalce = document.querySelector('.wrap-replace');
var wrapOrders = document.querySelector('.wrap-orders');
var wrapId = document.querySelector('.wrap-ai');
var orderId = document.querySelector('.order-id');
var orderDate = document.querySelector('.order-date');
var orderCost = document.querySelector('.order-cost');
var orderTracking = document.querySelector('.fine-secondary');
var orderProd = document.querySelector('.prod-description');

if (viewOrder) {
  viewOrder.addEventListener('click', function () {
    wrapRepalce.classList.toggle('view-order-details');
    wrapOrders.style.display = 'none';
    orderId.style.display = 'none';
    orderDate.style.display = 'none';
    orderCost.style.display = 'none';
    orderTracking["in"] = 'MANAGE ORDER ';
    orderProd.style.display = 'flex';
  });
}

var cartCouter = document.querySelector('.cart-counter');

function updateCart(prod) {
  _axios["default"].post('/update-cart', prod).then(function (res) {
    // console.log(res);
    cartCouter.innerText = res.data.totalQty;
  })["catch"](function (err) {
    console.log(err);
  });
}

var addToCart = document.querySelectorAll('#btnAddToBag');
var addToCart1 = document.querySelectorAll('#btnAddToBag1');
var addToCart2 = document.querySelectorAll('#btnAddToBag2');
if (addToCart) addToCart.forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    var prod = JSON.parse(btn.dataset.collection); //  console.log(prod);

    updateCart(prod);
    shopping.classList.remove('active');
  });
});
if (addToCart1) addToCart1.forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    var prod = JSON.parse(btn.dataset.girls); //  console.log(prod);

    updateCart(prod);
    shopping.classList.remove('active');
  });
});
if (addToCart2) addToCart2.forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    var prod = JSON.parse(btn.dataset.men); //  console.log(prod);

    updateCart(prod);
    shopping.classList.remove('active');
  });
});

if (mapBox) {
  var locations = [{
    description: 'Rubaccine Store Mayfair ',
    type: 'point',
    coordinates: [-0.1514336, 51.5092271]
  }, {
    description: 'Rubaccine Store Chelsea  ',
    type: 'point',
    coordinates: [-0.1762855, 51.4989362]
  }, {
    description: 'Rubaccine Store Kennington',
    type: 'point',
    coordinates: [-0.1948426, 51.4958347]
  }];
  (0, _mapbox.displayMap)(locations);
}

var readMore1 = document.getElementById('readMore1');
var readMore2 = document.getElementById('readMore2');
var readMore3 = document.getElementById('readMore3');
var readMore4 = document.getElementById('readMore4');
var readMore5 = document.getElementById('readMore5');
var readMore6 = document.getElementById('readMore6');
var readMore7 = document.getElementById('readMore7');
var readMore8 = document.getElementById('readMore8');
var showMore1 = document.getElementById('showMore1');
var showMore2 = document.getElementById('showMore2');
var showMore3 = document.getElementById('showMore3');
var showMore4 = document.getElementById('showMore4');
var showMore5 = document.getElementById('showMore5');
var showMore6 = document.getElementById('showMore6');
var showMore7 = document.getElementById('showMore7');
var showMore8 = document.getElementById('showMore8');
if (readMore1) readMore1.addEventListener('click', function (e) {
  showMore1.classList.remove('vph');
  e.target.textContent = '';
});
if (readMore2) readMore2.addEventListener('click', function (e) {
  showMore2.classList.remove('vph');
  e.target.textContent = '';
});
if (readMore3) readMore3.addEventListener('click', function (e) {
  showMore3.classList.remove('vph');
  e.target.textContent = '';
});
if (readMore4) readMore4.addEventListener('click', function (e) {
  showMore4.classList.remove('vph');
  e.target.textContent = '';
});
if (readMore5) readMore5.addEventListener('click', function (e) {
  showMore5.classList.remove('vph');
  e.target.textContent = '';
});
if (readMore6) readMore6.addEventListener('click', function (e) {
  showMore6.classList.remove('vph');
  e.target.textContent = '';
});
if (readMore7) readMore7.addEventListener('click', function (e) {
  showMore7.classList.remove('vph');
  e.target.textContent = '';
});
if (readMore8) readMore8.addEventListener('click', function (e) {
  showMore8.classList.remove('vph');
  e.target.textContent = '';
});
var alsoLike = document.querySelector('.showIconMinus');
var showAlsoLike = document.querySelector('.showcase-loads-container-alsoLike-gallery');
if (alsoLike) alsoLike.addEventListener('click', function () {
  showAlsoLike.classList.toggle('gallery-active');
});
var checkoutButton = document.getElementById('checkout-button');
if (checkoutButton) checkoutButton.addEventListener('click', function () {
  var stripe = Stripe('pk_test_51IWNL3JMGciq6dxqMnbSC6S7Sa15oelmIKAEPuQ3E31c7rHhpzJVSMvZsIDcFksrPb8KN3aDnYamqoe46bIlVnMW00nC7lvWaY'); // Create a new Checkout Session using the server-side endpoint you
  // created in step 3.

  fetch('/charge', {
    method: 'POST'
  }).then(function (response) {
    return response.json();
  }).then(function (session) {
    return stripe.redirectToCheckout({
      sessionId: session.id
    });
  }).then(function (result) {
    // If `redirectToCheckout` fails due to a browser or network
    // error, you should display the localized error message to your
    // customer using `error.message`.
    if (result.error) {
      alert(result.error.message);
    }
  })["catch"](function (error) {
    console.error('Error:', error);
  });
});
var btnGreenDev = document.querySelector('.btnGreenDev1'); // const infoContentHidden = document.querySelectorAll(
//   '.information-content-personal-info-form '
// );

var formAddress = document.querySelector('.form__address__1');
var informationDisplay = document.querySelector('.information-content-personal-info');
var btnGreenDevAfter = document.querySelector('.btnGreenDev2');
var firstHidden = document.querySelectorAll('.firstHidden');
var deliverHidden = document.querySelectorAll('.deliverHidden');
var formClose = document.querySelector('.icon_form_close');
var formDeliveryAddress = document.querySelector('.deliver__to__address');
var searchAgain = document.querySelector('.search-again');
var informationContent = document.querySelector('.information-content');
var emptyTitle = document.querySelector('empty-title');
var confirmAddress = document.querySelector('.confirm__address');
var iconsPlus = document.querySelector('#iconPlus1');
var iconsPlus2 = document.querySelector('#iconPlus2');
var formInput = document.querySelectorAll('.form__input');
var emptyTitleSmall = document.querySelectorAll('.emptyTitleSmall');
if (iconsPlus) iconsPlus.addEventListener('click', function () {
  document.querySelector('#tag1').classList.toggle('showDetailsPlus');
});
if (iconsPlus2) iconsPlus2.addEventListener('click', function () {
  document.querySelector('#tag2').classList.toggle('showDetailsPlus');
});
var progressDetails = document.querySelector('#progress-details');
var clearInputFields = document.getElementById('clearInputFields');
if (clearInputFields) clearInputFields.addEventListener('click', function () {
  formInput.forEach(function (e) {
    e.value = '';
  });
});
if (btnGreenDevAfter) //Open second Form
  btnGreenDevAfter.addEventListener('click', function () {
    emptyTitleSmall.forEach(function (el) {
      el.classList.add('active');
    });
    formAddress.style.visibility = 'visible';
    formAddress.style.opacity = '1';
    formAddress.style.height = 'auto';
    formAddress.style.transform = 'scale(1,1)';
  }); // CLose Form

if (formClose) formClose.addEventListener('click', function () {
  emptyTitleSmall.forEach(function (el) {
    el.classList.remove('active');
  });
  formAddress.style.visibility = 'hidden';
  formAddress.style.opacity = '0';
  formAddress.style.height = '0rem';
}); // Bottom Black  Confirm Address >

var mid = document.querySelector('.mid');
var deliver = document.querySelector('.deliver');
var addANewAddress = document.querySelector('.add_a_anew_address');
var progressDelivery = document.getElementById('progress-delivery');
var progressReview = document.getElementById('progress-review');
var saveDatas = [];

var saveData = function saveData(el) {
  var addressData = {
    addressline1: document.getElementById('addressline1').value,
    town: document.getElementById('town').value,
    postCode: document.getElementById('postCode').value
  };
  saveDatas.push(addressData);
};

if (confirmAddress) confirmAddress.addEventListener('click', function (el) {
  if (!document.getElementById('addressline1').value && !document.getElementById('town').value && !document.getElementById('postCode').value) {
    return;
  }

  el.preventDefault();
  mid.style.visibility = 'hidden';
  mid.style.opacity = '0';
  mid.style.height = '0rem';
  mid.style.transform = 'scale(1,0)';
  deliver.classList.remove('deliver__to__address');
  deliver.classList.remove('hidden');
  progressDelivery.classList.add('activ');
  progressDelivery.classList.add('complete');
  progressDelivery.classList.add('bold');
  saveData();
  localStorage.setItem('Client address', JSON.stringify(saveDatas)); // formInput.forEach((e) => {
  //   e.value = '';
  // });
});
if (addANewAddress) addANewAddress.addEventListener('click', function () {
  window.location.reload();
});
var btnGreenProceedReview = document.querySelector('.review-proceed-green');
var btnGreyProceedReview = document.querySelector('.review-proceed-grey');
var producReview = document.querySelector('.product-review');
var contentTotal = document.querySelector('.content-total');
if (btnGreyProceedReview) btnGreyProceedReview.addEventListener('click', function () {
  mid.style.visibility = 'visible';
  mid.style.opacity = '1';
  mid.style.height = 'auto';
  mid.style.transform = 'scale(1,1)';
  deliver.classList.add('deliver__to__address');
});
if (btnGreenProceedReview) btnGreenProceedReview.addEventListener('click', function (e) {
  e.preventDefault();
  formDeliveryAddress.textContent = '';
  producReview.classList.remove('active'); //  contentTotal.classList.remove('active')
});
var purchaseSecurely = document.querySelector('.purchaseSecurely');
var paymentMethods = document.querySelector('.payment-methods ');
if (purchaseSecurely) purchaseSecurely.addEventListener('click', function () {
  producReview.classList.add('active');
  paymentMethods.classList.remove('active');
  progressReview.classList.add('activ');
  progressReview.classList.add('complete');
  progressReview.classList.add('bold');
  informationDisplay.classList.add('zone');
}); // if (searchAgain)
//   searchAgain.addEventListener('click', function (e) {
//     e.preventDefault();
//   });

var linkToSignin = document.getElementById('linkToSignin');
if (linkToSignin) linkToSignin.addEventListener('click', function () {
  console.log('hey');
  menuBarIcon.classList.remove('menu-bar-icon-active');
  signinAccount.classList.add('signin-account-active');
  overlayer2.style.opacity = 1;
  overlayer2.style.visibility = 'visible';
  overlayer2.style.display = 'inline';
});