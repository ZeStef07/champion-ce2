// js/modules/orthographe.js
import { configData } from '../config.js';
import { shuffleArray } from '../utils.js';

export function initOrthographe() {
  const container = document.getElementById('ortho-container');
  const scoreBox = document.getElementById('ortho-score');
  container.innerHTML = '';
  scoreBox.innerHTML = '';

  const pool = [...configData.orthographe.sons_s_z];
  const selected = shuffleArray(pool).slice(0, 10);

  selected.forEach((item, index) => {
    const parts = item.masque.split(/\[s+\]/);
    const card = document.createElement('div');
    card.className = 'word-card';
    card.dataset.answer = item.reponse;
    card.innerHTML = `
      <span>${index + 1}. ${parts[0]}<input type="text" class="ortho-input" maxlength="2" autocomplete="off">${parts[1]}</span>
      <span class="feedback-icon"></span>
    `;
    container.appendChild(card);
  });

  document.getElementById('btn-validate-ortho').onclick = () => {
    let correctCount = 0;
    container.querySelectorAll('.word-card').forEach(card => {
      const input = card.querySelector('input');
      const expected = card.dataset.answer;
      const icon = card.querySelector('.feedback-icon');

      if (input.value.trim().toLowerCase() === expected) {
        card.className = 'word-card correct';
        icon.textContent = '✅';
        correctCount++;
      } else {
        card.className = 'word-card incorrect';
        icon.textContent = `❌ (${expected})`;
      }
    });
    scoreBox.textContent = `Score : ${correctCount}/10`;
  };

  // Bouton Recommencer
  const restartBtn = document.getElementById('btn-restart-ortho');
  if (restartBtn) {
    restartBtn.onclick = () => initOrthographe();
  }
}