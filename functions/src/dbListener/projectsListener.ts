// External Dependencies
import * as express from "express";
// The Firebase Admin SDK to access the Firebase Realtime Database.
import * as functions from "firebase-functions";
import * as usersStorage from "../storage/usersStorage";

export const updateFunction = functions.firestore.document('/projects/{projectid}')
.onWrite(async (change, context) => {
    // console.log("here")
    let userChange = {}
    // const newUsersData = change.after.data()
    // const oldUsersData = change.before.data()
    // console.log(newUsersData.details.user)
    const newUsers = change.after.data().users;
    const oldUsers = change.before.data().users;
    console.log("kjfjsdk")
    if(oldUsers && newUsers.length !== oldUsers.length) {
        const newestUser = newUsers[newUsers.length -1].user
        userChange = {id: newestUser, project: context.params.projectid} 
    }
    const updatedUser = await usersStorage.updateUserProjects(userChange)
    return updatedUser;
});