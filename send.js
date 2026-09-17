const webpush = require('web-push');

const {
  VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, VAPID_SUBJECT,
  INPUT_TITLE, INPUT_SUBSCRIPTION, INPUT_NAVIGATE
} = process.env;

if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY || !VAPID_SUBJECT || !INPUT_SUBSCRIPTION) {
  console.error('Missing required environment variables');
  process.exit(1);
}

webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

const subscription = JSON.parse(INPUT_SUBSCRIPTION);
const payload = {
  web_push: 8030,
  notification: {
    title: INPUT_TITLE || 'Notification',
    body: process.env.INPUT_BODY || '',
    navigate: INPUT_NAVIGATE || 'com.apple.home://',
  },
};

webpush.sendNotification(subscription, JSON.stringify(payload))
  .then((res) => console.log('Sent:', res.statusCode))
  .catch((err) => {
    console.error('Failed:', err.statusCode, err.body);
    process.exit(1);
  });
