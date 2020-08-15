import * as myFunctions from '../index';

require('sepia');

const projectId = 'projectId';
const test = require('firebase-functions-test')({ projectId });
test.mockConfig({
  shopify: { shared_secrets: { app: 'secret' } },
  slack: { channel: 'channel', token: 'token' },
});

describe('redactShopForGDPR', () => {
  it('returns 500 if shared secret is undefined', async (done) => {
    const req = { query: { app: '' } };

    const res = {
      sendStatus: (status) => {
        expect(status).toStrictEqual(500);
        done();
      },
    };

    myFunctions.redactUserForGDPR(req, res);
  });

  it('returns 400 if HMAC is wrong', async (done) => {
    const req = { rawBody: '', get: (_) => 'hmac', query: { app: 'app' } };

    const res = {
      sendStatus: (status) => {
        expect(status).toStrictEqual(400);
        done();
      },
    };

    myFunctions.redactUserForGDPR(req, res);
  });

  it('returns 200', async (done) => {
    const req = {
      body: {
        shop_id: 954889,
        shop_domain: 'snowdevil.myshopify.com',
        customer: {
          id: 191167,
          email: 'john@email.com',
          phone: '555-625-1199',
        },
        orders_to_redact: [299938, 280263, 220458],
      },
      rawBody: `{
      "shop_id": 954889,
      "shop_domain": "snowdevil.myshopify.com",
      "customer": {
        "id": 191167,
        "email": "john@email.com",
        "phone": "555-625-1199"
      },
      "orders_to_redact": [299938, 280263, 220458]
    }`,
      get: (_) => 'r+LiMPMZwCrSarQcDKqTZFxP9k/KqDw3aTHDLgu86X0=',
      query: { app: 'app' },
    };

    const res = {
      sendStatus: (status) => {
        expect(status).toStrictEqual(200);
        done();
      },
    };

    myFunctions.redactUserForGDPR(req, res);
  });
});

describe('redactUserForGDPR', () => {
  it('returns 500 if shared secret is undefined', async (done) => {
    const req = { query: { app: '' } };

    const res = {
      sendStatus: (status) => {
        expect(status).toStrictEqual(500);
        done();
      },
    };

    myFunctions.redactUserForGDPR(req, res);
  });

  it('returns 400 if HMAC is wrong', async (done) => {
    const req = { rawBody: '', get: (_) => 'hmac', query: { app: 'app' } };

    const res = {
      sendStatus: (status) => {
        expect(status).toStrictEqual(400);
        done();
      },
    };

    myFunctions.redactUserForGDPR(req, res);
  });

  it('returns 200', async (done) => {
    const req = {
      body: {
        shop_id: 954889,
        shop_domain: 'snowdevil.myshopify.com',
        customer: {
          id: 191167,
          email: 'john@email.com',
          phone: '555-625-1199',
        },
        orders_to_redact: [299938, 280263, 220458],
      },
      rawBody: `{
      "shop_id": 954889,
      "shop_domain": "snowdevil.myshopify.com",
      "customer": {
        "id": 191167,
        "email": "john@email.com",
        "phone": "555-625-1199"
      },
      "orders_to_redact": [299938, 280263, 220458]
    }`,
      get: (_) => 'r+LiMPMZwCrSarQcDKqTZFxP9k/KqDw3aTHDLgu86X0=',
      query: { app: 'app' },
    };

    const res = {
      sendStatus: (status) => {
        expect(status).toStrictEqual(200);
        done();
      },
    };

    myFunctions.redactUserForGDPR(req, res);
  });
});

describe('requestUserForGDPR', () => {
  it('returns 500 if shared secret is undefined', async (done) => {
    const req = { query: { app: '' } };

    const res = {
      sendStatus: (status) => {
        expect(status).toStrictEqual(500);
        done();
      },
    };

    myFunctions.redactUserForGDPR(req, res);
  });

  it('returns 400 if HMAC is wrong', async (done) => {
    const req = { rawBody: '', get: (_) => 'hmac', query: { app: 'app' } };

    const res = {
      sendStatus: (status) => {
        expect(status).toStrictEqual(400);
        done();
      },
    };

    myFunctions.redactUserForGDPR(req, res);
  });

  it('returns 200', async (done) => {
    const req = {
      body: {
        shop_id: 954889,
        shop_domain: 'snowdevil.myshopify.com',
        customer: {
          id: 191167,
          email: 'john@email.com',
          phone: '555-625-1199',
        },
        orders_to_redact: [299938, 280263, 220458],
      },
      rawBody: `{
      "shop_id": 954889,
      "shop_domain": "snowdevil.myshopify.com",
      "customer": {
        "id": 191167,
        "email": "john@email.com",
        "phone": "555-625-1199"
      },
      "orders_to_redact": [299938, 280263, 220458]
    }`,
      get: (_) => 'r+LiMPMZwCrSarQcDKqTZFxP9k/KqDw3aTHDLgu86X0=',
      query: { app: 'app' },
    };

    const res = {
      sendStatus: (status) => {
        expect(status).toStrictEqual(200);
        done();
      },
    };

    myFunctions.requestUserForGDPR(req, res);
  });
});
