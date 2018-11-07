// The Firebase Admin SDK to access the Firebase Realtime Database.
import * as admin from "firebase-admin";
// The Firebase Functions library
import * as functions from "firebase-functions";

admin.initializeApp(functions.config().firebase);

import api from 'api';

exports.api = functions.https.onRequest(api);
