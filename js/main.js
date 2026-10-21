// js/main.js
import { initOrthographe } from './modules/orthographe.js';
import { initMaths } from './modules/maths.js';
import { initAnglais } from './modules/anglais.js';

function router() {
  const hash = window.location.hash || '#orthographe';
  
  // Masquer tous les contenus d'onglets principaux et réinitialiser les boutons principaux
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));

  if (hash.startsWith('#orthographe')) {
    document.getElementById('tab-orthographe').classList.add('active');
    document.querySelector('[data-tab="orthographe"]')?.classList.add('active');
    initOrthographe();
  } 
  else if (hash.startsWith('#maths')) {
    document.getElementById('tab-maths').classList.add('active');
    document.querySelector('[data-tab="maths"]')?.classList.add('active');

    // Extraire le sous-type de maths (ex: #maths-fractions -> fractions)
    const parts = hash.split('-');
    const subType = parts[1] || 'operations';

    // 🎯 Synchroniser l'état actif des sous-onglets visuellement
    document.querySelectorAll('.subtab-btn').forEach(btn => {
      if (btn.dataset.type === subType) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    initMaths(subType);
  } 
  else if (hash.startsWith('#anglais')) {
    document.getElementById('tab-anglais').classList.add('active');
    document.querySelector('[data-tab="anglais"]')?.classList.add('active');
    initAnglais();
  }
}

// Écouter les clics sur les onglets principaux
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const tabName = e.target.dataset.tab;
    if (tabName === 'maths') {
      window.location.hash = '#maths-operations';
    } else {
      window.location.hash = `#${tabName}`;
    }
  });
});

// Écouter les clics sur les sous-onglets de maths
document.querySelectorAll('.subtab-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const subType = e.target.dataset.type; // ex: 'problemes', 'fractions', etc.
    window.location.hash = `#maths-${subType}`;
  });
});

// Écouter les changements d'URL (rafraîchissement ou boutons retour/suivant)
window.addEventListener('hashchange', router);

// Lancement au premier chargement
window.addEventListener('DOMContentLoaded', router);