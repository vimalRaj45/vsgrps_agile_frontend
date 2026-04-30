// Cache basic assets for PWA
const CACHE_NAME = 'sprintora-v2';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => {
        // If fetch fails (offline), and no cache, just return a failed promise or empty response
        return new Response('Network error occurred', { status: 408, statusText: 'Network Error' });
      });
    })
  );
});

self.addEventListener('push', (event) => {
  console.log('--- Push Received ---');
  
  let payload = {
    title: 'Sprintora',
    body: 'You have a new update.',
    icon: '/favicon.png',
    data: { url: '/' }
  };

  try {
    if (event.data) {
      const data = event.data.json();
      console.log('Parsed Push Data:', data);
      payload = { ...payload, ...data };
    }
  } catch (err) {
    console.error('Error parsing push data:', err);
    if (event.data) {
      payload.body = event.data.text();
    }
  }

  const options = {
    body: payload.body,
    icon: payload.icon || '/favicon.png',
    badge: '/favicon.png',
    vibrate: [200, 100, 200],
    data: payload.data || { url: '/' },
    actions: [
      { action: 'open', title: 'View Details' }
    ],
    tag: 'sprintora-notification', // Prevents multiple notifications stacking
    requireInteraction: true   // Keeps it visible until user acts
  };

  event.waitUntil(
    self.registration.showNotification(payload.title, options)
      .then(() => console.log('✅ Notification displayed successfully'))
      .catch(err => console.error('❌ Failed to show notification:', err))
  );
});

self.addEventListener('notificationclick', (event) => {
  console.log('--- Notification Clicked ---');
  event.notification.close();
  const urlToOpen = event.notification.data.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      // Check if there is already a window open with this URL
      for (let client of windowClients) {
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      // If not, open a new window
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
