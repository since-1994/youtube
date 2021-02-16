import '../scss/styles.scss';
import './videoPlayer.js';
import './addComment.js';

const loading = document.querySelector('.loading');

const init = async() => {
   const hamburger = document.querySelector('.hamburger');
   const headerMenu = document.querySelector('.header__menu');
   const body = document.querySelector('body');
   hamburger.addEventListener('click', () => {
       console.log('click');
       hamburger.classList.toggle('active');
       headerMenu.classList.toggle('active');
       body.classList.toggle('active');
   });
}

init();