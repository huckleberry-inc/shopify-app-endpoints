import * as functions from 'firebase-functions';
import { createHmac } from 'crypto';
import { WebClient } from '@slack/web-api';

export const gdpr = ({
  identifier,
  slack,
}: {
  identifier: string;
  slack?: boolean;
}): functions.HttpsFunction =>
  functions
    .region('asia-northeast1')
    .runWith({ memory: '2GB' })
    .https.onRequest(async (request, response) => {
      const hmac = request.get('X-Shopify-Hmac-Sha256');

      const { app } = request.query;
      const sharedSecret = functions.config().shopify.shared_secrets[
        app as string
      ];

      if (!sharedSecret) {
        throw new functions.https.HttpsError('invalid-argument', 'Not found');
      }

      const hash = createHmac('sha256', sharedSecret)
        .update(request.rawBody)
        .digest('base64');

      if (hash !== hmac) {
        throw new functions.https.HttpsError(
          'invalid-argument',
          'Hmac is invalid',
        );
      }

      const { shop_domain } = request.body;
      const message = `[${app}] ${identifier} ${shop_domain}`;

      console.log(message);

      if (slack) {
        const web = new WebClient(functions.config().slack.token);
        await web.chat.postMessage({
          channel: functions.config().slack.channel,
          text: message,
        });
      }

      return response.status(200).send();
    });
