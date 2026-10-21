// js/utils.js

export function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}