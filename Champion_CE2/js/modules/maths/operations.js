import { getRandomInt } from '../../utils.js';

export function generateOperationCard(card) {
  const opTypes = ['addition', 'soustraction', 'multiplication'];
  const chosenOp = opTypes[getRandomInt(0, opTypes.length - 1)];

  if (chosenOp === 'addition') {
    let a = getRandomInt(1, 500), b = getRandomInt(1, 500);
    card.dataset.answer = a + b;
    card.innerHTML = `<label>${a} + ${b} =</label><div><input type="text" class="math-input" autocomplete="off"><span class="feedback-icon"></span></div>`;
  } else if (chosenOp === 'soustraction') {
    let a = getRandomInt(10, 999), b = getRandomInt(1, a);
    card.dataset.answer = a - b;
    card.innerHTML = `<label>${a} - ${b} =</label><div><input type="text" class="math-input" autocomplete="off"><span class="feedback-icon"></span></div>`;
  } else {
    let a = getRandomInt(2, 9), b = getRandomInt(1, 10);
    card.dataset.answer = a * b;
    card.innerHTML = `<label>${a} × ${b} =</label><div><input type="text" class="math-input" autocomplete="off"><span class="feedback-icon"></span></div>`;
  }
}