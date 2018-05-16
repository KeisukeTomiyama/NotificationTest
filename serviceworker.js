self.addEventListener('fetch', function (event) {
    event.respondWith(
      new Response('Running')
    );
});

self.addEventListener('push', function (event) {
    console.log('Received a push message', event);
    var title = "New Push is Coming";
    var body = "Notification Message";

    event.waitUntil(
        self.registration.showNotification(title, {
            body: body,
            icon: './icon.png',
            tag: 'push-notification-tag'
        })
    );
});
self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    clients.openWindow("/");
}, false);
