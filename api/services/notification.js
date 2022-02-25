const admin = require('firebase-admin');

var serviceAccount = require("../../hello.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tenant-hello.firebaseio.com"
});

var token = ['eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJha2VzaC52aXNod2FrYXJtYUBicmFpbml1bWluZm90ZWNoLmNvbSIsImlkIjoiNWY4NDY1MjRhMWI0YTczM2I2NDZiZGM1IiwiaWF0IjoxNjAyNTg5MDY1fQ.C6SzgK_qqqmikbRCv9T7BhHbqeRBShEAwxGSwYI73MM'];

const payload = {
    notification: {
        title: "Test Notification",
        body: "This is the body of the notification message"
    }
}

const options = {
    priority: "high",
    timeToLive: 60 *60 *24
}

admin.messaging().sendToDevice(token, payload, options)
    .then(result => {
        console.log('Notification sent' + result.results)
    })
    .catch(err => {
        console.log("Error sending Message" + err)
    })
