// js/modules/maths/numeration.js
import { getRandomInt } from '../../utils.js';

export function generateNumerationCard(card, index) {
  const mode = Math.random() > 0.5 ? 'toCDU' : 'fromCDU';

  if (mode === 'toCDU') {
    // Mode 1 : Nombre -> c, d, u (ex: 736 -> 7c 3d 6u)
    const c = getRandomInt(1, 9);
    const d = getRandomInt(0, 9);
    const u = getRandomInt(0, 9);
    const nombre = c * 100 + d * 10 + u;

    card.dataset.type = 'numeration-to-cdu';
    card.dataset.ansC = c;
    card.dataset.ansD = d;
    card.dataset.ansU = u;

    card.innerHTML = `
      <div class="fraction-question-box" style="align-items: center; text-align: center; width: 100%;">
        <span style="font-weight: 600; font-size: 0.95rem; margin-bottom: 8px;">
          <strong>${index + 1}.</strong> Écris ${nombre} avec c, d et u :
        </span>
        <div style="display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 1.1rem; font-weight: bold; margin-top: 4px;">
          <span>${nombre} =</span>
          <input type="text" class="c-input" style="width: 35px; text-align: center;" autocomplete="off"><span>c</span>
          <input type="text" class="d-input" style="width: 35px; text-align: center;" autocomplete="off"><span>d</span>
          <input type="text" class="u-input" style="width: 35px; text-align: center;" autocomplete="off"><span>u</span>
        </div>
        <span class="feedback-icon" style="margin-top: 6px;"></span>
      </div>
    `;
  } else {
    // Mode 2 : c, d, u (ou pièges) -> Nombre (ex: 70d 6u -> 706)
    const typePiege = getRandomInt(0, 3);
    let displayText = '';
    let answer = 0;

    if (typePiege === 0) {
      // Standard (ex: 7c 3d 6u)
      const c = getRandomInt(1, 9);
      const d = getRandomInt(0, 9);
      const u = getRandomInt(0, 9);
      answer = c * 100 + d * 10 + u;
      displayText = `${c}c ${d}d ${u}u`;
    } else if (typePiege === 1) {
      // Piège dizaines (ex: 70d 6u)
      const tens = getRandomInt(10, 89); // ex: 70 dizaines = 700
      const u2 = getRandomInt(0, 9);
      answer = tens * 10 + u2;
      displayText = `${tens}d ${u2}u`;
    } else if (typePiege === 2) {
      // Élément isolé (que des centaines, que des dizaines, ou que des unités)
      const subType = getRandomInt(0, 3);
      if (subType === 0) {
        const c = getRandomInt(1, 9);
        answer = c * 100;
        displayText = `${c}c`;
      } else if (subType === 1) {
        const d = getRandomInt(10, 90);
        answer = d * 10;
        displayText = `${d}d`;
      } else {
        const u = getRandomInt(1, 9);
        answer = u;
        displayText = `${u}u`;
      }
    } else {
      // Mélange partiel sans dizaines (ex: 5c 4u)
      const c = getRandomInt(1, 9);
      const u = getRandomInt(1, 9);
      answer = c * 100 + u;
      displayText = `${c}c ${u}u`;
    }

    card.dataset.type = 'numeration-from-cdu';
    card.dataset.answer = answer;

    card.innerHTML = `
      <div class="fraction-question-box" style="align-items: center; text-align: center; width: 100%;">
        <span style="font-weight: 600; font-size: 0.95rem; margin-bottom: 8px;">
          <strong>${index + 1}.</strong> Quel est ce nombre ?
        </span>
        <div style="font-size: 1.2rem; font-weight: bold; margin: 4px 0; color: #1e293b;">
          ${displayText}
        </div>
        <div style="display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: 4px;">
          <input type="text" class="num-ans-input" style="width: 80px; text-align: center;" autocomplete="off">
        </div>
        <span class="feedback-icon" style="margin-top: 6px;"></span>
      </div>
    `;
  }
}