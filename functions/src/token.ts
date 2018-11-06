import * as express from "express";
// The Firebase Admin SDK to access the Firebase Realtime Database.
import * as admin from "firebase-admin";

// This is the router which will be imported in our
// api hub (the index.ts which will be sent to Firebase Functions).
export let authRouter = express.Router();
const db = admin.firestore();

export function generateToken(id, datetime) {
    return Date.now();
}

export async function saveToken(id, token) {
    try {
        const suc =  await db.collection("auth").doc(`${id}`).set({token: `${token}`});
        return suc;
    } catch {
        return false;
    }

}

export async function isTokenValid(id, token) {
    const querySnapshot = await db.collection("auth").doc(`${id}`).get();
    const auth = await querySnapshot.data()

    if (token === auth.token) {
        return true
    }
    return false
}

export async function lookupId(token) {
    const auth = await db.collection("auth").where("token", "==", "").get()
    let last;
    auth.forEach((doc) => last = doc);
    const record = last.data();
}
