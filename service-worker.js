// Sessizliğin Sesi - Service Worker
// Sürüm numarasını her önemli güncellemede artır (cache-v1 -> cache-v2 ...)
// böylece kullanıcıların cihazındaki eski önbellek otomatik temizlenir.
const CACHE_ADI = 'sessizligin-sesi-cache-v1';

const ONBELLEK_DOSYALARI = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-512-maskable.png'
];

// Kurulum: temel dosyaları önbelleğe al
self.addEventListener('install', function(event){
  event.waitUntil(
    caches.open(CACHE_ADI).then(function(cache){
      return cache.addAll(ONBELLEK_DOSYALARI);
    })
  );
  self.skipWaiting();
});

// Etkinleştirme: eski sürüm önbelleklerini temizle
self.addEventListener('activate', function(event){
  event.waitUntil(
    caches.keys().then(function(anahtarlar){
      return Promise.all(
        anahtarlar
          .filter(function(anahtar){ return anahtar !== CACHE_ADI; })
          .map(function(anahtar){ return caches.delete(anahtar); })
      );
    })
  );
  self.clients.claim();
});

// İstekleri karşıla: önce önbellek, yoksa ağdan al ve önbelleğe ekle
self.addEventListener('fetch', function(event){
  if(event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(function(onbellekYaniti){
      if(onbellekYaniti){
        return onbellekYaniti;
      }
      return fetch(event.request).then(function(agYaniti){
        if(!agYaniti || agYaniti.status !== 200 || agYaniti.type !== 'basic'){
          return agYaniti;
        }
        const klon = agYaniti.clone();
        caches.open(CACHE_ADI).then(function(cache){
          cache.put(event.request, klon);
        });
        return agYaniti;
      }).catch(function(){
        // Çevrimdışıyken ve önbellekte yoksa, ana sayfayı döndür
        return caches.match('./index.html');
      });
    })
  );
});
