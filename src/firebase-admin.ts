import * as admin from 'firebase-admin';
import * as path from 'path';

admin.initializeApp({
    credential: admin.credential.cert(path.resolve(__dirname, '../src/config/firebase-service-account.json')),
    databaseURL: `https://proyectoibwa.firebaseio.com`,
});

console.log(admin)

export default admin;
