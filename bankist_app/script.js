"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const topHead = document.querySelector(".header");
const message = document.createElement("div");

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

const tabs = document.querySelectorAll(".operations__tab");
const tabContents = document.querySelectorAll(".operations__content");
const tabContainer = document.querySelector(".operations__tab-container");

const nav = document.querySelector(".nav");

const header = document.querySelector(".header");

const allSections = document.querySelectorAll(".section");

//modal open
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

//close modal
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

//add event to open modal according button clicked

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//creating new element

message.classList.add("cookie-message");
message.innerHTML = `Welcome<button class="btn btn--close-cookie">got it</button>`;
topHead.prepend(message);

//deleting node

document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    message.remove();
  });

message.style.backgroundColor = "#37383d";

//smooth scroll

//add scroll to section when clicked


btnScrollTo.addEventListener("click", function (e) {
  const scrollCords = section1.getBoundingClientRect();

  // window.scrollTo(scrollCords.left + window.pageXOffset,scrollCords.top + window.pageYOffset)
  //we can add behavior too for that wrap the values in obj and pass behavior key value
  // window.scrollTo({left:scrollCords.left + window.pageXOffset,top:scrollCords.top + window.pageYOffset,behavior:'smooth'})

  //Modern approach

  section1.scrollIntoView({ behavior: "smooth" });
});

//nav bar clikc scroll to that section
//ineffeciney way
// document.querySelectorAll('.nav__link').forEach(function(el){el.addEventListener('click',function(e){
//   e.preventDefault();
//   const id = this.getAttribute('href');

//   document.querySelector(id).scrollIntoView({behavior:"smooth"}); //it is creating copy of every section which will effect the performance latter

// })
// })

//efficient way - event delegation

//1. adding event on parent (common ancestor)
//2. detemine the originalted event

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  console.log(e.target);
  if (e.target.classList.contains("nav__link")) {
    console.log(e.target);
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//tabbing

tabContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");

  //Guard phase
  if (!clicked) return;

  //remove previously active tabs
  tabs.forEach((e) => e.classList.remove("operations__tab--active"));
  tabContents.forEach((e) => e.classList.remove("operations__content--active"));

  //activatingtab
  clicked.classList.add("operations__tab--active");

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

//menu fade out

// function refactoring
const handleHover = function (e, opa) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = opa;
    });
    logo.style.opacity = opa;
  }
};


//we can not directing pass function as arguement, it will be passed as callback function
nav.addEventListener("mouseover", (e) => handleHover(e, 0.5));
nav.addEventListener("mouseout", (e) => handleHover(e, 1));

//sticky navbar on scroll -- ineficient way

//  const initialCords = section1.getBoundingClientRect();

//  //scroll event is available in window object

//  window.addEventListener('scroll',function(){
//   if(this.window.scrollY > initialCords.top)
//   nav.classList.add('sticky')
//   else
//  nav.classList.remove('sticky')

//  })

//efficinet approach - using interstion observer api

//creating intersection observer api

const navHeight = nav.getBoundingClientRect().height;

const callBackOb = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const optionsOb = {
  root: null, //means no itersection element only viewport
  threshold: 0, //means at what percentage of viewport we will start intersecting
  rootMargin: `-${navHeight}px`, //allow to add/remove extra height to the target element
};

const observer = new IntersectionObserver(callBackOb, optionsOb);
observer.observe(header);

//section animation on scroll



const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

//lazy image loader

const imgElement = document.querySelectorAll('img[data-src]');

const lazyImg = function(entries,observer){
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(lazyImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

imgElement.forEach((img) => imgObserver.observe(img));

//making slider

const sliderFunction = () => {
  const slides = document.querySelectorAll(".slide");
  let currSlide = 0;
  const slider = document.querySelector(".slider");
  const btnSlideLeft = document.querySelector(".slider__btn--left");
  const btnSlideRight = document.querySelector(".slider__btn--right");
  // console.log("slide",slider)
  // slider.style.transform = 'scale(0.4) translateX(-1200px)';
  // slider.style.overflow = 'visible';
  //adding dots

  const dotContainer = document.querySelector(".dots");
  const createDots = function () {
    slides.forEach((_, i) =>
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      )
    );
  };

  const gotoSlide = function (activeSlide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translate(${100 * (i - activeSlide)}%)`)
    );
  };

  const activateDots = function (slide) {
    const allDots = document.querySelectorAll(".dots__dot");
    allDots.forEach((d) => d.classList.remove("dots__dot--active"));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const initFunc = () => {
    createDots();
    activateDots(0);
    gotoSlide(0);
  };

  initFunc();

  btnSlideRight.addEventListener("click", function () {
    currSlide++;
    if (currSlide > slides.length - 1) {
      currSlide = 0;
    }
    gotoSlide(currSlide);
    activateDots(currSlide);
  });
  btnSlideLeft.addEventListener("click", function () {
    currSlide--;
    if (currSlide < 0) {
      currSlide = slides.length - 1;
    }

    gotoSlide(currSlide);
    activateDots(currSlide);
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      gotoSlide(slide);
      activateDots(slide);
    }
  });
};

sliderFunction();

//lect

//event propagation
// const randInt = (min,max)=>Math.floor(Math.random()*(max-min+1)+min);
// const randomColor = ()=> `rgb(${randInt(0,255)},${randInt(0,255)},${randInt(0,255)})`
// document.querySelector('.nav__link').addEventListener('click',function(e){
//   this.style.backgroundColor = randomColor();
// })

// document.querySelector('.nav__links').addEventListener('click',function(e){
//   this.style.backgroundColor = randomColor();
// })

// document.querySelector('.nav').addEventListener('click',function(e){
//   this.style.backgroundColor = randomColor();
// })8
