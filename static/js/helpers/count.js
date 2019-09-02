'use strict';

var plus = document.querySelector('.plus');
var minus = document.querySelector('.minus');
var counter = document.querySelector('.counter');
var count = document.querySelector('.count');
count.addEventListener('click', function (e) {
  if (e.target === plus) {
    ++counter.value;
  } else if (e.target === minus) {
    --counter.value;
  }
});