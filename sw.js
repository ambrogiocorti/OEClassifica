// Service Worker minimale per abilitare la funzionalità PWA
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
  // In questa configurazione minimale, lasciamo che le richieste vadano in rete
  // È necessario per far sì che i browser moderni riconoscano l'app come installabile
  e.respondWith(fetch(e.request));
});