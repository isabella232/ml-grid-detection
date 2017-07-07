'use strict';
// Waypoints is global unfortunately...
require('./vendor/waypoints');

const scrollContainer = document.querySelector('main.page__body');
const menu = document.querySelectorAll('[data-hook="nav-menu"] a');

menu.forEach(node => {
  const target = document.querySelector(node.getAttribute('href'));
  const activate = () => {
    menu.forEach(n => n.classList.remove('ppn__menu-item--active'));
    node.classList.add('ppn__menu-item--active');
  };

  node.addEventListener('click', e => {
    e.preventDefault();
    activate();
    scrollContainer.scrollTop = scrollContainer.scrollTop + target.getBoundingClientRect().top - 16;
  });

  new Waypoint({
    element: target,
    context: scrollContainer,
    handler: function () {
      activate();
    }
  });
});
