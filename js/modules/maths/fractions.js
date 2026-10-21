// js/modules/maths/fractions.js
import { getRandomInt } from '../../utils.js';

export function generateFractionCard(card) {
  const isColorMode = Math.random() > 0.5;
  
  if (isColorMode) {
    generateColorFractionCard(card);
  } else {
    generateReadFractionCard(card);
  }
}

function generateColorFractionCard(card) {
  const den = getRandomInt(3, 8);
  const num = getRandomInt(1, den - 1);

  card.dataset.type = 'fractions-ecrire';
  card.dataset.expectedNum = num;
  card.dataset.den = den;

  let svgContent = `<svg width="120" height="120" viewBox="0 0 100 100" class="circle-pie" style="margin: 5px auto; display: block; cursor: pointer;">`;
  
  const radius = 40;
  const cx = 50;
  const cy = 50;

  for (let i = 0; i < den; i++) {
    const angle1 = (i * 2 * Math.PI) / den - Math.PI / 2;
    const angle2 = ((i + 1) * 2 * Math.PI) / den - Math.PI / 2;

    const x1 = cx + radius * Math.cos(angle1);
    const y1 = cy + radius * Math.sin(angle1);
    const x2 = cx + radius * Math.cos(angle2);
    const y2 = cy + radius * Math.sin(angle2);

    const largeArc = den === 2 ? 1 : (2 * Math.PI / den > Math.PI ? 1 : 0);

    let pathData = '';
    if (den === 1) {
      pathData = `M ${cx} ${cy - radius} A ${radius} ${radius} 0 1 1 ${cx - 0.01} ${cy - radius} Z`;
    } else {
      pathData = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    }

    svgContent += `<path d="${pathData}" fill="#f1f5f9" stroke="#334155" stroke-width="2" data-index="${i}" class="pie-slice" style="transition: fill 0.2s;" />`;
  }
  svgContent += `</svg>`;

  // Affichage de la fraction empilée verticalement dans l'énoncé
  card.innerHTML = `
    <div class="fraction-question-box" style="align-items: center; text-align: center; width: 100%;">
      <div style="font-weight: 600; font-size: 0.95rem; margin-bottom: 6px; display: inline-flex; align-items: center; gap: 6px; vertical-align: middle;">
        <span>Colorie la fraction :</span>
        <div style="display: inline-flex; flex-direction: column; align-items: center; vertical-align: middle; font-size: 1rem; line-height: 1.1;">
          <span style="padding-bottom: 2px;">${num}</span>
          <div style="width: 100%; height: 2px; background-color: #1e293b;"></div>
          <span style="padding-top: 2px;">${den}</span>
        </div>
      </div>
      ${svgContent}
      <span style="font-size: 0.8rem; color: #64748b; margin-top: 4px;">Clique sur les parts pour colorier</span>
      <span class="feedback-icon" style="margin-top: 4px;"></span>
    </div>
  `;

  card.querySelectorAll('.pie-slice').forEach(slice => {
    slice.onclick = () => {
      if (slice.classList.contains('filled')) {
        slice.classList.remove('filled');
        slice.setAttribute('fill', '#f1f5f9');
      } else {
        slice.classList.add('filled');
        slice.setAttribute('fill', '#f97316');
      }
    };
  });
}

function generateReadFractionCard(card) {
  const den = getRandomInt(3, 8);
  const num = getRandomInt(1, den - 1);

  card.dataset.type = 'fractions-lire';
  card.dataset.num = num;
  card.dataset.den = den;

  let svgContent = `<svg width="120" height="120" viewBox="0 0 100 100" style="margin: 5px auto; display: block;">`;
  const radius = 40;
  const cx = 50;
  const cy = 50;

  for (let i = 0; i < den; i++) {
    const angle1 = (i * 2 * Math.PI) / den - Math.PI / 2;
    const angle2 = ((i + 1) * 2 * Math.PI) / den - Math.PI / 2;

    const x1 = cx + radius * Math.cos(angle1);
    const y1 = cy + radius * Math.sin(angle1);
    const x2 = cx + radius * Math.cos(angle2);
    const y2 = cy + radius * Math.sin(angle2);

    const largeArc = den === 2 ? 1 : (2 * Math.PI / den > Math.PI ? 1 : 0);
    const pathData = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    
    const fillColor = i < num ? '#1e293b' : '#f1f5f9';

    svgContent += `<path d="${pathData}" fill="${fillColor}" stroke="#334155" stroke-width="2" />`;
  }
  svgContent += `</svg>`;

  // Affichage des inputs de réponse disposés verticalement (l'un au-dessus de l'autre avec une barre de fraction)
  card.innerHTML = `
    <div class="fraction-question-box" style="align-items: center; text-align: center; width: 100%;">
      <span style="font-weight: 600; font-size: 0.95rem; margin-bottom: 4px;">Quelle est cette fraction ?</span>
      ${svgContent}
      <div style="display: inline-flex; flex-direction: column; align-items: center; margin-top: 6px; width: 50px;">
        <input type="text" class="num-input" style="width: 40px; text-align: center; margin-bottom: 2px;" autocomplete="off">
        <div style="width: 35px; height: 2px; background-color: #1e293b; margin: 2px 0;"></div>
        <input type="text" class="den-input" style="width: 40px; text-align: center; margin-top: 2px;" autocomplete="off">
      </div>
      <span class="feedback-icon" style="margin-top: 4px;"></span>
    </div>
  `;
}