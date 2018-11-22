// The Firebase Admin SDK to access the Firebase Realtime Database.
import * as admin from "firebase-admin";
import * as userStorage from "./usersStorage";
const db = admin.firestore();



export async function getProjects(uuid) {

    var user_data = userStorage.readUser(uuid);
    var projects_array = ["TEST"];

    // for(var project in userStorage.readUser(uuid).projects) {
    //     projects_array.push(db.doc(project).get().data());
    // }
    console.log("WE HERE");
    console.log(user_data);
    return projects_array;
}