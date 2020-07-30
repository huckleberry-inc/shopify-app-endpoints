import 'firebase-admin';
import { gdpr } from './gdpr';

const redactShopForGDPR = gdpr({ identifier: 'redactShop' });
const redactUserForGDPR = gdpr({ identifier: 'redactUser' });
const requestUserForGDPR = gdpr({ identifier: 'requestUser', slack: true });

export { redactShopForGDPR, redactUserForGDPR, requestUserForGDPR };
