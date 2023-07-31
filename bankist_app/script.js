'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
    e.preventDefault()
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//creating new element
const topHead= document.querySelector('.header');
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = `Added Button.<button class="btn btn--close-cookie">got it</button>`;
topHead.prepend(message)
 //deleting node

document.querySelector('.btn--close-cookie').addEventListener('click',function(){
    message.remove();
})

message.style.backgroundColor ="#37383d"

//smooth scroll 

//add scroll to section when clicked

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener('click',function(e){
  const scrollCords = section1.getBoundingClientRect();

  // window.scrollTo(scrollCords.left + window.pageXOffset,scrollCords.top + window.pageYOffset)
  //we can add behavior too for that wrap the values in obj and pass behavior key value
  // window.scrollTo({left:scrollCords.left + window.pageXOffset,top:scrollCords.top + window.pageYOffset,behavior:'smooth'})

  //Modern approach

  section1.scrollIntoView({behavior:'smooth'})

})