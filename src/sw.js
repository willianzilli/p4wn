var staticCacheName = 'p4wn-v3';

self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open(staticCacheName).then((cache) => {
        return cache.addAll([
            './images/icons/p4wn2.ico',
            './images/black_bishop.svg',
            './images/black_king.svg',
            './images/black_knight.svg',
            './images/black_pawn.svg',
            './images/black_queen.svg',
            './images/black_rook.svg',
            './images/white_bishop.svg',
            './images/white_king.svg',
            './images/white_knight.svg',
            './images/white_pawn.svg',
            './images/white_queen.svg',
            './images/white_rook.svg',
            './images/computer.png',
            './images/empty.gif',
            './images/human.png',
            './images/human2.png',
            './css/p4wn2.css',
            './js/display.js',
            './js/engine.js',
            './js/resolutionawareness.js',
            './index.html',
            './manifest.json',
        ]);
      })
    );
  });

  self.addEventListener('fetch', event => {
    console.log('Fetch event for ', event.request.url);
    event.respondWith(
      caches.match(event.request)
      .then(response => {
        if (response) {
          console.log('Found ', event.request.url, ' in cache');
          return response;
        }
        console.log('Network request for ', event.request.url);
        return fetch(event.request)
  
        // TODO 4 - Add fetched files to the cache
  
      }).catch(error => {
  
        // TODO 6 - Respond with custom offline page
  
      })
    );
  });

  self.addEventListener('activate', event => {
    console.log('Activating new service worker...');
  
    const cacheWhitelist = [staticCacheName];
  
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });