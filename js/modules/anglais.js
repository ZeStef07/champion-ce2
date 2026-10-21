// js/modules/anglais.js
import { configData } from '../config.js';
import { shuffleArray, getRandomInt, removeAccents } from '../utils.js';

export function initAnglais() {
  const container = document.getElementById('english-container');
  const scoreBox = document.getElementById('english-score');
  container.innerHTML = '';
  scoreBox.innerHTML = '';

  const now = new Date();
  const currentDayEn = now.toLocaleDateString('en-US', { weekday: 'long' });
  const currentMonthEn = now.toLocaleDateString('en-US', { month: 'long' });

  const specialQuestions = [
    { prompt: "What's the day today ?", answer: currentDayEn },
    { prompt: "What month is it ?", answer: currentMonthEn }
  ];

  const standardItems = [
    ...configData.anglais.jours.map(item => {
      const dir = getRandomInt(0, 1);
      return dir === 0 
        ? { prompt: `En anglais : ${item.fr}`, answer: item.en }
        : { prompt: `En français : ${item.en}`, answer: item.fr };
    }),
    ...configData.anglais.mois.map(item => {
      const dir = getRandomInt(0, 1);
      return dir === 0 
        ? { prompt: `En anglais : ${item.fr}`, answer: item.en }
        : { prompt: `En français : ${item.en}`, answer: item.fr };
    })
  ];

  let pool = [...specialQuestions, ...standardItems];
  let questions = [];
  while (questions.length < 10) {
    questions = questions.concat(shuffleArray([...pool]));
  }
  questions = questions.slice(0, 10);

  questions.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'english-card';
    card.dataset.answer = item.answer.toLowerCase();
    
    card.innerHTML = `
      <div>
        <div>${index + 1}. ${item.prompt}</div>
      </div>
      <div>
        <input type="text" class="english-input" autocomplete="off">
        <span class="feedback-icon"></span>
      </div>
    `;
    container.appendChild(card);
  });

  document.getElementById('btn-validate-english').onclick = () => {
    let correctCount = 0;
    container.querySelectorAll('.english-card').forEach(card => {
      const input = card.querySelector('input');
      const expected = card.dataset.answer;
      const icon = card.querySelector('.feedback-icon');

      const cleanUser = removeAccents(input.value.trim().toLowerCase());
      const cleanExpected = removeAccents(expected);

      if (cleanUser === cleanExpected) {
        card.className = 'english-card correct';
        icon.textContent = '✅';
        correctCount++;
      } else {
        card.className = 'english-card incorrect';
        icon.textContent = `❌ (${expected})`;
      }
    });
    scoreBox.textContent = `Score : ${correctCount}/10`;
  };

  // Bouton Recommencer
  const restartBtn = document.getElementById('btn-restart-anglais');
  if (restartBtn) {
    restartBtn.onclick = () => initAnglais();
  }
}