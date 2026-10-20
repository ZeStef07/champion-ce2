// js/modules/maths.js
import { configData } from '../config.js';
import { shuffleArray, removeAccents } from '../utils.js';
import { generateOperationCard } from './maths/operations.js';
import { generatePerimetreCard } from './maths/perimetres.js';
import { generateFractionCard } from './maths/fractions.js';
import { generateProblemCard } from './maths/problemes.js';

function getActiveProblemTypes() {
  const weights = configData.maths.poids_problemes;
  return Object.keys(weights).filter(type => weights[type] > 0);
}

export function initMaths(subType = 'operations') {
  const container = document.getElementById('maths-container');
  const scoreBox = document.getElementById('maths-score');
  container.innerHTML = '';
  scoreBox.innerHTML = '';

  const cleanType = subType.toLowerCase();

  // Nombre de cartes selon le sous-onglet actif
  let count = 10;
  if (cleanType === 'problemes') {
    count = 3;
    container.classList.add('problems-layout');
  } else if (cleanType === 'perimetres') {
    count = 5;
    container.classList.remove('problems-layout');
  } else if (cleanType === 'fractions') {
    count = 5
  }

  // Gestion de la non-redondance pour les problèmes
  let problemTypesList = [];
  if (cleanType === 'problemes') {
    const activeTypes = getActiveProblemTypes();
    problemTypesList = shuffleArray([...activeTypes]);
  }

  for (let i = 0; i < count; i++) {
    const card = document.createElement('div');
    card.className = 'math-card';

    if (cleanType === 'operations') {
      generateOperationCard(card);
    } else if (cleanType === 'perimetres') {
      generatePerimetreCard(card, i);
    } else if (cleanType === 'fractions') {
      generateFractionCard(card);
    } else if (cleanType === 'problemes') {
      const assignedType = problemTypesList[i % problemTypesList.length] || 'billes';
      generateProblemCard(card, i, assignedType);
    }

    container.appendChild(card);
  }

  // Validation des réponses
  document.getElementById('btn-validate-maths').onclick = () => {
    let correctCount = 0;

    container.querySelectorAll('.math-card').forEach(card => {
      const icon = card.querySelector('.feedback-icon');
      let isCardCorrect = false;

      if (card.dataset.type === 'perimetre') {
        const input = card.querySelector('.math-input');
        const expected = parseInt(card.dataset.answer, 10);
        const userVal = parseInt(input.value.trim(), 10);

        if (!isNaN(userVal) && userVal === expected) {
          isCardCorrect = true;
          card.className = 'math-card correct';
          icon.textContent = '✅';
        } else {
          card.className = 'math-card incorrect';
          icon.textContent = `❌ (${expected} cm)`;
        }
      } 
      else if (card.dataset.type === 'fractions-lire') {
        const numInput = card.querySelector('.num-input');
        const denInput = card.querySelector('.den-input');
        const expNum = parseInt(card.dataset.num, 10);
        const expDen = parseInt(card.dataset.den, 10);
        const userNum = parseInt(numInput.value.trim(), 10);
        const userDen = parseInt(denInput.value.trim(), 10);

        if (userNum === expNum && userDen === expDen) {
          isCardCorrect = true;
          card.className = 'math-card correct';
          icon.textContent = '✅';
        } else {
          card.className = 'math-card incorrect';
          icon.textContent = `❌ (${expNum}/${expDen})`;
        }
      } 
      else if (card.dataset.type === 'fractions-ecrire') {
        const expectedNum = parseInt(card.dataset.expectedNum, 10);
        const totalCells = parseInt(card.dataset.den, 10);
        const filledCells = card.querySelectorAll('.square-cell.filled, .circle-pie path.filled').length;

        if (filledCells === expectedNum) {
          isCardCorrect = true;
          card.className = 'math-card correct';
          icon.textContent = '✅';
        } else {
          card.className = 'math-card incorrect';
          icon.textContent = `❌ (${expectedNum}/${totalCells})`;
        }
      } 
      else if (card.dataset.type && card.dataset.type.startsWith('prob-')) {
        let allSubCorrect = true;
        if (card.dataset.ans3 !== undefined) {
          const ans1 = removeAccents(card.querySelector('.p-ans-1').value.trim().toLowerCase());
          const ans2 = removeAccents(card.querySelector('.p-ans-2').value.trim().toLowerCase());
          const ans3 = removeAccents(card.querySelector('.p-ans-3').value.trim().toLowerCase());
          if (ans1 !== String(card.dataset.ans1) || ans2 !== card.dataset.ans2 || ans3 !== String(card.dataset.ans3)) {
            allSubCorrect = false;
          }
        } else if (card.dataset.ans2 !== undefined) {
          const ans1 = removeAccents(card.querySelector('.p-ans-1').value.trim().toLowerCase());
          const ans2 = removeAccents(card.querySelector('.p-ans-2').value.trim().toLowerCase());
          if (ans1 !== card.dataset.ans1 || ans2 !== String(card.dataset.ans2)) {
            allSubCorrect = false;
          }
        } else {
          const ans1 = removeAccents(card.querySelector('.p-ans-1').value.trim().toLowerCase());
          if (ans1 !== String(card.dataset.ans1)) {
            allSubCorrect = false;
          }
        }

        if (allSubCorrect) {
          isCardCorrect = true;
          card.className = 'math-card correct';
          icon.textContent = '✅';
        } else {
          card.className = 'math-card incorrect';
          icon.textContent = `❌`;
        }
      } 
      else {
        const input = card.querySelector('.math-input');
        const expected = parseInt(card.dataset.answer, 10);
        const userVal = parseInt(input.value.trim(), 10);

        if (!isNaN(userVal) && userVal === expected) {
          isCardCorrect = true;
          card.className = 'math-card correct';
          icon.textContent = '✅';
        } else {
          card.className = 'math-card incorrect';
          icon.textContent = `❌ (${expected})`;
        }
      }

      if (isCardCorrect) correctCount++;
    });

    scoreBox.textContent = `Score : ${correctCount} / ${count}`;
  };

  // Bouton Recommencer
  const restartBtn = document.getElementById('btn-restart-maths');
  if (restartBtn) {
    restartBtn.onclick = () => initMaths(cleanType);
  }
}