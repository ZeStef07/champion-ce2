// js/modules/maths/operations.js
import { getRandomInt } from '../../utils.js';

export function generateOperationCard(card) {
  const opType = getRandomInt(0, 2);
  let num1, num2, answer, symbol;

  if (opType === 0) {
    // Addition jusqu'à 999
    num1 = getRandomInt(100, 899);
    num2 = getRandomInt(100, 899);
    answer = num1 + num2;
    symbol = '+';
  } else if (opType === 1) {
    // Soustraction jusqu'à 999 (résultat positif)
    num1 = getRandomInt(200, 999);
    num2 = getRandomInt(100, num1);
    answer = num1 - num2;
    symbol = '-';
  } else {
    // Multiplication (tables de 2 à 9)
    num1 = getRandomInt(2, 9);
    num2 = getRandomInt(2, 9);
    answer = num1 * num2;
    symbol = '×';
  }

  card.dataset.type = 'operation';
  card.dataset.answer = answer;

  if (symbol === '×') {
    card.innerHTML = `
      <div class="fraction-question-box" style="align-items: center; text-align: center; width: 100%;">
        <span style="font-size: 1.2rem; font-weight: bold; margin-bottom: 10px;">${num1} ${symbol} ${num2} =</span>
        <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
          <input type="text" class="math-input" style="width: 110px; text-align: center;" autocomplete="off">
          <span class="feedback-icon"></span>
        </div>
      </div>
    `;
  } else {
    card.innerHTML = `
      <div class="fraction-question-box" style="align-items: center; text-align: center; width: 100%;">
        <div style="display: inline-flex; flex-direction: column; align-items: flex-end; font-family: 'Courier New', Courier, monospace; font-size: 1.4rem; font-weight: bold; margin-bottom: 8px; line-height: 1.2;">
          <!-- Ligne 1 : Premier nombre -->
          <div style="width: 120px; text-align: right; letter-spacing: 5px; padding-right: 5px;">
            ${num1}
          </div>
          <!-- Ligne 2 : Symbole et deuxième nombre alignés -->
          <div style="display: flex; justify-content: space-between; width: 120px; letter-spacing: 5px; padding-right: 5px;">
            <span>${symbol}</span>
            <span>${num2}</span>
          </div>
          <!-- Barre de séparation -->
          <div style="width: 125px; height: 2px; background-color: #1e293b; margin: 4px 0 6px 0;"></div>
        </div>
        <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
          <input type="text" class="math-input" style="width: 110px; text-align: right;" autocomplete="off">
          <span class="feedback-icon"></span>
        </div>
      </div>
    `;
  }
}