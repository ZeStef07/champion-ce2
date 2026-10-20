// js/modules/maths/perimetres.js
import { getRandomInt } from '../../utils.js';

export function generatePerimetreCard(card, index) {
  const shapes = ['carre', 'rectangle', 'triangle', 'trapeze', 'pentagone'];
  const chosen = shapes[getRandomInt(0, shapes.length - 1)];
  
  card.dataset.type = 'perimetre';
  let ans = 0;
  let svgVisual = '';
  const styleSVG = 'fill="#f8fafc" stroke="#334155" stroke-width="2.5" stroke-linejoin="miter"';

  if (chosen === 'carre') {
    let c = getRandomInt(3, 15);
    ans = c * 4;
    card.dataset.answer = ans;
    svgVisual = `
      <svg width="140" height="120" viewBox="0 0 120 100" style="margin: 10px auto; display: block;">
        <rect x="35" y="25" width="50" height="50" ${styleSVG}/>
        <text x="60" y="15" font-size="11" text-anchor="middle" fill="#1e293b" font-weight="bold">${c} cm</text>
      </svg>
    `;
  } else if (chosen === 'rectangle') {
    let L = getRandomInt(8, 25);
    let l = getRandomInt(3, L - 1);
    ans = (L + l) * 2;
    card.dataset.answer = ans;
    svgVisual = `
      <svg width="160" height="100" viewBox="0 0 140 80" style="margin: 10px auto; display: block;">
        <rect x="35" y="15" width="90" height="50" ${styleSVG}/>
        <text x="80" y="10" font-size="11" text-anchor="middle" fill="#1e293b" font-weight="bold">${L} cm</text>
        <text x="27" y="43" font-size="11" text-anchor="end" fill="#1e293b" font-weight="bold">${l} cm</text>
      </svg>
    `;
  } else if (chosen === 'triangle') {
    let a = getRandomInt(5, 20), b = getRandomInt(5, 20), cSide = getRandomInt(5, 20);
    ans = a + b + cSide;
    card.dataset.answer = ans;
    svgVisual = `
      <svg width="140" height="120" viewBox="0 0 120 100" style="margin: 10px auto; display: block;">
        <polygon points="60,15 20,80 100,80" ${styleSVG}/>
        <text x="33" y="45" font-size="10" text-anchor="end" fill="#1e293b" font-weight="bold">${a} cm</text>
        <text x="87" y="45" font-size="10" text-anchor="start" fill="#1e293b" font-weight="bold">${b} cm</text>
        <text x="60" y="95" font-size="10" text-anchor="middle" fill="#1e293b" font-weight="bold">${cSide} cm</text>
      </svg>
    `;
  } else if (chosen === 'trapeze') {
    let base1 = getRandomInt(8, 16), base2 = getRandomInt(14, 24), cote1 = getRandomInt(6, 12), cote2 = getRandomInt(6, 12);
    ans = base1 + base2 + cote1 + cote2;
    card.dataset.answer = ans;
    svgVisual = `
      <svg width="140" height="110" viewBox="0 0 120 90" style="margin: 10px auto; display: block;">
        <polygon points="40,15 80,15 100,75 20,75" ${styleSVG}/>
        <text x="60" y="10" font-size="10" text-anchor="middle" fill="#1e293b" font-weight="bold">${base1} cm</text>
        <text x="60" y="87" font-size="10" text-anchor="middle" fill="#1e293b" font-weight="bold">${base2} cm</text>
        <text x="14" y="47" font-size="10" text-anchor="end" fill="#1e293b" font-weight="bold">${cote1} cm</text>
        <text x="106" y="47" font-size="10" text-anchor="start" fill="#1e293b" font-weight="bold">${cote2} cm</text>
      </svg>
    `;
  } else {
    // Pentagone
    let s1 = getRandomInt(5, 12), s2 = getRandomInt(5, 12), s3 = getRandomInt(5, 12), s4 = getRandomInt(5, 12), s5 = getRandomInt(5, 12);
    ans = s1 + s2 + s3 + s4 + s5;
    card.dataset.answer = ans;
    svgVisual = `
      <svg width="150" height="130" viewBox="0 0 130 110" style="margin: 10px auto; display: block;">
        <polygon points="65,15 110,48 93,98 37,98 20,48" ${styleSVG}/>
        <text x="38" y="28" font-size="9" text-anchor="end" fill="#1e293b" font-weight="bold">${s1} cm</text>
        <text x="92" y="28" font-size="9" text-anchor="start" fill="#1e293b" font-weight="bold">${s2} cm</text>
        <text x="106" y="75" font-size="9" text-anchor="start" fill="#1e293b" font-weight="bold">${s3} cm</text>
        <text x="65" y="108" font-size="9" text-anchor="middle" fill="#1e293b" font-weight="bold">${s4} cm</text>
        <text x="24" y="75" font-size="9" text-anchor="end" fill="#1e293b" font-weight="bold">${s5} cm</text>
      </svg>
    `;
  }

  card.innerHTML = `
    <div class="fraction-question-box" style="align-items: center; text-align: center; width: 100%;">
      <span style="font-weight: 600; margin-bottom: 4px;">${index + 1}. Calcule le périmètre de cette figure :</span>
      ${svgVisual}
      <div style="margin-top: 0.5rem; display: flex; align-items: center; gap: 8px;">
        <input type="text" class="math-input" style="width: 70px; text-align: center;" autocomplete="off"> <span>cm</span>
        <span class="feedback-icon"></span>
      </div>
    </div>
  `;
}