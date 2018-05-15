self.addEventListener('fetch', function (event) {
    event.respondWith(
      new Response('サービスワーカーが動いています！')
    );
});

navigator.serviceWorker.ready
            .then(function (registration) {
                console.log(registration);
                return registration.pushManager.subscribe({ userVisibleOnly: true });
            })
            .then(function (subscription) {
                console.log('GCM EndPoint is:' + subscription.endpoint);
                $("#endpoint").append(subscription.endpoint);
                var auth = subscription.getKey('auth') ? btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('auth')))) : '';
                console.log('User Auth is:' + auth);
                $("#userauth").append(auth);
                var pubpub = subscription.getKey('p256dh') ? btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('p256dh')))) : '';
                $("#publickey").append(pubpub);
                console.log('User PublicKey is:' + pubpub);
                //var curlCommand = 'curl --header "Authorization: key=' + API_KEY + '" --header Content-Type:"application/json" ' + subscription.endpoint + ' -d "{\\"registration_ids\\":[\\"' + subscriptionId + '\\"]}"';
            })
            .catch(console.error.bind(console));

self.addEventListener('push', function (event) {
    console.log('Received a push message', event);
    var title = "プッシュ通知です！";
    var body = "プッシュ通知はこのようにして送られるのです";

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
