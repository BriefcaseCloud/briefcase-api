// External Dependencies
import * as express from "express";
// The Firebase Admin SDK to access the Firebase Realtime Database.
import * as functions from "firebase-functions";
import * as usersStorage from "../storage/usersStorage";

export const updateFunction = functions.firestore.document('/projects/{projectid}')
.onWrite(async (change, context) => {
    console.log("here")
    let userChange = {}
    const newUsers = change.after.data().details.users;
    const oldUsers = change.after.data().details.users;
    if(oldUsers && newUsers.length != oldUsers.length) {
        const newestUser = newUsers[newUsers.length -1].user
        userChange = {id: newestUser, project: context.params.projectid} 
    }
    await usersStorage.updateUserProjects(userChange)
});