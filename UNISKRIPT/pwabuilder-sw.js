//This is the service worker with the Cache-first network

var CACHE = 'pwabuilder-precache-v1';
var precacheFiles = [
      /* Add an array of files to precache for your app */
      '326/index.html',
      '327/index.html',
      '328/index.html',
      '329/index.html',
      '330/index.html',
      '331/index.html',
      '332/index.html',
      '333/index.html',
      '334/index.html',
      '335/index.html',
      '336/index.html',
      '337/index.html',
      '338/index.html',
      'app-959d83540141715a866f.js',
      'app-959d83540141715a866f.js.map',
      'build-html-styles.css',
      'build-html-styles.css.map',
      'build-js-styles.css',
      'build-js-styles.css.map',
      'chunk-manifest.json',
      'commons-57f259f66bde6a64c69d.js',
      'commons-57f259f66bde6a64c69d.js.map',
      'component---src-layouts-index-js-8229226ba199b75a9d74.js',
      'component---src-layouts-index-js-8229226ba199b75a9d74.js.map',
      'component---src-pages-index-js-565c0e55cb8cb4c931f0.js',
      'component---src-pages-index-js-565c0e55cb8cb4c931f0.js.map',
      'component---src-templates-blog-post-js-42f1578d79c8c35a64bb.js',
      'component---src-templates-blog-post-js-42f1578d79c8c35a64bb.js.map',
      'icons/icon-48x48.png',
      'icons/icon-72x72.png',
      'icons/icon-96x96.png',
      'icons/icon-144x144.png',
      'icons/icon-192x192.png',
      'icons/icon-256x256.png',
      'icons/icon-384x384.png',
      'icons/icon-512x512.png',
      'index.html',
      './',
      'path----8868d233be2e7049419c.js',
      'path----8868d233be2e7049419c.js.map',
      'path---326-4976400a8d0e62b0c9aa.js',
      'path---326-4976400a8d0e62b0c9aa.js.map',
      'path---327-7b9ee4271e87681c6a8d.js',
      'path---327-7b9ee4271e87681c6a8d.js.map',
      'path---328-0372cbf48047c5d1de8d.js',
      'path---328-0372cbf48047c5d1de8d.js.map',
      'path---329-e4395f7ee1d84ef6e64f.js',
      'path---329-e4395f7ee1d84ef6e64f.js.map',
      'path---330-e3adbf8f8b31ffdc8ab1.js',
      'path---330-e3adbf8f8b31ffdc8ab1.js.map',
      'path---331-0ebe8b55b82b86f90436.js',
      'path---331-0ebe8b55b82b86f90436.js.map',
      'path---332-3d13f8321f462104b90e.js',
      'path---332-3d13f8321f462104b90e.js.map',
      'path---333-be33180bff40e520a02d.js',
      'path---333-be33180bff40e520a02d.js.map',
      'path---334-c4846c896f5ae0ff773d.js',
      'path---334-c4846c896f5ae0ff773d.js.map',
      'path---335-65ed0d4fdf2dc5dadb3f.js',
      'path---335-65ed0d4fdf2dc5dadb3f.js.map',
      'path---336-71d2b64bab7aa425e62d.js',
      'path---336-71d2b64bab7aa425e62d.js.map',
      'path---337-aa35fedbd01128cd9594.js',
      'path---337-aa35fedbd01128cd9594.js.map',
      'path---338-b2b1507dec3689fc2a73.js',
      'path---338-b2b1507dec3689fc2a73.js.map',
      'path---index-c04b469185e49c6debf2.js',
      'path---index-c04b469185e49c6debf2.js.map',
      'static/SVB-Discuss-together.ea87a32e.png',
      'static/SVB-Read-together.c3869d4d.png',
      'static/SVLogo.a75656ae.jpeg',
      'static/UniSkriptEnglishGlobal-Bold.400eb7ad.ttf',
      'stats.json',
      'styles.css'
    ];

//Install stage sets up the cache-array to configure pre-cache content
self.addEventListener('install', function(evt) {
  console.log('[PWA Builder] The service worker is being installed.');
  evt.waitUntil(precache().then(function() {
    console.log('[PWA Builder] Skip waiting on install');
    return self.skipWaiting();
  }));
});


//allow sw to control of current page
self.addEventListener('activate', function(event) {
  console.log('[PWA Builder] Claiming clients for current page');
  return self.clients.claim();
});

self.addEventListener('fetch', function(evt) {
  console.log('[PWA Builder] The service worker is serving the asset.'+ evt.request.url);
  evt.respondWith(fromCache(evt.request).catch(fromServer(evt.request)));
  evt.waitUntil(update(evt.request));
});


function precache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll(precacheFiles);
  });
}

function fromCache(request) {
  //we pull files from the cache first thing so we can show them fast
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}

function update(request) {
  //this is where we call the server to get the newest version of the 
  //file to use the next time we show view
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
}

function fromServer(request){
  //this is the fallback if it is not in the cache to go to the server and get it
  return fetch(request).then(function(response){ return response});
}
