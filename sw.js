var CACHE_NAME = 'restaurant-cache-v1';
var urlsToCache = [
    '/',
    'index.html',
    'restaurant.html',
    'css/styles.css',
    'js/main.js',
    'js/restaurant_info.js',
    'data/restaurants.json'
];

self.addEventListener('install', function(event) {
    // Cache restaurant-data
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        }).catch(function (error) {
            console.log('Error: cannot open cache', error);
        })
    );
});

self.addEventListener('fetch', function(event) {
    // Cache map
    if (event.request.url.indexOf('https://maps.googleapis.com/maps/api/js') === 0 ||
        event.request.url.indexOf('mapfiles/') > 0 ||
        event.request.url.indexOf('maps/vt') > 0 ||
        event.request.url.indexOf('maps-api-v3/api/') > 0) {
        event.respondWith(
            fetch(event.request).then(function (response) {
                return response;
            }).catch(function () {
                return new Response();
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request).then(function(cacheResponse) {
                /* if there is already a cached response for the event-request, use this response,
                else fetch the event, save the network-response and return it */
                return cacheResponse || fetch(event.request).then(function(networkResponse) {
                        return caches.open(CACHE_NAME).then(function(cache) {
                            cache.put(event.request, networkResponse.clone());
                            return networkResponse;
                        }).catch(function (error) {
                            console.log('Error: cannot open cache', error);
                        })
                    }).catch(function (error) {
                        console.log('Error: cannot fetch', error);
                    })
            }).catch(function (error) {
                console.log('Error: No matched cache found', error);
            })
        );
    }
});

