import * as functions from 'firebase-functions';
import { createHmac } from 'crypto';
import { WebClient } from '@slack/web-api';

export const gdpr = ({
  identifier,
  notify,
}: {
  identifier: string;
  notify?: boolean;
}): functions.HttpsFunction =>
  functions
    .region('asia-northeast1')
    .runWith({ memory: '2GB' })
    .https.onRequest(async (request, response) => {
      const { app } = request.query;
      const sharedSecret = functions.config().shopify.shared_secrets[
        app as string
      ];

      console.log(request.body);

      if (!sharedSecret) {
        response.sendStatus(500);
        return;
      }

      const hash = createHmac('sha256', sharedSecret)
        .update(request.rawBody)
        .digest('base64');

      const hmac = request.get('X-Shopify-Hmac-Sha256');

      if (hash !== hmac) {
        response.sendStatus(400);
        return;
      }

      const { shop_domain } = request.body;
      const message = `[${app}] ${identifier} ${shop_domain}`;

      console.log(message);

      if (notify) {
        const web = new WebClient(functions.config().slack.token);
        await web.chat.postMessage({
          channel: functions.config().slack.channel,
          text: message,
        });
      }

      response.sendStatus(200);
    });
