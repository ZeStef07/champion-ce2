// js/modules/maths/problemes.js
import { getRandomInt } from '../../utils.js';

function generateProblemActors() {
  const garcons = ['Jean', 'Lucas', 'Thomas', 'Léo', 'Hugo', 'Nathan'];
  const filles = ['Emma', 'Chloé', 'Manon', 'Alice', 'Léa', 'Zoé', 'Sarah'];

  const isGirl1 = Math.random() > 0.5;
  const p1 = isGirl1 ? filles[getRandomInt(0, filles.length - 1)] : garcons[getRandomInt(0, garcons.length - 1)];
  const pron = isGirl1 ? "Elle" : "Il";
  const pronL = isGirl1 ? "elle" : "il";

  const isGirl2 = Math.random() > 0.5;
  const p2 = isGirl2 ? filles[getRandomInt(0, filles.length - 1)] : garcons[getRandomInt(0, garcons.length - 1)];
  const detCamarade = isGirl2 ? "Sa camarade" : "Son camarade";

  return { p1, p2, pron, pronL, detCamarade };
}

export function generateProblemCard(card, index, assignedType) {
  const actors = generateProblemActors();

  if (assignedType === 'billes') generateBillesProblem(card, index, actors);
  else if (assignedType === 'decomposition') generateDecompositionProblem(card, index, actors);
  else if (assignedType === 'argent') generateArgentProblem(card, index, actors);
  else if (assignedType === 'multiple') generateMultipleProblem(card, index, actors);
  else if (assignedType === 'temps') generateTempsProblem(card, index, actors);
  else if (assignedType === 'partage') generatePartageProblem(card, index, actors);
  else generateLongueurProblem(card, index, actors);
}

function generateBillesProblem(card, index, actors) {
  const { p1, p2, pronL, detCamarade } = actors;
  const objets = [{ nom: 'billes', type: 'de billes', typePluriel: 'des billes' }, { nom: 'images', type: `d'images`, typePluriel: 'des images' }, { nom: 'autocollants', type: `d'autocollants`, typePluriel: 'des autocollants' }, { nom: 'bonbons', type: 'de bonbons', typePluriel: 'des bonbons' }, { nom: 'cartes', type: 'de cartes', typePluriel: 'des cartes' }, { nom: 'perles', type: 'de perles', typePluriel: 'des perles' }];
  const obj = objets[getRandomInt(0, objets.length - 1)];

  const start = getRandomInt(8, 25);
  const val1 = getRandomInt(5, 15);
  const val2 = getRandomInt(2, 8);
  const val3 = getRandomInt(3, 10);

  const scenarios = [
    {
      text: `<strong>${index + 1}. ${p1}</strong> a <strong>${start}</strong> ${obj.nom} dans son sac. Pour son anniversaire, ${detCamarade.toLowerCase()} <strong>${p2}</strong> lui en offre <strong>${val1}</strong> de plus. Plus tard, sa mamie lui en donne encore <strong>${val2}</strong>. En rentrant à la maison, ${pronL} en fait tomber <strong>${val3}</strong> dans la rue.`,
      final: start + val1 + val2 - val3,
      diff: (start + val1 + val2 - val3) - start
    },
    {
      text: `<strong>${index + 1}. ${p1}</strong> commence la journée avec <strong>${start}</strong> ${obj.nom}. Pendant la récréation du matin, ${pronL} en donne <strong>${val1}</strong> à <strong>${p2}</strong>. L'après-midi, lors d'un jeu, ${pronL} en gagne <strong>${val2}</strong>. En fin de journée, ${pronL} en échange <strong>${val3}</strong> contre un dessin.`,
      final: start - val1 + val2 - val3,
      diff: (start - val1 + val2 - val3) - start
    },
    {
      text: `<strong>${index + 1}. ${p1}</strong> possède <strong>${start}</strong> ${obj.nom}. Au parc, ${detCamarade.toLowerCase()} <strong>${p2}</strong> lui en donne <strong>${val1}</strong>. Ensuite, ${p1} en prête <strong>${val2}</strong> à un ami, puis en oublie <strong>${val3}</strong> sur un banc.`,
      final: start + val1 - val2 - val3,
      diff: (start + val1 - val2 - val3) - start
    },
    {
      text: `Dans sa boîte, <strong>${p1}</strong> a <strong>${start}</strong> ${obj.nom}. ${actors.pron} en distribue <strong>${val1}</strong> à ses camarades le matin, puis en perd <strong>${val2}</strong> à la cantine. Heureusement, le soir, <strong>${p2}</strong> lui en donne <strong>${val3}</strong> de nouvelles.`,
      final: start - val1 - val2 + val3,
      diff: (start - val1 - val2 + val3) - start
    }
  ];

  const scenar = scenarios[getRandomInt(0, scenarios.length - 1)];

  card.dataset.type = 'prob-billes';
  card.dataset.ans1 = scenar.final;
  card.dataset.ans2 = scenar.diff >= 0 ? "gagné" : "perdu";
  card.dataset.ans3 = Math.abs(scenar.diff);

  card.innerHTML = `
    <div class="fraction-question-box" style="align-items: flex-start; text-align: left; width: 100%;">
      <span style="font-size: 0.95rem; line-height: 1.4;">${scenar.text}</span>
      <div style="margin-top: 0.5rem; width: 100%; display: flex; flex-direction: column; gap: 6px; font-size: 0.9rem;">
        <div style="display: flex; justify-content: space-between; align-items: center;"><span>1. Combien ${obj.type} lui reste-t-il ?</span> <input type="text" class="p-ans-1" style="width: 50px; text-align: center;" autocomplete="off"></div>
        <div style="display: flex; justify-content: space-between; align-items: center;"><span>2. A la fin de la journée, a-t-${pronL} gagné ou perdu ${obj.typePluriel} ? (gagné/perdu)</span> <input type="text" class="p-ans-2" style="width: 75px; text-align: center;" autocomplete="off"></div>
        <div style="display: flex; justify-content: space-between; align-items: center;"><span>3. Combien en a-t-${pronL} gagné/perdu ?</span> <input type="text" class="p-ans-3" style="width: 50px; text-align: center;" autocomplete="off"></div>
      </div>
      <span class="feedback-icon" style="align-self: center; margin-top: 4px;"></span>
    </div>
  `;
}

function generateDecompositionProblem(card, index, actors) {
  const { p1, pronL } = actors;
  const objets = [{ nom: 'billes', type: 'ses billes' }, { nom: 'cartes', type: 'ses cartes' }, { nom: 'perles', type: 'ses perles' }];
  const obj = objets[getRandomInt(0, objets.length - 1)];

  const part1 = getRandomInt(15, 35);
  const part2 = getRandomInt(10, 25);
  const total = part1 + part2 + getRandomInt(15, 30);
  const reponse = total - (part1 + part2);

  card.dataset.type = 'prob-decomposition';
  card.dataset.ans1 = reponse;

  card.innerHTML = `
    <div class="fraction-question-box" style="align-items: flex-start; text-align: left; width: 100%;">
      <span style="font-size: 0.95rem; line-height: 1.4;">
        <strong>${index + 1}.</strong> Dans la boîte où ${pronL} range ${obj.type}, <strong>${p1}</strong> a <strong>${total}</strong> ${obj.nom}. 
        Elle a <strong>${part1}</strong> ${obj.nom} vertes, <strong>${part2}</strong> ${obj.nom} bleues et des ${obj.nom} rouges.
      </span>
      <div style="margin-top: 0.5rem; width: 100%; display: flex; flex-direction: column; gap: 6px; font-size: 0.9rem;">
        <div style="display: flex; justify-content: space-between; align-items: center;"><span>Combien de ${obj.nom} rouges a-${pronL}-t-elle ?</span> <input type="text" class="p-ans-1" style="width: 55px; text-align: center;" autocomplete="off"></div>
      </div>
      <span class="feedback-icon" style="align-self: center; margin-top: 4px;"></span>
    </div>
  `;
}

function generateArgentProblem(card, index, actors) {
  const { p1, pron } = actors;
  const depart = getRandomInt(10, 25);
  const prix1 = getRandomInt(1, 3);
  const prix2 = getRandomInt(2, 6);
  const reste = depart - (prix1 + prix2);

  card.dataset.type = 'prob-argent';
  card.dataset.ans1 = reste > 0 ? "oui" : "non";
  card.dataset.ans2 = reste;

  card.innerHTML = `
    <div class="fraction-question-box" style="align-items: flex-start; text-align: left; width: 100%;">
      <span style="font-size: 0.95rem; line-height: 1.4;">
        <strong>${index + 1}.</strong> La maman de <strong>${p1}</strong> lui donne <strong>${depart} €</strong> pour faire des courses. 
        ${pron} achète un livre à <strong>${prix1} €</strong> et un jeu à <strong>${prix2} €</strong>.
      </span>
      <div style="margin-top: 0.5rem; width: 100%; display: flex; flex-direction: column; gap: 6px; font-size: 0.9rem;">
        <div style="display: flex; justify-content: space-between; align-items: center;"><span>1. A la fin des courses, reste-t-il de l'argent à ${p1} ? (oui/non)</span> <input type="text" class="p-ans-1" style="width: 55px; text-align: center;" autocomplete="off"></div>
        <div style="display: flex; justify-content: space-between; align-items: center;"><span>2. Si oui, combien (€) :</span> <input type="text" class="p-ans-2" style="width: 50px; text-align: center;" autocomplete="off"></div>
      </div>
      <span class="feedback-icon" style="align-self: center; margin-top: 4px;"></span>
    </div>
  `;
}

function generateMultipleProblem(card, index, actors) {
  const { p1, pronL } = actors;
  const quantite = getRandomInt(3, 8);
  const prixUnitaire = getRandomInt(2, 5);
  const totalPaye = quantite * prixUnitaire;

  card.dataset.type = 'prob-multiple';
  card.dataset.ans1 = totalPaye;

  card.innerHTML = `
    <div class="fraction-question-box" style="align-items: flex-start; text-align: left; width: 100%;">
      <span style="font-size: 0.95rem; line-height: 1.4;">
        <strong>${index + 1}. ${p1}</strong> achète <strong>${quantite}</strong> paquets de cartes. Chaque paquet coûte <strong>${prixUnitaire} €</strong>.
      </span>
      <div style="margin-top: 0.5rem; width: 100%; display: flex; flex-direction: column; gap: 6px; font-size: 0.9rem;">
        <div style="display: flex; justify-content: space-between; align-items: center;"><span>Combien ${p1} a-t-${pronL} payé au total (€) ?</span> <input type="text" class="p-ans-1" style="width: 50px; text-align: center;" autocomplete="off"></div>
      </div>
      <span class="feedback-icon" style="align-self: center; margin-top: 4px;"></span>
    </div>
  `;
}

function generateTempsProblem(card, index, actors) {
  const { p1 } = actors;
  const heureDepart = getRandomInt(8, 15);
  const minDepart = [0, 15, 30, 45][getRandomInt(0, 3)];
  const dureeMin = [30, 45, 60, 90, 120][getRandomInt(0, 4)];
  let totalMin = heureDepart * 60 + minDepart + dureeMin;
  let heureFin = Math.floor(totalMin / 60) % 24;
  let minFin = totalMin % 60;

  card.dataset.type = 'prob-temps';
  card.dataset.ans1 = heureFin;
  card.dataset.ans2 = minFin === 0 ? "00" : minFin;

  card.innerHTML = `
    <div class="fraction-question-box" style="align-items: flex-start; text-align: left; width: 100%;">
      <span style="font-size: 0.95rem; line-height: 1.4;">
        <strong>${index + 1}. ${p1}</strong> commence son sport à <strong>${heureDepart}h${minDepart === 0 ? '00' : minDepart}</strong>. La séance dure <strong>${dureeMin} min</strong>.
      </span>
      <div style="margin-top: 0.5rem; width: 100%; display: flex; flex-direction: column; gap: 6px; font-size: 0.9rem;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span>Heure de fin :</span>
          <span><input type="text" class="p-ans-1" style="width: 30px; text-align: center;" autocomplete="off"> h <input type="text" class="p-ans-2" style="width: 30px; text-align: center;" autocomplete="off"></span>
        </div>
      </div>
      <span class="feedback-icon" style="align-self: center; margin-top: 4px;"></span>
    </div>
  `;
}

function generatePartageProblem(card, index, actors) {
  const { p1 } = actors;
  const totalObj = getRandomInt(24, 72);
  const part = getRandomInt(4, 9);
  const multiple = Math.floor(totalObj / part) * part;

  card.dataset.type = 'prob-partage';
  card.dataset.ans1 = multiple / part;

  card.innerHTML = `
    <div class="fraction-question-box" style="align-items: flex-start; text-align: left; width: 100%;">
      <span style="font-size: 0.95rem; line-height: 1.4;">
        <strong>${index + 1}. ${p1}</strong> a <strong>${multiple}</strong> cartes et veut mettre exactement <strong>${part}</strong> cartes par page.
      </span>
      <div style="margin-top: 0.5rem; width: 100%; display: flex; flex-direction: column; gap: 6px; font-size: 0.9rem;">
        <div style="display: flex; justify-content: space-between; align-items: center;"><span>Pages remplies :</span> <input type="text" class="p-ans-1" style="width: 50px; text-align: center;" autocomplete="off"></div>
      </div>
      <span class="feedback-icon" style="align-self: center; margin-top: 4px;"></span>
    </div>
  `;
}

function generateLongueurProblem(card, index, actors) {
  const { p1, pronL } = actors;
  const dist1 = getRandomInt(150, 400);
  const dist2 = getRandomInt(100, 300);

  card.dataset.type = 'prob-longueur';
  card.dataset.ans1 = dist1 + dist2;

  card.innerHTML = `
    <div class="fraction-question-box" style="align-items: flex-start; text-align: left; width: 100%;">
      <span style="font-size: 0.95rem; line-height: 1.4;">
        <strong>${index + 1}.</strong> Pour l'école, <strong>${p1}</strong> fait <strong>${dist1} m</strong> à pied puis <strong>${dist2} m</strong> en bus.
      </span>
      <div style="margin-top: 0.5rem; width: 100%; display: flex; flex-direction: column; gap: 6px; font-size: 0.9rem;">
        <div style="display: flex; justify-content: space-between; align-items: center;"><span>Quelle distance parcourt-${pronL} au total ? :</span> <input type="text" class="p-ans-1" style="width: 55px; text-align: center;" autocomplete="off">mètres</div>
      </div>
      <span class="feedback-icon" style="align-self: center; margin-top: 4px;"></span>
    </div>
  `;
}