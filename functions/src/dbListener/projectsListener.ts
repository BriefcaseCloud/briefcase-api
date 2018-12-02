// External Dependencies
import * as express from 'express'
// The Firebase Admin SDK to access the Firebase Realtime Database.
import * as functions from 'firebase-functions'
import * as usersStorage from '../storage/usersStorage'

export const updateFunction = functions.firestore
  .document('/projects/{projectid}')
  .onWrite(async (change, context) => {
    const newUsers = change.after.exists ? change.after.data().users : false
    const oldUsers = change.before.exists ? change.before.data().users : false
    if (!newUsers) {
    //   console.log('welp, we arnt there yet')
      for(const users in oldUsers){
        const removeUser = await usersStorage.removeUserProject(oldUsers[users].user, context.params.projectid)
      }
    //   return change.before
      
    } else if (!oldUsers) {
      const newestUser = newUsers[newUsers.length - 1].user
      const updatedUser = await usersStorage.addUserProject(newestUser, context.params.projectid)
    //   return updatedUser
    } else if (newUsers.length !== oldUsers.length) {
      const newestUser = newUsers[newUsers.length - 1].user
      const updatedUser = await usersStorage.addUserProject(newestUser, context.params.projectid)
    //   return updatedUser
    }
    // return change.after
  })
