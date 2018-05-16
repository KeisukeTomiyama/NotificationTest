self.addEventListener('fetch', function (event) {
    event.respondWith(
      new Response('サービスワーカーが動いています！')
    );
});

self.registration.pushManager.subscribe().then(
      function (pushSubscription) {
          console.log(pushSubscription.endpoint);
          // アプリケーションサーバが必要としているプッシュサブスクリプションの
          // 詳細はここから使用できます。たとえば、XMLHttpRequest を使用して
          // これを送信できます。
      }, function (error) {
          // 開発中は、コンソールにエラーを表示するのに役立ちます。
          // 本番環境では、アプリケーションサーバにエラー情報を送信
          //  するためにも 役立ちます。
          console.log(error);
      }
    );

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
